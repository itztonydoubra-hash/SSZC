/*
 * ============================================================================
 * GENERATOR — components/chapters/nigeria-geography.ts
 * ============================================================================
 * Builds the Chapters page map geometry from real boundary data so that no
 * outline is hand-drawn or invented.
 *
 * Source: geoBoundaries gbOpen NGA ADM0 + ADM1 (simplified release), which is
 * built from GRID3 Nigeria State Boundaries. Licence: CC BY 4.0.
 *   https://www.geoboundaries.org/
 *   https://data.grid3.org/
 *
 * Run (network required):  node scripts/gen-nigeria-map.mjs
 * The generated file is committed, so the app itself never fetches map data.
 * ============================================================================
 */
import { writeFile } from "node:fs/promises";

const REF = "9469f09";
const BASE = `https://github.com/wmgeolab/geoBoundaries/raw/${REF}/releaseData/gbOpen/NGA`;
const ADM0 = `${BASE}/ADM0/geoBoundaries-NGA-ADM0_simplified.geojson`;
const ADM1 = `${BASE}/ADM1/geoBoundaries-NGA-ADM1_simplified.geojson`;
const OUT = new URL("../components/chapters/nigeria-geography.ts", import.meta.url);

/* Designed coordinate space: the map occupies the left region, the right region
 * carries the call-out rail that the leader lines run into. */
const VIEW = { w: 1000, h: 620 };
const BOX = { x: 6, y: 30, w: 646, h: 560 };

/* The six South South states — shapeName in the source → slug used by the app. */
const SOUTH_SOUTH = {
  "Cross River": "cross-river",
  "Akwa Ibom": "akwa-ibom",
  Rivers: "rivers",
  Bayelsa: "bayelsa",
  Delta: "delta",
  Edo: "edo",
};

/* ---- helpers ------------------------------------------------------------- */

function ringsOf(geometry) {
  if (geometry.type === "Polygon") return geometry.coordinates;
  if (geometry.type === "MultiPolygon") return geometry.coordinates.flat();
  throw new Error(`unsupported geometry: ${geometry.type}`);
}

/** Ramer–Douglas–Peucker: keeps the silhouette, drops cartographic noise. */
function simplify(points, eps) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const norm = Math.hypot(dx, dy);
  let imax = 0;
  let dmax = -1;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d =
      norm === 0
        ? Math.hypot(px - ax, py - ay)
        : Math.abs(dy * (px - ax) - dx * (py - ay)) / norm;
    if (d > dmax) {
      dmax = d;
      imax = i;
    }
  }
  if (dmax <= eps) return [points[0], points[points.length - 1]];
  return [
    ...simplify(points.slice(0, imax + 1), eps).slice(0, -1),
    ...simplify(points.slice(imax), eps),
  ];
}

function signedArea(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

function centroidOf(pts) {
  const a = signedArea(pts);
  if (Math.abs(a) < 1e-9) return pts[0];
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    const cross = x1 * y2 - x2 * y1;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  return [cx / (6 * a), cy / (6 * a)];
}

const num = (v) => {
  const s = v.toFixed(1);
  return s.endsWith(".0") ? s.slice(0, -2) : s;
};

/* ---- run ---------------------------------------------------------------- */

const [adm0, adm1] = await Promise.all(
  [ADM0, ADM1].map(async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
  }),
);

/* Projection: equirectangular with x scaled by cos(mean latitude), then fitted
 * into BOX with the aspect preserved. Nigeria is far enough from the poles that
 * this reads correctly and keeps the maths transparent. */
let lonMin = Infinity;
let lonMax = -Infinity;
let latMin = Infinity;
let latMax = -Infinity;
for (const f of adm1.features) {
  for (const ring of ringsOf(f.geometry)) {
    for (const [lon, lat] of ring) {
      if (lon < lonMin) lonMin = lon;
      if (lon > lonMax) lonMax = lon;
      if (lat < latMin) latMin = lat;
      if (lat > latMax) latMax = lat;
    }
  }
}
const kx = Math.cos((((latMin + latMax) / 2) * Math.PI) / 180);
const spanX = (lonMax - lonMin) * kx;
const spanY = latMax - latMin;
const scale = Math.min(BOX.w / spanX, BOX.h / spanY);
const ox = BOX.x + (BOX.w - spanX * scale) / 2;
const oy = BOX.y + (BOX.h - spanY * scale) / 2;
const project = ([lon, lat]) => [
  ox + (lon - lonMin) * kx * scale,
  oy + (latMax - lat) * scale,
];

