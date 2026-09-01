import type { Metadata } from "next";
import { getAbout } from "@/content";
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
  return (
    <SurfaceSection surface="ivory" index="01" title="THE ZONE" labelledById="about-title">
      <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="about-title" size="xl" className="measure">{a.statement}</DisplayHeading>

        {/* History */}
        <div className="pg-about__module">
          <Grid>
            <GridItem span={7} spanMd={8} spanSm={4} spine>
              <p className="type-label" style={{ color: "var(--stone-600)" }}>History</p>
              <p className="type-body-m measure" style={{ marginTop: "var(--space-3)" }}>{a.history}</p>
            </GridItem>
          </Grid>
        </div>

        {/* Purpose / Vision / Mission — progressive serif statements */}
        {[
          { label: "Purpose", text: a.purpose },
          { label: "Vision", text: a.vision },
          { label: "Mission", text: a.mission },
        ].map((m) => (
          <div className="pg-about__module" key={m.label}>
            <p className="type-label" style={{ color: "var(--stone-600)" }}>{m.label}</p>
            <DisplayHeading as="h2" size="l" className="measure" style={{ marginTop: "var(--space-3)" }}>{m.text}</DisplayHeading>
          </div>
        ))}

        {/* Values */}
        <div className="pg-about__module">
          <p className="type-label" style={{ color: "var(--stone-600)" }}>Values</p>
          {a.values.length > 0 ? (
            <ul className="pg-about__values">
              {a.values.map((v) => <li key={v} className="type-display-m">{v}</li>)}
            </ul>
          ) : (
            <p className="type-body-m" style={{ color: "var(--stone-600)", marginTop: "var(--space-3)" }}>Core values — [NEEDS CONTENT].</p>
          )}
        </div>

        {/* Scope / role */}
        <div className="pg-about__module">
          <p className="type-label" style={{ color: "var(--stone-600)" }}>Scope &amp; role within LAWSAN</p>
          <p className="type-body-m measure" style={{ marginTop: "var(--space-3)" }}>{a.scope}</p>
          <p className="type-body-m measure" style={{ marginTop: "var(--space-4)" }}>{a.roleInLawsan}</p>
        </div>
      </div>
    </SurfaceSection>
  );
}
