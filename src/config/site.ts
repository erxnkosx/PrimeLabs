/**
 * Centrale configuratie van de site: bedrijfsgegevens, routes, navigatie en cases.
 * Alles wat SEO-metadata, de sitemap, structured data en de navigatie nodig heeft,
 * komt hiervandaan — pas het hier aan, niet in de componenten.
 */

/** Productie-URL zonder slash op het einde. Zet NEXT_PUBLIC_SITE_URL in Vercel/.env. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://primelabs.be").replace(/\/+$/, "");

export const company = {
  name: "Primelabs Drone Inspecties",
  shortName: "Primelabs",
  legalName: "Primelabs",
  slogan: "Professionele drone-inspecties. Helder vastgelegd.",
  description:
    "Visuele drone-inspecties voor daken, gevels, werven en infrastructuur in België. Gerichte beelden, genummerde aandachtspunten en een overzichtelijk PDF-inspectierapport.",
  email: "info@primelabs.be",
  phone: "+32478261704",
  phoneDisplay: "+32 478 26 17 04",
  vatId: "BE1017602056",
  address: {
    street: "Buisstraat 13/B",
    postalCode: "2890",
    locality: "Puurs-Sint-Amands",
    region: "Antwerpen",
    country: "BE",
  },
  areaServed: "België",
  locale: "nl_BE",
  language: "nl-BE",
  themeColor: "#3a078a",
} as const;

export const routes = {
  home: "/",
  diensten: "/diensten",
  werkwijze: "/werkwijze",
  portfolio: "/portfolio",
  offerte: "/offerte",
  caseDakinspectie: "/portfolio/dakinspectie-speculoosfabriek-puurs",
  caseWerfopvolging: "/portfolio/werfopvolging-sloopwerf",
  caseWoning3d: "/portfolio/3d-model-woning",
  prototype: "/prototype",
  prototypeDiensten: "/prototype/diensten",
} as const;

export type NavKey = "diensten" | "werkwijze" | "portfolio" | "offerte";

export const mainNav: { key: NavKey; label: string; href: string }[] = [
  { key: "diensten", label: "Diensten", href: routes.diensten },
  { key: "werkwijze", label: "Werkwijze", href: routes.werkwijze },
  { key: "portfolio", label: "Portfolio", href: routes.portfolio },
  { key: "offerte", label: "Offerte aanvragen", href: routes.offerte },
];

/** De drie hoofddiensten (zelfde nummering als /diensten#d1–#d3 en /portfolio#dienst-01–03). */
export const services = [
  {
    id: "d1",
    name: "Visuele dak- en gevelinspecties",
    description:
      "Veilige, gedetailleerde inspectie van de volledige gebouwschil zonder stellingen of hoogtewerkers, inclusief technisch inspectierapport (PDF) met genummerde aandachtspunten.",
  },
  {
    id: "d2",
    name: "Periodieke werfopvolging",
    description:
      "Nulmeting en periodieke opnames vanuit identieke GPS-standpunten: een objectieve visuele tijdlijn van voortgang, planning en werflogistiek.",
  },
  {
    id: "d3",
    name: "Fotogrammetrie & 3D-modellering",
    description:
      "Gegeorefereerde 3D-modellen, puntenwolken en orthofoto’s op schaal voor CAD, BIM en GIS, plus volumemetingen en terreinmodellen.",
  },
] as const;

/**
 * Cases. `published: false` = interne conceptpreview: de pagina is bereikbaar, maar
 * krijgt `noindex`, staat niet in de sitemap en toont de conceptbalk bovenaan.
 * Zet op `true` zodra de opdrachtgever/eigenaar schriftelijk toestemming gaf.
 */
export const cases = {
  dakinspectie: {
    path: routes.caseDakinspectie,
    published: false,
    image: "/assets/img/speculoos-case/dak-overzicht.webp",
    imageAlt: "Bovenaanzicht van het productiedak met zonnepanelen en lichtstraten",
  },
  werfopvolging: {
    path: routes.caseWerfopvolging,
    published: false,
    image: "/assets/img/werf-case/dag1-overzicht-1200.webp",
    imageAlt: "Luchtopname van een sloopwerf",
  },
  woning3d: {
    path: routes.caseWoning3d,
    published: false,
    image: "/assets/img/woning-case/model-poster.webp",
    imageAlt: "Render van het 3D-model van een woning met platte daken",
  },
} as const;

/** Datum van de laatste inhoudelijke wijziging per pagina (voor de sitemap). */
export const lastModified = new Date("2026-09-29");
