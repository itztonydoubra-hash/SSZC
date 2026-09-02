# Implementation Decisions Log

> Records concrete implementation decisions made during the build, with rationale. Binds to `requirements.md`, `design.md`, `tasks.md`.

## D1 — Styling toolchain (Phase 0, Task 0.2)

**Decision:** **CSS Modules + design tokens as CSS custom properties**, with a small typed helper layer. **Not** Tailwind.

**Rationale (project-specific):**
1. **Tokens as single source of truth (the hard requirement).** All colour/space/type/motion values live as CSS custom properties in one `styles/tokens.css`. Components reference `var(--token)`. There is no default palette or spacing scale to accidentally use, because none is defined outside the tokens.
2. **Composition over utilities.** `design.md` is composition-led (spine alignment, overlap, asymmetric 12/8/4 grids, per-section surfaces) and explicitly bans card/utility "recipes" (A1, Part D §4). CSS Modules keep each composition deliberate and named, rather than a string of inline utilities that drift toward generic layouts.
3. **Surface context via the cascade.** The ink/ivory/photographic "surface" switch (A2) auto-inverts text and hairline colours through custom-property inheritance — clean with CSS variables, awkward with utility classes.
4. **No purge/allowlist machinery** needed to prevent off-token values; a stylelint rule forbids raw hex and most raw px in `.module.css` (tokens only).
5. **Motion stays library-agnostic** (A6.3) — timing/easing are tokens consumed by CSS or the JS motion layer alike.

**Guardrails put in place:**
- `stylelint` with `declaration-property-value-disallowed-list` blocking raw hex colours and enforcing token usage; a custom note allows `0`, `100%`, `1px` hairlines, and `var(--*)`.
- One global `styles/tokens.css` = the only place literal values appear.
- No component may import a colour/space literal; review + lint enforce it.

**Consequence:** slightly more explicit CSS per component than utilities, accepted deliberately to protect consistency and the editorial composition mandate.


## D2 — Media Gallery source material is CLIENT-SUPPLIED (project update, during Phase 3)

**Context:** The client has confirmed that the photographs for the **Media Gallery** (design.md C8) have been supplied and are **production content**, not placeholders.

**Status of assets in the workspace:** As of this update, **no image files are present** in the repo (no `public/`, zero image files found). Therefore the asset source is marked **`CLIENT-SUPPLIED MEDIA`** and NOT substituted with invented/stock imagery. When the files are provided they will live under `public/media/` (see intake structure below) and the Media data will point at them.

**Content-honesty rules for these photographs (binding):**
- Treat them as **real LAWSAN South South media** — production content.
- **Do NOT invent** captions, dates, event names, locations, categories or descriptions. Any metadata field the client has not supplied stays **absent** — an image may exist with no metadata (design.md C8 already allows this; the `MediaItem` schema makes caption/event/year/category optional).
- **Preserve the originals.** No generic filters, no artificial gradients, no heavy overlays, no stylistic effects applied "to make them look designed." The only overlay permitted is the **functional legibility scrim** (design.md A2/A5) *and only* where type sits over an image — not as decoration.
- **Do NOT force uniform aspect ratios or uniform cards.** The gallery is art-directed around the *actual* photos: mixed native crops, size encoding importance (design.md C8 masonry). Do not crop a photo to fit a grid cell unless the composition genuinely calls for it and it does not distort the subject.

**Performance requirements for the gallery (design.md C8 / C14, requirements §23):** responsive `sizes`, lazy-loading, blur placeholder, modern formats via `next/image` (avif/webp already enabled in next.config), click-to-open **Lightbox** (mask-open, keyboard/arrow/Esc, focus-trap, swipe), and video (if any) loads on interaction only.

**Homepage Media preview (design.md C2 move / C8):** will eventually use **selected images from this real collection**, not placeholder photography. Until the files arrive it uses the `[OFFICIAL IMAGE]` placeholder block.

### Intake structure (where the files will go and how they are described)
- Files: `public/media/` (originals, preserving native aspect ratios; keep original filenames or a stable slug).
- Data: `content/media.ts` exporting `MediaItem[]` matching the schema in `tasks.md` 7.1 / `design.md` C8:
  `{ src, type:'image'|'video', poster?, ratio, alt, caption?, event?, year?, category? }`.
  - `src` → `/media/<file>`; `ratio` = the image's **native** ratio (measured, not forced); `alt` is required for accessibility (a factual, non-fabricated description; if the client supplies alt/caption use it, otherwise a minimal neutral descriptor that states only what is visibly, factually true — e.g. "LAWSAN South South members at an event" — and NEVER invents an event name/date/place).
  - `caption/event/year/category` are **omitted** when not supplied by the client.
