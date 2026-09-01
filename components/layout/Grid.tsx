/*
 * Layout PRIMITIVES (design.md A4.2/A4.3, tasks.md 3.2).
 *
 * These are STRUCTURAL helpers only — they impose no colours, sizes, or a
 * "section look". The five experiences compose them differently. There is
 * deliberately NO Card, NO fixed three-column feature block, NO universal
 * section template here.
 *
 * All spacing/placement flows through tokens or column numbers; nothing takes
 * an arbitrary px value.
 */
import type { CSSProperties, ElementType, ReactNode } from "react";

type WithClass = { className?: string; style?: CSSProperties };

/* ---------------------------------------------------------------------------
 * Container — max-width guard + outer margin. Not a "centered content" box;
 * inner content is free to be asymmetric.
 * ------------------------------------------------------------------------- */
export function Container({
  as: As = "div",
  className,
  style,
  children,
}: WithClass & { as?: ElementType; children: ReactNode }) {
  return (
    <As className={cx("l-container", className)} style={style}>
      {children}
    </As>
  );
}

/* ---------------------------------------------------------------------------
 * Grid — N-column track (N follows the responsive grid tokens). Optional row
 * gap via a spacing-scale step (token-only).
 * ------------------------------------------------------------------------- */
export function Grid({
  as: As = "div",
  rowGap,
  className,
  style,
  children,
}: WithClass & {
  as?: ElementType;
  /** spacing token step, e.g. "var(--space-6)"; omitted = 0 */
  rowGap?: string;
  children: ReactNode;
}) {
  return (
    <As
      className={cx("l-grid", className)}
      style={{ ...(rowGap ? { ["--grid-row-gap" as string]: rowGap } : {}), ...style }}
    >
      {children}
    </As>
  );
}

/* ---------------------------------------------------------------------------
 * GridItem — placement by column span/start, DIFFERENT per breakpoint so the
 * composition recomposes (not shrinks). `spine` forces column-start 1 (shared
 * left edge). `overlap` crosses a boundary by a measured token amount.
 * ------------------------------------------------------------------------- */
type ColProps = {
  /** desktop (12-col) */
  span?: number;
  start?: number;
  /** tablet (8-col) */
  spanMd?: number;
  startMd?: number;
  /** mobile (4-col) */
  spanSm?: number;
  startSm?: number;
  /** force alignment to the shared spine (column 1) */
  spine?: boolean;
  /** measured overlap across a boundary (token strings, e.g. "var(--space-6)").
   *  Desktop/tablet only by default; overlaps neutralise on mobile unless the
   *  *Sm variants are set (A10 recomposition). */
  overlapX?: string;
  overlapY?: string;
  overlapXMd?: string;
  overlapYMd?: string;
  overlapXSm?: string;
  overlapYSm?: string;
};

export function GridItem({
  as: As = "div",
  span,
  start,
  spanMd,
  startMd,
  spanSm,
  startSm,
  spine,
  overlapX,
  overlapY,
  overlapXMd,
  overlapYMd,
  overlapXSm,
  overlapYSm,
  className,
  style,
  children,
}: WithClass & ColProps & { as?: ElementType; children: ReactNode }) {
  const vars: Record<string, string> = {};
  if (span != null) vars["--col-span"] = String(span);
  if (start != null) vars["--col-start"] = String(start);
  if (spine) vars["--col-start"] = "1";
  if (spanMd != null) vars["--col-span-md"] = String(spanMd);
  if (startMd != null) vars["--col-start-md"] = String(startMd);
  if (spanSm != null) vars["--col-span-sm"] = String(spanSm);
  if (startSm != null) vars["--col-start-sm"] = String(startSm);
  if (overlapX) vars["--overlap-x"] = overlapX;
  if (overlapY) vars["--overlap-y"] = overlapY;
  if (overlapXMd) vars["--overlap-x-md"] = overlapXMd;
  if (overlapYMd) vars["--overlap-y-md"] = overlapYMd;
  if (overlapXSm) vars["--overlap-x-sm"] = overlapXSm;
  if (overlapYSm) vars["--overlap-y-sm"] = overlapYSm;

  return (
    <As
      className={cx(
        "l-item",
        spine && "l-spine",
        (overlapX || overlapY) && "l-overlap",
        className,
      )}
      style={{ ...(vars as CSSProperties), ...style }}
    >
      {children}
    </As>
  );
}

/* ---------------------------------------------------------------------------
 * Bleed — full-viewport-width escape (photographic material). Never adds
 * horizontal scroll (uses the 50%/50vw technique).
 * ------------------------------------------------------------------------- */
export function Bleed({
  as: As = "div",
  className,
  style,
  children,
}: WithClass & { as?: ElementType; children: ReactNode }) {
  return (
    <As className={cx("l-bleed", className)} style={style}>
      {children}
    </As>
  );
}

/* ---------------------------------------------------------------------------
 * Stack — token-only vertical spacing (the single generic spacing helper).
 * ------------------------------------------------------------------------- */
export function Stack({
  as: As = "div",
  gap = "var(--space-4)",
  className,
  style,
  children,
}: WithClass & { as?: ElementType; gap?: string; children: ReactNode }) {
  return (
    <As
      className={cx("l-stack", className)}
      style={{ ["--stack-gap" as string]: gap, ...style }}
    >
      {children}
    </As>
  );
}

/* Small class-name joiner (no dependency). */
function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
