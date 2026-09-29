import type { MetadataRoute } from "next";
import { routes, SITE_URL } from "@/config/site";
export const dynamic = "force-static";
/** /robots.txt — alles toegestaan behalve de interne testpagina's. */
export default function robots(): MetadataRoute.Robots {
  // Preview-deploys (Vercel) nooit laten indexeren: enkel productie is indexeerbaar.
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: [`${routes.prototype}`, "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
