# LAWSAN South South — Implementation Plan (Task Breakdown)

> **Status:** Task breakdown only. No application code written; nothing committed.
> **Binds to:** `docs/requirements.md` (approved decisions) and `docs/design.md` (approved design direction). Every task cites the exact sections it implements. Where a task and the design conflict, `design.md` wins; raise it, don't silently diverge.
>
> **Hard rules carried from the approved docs (apply to every task):**
> - **No invented content.** Names, statistics, chapters, events, dates, quotes, history, contact details, logos, taglines are `[NEEDS CONTENT]` / `[OFFICIAL …]` until LAWSAN supplies them. Compositions must render and look composed with visible placeholders.
> - **No new visual patterns** beyond `design.md` unless a task explicitly names a gap to resolve (only Task-flagged gaps may introduce a pattern, and only the one described).
> - **Motion hierarchy & budget** (`design.md` A6.0): content → primary interaction → supporting → decorative; max 3 counted mechanisms per page; the per-experience budget is fixed.
> - **Anti-slop gate** (`design.md` Part D) is a checklist every UI task must pass before it is "done".
> - Do not commit, push, or open a PR at any point in this plan.

## How to read a task
Each task states: **Objective · Create · Dependencies · Expected result · Acceptance criteria**. Acceptance criteria are testable; "looks nice" is never a criterion.

## Phased order (rationale)
The five priority experiences (Phases 8–12) come **before** the remaining pages (Phase 13). Everything in Phases 0–7 is the shared foundation those five experiences need; we do not build all pages at once.

| Phase | Theme | Depends on |
|---|---|---|
| 0 | Project foundation | — |
| 1 | Design tokens | 0 |
| 2 | Typography & fonts | 0,1 |
| 3 | Layout / grid system | 1,2 |
| 4 | Motion system | 0,1 |
| 5 | Accessibility foundations | 0 |
| 6 | Site chrome & navigation | 2,3,4,5 |
| 7 | Content/data structures (schemas + placeholders) | 0 |
| 8 | **Leadership** (priority 1) | 3,4,5,6,7 |
| 9 | **Chapters** (priority 2) | 3,4,5,6,7 |
| 10 | **Publications** (priority 3) | 3,4,5,6,7 |
| 11 | **Impact** (priority 4) | 3,4,5,6,7 |
| 12 | **Contact / colophon** (priority 5) | 3,4,5,6,7 |
| 13 | Homepage narrative (assembles previews of 8–12) | 8–12 |
| 14 | Remaining pages | 3–7, patterns from 8–12 |
| 15 | Responsive hardening pass | 8–14 |
| 16 | SEO & performance | 8–14 |
| 17 | Final QA & anti-slop review | all |

> Note on Phase 13: `design.md` C2 defines the homepage as **reduced, mostly-static previews** of the five experiences, so it is sequenced *after* them and reuses their components in a lighter form — it is not a rebuild.

---

# PHASE 0 — PROJECT FOUNDATION

## Task 0.1 — Initialise the Next.js + TypeScript app
- **Objective:** stand up the framework chosen in `requirements.md` §26.1 with strict typing.
- **Create:** a Next.js App-Router project in TypeScript at the repo root (`app/`, `public/`, config), strict mode on; base folder skeleton `app/`, `components/`, `content/`, `lib/`, `styles/`, `docs/` (already present). No pages beyond a placeholder root route.
- **Dependencies:** none.
- **Expected result:** the app builds and runs a blank placeholder route locally.
- **Acceptance criteria:**
  - `next build` and `next dev` succeed with zero TypeScript errors.
  - `tsconfig` has `strict: true`; ESLint runs clean on the skeleton.
  - No third-party UI kit, component library, or CSS framework is added that imposes its own visual defaults (guards `design.md` A1 / Part D §4).

## Task 0.2 — Styling toolchain bound to tokens
- **Objective:** establish how styles are authored so tokens are the single source of truth (`requirements.md` §26.2).
- **Create:** the styling setup (Tailwind with a custom token layer **or** CSS Modules + vanilla-extract — pick one; if Tailwind, disable the default palette/spacing so only our tokens exist). A `styles/` entry that exposes the tokens from Phase 1.
- **Dependencies:** 0.1.
- **Expected result:** a component can consume a token (e.g. `--ink`) and nothing can reference an off-token colour/space.
- **Acceptance criteria:**
  - No raw hex or arbitrary px values are usable in components without a lint/config error (or a documented, reviewed exception).
  - Default framework palettes/scales are removed so a developer cannot accidentally use a non-brand colour.
  - Decision (Tailwind vs Modules) recorded in `docs/tasks.md` progress notes.

## Task 0.3 — Quality gates & scripts
- **Objective:** make the anti-slop and accessibility rules enforceable, not aspirational.
- **Create:** lint/format config, a typecheck script, and placeholders for the check scripts used later (a11y check, Lighthouse budget) wired but not yet asserting.
- **Dependencies:** 0.1.
- **Expected result:** one command runs typecheck + lint; CI-style scripts exist for later phases.
- **Acceptance criteria:**
  - `npm run check` (or equivalent) runs typecheck + lint and exits non-zero on failure.
  - A `docs/` note lists which gates map to which `design.md`/`requirements.md` rule.

---

# PHASE 1 — DESIGN TOKENS

## Task 1.1 — Colour tokens
- **Objective:** encode the palette and usage constraints from `design.md` A2 / A2.1.
- **Create:** colour tokens `--ink, --ink-800, --ivory, --ivory-200, --crimson, --crimson-700, --stone, --stone-600, --white`, plus functional alphas `--scrim-ink-70/40`, `--hairline-on-ink`, `--hairline-on-ivory`. A documented "surface" concept (ink / ivory / photographic) as selectable section contexts.
- **Dependencies:** 0.2.
- **Expected result:** every colour in the system is named and reusable; a section can declare its surface.
- **Acceptance criteria:**
  - All nine colour tokens + alphas exist with exactly the approved values.
  - A "surface" context switch exists (ink/ivory) that flips default text/hairline colours per `design.md` A2.
  - No gradient utility exists except the functional image scrim (`design.md` A2.2 / Part D §4).

