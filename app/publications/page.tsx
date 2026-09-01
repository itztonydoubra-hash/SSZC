import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublications } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { PublicationsIndex } from "@/components/publications/PublicationsIndex";

export const metadata: Metadata = {
  title: "Publications — LAWSAN South South",
  description:
    "The Knowledge Hub: a register of legal and leadership thought from the South South Zone of the Law Students' Association of Nigeria.",
};

export default function PublicationsPage() {
  const data = getPublications();
  return (
    <SurfaceSection surface="ivory" index="05" title="THE KNOWLEDGE HUB">
      <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)" }}>
        <Suspense fallback={null}>
          <PublicationsIndex data={data} />
        </Suspense>
      </div>
    </SurfaceSection>
  );
}
