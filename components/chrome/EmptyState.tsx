/*
 * EmptyState (design.md C10 / C12) — a composed "no content yet" section used by
 * Opportunities, filtered lists and upcoming events. It must look deliberate,
 * never fabricate content, and never be an afterthought. Structural only:
 * an eyebrow + a serif line + an optional Manrope invite line.
 */
import type { ReactNode } from "react";
import { IndexTitle } from "./IndexTitle";
import { DisplayHeading } from "./DisplayHeading";

export function EmptyState({
  index,
  eyebrow,
  headline,
  children,
}: {
  index?: string;
  eyebrow?: string;
  /** the serif statement, e.g. "No opportunities are open at the moment." */
  headline: string;
  /** optional invite line / links (Manrope) */
  children?: ReactNode;
}) {
  return (
    <div className="c-empty">
      {index && eyebrow && <IndexTitle index={index} title={eyebrow} />}
      <DisplayHeading as="p" size="l" reveal={false} style={{ marginTop: "var(--space-4)" }}>
        {headline}
      </DisplayHeading>
      {children && (
        <div className="type-body-m" style={{ marginTop: "var(--space-4)", color: "var(--surface-text-muted)" }}>
          {children}
        </div>
      )}
    </div>
  );
}
