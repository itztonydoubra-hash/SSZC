/*
 * About / The Zone content (design.md C4). PARTIALLY POPULATED.
 *
 * History, purpose, vision, mission, values, scope and role-within-LAWSAN are
 * organisational narrative that must come from the client — all are stamped
 * [NEEDS CONTENT]. Nothing is fabricated; the About experience renders these
 * placeholders visibly.
 *
 * `images` holds one CLIENT-SUPPLIED photograph (decisions.md D2). Its `alt` is
 * a description of what is visibly in the frame ONLY — no event name, chapter,
 * location or date is attached, because none has been supplied/verified. Do not
 * add a `caption` until the client confirms what the photograph documents.
 */
import type { About } from "../types";

export const about: About = {
  statement: "[NEEDS CONTENT] — one-line statement of what LAWSAN South South is.",
  history: "[NEEDS CONTENT] — history of the South South Zone.",
  purpose: "[NEEDS CONTENT] — purpose.",
  vision: "[NEEDS CONTENT] — vision.",
  mission: "[NEEDS CONTENT] — mission.",
  values: [], // [NEEDS CONTENT] — core values list.
  scope: "[NEEDS CONTENT] — geographic/organisational scope.",
  roleInLawsan: "[NEEDS CONTENT] — role within LAWSAN nationally.",
  images: [
    {
      // Native 716×552 — the ratio is exact so the photograph is never cropped.
      src: "/media/general/hero-lawsan-south-south.jpg",
      alt: "A large group of schoolchildren in patterned outfits holding up exercise books outside a school building.",
      ratio: "716 / 552",
    },
  ],
};
