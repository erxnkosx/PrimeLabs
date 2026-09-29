import type { Metadata } from "next";
import { company } from "@/config/site";

type PageSeo = {
  /** Volledige <title> (de originele titels zijn al compleet, dus geen template). */
  title: string;
  description: string;
  /** Pad van de pagina, bv. "/diensten". Wordt de canonical URL. */
  path: string;
  /** Open Graph-afbeelding (1200 × 630) uit public/, bv. "/og/diensten.jpg". */
  image: string;
  imageAlt: string;
  /** true = niet indexeren (conceptpagina's, testpagina's). */
  noindex?: boolean;
  type?: "website" | "article";
};

/**
 * Bouwt de metadata van één pagina: title, description, canonical, Open Graph,
 * Twitter/X-kaart en robots. `metadataBase` staat in de root layout, dus relatieve
 * paden worden daar automatisch absolute URL's.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  noindex,
  type = "website",
}: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: { "nl-BE": path, "x-default": path } },
    openGraph: {
      type,
      locale: company.locale,
      siteName: company.name,
      url: path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
