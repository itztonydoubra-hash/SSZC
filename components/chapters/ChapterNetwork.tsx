/*
 * ChapterNetwork — the Chapters experience (replaces the former stylised
 * organisational graph, design.md B2).
 *
 * The page's argument is a DESCENT, drawn geographically:
 *   Nigeria → the South South → its six states → their LAWSAN chapters →
 *   the chapter's President.
 *
 * Composition (desktop): one stage holds the Nigeria drawing on the left and the
 * state register on the right; a call-out route runs from each state's marker to
 * its row, so selecting a state literally traces its position in the zone. Below
 * the stage, on the same spine, the selected state's chapters read as an
 * editorial ledger and the selected chapter's record sits in the outer column —
 * part of the same composition, not a dashboard panel bolted on.
 *
 * Composition (tablet/mobile): the register leaves the drawing and becomes a
 * horizontal rail beneath it, and the canvas crops to the map region so the map
 * is recomposed rather than shrunk. No pinch/zoom, no drag-to-pan.
 *
 * Accessibility: the drawing is presentational; every state and every chapter is
 * a real <button> in document order, so the whole experience is operable by
 * keyboard alone and the map is never the only way in. Counts are DERIVED from
 * the chapter records — never hardcoded.
 *
 * Motion budget (3): the active route drawing itself, the ledger's line-rise
 * stagger, and the chapter record's fade. All transform/opacity/clip/stroke —
 * no layout animation, no parallax, no new library. Reduced motion removes the
 * drawing animation and the stagger (see styles/chapters.css).
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Chapters, ChapterState } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { ChapterProfile } from "./ChapterProfile";
import { NigeriaMap, type MapState } from "./NigeriaMap";
import { COMPACT_CROP, RAIL } from "./map-layout";
import { MAP_VIEW, SOUTH_SOUTH_GEOGRAPHY } from "./nigeria-geography";

/*
 * Initial UI selection only — it gives the stage a drawn route and a populated
 * ledger on first load instead of an empty composition. It is NOT a statement
 * about headquarters, seniority or any other organisational fact.
 */
const INITIAL_STATE_SLUG = "bayelsa";

/** Awaiting verified content — a deliberate, designed state. */
const NEEDS_CONTENT = "[NEEDS CONTENT]";

type Row = {
  state: ChapterState;
  /** the state's real outline; absent only if a future record has no geography */
  geo?: (typeof SOUTH_SOUTH_GEOGRAPHY)[number];
  index: number;
};

