import { mainNav, routes, type NavKey } from "@/config/site";

type Props = {
  /** Actieve pagina in de hoofdnavigatie (krijgt .active + aria-current). */
  current?: NavKey;
  /** Doel van de knop "Plan een inspectie" (op /offerte springt hij naar het formulier). */
  ctaHref?: string;
};

/**
 * Vaste navigatiebalk + mobiel menu. Bewust gewone <a>-links (geen next/link): de
 * interacties in src/scripts (intro, reveals, 3D-scènes) zijn gebouwd voor een volledige
 * paginalading, net als op de oorspronkelijke statische site.
 */
export function SiteHeader({ current, ctaHref = routes.offerte }: Props) {
  return (
    <>
      <header className="nav">
        <div className="nav__in">
          <a className="brand" href={routes.home} aria-label="Primelabs Drone Inspecties, home">
            <img
              className="logo"
              src="/assets/img/primelabs-logo.webp"
              width="2000"
              height="604"
              alt="Primelabs Drone Inspecties"
            />
          </a>
          <nav className="nav__links" aria-label="Hoofdnavigatie">
            {mainNav.map((item) =>
              item.key === current ? (
                <a key={item.key} href={item.href} className="active" aria-current="page">
                  {item.label}
                </a>
              ) : (
                <a key={item.key} href={item.href}>
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <a className="nav__cta" href={ctaHref}>
            Plan een inspectie{" "}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
          <button className="burger" aria-label="Menu" aria-expanded="false">
            <span />
          </button>
        </div>
      </header>
      <div className="mob">
        {mainNav.map((item) => (
          <a key={item.key} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
