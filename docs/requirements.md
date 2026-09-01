# LAWSAN South South — Website Requirements Specification

> **Status:** Approved (decisions locked) — requirements only. No application code has been written.
> **Source:** Creative Direction & Product Brief (LAWSAN South South) + approved decisions (see §28).
> **Purpose:** Translate the brief into a precise, buildable specification that preserves the creative direction, interaction design, and visual hierarchy — without inventing organisational facts.
> **Next stage:** `docs/design.md` (detailed design specification). Implementation does not begin until both `requirements.md` and `design.md` are approved.

---

## 0. How to read this document

- **MUST / MUST NOT** = hard requirement drawn directly from the brief.
- **SHOULD** = strong recommendation; may be tuned during design.
- **MAY** = optional / stretch.
- **[NEEDS CONTENT]** = real organisational information is required from LAWSAN South South before this can be built truthfully. Placeholders will be used until supplied.
- **[OPEN QUESTION]** = a decision or clarification is required before or during build.

Nothing marked **[NEEDS CONTENT]** will be fabricated. Where content is missing, the build will use clearly-labelled placeholders (e.g. `Executive Name — Position`) and neutral placeholder imagery, never invented names, statistics, chapters, or events.

---

## 1. Project overview

Build the official website for the **Law Students' Association of Nigeria (LAWSAN), South South Zone**.

The experience must read as a blend of: a contemporary editorial publication, a premium legal/institutional brand, a cultural institution, and a modern interactive digital experience. It must be sophisticated, youthful, authoritative, Nigerian, and distinctly South South.

**Primary success signal:** a visitor thinks *"This does not look like an ordinary law students' association website."* and remembers the experience after leaving.

### 1.1 Non-goals (MUST NOT)
- MUST NOT look like a generic NGO template, university portal, or SaaS marketing site.
- MUST NOT rely on excessive cards, repetitive three-column grids, excessive gradients, unnecessary glassmorphism, random 3D objects, or decorative-only animation.
- MUST NOT use stock imagery as the primary visual identity.
- MUST NOT use oversized type without hierarchical purpose.
- MUST NOT sacrifice usability for visual effect.
- MUST NOT invent organisational facts, names, statistics, chapters, or events.

---

## 2. Design philosophy (acceptance criteria)

The build MUST demonstrably prioritise:

| Principle | What "done" looks like |
|---|---|
| Strong art direction | Deliberate, consistent visual voice across all pages |
| Exceptional typography | Serif display + sans interface contrast is a defining feature |
| Editorial composition | Asymmetry, offset text, overlapping elements, variable image sizes |
| Large-scale photography | Full-bleed, documentary-style organisational imagery |
| Kinetic typography | Purposeful horizontal/vertical headline movement on scroll |
| Smooth scrolling | Cinematic, controlled scroll feel |
| Meaningful microinteractions | Hover, cursor, and state changes that respond, not decorate |
| Sophisticated transitions | Elegant page-to-page transitions, no abrupt cuts |
| Visual hierarchy & whitespace | Generous negative space; clear reading order |
| Real LAWSAN imagery | Documentary/authentic photography wherever available |
| Mobile responsiveness | A *reconsidered* mobile composition, not a shrunk desktop |

Consistency of a small set of well-executed effects is valued over a large catalogue of effects.

---

## 3. Visual identity

### 3.1 Colour palette
| Token | Value | Role |
|---|---|---|
| `--ink` (Primary dark) | `#0B0D0F` | Dark "ink" sections, primary text on light |
| `--ivory` (Primary light) | `#F4F0E8` | Warm ivory sections, primary background on light |
| `--crimson` (Accent) | `#A51C30` | **Sparing** highlights: active states, links, numbers, selected UI |
| `--stone` (Muted) | `#B8B2A7` | Secondary text, borders, muted metadata |
| `--white` | `#FFFFFF` | Pure white where needed |

