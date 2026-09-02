/*
 * Chapters content (design.md B2). POPULATED — client-supplied.
 *
 * The six South South states and their recognised chapters were supplied by the
 * client (see content/SOURCES.md). 22 chapters across 6 states.
 *
 * `layout` positions are a DESIGNED, explicitly NON-GEOGRAPHIC arrangement
 * (design.md B2) — a stylised fan to the right of the Zone anchor at (22, 50)
 * in the graph's 0..100 coordinate space. They deliberately do NOT correspond to
 * real map positions. Bounds are chosen so each state's chapter dots (which fan
 * out at radius 12 with a +6 x-offset) stay inside the canvas.
 *
 * NOT SET, because they were not supplied — do not infer or invent:
 *   `location`  — no city/address given for any chapter.
 *   `execs`     — chapter presidents' names not yet supplied.
 *   `contact`   — no chapter emails or phone numbers given.
 *   `images`    — chapter presidents' portraits to be supplied by the client.
 *
 * zoneLabel is the fixed root of the org network; it is a structural label
 * (not organisational content), naming this zone.
 */
import type { Chapters } from "../types";

export const chapters: Chapters = {
  zoneLabel: "South South Zone",
  states: [
    {
      state: "Cross River State",
      layout: { x: 52, y: 12 },
      chapters: [
        { institution: "Arthur Jarvis University", slug: "arthur-jarvis-university" },
        { institution: "University of Calabar", slug: "university-of-calabar" },
      ],
    },
    {
      state: "Akwa Ibom State",
      layout: { x: 62, y: 26 },
      chapters: [
        { institution: "University of Uyo", slug: "university-of-uyo" },
        { institution: "Topfaith University", slug: "topfaith-university" },
      ],
    },
    {
      state: "Rivers State",
      layout: { x: 66, y: 42 },
      chapters: [
        { institution: "Rivers State University", slug: "rivers-state-university" },
        { institution: "University of Port Harcourt", slug: "university-of-port-harcourt" },
      ],
    },
    {
      state: "Bayelsa State",
      layout: { x: 66, y: 58 },
      chapters: [
        { institution: "Niger Delta University", slug: "niger-delta-university" },
        { institution: "Federal University, Otuoke", slug: "federal-university-otuoke" },
        { institution: "Hensard University", slug: "hensard-university" },
      ],
    },
    {
      state: "Delta State",
      layout: { x: 62, y: 74 },
      chapters: [
        { institution: "Delta State University", slug: "delta-state-university" },
        { institution: "University of Delta", slug: "university-of-delta" },
        { institution: "Novena University", slug: "novena-university" },
        { institution: "Edwin Clark University", slug: "edwin-clark-university" },
        { institution: "Michael and Cecilia Ibru University", slug: "michael-and-cecilia-ibru-university" },
        { institution: "Western Delta University", slug: "western-delta-university" },
        { institution: "Admiralty University", slug: "admiralty-university" },
      ],
    },
    {
      state: "Edo State",
      layout: { x: 52, y: 88 },
      chapters: [
        { institution: "University of Benin", slug: "university-of-benin" },
        { institution: "Igbinedion University", slug: "igbinedion-university" },
        { institution: "Edo State University", slug: "edo-state-university" },
        { institution: "Ambrose Alli University", slug: "ambrose-alli-university" },
        { institution: "Glorious Vision University", slug: "glorious-vision-university" },
        { institution: "Benson Idahosa University", slug: "benson-idahosa-university" },
      ],
    },
  ],
};
