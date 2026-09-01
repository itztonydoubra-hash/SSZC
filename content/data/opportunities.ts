/*
 * Opportunities content (design.md C10). PLACEHOLDER STATE — EMPTY BY DESIGN.
 * No opportunities supplied; the section renders its designed EmptyState
 * ("No opportunities are open at the moment.") rather than fabricated listings
 * (design.md C10). Add real Opportunity records when supplied; open/closed is
 * derived from `deadline` (or set explicitly).
 */
import type { Opportunity } from "../types";

export const opportunities: Opportunity[] = [];