**Rules**
- Crimson MUST be used sparingly. The site MUST NOT read as predominantly red.
- Visual rhythm MUST alternate between dark ink sections, warm ivory sections, and full-bleed photographic sections.
- Colour tokens MUST be defined centrally (single source of truth) and reused; no ad-hoc hex values in components.

### 3.2 Typography
| Role | Typeface | Usage |
|---|---|---|
| Display | **Instrument Serif** | Headlines, hero type, large statements, editorial titles, section intros, major statistics |
| Interface | **Manrope** | Navigation, body, buttons, metadata, labels, stat labels, forms, supporting text |

**Rules**
- The serif/sans contrast MUST be a major, visible part of the identity.
- Typography MUST be large, confident, editorial — but large type MUST always create hierarchy or movement, never fill space.
- Fonts MUST use properly licensed / web-compatible versions (Instrument Serif and Manrope are both open-licensed / available via Google Fonts).
- Fonts MUST be loaded with a performance-conscious strategy: self-host or use `next/font`, `font-display: swap`, preload the display face used above the fold, subset where feasible. Typography MUST perform well (no layout shift, fast first paint).

---

## 4. Layout system

- Desktop MUST use a **12-column editorial grid** as the underlying system.
- Sections MUST intentionally break the grid where appropriate (full-bleed photography, asymmetry, overlap, offset text, edge-to-edge sections, variable image sizes).
- The site MUST NOT devolve into repeated identical cards.
- A documented spacing/typographic scale MUST exist and be applied consistently.

---

## 5. Motion language

Global tone: smooth, cinematic, slow where appropriate, responsive, subtle, intentional.

### 5.1 Core animations (MUST support)
1. **Text reveal** — headings rise slightly while fading in.
2. **Image reveal** — images revealed via masked/clip animations.
3. **Parallax** — large photos move at a subtly different speed than surrounding content.
4. **Kinetic typography** — large headlines move horizontally/vertically on scroll.
5. **Counter animation** — impact statistics count up on entering the viewport.
6. **Hover interactions** — images scale subtly, arrows move, links respond, selected elements change state.
7. **Page transitions** — elegant transitions between major pages.
8. **Custom cursor** — minimal, contextual desktop cursor (e.g. `VIEW`, `OPEN`, `EXPLORE`).

### 5.2 Motion rules
- MUST NOT animate every element; restraint and consistency over quantity.
- Custom cursor MUST be disabled on touch devices.
- All motion MUST respect `prefers-reduced-motion` (see §13): essential content and navigation remain fully usable with motion reduced/removed.
- Animations MUST NOT block content availability or interaction.

---

## 6. Navigation

- MUST be minimal and premium; MUST NOT expose every page in a crowded bar.
- MUST use a clean primary navigation with a prominent menu interaction.
- SHOULD open as a **full-screen editorial navigation** experience.
- MUST remain obvious, usable, and keyboard-accessible.

**Suggested menu structure**
- **THE ZONE:** About · Leadership · Chapters · Administration Archive
- **EXPLORE:** Events · Projects & Initiatives · Publications · Opportunities · Media
- **CONNECT:** Contact

**DECIDED — News & Updates is part of the main IA** and MUST appear on the homepage as a curated/latest-news section (see §8). It MUST NOT dominate the homepage — the homepage remains an *experience*, not a news portal. News lives in the menu under **EXPLORE**.

---

## 7. Information architecture (pages)

The site MUST contain the following:

1. **Home**
2. **The Zone / About**
3. **Leadership**
4. **Chapters**
5. **Events**
6. **Projects & Initiatives**
7. **News & Updates**
8. **Publications / Knowledge Hub**
9. **Media Gallery**
10. **Impact / Statistics** — present as **both** a homepage-integrated section **and** a standalone page, driven by one shared data source (**DECIDED**)
11. **Administration Archive**
12. **Opportunities**
13. **Partners / Collaborations**
14. **Contact**

Detail/immersive sub-pages: individual **Project** pages (§15), individual **Event** pages (§16), individual **Publication/article** pages (§11), and per-**Chapter** detail views (§10).

