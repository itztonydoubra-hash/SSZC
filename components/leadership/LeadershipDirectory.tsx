/*
 * LeadershipDirectory (design.md B1.2, tasks.md 8.3) — the wider leadership as a
 * record you QUERY, not a spreadsheet. Two panes on ivory: a state selector
 * (left) and the selected state's leadership as ledger rows grouped by tier
 * (right). Selecting a state keeps the selector fixed and swaps the right pane
 * (outgoing rows clip up, incoming line-rise stagger; a crimson marker slides).
 * This horizontal query→result motion is deliberately DIFFERENT from the
 * Register's vertical person-replacement.
 *
 * ?state= deep-links and is keyboard-selectable. Missing tiers render
 * "— to be announced" (never invented). Mobile: selector → horizontal DRAG
 * rail, tiers → accordions; usable as a plain list with no JS. Reduced motion:
 * instant swap.
 *
 * Reads getLeadership().states (official entries only; empty until supplied).
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { StateLeadership } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";

type Tier = { label: string; rows: { name: string; meta?: string }[] };

function tiersFor(state: StateLeadership): Tier[] {
  const campusDirectors = state.campuses
    .filter((c) => c.director)
    .map((c) => ({ name: c.director as string, meta: c.institution }));
  const deputyCampus = state.campuses
    .filter((c) => c.deputyDirector)
    .map((c) => ({ name: c.deputyDirector as string, meta: c.institution }));

  return [
    { label: "State Director", rows: state.director ? [{ name: state.director }] : [] },
    { label: "Deputy State Director", rows: state.deputyDirector ? [{ name: state.deputyDirector }] : [] },
    { label: "Campus Directors", rows: campusDirectors },
    { label: "Deputy Campus Directors", rows: deputyCampus },
  ];
}

export function LeadershipDirectory({ states }: { states: StateLeadership[] }) {
  const router = useRouter();
  const params = useSearchParams();

  // Resolve the selected state from ?state=, defaulting to the first.
  const initial = useMemo(() => {
    const q = params.get("state");
    const idx = states.findIndex((s) => s.state === q);
    return idx >= 0 ? idx : 0;
  }, [params, states]);

  const [selected, setSelected] = useState(initial);
  useEffect(() => setSelected(initial), [initial]);

  if (states.length === 0) {
    return (
      <p className="type-body-m" style={{ color: "var(--stone-600)" }}>
        {/* Official states + per-state leadership not yet supplied. */}
        State, campus and deputy leadership — [NEEDS CONTENT].
      </p>
    );
  }

  const select = (idx: number) => {
    setSelected(idx);
    const next = new URLSearchParams(Array.from(params.entries()));
    next.set("state", states[idx]!.state);
    router.replace(`/leadership?${next.toString()}#directory`, { scroll: false });
  };

  const state = states[selected]!;
  const tiers = tiersFor(state);

  return (
    <div className="ld-directory">
      {/* Left: state selector */}
      <ul className="ld-selector" aria-label="States">
        {states.map((s, i) => (
          <li key={s.state} className="ld-selector__item">
            <button
              type="button"
              className="ld-selector__btn type-display-m"
              aria-pressed={i === selected}
              onClick={() => select(i)}
            >
              {i === selected && (
                <span className="ld-selector__num type-label-s tnum" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span>{s.state}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Right: the selected state's leadership as tiered ledger rows */}
      <div className="ld-panel" aria-live="polite">
        {tiers.map((tier, ti) => (
          <section className="ld-tier" key={`${state.state}-${tier.label}`}>
            <h3 className="ld-tier__label type-label">{tier.label}</h3>
            {tier.rows.length === 0 ? (
              <p className="ld-tbd type-body-m">— to be announced</p>
            ) : (
              <ul className="l-ledger" style={{ borderTop: 0 }}>
                {tier.rows.map((row, ri) => (
                  <li className="l-ledger__row" key={`${row.name}-${ri}`} style={{ gridTemplateColumns: "1fr auto" }}>
                    <Reveal as="span" delayMs={(ti * tier.rows.length + ri) * 60} className="type-display-m">
                      {row.name}
                    </Reveal>
                    {row.meta && <span className="type-label" style={{ color: "var(--stone-600)" }}>{row.meta}</span>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
