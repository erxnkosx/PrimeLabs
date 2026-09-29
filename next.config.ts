import type { NextConfig } from "next";

/** Oude .html-adressen van de statische site → nieuwe, nette URL's (301 Moved Permanently). */
const legacyRedirects: [string, string][] = [
  ["/index.html", "/"],
  ["/diensten.html", "/diensten"],
  ["/werkwijze.html", "/werkwijze"],
  ["/portfolio.html", "/portfolio"],
  ["/offerte.html", "/offerte"],
  ["/case-speculoosfabriek.html", "/portfolio/dakinspectie-speculoosfabriek-puurs"],
  ["/case-werf.html", "/portfolio/werfopvolging-sloopwerf"],
  ["/case-woning.html", "/portfolio/3d-model-woning"],
  ["/prototype.html", "/prototype"],
  ["/prototype-diensten.html", "/prototype/diensten"],
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

/*
 * STATIC_EXPORT=1 → statische export naar out/ (Cloudflare Pages). Redirects en headers
 * staan dan in public/_redirects en public/_headers, want next.config kan ze daar niet zetten.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  ...(isStaticExport
    ? { output: "export" as const }
    : {
        async redirects() {
          return legacyRedirects.map(([source, destination]) => ({
            source,
            destination,
            statusCode: 301 as const,
          }));
        },
        async headers() {
          return [
            { source: "/:path*", headers: securityHeaders },
            {
              source: "/assets/:path*",
              headers: [
                { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
              ],
            },
            {
              source: "/og/:path*",
              headers: [
                { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
