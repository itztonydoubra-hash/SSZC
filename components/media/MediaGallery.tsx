/*
 * MediaGallery (design.md C8) — importance-sized editorial masonry over the
 * CLIENT-SUPPLIED photographs (decisions.md D2). Native ratios preserved (no
 * forced uniform crop). Click opens a focus-trapped, keyboard/arrow/Esc
 * lightbox. No fabricated captions/metadata — shown only if supplied. Empty
 * (files not yet intaken) → honest [OFFICIAL IMAGE] placeholder note.
 */
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/content/types";
import { useFocusTrap } from "@/lib/a11y/useFocusTrap";
import { assetPath } from "@/lib/asset";

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const trapRef = useFocusTrap<HTMLDivElement>(open !== null, () => setOpen(null));

  const move = useCallback(
    (dir: number) => setOpen((cur) => (cur === null ? null : (cur + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, move]);

  if (items.length === 0) {
    return (
      <p className="type-body-l" style={{ color: "var(--stone)", marginTop: "var(--space-7)" }}>
        {/* CLIENT-SUPPLIED MEDIA — files not yet intaken. */}
        Photographs from the zone&rsquo;s conventions, competitions, trainings and
        outreach will be gathered here.
      </p>
    );
  }

  const active = open !== null ? items[open] : null;

  return (
    <>
      <div className="pg-media" style={{ marginTop: "var(--space-7)" }}>
        {items.map((m, i) => (
          <figure className="pg-media__item" key={m.src}>
            <button
              type="button"
              data-cursor="view"
              style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer", width: "100%", display: "block", position: "relative" }}
              aria-label={`View: ${m.alt}`}
              onClick={() => setOpen(i)}
            >
              <span style={{ display: "block", position: "relative", aspectRatio: m.ratio ?? "4 / 5" }}>
                <Image src={assetPath(m.src)} alt={m.alt} fill sizes="(max-width:767px) 100vw, (max-width:1023px) 50vw, 33vw" style={{ objectFit: "cover" }} loading="lazy" placeholder={m.poster?.blur ? "blur" : "empty"} blurDataURL={m.poster?.blur} />
              </span>
            </button>
            {m.caption && <figcaption className="pg-media__caption type-label">{m.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {active && (
        <div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          style={{ position: "fixed", inset: 0, zIndex: 150, background: "var(--scrim-ink-70)", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
        >
          <div style={{ position: "relative", maxWidth: "min(90vw, 1200px)", maxHeight: "85vh", width: "100%", aspectRatio: active.ratio ?? "4 / 5" }}>
            <Image src={assetPath(active.src)} alt={active.alt} fill sizes="90vw" style={{ objectFit: "contain" }} />
          </div>
          <button type="button" className="type-label" onClick={() => setOpen(null)} style={{ position: "absolute", top: "var(--space-4)", right: "var(--space-5)", background: "none", border: 0, color: "var(--ivory)", cursor: "pointer" }}>Close ✕</button>
          <button type="button" aria-label="Previous" className="type-label" onClick={() => move(-1)} style={{ position: "absolute", left: "var(--space-4)", background: "none", border: 0, color: "var(--ivory)", cursor: "pointer" }}>←</button>
          <button type="button" aria-label="Next" className="type-label" onClick={() => move(1)} style={{ position: "absolute", right: "var(--space-4)", background: "none", border: 0, color: "var(--ivory)", cursor: "pointer" }}>→</button>
          {(active.caption || active.event) && (
            <p className="type-label" style={{ position: "absolute", bottom: "var(--space-4)", left: 0, right: 0, textAlign: "center", color: "var(--ivory)" }}>
              {[active.caption, active.event, active.year].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      )}
    </>
  );
}
