import type { Metadata } from "next";
import { getProjects } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MaskImage } from "@/components/chrome/MaskImage";
import { EmptyState } from "@/components/chrome/EmptyState";
import { Grid, GridItem } from "@/components/layout/Grid";
import { TransitionLink } from "@/components/motion/TransitionLink";

export const metadata: Metadata = {
  title: "Projects & Initiatives — LAWSAN South South",
  description: "Projects and initiatives of the South South Zone, told as stories.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <SurfaceSection surface="ivory" index="02" title="PROJECTS & INITIATIVES" labelledById="projects-title">
      <div style={{ paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="projects-title" size="xl">What we do.</DisplayHeading>

        {projects.length === 0 ? (
          <EmptyState headline="Project stories are on the way.">
            The zone&rsquo;s projects and initiatives will be told here as stories.
          </EmptyState>
        ) : (
          projects.map((p, i) => {
            const imageLeft = i % 2 === 1; // alternate template a/b
            return (
              <article className="pg-spread" key={p.slug}>
                <Grid rowGap="var(--space-5)">
                  <GridItem span={7} start={imageLeft ? 1 : 6} spanMd={8} spanSm={4}>
                    {p.images[0] ? (
                      <MaskImage src={p.images[0].src} alt={p.images[0].alt} ratio={p.images[0].ratio} sizes="(max-width:767px) 100vw, 58vw" />
                    ) : (
                      <div style={{ aspectRatio: "3 / 2", background: "var(--ink-800)", display: "flex", alignItems: "flex-end", padding: "var(--space-4)" }}>
                        <span className="visually-hidden">Image to follow</span>
                      </div>
                    )}
                  </GridItem>
                  <GridItem span={5} start={imageLeft ? 8 : 1} spanMd={8} spanSm={4} style={{ alignSelf: "end" }}>
                    <TransitionLink href={`/projects/${p.slug}`} label={{ num: "02", title: p.name.toUpperCase() }} className="type-display-l" style={{ display: "block", color: "var(--ink)", textDecoration: "none" }}>
                      {p.name}
                    </TransitionLink>
                    <div className="pg-spread__meta type-label">
                      {p.location && <span>{p.location}</span>}
                      {p.date && <span>{p.date}</span>}
                      {p.beneficiaries && <span>{p.beneficiaries}</span>}
                    </div>
                    {p.results && <p className="type-body-m measure" style={{ marginTop: "var(--space-3)" }}>{p.results}</p>}
                  </GridItem>
                </Grid>
              </article>
            );
          })
        )}
      </div>
    </SurfaceSection>
  );
}
