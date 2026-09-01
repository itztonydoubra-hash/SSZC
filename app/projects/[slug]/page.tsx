import { withExportFallback } from "@/lib/staticParams";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MaskImage } from "@/components/chrome/MaskImage";
import { Container, Grid, GridItem, Stack } from "@/components/layout/Grid";

export const dynamicParams = false;
export function generateStaticParams() {
  return withExportFallback(getProjects());
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  return p ? { title: `${p.name} — LAWSAN South South`, description: p.purpose } : { title: "Projects — LAWSAN South South" };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  return (
    <SurfaceSection surface="ivory" contained={false}>
      {p.images[0] && (
        <div className="l-bleed" style={{ aspectRatio: "2 / 1", position: "relative" }}>
          <MaskImage src={p.images[0].src} alt={p.images[0].alt} ratio="2 / 1" sizes="100vw" priority />
        </div>
      )}
      <Container>
        <div style={{ paddingBlock: "var(--space-8)" }}>
          <DisplayHeading as="h1" size="xl" className="measure">{p.name}</DisplayHeading>
          <div className="pg-spread__meta type-label" style={{ marginTop: "var(--space-4)" }}>
            {p.location && <span>{p.location}</span>}
            {p.date && <span>{p.date}</span>}
            {p.beneficiaries && <span>{p.beneficiaries}</span>}
          </div>
          <Stack gap="var(--space-6)" style={{ marginTop: "var(--space-7)", maxWidth: "72ch" }}>
            <div><p className="type-label" style={{ color: "var(--stone-600)" }}>Purpose</p><p className="type-body-m">{p.purpose}</p></div>
            <div><p className="type-label" style={{ color: "var(--stone-600)" }}>Description</p><p className="type-body-m">{p.description}</p></div>
            {p.results && <div><p className="type-label" style={{ color: "var(--stone-600)" }}>Results</p><p className="type-body-m">{p.results}</p></div>}
          </Stack>
        </div>
      </Container>
    </SurfaceSection>
  );
}
