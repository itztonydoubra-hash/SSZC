/*
 * Chapters content (design.md B2). POPULATED — client-supplied.
 *
 * The six South South states and their recognised chapters were supplied by the
 * client (see content/SOURCES.md). 22 chapters across 6 states:
 *   Cross River 2 · Akwa Ibom 2 · Rivers 2 · Bayelsa 3 · Delta 7 · Edo 6.
 * Nothing is added from general knowledge and nothing supplied is removed. All
 * counts shown in the UI are DERIVED from these records — never hardcoded.
 *
 * `slug` is the state's URL/query key (/chapters?state=bayelsa) and is also how
 * the Chapters map matches a state record to its real geographic outline. The
 * map geometry itself lives in components/chapters/nigeria-geography.ts because
 * geography is presentation, not client-supplied content.
 *
 * "Port Harcourt" in the supplied list was a CITY heading; the grouping is
 * recorded as Rivers State (see SOURCES.md). No "Port Harcourt State" exists.
 *
 * NOT SET, because they were not supplied — do not infer or invent:
 *   `location`   — no city/campus given for any chapter.
 *   `president`  — chapter presidents' names, portraits, socials, contact and
 *                  tenure are all outstanding. The profile renders its designed
 *                  empty state until they are supplied.
 *   `execs`      — no other chapter executives supplied.
 *   `contact`    — no chapter emails or phone numbers given.
 *   `images`     — no chapter imagery supplied.
 *
 * zoneLabel is the fixed root of the hierarchy; it is a structural label (not
 * organisational content), naming this zone.
 */
import type { Chapters } from "../types";

export const chapters: Chapters = {
  zoneLabel: "South South Zone",
  states: [
    {
      state: "Cross River State",
      slug: "cross-river",
      chapters: [
        { institution: "Arthur Jarvis University", slug: "arthur-jarvis-university" },
        { institution: "University of Calabar", slug: "university-of-calabar" },
      ],
    },
    {
      state: "Akwa Ibom State",
      slug: "akwa-ibom",
      chapters: [
        { institution: "University of Uyo", slug: "university-of-uyo" },
        { institution: "Topfaith University", slug: "topfaith-university" },
      ],
    },
    {
      state: "Rivers State",
      slug: "rivers",
      chapters: [
        { institution: "Rivers State University", slug: "rivers-state-university" },
        { institution: "University of Port Harcourt", slug: "university-of-port-harcourt" },
      ],
    },
    {
      state: "Bayelsa State",
      slug: "bayelsa",
      chapters: [
        { institution: "Niger Delta University", slug: "niger-delta-university" },
        { institution: "Federal University, Otuoke", slug: "federal-university-otuoke" },
        { institution: "Hensard University", slug: "hensard-university" },
      ],
    },
    {
      state: "Delta State",
      slug: "delta",
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
      slug: "edo",
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
