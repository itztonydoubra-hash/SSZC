/* Hero scroll cue (design.md C3) — the one permitted decorative idle motion.
 * Static under reduced motion. */
"use client";

export function HeroCue() {
  return (
    <span className="hp-hero__cue type-label-s" aria-hidden>
      Scroll ↓
    </span>
  );
}
