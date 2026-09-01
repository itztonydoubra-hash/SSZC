/*
 * Smooth-scroll provider (design.md A6 / A8, tasks.md 4.1).
 *
 * Lenis is imported ONLY here — no component imports it directly, so the
 * smooth-scroll library can be swapped without touching the rest of the site
 * (design.md A6.3 library-agnostic rule). Disabled entirely under reduced
 * motion (native scroll) and on coarse pointers is left to the browser.
 *
 * This is a global A-level mechanism and does NOT count toward a page's motion
 * budget (design.md A6.0).
 */
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./useReducedMotion";

export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return; // native scroll under reduced motion — no Lenis.

    const lenis = new Lenis({
      // Restrained, not exaggerated: a gentle smoothing, not a heavy glide.
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
