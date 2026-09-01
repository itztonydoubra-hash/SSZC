import { withExportFallback } from "@/lib/staticParams";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNews, getNewsItem } from "@/content";
import { fmtDate } from "@/lib/date";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { Container } from "@/components/layout/Grid";

export const dynamicParams = false;
export function generateStaticParams() {
  return withExportFallback(getNews());
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const n = getNewsItem(params.slug);
  return n ? { title: `${n.title} — LAWSAN South South`, description: n.excerpt } : { title: "News — LAWSAN South South" };
}

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const n = getNewsItem(params.slug);
  if (!n) notFound();
  return (
    <SurfaceSection surface="ivory" contained={false}>
      <Container>
        <article style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)", maxWidth: "72ch" }}>
          <p className="type-label tnum" style={{ color: "var(--stone-600)" }}>{fmtDate(n.date, { day: "2-digit", month: "long", year: "numeric" })}</p>
          <DisplayHeading as="h1" size="l" style={{ marginTop: "var(--space-3)" }}>{n.title}</DisplayHeading>
          <div className="type-body-m" style={{ marginTop: "var(--space-6)" }}>
            {n.body ? n.body.split("\n\n").map((p, i) => <p key={i} style={{ marginBottom: "var(--space-4)" }}>{p}</p>)
              : n.externalUrl ? <p>Read more: <a href={n.externalUrl} target="_blank" rel="noreferrer noopener" style={{ color: "var(--crimson)" }}>{n.externalUrl} ↗</a></p>
              : <p>{n.excerpt}</p>}
          </div>
        </article>
      </Container>
    </SurfaceSection>
  );
}
