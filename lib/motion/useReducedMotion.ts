/*
 * Reduced-motion gate (design.md A6.2 / A8, tasks.md 4.1).
 *
 * A single source of truth for "should motion run?". Every motion primitive
 * reads this; when the user prefers reduced motion, primitives render their
 * STATIC end-state (not a broken mid-state) and smooth-scroll is disabled.
 *
 * SSR-safe: defaults to `true` (reduced) on the server / first paint so the
 * static, content-first markup is what ships first; the client upgrades to
 * animated only if the user has NOT requested reduced motion.
 */
"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  // Start "reduced" so first render is the static baseline (content-first).
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Non-hook read for imperative code (e.g. the page-transition controller). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia(QUERY).matches;
}
