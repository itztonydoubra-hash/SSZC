# LAWSAN South South — Design Specification

> **Status:** Draft for review — design specification only. No application code written; nothing committed.
> **Depends on:** `docs/requirements.md` (approved decisions).
> **What this document is:** an art-direction document. It states what is positioned where, how much space it occupies, how type behaves, how images are cropped, how elements enter and leave, what happens on interaction, what changes on mobile, and *why* each composition exists. It is not a description of a nice website.
>
> **Writing rule for this document (and anyone editing it):** adjectives like "premium / immersive / cinematic / elegant / modern / engaging / memorable" are banned unless immediately followed by the concrete decision that produces the effect. If a sentence could describe any good website, it is deleted or replaced with a decision.
>
> **Content-honesty rule:** no name, statistic, chapter, event, quote, date, or history is invented. Missing content is marked `[NEEDS CONTENT]`, `[OFFICIAL NAME]`, `[OFFICIAL STATISTIC]`, `[OFFICIAL IMAGE]`. Compositions are designed to hold up with placeholders and to absorb real content without relayout.

## Reading order

- **Part A — Global System:** the constraints every page obeys (colour, type, grid, the small motion vocabulary, cursor, chrome).
- **Part B — The Five Priority Experiences:** Leadership, Chapters, Publications, Impact, Contact. Each has its *own* composition and its *own* signature motion. These five set the vocabulary the rest of the site borrows from — deliberately, not by repetition.
- **Part C — Remaining Sections + Component System + Data Model.**
- **Part D — ANTI-SLOP DESIGN REVIEW:** the gate every section passes before implementation.

Terminology: `--token` = design token (single source of truth). Sizes given `min → max` = mobile → large-desktop fluid range unless stated.

---

# PART A — GLOBAL SYSTEM

## A1. The point of view

One sentence the whole site serves: **LAWSAN South South is a network of people and institutions, and the site is organised as a record of that network — its members, its reach, its thinking, and its work.** Every design decision below traces back to one of four nouns: **people, places, thought, work.**

Three consequences that make this site look like *this* organisation and not a template:

1. **The site is set like a record, not sold like a product.** No "hero → benefits → CTA" funnel. Pages read like sections of a bound publication: an index number, a title set in serif, a body set in sans, and space. This is why there are no feature cards and no centred hero-with-button anywhere in the document.
2. **The accent colour is used as a mark of record, not decoration.** Crimson (`#A51C30`) appears only on things that *record or locate*: index numbers, the active state in a set, a single rule under a live/section title, the selected node/state, a closing/urgent date. Never as a fill behind large areas, never as a button colour by default.
3. **Photography of real members is the primary visual material.** The identity is carried by LAWSAN's own documentary photography `[OFFICIAL IMAGE]`, not by illustration, iconography, or legal clichés. There are **no** scales-of-justice, gavels, courthouse columns, or handshake images anywhere unless LAWSAN specifically supplies and requests them.

**Reference discipline (not an Awwwards showcase).** Award galleries are studied for *craft* — how a reveal is timed, how type is set, how an interaction feels — not for their visual tropes. The following showcase tics are explicitly out of scope even though they are common on award sites: a WebGL/shader hero, a full-screen loading percentage counter, an infinite horizontal-scroll "everything sideways" layout, per-letter scramble/shuffle text, magnetic buttons, cursor-following blobs/trails, and effect stacks whose only purpose is to be noticed. If a technique cannot be justified by content, it does not ship. The measure of success is that a visitor remembers **who LAWSAN is and what it does**, not how many things moved.

## A2. Colour — a palette used by content, not a rhythm

Keep the approved palette. **Reject any fixed ink→ivory→ink alternation.** A section's surface is chosen by what it holds:

| Surface | When it is used (decision, not vibe) |
|---|---|
| **Ivory** `#F4F0E8` (`--ivory`) | Default reading surface: anything text-led — About prose, the publication index, article bodies, the leadership directory, opportunities. Ivory is where you *read*. |
| **Ink** `#0B0D0F` (`--ink`) | Surfaces where a single element must dominate and everything recedes: full-bleed portrait moments, the chapters network canvas, the contact colophon. Ink is where you *look*. |
| **Photographic** (full-bleed image) | When a real photograph *is* the content: hero, project openers, media. Type sits on the image over a functional scrim, never a decorative overlay. |

Rules that follow from this:

- A section **may keep the previous section's surface** if switching would break a reading flow (e.g. About's prose can stay ivory across three modules). Surface changes are earned by a shift in what you're doing (reading → looking), not scheduled.
- Two ink sections may sit back-to-back; so may two ivory. There is no quota.

### A2.1 Tokens
| Token | Hex / value | Role |
|---|---|---|
| `--ink` | `#0B0D0F` | Darkest surface; primary text on ivory |
| `--ink-800` | `#15181B` | Ghost numerals, faint dividers on ink |
| `--ivory` | `#F4F0E8` | Primary reading surface; text on ink |
| `--ivory-200` | `#FBF9F4` | Inset / hovered ivory (used sparingly) |
| `--crimson` | `#A51C30` | Record/locate accent only (see A1.2) |
| `--crimson-700` | `#7E1425` | Pressed crimson (rare) |
| `--stone` | `#B8B2A7` | Large muted text, metadata on ink, "to be announced" placeholders |
| `--stone-600` | `#8A857B` | Muted text that must stay legible on ivory |
| `--white` | `#FFFFFF` | One emphasised figure/word maximum per view |

Alpha helpers (functional only): `--scrim-ink-70/40` (linear scrims under text on photos), `--hairline-on-ink = rgba(244,240,232,0.14)`, `--hairline-on-ivory = rgba(11,13,15,0.12)`.

### A2.2 Contrast (verified intent, WCAG AA for text)
`--ink`/`--ivory` ≈ 15:1. `--stone-600` on ivory ≈ 4.6:1 (AA body). Crimson on ivory ≈ 5.9:1 — allowed for links/labels/numerals, **never** long body. Crimson on ink ≈ 3.6:1 — large numerals/UI ≥ 24px or non-text only. `--stone` is large/decorative only.

## A3. Typography — a division of labour, not "serif on everything"

The two families are given **jobs**, and the hierarchy comes from which family is *dominant* in a given block plus scale/space/alignment — not from decorative treatment.

- **Instrument Serif is the voice of the institution speaking:** names of people, section titles, statements of value, statistics, publication and project titles, the network's one statement. Serif = "who/what this is."
- **Manrope is the voice of the record about it:** navigation, dates, roles, locations, categories, body copy, captions, data. Manrope = "the facts around it."

So a leadership panel is a serif **NAME** with Manrope role/state around it; a statistic is a serif **number** with a Manrope descriptor; an article is a serif **title** with a Manrope byline and a Manrope body. Serif never sets long body; Manrope never sets a hero statement. Where a page is pure reading (article body, About prose) **Manrope becomes dominant** and serif appears only at the title and pull-quotes.

