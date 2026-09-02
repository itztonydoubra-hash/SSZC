/*
 * About / The Zone content (design.md C4). POPULATED — client-supplied.
 *
 * This is APPROVED COPY, transcribed verbatim. Two things follow from that:
 *
 * 1. NOTHING here may be sharpened. The copy is deliberately unspecific in
 *    places — "during the tenure of an early zonal leadership", "the second
 *    convention", "a growing collection of law faculties". Those hedges are the
 *    approved wording precisely because the underlying dates, names and figures
 *    are NOT verified (see content/SOURCES.md). Do not replace them with
 *    specifics, and do not add years, names or counts that the copy withholds.
 * 2. Claims about LAWSAN's constitution ("its stated objectives include…",
 *    "expressly identifies equality, non-sectarianism…") are the client's
 *    characterisation of their own governing document. They are reported as
 *    supplied — not extended, and not cited to a section number we do not have.
 *
 * `images` holds one CLIENT-SUPPLIED photograph (decisions.md D2). Its `alt`
 * describes what is visibly in the frame ONLY — no event, chapter, location or
 * date is attached, because none has been supplied. Do not add a `caption`
 * until the client confirms what the photograph documents.
 */
import type { About } from "../types";

export const about: About = {
  title: "The Law Students' Association of Nigeria, South South Zone.",

  statement:
    "The South South Zone is where a national association becomes a regional community.",

  intro: [
    "Across Akwa Ibom, Bayelsa, Cross River, Delta, Edo and Rivers, LAWSAN connects law students through their faculties, chapters and shared commitment to the study and practice of law. The Zone exists within the wider Law Students' Association of Nigeria, carrying its national ideals into the institutions and communities of the South South.",
  ],

  pull: "Its story is, above all, a story of connection.",

  history: {
    heading: "A region, brought together",
    blocks: [
      {
        kind: "prose",
        text: "The South South Zone emerged as a platform for bringing law students across the region into closer contact, creating opportunities for students who would otherwise experience legal education largely within the boundaries of their individual faculties.",
      },
      {
        kind: "prose",
        text: "That idea of convergence became part of the Zone's character. The first regional convergence of law students was organised during the tenure of an early zonal leadership, followed by the South South Zonal Convention and subsequent editions that brought students together for learning, advocacy, competition, fellowship and recognition.",
      },
      {
        kind: "prose",
        text: "The conventions became more than annual gatherings. They provided a common ground where students from different faculties could meet, compete, learn from practitioners and one another, and see themselves as part of something larger than their individual chapters. Public accounts of the second convention describe legal symposiums, competitions, awards and participation from across the Zone.",
      },
      { kind: "beat", text: "The work has continued to evolve." },
      {
        kind: "prose",
        text: "Today, the Zone's activity extends beyond convergence. Students participate in South South moot competitions, academic programmes, professional development initiatives and other zonal activities, creating channels through which students can develop advocacy, research, leadership and professional skills.",
      },
    ],
  },

  purpose: {
    heading: "Why the Zone exists",
    blocks: [
      {
        kind: "prose",
        text: "At the national level, LAWSAN's constitutional purpose is built around unionism and comradeship among law students. Its stated objectives include representing the interests of Nigerian law students, coordinating their activities, strengthening their knowledge of substantive and procedural law, developing advocacy skills, promoting legal education, pursuing justice for students and maintaining a connection between faculties of law across Nigeria.",
      },
      { kind: "beat", text: "The South South Zone gives those principles a regional expression." },
      {
        kind: "list",
        items: [
          "It connects chapters that are separated by geography but united by discipline.",
          "It creates a space where ideas, opportunities and institutional experience can move between faculties.",
          "It gives students a platform to represent their institutions beyond their campuses.",
          "And it provides a structure through which national programmes and policies can reach students at state and campus level.",
        ],
      },
      {
        kind: "note",
        text: "Under the LAWSAN constitutional structure, the Zonal Directorate coordinates activities within the Zone, supervises State Directorates and implements programmes, projects and policies for the Zone. State and Campus Directorates extend that structure into individual states and faculties.",
      },
    ],
  },

  values: {
    heading: "What we stand for",
    blocks: [
      { kind: "prose", text: "The Zone inherits its principles from the Association it represents." },
      {
        kind: "principles",
        items: [
          {
            name: "Equality",
            description:
              "Every chapter is part of the same network. Geography, institution or size should not determine a student's place within it.",
          },
          {
            name: "Justice",
            description:
              "Law students are not only students of justice. They are participants in a profession whose legitimacy depends upon it.",
          },
          {
            name: "Discipline",
            description:
              "The study of law demands seriousness, responsibility and respect for institutions.",
          },
          {
            name: "Accountability",
            description:
              "Leadership is stewardship. Authority within the Association carries corresponding responsibility to its members.",
          },
          {
            name: "Probity",
            description:
              "Integrity is not an accessory to legal education. It is part of the character the profession demands.",
          },
          {
            name: "Unity",
            description:
              "The Zone exists to bring faculties and students into relationship with one another, building the sense of comradeship at the heart of LAWSAN.",
          },
        ],
      },
      {
        kind: "note",
        text: "These principles reflect the constitutional philosophy of LAWSAN, which expressly identifies equality, non-sectarianism, nonpartisanship, discipline, justice, accountability and probity as core values.",
      },
    ],
  },

  roleInLawsan: {
    heading: "Our role within LAWSAN",
    blocks: [
      {
        kind: "prose",
        text: "The South South Zone is neither separate from LAWSAN nor merely a geographical label.",
      },
      {
        kind: "beat",
        text: "It is part of the machinery through which the Association reaches its members.",
      },
      {
        kind: "prose",
        text: "The Zone sits between the national structure and the chapters that make up the student community. Through its zonal, state and campus structures, it coordinates programmes, carries information, supports chapter activity and creates opportunities for students to engage beyond their individual institutions.",
      },
      { kind: "prose", text: "Its work therefore has several dimensions:" },
      {
        kind: "principles",
        items: [
          {
            name: "Connect",
            description:
              "Bring law students and chapters across the six states into one regional network.",
          },
          {
            name: "Develop",
            description:
              "Create opportunities for academic, advocacy, leadership and professional growth.",
          },
          {
            name: "Represent",
            description:
              "Give the South South student community a stronger collective voice within LAWSAN.",
          },
          {
            name: "Serve",
            description:
              "Translate the Association's commitment to students into programmes, initiatives and practical support.",
          },
          {
            name: "Convene",
            description:
              "Create spaces where students can meet, exchange ideas, compete, collaborate and build relationships.",
          },
        ],
      },
    ],
  },

  vision:
    "A South South legal student community that is connected, capable and conscious of its place within the future of the Nigerian legal profession.",

  mission:
    "To connect law students and chapters across the South South, promote legal education and advocacy, develop student leadership, create meaningful opportunities for collaboration and ensure that the ideals of LAWSAN are experienced not only at the national level, but within every chapter of the Zone.",

  scope: {
    heading: "The Zone today",
    blocks: [
      {
        kind: "prose",
        text: "The South South network now stretches across six states and a growing collection of law faculties.",
      },
      {
        kind: "prose",
        text: "Its strength is not simply the number of institutions within it. It is the possibility created when those institutions are connected.",
      },
      {
        kind: "list",
        items: [
          "A student in Calabar can compete with a student in Uyo.",
          "A chapter in Yenagoa can learn from one in Port Harcourt.",
          "A student in Benin can contribute to a conversation that reaches Delta, Rivers, Bayelsa, Akwa Ibom and Cross River.",
        ],
      },
      { kind: "beat", text: "That is the purpose of a zone." },
      {
        kind: "prose",
        text: "Not to make six states one institution, but to make many institutions part of one community.",
      },
      { kind: "prose", text: "The South South Zone is still being written." },
      {
        kind: "prose",
        text: "Every chapter, every competition, every convention, every programme and every student who participates becomes part of that record.",
      },
    ],
  },

  coda: "Six states. Many chapters. One LAWSAN.",

  images: [
    {
      // Native 716×552 — the ratio is exact so the photograph is never cropped.
      src: "/media/general/hero-lawsan-south-south.jpg",
      alt: "A large group of schoolchildren in patterned outfits holding up exercise books outside a school building.",
      ratio: "716 / 552",
    },
  ],
};
