/*
 * ZoneMotif (design.md C4 — "a reused small network motif, ties back to B2").
 *
 * The same geography the Chapters map is drawn from, reduced to a quiet plate:
 * Nigeria in hairlines with the six South South states filled. Reusing the real
 * outlines rather than drawing a decorative squiggle is what makes it a
 * reference to the Chapters page instead of unrelated ornament — and it costs
 * nothing extra, since the geometry module is already in the bundle.
 *
 * Purely PRESENTATIONAL: aria-hidden, not interactive, no labels. The Chapters
 * page is where the network is read; here it only says "this is the shape of the
 * Zone". The viewBox crops to the map region alone (no call-out rail).
 *
 * On the ivory reading surface the fills invert relative to Chapters: the six
 * states are ink, the rest of the country is a hairline.
 */
import {
  CONTEXT_STATES,
  MAP_REGION,
  NIGERIA_OUTLINE,
  SOUTH_SOUTH_GEOGRAPHY,
} from "@/components/chapters/nigeria-geography";

const PAD = 10;

export function ZoneMotif({ className }: { className?: string }) {
  const viewBox = [
    MAP_REGION.x - PAD,
    MAP_REGION.y - PAD,
    MAP_REGION.w + PAD * 2,
    MAP_REGION.h + PAD * 2,
  ].join(" ");

  return (
    <svg
      className={join("ab-motif", className)}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g className="ab-motif__context">
        {CONTEXT_STATES.map((d, i) => (
          <path d={d} key={`ctx-${i}`} />
        ))}
      </g>
      <path className="ab-motif__outline" d={NIGERIA_OUTLINE} />
      <g className="ab-motif__zone">
        {SOUTH_SOUTH_GEOGRAPHY.map((state) => (
          <path d={state.d} key={state.slug} />
        ))}
      </g>
    </svg>
  );
}

function join(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
