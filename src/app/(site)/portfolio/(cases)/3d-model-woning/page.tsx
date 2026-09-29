import type { Metadata } from "next";
import "@/styles/legacy/case-woning.css";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { cases, routes } from "@/config/site";
import { graph, webPage, breadcrumbs } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { DraftBar } from "@/components/sections/case-woning-3d/DraftBar";
import { Hero } from "@/components/sections/case-woning-3d/Hero";
import { Summary } from "@/components/sections/case-woning-3d/Summary";
import { Approach } from "@/components/sections/case-woning-3d/Approach";
import { Model } from "@/components/sections/case-woning-3d/Model";
import { Photos } from "@/components/sections/case-woning-3d/Photos";
import { Workflow } from "@/components/sections/case-woning-3d/Workflow";
import { Scope } from "@/components/sections/case-woning-3d/Scope";
import { Privacy } from "@/components/sections/case-woning-3d/Privacy";
import { FinalCta } from "@/components/sections/case-woning-3d/FinalCta";
import { Dialogs } from "@/components/sections/case-woning-3d/Dialogs";

const title = "Case 03 · Woning met platte daken in 3D — Primelabs";
const description =
  "Conceptcase fotogrammetrie en 3D-modellering: een woning met platte daken, vastgelegd met 80 dronebeelden en omgezet in een interactief 3D-model dat in de browser draait.";
const caseInfo = cases.woning3d;

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.caseWoning3d,
  image: "/og/case-woning-3d.jpg",
  imageAlt: caseInfo.imageAlt,
  type: "article",
  // Conceptpreview tot er toestemming is: zie `published` in src/config/site.ts
  noindex: !caseInfo.published,
});

const structuredData = graph(
  webPage({
    path: routes.caseWoning3d,
    name: title,
    description,
    image: caseInfo.image,
  }),
  breadcrumbs([
    { name: "Home", path: routes.home },
    { name: "Portfolio", path: routes.portfolio },
    {
      name: "Case 03 · Woning met platte daken in 3D",
      path: routes.caseWoning3d,
    },
  ]),
);

export default function CaseWoning3dPage() {
  return (
    <>
      <PageShell
        preloaderLabel="Case laden"
        current="portfolio"
        scripts="case-woning"
        afterMain={<Dialogs />}
      >
        {!caseInfo.published && <DraftBar />}
        <Hero />
        <Summary />
        <Approach />
        <Model />
        <Photos />
        <Workflow />
        <Scope />
        <Privacy />
        <FinalCta />
      </PageShell>
      <JsonLd data={structuredData} />
    </>
  );
}
