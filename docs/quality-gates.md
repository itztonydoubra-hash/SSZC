# Quality Gates → Rule Mapping (Task 0.3)

`npm run check` runs typecheck + ESLint + Stylelint. Each gate maps to an approved rule:

| Gate / script | Enforces | Source rule |
|---|---|---|
| `tsc --noEmit` (strict) | Type safety; typed content schemas | `requirements.md` §26.1; `tasks.md` 0.1, 7.1 |
| `next lint` (core-web-vitals) | React/Next best practices; no `<img>` (use `next/image`) | `design.md` C14; `requirements.md` §23 |
| `stylelint` `color-no-hex` / `color-named` | Tokens are the single source of truth; no raw/named colours outside `styles/tokens.css` | `design.md` A2/A2.2; `decisions.md` D1; `tasks.md` 0.2 |
| `npm run a11y` (axe-core across routes × desktop/tablet/mobile) | WCAG 2.0/2.1 A & AA incl. color-contrast; names/roles | `requirements.md` §23; `design.md` A2.2; `tasks.md` 5.2 |
| `npm run check:a11y` (build + a11y) | Full a11y gate against the built site | `tasks.md` 5.2 |
| `npm run contrast` | Re-verify token contrast matrix after any token change | `docs/contrast-matrix.md`; `design.md` A2.2 |

**Note:** `npm run check` stays fast (typecheck + lint + stylelint). The a11y gate
requires a production build (a live server for axe), so it runs as `check:a11y`
in CI/review rather than inside every `check`. Both must pass before a phase is
"done".
| `npm run perf` (placeholder → Phase 16) | Lighthouse Perf ≥ 85, A11y ≥ 95, LCP < 2.5s | `requirements.md` §23; `design.md` C14; `tasks.md` 16.2 |

**Anti-slop gate** (`design.md` Part D) is a manual per-page checklist run in Phase 17 (Task 17.1) and referenced by every UI task's acceptance criteria; it is not fully automatable but §4 (banned patterns like gradients/named colours/cards) is partly guarded by stylelint + the no-card/no-gradient conventions.
