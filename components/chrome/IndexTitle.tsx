/*
 * IndexTitle (design.md A3.2 / C12, decisions.md D4) — the recurring section
 * eyebrow: a two-digit index + a tracked uppercase label ("03 — CHAPTERS").
 *
 * Surface-aware crimson (D4): the numeral is crimson ONLY on ivory surfaces
 * (6.58:1, AA); on ink it uses the surface text colour (small crimson on ink
 * fails AA). This is handled in CSS via `.surface-ivory .c-index__num`, so the
 * component just needs to sit inside a SurfaceSection.
 *
 * It is the ONLY recurring ornament (A3.2). No new pattern.
 */
import type { ElementType } from "react";

export function IndexTitle({
  index,
  title,
  as: As = "p",
  className,
}: {
  index: string;
  title: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <As className={join("c-index type-label", className)}>
      <span className="c-index__num">{index}</span>
      <span aria-hidden>—</span>
      <span>{title}</span>
    </As>
  );
}

function join(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
