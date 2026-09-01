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
