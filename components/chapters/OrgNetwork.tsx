/*
 * OrgNetwork (design.md B2, tasks.md 9.2) — the desktop stylised node graph,
 * layered over OrgList (the semantic source of truth, kept in the DOM for
 * SR/keyboard). Information visualisation of the real Zone → State → Chapter
 * containment; node positions are a DESIGNED, explicitly NON-GEOGRAPHIC layout.
 *
 * Primary interaction: select a State to read its subtree — hover/focus lights
 * that branch (edges brighten to ivory, chapter dots appear) and MUTES the rest;
 * selecting eases + slides in a chapter panel (ledger rows). Budget (3): network
 * animation (highlight + ease) + panel reveal + ambient breath (≤6px toward the
 * pointer). NO FLIP, NO cursor label on nodes (ordinary <button>s).
 *
 * Rendering: the SVG is PRESENTATIONAL (aria-hidden) — it draws edges, dots and
 * labels in the designed coordinate space. Interaction uses real HTML <button>s
 * positioned over the canvas by percentage (so they scale and stay accessible;
 * SVG foreignObject labels caused scaling artefacts and are not used).
 *
 * Reduced motion: no breath/ease; instant highlight + panel cross-fade. Below
 * 1024px the graph is not rendered (OrgList is the experience).
 *
 * Honesty: with no supplied states the graph shows ONLY the Zone anchor and a
 * [NEEDS CONTENT] note — no fabricated nodes/edges/counts.
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Chapters } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

/* Designed coordinate space, 0..100 on both axes (NON-geographic). */
const VB = 100;
// x=34 (not further left) so the hub's wide serif label fits ENTIRELY to its
// left even on the narrowest canvas that renders the graph. Every edge leaves
// the hub rightward, so the region left of the hub is the one place a wide label
// can never be crossed by an edge.
const ZONE_WITH_STATES = { x: 34, y: 50 };
const ZONE_EMPTY = { x: 42, y: 46 };

