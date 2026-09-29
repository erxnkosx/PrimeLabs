import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { graph, webPage, breadcrumbs, servicesList } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/diensten/Hero";
import { ServiceRows } from "@/components/sections/diensten/ServiceRows";
import { Scope } from "@/components/sections/diensten/Scope";
import { Cta } from "@/components/sections/diensten/Cta";

const title = "Diensten — Primelabs Drone Inspecties";
const description =
  "Drie kerndiensten voor technische dossiers: visuele dak- en gevelinspecties met standaard inspectierapport, periodieke werfopvolging met nulmeting, en fotogrammetrie en 3D-modellering met orthofoto’s, puntenwolken en volumemetingen.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.diensten,
  image: "/og/diensten.jpg",
  imageAlt: "Primelabs Drone Inspecties — diensten",
});

const structuredData = graph(
  webPage({ path: routes.diensten, name: title, description }),
  breadcrumbs([
    { name: "Home", path: routes.home },
    { name: "Diensten", path: routes.diensten },
  ]),
  servicesList(),
);

export default function DienstenPage() {
  return (
    <>
      <PageShell preloaderLabel="Diensten laden" current="diensten" scripts="diensten">
        <Hero />
        <ServiceRows />
        <Scope />
        <Cta />
      </PageShell>
      <JsonLd data={structuredData} />
    </>
  );
}
