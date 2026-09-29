import type {
  BreadcrumbList,
  FAQPage,
  Graph,
  ItemList,
  Organization,
  ProfessionalService,
  WebPage,
  WebSite,
} from "schema-dts";
import { company, routes, services, SITE_URL } from "@/config/site";
import type { FaqItem } from "@/content/faq";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export const ids = {
  organization: `${SITE_URL}/#organisatie`,
  business: `${SITE_URL}/#bedrijf`,
  website: `${SITE_URL}/#website`,
};

/** Organisatie + lokale onderneming + website: staat op elke pagina (via de site-layout). */
export function siteGraph(): Graph {
  const organization: Organization = {
    "@type": "Organization",
    "@id": ids.organization,
    name: company.name,
    alternateName: company.shortName,
    legalName: company.legalName,
    url: abs("/"),
    logo: {
      "@type": "ImageObject",
      url: abs("/icon.png"),
      width: "512",
      height: "512",
    },
    email: company.email,
    telephone: company.phone,
    vatID: company.vatId,
    taxID: company.kbo,
    ...(company.sameAs.length ? { sameAs: company.sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: company.phone,
      email: company.email,
      areaServed: "BE",
      availableLanguage: ["nl"],
    },
  };

  const business: ProfessionalService = {
    "@type": "ProfessionalService",
    "@id": ids.business,
    name: company.name,
    description: company.description,
    url: abs("/"),
    image: abs("/og/home.jpg"),
    logo: abs("/icon.png"),
    email: company.email,
    telephone: company.phone,
    vatID: company.vatId,
    ...(company.sameAs.length ? { sameAs: company.sameAs } : {}),
    parentOrganization: { "@id": ids.organization },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
    areaServed: { "@type": "Country", name: company.areaServed },
    knowsLanguage: "nl",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Drone-inspecties",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          url: abs(`${routes.diensten}#${s.id}`),
        },
      })),
    },
  };

  const website: WebSite = {
    "@type": "WebSite",
    "@id": ids.website,
    url: abs("/"),
    name: company.name,
    inLanguage: company.language,
    publisher: { "@id": ids.organization },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, business, website],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function webPage(opts: {
  path: string;
  name: string;
  description: string;
  image?: string;
  type?: "WebPage" | "ContactPage" | "CollectionPage" | "AboutPage";
}): WebPage {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${abs(opts.path)}#pagina`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: company.language,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.business },
    ...(opts.image ? { primaryImageOfPage: { "@type": "ImageObject", url: abs(opts.image) } } : {}),
  } as WebPage;
}

export function servicesList(): ItemList {
  return {
    "@type": "ItemList",
    name: "Diensten van Primelabs Drone Inspecties",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": abs(`${routes.diensten}#${s.id}`),
        name: s.name,
        description: s.description,
        serviceType: s.name,
        provider: { "@id": ids.business },
        areaServed: { "@type": "Country", name: company.areaServed },
      },
    })),
  };
}

export function faqPage(items: FaqItem[]): FAQPage {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

/** Voegt losse schema's samen tot één @graph. */
export function graph(...nodes: object[]): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": nodes as Graph["@graph"],
  };
}
