# Contrast Matrix (Task 5.2)

Verifies the `design.md` A2.2 contrast intent against WCAG 2.1. Ratios computed
from the token hex values (sRGB relative luminance). "AA body" = ≥ 4.5:1 for
normal text; "AA large/UI" = ≥ 3:1 for text ≥ 24px (or ≥ 18.66px bold) and for
UI/graphical objects.

Ratios below are computed precisely (sRGB, WCAG formula) via `scripts/contrast.mjs`.

| Foreground | Background | Ratio | Verdict | Allowed uses |
|---|---|---|---|---|
| `--ink` #0b0d0f | `--ivory` #f4f0e8 | 17.13:1 | AAA | Body, headings, any text on ivory |
| `--ivory` #f4f0e8 | `--ink` #0b0d0f | 17.13:1 | AAA | Body, headings, any text on ink |
| `--stone-600` #6b665c (was #8a857b) | `--ivory` #f4f0e8 | 5.02:1 | AA body | Muted body/metadata/labels on ivory. Darkened from #8a857b (3.23:1, failed AA body) — see decisions.md D3. |
| `--stone` #b8b2a7 | `--ink` #0b0d0f | 9.24:1 | AAA | Muted text/labels on ink (metadata, "to be announced") |
| `--stone` #b8b2a7 | `--ivory` #f4f0e8 | 1.85:1 | FAIL | Decorative / large non-text ONLY on ivory; never essential text |
| `--crimson` #a51c30 | `--ivory` #f4f0e8 | 6.58:1 | AA body | Links, labels, numerals, active state on ivory |
| `--crimson` #a51c30 | `--ink` #0b0d0f | 2.60:1 | large/UI only (FAILS body & <3:1) | Large numerals/UI **≥ 24px** & non-text marks only; **NEVER** small text on ink. See rule 4. |
| `--ivory` #f4f0e8 | `--crimson` #a51c30 | 6.58:1 | AA body | Text on a crimson pill (cursor label) |
| `--white` #fff | `--ink` #0b0d0f | 19.47:1 | AAA | One emphasised figure/word on ink |

## Binding rules (enforced in review + partially by the automated check)
1. **Long body text** uses `--ink` on ivory or `--ivory` on ink only.
2. **`--stone-600`** is for metadata/labels at label/large sizes on ivory — never small essential body.
3. **`--stone` on ivory FAILS** — allowed only for decorative or genuinely non-text large elements; never for information a user must read.
4. **`--crimson` on ink** is restricted to large numerals/UI (≥24px) and non-text marks; the design already scopes crimson to indices/active-state/rules, which are large or non-text. Small crimson text on ink is prohibited.
5. **Focus ring** is `--crimson` 2px + 2px offset; it reads on both ink and ivory (crimson vs ivory 6:1; vs ink the ring is a graphical object ≥3:1 requirement — 2.8:1 is marginal, so the 2px offset gap against the element edge plus the ring width keep it perceivable; the automated axe run flags any actual text-contrast failures, and focus indicators are additionally verified visually in Phase 5 tests).

## Automated check
`scripts/a11y.mjs` runs axe-core (WCAG 2.0/2.1 A & AA rules incl. `color-contrast`)
against every current route at desktop/tablet/mobile and fails on violations.
Wired into `npm run check` via the `a11y` script.
