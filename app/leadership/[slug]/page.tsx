/*
 * Leadership detail (design.md B1.1 — optional per-executive profile).
 * Renders ONLY for a zonal executive that has a slug AND a bio/socials detail
 * (design.md/requirements: name+role+portrait is sufficient v1; a detail view is
 * optional). Unknown/without-detail slugs 404 — no fabricated profile page.
 *
 * Image continuity with the Register is by reusing the SAME crop, not a FLIP
 * (design.md A8). Navigation into here uses the standard page transition.
 */
import { withExportFallback } from "@/lib/staticParams";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getLeadership } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { Container, Grid, GridItem, Stack } from "@/components/layout/Grid";
import { assetPath } from "@/lib/asset";

function findExec(slug: string) {
  return getLeadership().zonal.find((e) => e.slug === slug);
}

export const dynamicParams = false;
export function generateStaticParams() {
  return withExportFallback(
    getLeadership()
      .zonal.filter((e) => e.slug && (e.bio || e.socials?.length))
      .map((e) => ({ slug: e.slug as string })),
  );
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const exec = findExec(params.slug);
  if (!exec) return { title: "Leadership — LAWSAN South South" };
  return {
    title: `${exec.name} — LAWSAN South South`,
    description: exec.bio ?? undefined,
  };
}

export default function ExecutiveDetail({ params }: { params: { slug: string } }) {
  const exec = findExec(params.slug);
  // Only executives with a slug + a detail (bio/socials) get a page.
  if (!exec || !exec.slug || !(exec.bio || exec.socials?.length)) notFound();

  return (
    <SurfaceSection surface="ink" contained={false}>
      <Container>
        <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))" }}>
          <p className="type-label" style={{ color: "var(--ivory)" }}>
            <span aria-hidden>{exec.index} </span>— {exec.role}
          </p>
        </div>
        <Grid rowGap="var(--space-6)" style={{ paddingBlock: "var(--space-8)" }}>
          <GridItem span={5} spanMd={8} spanSm={4}>
            <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden" }}>
              {exec.portrait.src ? (
                <Image src={assetPath(exec.portrait.src)} alt={exec.portrait.alt} fill sizes="(max-width: 767px) 100vw, 40vw" style={{ objectFit: "cover" }} />
              ) : (
                <div className="lr-portrait__placeholder">
                  <span className="visually-hidden">Portrait to follow</span>
                </div>
              )}
            </div>
          </GridItem>
          <GridItem span={6} start={7} spanMd={8} startMd={1} spanSm={4}>
            <Stack gap="var(--space-5)">
              <DisplayHeading as="h1" size="xl">{exec.name}</DisplayHeading>
              {exec.bio && <p className="type-body-l measure" style={{ color: "var(--stone)" }}>{exec.bio}</p>}
              {exec.socials && exec.socials.length > 0 && (
                <ul className="l-ledger" aria-label="Social links">
                  {exec.socials.map((s) => (
                    <li key={s.url} className="l-ledger__row" style={{ gridTemplateColumns: "1fr auto" }}>
                      <a href={s.url} className="type-label" style={{ color: "var(--ivory)" }} target="_blank" rel="noreferrer noopener">
                        {s.platform}
                      </a>
                      <span aria-hidden className="type-label" style={{ color: "var(--crimson)" }}>↗</span>
                    </li>
                  ))}
                </ul>
              )}
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </SurfaceSection>
  );
}
