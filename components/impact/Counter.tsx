/*
 * Counter (design.md B4/C12) — counts 0→value once on enter, tabular figures,
 * ease-out ~1s. Reduced motion / no-JS → final value immediately. Reuses the
 * useInView primitive; no new library.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/motion/useInView";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

export function Counter({ value, display, suffix }: { value: number; display?: string; suffix?: string }) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true, disabled: reduced });
  const [n, setN] = useState(reduced ? value : 0);
  const done = useRef(false);

  useEffect(() => {
    if (reduced) { setN(value); return; }
    if (!inView || done.current) return;
    done.current = true;
    const dur = 1000;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  // display override (e.g. "21,000") applies once counting completes / reduced.
  const shown = display && (reduced || n >= value) ? display : n.toLocaleString("en-GB");

  return (
    <span ref={ref} className="tnum" aria-label={`${display ?? value}${suffix ?? ""}`}>
      <span aria-hidden>{shown}</span>
      {suffix && <span className="im-beat__suffix" aria-hidden>{suffix}</span>}
    </span>
  );
}
