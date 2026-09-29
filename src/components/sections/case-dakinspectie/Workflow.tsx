export function Workflow() {
  return (
    <section className="sec sc-workflow">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">Van opname naar dossier</span>
            <h2 data-split="">
              Een heldere route
              <br />
              voor <span className="grad">elke bevinding.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de rapportage">
            <span className="sc-section-note__meta">
              <b>04</b>HET VERVOLG
            </span>
            <p>
              Het dakoverzicht is het startpunt. De waarde voor de opdrachtgever zit in de verbinding tussen
              locatie, waarneming en het vervolg in het inspectiedossier.
            </p>
          </aside>
        </div>
        <div className="sc-steps">
          <article className="sc-step rv" data-d="0">
            <span className="sc-step__number">01</span>
            <div>
              <h3>Opname</h3>
              <p>Dronebeelden van 48 MP brengen het volledige dak en de zichtbare details in kaart.</p>
            </div>
            <span className="sc-step__meta">48 MP · 100 % DEKKING</span>
          </article>
          <article className="sc-step rv" data-d="90">
            <span className="sc-step__number">02</span>
            <div>
              <h3>Dakoverzicht</h3>
              <p>
                Een loodrecht bovenaanzicht van het volledige dak helpt iedereen zich te oriënteren op de
                indeling.
              </p>
            </div>
            <span className="sc-step__meta">OVERZICHT · DAKPLAN</span>
          </article>
          <article className="sc-step rv" data-d="180">
            <span className="sc-step__number">03</span>
            <div>
              <h3>Observaties nummeren</h3>
              <p>Elk detailbeeld en elke positie wordt aan hetzelfde genummerde punt verbonden.</p>
            </div>
            <span className="sc-step__meta">#01 · #02</span>
          </article>
          <article className="sc-step rv" data-d="270">
            <span className="sc-step__number">04</span>
            <div>
              <h3>Delen en opvolgen</h3>
              <p>Een compact PDF-dossier geeft de opdrachtgever en installateur dezelfde referentie.</p>
            </div>
            <span className="sc-step__meta">DOSSIER · VERVOLG</span>
          </article>
        </div>
      </div>
    </section>
  );
}
