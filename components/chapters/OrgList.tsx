/*
 * OrgList (design.md B2, tasks.md 9.1) — the SEMANTIC Zone › State › Chapter
 * nested list. This is the source of truth: it is the mobile experience, the
 * accessibility fallback, and the reduced-motion rendering. The desktop graph
 * (OrgNetwork) is layered OVER this same data.
 *
 * States are serif accordions that open to their chapters as ledger rows. All
 * states/chapters/counts come from data only. A state with no supplied chapters
 * shows "chapters to be confirmed" (never fabricated dots). If no states are
 * supplied at all, the whole list shows a [NEEDS CONTENT] line under the zone.
 *
 * Fully keyboard-operable and usable with no JS (native <details>/<summary>),
 * so it needs no client JS to be the accessible fallback.
 */
import type { Chapters } from "@/content/types";

export function OrgList({
  data,
  idPrefix = "orglist",
}: {
  data: Chapters;
  idPrefix?: string;
}) {
  const { zoneLabel, states } = data;

  return (
    <div>
      {/* The zone is the root of the containment; state it explicitly. */}
      <p className="type-label" style={{ color: "var(--surface-text-muted)" }}>
        Zone
      </p>
      <p className="type-display-m" style={{ color: "var(--surface-text)", marginTop: "var(--space-2)" }}>
        {zoneLabel}
      </p>

      {states.length === 0 ? (
        <p className="cn-tbd type-body-m" style={{ marginTop: "var(--space-6)" }}>
          {/* Official states + recognised chapters not yet supplied. */}
          The recognised chapters across the zone will be listed here, state by state.
        </p>
      ) : (
        <ul className="cn-list" style={{ marginTop: "var(--space-6)" }}>
          {states.map((s) => {
            const count = s.chapters.length;
            return (
              <li className="cn-list__state" key={s.state}>
                <details name={idPrefix}>
                  <summary className="cn-list__toggle">
                    <span className="type-display-m">{s.state}</span>
                    <span className="cn-list__count type-label">
                      {count > 0
                        ? `${count} ${count === 1 ? "chapter" : "chapters"}`
                        : "chapters to be confirmed"}
                    </span>
                  </summary>

                  {count > 0 ? (
                    <ul className="cn-list__chapters">
                      {s.chapters.map((c) => (
                        <li className="cn-list__chapter" key={c.slug}>
                          <span className="type-body-l">{c.institution}</span>
                          {c.location && (
                            <span className="type-label" style={{ color: "var(--surface-text-muted)" }}>
                              {c.location}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="cn-tbd type-body-m">Chapters to be confirmed.</p>
                  )}
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
