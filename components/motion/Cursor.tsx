/*
 * Custom cursor controller (design.md A7, tasks.md 4.4).
 *
 * Renders only on FINE pointers (desktop mouse). It follows the pointer and
 * reflects the nearest ancestor's data-cursor value — one of exactly three:
 * "view" | "open" | "drag". Any other element leaves the native cursor.
 *
 * Rules enforced here:
 *  - three labels only (typed union), no ad-hoc labels;
 *  - disabled entirely on touch/coarse pointers (never mounts the follower);
 *  - it AUGMENTS, never replaces, on-element affordances (those live on the
 *    elements themselves), so nothing depends on the cursor.
 *
 * The cursor colour inverts by surface: elements on ink use the default ivory
 * dot; a .surface-ivory ancestor can set --cursor-color to --ink via CSS if a
 * darker dot is wanted. (Kept minimal here; label pill is crimson regardless.)
 */
"use client";

import { useEffect, useRef, useState } from "react";

type CursorKind = "view" | "open" | "drag";
const LABELS: Record<CursorKind, string> = {
  view: "VIEW",
  open: "OPEN",
  drag: "DRAG",
};

function isFinePointer(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [kind, setKind] = useState<CursorKind | null>(null);

  useEffect(() => {
    if (!isFinePointer()) return; // never mount behaviour on touch/coarse
    setEnabled(true);

    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      // Resolve the nearest data-cursor ancestor; validate against the union.
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      const raw = el?.getAttribute("data-cursor");
      const next =
        raw === "view" || raw === "open" || raw === "drag" ? raw : null;
      setKind((prev) => (prev === next ? prev : next));
    };

    const loop = () => {
      // gentle follow smoothing (~0.2) — reduced-motion users still get a
      // cursor, the CSS just removes the grow easing.
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      root.style.setProperty("--cursor-x", `${cx}px`);
      root.style.setProperty("--cursor-y", `${cy}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="cursor-root"
      data-cursor={kind ?? undefined}
      aria-hidden="true"
    >
      <span className="cursor-dot" />
      <span className="cursor-label type-label-s">
        {kind ? LABELS[kind] : ""}
      </span>
    </div>
  );
}
