import type { Metadata } from "next";
import "@/styles/legacy/hero-scene.css";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { graph, webPage } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/Hero";
import { MarqueeBand } from "@/components/sections/home/MarqueeBand";
import { Services } from "@/components/sections/home/Services";
import { Results } from "@/components/sections/home/Results";
import { Sectors } from "@/components/sections/home/Sectors";
import { Cta } from "@/components/sections/home/Cta";

const title = "Drone-inspecties voor daken, gevels en werven in België | Primelabs";
const description =
  "Visuele drone-inspecties voor daken, gevels, werven en infrastructuur in België. Gerichte beelden, genummerde aandachtspunten en een overzichtelijk PDF-inspectierapport.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.home,
  image: "/og/home.jpg",
  imageAlt:
    "Luchtopname van een gebouw met platte daken en zonnepanelen, met de scanlaag van een inspectiedrone",
});

const structuredData = graph(
  webPage({
    path: routes.home,
    name: title,
    description,
    image: "/assets/img/broox-hero-1500.webp",
  }),
);

export default function HomePage() {
  return (
    <>
      <PageShell preloaderLabel="Inspectiedossier laden" scripts="home">
        <Hero />
        <MarqueeBand />
        <Services />
        <Results />
        <Sectors />
        <Cta />
      </PageShell>
      <JsonLd data={structuredData} />
    </>
  );
}
