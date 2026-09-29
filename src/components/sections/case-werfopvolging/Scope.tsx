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
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de afbakening">
            <span className="sc-section-note__meta">
              <b>05</b>DE AFBAKENING
            </span>
            <p>
              Werfopvolging vanuit de lucht documenteert wat zichtbaar is. Het oordeel over veiligheid,
              stabiliteit of afvalstromen hoort bij de bevoegde partijen.
            </p>
          </aside>
        </div>
        <div className="sc-scope-grid">
          <article className="sc-scope-card sc-scope-card--yes rv" data-d="0">
            <span className="sc-scope-card__label">
              <i aria-hidden="true" />
              Wel in beeld
            </span>
            <h3>De zichtbare voortgang</h3>
            <ul>
              <li>De toestand van de werf per opnamedag</li>
              <li>Opstelling van containers, machines en werfhekken</li>
              <li>Beeldmateriaal voor overleg en het projectdossier</li>
            </ul>
          </article>
          <article className="sc-scope-card sc-scope-card--next rv" data-d="120">
            <span className="sc-scope-card__label">
              <i aria-hidden="true" />
              Hoort bij de vakpartijen
            </span>
            <h3>Controle en beoordeling</h3>
            <ul>
              <li>Veiligheidscoördinatie en naleving op de werf</li>
              <li>Stabiliteit van de resterende constructie</li>
              <li>Asbestinventaris en de verwerking van afvalstromen</li>
            </ul>
          </article>
        </div>
        <p className="sc-scope-foot">
          Luchtbeelden van een werf vervangen geen veiligheidscoördinatie, stabiliteitsstudie of
          asbestinventaris.
        </p>
      </div>
    </section>
  );
}
