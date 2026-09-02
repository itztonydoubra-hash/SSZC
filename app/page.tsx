/*
 * Homepage (design.md C2/C3) — one argument in seven moves, reduced/static
 * previews of the experiences (not live). Whole-page motion budget: page
 * transitions + smooth scroll + hero reveal + one Impact count-up.
 * Content-honest: renders [OFFICIAL]/[NEEDS CONTENT] and skips moves whose
 * content is unavailable, re-linking so the argument still reads.
 */
import type { Metadata } from "next";
import {
  getAbout, getChapters, getImpact, getLeadership, getNews, getProjects, getPublications,
} from "@/content";
import { fmtDate } from "@/lib/date";
import { isPlaceholder } from "@/lib/content-display";
import { Container, Grid, GridItem } from "@/components/layout/Grid";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { IndexTitle } from "@/components/chrome/IndexTitle";
import { MaskImage } from "@/components/chrome/MaskImage";
import { Counter } from "@/components/impact/Counter";
import { Colophon } from "@/components/contact/Colophon";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { HeroCue } from "@/components/home/HeroCue";

export const metadata: Metadata = {
  title: "LAWSAN South South — Official Website",
  description:
    "The official website of the Law Students' Association of Nigeria, South South Zone — its people, network, work and thought.",
};