### A3.1 Scale (fluid min→max)
| Token | Family | Size | Line-height | Tracking | Use |
|---|---|---|---|---|---|
| `display-xxl` | Serif | 44 → 132px | 0.98 | -0.01em | Hero statement, contact colophon name, big numerals |
| `display-xl` | Serif | 36 → 88px | 1.02 | -0.01em | Page/section titles, executive names |
| `display-l` | Serif | 28 → 56px | 1.06 | 0 | Feature/article titles, the network statement |
| `display-m` | Serif | 22 → 34px | 1.15 | 0 | List titles, pull-quotes |
| `body-l` | Manrope 400 | 18 → 21px | 1.6 | 0 | Standfirsts, lead paragraphs |
| `body-m` | Manrope 400 | 16 → 17px | 1.65 | 0 | Body |
| `body-s` | Manrope 400 | 14 → 15px | 1.55 | 0 | Secondary |
| `label` | Manrope 600 | 12 → 13px | 1.2 | 0.14em UPPER | Nav, categories, roles, metadata labels |
| `label-s` | Manrope 600 | 11 → 12px | 1.2 | 0.16em UPPER | Indices, micro-labels |
| `numeral` | Serif | 96 → 240px | 0.9 | -0.02em | Impact figures |

Body measure 62–72ch. Serif headlines wrap on intentional breaks (content controls line breaks for titles > 4 words).

### A3.2 How hierarchy is built (not decoration)
- **Scale jump, not weight soup:** hierarchy between two adjacent things is a jump of at least two scale steps, not a bold. Manrope weight is used for role vs. body (600 label vs. 400 body), not for faux-headlines.
- **Alignment carries meaning:** everything in a section shares one left edge (the "spine"). Offsets are measured against that spine, so an offset *reads* as deliberate, not random.
- **Whitespace is the separator:** blocks are separated by space (the A4 scale), not by rules/boxes. A hairline is used only where a real division of record exists (between ledger entries, under a section title).
- **The index motif:** most sections open with a crimson two-digit index + Manrope `label` title (`03 — CHAPTERS`). This is the through-line that says "record," and it is the *only* recurring ornament allowed.

## A4. Spacing & grid

Spacing scale (px): `4 8 12 16 24 32 48 64 96 128 192 256`. Section rhythm lives at the top (`96–192`); intra-block at the bottom.

Grid: **12 col** desktop (max 1440, outer margin 48→96, gutter 24) · **8 col** tablet (margin 32) · **4 col** mobile (margin 20). Full-bleed escapes the container.

**Composition primitives** (used *differently* per section — see B/C; listed here only as shared vocabulary, not as a layout to repeat):
- **Spine + margin-note:** primary block on a strong left spine; a small Manrope note dropped low in the opposite margin.
- **Overlap:** serif type crosses into an image edge by a measured amount (never centred over it).
- **Ledger:** index · serif title · Manrope meta · terminal mark, divided by hairlines — the record format, replacing cards.

There is deliberately **no shared "editorial spread" that every page reuses.** Each of the five experiences composes these primitives into a layout only it uses.

## A5. Photography treatment

- Source: LAWSAN documentary photography `[OFFICIAL IMAGE]`. Until supplied, placeholders are flat `--stone`/`--ink-800` blocks stamped `[OFFICIAL IMAGE]` — never stock people, never illustration standing in for photography.
- Crops by role: **portraits 4:5** (leadership, archive), **reportage 3:2** (projects, events, publications features), **hero 16:9→2:1**, **gallery mixed 4:5/3:2/1:1**.
- One unifying grade so mixed-source photos read as one archive: slightly warm, held mid-contrast. **Archival/history imagery is duotone** (`--ink`/`--ivory`) to mark it as "past"; current imagery is full colour. This duotone/colour split is a *content* signal (past vs present), not a style flourish.
- Corners square. `--radius-s: 2px` exists for form controls only. No image drop-shadows, no glass panels.

## A6. Motion — a small vocabulary, assigned by meaning

There is **no single default animation.** Motion is assigned per experience because the *content* differs (Leadership replaces a person; Impact transforms a number; Chapters responds to a query). The five signature motions live in Part B. Part A defines only the shared primitives and the rules that keep motion honest.

### A6.0 The four-tier hierarchy (governs every page)
Every page is designed and reviewed in this priority order. A lower tier may never compromise a higher one.

1. **Content & composition** — the layout, typography, photography and information must read and hold up **with all motion removed**. This is what the visitor should remember.
2. **Primary interaction** — exactly **one** dominant interaction idea per page (named per experience below). It is the thing the page is "about" doing.
3. **Supporting motion** — reveals/parallax that clarify the primary idea. Kept minimal; two moving things maximum in a viewport (A6.2).
4. **Decorative motion** — allowed only where genuinely necessary and named explicitly (there are just two in the whole site: the hero scroll cue and the Chapters ambient breath). Everything else in this tier is cut.

**Per-page mechanism budget.** A single page may not run more than **three** of the following at once (smooth scroll and reduced-motion gating do not count toward the three): custom cursor, parallax, pinned section, mask reveal, kinetic type, count-up, network animation, FLIP/shared-element transition. The page's *primary interaction* is one of the three; the other two are supporting. If a fourth is tempting, it is cut. Site-wide effects that are **not** counted per-page because they are global and consistent: **page transitions** (one shared mechanism, A8), **smooth scroll** (A-level, off under reduced motion), and standard **hover** state on links/rows (a state change, not a mechanism). The per-experience budgets in Part B state exactly which three each page spends.

### A6.1 Shared primitives
- **Line-rise reveal:** text enters by rising one line-height from a clipped box, opacity 0→1. Trigger: block crosses ~80% viewport. ~500ms, ease-out. Used for titles and standfirsts. **Not** used on every paragraph — body text does not animate.
- **Mask-open image:** an image reveals by a clip edge opening while the picture de-scales 1.06→1.0. ~700ms, ease-in-out. Direction is set by composition (opens toward the type it supports).
- **Held parallax:** a large photo drifts ≤8% of its height against its neighbour. Never more; never on small images.

### A6.2 Honesty rules (enforced by Part D)
- Every animated element answers: *what does this reveal about the content?* If the answer is "nothing," it does not animate.
- Max **two** moving things per viewport.
- Idle motion is banned except: the hero scroll cue, and the chapters network's slow ambient breath. No floating cards, no infinite pulses, no decorative loops.
- Only `transform`/`opacity`/`clip-path` animate. Layout never animates.

### A6.3 Timing/easing tokens (character, not library)
Durations: state `200ms`, reveal `~500ms`, mask/settle `~700ms`, page transition `~700–900ms`. Easing character: **reveals** decelerate (ease-out); **masks/transitions** are symmetric (ease-in-out); **counters** decelerate. These are described by behaviour so the spec survives a change of animation library — no library is mandated by the design.

## A7. Cursor — three words, and only where it helps

Custom cursor is desktop `pointer:fine` only, and uses a **controlled vocabulary of three**:
- **VIEW** — over an image/media that enlarges or opens a lightbox.
- **OPEN** — over a whole-row / whole-portrait target that navigates to a detail page (where the click target is larger than a normal link).
- **DRAG** — over a horizontal scroller.

