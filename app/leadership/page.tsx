/*
 * Leadership route (design.md B1). Two movements:
 *   1. Executive Register (ink, pinned scroll-driven person-replacement)
 *   2. Directory (ivory, query→result two-pane)
 *
 * Reads the Phase 7 data-access layer (getLeadership). Renders placeholder state
 * cleanly when content is [NEEDS CONTENT] / states empty — nothing invented.
 */
import { Suspense } from "react";
import type { Metadata } from "next";
import { getLeadership } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { ExecutiveRegister } from "@/components/leadership/ExecutiveRegister";
import { LeadershipDirectory } from "@/components/leadership/LeadershipDirectory";

export const metadata: Metadata = {
  title: "Leadership — LAWSAN South South",
  description:
    "The people behind the movement: zonal executives and the wider leadership of the Law Students' Association of Nigeria, South South Zone.",
};

export default function LeadershipPage() {
  const { zonal, states } = getLeadership();

  return (
    <>
      {/* Movement one — Executive Register (ink). Full-bleed: the pinned stage
          spans the viewport; the type column uses the container margin itself. */}
      <section className="surface-ink" data-surface="ink" aria-labelledby="leadership-title">
        <div className="l-container" style={{ paddingTop: "calc(var(--space-9) + var(--space-6))" }}>
          <p className="type-label" style={{ color: "var(--ivory)" }}>
            <span aria-hidden>04 </span>— LEADERSHIP
          </p>
          <DisplayHeading as="h1" id="leadership-title" size="xl" style={{ marginTop: "var(--space-4)" }}>
            The people are the institution.
          </DisplayHeading>
        </div>
        <ExecutiveRegister execs={zonal} />
      </section>

      {/* Movement two — Directory (ivory). */}
      <SurfaceSection surface="ivory" index="05" title="THE WIDER LEADERSHIP" labelledById="directory-title">
        <div id="directory" style={{ scrollMarginTop: "var(--space-9)" }}>
          <DisplayHeading as="h2" id="directory-title" size="l" style={{ marginTop: "var(--space-4)" }}>
            State, campus and deputy leadership.
          </DisplayHeading>
          <Suspense fallback={<p className="type-body-m" style={{ color: "var(--stone-600)" }}>Loading directory…</p>}>
            <LeadershipDirectory states={states} />
          </Suspense>
        </div>
      </SurfaceSection>
    </>
  );
}