/** Build one path string; returns the path plus the largest ring's centroid. */
function pathFor(geometry, eps, minArea) {
  const parts = [];
  let biggest = null;
  let biggestArea = 0;
  for (const ring of ringsOf(geometry)) {
    let pts = ring.map(project);
    if (pts.length > 1) {
      const [fx, fy] = pts[0];
      const [lx, ly] = pts[pts.length - 1];
      if (fx === lx && fy === ly) pts = pts.slice(0, -1);
    }
    const area = Math.abs(signedArea(pts));
    if (area < minArea) continue; // drop slivers and unreadably small islands
    const simplified = simplify([...pts, pts[0]], eps);
    if (simplified.length < 4) continue;
    if (area > biggestArea) {
      biggestArea = area;
      biggest = pts;
    }
    const d = `M${simplified
      .slice(0, -1)
      .map(([x, y]) => `${num(x)},${num(y)}`)
      .join(" ")}Z`;
    parts.push({ area, d });
  }
  parts.sort((a, b) => b.area - a.area);
  return {
    d: parts.map((p) => p.d).join(""),
    centroid: biggest ? centroidOf(biggest) : null,
  };
}

const outline = pathFor(adm0.features[0].geometry, 1.1, 6).d;

const south = [];
const context = [];
for (const f of adm1.features) {
  const name = f.properties.shapeName;
  const slug = SOUTH_SOUTH[name];
  if (slug) {
    const { d, centroid } = pathFor(f.geometry, 0.7, 3); // more detail: the focus
    south.push({ name, slug, d, centroid });
  } else {
    context.push({ name, d: pathFor(f.geometry, 1.6, 8).d });
  }
}
if (south.length !== 6) throw new Error(`expected 6 South South states, got ${south.length}`);
context.sort((a, b) => a.name.localeCompare(b.name));
/* Rail order is north-to-south by centroid so the leader lines fan out without
 * crossing each other. */
south.sort((a, b) => a.centroid[1] - b.centroid[1]);

const ts = `/*
 * ============================================================================
 * NIGERIA MAP GEOMETRY — GENERATED FILE, DO NOT HAND-EDIT.
 * Regenerate with: node scripts/gen-nigeria-map.mjs
 * ============================================================================
 * SVG path data for the Chapters map. This is GEOGRAPHY (presentation), not
 * organisational content, so it lives beside the component rather than in
 * content/ — nothing here is client-supplied copy, and nothing is hand-drawn.
 *
 * Source: geoBoundaries gbOpen NGA ADM0 + ADM1 (simplified release), built from
 * GRID3 Nigeria State Boundaries. Licence: CC BY 4.0.
 *   https://www.geoboundaries.org/  ·  https://data.grid3.org/
 *
 * Projection: equirectangular, x scaled by cos(mean latitude), fitted to the
 * designed ${VIEW.w}x${VIEW.h} viewBox (map region left, call-out rail right).
 * Outlines are Douglas–Peucker simplified so the drawing reads as a clean
 * editorial vector map rather than a cartographic detail dump.
 * ============================================================================
 */

/** The designed coordinate space every path below is drawn in. */
export const MAP_VIEW = { w: ${VIEW.w}, h: ${VIEW.h} } as const;

/** The drawn map region inside MAP_VIEW (the compact viewBox uses this alone). */
export const MAP_REGION = {
  x: ${num(ox)},
  y: ${num(oy)},
  w: ${num(spanX * scale)},
  h: ${num(spanY * scale)},
} as const;

/** National outline of Nigeria. */
export const NIGERIA_OUTLINE =
  "${outline}";

/** The other states and the FCT — geographical context only, never interactive. */
export const CONTEXT_STATES: readonly string[] = [
${context.map((c) => `  /* ${c.name} */\n  "${c.d}",`).join("\n")}
];

export type SouthSouthGeography = {
  /** state slug — matches the state slug in the chapters data */
  slug: string;
  /** the state's outline, in MAP_VIEW coordinates */
  d: string;
  /** marker anchor: the state's centroid, in MAP_VIEW coordinates */
  cx: number;
  cy: number;
};

/** The six South South states, ordered north-to-south (the call-out rail order). */
export const SOUTH_SOUTH_GEOGRAPHY: readonly SouthSouthGeography[] = [
${south
  .map(
    (s) =>
      `  /* ${s.name} */\n  {\n    slug: "${s.slug}",\n    cx: ${num(s.centroid[0])},\n    cy: ${num(s.centroid[1])},\n    d: "${s.d}",\n  },`,
  )
  .join("\n")}
];
`;

await writeFile(OUT, ts, "utf8");
console.log(`wrote ${OUT.pathname} (${ts.length} bytes)`);
console.log(`map region ${num(spanX * scale)} x ${num(spanY * scale)} at ${num(ox)},${num(oy)}`);
for (const s of south) {
  console.log(`  ${s.name.padEnd(12)} centroid ${num(s.centroid[0])},${num(s.centroid[1])}`);
}