Everything else — text links, nav items, buttons, filters, the network nodes — uses the **normal pointer** and communicates via its own on-element state (underline, colour, movement). The cursor never replaces a visible affordance and is fully disabled on touch. No per-element cursor labels beyond these three.

## A8. Chrome & the one shared page transition

- **Header:** wordmark left (`[OFFICIAL LOGO]`, text fallback "LAWSAN South South"), a single **MENU** trigger right. Transparent over hero; gains a hairline and its text inverts to match the surface beneath after ~1 viewport.
- **Menu:** full-screen, see C1.
- **No conventional footer.** The site ends on the Contact colophon (B5); a thin sub-strip under it carries copyright + session/credit.
- **Section index system:** the crimson `NN — TITLE` opener (A3.2) is the shared identity thread — not a repeated layout.
- **Page transition (one mechanism for the whole site, referenced elsewhere as "the standard page transition").** Between routes, an `--ink` panel wipes across, the destination's index+title (`04 — LEADERSHIP`) flashes on it for ~150ms, then the panel wipes away to reveal the new page with scroll reset to top. ~700–900ms, symmetric ease. This is deliberately the *only* cross-route motion: there are **no per-route bespoke shared-element / FLIP morphs**. Where a detail page appears "continuous" with the list it came from (Publications, Projects), that continuity is achieved by reusing the **same image crop**, not by a spent FLIP mechanism. **Reduced motion:** a ≤180ms cross-fade, no wipe, no flash.

---


# PART B — THE FIVE PRIORITY EXPERIENCES

> Each of the five has a **different composition** and a **different signature motion**, chosen for its content. They are built first; the rest of the site borrows specific, named pieces from them (stated in Part C) rather than copying a generic recipe.

---

## B1. Leadership — the people are the institution

**Argument of the section:** you meet the zonal executives one at a time, at near-life scale, before you ever see them as a list — so the first impression is *individuals*, and only afterwards *structure*. Two movements: (1) the **Executive Register** (full-height, one person at a time), then (2) the **Directory** (the wider leadership as a working record).

**Primary interaction:** the **pinned scroll-driven replacement of one person by the next**. **Budget (3):** pinned section (primary) + mask reveal + count-tick. Custom cursor `VIEW`/`OPEN` is the standard site behaviour, not a fourth mechanism. Parallax and shared-element (FLIP) are **not** used here (see below) so the section stays about the people, not the transitions.

### B1.1 Movement one — the Executive Register

**Desktop composition.** Surface: **ink**. The viewport is divided on the **spine at ~42%**:
- **Right of the spine (58%):** the portrait. Crop **4:5**, aligned to the top and right edges, bleeding off both — so the figure is cut at the shoulder by the viewport edge, not floated in a frame. The portrait's left edge sits *on the spine*.
- **Left of the spine (42%):** a fixed type column, bottom-weighted (sits in the lower third), containing, top to bottom:
  - the **index** as a two-digit crimson numeral in serif `display-l` — `01`;
  - a `--hairline-on-ink` rule the width of the type column;
  - the **role** in Manrope `label`, `--stone` — `[OFFICIAL ROLE]` (e.g. the zonal directorship);
  - the **name** in serif `display-xl`, `--ivory`, on up to two lines — `[OFFICIAL NAME]`.
- A single **ghost numeral** of the same index (serif, `numeral`, `--ink-800`) sits behind the portrait, bleeding off the bottom-left — it is the only element allowed to cross the spine, tying the two halves. It is a **static** compositional element; it does not parallax (removed — see motion).

Nothing is centred; the composition is intentionally weighted to the lower-left with a tall empty upper-left, which is where the eye rests before the portrait pulls it right.

**Signature motion — scroll-driven replacement (not a fade).** The section pins for N executives. On each advance:
- **Fixed:** the spine, the index position, the role/name slot, the type column's left edge. The *frame* does not move — the *person* is replaced within it.
- **Moves:** the outgoing portrait exits by its mask **closing from the bottom edge upward** (the person "sets") while sliding up 6%; the incoming portrait's mask **opens from the top edge downward** (the next person "rises"). Portraits cross vertically past each other, they do not dissolve in place.
- **Type response:** the name does a line-rise reveal; the index does *not* fade — it **counts** `01→02` as a hard mechanical increment synced to the portrait crossing (a record advancing), the crimson briefly deepening to `--crimson-700` on the tick.
- Duration ~700ms, ease-in-out. The ghost numeral is static (no half-speed trail) so the only motion is the person crossing and the index ticking.
- **Interruption:** fast scroll skips intermediate executives (last-one-wins); the index snaps to the resolved value rather than spinning through every number.

**Hover/focus.** Portrait hover: `VIEW` cursor, portrait scales 1.02 only. If a bio/socials detail exists, the whole right half becomes an `OPEN` target → `/leadership/[slug]`; navigation uses the **standard page transition** (A8), not a bespoke portrait FLIP — the register's job is the pinned replacement, and adding a shared-element morph on top would be a fourth mechanism competing with it. A left-edge **register rail** lists `01…0N` as focusable buttons; focus moves the register to that executive (same motion), so keyboard users drive it exactly like scroll. Active tick crimson.

**Mobile.** No pin. Each executive is one full-height panel: portrait top (4:5, bleed), then index/role/name stacked on ink beneath it on the spine. The count-tick becomes a static crimson index per panel; the mask-open still plays on entry (lightened). Register rail becomes a slim top progress bar.

**Reduced motion.** Static full-height stacked panels; portraits static; index static; names fade ≤180ms.

**Data:** `leadership.zonal[]` = `{ index, role, name, portrait, slug?, bio?, socials? }` — all `[NEEDS CONTENT]`; render index/role/name/portrait even if bio/socials absent.

### B1.2 Movement two — the Directory (State / Deputy State / Campus / Deputy Campus)

**Argument:** after the individuals, the *structure* — but as a record you query, not a spreadsheet.

**Desktop composition.** Surface: **ivory**. Two panes:
- **Left (cols 1–4):** the **state selector** — states set as serif `display-m`, stacked, left-aligned on the spine. The selected state is crimson and carries a leading two-digit index; the others are `--ink`, separated by hairlines. States are `[OFFICIAL — SOUTH SOUTH STATES]`.
- **Right (cols 5–12):** the selected state's leadership as **ledger rows grouped by tier** (State Director → Deputy State Director → Campus Directors → Deputy Campus Directors). Each row: tier `label` (`--stone-600`) · `NAME` serif `display-m` · institution meta Manrope · a terminal arrow only if a person detail exists.

**Signature motion — records swapping under a fixed heading.** Selecting a state keeps the selector fixed and swaps the right pane: outgoing rows exit upward (clip), incoming rows line-rise with a 60ms stagger; a crimson marker slides down the selector to the chosen state (position animation, ~250ms). URL updates `?state=`. This motion is *different* from B1.1 (horizontal query→result, not vertical person-replacement) on purpose.

**States.** Empty tier → a quiet Manrope "— to be announced" in `--stone` (never invented). Row hover: text shifts `x +8px`, crimson index fades in, `OPEN` cursor only if a detail exists.

