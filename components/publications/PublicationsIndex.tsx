/*
 * PublicationsIndex (design.md B3, tasks.md 10.1/10.2) — masthead + featured
 * band + data-driven filter + metadata-weighted ledger index. Filtering
 * recomposes the index (rows re-enter with line-rise stagger); count updates.
 * No default thumbnails. Empty category → honest empty line.
 * Reads getPublications(). Renders empty state honestly (items may be []).
 */
"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("category") ?? "all";

  const featured = useMemo(() => data.items.find((i) => i.featured), [data.items]);
  const listItems = useMemo(
    () => data.items.filter((i) => i !== featured),
    [data.items, featured],
  );
  const filtered = useMemo(
    () => (current === "all" ? listItems : listItems.filter((i) => i.category === current)),
    [listItems, current],
  );

  const catLabel = (id: string) => data.categories.find((c) => c.id === id)?.label ?? id;

  const setCategory = (id: string) => {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (id === "all") next.delete("category");
    else next.set("category", id);
    const qs = next.toString();
    router.replace(qs ? `/publications?${qs}` : "/publications", { scroll: false });
  };

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
          {/* Deliberate empty state — structurally complete; no fabricated pieces.
              The approved category taxonomy remains visible below. */}
          <p className="type-display-m" style={{ maxWidth: "28ch" }}>
            No publications have been published yet.
          </p>
          <p className="type-body-m measure" style={{ color: "var(--stone-600)", marginTop: "var(--space-4)" }}>
            The Knowledge Hub will collect the South South Zone&rsquo;s articles,
            legal writing, leadership pieces, reports and opinion. Categories are
            shown below.
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
              <p className="pub-featured__cat type-label">{catLabel(featured.category)}</p>
              <TransitionLink href={`/publications/${featured.slug}`} label={{ num: "05", title: featured.title.toUpperCase() }} className="type-display-l" style={{ display: "block", color: "var(--ink)", textDecoration: "none", marginTop: "var(--space-3)" }}>
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

      {/* Filter — interactive when there are pieces; a static taxonomy preview
          (approved categories) when empty so the page reads structurally whole. */}
      {data.items.length > 0 ? (
        <ul className="pub-filter" aria-label="Filter by category">
          {[{ id: "all", label: "All" }, ...data.categories].map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className="pub-filter__btn type-label"
                aria-pressed={current === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="pub-filter" aria-label="Categories">
          {data.categories.map((c) => (
            <li key={c.id}>
              <span className="pub-filter__btn type-label" style={{ cursor: "default", color: "var(--stone-600)" }}>
                {c.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Index */}
      {data.items.length > 0 &&
        (filtered.length === 0 ? (
          <p className="type-body-m" style={{ color: "var(--stone-600)", paddingBlock: "var(--space-6)" }}>
            No pieces recorded in this category yet.
          </p>
        ) : (
          <ul className="pub-index">
            {filtered.map((p, i) => (
              <li key={p.slug}>
                <TransitionLink
                  href={`/publications/${p.slug}`}
                  label={{ num: "05", title: p.title.toUpperCase() }}
                  className="pub-row"
                >
                  <span className="pub-row__idx type-label-s tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pub-row__cat type-label">{catLabel(p.category)}</span>
                  <Reveal as="span" clip delayMs={i * 60} className="pub-row__title type-display-m">{p.title}</Reveal>
                  <span className="pub-row__author type-body-s">{p.author}</span>
                  <span className="pub-row__date type-body-s tnum">{fmtDate(p.date)}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}
