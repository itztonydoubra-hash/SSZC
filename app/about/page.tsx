/*
 * The Zone / About route (design.md C4) — the reading page.
 *
 * Composition follows C4: ivory throughout (reading flow beats forced
 * alternation), Manrope-dominant, serif reserved for the opening statement, the
 * movement headings and the two statements (vision, mission). Each movement is a
 * spine + margin-note, with a crimson movement numeral in the margin — the same
 * editorial numbering the rest of the site uses, and the one place crimson is
 * carried here (it passes AA on ivory, decisions.md D4).
 *
 * Hierarchy of voice, per the type system: the Zone's FORMAL NAME is set in
 * Manrope (it is the record), and the STATEMENT of what the Zone is carries the
 * serif and the <h1> (it is the institution speaking).
 *
 * Motion (C4): headings line-rise, one image mask-opens, and the PROSE DOES NOT
 * ANIMATE — a reading page must never withhold its text.
 *
 * PHOTOGRAPH PLACEMENT IS DELIBERATE. The one supplied photograph documents
 * something UNCONFIRMED (content/SOURCES.md: no event, place or date attached),
 * so it sits as a general plate after the opening and is NOT placed inside the
 * history movement and NOT given a duotone "archival" treatment — either would
 * imply it depicts the Zone's history, which is a claim we cannot make. It also
 * carries no caption, for the same reason.
 */
import type { Metadata } from "next";
import { getAbout } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MaskImage } from "@/components/chrome/MaskImage";
import { Grid, GridItem } from "@/components/layout/Grid";
import { AboutBlocks } from "@/components/about/AboutBlocks";
import { ZoneMotif } from "@/components/about/ZoneMotif";

export const metadata: Metadata = {
  title: "The Zone — LAWSAN South South",
  description:
    "About the South South Zone of the Law Students' Association of Nigeria: its history, purpose, values, vision, mission and role within LAWSAN.",
};

export default function AboutPage() {
  const a = getAbout();
  const plate = a.images.find((image) => image.src);

  /* Movement numerals are an editorial DESIGN device (as in the ledgers
   * elsewhere), not organisational content — they number the page's movements,
   * they do not rank or date anything. */
  let movement = 0;
  const next = () => String(++movement).padStart(2, "0");

  return (
    <SurfaceSection surface="ivory" index="01" title="THE ZONE" labelledById="about-title">
      <div className="ab">
        {/* ---- Opening ------------------------------------------------- */}
        <header className="ab-open">
          <p className="ab-open__name type-body-l">{a.title}</p>
          <DisplayHeading as="h1" id="about-title" size="xl" className="ab-open__statement">
            {a.statement}
          </DisplayHeading>
          {a.intro.map((paragraph) => (
            <p className="ab-prose type-body-m measure" key={paragraph}>
              {paragraph}
            </p>
          ))}
          {a.pull && <p className="ab-pull type-display-m">{a.pull}</p>}
        </header>

        {/* ---- The one supplied photograph, as a plate ----------------- */}
        {plate && (
          <figure className="ab-plate">
            <MaskImage
              src={plate.src}
              alt={plate.alt}
              ratio={plate.ratio}
              sizes="(max-width: 767px) 100vw, 62vw"
            />
          </figure>
        )}

        {/* ---- Movements ---------------------------------------------- */}
        <Movement index={next()} module={a.history} />
        <Movement index={next()} module={a.purpose} />
        <Movement index={next()} module={a.values} />
        <Movement index={next()} module={a.roleInLawsan} />

        {/* The two short serif statements (C4): generous space, no dividers. */}
        <Statement index={next()} label="The vision" text={a.vision} />
        <Statement index={next()} label="The mission" text={a.mission} />

        {/* Scope, beside the reused geographic motif (C4 → ties back to B2). */}
        <Movement index={next()} module={a.scope} motif />

        {a.coda && (
          <p className="ab-coda type-display-l">{a.coda}</p>
        )}
      </div>
    </SurfaceSection>
  );
}

/** One narrative movement: crimson numeral in the margin, copy on the spine. */
function Movement({
  index,
  module,
  motif = false,
}: {
  index: string;
  module: import("@/content/types").AboutModule;
  motif?: boolean;
}) {
  return (
    <section className="ab-movement">
      <Grid>
        <GridItem span={2} spanMd={8} spanSm={4} spine>
          <p className="ab-movement__index type-label-s tnum" aria-hidden>
            {index}
          </p>
        </GridItem>
        <GridItem span={motif ? 6 : 8} start={3} spanMd={8} spanSm={4}>
          <DisplayHeading as="h2" size="l" className="ab-movement__heading">
            {module.heading}
          </DisplayHeading>
          <AboutBlocks blocks={module.blocks} />
        </GridItem>
        {motif && (
          <GridItem span={3} start={10} spanMd={8} spanSm={4}>
            <ZoneMotif />
          </GridItem>
        )}
      </Grid>
    </section>
  );
}

/** A short serif statement on its own beat. */
function Statement({ index, label, text }: { index: string; label: string; text: string }) {
  return (
    <section className="ab-statement">
      <Grid>
        <GridItem span={2} spanMd={8} spanSm={4} spine>
          <p className="ab-movement__index type-label-s tnum" aria-hidden>
            {index}
          </p>
        </GridItem>
        <GridItem span={8} start={3} spanMd={8} spanSm={4}>
          <h2 className="ab-statement__label type-label">{label}</h2>
          <DisplayHeading as="p" size="l" className="ab-statement__text">
            {text}
          </DisplayHeading>
        </GridItem>
      </Grid>
    </section>
  );
}
