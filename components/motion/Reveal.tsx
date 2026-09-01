/*
 * Reveal PRIMITIVES (design.md A6.1, tasks.md 4.2) — line-rise + mask-open.
 *
 * Deliberately small and composable. They wrap content and toggle a
 * `data-inview` attribute when the element enters view; the actual motion is in
 * styles/motion.css. Under reduced motion they render the static end-state
 * immediately (content-first), never a mid-animation.
 *
 * SCOPE (A6.1): `Reveal` is for TITLES and STANDFIRSTS, not body paragraphs.
 * It is the caller's responsibility not to wrap long body copy in it.
 */
"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/motion/useInView";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

type RevealProps = {
  as?: ElementType;
  /** optional stagger delay in ms (e.g. index * 60) — token --stagger governs magnitude */
  delayMs?: number;
  /** clip the rise for a hard "rise from behind an edge" look */
  clip?: boolean;
  /** id on the revealed element (e.g. so a heading can be an aria-labelledby target) */
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Reveal({
  as: As = "div",
  delayMs,
  clip = false,
  id,
  className,
  style,
  children,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLElement>({ disabled: reduced });

  const inner = (
    <As
      ref={clip ? undefined : (ref as never)}
      id={id}
      className={join("m-rise", className)}
      data-inview={inView ? "true" : "false"}
      style={{ ...(delayMs ? { ["--m-delay" as string]: `${delayMs}ms` } : {}), ...style }}
    >
      {children}
    </As>
  );

  if (!clip) return inner;

  // Clipped variant: the ref goes on the clip wrapper so the observer targets
  // the visible box.
  return (
    <div ref={ref as never} className="m-rise-clip">
      <As
        id={id}
        className={join("m-rise", className)}
        data-inview={inView ? "true" : "false"}
        style={{ ...(delayMs ? { ["--m-delay" as string]: `${delayMs}ms` } : {}), ...style }}
      >
        {children}
      </As>
    </div>
  );
}

function join(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
