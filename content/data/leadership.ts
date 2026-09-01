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
  ],
  // Official states + per-state/campus leadership not yet supplied — empty.
  states: [],
};