- A short `content/media.README` will note that all entries are `CLIENT-SUPPLIED MEDIA` and which metadata fields came from the client vs. are intentionally absent.

**No build action now.** Per the plan we are in Phase 3; the Media Gallery is built in Phase 14.5. This entry only fixes the content/data assumptions so the supplied photographs are the source when we get there.


## D3 — `--stone-600` darkened for AA body contrast on ivory (Phase 5, Task 5.2)

**Change:** `--stone-600` value changed from `#8a857b` to `#6b665c`.

**Why:** `design.md` A2.2 states `--stone-600` is "muted text that **must stay legible** on ivory" and estimates ~4.6:1. The precise computed ratio of the specified `#8a857b` on `--ivory` is **3.23:1**, which **fails WCAG AA for body text** (needs 4.5:1). Since the design's stated *intent* is legible muted body text, I darkened the token (same warm-stone hue family) to `#6b665c`, which measures **5.02:1** on ivory — comfortably AA body while still clearly reading as muted/secondary versus `--ink` (17:1).

**Scope of impact:** `--stone-600` is the ivory-surface `--surface-text-muted` role (metadata/labels/muted body on ivory). `--stone` (the ink-surface muted role) is unchanged (9.24:1 on ink, passes). No other token changes.

**Design conformance:** this preserves the design's intent (legible muted text) and only corrects a value whose stated estimate did not match its computed contrast. Flagged for approval as a token-value deviation from the literal `design.md` A2.1 hex.


## D4 — Crimson index/eyebrow is surface-aware (Phase 5, Task 5.2)

**Rule established (implements design.md A2.2 precisely):** the crimson accent is
used for the section index/eyebrow motif **only where it meets WCAG AA for the
size it is rendered at**:

- On **ivory** surfaces: the small index/eyebrow (`label`/`label-s`) may be
  `--crimson` — 6.58:1 on ivory, passes AA. ✔ (the common case)
