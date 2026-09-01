/*
 * Held parallax (design.md A6.1, tasks.md 4.2).
 *
 * Drifts a LARGE image by a capped amount as it passes through the viewport.
 * The magnitude is clamped to the --parallax-max token (default 8%) of the
 * element's own height, so no component can invent a bigger move. Reads scroll
 * via rAF (passive), writes only a transform custom property (compositor-only).
 *
 * Disabled entirely under reduced motion (returns a no-op ref). Never attach to
 * small images — this is a caller convention; the hook does not enforce size.
 */
"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./useReducedMotion";

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  /** fraction of element height to drift across its full scroll pass, capped by
   *  --parallax-max. e.g. 0.08 = 8%. */
  amount = 0.08,
) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    // Read the token cap so JS and CSS agree on the ceiling.
    const capPct =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--parallax-max",
        ),
      ) || 8;
    const cap = capPct / 100;
    const drift = Math.min(Math.abs(amount), cap);

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      // progress: -1 (below viewport) .. 0 (centered) .. 1 (above)
      const centerFromViewportCenter =
        rect.top + rect.height / 2 - vh / 2;
      const progress = Math.max(
        -1,
        Math.min(1, centerFromViewportCenter / (vh / 2 + rect.height / 2)),
      );
      const offsetPx = -progress * drift * rect.height;
      el.style.setProperty("--m-parallax", `${offsetPx.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [amount, reduced]);

  return ref;
}
