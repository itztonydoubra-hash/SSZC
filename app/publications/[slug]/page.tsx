/*
 * Publication article (design.md B3). Long-form reading on ivory, Manrope
 * dominant, serif title + margin pull-quotes. Image continuity by same crop
 * (no FLIP). 404 for unknown slugs. Reads getPublications().
 */
import { withExportFallback } from "@/lib/staticParams";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublications } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MaskImage } from "@/components/chrome/MaskImage";
import { Container } from "@/components/layout/Grid";

function find(slug: string) {
  return getPublications().items.find((i) => i.slug === slug);
}
function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

export const dynamicParams = false;
export function generateStaticParams() {
  return withExportFallback(getPublications().items);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = find(params.slug);
  return p ? { title: `${p.title} — LAWSAN South South`, description: p.excerpt } : { title: "Publications — LAWSAN South South" };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const p = find(params.slug);
  if (!p) notFound();

  return (
    <SurfaceSection surface="ivory" contained={false}>
      <Container>
        <article className="pub-article measure" style={{ maxWidth: "72ch", paddingTop: "calc(var(--space-9) + var(--space-6))" }}>
          {/* Photo-free editorial lead: a crimson eyebrow + rule carries the
              page when no feature image is supplied (no fabricated imagery). */}
          <p className="pub-featured__cat type-label">Publications</p>
          <DisplayHeading as="h1" size="l" style={{ marginTop: "var(--space-3)" }}>{p.title}</DisplayHeading>
          <p className="pub-article__meta type-body-s tnum">
            <span>{p.author}</span>
            <span>{fmtDate(p.date)}</span>
          </p>
          {p.featureImage ? (
            <MaskImage src={p.featureImage.src} alt={p.featureImage.alt} ratio={p.featureImage.ratio} sizes="72ch" />
          ) : (
            <hr className="pub-article__rule" />
          )}
          <div className="pub-article__body type-body-m">
            {p.body ? (
              p.body.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
            ) : p.externalUrl ? (
              <p>
                Read the full piece:{" "}
                <a href={p.externalUrl} target="_blank" rel="noreferrer noopener" style={{ color: "var(--crimson)" }}>
                  {p.externalUrl} ↗
                </a>
              </p>
            ) : (
              <p style={{ color: "var(--stone-600)" }}>The full text of this piece will be published here.</p>
            )}
          </div>
          {p.pdf && (
            <a className="pub-report type-label" href={p.pdf.url} target="_blank" rel="noreferrer noopener">
              ↓ {p.pdf.label ?? "Report"} {p.pdf.size ? `(${p.pdf.size})` : ""}
            </a>
          )}
        </article>
      </Container>
    </SurfaceSection>
  );
}
