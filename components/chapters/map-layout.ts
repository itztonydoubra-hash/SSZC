/*
 * Chapters map LAYOUT constants (design.md A4.3 composition / B2 replacement).
 *
 * One source of truth for the coordinates the map drawing and the HTML state
 * register share. The SVG draws the leader lines in these coordinates; the
 * register's buttons are positioned in the SAME coordinates (published to CSS as
 * custom properties by the component), so a call-out line always lands exactly
 * on the row it points at — at every viewport, with no measuring JS.
 *
 * All values are in the MAP_VIEW space of nigeria-geography.ts (1000 x 620),
 * where the map occupies the left region and the register the right.
 */

/** The right-hand register: where the leader lines land and the rows sit. */
export const RAIL = {
  /** x at which a leader line elbows into its row (just clear of the map) */
  elbowX: 656,
  /** x of each row's left edge — the leader line's horizontal run ends here */
  labelX: 690,
  /** y of the first row's top edge */
  rowTop: 226,
  /** height of one register row */
  rowH: 64,
  /** y of the register's overline ("SOUTH SOUTH NETWORK / SELECT A STATE") */
  headY: 132,
} as const;

/**
 * The COMPACT crop (tablet/mobile). Below the desktop breakpoint the register
 * moves out of the drawing into a horizontal rail, and the canvas crops to the
 * map region alone so the map is never merely shrunk (design.md A10:
 * recomposition, not shrink). Values describe the visible window on MAP_VIEW.
 */
export const COMPACT_CROP = { w: 658, h: 548, y: 36 } as const;

/** Vertical centre of register row `i` — where its leader line arrives. */
export function railRowMidY(index: number): number {
  return RAIL.rowTop + index * RAIL.rowH + RAIL.rowH / 2;
}

/** The two-segment call-out route: state marker → elbow → row. */
export function routePath(cx: number, cy: number, index: number): string {
  const y = railRowMidY(index);
  return `M${cx},${cy}L${RAIL.elbowX},${y}L${RAIL.labelX},${y}`;
}
