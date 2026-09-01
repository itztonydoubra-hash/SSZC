# Content — authoring guide & placeholder map (Task 7.2)

This directory holds all organisational content as **typed, structured files**
(design.md C13 / requirements.md §26.4). Components import **only** the `getX()`
functions from `content/index.ts` — never the data files directly. This is the
CMS-ready seam: to adopt a headless CMS later, reimplement `getX()` to fetch
from the CMS; `content/types.ts` and every component stay unchanged.

## Honesty rules (binding)
- **Nothing is invented.** Missing organisational content is a visible
  placeholder (`[NEEDS CONTENT]` / `[OFFICIAL NAME]` / `[OFFICIAL STATISTIC]` /
  `[OFFICIAL IMAGE]`) or an empty array — never a plausible-but-fake value.
- **Impact:** stats render only when `confirmed: true`. All are currently
  unconfirmed → **no figures render** (design.md B4).
- **Media:** CLIENT-SUPPLIED production content (decisions.md D2). Files not yet
  intaken → array empty; no fabricated photos or metadata.
- **Partners:** empty → section omitted entirely (design.md C11).

## Files
| File | Domain | State |
|---|---|---|
| `site.ts` | Nav groups + wordmark fallback | Authored (site structure, not org content) |
| `types.ts` | All schemas | Complete; matches design.md Data shapes |
| `index.ts` | `getX()` data-access layer | Complete |
| `data/leadership.ts` | Zonal execs + state directory | Placeholder rows; states empty |
| `data/chapters.ts` | Zone→State→Chapter network | zoneLabel set; states empty |
| `data/publications.ts` | Categories + items | Categories seeded; items empty |
| `data/impact.ts` | Stats + story | Empty (nothing renders) |
| `data/contact.ts` | Colophon channels | orgName set; channels omitted |
| `data/about.ts` | The Zone narrative | `[NEEDS CONTENT]` fields |
| `data/projects.ts` | Projects | Empty |
| `data/events.ts` | Events | Empty |
| `data/news.ts` | News | Empty |
| `data/media.ts` | Media gallery | Empty — CLIENT-SUPPLIED, awaiting intake |
| `data/administrations.ts` | Archive | Empty |
| `data/opportunities.ts` | Opportunities | Empty (renders EmptyState) |
| `data/partners.ts` | Partners | Empty (section omitted) |

## Placeholder → requirements.md §27 checklist map
Each supply item maps to the file/field to fill:

| §27 checklist item | Fill in |
|---|---|
| Hero statement/tagline + hero photography | hero statement: `[OFFICIAL]` (wired in Phase 13 hero); photography → `public/` + hero content |
| About: history, purpose, vision, mission, values, scope, role | `data/about.ts` (all fields) |
| Confirmed statistics + supporting story | `data/impact.ts` — set `confirmed: true` per figure; add `story.testimonials` |
| Zonal executives: names, positions, order, portraits, bios | `data/leadership.ts` → `zonal[]` (role/name/portrait; optional bio/socials) |
| State/Deputy State/Campus/Deputy Campus directors | `data/leadership.ts` → `states[]` |
| South South states + recognised chapters (+ per-chapter info) | `data/chapters.ts` → `states[]` (+ designed `layout` per state) |
| Events (upcoming + past) with details and media | `data/events.ts` |
| Projects & initiatives with details and media | `data/projects.ts` |
| News & updates content | `data/news.ts` |
| Publications/articles + categories (+ reports) | `data/publications.ts` (`items[]`; confirm `categories`) |
| Media library (photos/videos) tagged by event/year/category | `data/media.ts` + files in `public/media/` (CLIENT-SUPPLIED) |
| Administration archive | `data/administrations.ts` |
| Opportunities listings (+ deadlines/links) | `data/opportunities.ts` |
| Approved partners (optional) | `data/partners.ts` |
| Official contact email, social URLs, office address | `data/contact.ts` (email/phone/address/mapUrl/socials) |
| Brand assets: logo(s) in vector | wordmark: replace `WORDMARK_FALLBACK` usage with the `[OFFICIAL LOGO]` asset (design.md A8) |

## Adding an image
Use an `ImageRef`: `{ src: "/…", alt: "<factual description>", ratio: "3 / 2", blur?, caption? }`.
`alt` is required and must be factual (never fabricated). `ratio` is the image's
native ratio (no forced uniform crops).


---

## Adding photographs (the simple, no-code-change workflow)

You never need to edit React components to add ordinary photographs. Two files
are involved: the image itself (in `public/media/…`) and one entry in
`content/data/media.ts`.

### Folder structure
Put each image in the folder that matches what it shows:

```
public/media/
├── leadership/    # portraits, executive/leadership photos
├── events/        # general events, meetings, ceremonies
├── outreach/      # community outreach, SDG/Children's Day, projects
├── convention/    # zonal convention photographs
└── general/       # anything that doesn't fit the above
```

Use **descriptive, lowercase, hyphenated filenames** — never `IMG_4837.jpg`:

```
2026-convention-opening.jpg
swali-market-legal-outreach.jpg
zone-executive-meeting.jpg
```

### The 5 steps
1. **Drop the image** into the right `public/media/<folder>/` with a descriptive
   filename.
2. **Add one `MediaItem`** to the array in `content/data/media.ts`. Minimum is
   `src` + `alt`:
   ```ts
   {
     src: "/media/convention/2026-convention-opening.jpg",
     alt: "Opening session of the 2026 South South Zonal Convention",
     category: "Convention",   // optional
     caption: "[NEEDS CONTENT]", // optional — fill from the official source, or omit
     event: "South South Zonal Convention 2026", // optional
     year: "2026",              // optional
     ratio: "3 / 2",            // optional — set to the photo's true ratio for the best crop
   }
   ```
   (`src` path = `/media/<folder>/<file>` — note the leading `/`, no `public`.)
3. **Run checks:** `npm run check`
4. **Commit and push** to `main`.
5. **Vercel deploys automatically.**

### Field rules (honesty)
- **`alt` is required** and must be factual. If you truly cannot describe it,
  use `"[NEEDS CONTENT]"` — this is an accessibility fallback only and is not
  shown as visitor copy.
- `caption`, `event`, `year`, `category` are **optional**. Include them **only
  when the information is actually supplied or verified** from the official
  source (post, flyer, etc.). **Never guess** names, dates, locations, event
  titles, or positions from what a photo appears to show.
- `type` defaults to `"image"`; only set `"video"` for a video (with a `poster`).
- `ratio` is optional; omit it to use the default masonry ratio, or set the
  photo's native ratio (e.g. `"3 / 2"`, `"4 / 5"`, `"1 / 1"`) for the truest crop.
- Do **not** use external URLs, base64, stock photos, or AI-generated images.

### Leadership portraits
Leadership portraits used by the Leadership register live under
`public/leadership/` and are referenced from `content/data/leadership.ts`
(e.g. `effiong-valour-daniel.jpg`). General leadership *gallery* photos can also
go in `public/media/leadership/` and be added to `media.ts` like any other photo.

### What happens with an empty gallery
If `media.ts` is empty, the Media Gallery shows its designed empty state — no
fabricated photos or metadata. Adding items above the closing `]` fills it in
the existing editorial masonry (ink surface, native crops, lazy-loaded,
accessible lightbox) — no visual redesign.