**Mobile.** Selector becomes a horizontal `DRAG` rail of serif state names at the top; choosing scrolls to the rows below. Tiers are accordions. Fully usable as a plain list with no JS.

**Reduced motion.** Marker and rows swap instantly.

**Data:** `leadership.states[]` = `{ state, director?, deputyDirector?, campuses:[{ institution, director?, deputyDirector? }] }` — official entries only.

---

## B2. Chapters — an org chart drawn as a network

**Argument of the section:** this is **information visualisation first**. It must show the *actual organisational relationship*: one **Zone** contains several **States**; each State recognises specific **Chapters** (university law faculties). It is not a decorative constellation — every node and edge means a real containment relationship, and if the data isn't supplied the node isn't drawn.

**Primary interaction:** **select a State to read its subtree** (light one branch, mute the rest, list its chapters). **Budget (3):** network animation (primary: highlight + ease-to-centre) + the panel reveal + the one permitted ambient breath (decorative). No shared-element/FLIP on chapter selection (removed below); no custom-cursor label on nodes (they are ordinary buttons). The visualisation is a way to *read the org chart*, not a graphics demo.

**Hierarchy (three visually distinct ranks):**
- **Zone (1):** a single labelled anchor, largest, set in serif `display-m`, placed off-centre left. It is the root; every edge ultimately traces to it.
- **State (n):** medium nodes, Manrope `label` caps, arranged around the Zone; each connected to the Zone by a solid `--hairline-on-ink` edge. Count = `[OFFICIAL — number of South South states]`.
- **Chapter (n per state):** small nodes (a filled dot + institution name on hover/select), connected only to their parent State. A chapter never connects to the Zone directly — the two-hop path (Chapter→State→Zone) *is* the message.

**Desktop composition.** Surface: **ink** (so edges and the one crimson selection read clearly). The graph occupies cols 1–8; cols 9–12 hold a fixed masthead: crimson `03 — CHAPTERS`, then the section's one serif statement `display-l` — *many institutions, one network* phrased from `[OFFICIAL — approved tagline or omit]` — and, once a state is chosen, the state's chapter count in Manrope. Layout coordinates are a **designed** arrangement (`layout:{x,y}`), explicitly not geographic, so no location is implied or invented.

**Signature motion — query and response, not ambient drift.** Ambient state: the whole graph breathes ≤6px toward the pointer (the one permitted idle motion), edges at rest in `--hairline-on-ink`.
- **Hover a State:** its subtree lights — the State→Zone edge and its Chapter edges brighten to `--ivory` alpha, its chapter dots scale up and reveal Manrope labels; **all unrelated nodes/edges drop to `--stone` low alpha**. This "focus one branch, mute the rest" is the core interaction — it reads the org chart by subtree.
- **Select a State:** the graph eases so that State's cluster centres in the canvas (~600ms ease-in-out); a **panel** slides from the right listing that state's chapters as ledger rows (institution · location-if-supplied). The masthead count updates.
- **Select a Chapter:** the panel expands to the chapter record (institution, state, execs, contact, imagery — only supplied fields), or routes to `/chapters/[slug]` via the **standard page transition** — no bespoke node-to-page morph (that would add a fourth mechanism to a canvas that is already doing the most animation on the site).
- **Active/inactive:** selected branch full-strength crimson node marker on the chosen State; everything else muted until deselect. Deselect returns to ambient.
- **Interruption:** selecting B while A is animating retargets the ease to B (no queue).

**Accessibility + mobile (the visualisation is an enhancement over a real list).** The underlying DOM is a nested list: Zone › State › Chapters. On desktop the graph is layered over it; nodes are `<button>`s with names, and keyboard tab/enter selects a State (lighting its subtree and opening its list) identically to the pointer. **On touch/small screens the graph is replaced** by that nested list: states as serif accordions, each opening to its chapters as ledger rows, with a small **non-interactive** network motif at the top purely as identity. No pinch/drag graph on mobile.

**Reduced motion.** No breath, no ease-zoom; hover/select do instant subtree highlight and the panel cross-fades. Effectively the accessible list with subtree emphasis.

**Data:** `chapters` = `{ zoneLabel, states:[{ state, layout:{x,y}, chapters:[{ institution, slug, location?, execs?, contact?, images? }] }] }` — officially recognised chapters only; unsupplied states show the node with "chapters to be confirmed," never fabricated dots.

---

## B3. Publications — a register of legal and leadership thought

**Argument:** these are *records of thinking*, so the page is set like a journal's contents, not a blog. No card grid, no thumbnail wall. The organising metaphor is a **masthead + a running index of pieces**, where metadata (who wrote it, what kind of thinking, when) is given equal billing to the title.

**Primary interaction:** **filtering recomposes the index** (the page "re-sets" to a section). **Budget (3):** the filter re-set (primary) + the hover-revealed margin thumbnail (mask) + the sliding active-category hairline. Count-up on the total is a small state change, not a spent mechanism. No parallax, no pinning, no kinetic type here — a reading page should be still except when queried.

**Desktop composition.** Surface: **ivory** (reading).
- **Masthead (top):** crimson `05 — PUBLICATIONS`; a serif `display-xl` title; a single hairline. Below the hairline, right-aligned, the total count in Manrope (`[n] PIECES`).
- **The featured piece — a full-width band, not a card.** Reportage image `3:2` set on cols 5–12, bleeding to the right edge. Overlapping its left edge by ~1 column: the category in crimson `label`, the title in serif `display-l` (up to 3 lines), then byline · date in Manrope `body-s` `--stone-600`, then a `body-l` standfirst dropped *below the image's bottom edge* on cols 1–4 (so the type brackets the image on two sides — a composition used nowhere else on the site). Whole band is an `OPEN` target.
- **The index — a ledger, weighted toward metadata.** Each row, left→right on one baseline: running index (Manrope `label-s`) · category (crimson `label`) · title (serif `display-m`) · author (Manrope `body-s`) · date (Manrope tabular, right-aligned to the margin). Hairline between rows. **No thumbnails in the list by default** — a piece is identified by title + kind + author, like a journal contents page. A thumbnail appears only on hover (see motion) as a small `3:2` that mask-opens in the right margin.
- **Filter:** a single row of Manrope `label` categories under the masthead — `ALL · ARTICLES · LEGAL · LEADERSHIP · REPORTS · OPINION` (data-driven, editable). Active is crimson with a hairline directly beneath the active word that slides between words on change.

**Signature motion — turning to a section of the index (editorial movement).** Changing category does not fade a card grid in and out; instead the index **re-sets like a page recomposing**: current rows collapse upward by clipping (as if the page turns), the filtered rows line-rise in with a 60ms stagger, and the count re-counts to the new total. Hover on a row: the row's title shifts `x +8px`, its metadata holds, and the margin thumbnail mask-opens (this is the only place a thumbnail appears in the list — motion *earns* the image rather than pre-loading a wall of them).

