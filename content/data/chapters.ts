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
 * PRESIDENTS — 5 of the 22 supplied so far (client-supplied portraits, see
 * content/SOURCES.md and public/chapters/README.md): Arthur Jarvis University,
 * Hensard University, Michael and Cecilia Ibru University, Edo State University
 * and Glorious Vision University. Each has ONLY the name and the official
 * portrait, because that is all that was supplied. The remaining 17 have no
 * `president` at all and render the designed empty state — nothing is inferred
 * for them, and no portrait is substituted.
 *
 * NOT SET anywhere, because it was not supplied — do not infer or invent:
 *   `role`       — no official role wording given; the UI's generic
 *                  "Chapter President" label plus the chapter name carries it.
 *   `tenure`     — no session/tenure dates given for any president.
 *   `socials`    — no president social accounts given.
 *   `contact`    — no chapter or president emails/phone numbers given.
 *   `location`   — only Edo State University's campus (Iyamho) was supplied.
 *   `execs`      — no other chapter executives supplied.
 *   `images`     — no chapter imagery (beyond the portraits) supplied.
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
        {
          institution: "Arthur Jarvis University",
          slug: "arthur-jarvis-university",
          president: {
            name: "Edem Divine Agbor, SAL",
            portrait: {
              src: "/chapters/edem-divine-agbor.jpg",
              alt: "Edem Divine Agbor, LAWSAN chapter president, Arthur Jarvis University",
              ratio: "4 / 5",
            },
          },
        },
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
        {
          institution: "Hensard University",
          slug: "hensard-university",
          president: {
            name: "Elijah Christian Fonikimi",
            portrait: {
              src: "/chapters/elijah-christian-fonikimi.jpg",
              alt: "Elijah Christian Fonikimi, LAWSAN chapter president, Hensard University",
              ratio: "4 / 5",
            },
          },
        },
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
        {
          institution: "Michael and Cecilia Ibru University",
          slug: "michael-and-cecilia-ibru-university",
          president: {
            name: "Plaku Jessica Pere-ere, SAL",
            portrait: {
              src: "/chapters/plaku-jessica-pere-ere.jpg",
              alt: "Plaku Jessica Pere-ere, LAWSAN chapter president, Michael and Cecilia Ibru University",
              ratio: "4 / 5",
            },
          },
        },
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
        {
          institution: "Edo State University",
          slug: "edo-state-university",
          // Campus location supplied with the portrait ("Edo State University, Iyamho").
          location: "Iyamho",
          president: {
            name: "Omorhienrhien Princess Abieyuwa",
            portrait: {
              src: "/chapters/omorhienrhien-princess-abieyuwa.jpg",
              alt: "Omorhienrhien Princess Abieyuwa, LAWSAN chapter president, Edo State University",
              ratio: "4 / 5",
            },
          },
        },
        { institution: "Ambrose Alli University", slug: "ambrose-alli-university" },
        {
          institution: "Glorious Vision University",
          slug: "glorious-vision-university",
          president: {
            name: "Jude Ayobami Abe",
            portrait: {
              src: "/chapters/jude-ayobami-abe.jpg",
              alt: "Jude Ayobami Abe, LAWSAN chapter president, Glorious Vision University",
              ratio: "4 / 5",
            },
          },
        },
        { institution: "Benson Idahosa University", slug: "benson-idahosa-university" },
      ],
    },
  ],
};