## Task 1.2 — Spacing, radius, and layout tokens
- **Objective:** encode `design.md` A4.1 spacing scale and A5 corner rule.
- **Create:** spacing scale `4 8 12 16 24 32 48 64 96 128 192 256`; `--radius-s: 2px` (form controls only); grid tokens (max width 1440, margins 48→96 desktop / 32 tablet / 20 mobile, gutters 24/20/16, columns 12/8/4).
- **Dependencies:** 0.2.
- **Expected result:** all spacing/grid values are tokens.
- **Acceptance criteria:**
  - Spacing scale present and used by the grid system in Phase 3.
  - Only `--radius-s` exists for radii; no general rounded-corner token (guards Part D §4).

## Task 1.3 — Motion tokens
- **Objective:** encode `design.md` A6.3 timing/easing as behaviour, not a library.
- **Create:** duration tokens (state 200ms, reveal ~500ms, mask/settle ~700ms, page transition 700–900ms) and easing tokens (ease-out for reveals, symmetric for masks/transitions, ease-out for counters). Library-agnostic naming.
- **Dependencies:** 0.2.
- **Expected result:** motion timing is referenceable by name everywhere.
- **Acceptance criteria:**
  - Tokens exist and are named by role, not by library.
  - A documented note states these survive an animation-library swap (`requirements.md` §26.3, `design.md` A6.3).

---

# PHASE 2 — TYPOGRAPHY & FONTS

## Task 2.1 — Font loading (Instrument Serif + Manrope)
- **Objective:** load the two families performantly per `design.md` A3 / `requirements.md` §3.2.
- **Create:** self-hosted font loading via `next/font` — Instrument Serif (400, italic) and Manrope (400/500/600/700); `display: swap`; preload the display face used above the fold; tabular-numeral feature enabled for counters.
- **Dependencies:** 0.1.
- **Expected result:** both families render with no layout shift.
- **Acceptance criteria:**
  - No CLS attributable to fonts (verified later in Phase 16, but the setup must use size-adjust/fallback metrics).
  - Only these two families load; no third font is introduced anywhere (guards Part D specificity + `design.md` A3).
  - Tabular figures available for the Impact counter and dates.

## Task 2.2 — Type scale & roles
- **Objective:** implement the scale and the serif/Manrope division of labour (`design.md` A3.1 / A3.2 / A3).
- **Create:** type tokens/utilities `display-xxl, display-xl, display-l, display-m, body-l, body-m, body-s, label, label-s, numeral` with the exact sizes/line-heights/tracking; a documented rule mapping each token to its role (serif = institution voice; Manrope = record).
- **Dependencies:** 2.1, 1.2.
- **Expected result:** any text can be set to a named role; body measure clamps to 62–72ch.
- **Acceptance criteria:**
  - All ten type tokens match `design.md` A3.1 values (fluid min→max).
  - Body text utilities enforce the 62–72ch measure.
  - A lint note or docs rule states serif never sets long body and Manrope never sets a hero statement (`design.md` A3, Part D §8).
  - The crimson index + `label` "eyebrow" motif is available as a single reusable primitive (`IndexTitle`, built in Phase 6) — this task only guarantees the type roles it needs exist.

---


# PHASE 3 — LAYOUT / GRID SYSTEM

## Task 3.1 — Responsive grid & container
- **Objective:** implement the 12/8/4-column editorial grid and full-bleed escape (`design.md` A4.2).
- **Create:** a grid/container system honouring max-width 1440, the margin/gutter tokens per breakpoint, a full-bleed utility, and a "spine" concept (shared left edge per section) from `design.md` A3.2 / A4.3.
- **Dependencies:** 1.2, 2.2.
- **Expected result:** sections can place content on columns, break to margins, or go full-bleed, and align to a spine.
- **Acceptance criteria:**
  - 12/8/4 columns active at desktop/tablet/mobile with exact token margins/gutters.
  - A full-bleed element reaches viewport edges with no horizontal scroll at any breakpoint.
  - A "spine" alignment helper exists and is used by later sections (`design.md` A3.2).

## Task 3.2 — Composition primitives (shared vocabulary, not a repeated layout)
- **Objective:** provide the three composition primitives from `design.md` A4.3 as *structural* helpers, explicitly not a one-size spread.
- **Create:** structural helpers for **spine+margin-note**, **overlap** (type crossing an image edge by a measured amount), and **ledger row** (index · title · meta · terminal mark, hairline-divided). These are layout scaffolds; visual treatment is set by the consuming section.
- **Dependencies:** 3.1.
- **Expected result:** experiences can compose these differently without a common "editorial spread" look.
- **Acceptance criteria:**
  - Each primitive is a structure only; it imposes no fixed colours/sizes beyond tokens.
  - `LedgerRow` supports **slot reordering** (so Publications leads with category/title, Events-past with date, Chapters with institution — `design.md` C12).
  - No card component exists (guards `design.md` A1 / Part D §4).

---

# PHASE 4 — MOTION SYSTEM

## Task 4.1 — Motion providers & reduced-motion gate
- **Objective:** set up the animation stack behind a single reduced-motion switch (`design.md` A6, A6.2, `requirements.md` §26.3).
- **Create:** a smooth-scroll provider (Lenis or equivalent) and the animation runtime (GSAP+ScrollTrigger and/or Framer Motion), wrapped so a single `prefers-reduced-motion` check disables smooth scroll, parallax, kinetic and scrubbed motion globally. Library choice isolated behind a thin internal API so it can be swapped (`design.md` A6.3).
- **Dependencies:** 1.3, 0.1.
- **Expected result:** motion can be added by components through the internal API; reduced-motion turns it off everywhere.
- **Acceptance criteria:**
  - With `prefers-reduced-motion: reduce`, smooth scroll is off (native scroll), and all scroll/parallax/kinetic motion is disabled; reveals become ≤180ms fades; counters show final value.
  - No component imports the animation library directly (only the internal API) — verified by a lint rule or convention note.
  - Only `transform`/`opacity`/`clip-path` are animated by the primitives (`design.md` A6.2).