**DECIDED — No CMS for v1.** Content is authored as **structured content/data files** in the repo. The content architecture MUST be clean enough that a CMS can be introduced later without restructuring the application (see §26.4).

---

## 8. Homepage experience

MUST NOT follow the standard "Hero → About → Cards → Footer" template. MUST tell a visual story.

**Suggested sequence (refinable):**
1. Cinematic LAWSAN South South hero
2. Introduction to the Zone
3. Large statement / values
4. Impact
5. Projects
6. Leadership
7. Chapter network
8. Events
9. Publications
10. Media
11. Closing statement
12. Contact / footer

### 8.1 Hero direction
- MUST be full viewport.
- SHOULD use real LAWSAN South South photography. [NEEDS CONTENT: hero photography]
- MUST feature large typography (e.g. `LAWSAN` / `SOUTH SOUTH`). **DECIDED — the hero MUST be tagline-agnostic:** the composition MUST allow the final approved tagline/primary statement to be dropped in later **without changing the layout**. Tagline wording is confirmed during the design stage. [NEEDS CONTENT: final tagline wording]
- MUST include subtle movement: image scale/parallax, kinetic typography, text reveal, scroll indicator, and a transition into the next section.
- First screen MUST immediately communicate a premium digital experience.

---

## 9. Leadership — "The People Behind the Movement"

- MUST NOT use a conventional grid of small executive cards as the *primary* presentation.
- Main zonal executives MUST be presented as a **large editorial portrait experience**:
  - Large portrait occupying most of the viewport.
  - Overlaid/adjacent typography: index number (e.g. `01`), position (e.g. `ZONAL DIRECTOR`), and `NAME SURNAME`.
  - On scroll, the next executive transitions into view.
  - Uses: large portraits, portrait masking, numbering, kinetic typography, subtle image parallax, name reveals, position labels, smooth transitions.
- After the zonal executives, present **State Directors, Deputy State Directors, Campus Directors, Deputy Campus Directors** through an **elegant interactive directory** that feels like an interface, not a spreadsheet. State selection MUST feel like an interface.
- MUST use only the actual states, chapters, and people supplied by LAWSAN. MUST NOT invent any of these.

[NEEDS CONTENT] Zonal executives: names, positions, order, portrait photos, (optional) bios.
[NEEDS CONTENT] State Directors / Deputy State Directors / Campus Directors / Deputy Campus Directors per state and per chapter.
**DECISION (design-stage):** the leadership data model MUST support an optional bio/socials detail view per leader, but v1 gracefully renders name+position+portrait when those fields are absent. Final wording/behaviour is specified in `design.md`.

---

## 10. Chapters — "The Network"

Signature experience. MUST NOT be a plain list of universities.

- MUST present a **visual representation of the South South LAWSAN network**.
- SHOULD implement an interactive network: states as nodes, chapters/universities as connected points, subtle animated connections; hovering a state highlights its network; selecting a state reveals its recognised chapters; selecting a chapter opens its information.
- MUST communicate: **"MANY INSTITUTIONS. ONE NETWORK."**
- **DECIDED — use the stylised interactive network/node concept, NOT a conventional geographical map.** Purpose: visually communicate the South South LAWSAN network. Node positions are a designed/stylised layout, not real coordinates. MUST NOT invent chapter counts or locations.
- MUST display **only officially recognised** South South LAWSAN chapters.
- MUST provide a usable mobile alternative to the network experience (§12).

[NEEDS CONTENT] Authoritative list of South South states and their officially recognised chapters/universities, plus any per-chapter info (name, institution, location, executives, contact, imagery).

---

## 11. Publications — "The Knowledge Hub"

- MUST feel like a premium legal journal / contemporary editorial publication; MUST NOT be a generic blog.
- MUST include: a featured publication, articles, reports, legal content, leadership content, opinion, and other approved publications.
- MUST use: large editorial headlines, strong serif type, a large feature image, asymmetrical article layouts, category filters, editorial metadata, subtle hover interactions.
- **DECIDED — the category system MUST be data-driven.** Start with `ALL` + **Articles, Legal, Leadership, Reports, Opinion**, but categories MUST be editable in data without redesigning the page. Downloadable PDF reports are supported by the data model (optional per item).

