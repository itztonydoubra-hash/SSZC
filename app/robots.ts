import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://itztonydoubra-hash.github.io/SSZC/sitemap.xml",
  };
}