## Task 4.2 — Shared motion primitives
- **Objective:** implement the three shared moves from `design.md` A6.1.
- **Create:** `line-rise reveal` (title/standfirst rise from clip, ~500ms ease-out, trigger ~80% viewport), `mask-open image` (clip edge opens + de-scale 1.06→1.0, ~700ms), `held parallax` (≤8% on large photos only). Each respects the reduced-motion gate.
- **Dependencies:** 4.1, 3.2.
- **Expected result:** experiences reuse these instead of inventing per-section reveals.
- **Acceptance criteria:**
  - Body paragraphs never animate (only titles/standfirsts use line-rise — `design.md` A6.1).
  - Parallax refuses to attach to small images.
  - Each primitive has a reduced-motion path verified.

## Task 4.3 — The one shared page transition
- **Objective:** implement the single cross-route transition (`design.md` A8).
- **Create:** `PageTransition` — ink panel wipe + destination `NN — TITLE` index flash (~150ms) + reveal with scroll reset; reduced-motion → ≤180ms cross-fade. **No per-route FLIP/shared-element morphs.** Image "continuity" is achieved by reusing the same crop.
- **Dependencies:** 4.1, 2.2, 1.1.
- **Expected result:** navigating between routes plays exactly one consistent transition.
- **Acceptance criteria:**
  - The transition is one mechanism used site-wide; no route defines its own shared-element morph (guards budget in `design.md` A6.0).
  - Scroll resets to top under cover of the panel.
  - Reduced-motion path verified.

## Task 4.4 — Custom cursor (three words, desktop-only)
- **Objective:** implement the controlled cursor vocabulary (`design.md` A7).
- **Create:** `Cursor` controller showing only **VIEW / OPEN / DRAG**, `pointer:fine` only, fully disabled on touch/coarse pointers. Nodes, links, nav, buttons, filters use the normal pointer.
- **Dependencies:** 4.1.
- **Expected result:** contextual cursor appears only on media, whole-row/portrait detail targets, and horizontal scrollers.
- **Acceptance criteria:**
  - Exactly three labels exist; no per-element bespoke labels.
  - Disabled on touch; every cursor-conveyed affordance also has an on-element cue (so nothing depends on the cursor — `design.md` A7).

---

# PHASE 5 — ACCESSIBILITY FOUNDATIONS

## Task 5.1 — Semantic & keyboard baseline
- **Objective:** guarantee the content-first, keyboard-operable baseline from `requirements.md` §23 and `design.md` (per-experience a11y notes).
- **Create:** skip-to-content link, landmark structure, focus-visible styling (2px crimson ring, 2px offset — `design.md` A9-equivalent focus rule referenced across sections), a focus-trap utility (for Menu/Lightbox), and a documented rule that scroll-triggered content exists in the DOM regardless of JS/motion.
- **Dependencies:** 0.1, 1.1.
- **Expected result:** the app is navigable by keyboard with visible focus, and content is present without motion.
- **Acceptance criteria:**
  - Every interactive element has a visible focus state and is reachable in logical order (even in asymmetric layouts).
  - Skip link works; landmarks present (one `h1` per route enforced later per route).
  - Focus-trap utility passes a keyboard test (Tab cycles within, Esc exits, focus returns to trigger).

## Task 5.2 — Contrast & reduced-motion conformance harness
- **Objective:** make the `design.md` A2.2 contrast intent and reduced-motion behaviour testable.
- **Create:** a documented contrast matrix (ink/ivory/stone/crimson combinations with pass/fail per use) and an automated a11y check wired into `npm run check` (from 0.3) that fails on contrast/roles regressions.
- **Dependencies:** 0.3, 1.1.
- **Expected result:** contrast failures and missing names/roles are caught automatically.
- **Acceptance criteria:**
  - Body text combinations meet WCAG AA; crimson never used for long body; stone never for essential small text (`design.md` A2.2).
  - The a11y check runs in the quality gate and blocks on failure.

---

# PHASE 6 — SITE CHROME & NAVIGATION

## Task 6.1 — Header & surface-aware chrome
- **Objective:** build the minimal header from `design.md` A8.
- **Create:** `SiteHeader` — wordmark left (`[OFFICIAL LOGO]`, text fallback "LAWSAN South South"), single **MENU** trigger right; transparent over hero, gains hairline + text inversion to match the surface beneath after ~1 viewport.
- **Dependencies:** 3.1, 2.2, 1.1.
- **Expected result:** a consistent header that adapts colour to the section under it.
- **Acceptance criteria:**
  - Header inverts correctly over ink vs ivory vs photographic surfaces.
  - Only wordmark + MENU are exposed (no page bar — `design.md` A8/C1).
  - Wordmark uses the `[OFFICIAL LOGO]` slot with a text fallback; nothing invented.

## Task 6.2 — Full-screen navigation index
- **Objective:** build the menu as a site index (`design.md` C1).
- **Create:** `Menu` — ink plate covering from the top (~600ms), trigger→CLOSE, scroll lock; three grouped, spine-aligned indexes (`01 — THE ZONE`, `02 — EXPLORE`, `03 — CONNECT`) with items in serif `display-l`; hover turns crimson + arrow slides in; active route dotted; low-right socials + email `[NEEDS CONTENT]`. Normal pointer (no cursor label).
- **Dependencies:** 6.1, 4.2, 5.1.
- **Expected result:** an accessible full-screen navigation matching the approved grouping.
- **Acceptance criteria:**
  - Groups/items exactly per `design.md` C1 (News under EXPLORE, etc.).
  - Focus trap, Esc closes, `aria-expanded`, focus returns to trigger (5.1).
  - Reduced-motion → cross-fade, no stagger.
  - Fully usable at mobile (items `display-m`, groups stacked).