[NEEDS CONTENT] Publications/articles: titles, authors, dates, categories, body content, feature images, downloadable reports (PDFs) if any.

---

## 12. Impact / Statistics — "The Numbers"

- MUST NOT present statistics as four ordinary cards.
- MUST use **huge kinetic numbers** that count up on entering the viewport (e.g. `21,000+ LAW STUDENTS`, then `18 CHAPTERS`, then `7 STATES`, then `50+ PROJECTS`).
- **The example figures above are illustrative only and MUST NOT be used as real statistics unless officially confirmed.**
- After the major numbers, MUST tell the story behind them using projects, photographs, geographic reach, beneficiaries, testimonials, and achievements — communicating real organisational scale, not decorative numbers.

[NEEDS CONTENT] Confirmed statistics (student count, number of chapters, number of states, number of projects, beneficiaries, etc.) and the supporting story content (testimonials, achievements, photos).

---

## 13. Contact — "Let's Talk."

- MUST be a **full-screen dark closing experience**.
- Large serif type: `LET'S` / `TALK.`
- MUST arrange:
  - **GENERAL ENQUIRIES:** official email
  - **SOCIAL:** Instagram, Facebook, X, LinkedIn, other official platforms
  - **OFFICE:** official address
- Interactive links MUST have subtle hover movement.
- Footer MUST be minimal and premium.
- **DECIDED — no functional contact form in v1.** Use the official **email address, phone number and social media links** supplied by LAWSAN (email/phone/social + office address). A form may be added later only if there is a strong reason. MUST NOT invent contact details.

[NEEDS CONTENT] Official email, phone number, social handles/URLs, office address.

---

## 14. The Zone / About

- MUST explain: what LAWSAN South South is, history, purpose, vision, mission, core values, geographic/organisational scope, and its role within LAWSAN.
- MUST NOT be a wall of text; MUST use editorial storytelling — photography, large statements, progressive content reveals.

[NEEDS CONTENT] About copy: history, purpose, vision, mission, core values, scope, role within LAWSAN, supporting photography.

---

## 15. Projects & Initiatives

- MUST be presented as **stories**, not simple cards.
- Each project MAY contain: name, purpose, description, location, date, beneficiaries, results/impact, photography, video, related publications/reports.
- Major projects MUST have **immersive project pages**.

[NEEDS CONTENT] Project records and media.

---

## 16. Events

- MUST include: upcoming events, past events, event details, date, location, description, registration info (where applicable), photography/video, related news.
- SHOULD use horizontal scrolling or editorial event presentation where appropriate.

- **DECIDED — registration via external links** (e.g. Google Forms / Eventbrite) where applicable; no on-site registration backend in v1. The event data model MAY carry an optional `registrationUrl`.

[NEEDS CONTENT] Event records and media.

---

## 17. Media Gallery

- MUST be an **immersive gallery**, not a basic grid.
- MUST use: masonry/editorial layouts, large hero photographs, smaller supporting images, video previews, hover image scaling, full-screen gallery viewing.
- SHOULD organise by event, year, or category where enough content exists.

[NEEDS CONTENT] Media assets (photos, videos) with organising metadata (event/year/category).

---

## 18. Administration Archive — "The Archive"

- MUST present past administrations as a **visual history** — a chronological timeline of previous South South zonal administrations.
- Each administration MAY contain: year/session, Zonal Director, executive team, major achievements, photographs.
- If complete records are unavailable, MUST prioritise confirmed photographs and names over inventing missing information.

[NEEDS CONTENT] Past administrations: sessions/years, directors, teams, achievements, photos.

---

## 19. Opportunities

- Part of the IA. MUST support (eventually): competitions, scholarships, fellowships, internships, trainings, conferences, and calls for applications.
- **DECIDED — MUST be designed to render an elegant empty state** when there is no content, and a mix of current opportunities when there is. MUST NOT invent opportunities.
- The data model MUST support **deadlines/expiry** and **external application links**, and an **open/closed (expired)** state, so the section can drive repeat visits.