export default function Home() {
  const about = getAbout();
  const chapters = getChapters();
  const impact = getImpact();
  const leadership = getLeadership();
  const projects = getProjects();
  const publications = getPublications();
  const news = [...getNews()].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  const firstExec = leadership.zonal[0];
  const featured = publications.items.find((p) => p.featured) ?? publications.items[0];
  const firstProject = projects[0];
  const firstStat = impact.stats[0]; // already confirmed-only

  // A "real" lead has a supplied name (not the [OFFICIAL …] placeholder).
  const realExec =
    firstExec && !isPlaceholder(firstExec.name) ? firstExec : undefined;
  const zoneStatementReady = !isPlaceholder(about.statement);
  // Only a photograph with a real src counts — [OFFICIAL IMAGE] stubs have src: "".
  const zoneImage = about.images.find((img) => img.src);

  return (
    <>
      {/* 1. WHO WE ARE — hero */}
      <section className="surface-photo hp-hero" data-surface="ink" aria-labelledby="hp-title">
        <div className="hp-hero__media" aria-hidden>
          {/* [OFFICIAL IMAGE] — hero photograph of LAWSAN members not yet supplied */}
        </div>
        <div className="hp-hero__scrim" aria-hidden />
        <Container className="hp-hero__inner">
          <p className="hp-hero__eyebrow type-label">Official Website · South South Zone</p>
          {/* [OFFICIAL] primary statement — placeholder composes at 1–3 lines */}
          <DisplayHeading as="h1" id="hp-title" size="xxl" className="hp-hero__statement" style={{ marginTop: "var(--space-4)" }}>
            LAWSAN South South
          </DisplayHeading>
        </Container>
        <HeroCue />
      </section>

      {/* 2. definition of the Zone (→ from face to meaning). When a real
           photograph exists it carries the beat as a contained plate — sized to
           the image's native width so it is never upscaled (see about.images). */}
      <SurfaceSection surface="ivory" index="01" title="THE ZONE">
        <div className="hp-move">
          {zoneImage ? (
            <Grid rowGap="var(--space-6)">
              <GridItem span={7} spanMd={8} spanSm={4}>
                <MaskImage
                  src={zoneImage.src}
                  alt={zoneImage.alt}
                  ratio={zoneImage.ratio}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
              </GridItem>
              <GridItem span={5} start={8} spanMd={8} startMd={1} spanSm={4} style={{ alignSelf: "end" }}>
                <DisplayHeading as="h2" size="l">
                  {zoneStatementReady ? about.statement : "The Law Students' Association of Nigeria, South South Zone."}
                </DisplayHeading>
                <TransitionLink href="/about" label={{ num: "01", title: "THE ZONE" }} className="hp-move__link type-label">Read more <span aria-hidden>→</span></TransitionLink>
              </GridItem>
            </Grid>
          ) : (
            <>
              <DisplayHeading as="h2" size="l" className="measure">
                {zoneStatementReady ? about.statement : "The Law Students' Association of Nigeria, South South Zone."}
              </DisplayHeading>
              <TransitionLink href="/about" label={{ num: "01", title: "THE ZONE" }} className="hp-move__link type-label">Read more <span aria-hidden>→</span></TransitionLink>
            </>
          )}
        </div>
      </SurfaceSection>

      {/* 3. WHERE WE ARE — network preview (static) */}
      <SurfaceSection surface="ink" index="03" title="THE NETWORK">
        <div className="hp-move">
          <DisplayHeading as="h2" size="l">Many institutions. One network.</DisplayHeading>
          <p className="type-body-m" style={{ color: "var(--stone)", marginTop: "var(--space-4)" }}>
            {chapters.states.length > 0
              ? `${chapters.states.length} states across the South South Zone.`
              : "The recognised chapters across the zone will be mapped here."}
          </p>
          <TransitionLink href="/chapters" label={{ num: "03", title: "CHAPTERS" }} className="hp-move__link type-label">Explore the network <span aria-hidden>→</span></TransitionLink>
        </div>
      </SurfaceSection>

      {/* 4. WHO LEADS US — one static portrait beat when a real exec exists;
           otherwise a composed statement that still hands off to /leadership. */}
      <SurfaceSection surface="ink" index="04" title="LEADERSHIP">
        <div className="hp-move">
          {realExec ? (
            <Grid rowGap="var(--space-5)">
              <GridItem span={5} spanMd={8} spanSm={4}>
                {realExec.portrait.src ? (
                  <MaskImage src={realExec.portrait.src} alt={realExec.portrait.alt} ratio="4 / 5" sizes="(max-width:767px) 100vw, 40vw" />
                ) : (
                  <div style={{ aspectRatio: "4 / 5", background: "var(--ink-800)" }} aria-hidden />
                )}
              </GridItem>
              <GridItem span={6} start={7} spanMd={8} startMd={1} spanSm={4} style={{ alignSelf: "end" }}>
                <p className="type-label" style={{ color: "var(--stone)" }}>{realExec.role}</p>
                <DisplayHeading as="h2" size="xl" style={{ marginTop: "var(--space-3)" }}>{realExec.name}</DisplayHeading>
                <TransitionLink href="/leadership" label={{ num: "04", title: "LEADERSHIP" }} className="hp-move__link type-label">Meet the people <span aria-hidden>→</span></TransitionLink>
              </GridItem>
            </Grid>
          ) : (
            <>
              <DisplayHeading as="h2" size="l" className="measure">The people behind the movement.</DisplayHeading>
              <TransitionLink href="/leadership" label={{ num: "04", title: "LEADERSHIP" }} className="hp-move__link type-label">Meet the people <span aria-hidden>→</span></TransitionLink>
            </>
          )}
        </div>
      </SurfaceSection>

      {/* 5. WHAT WE DO — one project story (or skip) */}
      {firstProject && (
        <SurfaceSection surface="ivory" index="02" title="PROJECTS">
          <div className="hp-move">
            <DisplayHeading as="h2" size="l">{firstProject.name}</DisplayHeading>
            {firstProject.results && <p className="type-body-m measure" style={{ marginTop: "var(--space-3)" }}>{firstProject.results}</p>}
            <TransitionLink href="/projects" label={{ num: "02", title: "PROJECTS" }} className="hp-move__link type-label">See the work <span aria-hidden>→</span></TransitionLink>
          </div>
        </SurfaceSection>
      )}

      {/* 6. WHAT WE HAVE BUILT — one impact beat (only if confirmed) */}
      {firstStat && (
        <SurfaceSection surface="ink" index="06" title="THE NUMBERS">
          <div className="hp-move">
            <p className="im-beat__figure type-numeral"><Counter value={firstStat.value} display={firstStat.display} suffix={firstStat.suffix} /></p>
            <p className="type-label" style={{ color: "var(--ivory)", marginTop: "var(--space-3)" }}>{firstStat.descriptor}</p>
            <TransitionLink href="/impact" label={{ num: "06", title: "IMPACT" }} className="hp-move__link type-label">See the impact <span aria-hidden>→</span></TransitionLink>
          </div>
        </SurfaceSection>
      )}

      {/* 7. WHAT WE KNOW — featured publication + news secondary column */}
      <SurfaceSection surface="ivory" index="05" title="THE KNOWLEDGE HUB">
        <div className="hp-move">
          <Grid rowGap="var(--space-6)">
            <GridItem span={7} spanMd={8} spanSm={4}>
              {featured ? (
                <>
                  <p className="pub-featured__cat type-label">Featured</p>
                  <DisplayHeading as="h2" size="l" style={{ marginTop: "var(--space-3)" }}>{featured.title}</DisplayHeading>
                  <TransitionLink href="/publications" label={{ num: "05", title: "PUBLICATIONS" }} className="hp-move__link type-label">Read the hub <span aria-hidden>→</span></TransitionLink>
                </>
              ) : (
                <>
                  <DisplayHeading as="h2" size="l">A register of legal and leadership thought.</DisplayHeading>
                  <p className="type-body-m" style={{ color: "var(--stone-600)", marginTop: "var(--space-3)" }}>Articles, reports and opinion will be published here.</p>
                  <TransitionLink href="/publications" label={{ num: "05", title: "PUBLICATIONS" }} className="hp-move__link type-label">Visit the hub <span aria-hidden>→</span></TransitionLink>
                </>
              )}
            </GridItem>
            <GridItem span={4} start={9} spanMd={8} startMd={1} spanSm={4}>
              <p className="type-label" style={{ color: "var(--stone-600)" }}>Latest updates</p>
              {news.length > 0 ? (
                <div className="hp-news">
                  {news.map((n) => (
                    <TransitionLink key={n.slug} href={`/news/${n.slug}`} label={{ num: "02", title: n.title.toUpperCase() }} className="hp-news__row">
                      <span className="type-label tnum" style={{ color: "var(--stone-600)" }}>{fmtDate(n.date)}</span>
                      <span className="type-body-m">{n.title}</span>
                    </TransitionLink>
                  ))}
                </div>
              ) : (
                <p className="type-body-s" style={{ color: "var(--stone-600)", marginTop: "var(--space-3)" }}>Updates from the zone will appear here.</p>
              )}
            </GridItem>
          </Grid>
        </div>
      </SurfaceSection>

      {/* WHAT COMES NEXT → closes into the colophon (contact = invitation) */}
      <Colophon />
    </>
  );
}
