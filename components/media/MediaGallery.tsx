/*
 * MediaGallery (design.md C8) — album-grouped photo archive.
 *
 * Each album is a titled section with a compact horizontal-scrolling thumbnail
 * strip. Clicking any thumbnail opens a full-screen focus-trapped lightbox with
 * keyboard / arrow navigation across ALL photos in that album.
 *
 * No fabricated captions/metadata — shown only if supplied.
 * Empty albums array → honest empty state.
 */
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { MediaAlbum, MediaItem } from "@/content/types";
import { useFocusTrap } from "@/lib/a11y/useFocusTrap";
import { assetPath } from "@/lib/asset";

function Lightbox({
  items,
  index,
  onClose,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const trapRef = useFocusTrap<HTMLDivElement>(true, onClose);
  const move = useCallback(
    (dir: number) => setCurrent((c) => (c + dir + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [move, onClose]);

  const active = items[current];
  if (!active) return null;

  return (
    <div
      ref={trapRef}
      role="dialog"
      aria-modal="true"
      aria-label={active.alt}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 150,
        background: "var(--scrim-ink-70)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "min(90vw, 1200px)",
          maxHeight: "85vh",
          width: "100%",
          aspectRatio: active.ratio ?? "4 / 3",
        }}
      >
        <Image
          src={assetPath(active.src)}
          alt={active.alt}
          fill
          sizes="90vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <button
        type="button"
        className="type-label"
        onClick={onClose}
        style={{ position: "absolute", top: "var(--space-4)", right: "var(--space-5)", background: "none", border: 0, color: "var(--ivory)", cursor: "pointer" }}
      >
        Close ✕
      </button>
      <button
        type="button"
        aria-label="Previous"
        className="type-label"
        onClick={() => move(-1)}
        style={{ position: "absolute", left: "var(--space-4)", background: "none", border: 0, color: "var(--ivory)", cursor: "pointer", fontSize: "1.5rem" }}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next"
        className="type-label"
        onClick={() => move(1)}
        style={{ position: "absolute", right: "var(--space-4)", background: "none", border: 0, color: "var(--ivory)", cursor: "pointer", fontSize: "1.5rem" }}
      >
        →
      </button>
      {(active.caption || active.event) && (
        <p
          className="type-label"
          style={{ position: "absolute", bottom: "var(--space-4)", left: 0, right: 0, textAlign: "center", color: "var(--ivory)" }}
        >
          {[active.caption, active.event, active.year].filter(Boolean).join(" · ")}
        </p>
      )}
    </div>
  );
}

function Album({ album }: { album: MediaAlbum }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="pg-album" aria-label={album.title}>
      <div className="pg-album__header">
        <h2 className="pg-album__title type-label">{album.title}</h2>
        {album.description && (
          <p className="pg-album__desc type-label" style={{ color: "var(--surface-text-muted)" }}>
            {album.description}
          </p>
        )}
      </div>

      <div className="pg-album__strip" role="list">
        {album.items.map((item, i) => (
          <figure className="pg-album__thumb" key={item.src} role="listitem">
            <button
              type="button"
              data-cursor="view"
              className="pg-album__btn"
              aria-label={`View: ${item.alt}`}
              onClick={() => setOpen(i)}
            >
              <span
                className="pg-album__frame"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={assetPath(item.src)}
                  alt={item.alt}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </span>
            </button>
          </figure>
        ))}
      </div>

      {open !== null && (
        <Lightbox items={album.items} index={open} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}

export function MediaGallery({ albums }: { albums: MediaAlbum[] }) {
  if (albums.length === 0) {
    return (
      <p className="type-body-l" style={{ color: "var(--stone)", marginTop: "var(--space-7)" }}>
        Photographs from the zone&rsquo;s conventions, competitions, trainings and
        outreach will be gathered here.
      </p>
    );
  }

  return (
    <div className="pg-media" style={{ marginTop: "var(--space-7)" }}>
      {albums.map((album) => (
        <Album key={album.title} album={album} />
      ))}
    </div>
  );
}