## Task 6.3 — Shared UI primitives used across experiences
- **Objective:** build the small shared components the five experiences depend on, with context-varied treatment (`design.md` C12).
- **Create:** `SurfaceSection` (sets surface + margins + injects `NN — TITLE`; imposes no internal layout), `IndexTitle` (crimson index + `label`), `DisplayHeading` (serif + line-rise), `MaskImage` (mask-open + crop + lazy + blur), `EmptyState` (index + serif line + Manrope invite). 
- **Dependencies:** 3.2, 4.2, 2.2.
- **Expected result:** experiences compose from these without re-implementing reveals or eyebrows.
- **Acceptance criteria:**
  - `SurfaceSection` does not dictate an internal composition (guards Part D §2 repetition).
  - `MaskImage` enforces required `alt`, `ratio`, lazy-load, blur placeholder.
  - `EmptyState` renders composed with zero content (used by Opportunities/filters/events).

---

# PHASE 7 — CONTENT / DATA STRUCTURES

## Task 7.1 — Typed content schemas (one domain per file)
- **Objective:** implement the No-CMS-but-CMS-ready model from `design.md` C13 / `requirements.md` §26.4, matching every `Data` shape stated per section in `design.md` B/C.
- **Create:** TypeScript schemas + a thin `getX()` data-access layer for: `leadership` (zonal[], states[]), `chapters` (zoneLabel, states[].chapters[]), `publications` (categories[], items[]), `events`, `news`, `projects`, `impact` (stats[] with `confirmed`, story), `media`, `administrations`, `opportunities` (with `status`/deadline), `partners`, `contact`, `about`, `site`.
- **Dependencies:** 0.1.
- **Expected result:** components import only `getX()`; schemas are validated at build.
- **Acceptance criteria:**
  - Every schema field matches the `Data` lines in `design.md` B1–B5 and C4–C11 exactly.
  - Optional fields are truly optional so placeholders/omission are first-class (no fabrication path).
  - Swapping the data-access layer to a CMS would require no component change (documented).

## Task 7.2 — Placeholder content + authoring guide
- **Objective:** provide visibly-placeholder data so experiences can be built and reviewed without inventing facts (`requirements.md` §27, `design.md` C13 honesty rule).
- **Create:** placeholder entries stamped `[NEEDS CONTENT]` / `[OFFICIAL NAME]` / `[OFFICIAL STATISTIC]` / `[OFFICIAL IMAGE]`, with realistic *shape* but no real names/numbers; a `content/README` mapping every placeholder to the `requirements.md` §27 checklist. Impact placeholders are all `confirmed:false` so nothing renders as a fake statistic.
  - **Exception — Media:** the Media collection is **CLIENT-SUPPLIED** production content (`decisions.md` D2), not placeholder. The `content/media.ts` source points at the real files under `public/media/` once intaken; metadata fields the client did not supply are omitted (never fabricated). Until the files arrive, `content/media.ts` is empty and the Media grid/preview shows the `[OFFICIAL IMAGE]` placeholder.
- **Dependencies:** 7.1.
- **Expected result:** every experience can render in a placeholder state that is obviously incomplete, not fake.
- **Acceptance criteria:**
  - No placeholder contains a plausible-but-fake name, statistic, chapter, event, date, or quote.
  - Impact placeholders render **nothing** by default (all unconfirmed) per `design.md` B4.
  - `content/README` lists each `[NEEDS CONTENT]` field ↔ §27 checklist item.

---


# PHASE 8 — LEADERSHIP (priority 1) — `design.md` B1

> Primary interaction: pinned scroll-driven person-replacement. Budget (3): pinned section + mask reveal + count-tick. No parallax, no FLIP here.

## Task 8.1 — Executive Register (Movement one)
- **Objective:** build the full-height, one-person-at-a-time register (`design.md` B1.1).
- **Create:** `ExecutiveRegister` — 42% spine split; 4:5 portrait right, bleeding top/right; fixed left type column (crimson index `display-l`, hairline, role `label`/`--stone`, name `display-xl`/`--ivory`); static ghost numeral in `--ink-800`; ScrollTrigger pin advancing N executives with the vertical mask cross (outgoing mask closes upward + slide 6%; incoming opens downward) and the mechanical index count-tick (`01→02`, crimson deepens on tick). Reads from `getLeadership().zonal`.
- **Dependencies:** 6.3, 4.2, 4.4, 7.2.
- **Expected result:** scrolling replaces one executive with the next within a fixed frame; keyboard rail drives the same.
- **Acceptance criteria:**
  - Frame (spine, index slot, role/name slot) stays fixed; only the person changes.
  - Index **counts** (does not fade); ghost numeral is static (no parallax) — matches the audited budget.
  - Left-edge register rail lists `01…0N` as focusable buttons; focus advances the register identically to scroll; active tick crimson.
  - Fast scroll skips intermediates (last-one-wins); index snaps to resolved value.
  - Renders with `[OFFICIAL NAME]`/`[OFFICIAL ROLE]`/`[OFFICIAL IMAGE]` placeholders; bio/socials absent → still renders index/role/name/portrait.
  - Passes anti-slop §1 (depends on real portraits at scale), §2 (distinct from all others), §5 (works with motion removed).

## Task 8.2 — Executive Register responsive + reduced motion
- **Objective:** implement the mobile recomposition and reduced-motion path (`design.md` B1.1).
- **Create:** mobile stacked full-height panels (portrait top, index/role/name beneath on the spine; static crimson index; lightened mask-open on entry; rail → slim top progress bar); reduced-motion static stacked panels with names fading ≤180ms.
- **Dependencies:** 8.1, 4.1, 15-pattern (deferred hardening ok).
- **Expected result:** no pin on mobile; usable stacked reading; reduced-motion static.
- **Acceptance criteria:**
  - No pin/scroll-hijack on mobile; each executive is one scrollable panel.
  - Reduced motion: static, no count animation, ≤180ms name fade.
  - No horizontal overflow at any breakpoint.

