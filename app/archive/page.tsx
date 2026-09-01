import type { Metadata } from "next";
import { getAdministrations } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { EmptyState } from "@/components/chrome/EmptyState";

export const metadata: Metadata = {
  title: "Administration Archive — LAWSAN South South",
  description: "A visual history of past South South zonal administrations.",
};

export default function ArchivePage() {
  const admins = getAdministrations();
  return (
    <SurfaceSection surface="ivory" index="01" title="THE ARCHIVE" labelledById="archive-title">
      <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="archive-title" size="xl">The record of past leadership.</DisplayHeading>
        {admins.length === 0 ? (
          <EmptyState headline="Past administrations will be recorded here.">Administration archive — [NEEDS CONTENT].</EmptyState>
        ) : (
          <ol className="pg-timeline">
            {admins.map((a) => (
              <li className="pg-timeline__node" key={a.session}>
                <DisplayHeading as="h2" size="l" reveal={false}>{a.session}</DisplayHeading>
                {a.director && <p className="type-body-m" style={{ marginTop: "var(--space-3)" }}><span style={{ color: "var(--stone-600)" }}>Zonal Director: </span>{a.director}</p>}
                {a.team && a.team.length > 0 && (
                  <ul className="pg-ledger">
                    {a.team.map((t, i) => (
                      <li key={i} className="pg-ledger__row" style={{ gridTemplateColumns: "auto 1fr" }}>
                        <span className="pg-ledger__meta type-label">{t.role}</span>
                        <span className="type-body-l">{t.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {a.achievements && a.achievements.length > 0 && (
                  <ul style={{ listStyle: "none", padding: 0, marginTop: "var(--space-4)" }}>
                    {a.achievements.map((ach, i) => <li key={i} className="type-body-m" style={{ marginBottom: "var(--space-2)" }}>— {ach}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </SurfaceSection>
  );
}
