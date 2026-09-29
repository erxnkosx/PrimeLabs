import type { NavKey } from "@/config/site";
import { PageScripts, type ScriptBundle } from "@/components/scripts/PageScripts";
import { Preloader } from "./Preloader";
import { PreloaderFallback } from "./PreloaderFallback";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type Props = {
  /** Tekst onder de laadbalk, bv. "Diensten laden". */
  preloaderLabel: string;
  current?: NavKey;
  ctaHref?: string;
  /** Welke interactiescripts deze pagina laadt (zie PageScripts). */
  scripts: ScriptBundle;
  /** Elementen na <main>, vóór de footer (bv. de <dialog>'s van de cases). */
  afterMain?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Vaste opbouw van elke sitepagina, in exact dezelfde volgorde als de oorspronkelijke
 * HTML: laaddoek → scrollbalk → skiplink → navigatie → mobiel menu → main → footer.
 */
export function PageShell({ preloaderLabel, current, ctaHref, scripts, afterMain, children }: Props) {
  return (
    <>
      <PreloaderFallback />
      <Preloader label={preloaderLabel} />
      <div className="progress" aria-hidden="true" />
      <a className="skip" href="#main">
        Naar hoofdinhoud
      </a>
      <SiteHeader current={current} ctaHref={ctaHref} />
      <main id="main">{children}</main>
      {afterMain}
      <SiteFooter />
      <PageScripts bundle={scripts} />
    </>
  );
}
