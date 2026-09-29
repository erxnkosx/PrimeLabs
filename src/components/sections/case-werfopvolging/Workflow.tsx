export function Workflow() {
  return (
    <section className="sec sc-workflow">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">Van vlucht naar tijdlijn</span>
            <h2 data-split="">
              Vier stappen
              <br />
              naar <span className="grad">een visuele tijdlijn.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de werkwijze">
            <span className="sc-section-note__meta">
              <b>04</b>DE WERKWIJZE
            </span>
            <p>
              De waarde zit in de herhaling: dezelfde standpunten, op vaste momenten, gebundeld per opnamedag.
            </p>
          </aside>
        </div>
        <div className="sc-steps">
          <article className="sc-step rv" data-d="0">
            <span className="sc-step__number">01</span>
            <div>
              <h3>Nulmeting</h3>
              <p>
                Een eerste opname legt de toestand van de werf en de omgeving vast, vóór of bij de start van
                de werken.
              </p>
            </div>
            <span className="sc-step__meta">DAG 1 · 48 MP</span>
          </article>
          <article className="sc-step rv" data-d="90">
            <span className="sc-step__number">02</span>
            <div>
              <h3>Vaste standpunten</h3>
              <p>
                Hoogte, positie en camerahoek worden vastgelegd, zodat elke volgende ronde hetzelfde kader
                geeft.
              </p>
            </div>
            <span className="sc-step__meta">56 M · 43°</span>
          </article>
          <article className="sc-step rv" data-d="180">
            <span className="sc-step__number">03</span>
            <div>
              <h3>Interval</h3>
              <p>
                Op afgesproken momenten volgt een nieuwe ronde, met foto’s en waar nodig video van het werk
                zelf.
              </p>
            </div>
            <span className="sc-step__meta">+1 DAG · 4K</span>
          </article>
          <article className="sc-step rv" data-d="270">
            <span className="sc-step__number">04</span>
            <div>
              <h3>Delen</h3>
              <p>
                De beelden per opnamedag, gebundeld voor de werfvergadering, de bouwheer en het
                projectdossier.
              </p>
            </div>
            <span className="sc-step__meta">TIJDLIJN · DOSSIER</span>
          </article>
        </div>
      </div>
    </section>
  );
}
