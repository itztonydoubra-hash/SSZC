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
];
