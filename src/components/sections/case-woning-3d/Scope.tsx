export function Scope() {
  return (
    <section className="sec sc-scope">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">Duidelijke grenzen</span>
            <h2 data-split="">
              Helder over wat het
              <br />
              model <span className="grad">wel en niet is.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de afbakening">
            <span className="sc-section-note__meta">
              <b>05</b>DE AFBAKENING
            </span>
            <p>
              Een splat-model is sterk in overzicht en communicatie. Voor maatvoering, volumes of een
              bouwtechnisch oordeel is iets anders nodig.
            </p>
          </aside>
        </div>
        <div className="sc-scope-grid">
          <article className="sc-scope-card sc-scope-card--yes rv" data-d="0">
            <span className="sc-scope-card__label">
              <i aria-hidden="true" />
              Wel in het model
            </span>
            <h3>Een fotorealistisch overzicht</h3>
            <ul>
              <li>Dak, gevels, terras en tuin vanuit elke hoek</li>
              <li>Zichtbare toestand van dakvlakken en aansluitingen</li>
              <li>Een gedeeld beeld voor eigenaar, architect of aannemer</li>
            </ul>
          </article>
          <article className="sc-scope-card sc-scope-card--next rv" data-d="120">
            <span className="sc-scope-card__label">
              <i aria-hidden="true" />
              Vraagt een aanvulling
            </span>
            <h3>Meten en beoordelen</h3>
            <ul>
              <li>Exacte maten en volumes: een puntenwolk of mesh op grondcontrolepunten</li>
              <li>Verborgen gebreken en vochtproblemen</li>
              <li>Een bouwtechnisch oordeel door een bevoegde expert</li>
            </ul>
          </article>
        </div>
        <p className="sc-scope-foot">
          Een 3D-model uit dronebeelden vervangt geen opmeting door een landmeter-expert of een bouwtechnisch
          onderzoek.
        </p>
      </div>
    </section>
  );
}
