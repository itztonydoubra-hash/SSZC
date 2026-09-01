import type { Metadata } from "next";
import { getMedia } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MediaGallery } from "@/components/media/MediaGallery";

export const metadata: Metadata = {
  title: "Media — LAWSAN South South",
  description: "An archive of photographs from the South South Zone.",
};

export default function MediaPage() {
  const items = getMedia();
  return (
    <SurfaceSection surface="ink" index="02" title="MEDIA" labelledById="media-title">
      <div style={{ paddingTop: "calc(var(--space-9) + var(--space-6))", paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="media-title" size="xl">The archive.</DisplayHeading>
        <MediaGallery items={items} />
      </div>
    </SurfaceSection>
  );
}
