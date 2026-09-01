/*
 * Publications content (design.md B3). PLACEHOLDER STATE.
 *
 * Categories are DATA-DRIVEN and seeded with the approved default taxonomy
 * (requirements §11 / design.md B3): Articles, Legal, Leadership, Reports,
 * Opinion. "ALL" is a UI affordance in the FilterBar, not a stored category.
 * These category labels are the approved editorial taxonomy, not organisational
 * content, so they are authored here (final list confirmable by the client).
 *
 * `items` is EMPTY — no real publications supplied. We do NOT invent titles,
 * authors, dates or bodies. Empty category → "No pieces recorded in this
 * category yet." (design.md B3).
 */
import type { Publications } from "../types";

export const publications: Publications = {
  categories: [
    { id: "articles", label: "Articles" },
    { id: "legal", label: "Legal" },
    { id: "leadership", label: "Leadership" },
    { id: "reports", label: "Reports" },
    { id: "opinion", label: "Opinion" },
  ],
  // No publications supplied yet — never fabricated.
  items: [],
};
