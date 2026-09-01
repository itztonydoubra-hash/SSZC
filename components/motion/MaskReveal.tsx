/*
 * MaskReveal PRIMITIVE (design.md A6.1, tasks.md 4.2) — image mask-open.
 *
 * Wraps a single image (or media child). On enter, the clip edge opens while
 * the inner image de-scales 1.06 -> 1.0 (styles/motion.css). Under reduced
 * motion the image simply shows (no clip, no scale). This is the shared image
 * reveal used across sections; the actual <img>/<Image> is passed as children
 * so image optimisation stays with the caller (next/image in real sections).
 */
"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/motion/useInView";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

type MaskRevealProps = {
  /** aspect ratio, e.g. "3 / 2" or "4 / 5" — enforces box before image loads */
  ratio?: string;
  delayMs?: number;
  className?: string;
  style?: CSSProperties;
  /** the media element; it receives the .m-mask__img class via the wrapper */
  children: ReactNode;
};

export function MaskReveal({
  ratio,
  delayMs,
  className,
  style,
  children,
}: MaskRevealProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ disabled: reduced });

  return (
    <div
      ref={ref}
      className={join("m-mask", className)}
      data-inview={inView ? "true" : "false"}
      style={{
        ...(ratio ? { aspectRatio: ratio } : {}),
        ...(delayMs ? { ["--m-delay" as string]: `${delayMs}ms` } : {}),
        ...style,
      }}
    >
      <div className="m-mask__img">{children}</div>
    </div>
  );
}

function join(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
