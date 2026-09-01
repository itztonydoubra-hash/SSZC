# public/media — CLIENT-SUPPLIED MEDIA (production)

This directory holds the **real LAWSAN South South photographs** supplied by the
client for the Media Gallery (see `docs/decisions.md` D2 and `docs/design.md` C8).

## Rules
- These are **production content**, not placeholders. Do not substitute stock or
  invented imagery.
- **Preserve the originals.** No generic filters, artificial gradients, heavy
  overlays or stylistic effects. The only permitted overlay is the functional
  legibility scrim where type sits over an image (design.md A2/A5).
- **Native aspect ratios** — do not force uniform crops or uniform cards. Size
  encodes importance in the masonry (design.md C8).
- **No fabricated metadata.** Captions, dates, event names, locations and
  categories are used only if the client supplies them; otherwise the image
  exists without them.

## Intake status
As of Phase 3, the files are **not yet present** in the workspace. When supplied:
1. Place originals here (`public/media/…`), keeping original filenames or a
   stable slug.
2. Wire them in `content/media.ts` as `MediaItem[]` — set `src`, measured native
   `ratio`, required factual `alt`, and only the client-supplied
   `caption/event/year/category`.
3. Media Gallery (Phase 14.5) and the homepage Media preview then read from
   `content/media.ts` instead of the `[OFFICIAL IMAGE]` placeholder.

Until then this directory is intentionally empty except for this note.
