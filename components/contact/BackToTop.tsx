"use client";

import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

export function BackToTop() {
  const reduced = usePrefersReducedMotion();
  return (
    <button
      type="button"
      className="col-backtotop type-label-s"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
    >
      Back to top ↑
    </button>
  );
}
