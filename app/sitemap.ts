import type { MetadataRoute } from "next";
import {
  getEvents, getNews, getProjects, getPublications, getLeadership,
} from "@/content";

const BASE = "https://itztonydoubra-hash.github.io/SSZC"; // placeholder until domain set

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/about", "/leadership", "/chapters", "/projects", "/events",
    "/news", "/publications", "/impact", "/media", "/archive",
    "/opportunities", "/contact",
  ].map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() }));

  const dynamic = [
    ...getPublications().items.map((i) => `/publications/${i.slug}`),
    ...getProjects().map((p) => `/projects/${p.slug}`),
    ...getEvents().map((e) => `/events/${e.slug}`),
    ...getNews().map((n) => `/news/${n.slug}`),
    ...getLeadership().zonal.filter((e) => e.slug && (e.bio || e.socials?.length)).map((e) => `/leadership/${e.slug}`),
  ].map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() }));

  return [...staticRoutes, ...dynamic];
}
