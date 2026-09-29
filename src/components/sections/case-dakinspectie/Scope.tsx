export function Scope() {
  return (
    <section className="sec sc-scope">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">Duidelijke grenzen</span>
            <h2 data-split="">
              Helder over wat de
              <br />
              beelden <span className="grad">wel en niet tonen.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de beeldscope">
            <span className="sc-section-note__meta">
              <b>05</b>DE AFBAKENING
            </span>
            <p>
              De website legt uit wat zichtbaar is op de dronebeelden. Een technische beoordeling van het
              paneel hoort bij de installateur of een bevoegde specialist.
            </p>
          </aside>
        </div>
        <div className="sc-scope-grid">
          <article className="sc-scope-card sc-scope-card--yes rv" data-d="0">
            <span className="sc-scope-card__label">
              <i aria-hidden="true" />
              Wel in beeld
            </span>
            <h3>De visuele vaststelling</h3>
            <ul>
              <li>Waarneembare toestand op het inspectiebeeld</li>
              <li>Relatie tussen het detail en de dakzone</li>
              <li>Een overzichtelijk referentiepunt voor opvolging</li>
            </ul>
          </article>
          <article className="sc-scope-card sc-scope-card--next rv" data-d="120">
            <span className="sc-scope-card__label">
              <i aria-hidden="true" />
              Technisch vervolg
            </span>
            <h3>Beoordeling door de installateur</h3>
            <ul>
              <li>Oorzaak of omvang van de beschadiging</li>
              <li>Elektrische werking en prestaties</li>
              <li>Herstelling, garantie of verzekeringsafhandeling</li>
            </ul>
          </article>
        </div>
        <p className="sc-scope-foot">
          Een visuele drone-inspectie vervangt geen elektrische meting of technische expertise.
        </p>
      </div>
    </section>
  );
}
