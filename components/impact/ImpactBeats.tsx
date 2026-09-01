/*
 * ImpactBeats (design.md B4) — a sequence of evidence beats. Each: huge serif
 * numeral (count-up) + descriptor + evidence note + link into the substantiating
 * page. Surface alternates per beat only as a rhythm of ink/ivory chosen by
 * index (not a rigid schedule). Renders NOTHING when there are no confirmed
 * stats (getImpact already filters to confirmed:true).
 */
import type { ImpactStat } from "@/content/types";
import { Container, Grid, GridItem } from "@/components/layout/Grid";
import { IndexTitle } from "@/components/chrome/IndexTitle";
import { Counter } from "./Counter";

export function ImpactBeats({ stats }: { stats: ImpactStat[] }) {
  if (stats.length === 0) {
    // No confirmed statistics — render an honest note, never a fake figure.
    return (
      <section className="surface-ivory" data-surface="ivory" aria-labelledby="impact-title">
        <Container>
          <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)" }}>
            <IndexTitle index="06" title="THE NUMBERS" />
            <p id="impact-title" className="type-display-l" style={{ marginTop: "var(--space-4)" }}>
              Confirmed impact figures — [OFFICIAL STATISTIC].
            </p>
            <p className="type-body-m measure" style={{ color: "var(--stone-600)", marginTop: "var(--space-4)" }}>
              Statistics are shown only once officially confirmed.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {stats.map((s, i) => {
        const surface = i % 2 === 0 ? "ink" : "ivory";
        return (
          <section key={s.descriptor} className={`surface-${surface}`} data-surface={surface}>
            <Container>
              <div className="im-beat">
                <Grid style={{ width: "100%" }}>
                  <GridItem span={8} spanMd={8} spanSm={4} spine>
                    <p className="im-beat__figure type-numeral">
                      <Counter value={s.value} display={s.display} suffix={s.suffix} />
                    </p>
                    <p className="im-beat__desc type-label">{s.descriptor}</p>
                  </GridItem>
                  {(s.evidenceNote || s.evidenceHref) && (
                    <GridItem span={3} start={10} spanMd={8} startMd={1} spanSm={4} style={{ alignSelf: "end" }}>
                      {s.evidenceNote && <p className="im-beat__evidence type-body-s">{s.evidenceNote}</p>}
                      {s.evidenceHref && (
                        <a className="im-beat__link type-label" href={s.evidenceHref}>
                          See the evidence <span aria-hidden>→</span>
                        </a>
                      )}
                    </GridItem>
                  )}
                </Grid>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
