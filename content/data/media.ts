/*
 * Media Gallery content (design.md C8) — CLIENT-SUPPLIED production content.
 *
 * HOW TO ADD A NEW EVENT ALBUM:
 *   1. Upload photos to public/media/general/ (or events/, outreach/, etc.)
 *   2. Add a new MediaAlbum block to the array below — give it a title and list
 *      the photos inside `items`. That is all; no component changes needed.
 *   3. npm run check && next build → commit → push → Vercel auto-deploys.
 *
 * Each album renders as a titled section with a compact horizontal photo strip,
 * so the page never feels like an endless wall no matter how many events are added.
 *
 * NEVER fabricate alt text, captions, or titles. Use only what was supplied.
 */
import type { MediaAlbum } from "../types";

export const media: MediaAlbum[] = [
  {
    title: "Battle of the South South Moot Competition",
    description: "Pictorial Excerpts of the Battle of the South South Moot Competition",
    items: [
      { src: "/media/general/moot-competition-01.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-02.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-03.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-04.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-05.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-06.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-07.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-08.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-09.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-10.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
      { src: "/media/general/moot-competition-11.jpeg.jpeg", alt: "Scene from the Battle of the South South Moot Competition", ratio: "4 / 3" },
    ],
  },
  {
    title: "Zonal Tour to University of Port Harcourt",
    description: "A Zonal Tour To University Of Port Harcourt under the leadership of H.E Jewel Inno-Anamaeje.",
    items: [
      { src: "/media/general/uniport-tour-01.jpeg.jpeg", alt: "Zonal tour to University of Port Harcourt under the leadership of H.E Jewel Inno-Anamaeje", ratio: "4 / 3" },
      { src: "/media/general/uniport-tour-02.jpeg.jpeg", alt: "Zonal tour to University of Port Harcourt under the leadership of H.E Jewel Inno-Anamaeje", ratio: "4 / 3" },
      { src: "/media/general/uniport-tour-03.jpeg.jpeg", alt: "Zonal tour to University of Port Harcourt under the leadership of H.E Jewel Inno-Anamaeje", ratio: "4 / 3" },
      { src: "/media/general/uniport-tour-04.jpeg.jpeg", alt: "Zonal tour to University of Port Harcourt under the leadership of H.E Jewel Inno-Anamaeje", ratio: "4 / 3" },
      { src: "/media/general/uniport-tour-05.jpeg.jpeg", alt: "Zonal tour to University of Port Harcourt under the leadership of H.E Jewel Inno-Anamaeje", ratio: "4 / 3" },
    ],
  },
  {
    title: "Courtesy Visit to the National Welfare Officer, AWLA",
    description: "On the 29th of March, the South South Zonal Director paid a courtesy visit to Amb. Monica Abiton Akinuli, Esq., the National Welfare Officer of the African Women Lawyers Association.",
    items: [
      { src: "/media/general/courtesy-visit-awla-welfare-officer.jpeg.jpeg", alt: "South South Zonal Director on a courtesy visit to Amb. Monica Abiton Akinuli, Esq., National Welfare Officer of the African Women Lawyers Association", ratio: "4 / 3" },
    ],
  },
  {
    title: "Courtesy Visit to the Dean of the Faculty of Law, UNICAL",
    description: "A Courtesy Visit To The Dean Of The Faculty Of Law, University Of Calabar, Professor Michael Ibanga.",
    items: [
      { src: "/media/general/courtesy-visit-dean-of-law-unical.jpeg.jpeg", alt: "Courtesy visit to Professor Michael Ibanga, Dean of the Faculty of Law, University of Calabar", ratio: "4 / 3" },
    ],
  },
  {
    title: "Courtesy Visit to the Dean of Student Affairs, UNICAL",
    description: "A Courtesy Visit To The Dean Of Student Affairs, University Of Calabar, Professor Offiong Eyo.",
    items: [
      { src: "/media/general/courtesy-visit-dean-of-student-affairs-unical.jpeg.jpeg", alt: "Courtesy visit to Professor Offiong Eyo, Dean of Student Affairs, University of Calabar", ratio: "4 / 3" },
    ],
  },
  {
    title: "Courtesy Visit to the Head of Civil Service Commission, Cross River State",
    description: "A Courtesy Visit To Orok Bassey Okon, Esq. Head Of Civil Service Commission, Cross River State.",
    items: [
      { src: "/media/general/courtesy-visit-civil-service-commission-01.jpeg.jpeg", alt: "Courtesy visit to Orok Bassey Okon, Esq., Head of Civil Service Commission, Cross River State", ratio: "4 / 3" },
      { src: "/media/general/courtesy-visit-civil-service-commission-02.jpeg.jpeg", alt: "Courtesy visit to Orok Bassey Okon, Esq., Head of Civil Service Commission, Cross River State", ratio: "4 / 3" },
      { src: "/media/general/courtesy-visit-civil-service-commission-03.jpeg.jpeg", alt: "Courtesy visit to Orok Bassey Okon, Esq., Head of Civil Service Commission, Cross River State", ratio: "4 / 3" },
      { src: "/media/general/courtesy-visit-civil-service-commission-04.jpeg.jpeg", alt: "Courtesy visit to Orok Bassey Okon, Esq., Head of Civil Service Commission, Cross River State", ratio: "4 / 3" },
    ],
  },
  {
    title: "Courtesy Visit to Justice Frank Onyiri",
    description: "A Courtesy Visit To Justice Frank Onyiri, a Judge of the Rivers State High Court.",
    items: [
      { src: "/media/general/courtesy-visit-justice-frank-onyiri.jpeg.jpeg", alt: "Courtesy visit to Justice Frank Onyiri, a Judge of the Rivers State High Court", ratio: "4 / 3" },
    ],
  },
  {
    title: "Courtesy Visit to MBA Ukweni, SAN",
    description: "A Courtesy Visit To MBA Ukweni, SAN.",
    items: [
      { src: "/media/general/courtesy-visit-mba-ukweni-san.jpeg.jpeg", alt: "Courtesy visit to MBA Ukweni, SAN", ratio: "4 / 3" },
    ],
  },
  {
    title: "Dinner and Awards Night — Novena University, Delta State",
    description: "The Zonal Director, Effiong Valour Daniel, COL and Sen. Kanu Jane Tochi, Senator Representing University of Calabar were in attendance at the Dinner and Awards Night of Novena University in Delta State.",
    items: [
      { src: "/media/general/novena-university-dinner-awards-01.jpeg.jpeg", alt: "Zonal Director Effiong Valour Daniel and Sen. Kanu Jane Tochi at the Dinner and Awards Night of Novena University, Delta State", ratio: "4 / 3" },
      { src: "/media/general/novena-university-dinner-awards-02.jpeg.jpeg", alt: "Zonal Director Effiong Valour Daniel and Sen. Kanu Jane Tochi at the Dinner and Awards Night of Novena University, Delta State", ratio: "4 / 3" },
      { src: "/media/general/novena-university-dinner-awards-03.jpeg.jpeg", alt: "Zonal Director Effiong Valour Daniel and Sen. Kanu Jane Tochi at the Dinner and Awards Night of Novena University, Delta State", ratio: "4 / 3" },
    ],
  },
];
