import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/structured-data";

/** Alle echte sitepagina's: organisatie/onderneming/website als structured data. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={siteGraph()} />
    </>
  );
}