- On **ink** surfaces: **small crimson text fails** (2.60:1). So on ink, the
  small index/eyebrow text uses the surface text colour (`--ivory`/`--stone`),
  and **crimson is reserved for LARGE numerals** on ink (`display-*` / `numeral`,
  ≥ 24px, treated as large text / graphical), plus non-text crimson marks
  (rules, the active dot, the selected node). This matches design.md A2.2
  ("crimson on ink → only for large numerals/UI ≥ 24px; never small crimson body
  text on ink") and Part D §8.

**Why not lighten crimson on ink instead:** reaching AA body on ink requires
lightening to ~#d84257, which visibly drifts from the brand `#a51c30` and then
fails on ivory. Keeping one accent hue and switching the *element it colours*
(large numeral, not small label) preserves both identity and accessibility.

**Consequence for Phase 6 `IndexTitle`:** the component will render the small
label in the surface text colour and only colour the numeral crimson when it is
large; on ivory it may colour the small index crimson. This keeps the recurring
"crimson index" motif while passing AA on every surface. No new token added.


## D5 — [APPROVED — Option 1] Ivory index on the ink Leadership Register (Phase 8)

**FINAL DECISION (user-approved):** Option 1. On the ink Executive Register the
index numeral and active rail tick render in **`--ivory`**; the count-tick
"deepen" beat is a brief **stone** dim. **No `--crimson-on-ink` token is added**
and **no WCAG exception is made.** Crimson remains the index treatment on
**ivory** surfaces (e.g. the Directory selector, 6.58:1). This is the shipped
implementation. The rest of this entry records the analysis that led here.

---
### Original conflict (resolved by Option 1 above)

**Conflict found:** `design.md` B1.1 specifies the Executive Register index (`01`)
as a **crimson** serif numeral, and the mobile panels as a "static crimson index".
The Register surface is **ink**. Measured, **crimson `#a51c30` on ink `#0b0d0f`
is 2.60:1**, which fails WCAG AA **even for large text** (needs ≥3:1 large / ≥4.5
body). The active rail tick (small crimson on ink) fails too.

This means the approved **D4** allowance — "crimson reserved for LARGE numerals
(≥24px) on ink" — does **not** actually pass WCAG for *text* at any size; crimson
on ink is only safe for **non-text** marks (rules, dots — graphical objects).

**Interim applied (so the phase passes the a11y gate; NEEDS YOUR APPROVAL):**
- On the **ink** Register, the index numeral and the active rail tick render in
  **`--ivory`** (17:1). The count-tick "deepen" beat is expressed by a brief
  **stone** dim (9.24:1) instead of a failing crimson deepen.
- On **ivory** surfaces (the Directory selector), the index/marker stay
  **crimson** per D4 (6.58:1, passes). The crimson accent identity is therefore
  present on ivory and via non-text marks — just not as text on ink.

**Options for your decision (pick one; I will not finalise unilaterally):**
1. **Keep the interim** (ivory index on ink) — fully WCAG-conformant, uses only
   approved tokens, but the Register index is not crimson (a small departure
   from B1.1's literal wording).
2. **Introduce one new token** `--crimson-on-ink` (a lightened crimson ~#d84257
   reaching ≥4.5:1 on ink) used ONLY for large numerals on ink — keeps a red
   index but adds a palette value that drifts from the brand crimson and would
   need its own approval (a new colour, which the tokens rule otherwise forbids).
3. **Accept crimson index on ink as a documented WCAG exception** for this large
   decorative numeral only — not recommended (fails the automated gate and the
   contrast intent).

**Current build uses Option 1** as a safe default so nothing ships inaccessible.
Tell me which option you want; if (2), please approve the new token/value.



## D6 — Chapters is a geographic map, not a stylised org graph (Chapters rebuild)

**Change:** the `/chapters` experience was replaced. The stylised, explicitly
non-geographic node graph (`OrgNetwork` + `OrgList`, design.md B2) is gone. The
page is now **editorial cartography**: a clean vector map of Nigeria with the six
South South states as the interactive focus, a call-out route from each state to
its row in a state register, the selected state's chapters as an editorial
ledger, and the selected chapter's record — including its LAWSAN President —
beside it. The hierarchy the page argues is now drawn rather than abstracted:
Nigeria → the South South → its states → their chapters → the chapter President.

**What this changes in B2, and what it does not.** The *argument* of B2 is
unchanged — information visualisation first, every mark a real containment
relationship, nothing drawn that is not supplied. Two statements in B2 are now
superseded: the `layout:{x,y}` "designed, explicitly non-geographic" node
positions (removed from the schema — they were only meaningful to the graph), and
"select a State ⇒ the graph eases that cluster to centre" (replaced by the route
drawing + register emphasis). The approved section statement (*many institutions,
one network*) and the approved `03 — CHAPTERS` index are **preserved**, as is the
ink surface, the ledger format, the crimson-as-non-text-mark rule (D4/D5) and the
requirement that the visualisation is an enhancement over a real list.

**Geography is presentation, not content.** The map outlines live in
`components/chapters/nigeria-geography.ts`, generated by
`scripts/gen-nigeria-map.mjs` from **geoBoundaries gbOpen NGA ADM0 + ADM1**
(built from GRID3 Nigeria State Boundaries), **CC BY 4.0**. No outline is
hand-drawn, and no mapping library, tile server or runtime request is introduced
— it is a static, Douglas–Peucker-simplified SVG. Attribution is carried in the
generated file's header and in the generator.

**Schema addition:** `Chapter.president?: ChapterPresident` (name, role, portrait,
tenure, socials, contact — every field optional). `ChapterState.slug` was added
for URL/geography keying; `ChapterState.layout` was removed.

**Supplied-count discrepancy (flagged, not silently resolved).** The brief for
this rebuild stated a total of **25** chapters while its own per-state lists and
per-state totals enumerate **22** institutions (2 + 2 + 2 + 3 + 7 + 6 = 22) — the
same 22 the client supplied and that `content/SOURCES.md` already records. The
enumerated institutions were treated as authoritative, because reaching 25 would
require inventing three institutions, which the same brief forbids. Every count
in the UI is derived from the records, so the page will read 25 automatically if
three more are supplied. **Confirm the intended total with the client.**

**President content remains unverified.** No chapter president name, portrait,
social account, contact detail or tenure has been supplied, so the record shows
its designed empty state — `CHAPTER PRESIDENT / [NEEDS CONTENT]` and an
`[OFFICIAL IMAGE]` portrait frame. This is a deliberate exception to the
production-polish convention in `lib/content-display.ts` (which otherwise keeps
bracket markers out of the public UI): for this page the marker **is** the
designed state, so the outstanding content is visible to the client rather than
disguised as finished copy. Populating `president` needs no redesign — the same
component renders the portrait, name, role, tenure, socials and contact.

**Verification:** `npm run check:chapters` asserts the content integrity (6
states, the 22 supplied institutions each exactly once, no extras, no invented
president data, no component importing `content/data/*`) and the experience
(keyboard-only selection of all six states, derived counts, chapter selection,
empty states, deep links, 0px horizontal overflow at 375/768/1440, axe clean in
an interacted state, and no motion under `prefers-reduced-motion`).



## D7 — Asset paths must be base-path aware for the Pages export (Chapters presidents)

**Bug found while adding the chapter-president portraits, and it was NOT limited
to them.** The review deployment is GitHub Pages, which serves the site from a
project sub-path (`basePath: "/SSZC"`) and has no image-optimisation server, so
that build also sets `images.unoptimized`. Next.js applies `basePath` to the
`/_next/image` optimiser URL — but when an image is **unoptimised the `src` is
emitted verbatim, with no `basePath`**. So `/chapters/name.jpg` was requested at
the domain root and 404'd.

Effect on the export: **every** `next/image` on the site would have been a broken
image once deployed — the five president portraits, the Zonal Director's portrait
on `/leadership`, the Media gallery and the partner logos. It never showed up
locally because `next start` serves from the domain root, and it had never been
seen in production because the Pages deployment has never succeeded (Pages is not
enabled on the repo — see the deploy workflow's own header note).

**Fix:** `lib/asset.ts` exposes `assetPath()`, which prefixes root-relative asset
paths with `NEXT_PUBLIC_BASE_PATH` (published from `next.config.mjs`; empty for
local/dev/server builds, so it is a no-op there and the optimiser keeps working).
It is applied at every `next/image` call site: `MaskImage`, `ExecutiveRegister`,
`MediaGallery`, `PartnersSection` and `/leadership/[slug]`. External URLs, data
URLs and already-prefixed paths pass through untouched.

**Content files stay deployment-agnostic** — they still store plain paths like
`"/chapters/name.jpg"`, exactly as `ImageRef` documents. No content change was
needed and no schema changed.

**New gate:** `npm run check:export` serves `./out` from a `/SSZC` prefix exactly
as Pages does and asserts that every image on every image-bearing route actually
decodes (`naturalWidth > 0`), that no `src` misses the base path, and that no
request 404s. Nothing else in the pipeline could catch this class of bug —
`next build`, `npm run check` and axe all pass with the images broken.

    DEPLOY_TARGET=gh-pages npm run build && npm run check:export

**Chapter presidents (5 of 22 supplied).** Client-supplied official portraits for
Arthur Jarvis University, Hensard University, Michael and Cecilia Ibru University,
Edo State University and Glorious Vision University. Only the **name** and the
**portrait** were supplied for each; `role`, `tenure`, `socials` and `contact`
remain unset because nothing was supplied, and the remaining 17 chapters have no
`president` at all and keep the designed `[NEEDS CONTENT]` / `[OFFICIAL IMAGE]`
state. Preparation (4:5 editorial crop, ≤1000×1250, EXIF stripped) and the exact
crop boxes are recorded in `public/chapters/README.md`.

## D8 — A root-served export target, because Pages cannot serve a private repo

**Finding:** GitHub Pages is unavailable for this repository. The repo is
**private** on a **free personal plan**, and Pages requires the repo to be public
(or a paid upgrade). The settings page states it plainly: *"Upgrade or make this
repository public to enable Pages."* No workflow or configuration change can get
around it — which is why all nine deploy runs failed at `actions/deploy-pages`.

**Consequence:** publishing has to come either from making the repo public or from
a host that serves a private repo for free (Netlify, Vercel, Cloudflare Pages).
Those all serve from a domain ROOT, whereas the existing export was hard-wired to
the `/SSZC` project sub-path GitHub Pages needs.

**Change:** `DEPLOY_TARGET` now selects one of three deployment shapes — no
feature or design differs between them:

| `DEPLOY_TARGET` | Output | Served at | For |
|---|---|---|---|
| *(unset)* | Next.js app | – | `next dev` / `next start`; image optimisation on |
| `static` | static export | domain root | Netlify · Vercel · Cloudflare Pages · any file host |
| `gh-pages` | static export | `/SSZC` sub-path | GitHub Pages project site |

**Latent bug this surfaced:** `lib/staticParams.ts` gated its empty-content
sentinel on `DEPLOY_TARGET === "gh-pages"`. The sentinel exists because
`output: export` rejects a dynamic route whose `generateStaticParams()` returns an
empty array — a constraint of `output: export` itself, not of one host. So the
`static` build failed immediately with *"Page /news/[slug] is missing
generateStaticParams()"*. The gate is now the set of export targets, exposed as
`isStaticExport()`, and both targets build.

**Verification:** `npm run check:export` takes `EXPORT_BASE_PATH` so either shape
can be proven:

    DEPLOY_TARGET=gh-pages npm run build && npm run check:export
    DEPLOY_TARGET=static   npm run build && EXPORT_BASE_PATH="" npm run check:export

Both pass: every image decodes and nothing 404s at either base path.

**If the repo is made public instead,** note that `content/SOURCES.md` and
`docs/` become public with it. SOURCES.md is an internal verification log that
names individuals whose roles are recorded as *unconfirmed*; move or redact it
before making the repository public.

## D9 — About modules are ordered BLOCKS, not single strings (The Zone content)

**Trigger:** the client supplied the full approved copy for The Zone. It has real
editorial structure that the C4 data line — `about = { statement, history,
purpose, vision, mission, values[], scope, roleInLawsan, images[] }`, where each
narrative field is a single string — cannot hold without destroying it:

- a **beat** sits BETWEEN two paragraphs ("The work has continued to evolve.");
- sets of **parallel statements** sit mid-module ("It connects… It creates…");
- **values** and the Zone's **dimensions** are a name PLUS a qualifying sentence,
  not bare words, so `values: string[]` loses half the content;
- **constitutional notes** close two movements in a quieter register.

**Change:** each narrative field is now an `AboutModule` = `{ heading, blocks[] }`,
where a block is one of `prose | beat | list | principles | note`. A tiny, closed
vocabulary — not a rich-text engine — that preserves the approved ORDER exactly
and maps straight onto a CMS block/portable-text field later. `vision` and
`mission` stay plain strings (they are single statements, per C4). Two fields were
added: `title` (the Zone's formal name) and `coda` (the closing line).

**What is preserved from C4:** ivory throughout, Manrope-dominant, serif only at
the opening statement / movement headings / the two statements, spine + margin
note per movement, crimson index in the margin (AA on ivory — D4), values as a
Manrope list rather than a word-cloud, the scope module beside a **reused network
motif**, and *"prose does not animate"*.

**Two deliberate departures from C4, both for honesty reasons:**

1. **`purpose` is a narrative movement, not a short serif statement.** C4 grouped
   Purpose/Vision/Mission as three short statements; the supplied purpose copy is
   several paragraphs of argument. It is set as prose, and Vision/Mission remain
   the two serif statements.
2. **The photograph is NOT placed in the history movement, and is NOT duotone.**
   C4 asks for duotone imagery in history to signal "past". The single supplied
   photograph documents something **unconfirmed** (SOURCES.md: no event, place or
   date attached). Putting it under History, or giving it an archival duotone
   treatment, would both assert that it depicts the Zone's history — a claim we
   cannot make. It sits as a general plate after the opening, uncaptioned.

**The motif now references a map.** C4's "small network motif (ties back to B2)"
is implemented as `ZoneMotif`, which reuses the REAL geography from
`components/chapters/nigeria-geography.ts` — Nigeria in hairlines with the six
South South states filled in ink. Since B2 became a geographic map (D6), the
motif is geographic too, and it costs no extra bytes because the geometry module
is already in the bundle.

**Copy integrity.** The copy is transcribed verbatim and is deliberately
unspecific in places ("during the tenure of an early zonal leadership", "the
second convention", "a growing collection of law faculties"). Those hedges are
the approved wording because the underlying dates, names and figures are NOT
verified. They must not be sharpened into specifics.
