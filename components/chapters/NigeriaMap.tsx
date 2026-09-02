/*
 * NigeriaMap — the drawing only (design.md A2 ink surface, A6.1 motion).
 *
 * A self-contained SVG of Nigeria built from real boundary data (see
 * nigeria-geography.ts). No mapping library, no tiles, no network requests: it
 * is a static vector drawing, so it costs one paint and works offline.
 *
 * The SVG is PRESENTATIONAL (aria-hidden / focusable="false"). The semantic,
 * keyboard-operable state controls are real <button>s in the HTML register that
 * the parent lays over this canvas in the same coordinate space. Pointer
 * handlers on the six state shapes are a redundant convenience for mouse/touch,
 * never the only way in.
 *
 * Three ranks are visually distinct: the national outline (context), the other
 * states as hairlines (context only, never interactive), and the six South South
 * states as filled shapes with a marker and a call-out route to their row.
 */
import { routePath } from "./map-layout";
import {
  CONTEXT_STATES,
  MAP_VIEW,
  NIGERIA_OUTLINE,
  type SouthSouthGeography,
} from "./nigeria-geography";

export type MapState = {
  geo: SouthSouthGeography;
  /** register row index — determines where this state's route lands */
  index: number;
};

export function NigeriaMap({
  states,
  /** geography for South South states that currently have no chapter record */
  unlisted = [],
  activeSlug,
  onSelect,
  onHover,
}: {
  states: MapState[];
  unlisted?: readonly SouthSouthGeography[];
  activeSlug?: string;
  onSelect: (slug: string) => void;
  onHover: (slug: string | null) => void;
}) {
  return (
    <svg
      className="cm-svg"
      viewBox={`0 0 ${MAP_VIEW.w} ${MAP_VIEW.h}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {/* Rank 3 — the other states and the FCT: geographical context only. A
          South South state with no supplied record falls back to this rank
          rather than being drawn as an option that leads nowhere. */}
      <g className="cm-context">
        {CONTEXT_STATES.map((d, i) => (
          <path key={`ctx-${i}`} d={d} />
        ))}
        {unlisted.map((g) => (
          <path key={`ctx-${g.slug}`} d={g.d} />
        ))}
      </g>

      {/* Rank 2 — the national outline: Nigeria, the root of the hierarchy. */}
      <path className="cm-outline" d={NIGERIA_OUTLINE} />

      {/* The call-out routes. Every state has one; only the active one is drawn
          to full strength (and, with motion, drawn as a line). */}
      <g className="cm-routes">
        {states.map(({ geo, index }) => (
          <path
            key={`route-${geo.slug}`}
            className="cm-route"
            d={routePath(geo.cx, geo.cy, index)}
            pathLength={1}
            data-active={activeSlug === geo.slug ? "true" : "false"}
          />
        ))}
      </g>

      {/* Rank 1 — the six South South states: the interactive focus. */}
      <g className="cm-states">
        {states.map(({ geo }) => (
          <path
            key={`ss-${geo.slug}`}
            className="cm-state"
            d={geo.d}
            data-active={activeSlug === geo.slug ? "true" : "false"}
            data-muted={activeSlug && activeSlug !== geo.slug ? "true" : "false"}
            onClick={() => onSelect(geo.slug)}
            onPointerEnter={() => onHover(geo.slug)}
            onPointerLeave={() => onHover(null)}
          />
        ))}
      </g>

      {/* Markers sit above the shapes so the active one is never buried. */}
      <g className="cm-markers">
        {states.map(({ geo }) => (
          <circle
            key={`mk-${geo.slug}`}
            className="cm-marker"
            cx={geo.cx}
            cy={geo.cy}
            r={activeSlug === geo.slug ? 4.2 : 2.4}
            data-active={activeSlug === geo.slug ? "true" : "false"}
          />
        ))}
      </g>
    </svg>
  );
}
