import type { Metadata } from "next";
import { getEvents } from "@/content";
import { fmtDate, isFuture } from "@/lib/date";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MaskImage } from "@/components/chrome/MaskImage";
import { EmptyState } from "@/components/chrome/EmptyState";
import { TransitionLink } from "@/components/motion/TransitionLink";

export const metadata: Metadata = {
  title: "Events — LAWSAN South South",
  description: "Upcoming and past events of the South South Zone.",
};

export default function EventsPage() {
  const events = getEvents();
  const upcoming = events.filter((e) => isFuture(e.date));
  const past = events.filter((e) => !isFuture(e.date));

  return (
    <SurfaceSection surface="ivory" index="02" title="EVENTS" labelledById="events-title">
      <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="events-title" size="xl">Events.</DisplayHeading>

        {events.length === 0 ? (
          <EmptyState headline="No events currently scheduled.">Events — [NEEDS CONTENT].</EmptyState>
        ) : (
          <>
            {/* Upcoming — horizontal DRAG strip */}
            <section aria-label="Upcoming events" style={{ marginTop: "var(--space-7)" }}>
              <p className="type-label" style={{ color: "var(--stone-600)" }}>Upcoming</p>
              {upcoming.length === 0 ? (
                <p className="type-body-m" style={{ color: "var(--stone-600)", marginTop: "var(--space-3)" }}>No events currently scheduled.</p>
              ) : (
                <div className="pg-strip" data-cursor="drag" style={{ marginTop: "var(--space-4)" }}>
                  {upcoming.map((e) => (
                    <article className="pg-strip__item" key={e.slug}>
                      {e.images[0] ? (
                        <MaskImage src={e.images[0].src} alt={e.images[0].alt} ratio="3 / 2" sizes="34vw" />
                      ) : (
                        <div style={{ aspectRatio: "3 / 2", background: "var(--ink-800)" }} />
                      )}
                      <TransitionLink href={`/events/${e.slug}`} label={{ num: "02", title: e.title.toUpperCase() }} className="type-display-m" style={{ display: "block", color: "var(--ink)", textDecoration: "none", marginTop: "var(--space-3)" }}>{e.title}</TransitionLink>
                      <p className="type-label" style={{ color: "var(--stone-600)", marginTop: "var(--space-2)" }}>{fmtDate(e.date)}{e.location ? ` · ${e.location}` : ""}</p>
                      {e.registrationUrl && <a className="pg-register-link type-label" href={e.registrationUrl} target="_blank" rel="noreferrer noopener">Register ↗</a>}
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Past — vertical ledger */}
            {past.length > 0 && (
              <section aria-label="Past events" style={{ marginTop: "var(--space-9)" }}>
                <p className="type-label" style={{ color: "var(--stone-600)" }}>Past</p>
                <ul className="pg-ledger">
                  {past.map((e) => (
                    <li key={e.slug}>
                      <TransitionLink href={`/events/${e.slug}`} label={{ num: "02", title: e.title.toUpperCase() }} className="pg-ledger__row">
                        <span className="pg-ledger__date type-label tnum">{fmtDate(e.date)}</span>
                        <span className="type-display-m">{e.title}</span>
                        {e.location && <span className="pg-ledger__meta type-label">{e.location}</span>}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </SurfaceSection>
  );
}
