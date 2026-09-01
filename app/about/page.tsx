import type { Metadata } from "next";
import { getAbout } from "@/content";
import { isPlaceholder } from "@/lib/content-display";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { Grid, GridItem } from "@/components/layout/Grid";

export const metadata: Metadata = {
  title: "The Zone — LAWSAN South South",
  description:
    "About the South South Zone of the Law Students' Association of Nigeria: purpose, vision, mission, values and role within LAWSAN.",
};

export default function AboutPage() {
  const a = getAbout();

  const statementReady = !isPlaceholder(a.statement);
  const modules = [
    { label: "Purpose", text: a.purpose },
    { label: "Vision", text: a.vision },
    { label: "Mission", text: a.mission },
  ].filter((m) => !isPlaceholder(m.text));
  const historyReady = !isPlaceholder(a.history);
  const valuesReady = a.values.length > 0;
  const scopeReady = !isPlaceholder(a.scope);
  const roleReady = !isPlaceholder(a.roleInLawsan);

  // Whether ANY real about content exists yet.
  const anyContent =
    statementReady || modules.length > 0 || historyReady || valuesReady || scopeReady || roleReady;

  return (
    <SurfaceSection surface="ivory" index="01" title="THE ZONE" labelledById="about-title">
      <div style={{ paddingBottom: "var(--space-9)" }}>
        {/* The heading is always a true, non-fabricated identity statement. */}
        <DisplayHeading as="h1" id="about-title" size="xl" className="measure">
          {statementReady ? a.statement : "The Law Students' Association of Nigeria, South South Zone."}
        </DisplayHeading>

        {!anyContent && (
          <p className="type-body-l measure" style={{ color: "var(--stone-600)", marginTop: "var(--space-6)" }}>
            The story of the South South Zone — its history, purpose, vision,
            mission, values and role within LAWSAN — will be told here.
          </p>
        )}

        {historyReady && (
          <div className="pg-about__module">
            <Grid>
              <GridItem span={7} spanMd={8} spanSm={4} spine>
                <p className="type-label" style={{ color: "var(--stone-600)" }}>History</p>
                <p className="type-body-m measure" style={{ marginTop: "var(--space-3)" }}>{a.history}</p>
              </GridItem>
            </Grid>
          </div>
        )}

        {modules.map((m) => (
          <div className="pg-about__module" key={m.label}>
            <p className="type-label" style={{ color: "var(--stone-600)" }}>{m.label}</p>
            <DisplayHeading as="h2" size="l" className="measure" style={{ marginTop: "var(--space-3)" }}>{m.text}</DisplayHeading>
          </div>
        ))}

        {valuesReady && (
          <div className="pg-about__module">
            <p className="type-label" style={{ color: "var(--stone-600)" }}>Values</p>
            <ul className="pg-about__values">
              {a.values.map((v) => <li key={v} className="type-display-m">{v}</li>)}
            </ul>
          </div>
        )}

        {(scopeReady || roleReady) && (
          <div className="pg-about__module">
            <p className="type-label" style={{ color: "var(--stone-600)" }}>Scope &amp; role within LAWSAN</p>
            {scopeReady && <p className="type-body-m measure" style={{ marginTop: "var(--space-3)" }}>{a.scope}</p>}
            {roleReady && <p className="type-body-m measure" style={{ marginTop: "var(--space-4)" }}>{a.roleInLawsan}</p>}
          </div>
        )}
      </div>
    </SurfaceSection>
  );
}
