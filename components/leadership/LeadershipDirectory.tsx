/*
 * LeadershipDirectory (design.md B1.2, tasks.md 8.3) — the wider leadership as a
 * record you QUERY, not a spreadsheet. Two panes on ivory: a state selector
 * (left) and the selected state's leadership as ledger rows grouped by tier
 * (right). Portrait thumbnails shown when supplied.
 *
 * ?state= deep-links and is keyboard-selectable. Missing tiers render
 * "— to be announced" (never invented). Reduced motion: instant swap.
 *
 * Reads getLeadership().states (official entries only; empty until supplied).
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { ImageRef, StateLeadership } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { assetPath } from "@/lib/asset";

type Tier = { label: string; rows: { name: string; meta?: string; portrait?: ImageRef }[] };

function tiersFor(state: StateLeadership): Tier[] {
  const campusDirectors = state.campuses
    .filter((c) => c.director)
    .map((c) => ({ name: c.director as string, meta: c.institution, portrait: c.directorPortrait }));
  const deputyCampus = state.campuses
    .filter((c) => c.deputyDirector)
    .map((c) => ({ name: c.deputyDirector as string, meta: c.institution, portrait: c.deputyDirectorPortrait }));

  return [
    { label: "State Director", rows: state.director ? [{ name: state.director, portrait: state.directorPortrait }] : [] },
    { label: "Deputy State Director", rows: state.deputyDirector ? [{ name: state.deputyDirector, portrait: state.deputyDirectorPortrait }] : [] },
    { label: "Campus Directors", rows: campusDirectors },
  ];
}

export function LeadershipDirectory({ states }: { states: StateLeadership[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const initial = useMemo(() => {
    const q = params.get("state");
    const idx = states.findIndex((s) => s.state === q);
    return idx >= 0 ? idx : 0;
  }, [params, states]);

  const [selected, setSelected] = useState(initial);
  useEffect(() => setSelected(initial), [initial]);

  if (states.length === 0) {
    return (
      <p className="type-body-m measure" style={{ color: "var(--stone-600)" }}>
        State, campus and deputy leadership across the zone will be listed here.
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

      <div className="ld-panel" aria-live="polite">
        {tiers.map((tier, ti) => (
          <section className="ld-tier" key={`${state.state}-${tier.label}`}>
            <h3 className="ld-tier__label type-label">{tier.label}</h3>
            {tier.rows.length === 0 ? (
              <p className="ld-tbd type-body-m">— to be announced</p>
            ) : (
              <ul className="l-ledger" style={{ borderTop: 0 }}>
                {tier.rows.map((row, ri) => (
                  <li
                    className="l-ledger__row ld-dir-row"
                    key={`${row.name}-${ri}`}
                    style={{ gridTemplateColumns: row.portrait ? "auto 1fr auto" : "1fr auto" }}
                  >
                    {row.portrait && (
                      <span className="ld-dir-row__portrait" aria-hidden>
                        <Image
                          src={assetPath(row.portrait.src)}
                          alt=""
                          width={64}
                          height={80}
                          style={{ objectFit: "cover", display: "block" }}
                        />
                      </span>
                    )}
                    <Reveal as="span" delayMs={(ti * tier.rows.length + ri) * 60} className="type-display-m">
                      {row.name}
                    </Reveal>
                    {row.meta && (
                      <span className="type-label" style={{ color: "var(--stone-600)" }}>
                        {row.meta}
                      </span>
                    )}
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
