/*
 * PartnersSection (design.md C11) — optional, restrained logo row. Renders
 * NOTHING when no partners are supplied (section omitted entirely). Reused where
 * partners appear (e.g. homepage / about). Monochrome logos, external links.
 */
import Image from "next/image";
import { getPartners } from "@/content";
import { SurfaceSection } from "./SurfaceSection";
import { DisplayHeading } from "./DisplayHeading";

export function PartnersSection() {
  const partners = getPartners();
  if (partners.length === 0) return null; // omitted entirely (C11)

  return (
    <SurfaceSection surface="ivory" index="08" title="PARTNERS">
      <div style={{ paddingBlock: "var(--space-8)" }}>
        <DisplayHeading as="h2" size="l">In collaboration with.</DisplayHeading>
        <div className="pg-partners">
          {partners.map((p) => {
            const logo = (
              <Image className="pg-partners__logo" src={p.logo.src} alt={p.name} width={120} height={48} style={{ height: "48px", width: "auto" }} />
            );
            return p.url ? (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer noopener" aria-label={p.name}>{logo}</a>
            ) : (
              <span key={p.name}>{logo}</span>
            );
          })}
        </div>
      </div>
    </SurfaceSection>
  );
}
