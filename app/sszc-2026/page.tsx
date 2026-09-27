import type { Metadata } from "next";
import Image from "next/image";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { assetPath } from "@/lib/asset";

export const metadata: Metadata = {
  title: "SSZC 2026 — LAWSAN South South",
  description:
    "Photographs and highlights from the South South Zonal Convention 2026.",
};

const EVENTS = [
  {
    title: "Day 1",
    description: "Opening day of the South South Zonal Convention 2026.",
    image: "/media/general/sszc2026-day-one.jpeg.jpeg",
    alt: "Day 1 of the South South Zonal Convention 2026",
    link: "https://jossyphotos96.pixieset.com/sszc26day1updated/",
  },
  {
    title: "Cultural Night",
    description: "A vibrant celebration of the cultures of the South South Zone.",
    image: "/media/general/sszc2026-cultural-night.jpeg.jpeg",
    alt: "Cultural Night at the South South Zonal Convention 2026",
    link: "https://jossyphotos.pixieset.com/culturalnight/",
  },
  {
    title: "Dinner",
    description: "The official dinner of the South South Zonal Convention 2026.",
    image: "/media/general/sszc2026-dinner.jpeg.jpeg",
    alt: "Dinner at the South South Zonal Convention 2026",
    link: "https://jossyphotos.pixieset.com/sszc26dinner/",
  },
  {
    title: "Games Fest",
    description: "Fun, fellowship and friendly competition at the Games Festival.",
    image: "/media/general/sszc2026-games-fest.jpeg.jpeg",
    alt: "Games Fest at the South South Zonal Convention 2026",
    link: "https://jossyphotos96.pixieset.com/sszc26gamesv/",
  },
  {
    title: "Moot and Mock",
    description: "Showcasing legal brilliance at the Moot and Mock Competition.",
    image: "/media/general/sszc2026-moot-and-mock.jpeg.jpeg",
    alt: "Moot and Mock Competition at the South South Zonal Convention 2026",
    link: "https://jossyphotos96.pixieset.com/sszc25mootandmock/",
  },
  {
    title: "Gospel Night",
    description: "A night of worship and praise at the South South Zonal Convention 2026.",
    image: "/media/general/sszc2026-gospel-night.jpeg.jpeg",
    alt: "Gospel Night at the South South Zonal Convention 2026",
    link: "https://jossyphotos96.pixieset.com/gospelnight/",
  },
];

export default function SSZC2026Page() {
  return (
    <SurfaceSection surface="ink" index="02" title="SSZC 2026" labelledById="sszc2026-title">
      <div style={{ paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="sszc2026-title" size="xl">
          The convention.
        </DisplayHeading>
        <p className="type-body-l measure" style={{ color: "var(--stone)", marginTop: "var(--space-5)" }}>
          South South Zonal Convention 2026 — in pictures.
        </p>

        <div className="sszc2026-grid" style={{ marginTop: "var(--space-8)" }}>
          {EVENTS.map((event) => (
            <article className="sszc2026-event" key={event.title}>
              <div className="sszc2026-event__image">
                <Image
                  src={assetPath(event.image)}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="sszc2026-event__body">
                <h2 className="sszc2026-event__title type-display-m">{event.title}</h2>
                <p className="sszc2026-event__desc type-body-m">{event.description}</p>
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sszc2026-event__link type-label"
                >
                  View full gallery ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SurfaceSection>
  );
}
