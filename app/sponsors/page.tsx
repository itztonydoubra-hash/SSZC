import type { Metadata } from "next";
import Image from "next/image";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { assetPath } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Sponsors — LAWSAN South South",
  description:
    "Patrons and sponsors of the Law Students' Association of Nigeria, South South Zone.",
};

const SPONSORS = [
  {
    name: "Rt. Hon. Peter Odey",
    office: "Deputy Governor of Cross River State",
    image: "/media/general/sponsor-peter-odey.jpeg.jpeg",
    alt: "Rt. Hon. Peter Odey, Deputy Governor of Cross River State",
  },
  {
    name: "Hon. Justice Akon Bassey Ikpeme",
    office: "Honourable Chief Judge of Cross River State",
    image: "/media/general/sponsor-akon-bassey-ikpeme.jpeg.jpeg",
    alt: "Hon. Justice Akon Bassey Ikpeme, Honourable Chief Judge of Cross River State",
  },
  {
    name: "His Eminence, Edidem Ekpo Okon Abasi Otu (V)",
    office: "The Obong of Calabar",
    image: "/media/general/sponsor-obong-of-calabar.jpeg.jpeg",
    alt: "His Eminence, Edidem Ekpo Okon Abasi Otu V, The Obong of Calabar",
  },
  {
    name: "Orok Bassey Okon, Esq.",
    office: "Head of Civil Service Commission, Cross River State",
    image: "/media/general/sponsor-orok-bassey-okon.jpeg.jpeg",
    alt: "Orok Bassey Okon, Esq., Head of Civil Service Commission, Cross River State",
  },
  {
    name: "Hon. Justice Eunice Dada",
    office: "Judge of the Customary Court of Appeal, Cross River State, Calabar",
    image: "/media/general/sponsor-eunice-dada.jpeg.jpeg",
    alt: "Hon. Justice Eunice Dada, Judge of the Customary Court of Appeal, Cross River State",
  },
];

export default function SponsorsPage() {
  return (
    <SurfaceSection surface="ivory" index="04" title="SPONSORS" labelledById="sponsors-title">
      <div style={{ paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="sponsors-title" size="xl">
          Our patrons.
        </DisplayHeading>
        <p className="type-body-l measure" style={{ color: "var(--stone-600)", marginTop: "var(--space-5)" }}>
          We are grateful to the distinguished individuals who have supported and championed the
          South South Zone.
        </p>

        <div className="sponsors-grid" style={{ marginTop: "var(--space-8)" }}>
          {SPONSORS.map((sponsor) => (
            <article className="sponsor-card" key={sponsor.name}>
              <div className="sponsor-card__portrait">
                <Image
                  src={assetPath(sponsor.image)}
                  alt={sponsor.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div className="sponsor-card__body">
                <p className="sponsor-card__name type-display-m">{sponsor.name}</p>
                <p className="sponsor-card__office type-label" style={{ color: "var(--stone-600)" }}>
                  {sponsor.office}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SurfaceSection>
  );
}
