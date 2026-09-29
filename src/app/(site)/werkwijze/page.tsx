import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { faq } from "@/content/faq";
import { graph, webPage, breadcrumbs, faqPage } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/werkwijze/Hero";
import { Steps } from "@/components/sections/werkwijze/Steps";
import { Expectations } from "@/components/sections/werkwijze/Expectations";
import { Faq } from "@/components/sections/werkwijze/Faq";
import { Cta } from "@/components/sections/werkwijze/Cta";

const title = "Werkwijze — Primelabs Drone Inspecties";
const description =
  "Van inspectievraag naar helder dossier: scope en voorbereiding, opname op locatie, selectie en rapportage, oplevering en opvolging. Plus wat u mag verwachten en veelgestelde vragen.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.werkwijze,
  image: "/og/werkwijze.jpg",
  imageAlt: "Primelabs Drone Inspecties — werkwijze",
});

const structuredData = graph(
  webPage({ path: routes.werkwijze, name: title, description }),
  breadcrumbs([
    { name: "Home", path: routes.home },
    { name: "Werkwijze", path: routes.werkwijze },
  ]),
  faqPage(faq),
);

export default function WerkwijzePage() {
  return (
    <>
      <PageShell preloaderLabel="Werkwijze laden" current="werkwijze" scripts="scene">
        <Hero />
        <Steps />
        <Expectations />
        <Faq />
        <Cta />
      </PageShell>
      <JsonLd data={structuredData} />
    </>
  );
}
