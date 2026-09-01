/*
 * PublicationsIndex (design.md B3) — masthead + featured band + a single
 * metadata-weighted ledger index. Per client direction, there are NO category
 * sub-filters or per-row category labels — the Knowledge Hub is simply
 * "Publications". Reads getPublications(); renders an honest empty state.
 */
"use client";

import { useMemo } from "react";
import type { Publications } from "@/content/types";
import { MaskImage } from "@/components/chrome/MaskImage";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function PublicationsIndex({ data }: { data: Publications }) {
  const featured = useMemo(() => data.items.find((i) => i.featured), [data.items]);
  const listItems = useMemo(
    () => data.items.filter((i) => i !== featured),
    [data.items, featured],
  );

  return (
    <div>
      {/* Masthead */}
      <div className="pub-masthead">
        <DisplayHeading as="h1" size="xl">Publications</DisplayHeading>
        <span className="pub-count type-label tnum">
          {data.items.length} {data.items.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {data.items.length === 0 && (
        <div style={{ marginTop: "var(--space-7)" }}>
          {/* Deliberate empty state — structurally complete; no fabricated pieces. */}
          <p className="type-display-m" style={{ maxWidth: "28ch" }}>
            No publications have been published yet.
          </p>
          <p className="type-body-m measure" style={{ color: "var(--stone-600)", marginTop: "var(--space-4)" }}>
            The Knowledge Hub will collect the South South Zone&rsquo;s articles,
            essays and creative writing.
          </p>
        </div>
      )}

      {/* Featured band — image bleeds right; type brackets left + below. */}
      {featured && (
        <article className="pub-featured">
          <Grid rowGap="var(--space-5)">
            <GridItem span={7} start={6} spanMd={8} spanSm={4}>
              {featured.featureImage ? (
                <MaskImage
                  src={featured.featureImage.src}
                  alt={featured.featureImage.alt}
                  ratio={featured.featureImage.ratio}
                  sizes="(max-width: 767px) 100vw, 58vw"
                />
              ) : (
                <div style={{ aspectRatio: "3 / 2", background: "var(--ink-800)", display: "flex", alignItems: "flex-end", padding: "var(--space-4)" }}>
                  <span className="visually-hidden">Feature image to follow</span>
                </div>
              )}
            </GridItem>
            <GridItem span={5} start={1} spanMd={8} spanSm={4} overlapY="var(--space-6)">
              <TransitionLink href={`/publications/${featured.slug}`} label={{ num: "05", title: featured.title.toUpperCase() }} className="type-display-l" style={{ display: "block", color: "var(--ink)", textDecoration: "none" }}>
                {featured.title}
              </TransitionLink>
              <p className="pub-featured__meta type-body-s" style={{ marginTop: "var(--space-3)" }}>
                {featured.author} · {fmtDate(featured.date)}
              </p>
            </GridItem>
            <GridItem span={4} start={1} spanMd={8} spanSm={4}>
              <p className="type-body-l" style={{ color: "var(--stone-600)" }}>{featured.excerpt}</p>
            </GridItem>
          </Grid>
        </article>
      )}

      {/* Index — one list, metadata-weighted, no category column. */}
      {listItems.length > 0 && (
        <ul className="pub-index">
          {listItems.map((p, i) => (
            <li key={p.slug}>
              <TransitionLink
                href={`/publications/${p.slug}`}
                label={{ num: "05", title: p.title.toUpperCase() }}
                className="pub-row"
              >
                <span className="pub-row__idx type-label-s tnum">{String(i + 1).padStart(2, "0")}</span>
                <Reveal as="span" clip delayMs={i * 60} className="pub-row__title type-display-m">{p.title}</Reveal>
                <span className="pub-row__author type-body-s">{p.author}</span>
                <span className="pub-row__date type-body-s tnum">{fmtDate(p.date)}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
