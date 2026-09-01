/*
 * Media Gallery content (design.md C8) — CLIENT-SUPPLIED production content
 * (decisions.md D2), NOT placeholder imagery.
 *
 * HOW TO ADD A PHOTOGRAPH (see content/README.md → "Adding photographs"):
 *   1. Put the image file in the right public/media/<folder>/ with a
 *      descriptive filename (folders: leadership, events, outreach, convention,
 *      general). e.g. public/media/convention/2026-convention-opening.jpg
 *   2. Add ONE MediaItem to the array below.
 *   3. npm run check && next build → commit → push (Vercel auto-deploys).
 *
 * Minimum required per item: `src` and `alt`. Everything else is optional.
 * `type` defaults to "image"; `ratio` defaults to the masonry ratio (set it to
 * the photo's true native ratio, e.g. "3 / 2", for the most faithful crop).
 *
 * NEVER fabricate metadata. Use only what was actually supplied/verified:
 * caption, event, year, category, and a factual `alt`. If a fact is unknown,
 * use "[NEEDS CONTENT]" for `alt` (never shown as visitor copy — it is only an
 * accessibility fallback) or simply omit the optional field.
 *
 * TEMPLATE (copy, uncomment, fill in real values — do NOT ship a fake image):
 *
 *   {
 *     src: "/media/convention/2026-convention-opening.jpg",
 *     alt: "Opening session of the 2026 South South Zonal Convention",
 *     category: "Convention",
 *     caption: "[NEEDS CONTENT]",   // omit or fill from the official source
 *     event: "South South Zonal Convention 2026",
 *     year: "2026",
 *     ratio: "3 / 2",
 *   },
 */
import type { MediaItem } from "../types";

// No official photographs have been intaken yet. Add real MediaItems above the
// closing bracket as files arrive; until then the gallery shows its designed
// empty state (no fabricated photos or metadata).
export const media: MediaItem[] = [];
