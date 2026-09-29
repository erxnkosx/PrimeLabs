import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { graph, webPage, breadcrumbs } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/portfolio/Hero";
import { CasesByService } from "@/components/sections/portfolio/CasesByService";
import { CasePreview } from "@/components/sections/portfolio/CasePreview";
import { ReferencePolicy } from "@/components/sections/portfolio/ReferencePolicy";
import { Cta } from "@/components/sections/portfolio/Cta";

const title = "Portfolio — Primelabs Drone Inspecties";
const description =
  "Portfolio van Primelabs Drone Inspecties, gesorteerd per dienst: dak- en gevelinspecties, periodieke werfopvolging en fotogrammetrie & 3D-modellering. Geen stockbeelden; publicatie enkel met toestemming.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.portfolio,
  image: "/og/portfolio.jpg",
  imageAlt: "Primelabs Drone Inspecties — portfolio",
});

const structuredData = graph(
  webPage({
    path: routes.portfolio,
    name: title,
    description,
    type: "CollectionPage",
  }),
  breadcrumbs([
    { name: "Home", path: routes.home },
    { name: "Portfolio", path: routes.portfolio },
  ]),
);

export default function PortfolioPage() {
  return (
    <>
      <PageShell preloaderLabel="Portfolio laden" current="portfolio" scripts="scene">
        <Hero />
        <CasesByService />
        <CasePreview />
        <ReferencePolicy />
        <Cta />
      </PageShell>
      <JsonLd data={structuredData} />
    </>
  );
}
