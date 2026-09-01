import type { Metadata } from "next";
import { getNews } from "@/content";
import { fmtDate } from "@/lib/date";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { EmptyState } from "@/components/chrome/EmptyState";
import { TransitionLink } from "@/components/motion/TransitionLink";

export const metadata: Metadata = {
  title: "News & Updates — LAWSAN South South",
  description: "Latest news and updates from the South South Zone.",
};

export default function NewsPage() {
  const news = [...getNews()].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <SurfaceSection surface="ivory" index="02" title="NEWS & UPDATES" labelledById="news-title">
      <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="news-title" size="xl">News &amp; updates.</DisplayHeading>
        {news.length === 0 ? (
          <EmptyState headline="No updates recorded yet.">News & updates — [NEEDS CONTENT].</EmptyState>
        ) : (
          <ul className="pg-ledger">
            {news.map((n) => (
              <li key={n.slug}>
                <TransitionLink href={`/news/${n.slug}`} label={{ num: "02", title: n.title.toUpperCase() }} className="pg-ledger__row">
                  <span className="pg-ledger__date type-label tnum">{fmtDate(n.date)}</span>
                  <span className="type-display-m">{n.title}</span>
                  {n.category && <span className="pg-ledger__meta type-label">{n.category}</span>}
                </TransitionLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SurfaceSection>
  );
}
