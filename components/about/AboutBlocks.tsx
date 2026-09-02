/*
 * AboutBlocks (design.md C4) — renders one About module's ordered blocks.
 *
 * The Zone is a READING page, so Manrope leads and the prose does NOT animate
 * (C4). Hierarchy comes from scale, space and hairlines only — no weights, no
 * dividers-as-decoration, no cards.
 *
 * Five block kinds, each with one job:
 *   prose       body copy at the reading measure
 *   beat        a short line lifted out of the prose by scale + air
 *   list        parallel statements, read as a hairline-divided set
 *   principles  a name and the sentence that qualifies it
 *   note        a quieter reference (e.g. the constitutional footnote)
 */
import type { AboutBlock } from "@/content/types";

export function AboutBlocks({ blocks }: { blocks: readonly AboutBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "prose":
            return (
              <p className="ab-prose type-body-m measure" key={`prose-${i}`}>
                {block.text}
              </p>
            );

          case "beat":
            return (
              <p className="ab-beat type-body-l" key={`beat-${i}`}>
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul className="ab-list" key={`list-${i}`}>
                {block.items.map((item) => (
                  <li className="ab-list__item type-body-m" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "principles":
            // dl/dt/dd: a term and its definition is exactly what these are.
            return (
              <dl className="ab-principles" key={`principles-${i}`}>
                {block.items.map((principle) => (
                  <div className="ab-principles__row" key={principle.name}>
                    <dt className="ab-principles__name type-label">{principle.name}</dt>
                    <dd className="ab-principles__desc type-body-l">{principle.description}</dd>
                  </div>
                ))}
              </dl>
            );

          case "note":
            return (
              <p className="ab-note type-body-s measure" key={`note-${i}`}>
                {block.text}
              </p>
            );
        }
      })}
    </>
  );
}
