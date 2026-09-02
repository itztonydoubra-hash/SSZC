/*
 * Chapters route (design.md B2) — "The Network", read as geography.
 *
 * The page states the hierarchy it is about (Nigeria → the South South → its
 * states → their chapters → the chapter's President) and then lets the reader
 * walk it: a vector map of Nigeria with the six South South states as the
 * interactive focus, each state's chapters as an editorial ledger, and each
 * chapter's record beside it.
 *
 * The editorial opening (eyebrow, statement, standfirst, hierarchy ladder) is
 * server-rendered, and every figure in it is DERIVED from getChapters() — the
 * page never states a count of its own. The interactive stage reads the URL
 * (?state=…&chapter=…), so it is wrapped in Suspense with the semantic
 * ChapterDirectory as its prerendered/no-JS baseline.
 *
 * The approved section statement (design.md B2 — "many institutions, one
 * network") and the approved "03 — CHAPTERS" index are preserved.
 */
import { Suspense } from "react";
import type { Metadata } from "next";
import { getChapters } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { ChapterNetwork } from "@/components/chapters/ChapterNetwork";
import { ChapterDirectory } from "@/components/chapters/ChapterDirectory";

export const metadata: Metadata = {
  title: "Chapters — LAWSAN South South",
  description:
    "The network of officially recognised chapters across the South South Zone of the Law Students' Association of Nigeria.",
};

// The section's approved statement from design.md B2 ("many institutions, one
// network") — a design concept, not fabricated organisational content.
const NETWORK_STATEMENT = "Many institutions. One network.";

export default function ChaptersPage() {
  const data = getChapters();
  const stateCount = data.states.length;
  const chapterCount = data.states.reduce((n, s) => n + s.chapters.length, 0);

  return (
    <SurfaceSection surface="ink" index="03" title="CHAPTERS" labelledById="chapters-title">
      <DisplayHeading as="h1" id="chapters-title" size="xl" style={{ marginTop: "var(--space-4)" }}>
        {NETWORK_STATEMENT}
      </DisplayHeading>

      <p className="cm-standfirst type-body-l measure">
        Read the zone state by state — {stateCount} states in the South South, and
        the institutions recognised in each.
      </p>

      {/* The hierarchy the page is about, stated plainly. Every figure derives
          from the chapter records; nothing here is an organisational claim. */}
      <ol className="cm-ladder type-label-s" aria-label="How the network is organised">
        <li className="cm-ladder__step">Nigeria</li>
        <li className="cm-ladder__step">{data.zoneLabel}</li>
        <li className="cm-ladder__step tnum">{stateCount} states</li>
        <li className="cm-ladder__step tnum">{chapterCount} LAWSAN chapters</li>
        <li className="cm-ladder__step">Chapter President</li>
      </ol>

      <Suspense fallback={<ChapterDirectory data={data} />}>
        <ChapterNetwork data={data} />
      </Suspense>
    </SurfaceSection>
  );
}