**Article page (`/publications/[slug]`).** Surface **ivory**, Manrope-dominant (this is pure reading): serif `display-l` title, a Manrope metadata line (author · date · category · reading indicator), one lead image `3:2` that mask-opens on arrival (the same crop as the index thumbnail, so it reads as continuous — but via the standard page transition, not a bespoke shared-element morph). Body `body-m` at 62–72ch on a single spine; pull-quotes in serif `display-m` set *into the left margin* with a short crimson rule, so quotes read as marginalia of a record. Report-type pieces show a `↓ REPORT` control with file meta. Foot: three related pieces as ledger rows (no cards).

**Mobile.** Featured band stacks (image, then the bracketing type becomes a stack above/below); filter becomes a `DRAG` label row; index rows keep title + category + date, thumbnail on tap. Article body full width, comfortable measure.

**Reduced motion.** Filter swaps instantly; no row/thumbnail slide; underline jumps.

**Data:** `publications` = `{ categories[], items:[{ slug, title, category, author, date, excerpt, featureImage?, body|externalUrl?, pdf?, featured?:bool }] }` — all `[NEEDS CONTENT]`. Empty category → "No pieces recorded in this category yet." (never invented).

---

## B4. Impact — statistics as evidence, tied to the rest of the site

**Argument:** a giant number alone proves nothing. Each confirmed statistic is presented **as a claim immediately backed by its evidence** — the number, then *what it counts*, then a link into the people/places/work that substantiate it. The section is a short argument: *here is the scale, and here is where you can go see it.*

**Primary interaction:** the **count-up that resolves each figure once** on entry. **Budget (2):** count-up (primary) + the descriptor line-rise. That is deliberately one fewer than the cap — Impact earns its weight from the *size of the numbers and the evidence links*, not from motion. The "next descriptor pre-enters faintly" idea is demoted to an **optional, single, low-contrast** touch and is dropped entirely if it competes with the active count (see below). No pinning, no parallax.

**Desktop composition.** Surface chosen per statistic by its evidence type (a "reach" stat pairs with the network on ink; a "people" stat pairs with a portrait band; a "work" stat pairs with reportage on ivory) — **not** a fixed alternation.
- Each statistic is one **evidence beat** occupying ~80vh, composed as a **spine + margin-note**:
  - On the spine: the figure in serif `numeral` (`[OFFICIAL STATISTIC]`), with its descriptor directly beneath in Manrope `label` (e.g. the figure, then what it counts). One crimson accent per beat — typically a `+` or a leading rule.
  - In the opposite low margin: a one-line Manrope note of *evidence* and a text link into the substantiating page — e.g. a chapters figure links to `/chapters`; a people figure links to `/leadership`; a projects figure links to `/projects`. This link is what makes the number accountable and stitches Impact to the network, the leaders, and the work.
- Between beats there is no card and no divider — just a `128–192` space. *Optional supporting touch:* the descriptor word of the next beat may pre-enter faintly in `--ink-800`/`--stone` at the margin as a quiet hand-off — but only as a static/near-static fade, never a scroll-scrubbed kinetic drift, and it is omitted on any beat where it would draw the eye away from the counting figure. If in doubt, leave it out.

**Signature motion — the number resolves once.** On entering a beat, the figure counts 0→value, ease-out, **~1s**, tabular figures (no width jitter), and fires **once** (re-scrolling does not replay). The descriptor line-rises after the count settles (fact first, label second). Movement between beats is ordinary scroll — there is no pinning here (distinct from Leadership), because Impact is read as a list of claims, not experienced as a sequence of people.

**Supporting context (standalone `/impact` after the beats).** Not more numbers: three-to-five short evidence spreads — a project with one reportage image and its result line; the network motif captioned with the reach figure; member testimonials as serif `display-m` quotes with Manrope attribution `[NEEDS CONTENT]`. Each reuses the *composition of its home section* (a project spread looks like B-C5, a network motif looks like B2) so Impact reads as a summary drawing on the rest of the site, not a new pattern.

**States.** A statistic renders only when `confirmed:true`; unconfirmed figures are **omitted entirely** (no placeholder number ever shown). The layout is designed to look composed with 3, 4, or 5 beats.

**Mobile.** Figures scale (`~72→150px`) and stay dominant; the pre-enter hand-off is dropped; count-up retained but capped ~800ms; evidence note sits under each figure. 

**Reduced motion.** Figures render final value immediately; no count, no hand-off; evidence notes static.

**Data:** `impact` = `{ stats:[{ value, display?, suffix?, descriptor, confirmed:bool, evidenceNote?, evidenceHref? }], story:{ projects[], reachNote?, testimonials[] } }` — all `[OFFICIAL STATISTIC]` / `[NEEDS CONTENT]`.

---

## B5. Contact — an institutional colophon, not a CTA

**Reconsidered.** The previous "LET'S TALK." treatment is dropped as a generic marketing sign-off. The site instead closes the way a printed record closes: a **colophon** — a quiet, information-dense end plate that states who this is, how to reach them, and where they are, and then stops. **The contact information itself is the invitation to connect** — the email, phone, socials and address are set at a size and with a hover life that says "reach us," so no separate call-to-action, imperative, or slogan is added. No slogan is forced; if `[OFFICIAL — approved closing statement]` is supplied it occupies the statement slot, otherwise the slot is simply the organisation's full name.

**Primary interaction:** **reading and reaching the contact channels** — the composition, not an effect, is the point. **Budget (1):** a single name/statement line-rise on entry. This is intentionally the least animated screen on the site; the restraint is the signature.

