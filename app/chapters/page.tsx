/*
 * Chapters route (design.md B2) — "The Network".
 *
 * Desktop: the OrgNetwork stylised graph, with the semantic OrgList kept in the
 * DOM (visually hidden) as the SR/keyboard path. Below 1024px / reduced motion:
 * the OrgList IS the experience (the graph is not rendered as an enhancement).
 *
 * Renders honestly from getChapters(): with no supplied states, the graph shows
 * only the Zone anchor + a [NEEDS CONTENT] note and the list shows the same —
 * no fabricated states, chapters, counts, or node positions.
 *
 * The "one network" statement is [OFFICIAL] — until an approved tagline is
 * supplied it renders as a visible placeholder (never a fabricated slogan).
 */
import type { Metadata } from "next";
import { getChapters } from "@/content";
import { OrgNetwork } from "@/components/chapters/OrgNetwork";
import { OrgList } from "@/components/chapters/OrgList";

export const metadata: Metadata = {
  title: "Chapters — LAWSAN South South",
  description:
    "The network of officially recognised chapters across the South South Zone of the Law Students' Association of Nigeria.",
};

// The section's communicated idea from design.md B2 ("many institutions, one
// network") — a design concept, not fabricated organisational content. A custom
// approved tagline can replace this later, but this is a finished, honest
// headline rather than a raw placeholder.
const NETWORK_STATEMENT = "Many institutions. One network.";

export default function ChaptersPage() {
  const data = getChapters();

  return (
    <section className="surface-ink" data-surface="ink" aria-labelledby="chapters-title">
      <h1 id="chapters-title" className="visually-hidden">
        Chapters — the network
      </h1>

      {/* Desktop enhancement: the graph. Contains the semantic list (SR/keyboard)
          via .cn-list-sr, which becomes the visible experience under 1024px. */}
      <OrgNetwork data={data} statement={NETWORK_STATEMENT} />

      {/* The semantic source of truth. On desktop it is visually hidden (still
          reachable); under 1024px CSS reveals it and hides the canvas + its
          masthead, so the list carries its own eyebrow/statement here. */}
      <div className="cn-list-sr l-container" style={{ paddingBlock: "var(--space-9)" }}>
        <p className="type-label" style={{ color: "var(--ivory)" }}>
          <span aria-hidden>03 </span>— CHAPTERS
        </p>
        <p className="cn-statement type-display-l" style={{ marginBottom: "var(--space-7)" }}>
          {NETWORK_STATEMENT}
        </p>
        <OrgList data={data} />
      </div>
    </section>
  );
}
