import type { Metadata } from "next";
import { getImpact } from "@/content";
import { ImpactBeats } from "@/components/impact/ImpactBeats";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";

export const metadata: Metadata = {
  title: "Impact — LAWSAN South South",
  description:
    "The numbers behind the South South Zone — statistics presented as evidence of the association's activity and reach.",
};

export default function ImpactPage() {
  const impact = getImpact(); // stats already filtered to confirmed only
  return (
    <>
      <ImpactBeats stats={impact.stats} />

      {/* Story behind the numbers — testimonials render only if supplied. */}
      {impact.story.testimonials.length > 0 && (
        <SurfaceSection surface="ivory" index="07" title="THE STORY">
          <div className="im-story">
            <DisplayHeading as="h2" size="l">Behind the numbers.</DisplayHeading>
            {impact.story.testimonials.map((t, i) => (
              <blockquote key={i} className="im-testimonial type-display-m">
                {t.quote}
                <footer className="im-testimonial__by type-label">{t.attribution}</footer>
              </blockquote>
            ))}
          </div>
        </SurfaceSection>
      )}
    </>
  );
}
