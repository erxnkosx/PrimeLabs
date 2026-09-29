import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { cases, routes } from "@/config/site";
import { graph, webPage, breadcrumbs } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/case-dakinspectie/Hero";
import { Summary } from "@/components/sections/case-dakinspectie/Summary";
import { Brief } from "@/components/sections/case-dakinspectie/Brief";
import { Inspection } from "@/components/sections/case-dakinspectie/Inspection";
import { RoofPlan } from "@/components/sections/case-dakinspectie/RoofPlan";
import { Workflow } from "@/components/sections/case-dakinspectie/Workflow";
import { Report } from "@/components/sections/case-dakinspectie/Report";
import { Scope } from "@/components/sections/case-dakinspectie/Scope";
import { Privacy } from "@/components/sections/case-dakinspectie/Privacy";
import { FinalCta } from "@/components/sections/case-dakinspectie/FinalCta";
import { Dialogs } from "@/components/sections/case-dakinspectie/Dialogs";

const title = "Case 01 · Speculoosfabriek in Puurs — Primelabs";
const description =
  "Visuele drone-inspectie van 4.200 m² dakbedekking en PV-installatie aan een productiesite in Puurs: dakoverzicht, genummerde observaties en een technisch inspectierapport.";
const caseInfo = cases.dakinspectie;

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.caseDakinspectie,
  image: "/og/case-dakinspectie.jpg",
  imageAlt: caseInfo.imageAlt,
  type: "article",
  // Conceptpreview tot er toestemming is: zie `published` in src/config/site.ts
  noindex: !caseInfo.published,
});

const structuredData = graph(
  webPage({
    path: routes.caseDakinspectie,
    name: title,
    description,
    image: caseInfo.image,
  }),
  breadcrumbs([
    { name: "Home", path: routes.home },
    { name: "Portfolio", path: routes.portfolio },
    {
      name: "Case 01 · Speculoosfabriek in Puurs",
      path: routes.caseDakinspectie,
    },
  ]),
);

export default function CaseDakinspectiePage() {
  return (
    <>
      <PageShell
        preloaderLabel="Case laden"
        current="portfolio"
        scripts="case-inspectie"
        afterMain={<Dialogs />}
      >
        {!caseInfo.published}
        <Hero />
        <Summary />
        <Brief />
        <Inspection />
        <RoofPlan />
        <Workflow />
        <Report />
        <Scope />
        <Privacy />
        <FinalCta />
      </PageShell>
      <JsonLd data={structuredData} />
    </>
  );
}