**Desktop composition.** Surface: **ink**, full height, but *calm* — this is the one screen with almost no motion.
- Top of the plate, on the spine: the organisation's full name `[OFFICIAL NAME — Law Students' Association of Nigeria, South South Zone]` set in serif `display-xl`, `--ivory`. If a closing statement is approved, it replaces/precedes the name in `display-xxl`; otherwise the name alone carries it. No exclamation, no imperative.
- Beneath, a **records block** set as three aligned Manrope columns on a shared baseline grid, each headed by a `label` in `--stone`. This block *is* the invitation, so the reachable channels are set larger than ordinary metadata (`body-l`, not `body-s`) and the email is given the most weight as the primary route in:
  - **CONTACT** — official email (`mailto:`, the largest line in the block), phone (`tel:`) `[NEEDS CONTENT]`.
  - **ELSEWHERE** — Instagram · Facebook · X · LinkedIn + any official platforms, one per line `[NEEDS CONTENT]`.
  - **OFFICE** — address, and a map link if supplied `[NEEDS CONTENT]`.
  A column with no supplied data is omitted, not shown empty.
- **Final navigation:** a compact Manrope index of the site's sections (the same grouping as the menu) sits low on the plate, so the end of the page is also a way back in — a record closes with its contents, not a dead end.
- A single `--hairline-on-ink` separates the records block from a bottom **sub-strip**: `© [YEAR] LAWSAN South South`, session/administration line if supplied `[NEEDS CONTENT]`, a small build/credit line, and a text "Back to top."

**Signature "motion" — restraint.** The plate does one thing: on first entry the name/statement does a single line-rise; nothing else animates. Links respond on hover with a crimson underline wipe and `x +4px` only — no drift, no kinetic type. This deliberate quiet is the signature: after a site that moves, the ending is still. External links carry the `↗` glyph inline (not a cursor label) and open in a new tab.

**Mobile.** Name/statement scales down but stays the top element; the three record columns stack in the order CONTACT → ELSEWHERE → OFFICE; final navigation collapses to a single column; sub-strip wraps. Hover→tap feedback.

**Reduced motion.** Name appears with a ≤180ms fade; link hovers reduce to colour/underline.

**Data:** `contact` = `{ orgName, closingStatement?, email?, phone?, address?, mapUrl?, socials:[{ platform, url }], session? }` — render only supplied channels.

---


# PART C — HOMEPAGE, REMAINING SECTIONS, COMPONENTS, DATA

---

## C1. Navigation — full-screen index

**Trigger:** wordmark left, **MENU** right. No exposed page bar.

**Open:** an ink plate covers the screen from the top edge downward (~600ms, ease-in-out), the trigger becomes **CLOSE**, body scroll locks. The plate is composed as an **index of the site**, not a centred link stack:
- Three groups, each with a crimson index + `label` heading, left-aligned on the spine:
  - `01 — THE ZONE`: About · Leadership · Chapters · Administration Archive
  - `02 — EXPLORE`: Events · Projects & Initiatives · Publications · News & Updates · Opportunities · Media
  - `03 — CONNECT`: Contact
- Items in serif `display-l`, `--ivory`; hover turns the item crimson and slides a leading arrow in from the left (`x` shift). Active route carries a crimson dot. Normal pointer (no cursor label) — these are ordinary links.
- Low-right: primary socials + official email in `label` `[NEEDS CONTENT]`.

**Accessibility:** focus trap, Esc closes, `aria-expanded`, focus returns to trigger. **Mobile:** same plate, items `display-m`, groups stack. **Reduced motion:** plate cross-fades; items don't stagger.

---

## C2. Homepage — one argument, seven moves

The homepage is **not** a sampler of every page in page-order. It is a single argument with seven moves, and **each transition is caused by the previous move**. Content required by requirements is present, but placement is driven by the narrative, not a checklist.

The argument: **WHO WE ARE → WHERE WE ARE → WHO LEADS US → WHAT WE DO → WHAT WE HAVE BUILT → WHAT WE KNOW → WHAT COMES NEXT.**

1. **WHO WE ARE — Opening.** Full-bleed photographic hero of LAWSAN members `[OFFICIAL IMAGE]` (not a logo screen, not centred text-with-button). The organisation's name/primary statement in serif `display-xxl` sits low-left over a bottom scrim; a `label` eyebrow states what this is; a scroll cue sits at the very bottom. *Transition out:* the hero image mask-scales down and the first idea rises over it — we go from "here they are" to "here is what that means," a one-line serif definition of the Zone on ivory. → because a face needs a name, the next move locates them.
2. **WHERE WE ARE — the network, previewed.** A reduced, non-interactive version of the B2 network on ink, with the chapter/state counts `[OFFICIAL STATISTIC]` and a link into `/chapters`. This answers "where does this network reach?" → because a network is run by people, we meet them next.
3. **WHO LEADS US — one executive.** A single B1 Register beat (one portrait, index, role, name) on ink, ending with a link into `/leadership`. Not the whole board — one person, as an invitation. → because leaders are known by what they do, we turn to the work.
4. **WHAT WE DO — a project as a story.** One project told as a C5 spread (image + serif title crossing it + result line) `[NEEDS CONTENT]`, link into `/projects`. → because doing accumulates into a record of scale, we quantify it.
5. **WHAT WE HAVE BUILT — one Impact beat.** A single B4 evidence beat: one confirmed figure with its evidence note and link `[OFFICIAL STATISTIC]`. Only if a confirmed statistic exists; otherwise this move is skipped and move 4 links directly to 6. → because scale should be examined, we point to the thinking.
6. **WHAT WE KNOW — the featured publication.** The B3 featured band (the record of thought) + two ledger rows, link into `/publications`. Timely items: a **restrained** 3-row News strip sits *within* this move as a secondary column, never as its own headline block — News supports "what we know," it does not run the homepage. → because a living organisation looks forward, we end on what's next.
7. **WHAT COMES NEXT — Opportunities + close.** Upcoming events as a short `DRAG` strip and/or an open opportunity line `[NEEDS CONTENT]` (or the designed empty state from C10), flowing directly into the B5 colophon as the page's end.

**Homepage motion restraint (important — the homepage is the page most at risk of stacking everything).** Each move borrows the *idea* of its home section's motion but runs a **reduced version**, and only **one move per screenful animates at a time**:
- The network preview (move 2) is **non-interactive and largely static** — a still of the graph with counts, not the live hover/select/zoom behaviour (that lives on `/chapters`).
- The leadership preview (move 3) is **one static portrait beat** — no pinning, no scroll replacement (that lives on `/leadership`).
- The impact preview (move 5) runs **one count-up** and nothing else.
- The publications preview (move 6) is a **static** featured band — no filter re-set, no hover-thumbnail choreography.
So the homepage's full mechanism set across the whole scroll is: page transitions (global), smooth scroll (global), the hero's reveal, and **one count-up** — well under budget. The homepage previews the site's *character* without performing every interaction. If a move's content is entirely `[NEEDS CONTENT]`, the move degrades to its placeholder or is skipped, and the surrounding transitions re-link so the argument still reads.

---

## C3. Hero (detail)

Covered as homepage move 1. Composition rules that make it not-a-generic-hero: type is **low-left, not centred**; there is **no button** in the hero (the scroll cue and the menu carry navigation); the image is a real group photograph, not an abstract/gradient/looping background. Tagline-agnostic: the statement is one content field; 1–3 line lengths all fit the clamp; verify all three compose. `[OFFICIAL IMAGE]`, `[OFFICIAL — primary statement]`.

**Motion (primary: the opening reveal; budget 2 + the one decorative cue).** On load, the hero image mask-opens *with* a slow scale 1.06→1.0 as a **single combined move** (not two separate effects), and the statement line-rises. After load, a **gentle ≤6% scroll parallax** on the image is the only scroll motion. The scroll cue is the one permitted decorative idle motion. There is no separate letter-scramble, no counter, no kinetic type. **Mobile:** statement scales, parallax off. **Reduced motion:** static image + immediate text + static cue.

---

## C4. The Zone / About — reading, so Manrope leads

Surface **ivory**, and it may *stay* ivory across its modules (reading flow beats forced alternation). Manrope-dominant; serif only at the module titles and one opening statement. Modules, in order, each a **spine + margin-note** but with *varying* emphasis so they don't look identical:
- **Opening statement** — serif `display-xl`, one idea of what the Zone is `[NEEDS CONTENT]`.
- **History** — Manrope prose on the spine, dates as a Manrope tabular margin-column; any imagery is **duotone** (past). `[NEEDS CONTENT]`
- **Purpose / Vision / Mission** — three short serif statements, each entering on its own scroll beat with a crimson index; between them, generous space rather than dividers. `[NEEDS CONTENT]`
- **Values** — a Manrope list set large on the spine, not a kinetic word-cloud. `[NEEDS CONTENT]`
- **Scope / role within LAWSAN** — concise Manrope copy beside a *reused* small network motif (ties back to B2). `[NEEDS CONTENT]`

**Motion:** title line-rise + one duotone image mask-open in history; prose does not animate. **Data:** `about = { statement, history, purpose, vision, mission, values[], scope, roleInLawsan, images[] }`.

---

## C5. Projects & Initiatives — stories, told differently each time

**Index (`/projects`), surface ivory.** Projects are **not** a uniform card grid and **not** identical spreads. A small set of spread *templates* alternates by project so the page has rhythm: (a) image-left / title-crossing-right; (b) full-bleed image with title dropped into the lower margin; (c) text-first with the image as a margin-note. The template is chosen per project by aspect/'content weight', so no two consecutive projects compose identically. Each carries name (serif), and Manrope meta: location · date · beneficiaries · one result line.

**Detail (`/projects/[slug]`).** Full-bleed reportage opener (mask-opens on arrival — same image as the index, continuous by crop, via the standard page transition rather than a FLIP), serif `display-l` title, Manrope standfirst; then record sections — purpose, description, location/date, beneficiaries, results — set as reading (Manrope) with pull figures where a result is quantified `[OFFICIAL STATISTIC]`; a media strip (reuses C8 patterns); related publications as ledger rows.

**Motion:** opener mask-open; title line-rise; one held-parallax on the opener only. Video: poster first, click-to-play (`VIEW`). **Mobile:** spreads stack keeping their offset. **Data:** `projects[] = { slug, name, purpose, description, location?, date?, beneficiaries?, results?, images[], video?, relatedPublications?[] }`.

---

## C6. Events — a calendar split by time, not a card wall

**Index (`/events`), surface ivory.** Two clearly different treatments for the two states of an event:
- **Upcoming** — a **horizontal `DRAG` strip** of tall event plates (reportage image `3:2`, serif title, Manrope date/location, `REGISTER ↗` external link if `registrationUrl` supplied). Horizontal because upcoming events are a short, browseable queue.
- **Past** — a **vertical ledger** (index · serif title · date · location · link to recap/media). Vertical because the past is an archive you scan, not browse. The two opposite axes make time legible without a label.

**Detail (`/events/[slug]`).** Reportage opener, title, date/location/description, external registration block if upcoming, media, related news ledger. **States:** upcoming/past derived from date; no `registrationUrl` → no register control; empty upcoming → "No events currently scheduled." **Motion:** strip drag; ledger rows line-rise. **Data:** `events[] = { slug, title, date, endDate?, location?, description, registrationUrl?, images[], video?, relatedNews?[] }`.

---

## C7. News & Updates — timely, and deliberately quiet

**Index (`/news`), surface ivory.** A dated ledger (date Manrope tabular · serif `display-m` headline · category), lighter than Publications: no featured band, no thumbnails except on hover. On the homepage it appears only as a 3-row secondary column inside move 6 (C2). **Detail:** short-form article (a reduced Publications article). **Data:** `news[] = { slug, title, date, excerpt, body|externalUrl?, image?, category? }`.

---

## C8. Media Gallery — an archive of images, sized by importance

**Index (`/media`), surface ink** (images carry the colour). An **editorial masonry** where size encodes importance: one or two large anchor photographs per screen with smaller supporting images around them — **not** a uniform grid, because a uniform grid says every image is equal and they are not. Mixed crops (4:5/3:2/1:1). Optional filters by event/year/category when enough content exists.

**Interaction:** hover scales 1.03 and reveals a Manrope caption (`VIEW`); click opens a full-screen lightbox (mask-open, arrow/Esc/keyboard, focus-trapped, swipeable), showing caption + source event. **Perf:** lazy-load, responsive sizes, blur placeholder; video loads on interaction only. **Mobile:** collapses to 1–2 columns preserving size variety. **Data:** `media[] = { src, type, poster?, ratio, caption?, event?, year?, category? }`.

---

## C9. Administration Archive — the record of past leadership

**Surface ivory**, **duotone** imagery throughout (this is the "past" register). A **vertical timeline on a crimson spine**: session markers descend the left edge; scrolling moves through sessions. Each session expands to: session/year serif `display-l`, Zonal Director portrait (duotone 4:5) if available, executive team as ledger rows, achievements as short Manrope statements, any photographs. Incomplete records show only confirmed fields — missing fields render nothing (no invented history). **Motion:** the spine's active marker tracks scroll; session content line-rises. **Mobile:** spine to the far-left edge; sessions stack. **Data:** `administrations[] = { session, director?, team?[], achievements?[], images?[] }`.

---

## C10. Opportunities — a live board with an honest empty state

**Surface ivory.** Opportunities as **ledger rows** grouped/filterable by type (competitions, scholarships, fellowships, internships, trainings, conferences, calls). Row: type `label` · serif `display-m` title · deadline (Manrope; **crimson when closing soon**) · one-line summary · `APPLY ↗` external link. Open vs closed derived from `deadline`; expired rows drop to `--stone` and move to a "Closed" group. **Empty state (required and designed, not an afterthought):** a full section — crimson index + serif `display-l` line "No opportunities are open at the moment." + a Manrope line inviting a return and linking to socials. Never fabricated. **Data:** `opportunities[] = { slug, type, title, summary, deadline?, applyUrl?, status }`.

---

## C11. Partners — omit unless supplied

**Optional; omitted entirely if no partners are supplied.** If supplied: one serif statement + a single restrained row of monochrome logos (unified single-colour treatment on ivory, hairline separators), each an external link. No logo wall, no tiers of pills. **Data:** `partners[] = { name, logo, url? }` (optional).

---

## C12. Component system — shared code, context-varied treatment

Components are **implementation-level reuse**; their *visual treatment varies by the section that mounts them* (a `LedgerRow` in Publications leads with category+title; in Events-past it leads with date; in the Chapters panel it leads with institution). The point of listing them is to prevent divergence in *behaviour*, not to impose one look.

- `SurfaceSection` — sets surface (ink/ivory/photographic) + margins + the `NN — TITLE` index; does **not** impose an internal layout.
- `IndexTitle` — crimson index + `label`.
- `DisplayHeading` — serif heading + line-rise reveal; size prop.
- `MaskImage` — mask-open + de-scale + optional hover scale; enforces crop, responsive sizes, blur, lazy.
- `LedgerRow` — index · title · meta · terminal mark; **slots are reordered per context**; hover choreography built-in.
- `Spread` — the projects/publications overlap composition with a `template` prop (a/b/c) so it varies (C5).
- `Counter` — count-once, tabular, reduced-motion final value.
- `FilterBar` — data-driven categories, sliding active hairline; drives URL.
- `ExecutiveRegister` — B1.1 pinned sequence (desktop) / stacked panels (mobile).
- `OrgNetwork` + `OrgList` — B2 graph and its required nested-list fallback (shared data).
- `Lightbox` — B/C8 viewer.
- `Cursor` — three-word controlled cursor (A7), desktop-only.
- `PageTransition` — the shared wipe + index-flash (A8); reduced-motion cross-fade. One mechanism for the whole site; no per-route bespoke shared-element morphs (image continuity is achieved by reusing the same crop, not by FLIP).
- `SmoothScroll` — provider; off under reduced motion.
- `Menu`, `SiteHeader`, `Colophon` (B5), `EmptyState`.

All components: semantic HTML first; motion is enhancement; focus-visible + keyboard + no-JS fallback on every interactive one.

---

## C13. Content data model (No-CMS v1, CMS-ready)

- All organisational content lives in **typed content files** under `content/` (one domain per file: leadership, chapters, publications, events, news, projects, impact, media, administrations, opportunities, partners, contact, about, site).
- **Typed schemas** match the `Data` shapes stated per section. A thin `getX()` data-access layer is the only import components see.
- **CMS-ready:** to move to a headless CMS later, swap only the data-access layer; schemas and components are untouched. No restructuring.
- **Honesty:** missing fields are optional in schema and render as a designed placeholder or are omitted — components must not fabricate. A `content/README` maps every `[NEEDS CONTENT]` field to the checklist in `requirements.md` §27.
- **Images:** referenced by path with required `alt`, `ratio`, optional `blur`/`caption`; served through the framework image pipeline.

---

## C14. SEO, metadata, performance

Per-route metadata from content; one h1 per route; semantic landmarks; descriptive links. Perf guardrails (mirror requirements §23): responsive + lazy + blur images; hero image prioritised (LCP); self-hosted fonts, preload + swap, no CLS; animate only transform/opacity/clip-path; animation/graph code split and loaded where used; video on interaction. Targets: Perf ≥ 85, A11y ≥ 95 (mid-tier mobile), LCP < 2.5s.

---

## C15. Items to confirm with LAWSAN (content/wording only — non-blocking for structure)

1. Primary hero statement wording (composition already absorbs 1–3 lines). `[OFFICIAL]`
2. Wordmark/logo vector (text fallback in place). `[OFFICIAL]`
3. Whether an approved closing statement exists for the colophon, or the full name stands alone. `[OFFICIAL]`
4. Final publications categories (defaults seeded; data-driven). `[OFFICIAL]`
5. Which statistics are official/confirmed (only confirmed render). `[OFFICIAL STATISTIC]`
6. Whether Partners is included (omit if none). `[OFFICIAL]`
7. The chapters "one network" statement wording, or omit it. `[OFFICIAL]`

---


# ANTI-SLOP DESIGN REVIEW

This is a **gate**, not advice. Before a page/section is implemented, and again before it is considered done, it must pass every check below. A failure means redesign, not a note-to-self.

### 1. Specificity
*Would this section still make sense if the LAWSAN logo and text were swapped for another organisation's?*
- If yes → redesign. The composition must depend on LAWSAN's own people, network, work, or thought.
- Reference: Leadership depends on real portraits at scale (B1); Chapters depends on the real Zone→State→Chapter structure (B2); Impact links each number to the page that proves it (B4).

### 2. Repetition
*Does this section reuse another section's composition or signature motion without a content reason?*
- If yes → reconsider. The five experiences must each look and move differently: Leadership replaces people vertically; Chapters lights a subtree on query; Publications recomposes an index; Impact resolves a number once; Contact barely moves.
- Reusing a **component** is fine; reusing a **whole look** is not.

### 3. Purpose
*Does every major visual element serve content, navigation, hierarchy, or interaction?*
- If an element serves none of these → remove it. Specifically banned as "purpose-less": decorative blobs, floating shapes, ambient particles, background video with no content, 3D objects.

### 4. Default template patterns
*Is this a familiar template pattern used only because it's common?* If any of these appear, replace with a deliberate composition:
- centred hero with a headline + CTA button (this site's hero is low-left, no button — C3)
- a row of three feature cards / icon cards
- rounded "app" cards, floating cards, repeated shadowed cards
- glassmorphism panels
- colour-to-colour gradient backgrounds / gradient text
- decorative blobs, arbitrary 3D, pill-clusters
- a uniform image grid where size implies equal importance (Media uses importance-sized masonry — C8)
- unnecessary drop-shadows (this site uses hairlines and space for structure — A3.2)

### 5. Motion justification
*Would this section still communicate with all animation removed?*
- If no → the information architecture is too weak and is fixed first; animation is never load-bearing for meaning.
- Each motion must name what content-fact it reveals (A6.2). Idle motion is banned except the hero scroll cue and the network's ambient breath.

### 6. Content authenticity
*Has any name, statistic, chapter, event, date, quote, history, or claim been invented to fill space?*
- If yes → remove it and substitute `[NEEDS CONTENT]` / `[OFFICIAL NAME]` / `[OFFICIAL STATISTIC]` / `[OFFICIAL IMAGE]`.
- Placeholders must be visibly placeholders; a composition that only looks good once fake content is added has failed.

### 7. Restraint (and the mechanism budget)
*Are multiple effects competing in one viewport?*
- More than two moving things, or more than ~5% crimson coverage, or more than one dominant element → simplify until one thing leads.
- **Mechanism budget (A6.0):** count the page's active mechanisms from {custom cursor, parallax, pinned section, mask reveal, kinetic type, count-up, network animation, FLIP/shared-element}. More than **three** → cut back to the primary + two supporting. Global page transitions, smooth scroll, and hover states do not count.
- **Dominant-idea check:** name the page's ONE primary interaction (see the table below). If two effects are both fighting to be "the thing the page does," one is demoted or removed.

**The one primary interaction per priority experience (must remain true after any edit):**
| Experience | Content/composition the visitor remembers | Primary interaction | Supporting (≤2) |
|---|---|---|---|
| Leadership | Full-height portraits at near-life scale, one at a time | Pinned scroll-driven person replacement | Mask reveal, index count-tick |
| Chapters | The Zone→State→Chapter org structure drawn as nodes | Select a State → read its subtree | Panel reveal, ambient breath (decorative) |
| Publications | A journal contents index; metadata equal to titles | Filtering recomposes the index | Hover margin-thumbnail, sliding category hairline |
| Impact | Huge figures beside the evidence that proves them | Count-up resolves each figure once | Descriptor line-rise (optional faint hand-off) |
| Contact | The colophon: name + reachable channels + address | Reading/reaching the channels (composition, not effect) | One name line-rise only |
Each row is visibly different in both **composition** and **primary interaction** — that difference is the requirement, not decoration.

### 8. Type discipline
*Is Instrument Serif being used just because a heading is large?*
- Serif is the institution's voice (names, titles, statements, numbers); Manrope is the record (nav, data, body). A large Manrope label is often the correct "heading" for a data block. Hierarchy comes from scale/space/alignment, not from making everything serif.

**Sign-off:** a section is not "done" until it passes 1–8. Part D is re-run at review time; passing at design time does not exempt the implementation.

---

*End of specification. Together with `requirements.md` this defines the intended experience concretely enough to implement without guessing, using placeholders wherever real LAWSAN content is not yet supplied. No application code written; nothing committed; no PR opened.*
