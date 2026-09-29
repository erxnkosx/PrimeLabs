export function Workflow() {
  return (
    <section className="sec sc-workflow" id="werkwijze">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">Van vlucht naar model</span>
            <h2 data-split="">
              Vier stappen
              <br />
              naar <span className="grad">een model online.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de werkwijze">
            <span className="sc-section-note__meta">
              <b>04</b>DE WERKWIJZE
            </span>
            <p>
              De kwaliteit van het model begint bij de vlucht: voldoende overlap, schuine én loodrechte
              beelden, en een rustige lichtsituatie.
            </p>
          </aside>
        </div>
        <div className="sc-steps">
          <article className="sc-step rv" data-d="0">
            <span className="sc-step__number">01</span>
            <div>
              <h3>Vlucht</h3>
              <p>
                Een baan rond de woning met schuine beelden en een raster loodrecht van boven: 80 foto’s in
                ongeveer 19 minuten.
              </p>
            </div>
            <span className="sc-step__meta">80 BEELDEN · 25 MP</span>
          </article>
          <article className="sc-step rv" data-d="90">
            <span className="sc-step__number">02</span>
            <div>
              <h3>Reconstructie</h3>
              <p>
                Uit de overlappende beelden wordt een Gaussian splat berekend: een fotorealistisch 3D-model
                van de hele scène.
              </p>
            </div>
            <span className="sc-step__meta">588.307 SPLATS</span>
          </article>
          <article className="sc-step rv" data-d="180">
            <span className="sc-step__number">03</span>
            <div>
              <h3>Opschonen</h3>
              <p>
                Straat, oprit, de tuinen van de buren en losse zweefpunten worden weggeknipt, zodat de woning
                en de eigen tuin overblijven.
              </p>
            </div>
            <span className="sc-step__meta">410.454 SPLATS</span>
          </article>
          <article className="sc-step rv" data-d="270">
            <span className="sc-step__number">04</span>
            <div>
              <h3>Online</h3>
              <p>
                Het model wordt gecomprimeerd voor het web en draait daarna in elke recente browser, ook op
                een tablet.
              </p>
            </div>
            <span className="sc-step__meta">134 MB → 7,4 MB</span>
          </article>
        </div>
      </div>
    </section>
  );
}
