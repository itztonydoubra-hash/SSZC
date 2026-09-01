import type { Metadata } from "next";
import { getOpportunities } from "@/content";
import { fmtDate, isSoon } from "@/lib/date";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { EmptyState } from "@/components/chrome/EmptyState";

export const metadata: Metadata = {
  title: "Opportunities — LAWSAN South South",
  description: "Competitions, scholarships, fellowships and calls for the South South Zone.",
};

const TYPE_LABEL: Record<string, string> = {
  competition: "Competition", scholarship: "Scholarship", fellowship: "Fellowship",
  internship: "Internship", training: "Training", conference: "Conference", call: "Call for Applications",
};

export default function OpportunitiesPage() {
  const all = getOpportunities();
  const open = all.filter((o) => o.status === "open");
  const closed = all.filter((o) => o.status === "closed");

  return (
    <SurfaceSection surface="ivory" index="02" title="OPPORTUNITIES" labelledById="opp-title">
      <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="opp-title" size="xl">Opportunities.</DisplayHeading>

        {all.length === 0 ? (
          <EmptyState headline="No opportunities are open at the moment.">
            New competitions, scholarships and calls will appear here. Follow us for updates.
          </EmptyState>
        ) : (
          <>
            <ul className="pg-ledger">
              {open.map((o) => (
                <li key={o.slug} className="pg-ledger__row" style={{ gridTemplateColumns: "auto 1fr auto auto" }}>
                  <span className="pg-ledger__meta type-label">{TYPE_LABEL[o.type] ?? o.type}</span>
                  <span className="type-display-m">{o.title}</span>
                  {o.deadline && <span className="pg-opp__deadline type-label tnum" data-soon={isSoon(o.deadline) ? "true" : "false"}>Closes {fmtDate(o.deadline)}</span>}
                  {o.applyUrl && <a className="pg-apply type-label" href={o.applyUrl} target="_blank" rel="noreferrer noopener">Apply ↗</a>}
                </li>
              ))}
            </ul>
            {closed.length > 0 && (
              <div style={{ marginTop: "var(--space-8)" }}>
                <p className="type-label" style={{ color: "var(--stone-600)" }}>Closed</p>
                <ul className="pg-ledger">
                  {closed.map((o) => (
                    <li key={o.slug} className="pg-ledger__row pg-opp__closed" style={{ gridTemplateColumns: "auto 1fr" }}>
                      <span className="pg-ledger__meta type-label">{TYPE_LABEL[o.type] ?? o.type}</span>
                      <span className="type-display-m">{o.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </SurfaceSection>
  );
}
