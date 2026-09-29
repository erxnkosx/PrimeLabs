import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { graph, webPage, breadcrumbs } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { RequestHero } from "@/components/sections/offerte/RequestHero";
import { AfterRequest } from "@/components/sections/offerte/AfterRequest";

const title = "Offerte voor een drone-inspectie aanvragen | Primelabs";
const description =
  "Vraag een drone-inspectie aan: bezorg het adres, het doel en de gewenste timing. U ontvangt een gerichte reactie met de juiste aanpak en een transparant voorstel.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.offerte,
  image: "/og/offerte.jpg",
  imageAlt: "Primelabs Drone Inspecties — offerte aanvragen",
});

const structuredData = graph(
  webPage({
    path: routes.offerte,
    name: title,
    description,
    type: "ContactPage",
  }),
  breadcrumbs([
    { name: "Home", path: routes.home },
    { name: "Offerte aanvragen", path: routes.offerte },
  ]),
);

export default function OffertePage() {
  return (
    <>
      <PageShell
        preloaderLabel="Aanvraagformulier laden"
        current="offerte"
        ctaHref={"#aanvraag"}
        scripts="scene"
      >
        <RequestHero />
        <AfterRequest />
      </PageShell>
      <JsonLd data={structuredData} />
    </>
  );
}
