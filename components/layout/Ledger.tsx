/*
 * Ledger PRIMITIVE (design.md A4.3 "ledger row" / C12) — the record format that
 * REPLACES cards across the site. A ledger is a semantic list; each row is a
 * set of slots (index · title · meta · terminal) divided by hairlines.
 *
 * Slots are reorderable per context: a caller passes an array of slot nodes and
 * an optional column template so Publications can lead with category/title,
 * Events-past with date, Chapters with institution — the SAME primitive, a
 * DIFFERENT arrangement. No card styling (no box, border, shadow, radius).
 */
import type { CSSProperties, ReactNode } from "react";

export function Ledger({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <ul className={join("l-ledger", className)} style={style}>
      {children}
    </ul>
  );
}

export function LedgerRow({
  /** grid-template-columns for this row's slots; token/fr based, per context. */
  columns,
  className,
  style,
  children,
}: {
  columns?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <li
      className={join("l-ledger__row", className)}
      style={{
        ...(columns ? { gridTemplateColumns: columns } : { gridTemplateColumns: "1fr" }),
        ...style,
      }}
    >
      {children}
    </li>
  );
}

function join(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