## Task 8.3 — Directory (Movement two)
- **Objective:** build the two-pane state directory (`design.md` B1.2).
- **Create:** ivory two-pane layout — left state selector (serif `display-m`, selected crimson + index, hairlines) ; right pane ledger rows grouped by tier (State Director → Deputy State → Campus → Deputy Campus) using `LedgerRow`; the query→result swap motion (outgoing rows clip up, incoming line-rise stagger 60ms, crimson marker slides ~250ms); URL `?state=`. Reads `getLeadership().states`.
- **Dependencies:** 8.1 (shared data), 6.3, 3.2.
- **Expected result:** selecting a state swaps its leadership under a fixed selector; deep-linkable.
- **Acceptance criteria:**
  - Motion is the horizontal query→result swap (distinct from 8.1's vertical replacement — `design.md` B1.2).
  - Empty tier renders "— to be announced" in `--stone` (never invented).
  - `?state=` deep-links and is keyboard-selectable; mobile → horizontal `DRAG` state rail + tier accordions; usable as a plain list with no JS.
  - Reduced motion: instant swap.

---

# PHASE 9 — CHAPTERS (priority 2) — `design.md` B2

> Primary interaction: select a State → read its subtree (light one branch, mute the rest). Budget (3): network animation + panel reveal + ambient breath (decorative). No FLIP, no node cursor label.

## Task 9.1 — Org data → nested list (source of truth)
- **Objective:** build the semantic Zone›State›Chapter list that the graph enhances and mobile uses (`design.md` B2 accessibility + mobile).
- **Create:** `OrgList` — nested list from `getChapters()`; states as serif accordions opening to chapter ledger rows; states/chapters/counts from data only; unsupplied → "chapters to be confirmed".
- **Dependencies:** 7.2, 6.3, 3.2.
- **Expected result:** a fully usable, accessible chapters experience without any graph.
- **Acceptance criteria:**
  - Renders Zone→State→Chapter purely from data; no fabricated nodes/counts.
  - Keyboard: tab/enter selects a state and reveals its chapters.
  - This list is the mobile experience and the a11y fallback (verified with graph disabled).

## Task 9.2 — Network visualisation (desktop enhancement)
- **Objective:** layer the stylised node graph over `OrgList` (`design.md` B2).
- **Create:** `OrgNetwork` — three visually distinct ranks (Zone anchor serif `display-m`; State medium nodes `label`; Chapter small dots), designed `layout:{x,y}` (explicitly non-geographic); edges as hairlines; masthead cols 9–12 (`03 — CHAPTERS` + the `[OFFICIAL]` "one network" statement + chapter count on select). Interactions: hover-state lights its subtree and mutes the rest; select-state eases cluster to centre (~600ms) + slides in the chapter panel (ledger rows); select-chapter expands panel or routes via the standard page transition; ambient ≤6px breath toward pointer.
- **Dependencies:** 9.1, 4.1, 4.2, 4.3.
- **Expected result:** a queryable org chart where one branch reads at a time.
- **Acceptance criteria:**
  - Nodes are `<button>`s with names; selection behaviour identical to keyboard path in 9.1.
  - Exactly the budgeted mechanisms: network animation + panel reveal + ambient breath; **no FLIP** on chapter open; **no cursor label** on nodes.
  - Node positions are the designed layout; no geographic claim; no invented chapters.
  - Reduced motion: no breath/zoom; instant subtree highlight + panel cross-fade (i.e. `OrgList` with emphasis).
  - Passes anti-slop §1 (depends on real Zone→State→Chapter structure) and §3 (not a decorative constellation).

---

# PHASE 10 — PUBLICATIONS (priority 3) — `design.md` B3

> Primary interaction: filtering recomposes the index. Budget (3): filter re-set + hover margin-thumbnail (mask) + sliding category hairline. No parallax/pin/kinetic.

## Task 10.1 — Masthead, featured band, and metadata-weighted index
- **Objective:** build the journal-contents index (`design.md` B3 desktop composition).
- **Create:** ivory masthead (`05 — PUBLICATIONS`, serif `display-xl` title, hairline, right-aligned count); the **featured band** (3:2 image cols 5–12 bleeding right; title/category/byline overlapping left by ~1 col; standfirst dropped below the image on cols 1–4 — the two-sided bracket composition used nowhere else); the index as ledger rows weighted toward metadata (index · category · title · author · right-aligned date), **no default thumbnails**. Reads `getPublications()`.
- **Dependencies:** 6.3, 3.2, 7.2.
- **Expected result:** a contents-page reading of publications with a distinctive featured band.
- **Acceptance criteria:**
  - Featured band brackets the image on two sides exactly per B3; this composition appears nowhere else (Part D §2).
  - Index rows carry no thumbnail by default; metadata has equal billing to titles.
  - Renders composed with `[NEEDS CONTENT]` items.

## Task 10.2 — Data-driven filter + index re-set motion
- **Objective:** implement filtering as the primary interaction (`design.md` B3 signature motion, `requirements.md` §11 data-driven).
- **Create:** `FilterBar` (categories from data: ALL · ARTICLES · LEGAL · LEADERSHIP · REPORTS · OPINION, editable) with a sliding active hairline; on change, the index re-sets (rows clip up, filtered rows line-rise stagger 60ms, count re-counts); hover a row → title `x+8px` + margin thumbnail mask-opens (only place a thumbnail appears); URL `?category=`.
- **Dependencies:** 10.1, 4.2.
- **Expected result:** changing category recomposes the index like turning to a section.
- **Acceptance criteria:**
  - Categories are data-driven (changing data changes the bar, no redesign — `requirements.md` §11).
  - Thumbnails appear only on hover; empty category → "No pieces recorded in this category yet." (never invented).
  - `?category=` deep-links; reduced motion → instant swap, underline jumps; mobile filter is a `DRAG` row.

## Task 10.3 — Article page
- **Objective:** build the reading page (`design.md` B3 article).
- **Create:** ivory, Manrope-dominant article: serif `display-l` title, Manrope metadata line, one 3:2 lead image (mask-open on arrival, same crop as row, via standard page transition — not FLIP), body `body-m` at 62–72ch on the spine, margin pull-quotes (serif `display-m` + short crimson rule), `↓ REPORT` control for PDFs, three related ledger rows. Route `/publications/[slug]`.
- **Dependencies:** 10.1, 4.3, 2.2.
- **Expected result:** a legible long-form record page.
- **Acceptance criteria:**
  - One `h1`; body measure 62–72ch; Manrope dominant, serif only at title/pull-quotes (`design.md` A3, Part D §8).
  - Image continuity via same crop + standard transition (no bespoke FLIP).
  - PDF control present only when a `pdf` is supplied.

---

# PHASE 11 — IMPACT (priority 4) — `design.md` B4

> Primary interaction: count-up resolves each figure once. Budget (2, deliberately under cap): count-up + descriptor line-rise. Optional faint hand-off only, dropped if it competes. No pin/parallax.

## Task 11.1 — Evidence beats (statistics as claims + evidence links)
- **Objective:** build the statistic beats tied to the rest of the site (`design.md` B4).
- **Create:** a sequence of ~80vh **evidence beats**, each spine+margin-note: serif `numeral` figure + Manrope descriptor + one crimson accent; opposite low margin carries a Manrope evidence note and a text link into the substantiating page (`/chapters`, `/leadership`, `/projects`). Surface chosen per statistic by evidence type (not fixed alternation). Reads `getImpact().stats` and renders **only** `confirmed:true`.
- **Dependencies:** 6.3, 3.2, 7.2.
- **Expected result:** each number appears beside what it counts and a route to its evidence.
- **Acceptance criteria:**
  - Unconfirmed statistics render **nothing** (no placeholder number ever shown — `design.md` B4, Part D §6).
  - Layout looks composed with 3, 4, or 5 confirmed beats (and degrades to fewer).
  - Each beat has an evidence link into people/places/work.

## Task 11.2 — Count-up motion + supporting story + standalone page
- **Objective:** implement the count-once motion and the "story behind the numbers" (`design.md` B4).
- **Create:** `Counter` (0→value, ~1s ease-out, tabular figures, fires once); descriptor line-rises after settle; optional single low-contrast next-descriptor fade (dropped if it competes, never scrubbed); the standalone `/impact` appends evidence spreads that **reuse home-section compositions** (a project spread like C5, a network motif like B2, testimonials as serif quotes `[NEEDS CONTENT]`). Impact is also consumed as a homepage preview in Phase 13.
- **Dependencies:** 11.1, 4.2.
- **Expected result:** figures resolve once; supporting context reuses existing patterns, not new ones.
- **Acceptance criteria:**
  - Count fires once (no replay on re-scroll); tabular figures prevent width jitter.
  - Mobile: figures stay dominant (~72→150px), hand-off dropped, count capped ~800ms.
  - Reduced motion: final value immediately, no count/hand-off.
  - Supporting spreads introduce **no new composition** (reuse only — Part D §2).

---

# PHASE 12 — CONTACT / COLOPHON (priority 5) — `design.md` B5

> Primary interaction: reading/reaching the channels (composition, not effect). Budget (1): a single name/statement line-rise. Least-animated screen on the site.

## Task 12.1 — Institutional colophon
- **Objective:** build the closing colophon where the contact info itself is the invitation (`design.md` B5, approved).
- **Create:** ink full-height plate — org full name `[OFFICIAL NAME]` serif `display-xl` (or `[OFFICIAL]` closing statement in `display-xxl` if supplied; no imperative/slogan); a records block of three Manrope columns (**CONTACT** with email as the largest line + phone; **ELSEWHERE** socials; **OFFICE** address + map link), channels set at `body-l` (larger than ordinary metadata) as the invitation; a compact final-navigation index of site sections; a hairline; a sub-strip (`© [YEAR] LAWSAN South South`, session line `[NEEDS CONTENT]`, credit, "Back to top"). Reads `getContact()`. Serves as the site footer (no conventional footer).
- **Dependencies:** 6.3, 2.2, 7.2.
- **Expected result:** a calm end plate that states who/where/how-to-reach and offers a way back in.
- **Acceptance criteria:**
  - No CTA/slogan; email is the most-weighted line; channels are `body-l` (`design.md` B5 approved change).
  - A column with no supplied data is omitted, not shown empty; nothing invented.
  - Final navigation matches the menu grouping; "Back to top" works.
  - Only motion is one name/statement line-rise; link hover = crimson underline + `x+4px`; external links carry `↗` (glyph, not cursor). Reduced motion → ≤180ms fade.
  - Passes anti-slop §1 (LAWSAN identity + real channels) and §7 (restraint — least-animated screen).

---


# PHASE 13 — HOMEPAGE NARRATIVE — `design.md` C2, C3

> The homepage is one argument in seven moves, using **reduced, mostly-static previews** of Phases 8–12. It is sequenced after them and must stay well under the motion budget (`design.md` C2 homepage restraint).

## Task 13.1 — Hero (move 1: WHO WE ARE)
- **Objective:** build the full-bleed photographic hero (`design.md` C3).
- **Create:** full-viewport hero — real group photograph `[OFFICIAL IMAGE]` with bottom scrim; name/primary statement serif `display-xxl` low-left; `label` eyebrow; scroll cue; tagline-agnostic slot accepting 1–3 lines `[OFFICIAL]`. Motion: combined mask-open+scale on load, statement line-rise, ≤6% scroll parallax, scroll cue (the one decorative idle motion). No button in the hero.
- **Dependencies:** 6.1, 4.2, 7.2.
- **Expected result:** an opening screen driven by a real photograph and low-left type.
- **Acceptance criteria:**
  - Type low-left, **no CTA button**, no gradient/looping background (Part D §4).
  - Statement slot composes at 1, 2, and 3 lines (verified).
  - Budget: reveal (combined) + parallax + decorative cue only; reduced motion → static image + immediate text + static cue.

## Task 13.2 — Narrative moves 2–7 (previews + transitions)
- **Objective:** assemble the seven-move argument with caused transitions (`design.md` C2).
- **Create:** move 2 WHERE (static non-interactive network still + counts `[OFFICIAL STATISTIC]` → `/chapters`); move 3 WHO LEADS (one static portrait beat → `/leadership`); move 4 WHAT WE DO (one project C5 spread `[NEEDS CONTENT]` → `/projects`); move 5 WHAT WE'VE BUILT (one Impact count-up beat, only if a confirmed stat exists, else skipped); move 6 WHAT WE KNOW (static featured publication band + 2 ledger rows, with a **3-row News secondary column**, not a headline block → `/publications`, `/news`); move 7 WHAT'S NEXT (short upcoming-events `DRAG` strip and/or opportunity line or `EmptyState` → flows into the Phase 12 colophon). NOTE: any Media preview surfaced on the homepage uses **selected images from the CLIENT-SUPPLIED MEDIA collection** (`decisions.md` D2), not placeholder photography, once the files are in `public/media/`; until then it uses the `[OFFICIAL IMAGE]` placeholder.
- **Dependencies:** 8–12 (components), 13.1.
- **Expected result:** a single scrolling argument that previews the site's character, not every interaction.
- **Acceptance criteria:**
  - Whole-page mechanism set = page transition + smooth scroll + hero reveal + **one** count-up (`design.md` C2 restraint) — verified.
  - Previews are reduced/static versions (network not live, leadership not pinned, publications not filterable).
  - News appears only as a secondary column within move 6 (never dominates — `requirements.md` §6/§8).
  - Any move whose content is entirely `[NEEDS CONTENT]` degrades to placeholder or is skipped, and transitions re-link so the argument still reads.
  - Each transition has a stated cause (per C2 arrows).

---

# PHASE 14 — REMAINING PAGES — `design.md` C4–C11

> Reuse patterns from Phases 8–12; introduce **no new visual pattern** unless the task names a gap. Each page still passes the anti-slop gate.

## Task 14.1 — The Zone / About (C4)
- **Objective:** editorial About, Manrope-dominant, ivory (may stay ivory across modules).
- **Create:** modules — opening statement (serif `display-xl`), history (Manrope prose + tabular date margin + duotone imagery), purpose/vision/mission (three serif statements on scroll beats with crimson indexes), values (large Manrope list), scope/role (concise copy + reused small network motif). All `[NEEDS CONTENT]`.
- **Dependencies:** 6.3, 4.2, 7.2, 9.2 (network motif reuse).
- **Expected result:** progressive-reveal storytelling without a text wall.
- **Acceptance criteria:** prose does not animate (only titles/one image); duotone = past (`design.md` A5); no new pattern; renders composed with placeholders.

## Task 14.2 — Projects (C5)
- **Objective:** projects as stories with alternating spread templates (a/b/c), plus immersive detail.
- **Create:** `/projects` index (template a/b/c chosen by content weight so no two consecutive compose identically); `/projects/[slug]` detail (full-bleed opener via same-crop + standard transition, record sections, media strip reusing C8, related publications ledger). `[NEEDS CONTENT]`.
- **Dependencies:** 3.2, 4.2, 4.3, 7.2.
- **Expected result:** varied project stories, not a card grid.
- **Acceptance criteria:** no uniform card grid; templates alternate; detail reuses existing patterns; quantified results use `[OFFICIAL STATISTIC]`.

## Task 14.3 — Events (C6)
- **Objective:** calendar split by time (upcoming horizontal `DRAG` strip vs past vertical ledger).
- **Create:** `/events` (two opposite-axis treatments), `/events/[slug]`; upcoming/past derived from date; external `registrationUrl` only (no backend — `requirements.md` §16); empty upcoming → EmptyState.
- **Dependencies:** 3.2, 4.2, 6.3, 7.2.
- **Expected result:** time legible via layout axis; external registration.
- **Acceptance criteria:** no `registrationUrl` → no register control; empty state present; no invented events.

## Task 14.4 — News (C7)
- **Objective:** timely, quiet dated ledger.
- **Create:** `/news` (dated ledger, no featured band, hover-only thumbnails), `/news/[slug]` (reduced article). `[NEEDS CONTENT]`.
- **Dependencies:** 3.2, 10.3 (article subset), 7.2.
- **Expected result:** a lightweight updates record; homepage uses only 3 rows.
- **Acceptance criteria:** lighter than Publications; no fabricated items.

## Task 14.5 — Media (C8)
- **Objective:** importance-sized editorial masonry + lightbox, **art-directed around the client's real supplied photographs** (see `decisions.md` D2).
- **Source material:** **CLIENT-SUPPLIED MEDIA** (production content). Originals live under `public/media/`; data in `content/media.ts` (`MediaItem[]`). Treat as real LAWSAN photography — **not** placeholders and **not** substituted with stock. If the files are not yet in the workspace at build time, the task is blocked on intake, not on inventing images.
- **Create:** `/media` (masonry where **size encodes importance** and **native aspect ratios are preserved** — do NOT force uniform crops/cards; mixed crops establish the rhythm), optional event/year/category filters **only for metadata the client supplied**, `Lightbox` (mask-open, arrow/Esc/keyboard, focus-trap, swipe, showing caption/event **only if present**); lazy-load, responsive `sizes`, blur placeholder, `next/image` (avif/webp); video (if any) on interaction only.
- **Dependencies:** 6.3, 4.2, 5.1, 7.2, intake of the supplied files into `public/media/`.
- **Expected result:** an image archive that reads by importance and shows the real photographs at their native proportions, not a uniform grid.
- **Acceptance criteria:**
  - Uses the **actual supplied photographs**; no invented/stock imagery.
  - **No fabricated metadata** — captions/dates/events/locations/categories appear only if the client supplied them; images without metadata render cleanly with none.
  - **Originals preserved** — no generic filters/gradients/heavy overlays/stylistic effects; the only overlay is the functional legibility scrim where type sits over an image (A2/A5).
  - Not a uniform grid; native ratios preserved (no forced cropping that distorts subjects) (Part D §4).
  - Lightbox fully keyboard-accessible + focus-trapped; video loads only on interaction.
  - Performance: responsive `sizes`, lazy-load, blur placeholder, modern formats.

## Task 14.6 — Administration Archive (C9)
- **Objective:** duotone timeline of past administrations.
- **Create:** `/archive` (or per IA) — vertical timeline on a crimson spine; per-session serif year, duotone director portrait, team ledger rows, achievements, photos; incomplete records show only confirmed fields. `[NEEDS CONTENT]`.
- **Dependencies:** 3.2, 4.2, 7.2.
- **Expected result:** a visual history that never invents missing records.
- **Acceptance criteria:** duotone throughout; missing fields render nothing; timeline readable as a plain chronological list.

## Task 14.7 — Opportunities (C10)
- **Objective:** live board with an honest empty state.
- **Create:** `/opportunities` — ledger rows by type, deadline (crimson when closing soon), `APPLY ↗` external; open/closed derived from deadline; designed `EmptyState`. `[NEEDS CONTENT]`; empty by default.
- **Dependencies:** 3.2, 6.3, 7.2.
- **Expected result:** a returnable board that looks composed when empty.
- **Acceptance criteria:** empty state is a designed full section (not an afterthought); expired handling correct; no fabricated listings.

## Task 14.8 — Partners (C11)
- **Objective:** optional, restrained partners band.
- **Create:** a single monochrome logo row + serif statement, external links; **omit the section entirely if no partners supplied**.
- **Dependencies:** 3.2, 7.2.
- **Expected result:** credibility without a logo wall — or nothing.
- **Acceptance criteria:** section absent when data empty; no logo wall/pills; nothing invented.

---

# PHASE 15 — RESPONSIVE HARDENING — `design.md` A10 + per-section responsive notes; `requirements.md` §22

## Task 15.1 — Recomposition pass (not shrink)
- **Objective:** verify every experience is *recomposed*, not scaled down (`requirements.md` §22).
- **Create:** breakpoint audits and fixes for all Phase 8–14 pages against their stated mobile/tablet composition; confirm the Chapters mobile list, Leadership mobile stack (no pin), Directory `DRAG` rail, Publications `DRAG` filter, etc.
- **Dependencies:** 8–14.
- **Expected result:** each page has a considered composition per breakpoint.
- **Acceptance criteria:**
  - No horizontal overflow at `sm/md/lg/xl/2xl`; touch targets ≥ 44px.
  - Every hover-only affordance has a non-hover equivalent; custom cursor off on touch.
  - Tablet mid-range verified (not just extremes) per `design.md` A10.

---

# PHASE 16 — SEO & PERFORMANCE — `design.md` C14; `requirements.md` §23

## Task 16.1 — Metadata & semantics
- **Objective:** per-route metadata and semantic correctness.
- **Create:** per-route title/description/OG image from content; one `h1` per route; landmarks; descriptive links; consistent OG template.
- **Dependencies:** 8–14.
- **Expected result:** every route has correct metadata and heading structure.
- **Acceptance criteria:** one `h1`/route; metadata sourced from content (no hard-coded fabrication); OG images generated consistently.

## Task 16.2 — Performance budget
- **Objective:** meet the approved budgets (`requirements.md` §23, `design.md` C14).
- **Create:** responsive+lazy+blur images; prioritise the hero LCP image; self-hosted fonts preload+swap (no CLS); code-split animation/graph libs; video on interaction; wire the Lighthouse budget into the quality gate.
- **Dependencies:** 2.1, 4.1, 8–14.
- **Expected result:** measured performance meets targets.
- **Acceptance criteria:** Lighthouse Perf ≥ 85, A11y ≥ 95 on a mid-tier mobile profile; LCP < 2.5s (fast connection); no font-attributable CLS; only transform/opacity/clip-path animate.

---

# PHASE 17 — FINAL QA & ANTI-SLOP REVIEW — `design.md` Part D

## Task 17.1 — Anti-slop gate (every major page)
- **Objective:** run the Part D gate as a release blocker.
- **Create:** a per-page checklist run against §1 Specificity, §2 Repetition, §3 Purpose, §4 Default patterns, §5 Motion justification, §6 Content authenticity, §7 Restraint + mechanism budget, §8 Type discipline; record pass/fail with fixes.
- **Dependencies:** 8–16.
- **Expected result:** documented sign-off that every page passes all eight checks.
- **Acceptance criteria:**
  - No page would make sense with the logo/text swapped (§1); no unjustified composition/motion reuse (§2); no purpose-less element (§3); no banned template pattern (§4); every page communicates with motion removed (§5); zero invented content (§6); ≤3 mechanisms + one dominant idea per page (§7); serif/Manrope roles correct (§8).
  - The five priority experiences are confirmed visually distinct in both composition and primary interaction (the Part D table).

## Task 17.2 — Cross-cutting QA
- **Objective:** verify motion honesty, reduced motion, keyboard, and content-honesty site-wide.
- **Create:** a QA pass: reduced-motion on every page; full keyboard traversal incl. Menu/Lightbox/Chapters/Directory; confirm every `[NEEDS CONTENT]`/`[OFFICIAL …]` placeholder is still a placeholder (nothing fabricated slipped in); confirm no page exceeds the mechanism budget.
- **Dependencies:** 17.1.
- **Expected result:** a clean, honest, accessible build ready for real content.
- **Acceptance criteria:**
  - Reduced-motion parity verified per page; keyboard traversal complete with visible focus and correct focus return.
  - A content-honesty scan confirms no invented names/statistics/chapters/events/dates/quotes/history.
  - `content/README` still maps every placeholder to `requirements.md` §27.

---

## Deferred until LAWSAN supplies content (not build blockers; tracked in `requirements.md` §27 / `design.md` C15)
- Hero primary statement wording; wordmark/logo vector; colophon closing statement (or name alone); final publication categories; confirmed statistics; whether Partners is included; the "one network" statement wording.
- These are content/wording slots already built to accept real values without relayout; supplying them is data entry, not redesign.

## Content already committed by the client (production, not placeholder)
- **Media Gallery photographs — CLIENT-SUPPLIED MEDIA** (`decisions.md` D2). Confirmed supplied by the client; treat as production content. **Intake status:** files not yet present in the workspace as of Phase 3 — when provided they go to `public/media/` and are wired via `content/media.ts` in Phase 14.5 (and selected images feed the homepage Media preview). No fabricated metadata; originals preserved; native aspect ratios; no forced uniform crops.

---

*End of task breakdown. Awaiting approval before any application code is written. Nothing has been committed, pushed, or opened as a PR.*
