/*
 * Leadership content (design.md B1). PLACEHOLDER STATE — no real names/roles.
 * Every human-supplied field is [OFFICIAL NAME] / [OFFICIAL ROLE] / [OFFICIAL
 * IMAGE]. The shapes exist so the experience can be built/reviewed; nothing is
 * fabricated. States/campuses are EMPTY until LAWSAN supplies the official list
 * (design.md B1.2 renders "— to be announced" for missing tiers, not invented
 * people). Replace these with real content when supplied (see content/README).
 */
import type { Leadership } from "../types";

export const leadership: Leadership = {
  // Zonal executives: placeholder rows so the Register composition can be built.
  // index/role/name/portrait are required by the design even in placeholder form.
  zonal: [
    {
      index: "01",
      role: "[OFFICIAL ROLE]",
      name: "[OFFICIAL NAME]",
      portrait: { src: "", alt: "[OFFICIAL IMAGE] — zonal executive portrait", ratio: "4 / 5" },
    },
    {
      index: "02",
      role: "[OFFICIAL ROLE]",
      name: "[OFFICIAL NAME]",
      portrait: { src: "", alt: "[OFFICIAL IMAGE] — zonal executive portrait", ratio: "4 / 5" },
    },
    {
      index: "03",
      role: "[OFFICIAL ROLE]",
      name: "[OFFICIAL NAME]",
      portrait: { src: "", alt: "[OFFICIAL IMAGE] — zonal executive portrait", ratio: "4 / 5" },
    },
  ],
  // Official states + per-state/campus leadership NOT yet supplied — empty.
  // (Do not invent states, institutions, or people.)
  states: [],
};
