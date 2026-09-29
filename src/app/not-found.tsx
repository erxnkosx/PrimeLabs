import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { mainNav, routes } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "Pagina niet gevonden — Primelabs Drone Inspecties" },
  robots: { index: false, follow: true },
};

/**
 * 404 — gebouwd met de bestaande hero-/knopklassen voor dezelfde look, en Tailwind
 * voor de nieuwe opmaak (voorbeeld van hoe je nieuw werk op het designsysteem zet).
 */
export default function NotFound() {
  return (
    <PageShell preloaderLabel="Pagina laden" scripts="basic">
      <section className="hero hero--page">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="wrap">
          <span className="eyebrow">Fout 404</span>
          <h1 className="max-w-[18ch]">Deze pagina bestaat niet (meer).</h1>
          <p className="hero__sub mt-6 max-w-[56ch]">
            Misschien is de link verouderd of werd de pagina verplaatst. Kies hieronder waar u heen wilt, of
            vraag meteen een inspectie aan.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a className="btn btn--p" href={routes.offerte}>
              Inspectie aanvragen
            </a>
            <a className="tlink" href={routes.home}>
              Naar de homepagina
            </a>
          </div>
          <ul className="mt-12 flex flex-wrap gap-3">
            {mainNav.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="inline-flex rounded-card-sm border border-line bg-surface-soft px-4 py-2 font-display text-sm font-semibold text-ink-2 transition-colors duration-300 ease-brand hover:border-brand-4 hover:text-brand"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
