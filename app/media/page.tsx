import type { Metadata } from "next";
import { getMediaAlbums } from "@/content";
import { SurfaceSection } from "@/components/chrome/SurfaceSection";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MediaGallery } from "@/components/media/MediaGallery";

export const metadata: Metadata = {
  title: "Media — LAWSAN South South",
  description: "An archive of photographs from the South South Zone.",
};

export default function MediaPage() {
  const albums = getMediaAlbums();
  return (
    <SurfaceSection surface="ink" index="02" title="MEDIA" labelledById="media-title">
      <div style={{ paddingBottom: "var(--space-9)" }}>
        <DisplayHeading as="h1" id="media-title" size="xl">The archive.</DisplayHeading>
        <MediaGallery albums={albums} />
      </div>
    </SurfaceSection>
  );
}
