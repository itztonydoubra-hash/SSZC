/*
 * In-view trigger (design.md A6.1, tasks.md 4.2).
 *
 * A tiny IntersectionObserver wrapper — the internal API that reveal primitives
 * use to know "this block has entered view". Library-agnostic: no animation
 * library is imported here, so the reveal mechanism survives a library swap.
 *
 * Fires once by default (reveals do not replay on re-scroll — A6/B4 count-once
 * ethos applies to reveals too, avoiding re-trigger jitter).
 */
"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** viewport enter threshold; A6.1 triggers reveals ~80% down the viewport */
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
  /** when true, the hook reports "in view" immediately (used under reduced
   *  motion so the static end-state shows without waiting for observation) */
  disabled?: boolean;
};

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
) {
  const {
    rootMargin = "0px 0px -20% 0px", // ~80% of viewport (A6.1)
    threshold = 0,
    once = true,
    disabled = false,
  } = options;

  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true); // no observer support -> show content (content-first)
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold, once, disabled]);

  return { ref, inView };
}
