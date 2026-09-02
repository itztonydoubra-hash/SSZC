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