[NEEDS CONTENT] Opportunity listings.

---

## 20. Partners / Collaborations

- If approved partner info is supplied, create an elegant partners/collaborators section.
- MUST use logos sparingly; MUST communicate institutional credibility without a wall of logos.

[NEEDS CONTENT] Approved partner names/logos/links (optional — section may be omitted if none provided).

---

## 21. Photography direction

- Real organisational photography strongly preferred: conventions, conferences, competitions, trainings, outreach, leadership, students, meetings, campus activities, community projects.
- MUST avoid generic stock (e.g. lawyers shaking hands) as the primary visual identity.
- Photography MUST feel documentary and authentic.

[NEEDS CONTENT] The full photography library, ideally tagged by context/event.

---

## 22. Responsiveness

- MUST be exceptional on desktop, tablet, and mobile.
- MUST NOT merely shrink the desktop design; mobile MUST have its own considered composition.
- Animations MUST be reduced where necessary for performance/usability on mobile.
- The network/chapter experience MUST have a usable mobile alternative.
- Custom cursor MUST be disabled on touch devices.

---

## 23. Accessibility & performance

**Accessibility (MUST)**
- Strong text contrast (meet WCAG AA for body text; verify crimson/ivory and stone combinations).
- Readable body text sizes and line lengths.
- Keyboard-accessible navigation and interactive elements (focus states, logical order, skip-to-content).
- Respect `prefers-reduced-motion`.
- Accessible names/roles for interactive components; alt text for meaningful imagery.

**Performance (MUST)**
- Optimised, appropriately-sized, lazy-loaded imagery; modern formats (e.g. WebP/AVIF) with fallbacks.
- Fast initial load; motion/scroll libraries must not cause jank or block interaction.
- Responsive layouts with no horizontal overflow.
- **Target budgets (DECIDED as working defaults):** Lighthouse Performance ≥ 85 and Accessibility ≥ 95 on a mid-tier mobile; LCP < 2.5s on a fast connection; no CLS from fonts/hero. Visual quality is paramount, but large photography/animation/video MUST be optimised and lazy-loaded, and animation MUST remain smooth with reduced-motion respected.

---

## 24. Art direction rule

- The site MUST feel original. Reference galleries (Awwwards, FWA, Godly, CSS Winner, SiteInspire, Lapa Ninja, Dribbble) inform composition, interaction, typography, motion, editorial design, navigation, and microinteractions — but the layout of any specific reference site MUST NOT be reproduced.
- The final design MUST feel uniquely LAWSAN South South.

---

## 25. Final creative target

The finished site MUST communicate: **Authority, Leadership, Youth, Unity, Excellence, Community, Impact, South South identity.**

Desired emotional response: *"This is a serious organisation, but it understands the digital generation."* The experience MUST be memorable after leaving. Art direction and visual storytelling MUST be prioritised over adding unnecessary features.

---

## 26. Technical approach (DECIDED)

- **26.1 Framework:** **Next.js (App Router) + TypeScript.** Chosen to prioritise visual quality, smooth animation, SEO, performance, and image optimisation (`next/image`, `next/font`). Framework choices MUST NOT unnecessarily limit design or animation possibilities.
- **26.2 Styling:** Central **design tokens** (colours, type scale, spacing) as the single source of truth, driving all components. Concrete styling tooling (e.g. Tailwind with a custom token layer, or CSS Modules / vanilla-extract) is specified in `design.md` §Component System; either way tokens govern, no ad-hoc hex/spacing.
- **26.3 Motion:** A mainstream animation stack (e.g. GSAP + ScrollTrigger and/or Framer Motion) plus a smooth-scroll library (e.g. Lenis), all gated behind `prefers-reduced-motion`. The specific stack is finalised in `design.md` §Motion.
- **26.4 Content model (No CMS in v1):** All organisational data lives in **typed, structured content files** (single source per domain: leadership, chapters, events, projects, publications/categories, opportunities, media, statistics, contact, administrations, partners). Requirements:
  - Content is separated from presentation; components read from typed schemas.
  - Placeholders and `[NEEDS CONTENT]` states are isolated in data, never fabricated in components.
  - Schemas are shaped so a headless CMS can be introduced later by swapping the data-access layer only — **no application restructuring**.
