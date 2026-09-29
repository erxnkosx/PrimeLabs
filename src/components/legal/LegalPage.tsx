/**
 * Opbouw van de juridische pagina's (privacybeleid, bedrijfsgegevens): dezelfde hero als de
 * andere subpagina's, een inhoudstafel die meeschuift en de tekst in leesbare breedte.
 * Opmaak in src/styles/site-extra.css (.legal*).
 */
type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
};

export function LegalPage({ eyebrow, title, intro, updated, toc, children }: Props) {
  return (
    <>
      <section className="hero hero--page" style={{ paddingBottom: "0" }}>
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="wrap">
          <span className="eyebrow">{eyebrow}</span>
          <h1 data-split="" style={{ maxWidth: "20ch" }}>
            {title}
          </h1>
          <p className="hero__sub rv" data-d="240" style={{ maxWidth: "60ch", marginTop: "28px" }}>
            {intro}
          </p>
          <p className="legal__meta">Laatst bijgewerkt: {updated}</p>
        </div>
      </section>
      <section className="legal">
        <div className="wrap legal__in">
          <nav className="legal__toc" aria-label="Inhoud">
            <p className="legal__toc-t">Inhoud</p>
            <ol>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.label}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="legal__body">{children}</div>
        </div>
      </section>
    </>
  );
}
