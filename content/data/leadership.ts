/*
 * Leadership content (design.md B1).
 *
 * Zonal Director is VERIFIED (client-confirmed + corroborated — see
 * content/SOURCES.md). Other zonal roles (Deputy Zonal Director, Director of
 * Editorials & Writing, etc.) surfaced as research leads but could NOT be
 * independently verified from accessible sources (they live on the official
 * Instagram, which is not programmatically accessible). Per the content-honesty
 * rule they are LEFT OUT until officially confirmed — never fabricated.
 *
 * States/campuses remain EMPTY until the authoritative South South list is
 * supplied (the Directory renders "— to be announced" / an empty state).
 *
 * Portrait: the client supplied the Zonal Director's official portrait. Place
 * the file at public/leadership/effiong-valour-daniel.jpg. Until the file is
 * present, the component renders a clean placeholder (no marker text).
 */
import type { Leadership } from "../types";

export const leadership: Leadership = {
  zonal: [
    {
      index: "01",
      role: "Zonal Director — Directorate of Programs, Policies and Projects",
      name: "Effiong Valour Daniel, COL",
      portrait: {
        src: "/leadership/effiong-valour-daniel.jpg",
        alt: "Effiong Valour Daniel, South South Zonal Director",
        ratio: "4 / 5",
      },
    },
    {
      index: "02",
      role: "Zonal Chief Press Secretary",
      name: "Ndifon Jubilant Franklin",
      portrait: {
        src: "/leadership/ndifon-jubilant-franklin.jpeg",
        alt: "Ndifon Jubilant Franklin, Zonal Chief Press Secretary",
        ratio: "4 / 5",
      },
    },
    {
      index: "03",
      role: "Head of Human Resources and External Affairs",
      name: "Igbanoi Prince Christopher",
      portrait: {
        src: "/leadership/igbanoi-prince-christopher.jpeg",
        alt: "Igbanoi Prince Christopher, Head of Human Resources and External Affairs",
        ratio: "4 / 5",
      },
    },
    {
      index: "04",
      role: "South South Public Relations Officer",
      name: "Goodluck Osazemwinde",
      portrait: {
        src: "/leadership/goodluck-osazemwinde.jpeg",
        alt: "Goodluck Osazemwinde, South South Public Relations Officer",
        ratio: "4 / 5",
      },
    },
  ],
  // Official states + per-state/campus leadership supplied below.
  states: [
    {
      state: "Cross River State",
      director: "Chioma Modesta Okoro, SAM",
      directorPortrait: {
        src: "/leadership/chioma-modesta-okoro-sam.jpeg",
        alt: "Chioma Modesta Okoro, SAM, State Director, LAWSAN Cross River State",
        ratio: "4 / 5",
      },
      deputyDirector: "Abam Precious Etim",
      deputyDirectorPortrait: {
        src: "/leadership/abam-precious-etim.jpeg",
        alt: "Abam Precious Etim, Deputy State Director, LAWSAN Cross River State",
        ratio: "4 / 5",
      },
      campuses: [
        {
          institution: "University of Calabar",
          director: "Ekene Emmanuel Nduka",
          directorPortrait: {
            src: "/leadership/ekene-emmanuel-nduka.jpeg",
            alt: "Ekene Emmanuel Nduka, Campus Director, University of Calabar",
            ratio: "4 / 5",
          },
        },
        {
          institution: "Arthur Jarvis University",
          director: "Johnson Emediong Uko",
          directorPortrait: {
            src: "/leadership/johnson-emediong-uko..jpeg",
            alt: "Johnson Emediong Uko, Campus Director, Arthur Jarvis University",
            ratio: "4 / 5",
          },
        },
      ],
    },
    {
      state: "Bayelsa State",
      director: "Tony Tamaradoubra",
      directorPortrait: {
        src: "/leadership/tony-tamaradoubra.jpeg",
        alt: "Tony Tamaradoubra, State Director, LAWSAN Bayelsa State",
        ratio: "4 / 5",
      },
      deputyDirector: "Ayentua Favour Amaebi",
      deputyDirectorPortrait: {
        src: "/leadership/ayentua-favour-amaebi.jpeg",
        alt: "Ayentua Favour Amaebi, Deputy State Director, LAWSAN Bayelsa State",
        ratio: "4 / 5",
      },
      campuses: [],
    },
    {
      state: "Delta State",
      campuses: [
        {
          institution: "Western Delta University",
          director: "Amreyorobo Oghenekevwe Praise",
          directorPortrait: {
            src: "/leadership/amreyorobo-oghenekevwe-praise.jpeg.jpeg",
            alt: "Amreyorobo Oghenekevwe Praise, Campus Director, Western Delta University",
            ratio: "4 / 5",
          },
        },
        {
          institution: "Admiralty University of Nigeria",
          director: "Imianvan-Anthony Marvelous O.",
          directorPortrait: {
            src: "/leadership/imianvan-anthony-marvelous.jpeg.jpeg",
            alt: "Imianvan-Anthony Marvelous O., Campus Director, Admiralty University of Nigeria",
            ratio: "4 / 5",
          },
        },
        {
          institution: "Michael and Cecilia Ibru University",
          director: "Ebinum Joseph Azubuike",
          directorPortrait: {
            src: "/leadership/ebinum-joseph-azubuike.jpeg.jpeg",
            alt: "Ebinum Joseph Azubuike, Campus Director, Michael and Cecilia Ibru University",
            ratio: "4 / 5",
          },
        },
        {
          institution: "Edwin Clark University",
          director: "Preghafi Faith Woyengidoubara",
          directorPortrait: {
            src: "/leadership/preghafi-faith-woyengidoubara.jpeg.jpeg",
            alt: "Preghafi Faith Woyengidoubara, Campus Director, Edwin Clark University",
            ratio: "4 / 5",
          },
        },
      ],
    },
    {
      state: "Edo State",
      campuses: [
        {
          institution: "Benson Idahosa University",
          director: "Ezenduka Grace Chioma",
          directorPortrait: {
            src: "/leadership/ezenduka-grace-chioma.jpeg.jpeg",
            alt: "Ezenduka Grace Chioma, Campus Director, Benson Idahosa University",
            ratio: "4 / 5",
          },
        },
      ],
    },
  ],
};
