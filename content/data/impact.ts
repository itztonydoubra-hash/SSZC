/*
 * Impact content (design.md B4). PLACEHOLDER STATE — CRITICAL HONESTY RULE.
 *
 * No statistic is confirmed, so `stats` is EMPTY and NOTHING renders as a figure
 * (design.md B4: only confirmed:true stats render; unconfirmed are omitted
 * entirely — never a placeholder number). When LAWSAN confirms official figures,
 * add them with `confirmed: true`, a descriptor, and an evidence note + href
 * into the substantiating page (e.g. /chapters, /leadership, /projects).
 *
 * `story` (projects/reach/testimonials) is also empty — no invented quotes.
 */
import type { Impact } from "../types";

export const impact: Impact = {
  // No CONFIRMED statistics supplied — render nothing (no fake numbers).
  stats: [],
  story: {
    projects: [],
    testimonials: [],
  },
};
