import type { Metadata } from "next";
import "@/styles/legacy/case-werf.css";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { cases, routes } from "@/config/site";
import { graph, webPage, breadcrumbs } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/case-werfopvolging/Hero";
import { Summary } from "@/components/sections/case-werfopvolging/Summary";
import { Approach } from "@/components/sections/case-werfopvolging/Approach";
import { Timeline } from "@/components/sections/case-werfopvolging/Timeline";
import { Video } from "@/components/sections/case-werfopvolging/Video";
import { Workflow } from "@/components/sections/case-werfopvolging/Workflow";
import { Scope } from "@/components/sections/case-werfopvolging/Scope";
import { Privacy } from "@/components/sections/case-werfopvolging/Privacy";
import { FinalCta } from "@/components/sections/case-werfopvolging/FinalCta";
import { Dialogs } from "@/components/sections/case-werfopvolging/Dialogs";

const title = "Case 02 · Een sloopwerf, dag na dag — Primelabs";
const description =
  "Conceptcase periodieke werfopvolging: een sloopwerf op twee opnamedagen, met een 48 MP-overzicht vanuit de lucht en 4K-videobeelden van de afbraak.";
const caseInfo = cases.werfopvolging;

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.caseWerfopvolging,
  image: "/og/case-werfopvolging.jpg",
  imageAlt: caseInfo.imageAlt,
  type: "article",
  // Conceptpreview tot er toestemming is: zie `published` in src/config/site.ts
  noindex: !caseInfo.published,
});

const structuredData = graph(
  webPage({
    path: routes.caseWerfopvolging,
    name: title,
    description,
    image: caseInfo.image,
  }),
  breadcrumbs([
    { name: "Home", path: routes.home },
    { name: "Portfolio", path: routes.portfolio },
    {
      name: "Case 02 · Een sloopwerf, dag na dag",
      path: routes.caseWerfopvolging,
    },
  ]),
);

export default function CaseWerfopvolgingPage() {
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
        <Approach />
        <Timeline />
        <Video />
        <Workflow />
        <Scope />
        <Privacy />
        <FinalCta />
      </PageShell>
      <JsonLd data={structuredData} />
    </>
  );
}