export function ChapterNetwork({ data }: { data: Chapters }) {
  const router = useRouter();
  const params = useSearchParams();
  const [hovered, setHovered] = useState<string | null>(null);

  /* Register order is north-to-south by real latitude, so the call-out routes
   * fan out without crossing one another. */
  const rows: Row[] = useMemo(() => {
    const geoBySlug = new Map(SOUTH_SOUTH_GEOGRAPHY.map((g) => [g.slug, g]));
    return [...data.states]
      .map((state) => ({ state, geo: geoBySlug.get(state.slug) }))
      .sort((a, b) => (a.geo?.cy ?? Number.MAX_SAFE_INTEGER) - (b.geo?.cy ?? Number.MAX_SAFE_INTEGER))
      .map((row, index) => ({ ...row, index }));
  }, [data.states]);

  /* A South South state with no chapter record is drawn as plain geography
   * rather than offered as a choice that leads nowhere. */
  const unlisted = useMemo(
    () => SOUTH_SOUTH_GEOGRAPHY.filter((g) => !data.states.some((s) => s.slug === g.slug)),
    [data.states],
  );

  const mapStates: MapState[] = useMemo(
    () => rows.flatMap((r) => (r.geo ? [{ geo: r.geo, index: r.index }] : [])),
    [rows],
  );

  /* Deep-linked selection: /chapters?state=bayelsa[&chapter=hensard-university] */
  const resolved = useMemo(() => {
    const queryState = params.get("state");
    const state =
      rows.find((r) => r.state.slug === queryState)?.state ??
      rows.find((r) => r.state.slug === INITIAL_STATE_SLUG)?.state ??
      rows[0]?.state;
    const queryChapter = params.get("chapter");
    const chapter =
      state?.chapters.find((c) => c.slug === queryChapter) ?? state?.chapters[0];
    return { stateSlug: state?.slug, chapterSlug: chapter?.slug };
  }, [params, rows]);

  const [selection, setSelection] = useState(resolved);
  useEffect(() => setSelection(resolved), [resolved]);

  const writeUrl = useCallback(
    (stateSlug?: string, chapterSlug?: string) => {
      const query = new URLSearchParams();
      if (stateSlug) query.set("state", stateSlug);
      if (chapterSlug) query.set("chapter", chapterSlug);
      const qs = query.toString();
      // replace(): updates the URL in place, no reload and no history spam.
      router.replace(qs ? `/chapters?${qs}` : "/chapters", { scroll: false });
    },
    [router],
  );

  const selectState = useCallback(
    (slug: string) => {
      const row = rows.find((r) => r.state.slug === slug);
      if (!row) return;
      const chapterSlug = row.state.chapters[0]?.slug;
      setSelection({ stateSlug: slug, chapterSlug });
      writeUrl(slug, chapterSlug);
    },
    [rows, writeUrl],
  );

  const selectChapter = useCallback(
    (slug: string) => {
      setSelection((current) => {
        writeUrl(current.stateSlug, slug);
        return { ...current, chapterSlug: slug };
      });
    },
    [writeUrl],
  );

  /* Below the desktop breakpoint the register is a horizontal rail, so the
   * selected state can sit outside the visible strip (notably on first load or
   * after a deep link). Bring it into the strip WITHOUT scrolling the page, and
   * without animation — this is orientation, not motion. */
  const railRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const list = railRef.current;
    if (!list || !selection.stateSlug) return;
    if (list.scrollWidth <= list.clientWidth) return; // desktop: not a strip
    const row = list.querySelector<HTMLElement>(`[data-state="${selection.stateSlug}"]`);
    if (!row) return;
    const listBox = list.getBoundingClientRect();
    const rowBox = row.getBoundingClientRect();
    const offset = list.scrollLeft + (rowBox.left - listBox.left);
    list.scrollTo({ left: Math.max(0, offset - (listBox.width - rowBox.width) / 2) });
  }, [selection.stateSlug]);

  const selectedRow = rows.find((r) => r.state.slug === selection.stateSlug);
  const selectedState = selectedRow?.state;
  const selectedChapter = selectedState?.chapters.find((c) => c.slug === selection.chapterSlug);
  const activeSlug = hovered ?? selection.stateSlug;
  const count = selectedState?.chapters.length ?? 0;

  /* The drawing and the register share ONE coordinate space; publishing it as
   * custom properties lets CSS place the rows exactly where the routes land,
   * and lets the compact breakpoint recompose without measuring JS. */
  const stageVars = {
    "--cm-view-w": String(MAP_VIEW.w),
    "--cm-view-h": String(MAP_VIEW.h),
    "--cm-label-x": String(RAIL.labelX),
    "--cm-row-top": String(RAIL.rowTop),
    "--cm-row-h": String(RAIL.rowH),
    "--cm-head-y": String(RAIL.headY),
    "--cm-crop-w": String(COMPACT_CROP.w),
    "--cm-crop-h": String(COMPACT_CROP.h),
    "--cm-crop-y": String(COMPACT_CROP.y),
  } as CSSProperties;

  return (
    <div className="cm">
      {/* ---- The stage: Nigeria + the state register --------------------- */}
      <div className="cm-map" style={stageVars}>
        <div className="cm-canvas">
          <NigeriaMap
            states={mapStates}
            unlisted={unlisted}
            activeSlug={activeSlug}
            onSelect={selectState}
            onHover={setHovered}
          />
        </div>

        <div className="cm-rail">
          <div className="cm-rail__head">
            <h2 className="type-label">South South network</h2>
            <p className="cm-rail__cue type-label-s">Select a state</p>
          </div>

          <ul className="cm-rail__list" ref={railRef}>
            {rows.map((row) => {
              const isSelected = row.state.slug === selection.stateSlug;
              const n = row.state.chapters.length;
              return (
                <li
                  className="cm-rail__row"
                  key={row.state.slug}
                  data-state={row.state.slug}
                  style={{ "--cm-row-i": String(row.index) } as CSSProperties}
                >
                  <button
                    type="button"
                    className="cm-rail__btn"
                    aria-pressed={isSelected}
                    aria-label={`${row.state.state} — ${n} LAWSAN ${n === 1 ? "chapter" : "chapters"}`}
                    data-active={row.state.slug === activeSlug ? "true" : "false"}
                    onClick={() => selectState(row.state.slug)}
                    onPointerEnter={() => setHovered(row.state.slug)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setHovered(row.state.slug)}
                    onBlur={() => setHovered(null)}
                  >
                    <span className="cm-rail__name type-display-m">{row.state.state}</span>
                    <span className="cm-rail__count type-label-s tnum" aria-hidden>
                      {n} {n === 1 ? "chapter" : "chapters"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ---- The selected state's chapters, and the chapter record ------- */}
      <div className="cm-lower">
        <div className="cm-ledger-col" aria-live="polite">
          {selectedState ? (
            <>
              <h2 className="cm-state__name type-display-l">{selectedState.state}</h2>
              <p className="cm-state__count type-label tnum">
                {count > 0
                  ? `${count} LAWSAN ${count === 1 ? "chapter" : "chapters"}`
                  : "LAWSAN chapters"}
              </p>

              {count > 0 ? (
                <ul className="cm-ledger" key={selectedState.slug}>
                  {selectedState.chapters.map((chapter, i) => (
                    <li key={chapter.slug}>
                      <button
                        type="button"
                        className="cm-ledger__row"
                        aria-current={chapter.slug === selection.chapterSlug ? "true" : undefined}
                        aria-label={`${chapter.institution} — ${selectedState.state}`}
                        onClick={() => selectChapter(chapter.slug)}
                      >
                        <span className="cm-ledger__idx type-label-s tnum" aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Reveal as="span" delayMs={i * 60} className="cm-ledger__name type-display-m">
                          {chapter.institution}
                        </Reveal>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                /* A state whose chapters are not currently supplied stays
                 * visually intentional — nothing is invented to fill it. */
                <p className="cm-mark type-display-m">{NEEDS_CONTENT}</p>
              )}
            </>
          ) : (
            <p className="cm-mark type-display-m">{NEEDS_CONTENT}</p>
          )}
        </div>

        <div className="cm-profile-col">
          <ChapterProfile chapter={selectedChapter} stateName={selectedState?.state} />
        </div>
      </div>
    </div>
  );
}
