import { withExportFallback } from "@/lib/staticParams";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEvent, getEvents } from "@/content";
import { fmtDate, isFuture } from "@/lib/date";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MaskImage } from "@/components/chrome/MaskImage";
import { Container, Stack } from "@/components/layout/Grid";

export const dynamicParams = false;
export function generateStaticParams() {
  return withExportFallback(getEvents());
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getEvent(params.slug);
  return e ? { title: `${e.title} — LAWSAN South South`, description: e.description } : { title: "Events — LAWSAN South South" };
}

export default function EventDetail({ params }: { params: { slug: string } }) {
  const e = getEvent(params.slug);
  if (!e) notFound();
  const upcoming = isFuture(e.date);

  return (
    <SurfaceSection surface="ivory" contained={false}>
      {e.images[0] && (
        <div className="l-bleed" style={{ aspectRatio: "2 / 1", position: "relative" }}>
          <MaskImage src={e.images[0].src} alt={e.images[0].alt} ratio="2 / 1" sizes="100vw" priority />
        </div>
      )}
      <Container>
        <div style={{ paddingBlock: "var(--space-8)", maxWidth: "72ch" }}>
          <DisplayHeading as="h1" size="xl">{e.title}</DisplayHeading>
          <p className="type-label" style={{ color: "var(--stone-600)", marginTop: "var(--space-4)" }}>
            {fmtDate(e.date, { day: "2-digit", month: "long", year: "numeric" })}{e.location ? ` · ${e.location}` : ""}
          </p>
          <Stack gap="var(--space-5)" style={{ marginTop: "var(--space-6)" }}>
            <p className="type-body-m">{e.description}</p>
            {upcoming && e.registrationUrl && (
              <a className="pg-register-link type-label" href={e.registrationUrl} target="_blank" rel="noreferrer noopener">Register ↗</a>
            )}
          </Stack>
        </div>
      </Container>
    </SurfaceSection>
  );
}