export function OrgNetwork({
  data,
  statement,
}: {
  data: Chapters;
  statement?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { zoneLabel, states } = data;
  // When there are no state satellites, centre the lone Zone anchor so the empty
  // stage reads as deliberate (not a node floating off to one side).
  const ZONE = states.length === 0 ? ZONE_EMPTY : ZONE_WITH_STATES;
  const zoneLabelBelow = states.length === 0;

  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const active = selected ?? hovered;

  /* The SVG is `preserveAspectRatio="xMidYMid meet"`, so its 0..100 space maps to
   * the largest CENTRED SQUARE inside the canvas — NOT the canvas box. Positioning
   * the HTML label overlay with plain percentages of the canvas therefore drifts
   * from the dots whenever the canvas is not square (up to ~88px at 1024px, where
   * the canvas is 667x900). Publish the square's size/offset as custom properties
   * so the overlay resolves in exactly the SVG's coordinate space. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sync = () => {
      const r = canvas.getBoundingClientRect();
      const size = Math.min(r.width, r.height);
      canvas.style.setProperty("--cn-sq", `${size}px`);
      canvas.style.setProperty("--cn-sq-x", `${(r.width - size) / 2}px`);
      canvas.style.setProperty("--cn-sq-y", `${(r.height - size) / 2}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  /** Map a designed 0..100 coordinate onto the SVG's rendered square. */
  const at = (x: number, y: number) => ({
    left: `calc(var(--cn-sq-x, 0px) + var(--cn-sq, 100%) * ${x} / 100)`,
    top: `calc(var(--cn-sq-y, 0px) + var(--cn-sq, 100%) * ${y} / 100)`,
  });

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!canvas || !svg) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        svg.style.setProperty("--cn-bx", `${(dx * 6).toFixed(2)}px`);
        svg.style.setProperty("--cn-by", `${(dy * 6).toFixed(2)}px`);
      });
    };
    canvas.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const selectedState = selected != null ? states[selected] : undefined;
  const activeCount = selectedState?.chapters.length ?? 0;

  /* Chapter fan geometry, in designed units. Deliberately COMPACT: the fan must
   * stay inside x +FAN_NEAR..+FAN_FAR so the state label (set at +LABEL_GAP) is
   * never struck by a fan edge. A wider fan is not available — the region left of
   * each node is swept by the other states' hub edges, so the label has nowhere
   * else to go. SPREAD is wide enough that 7 dots (Delta, the largest chapter
   * count) do not touch at r=0.9. */
  const FAN_OFFSET = 4;
  const FAN_RADIUS = 8;
  const FAN_SPREAD = 55; // degrees either side of horizontal
  const LABEL_GAP = 14; // > FAN_OFFSET + FAN_RADIUS (= 12)

  const chapterPos = useMemo(() => {
    return states.map((s) => {
      const n = s.chapters.length;
      return s.chapters.map((_, i) => {
        const angle = (-FAN_SPREAD + (n > 1 ? (2 * FAN_SPREAD * i) / (n - 1) : 0)) * (Math.PI / 180);
        return {
          x: s.layout.x + FAN_OFFSET + Math.cos(angle) * FAN_RADIUS,
          y: s.layout.y + Math.sin(angle) * FAN_RADIUS,
        };
      });
    });
  }, [states]);

  return (
    <div className="cn-network">
      <div className="cn-canvas" ref={canvasRef}>
        {/* Presentational SVG (aria-hidden). Interaction is the button overlay. */}
        <svg
          ref={svgRef}
          className="cn-svg"
          viewBox={`0 0 ${VB} ${VB}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* State→Zone edges */}
          {states.map((s, i) => (
            <line
              key={`edge-${s.state}`}
              className="cn-edge"
              data-active={active === i ? "true" : "false"}
              data-muted={active != null && active !== i ? "true" : "false"}
              x1={ZONE.x}
              y1={ZONE.y}
              x2={s.layout.x}
              y2={s.layout.y}
            />
          ))}
          {/* Chapter edges + dots for the active branch only */}
          {states.map((s, i) =>
            active === i
              ? s.chapters.map((c, ci) => (
                  <g key={`c-${c.slug}`}>
                    <line
                      className="cn-edge"
                      data-active="true"
                      x1={s.layout.x}
                      y1={s.layout.y}
                      x2={chapterPos[i]![ci]!.x}
                      y2={chapterPos[i]![ci]!.y}
                    />
                    <circle className="cn-chapter-dot" cx={chapterPos[i]![ci]!.x} cy={chapterPos[i]![ci]!.y} r={0.9} />
                  </g>
                ))
              : null,
          )}
          {/* State dots */}
          {states.map((s, i) => (
            <circle
              key={`dot-${s.state}`}
              className="cn-state-dot"
              data-selected={selected === i ? "true" : "false"}
              data-muted={active != null && active !== i ? "true" : "false"}
              cx={s.layout.x}
              cy={s.layout.y}
              r={selected === i || active === i ? 2.2 : 1.7}
            />
          ))}
          {/* Zone anchor dot */}
          <circle cx={ZONE.x} cy={ZONE.y} r={3} fill="var(--ivory)" />
        </svg>

        {/* Accessible interaction + labels: HTML overlay positioned by percentage.
            The Zone label and each State are real elements; states are <button>s. */}
        {/* Label offsets are published in DESIGNED UNITS so CSS resolves them in
            the same coordinate space as the SVG (via --cn-sq), not in fixed px
            that would drift as the canvas resizes. */}
        <div
          className="cn-overlay"
          aria-hidden="false"
          style={{ "--cn-lbl-gap": LABEL_GAP, "--cn-hub-gap": 5 } as CSSProperties}
        >
          <span
            className="cn-overlay__zone type-display-m"
            data-below={zoneLabelBelow ? "true" : "false"}
            style={at(ZONE.x, ZONE.y)}
          >
            {zoneLabel}
          </span>
          {states.map((s, i) => (
            <button
              key={`btn-${s.state}`}
              type="button"
              className="cn-overlay__state type-label"
              style={at(s.layout.x, s.layout.y)}
              data-muted={active != null && active !== i ? "true" : "false"}
              aria-pressed={selected === i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => setSelected((cur) => (cur === i ? null : i))}
            >
              {s.state}
            </button>
          ))}
        </div>
      </div>

      {/* Masthead + panel (right column). */}
      <div className="cn-side">
        <p className="type-label" style={{ color: "var(--ivory)" }}>
          <span aria-hidden>03 </span>— CHAPTERS
        </p>
        {statement && <p className="cn-statement type-display-l">{statement}</p>}

        {states.length === 0 ? (
          <p className="cn-side__count type-body-m measure">
            The recognised chapters across the South South Zone will be mapped
            here, state by state.
          </p>
        ) : selectedState ? (
          <>
            <p className="cn-side__count type-label tnum">
              {selectedState.state} — {activeCount > 0 ? `${activeCount} ${activeCount === 1 ? "chapter" : "chapters"}` : "chapters to be confirmed"}
            </p>
            <div className="cn-panel">
              {activeCount > 0 ? (
                selectedState.chapters.map((c) => (
                  <div className="cn-panel__row" key={c.slug}>
                    <span className="type-body-l">{c.institution}</span>
                    {c.location && <span className="cn-panel__row-meta type-label">{c.location}</span>}
                  </div>
                ))
              ) : (
                <p className="cn-tbd type-body-m" style={{ color: "var(--stone)" }}>Chapters to be confirmed.</p>
              )}
            </div>
          </>
        ) : (
          <p className="cn-side__count type-body-m">Select a state to read its chapters.</p>
        )}
      </div>
    </div>
  );
}
