import type { MetadataRoute } from "next";
import { cases, lastModified, routes, SITE_URL } from "@/config/site";
export const dynamic = "force-static";
/**
 * /sitemap.xml — alleen indexeerbare pagina's. Cases verschijnen pas wanneer
 * `published: true` staat in src/config/site.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
  const entry = (path: string, priority: number, image?: string): MetadataRoute.Sitemap[number] => ({
    url: url(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
    ...(image ? { images: [url(image)] } : {}),
  });

  const pages: MetadataRoute.Sitemap = [
    entry(routes.home, 1, "/assets/img/broox-hero-1500.webp"),
    entry(routes.diensten, 0.9),
    entry(routes.werkwijze, 0.8),
    entry(routes.portfolio, 0.8),
    entry(routes.offerte, 0.9),
  ];

  const casePages = Object.values(cases)
    .filter((c) => c.published)
    .map((c) => entry(c.path, 0.7, c.image));

  return [...pages, ...casePages];
}