- **26.5 Hosting/deploy:** Not decided as part of the design; the app MUST stay deployable to any modern Next.js-compatible host. Domain and hosting are chosen later.

---

## 27. Consolidated list of what LAWSAN must supply (content checklist)

- [ ] Hero statement/tagline + hero photography
- [ ] About: history, purpose, vision, mission, core values, scope, role within LAWSAN
- [ ] Confirmed statistics + supporting story (testimonials, achievements)
- [ ] Zonal executives: names, positions, order, portraits, optional bios
- [ ] State/Deputy State/Campus/Deputy Campus directors per state & chapter
- [ ] Authoritative list of South South states + officially recognised chapters (with per-chapter info, optional geo-coordinates)
- [ ] Events (upcoming + past) with details and media
- [ ] Projects & initiatives with details and media
- [ ] News & updates content
- [ ] Publications/articles + categories (+ downloadable reports if any)
- [ ] Media library (photos/videos) tagged by event/year/category
- [ ] Administration archive: past sessions, directors, teams, achievements, photos
- [ ] Opportunities listings (+ deadlines/links if applicable)
- [ ] Approved partners (optional)
- [ ] Official contact email, social URLs, office address
- [ ] Brand assets: logo(s) in vector, any existing brand guidelines

---

## 28. Decisions log (previously open questions — now resolved)

| # | Question | Decision | Ref |
|---|---|---|---|
| 1 | CMS? | **No CMS in v1.** Structured content/data files; architecture kept CMS-ready. | §7, §26.4 |
| 2 | Framework & styling | **Next.js (App Router) + TypeScript**, token-driven styling. | §26.1–26.2 |
| 3 | Contact form | **No form in v1** — official email, phone, social links, address only. | §13 |
| 4 | Event registration | **External links** (optional `registrationUrl`); no backend. | §16 |
| 5 | Chapters map vs graph | **Stylised interactive node network** (not a geographical map). | §10 |
| 6 | Impact placement | **Both** homepage section and standalone page, one data source. | §7, §12 |
| 7 | Leadership detail views | Optional bio/socials in the data model; graceful without them. | §9 |
| 8 | Publications taxonomy | **Data-driven categories**, seeded with Articles/Legal/Leadership/Reports/Opinion; PDFs supported. | §11 |
| 9 | Opportunities behaviour | Deadlines/expiry, external links, open/closed state, **empty state** designed. | §19 |
| 10 | Hero tagline | **Tagline-agnostic composition**; wording confirmed in design stage. | §8.1 |
| 11 | Fonts | Instrument Serif + Manrope, properly licensed, performance-tuned. | §3.2 |
| 12 | Perf/a11y budgets | Perf ≥ 85, A11y ≥ 95 (mid-tier mobile), LCP < 2.5s, no font CLS. | §23 |
| 13 | Hosting/domain | Deferred; keep deployable to any Next.js host. | §26.5 |
| 14 | News placement | In IA + curated homepage section (non-dominant); menu under EXPLORE. | §6, §8 |

**Creative direction is a core requirement, not optional styling.** The design MUST be editorial, premium, cinematic, distinctive and highly art-directed — never a conventional template with animation added afterwards. Generic card grids, generic SaaS layouts, excessive glassmorphism, excessive gradients, and decorative-only animation are prohibited. Usability and performance MUST be preserved without stripping the site into a generic minimalist website.

---

*End of requirements specification. All decisions in §28 are locked. The next deliverable is `docs/design.md`; implementation begins only after both documents are approved. No fabricated organisational content will be produced — `[NEEDS CONTENT]` / labelled placeholders are used until LAWSAN supplies real content.*
