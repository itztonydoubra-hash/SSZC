/*
 * Media Gallery content (design.md C8) — CLIENT-SUPPLIED production content
 * (decisions.md D2), NOT placeholder imagery.
 *
 * The client has confirmed the photographs exist, but the files are NOT yet in
 * the workspace (no public/media/* images as of Phase 7). Therefore this array
 * is EMPTY and the Media grid/homepage preview will show the [OFFICIAL IMAGE]
 * placeholder until intake.
 *
 * When the real files arrive (public/media/…):
 *   - add one MediaItem per photo with `src`, MEASURED native `ratio`, and a
 *     REQUIRED factual `alt`;
 *   - include `caption/event/year/category` ONLY if the client supplied them —
 *     never fabricate metadata (dates, event names, locations, categories);
 *   - preserve originals (no filters/gradients/heavy overlays).
 */
import type { MediaItem } from "../types";

// CLIENT-SUPPLIED MEDIA — awaiting file intake. No fabricated photos/metadata.
export const media: MediaItem[] = [];
