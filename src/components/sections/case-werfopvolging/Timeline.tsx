export function Timeline() {
  return (
    <section className="sc-model-section" id="tijdlijn">
      <div className="sc-model-glow" aria-hidden="true" />
      <div className="wrap sc-model-content">
        <div className="sc-section-head sc-section-head--dark">
          <div>
            <span className="eyebrow">De tijdlijn</span>
            <h2 data-split="">
              Twee opnamedagen,
              <br />
              <span className="sc-light-grad">één werf.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de tijdlijn">
            <span className="sc-section-note__meta">
              <b>02</b>DE OPNAMES
            </span>
            <p>
              Per opnamedag: wat er in beeld is, feitelijk beschreven. Klik op een beeld om het groter te
              bekijken.
            </p>
          </aside>
        </div>
        <ol className="ww-tijdlijn">
          <li className="sc-obs ww-dag rv" data-d="0" aria-labelledby="dag1-t">
            <header className="sc-obs__head">
              <span className="sc-obs__id">DAG 1 · 16.06.2026 · 17:21</span>
              <span className="sc-status">
                <i aria-hidden="true" />
                Foto · 48 MP
              </span>
            </header>
            <h3 id="dag1-t">De woning staat nog half overeind</h3>
            <button
              className="sc-obs__photo"
              type="button"
              data-photo="/assets/img/werf-case/dag1-overzicht.webp"
              data-caption="Dag 1 · 16 juni 2026 · overzicht van de werf vanaf 56 m hoogte."
            >
              <img
                src="/assets/img/werf-case/dag1-overzicht-800.webp"
                width="800"
                height="430"
                loading="lazy"
                alt="Overzicht van de sloopwerf op 16 juni: de half gesloopte woning, containers met puin en een graafmachine"
              />
              <span className="sc-obs__zoom" aria-hidden="true">
                Vergroot
              </span>
            </button>
            <dl className="sc-obs__facts">
              <div>
                <dt>Gebouw</dt>
                <dd>De achterbouw is afgebroken; voorgevel en dak van de rijwoning staan nog.</dd>
              </div>
              <div>
                <dt>Puin</dt>
                <dd>Gesorteerd in containers: stenen, hout en gemengd afval, één container is afgedekt.</dd>
              </div>
              <div>
                <dt>Materieel</dt>
                <dd>Graafmachine achter de woning, pick-up met aanhangwagen op het terrein.</dd>
              </div>
              <div>
                <dt>Veiligheid</dt>
                <dd>Werfhekken langs de straatkant.</dd>
              </div>
            </dl>
          </li>
          <li className="ww-stap" aria-hidden="true">
            <span>+1 dag</span>
          </li>
          <li className="sc-obs ww-dag rv" data-d="120" aria-labelledby="dag2-t">
            <header className="sc-obs__head">
              <span className="sc-obs__id">DAG 2 · 17.06.2026 · 16:59</span>
              <span className="sc-status">
                <i aria-hidden="true" />
                Video · 4K
              </span>
            </header>
            <h3 id="dag2-t">De laatste muurdelen gaan neer</h3>
            <button
              className="sc-obs__photo"
              type="button"
              data-photo="/assets/img/werf-case/dag2-sloop.webp"
              data-caption="Dag 2 · 17 juni 2026 · de graafmachine breekt de laatste muurdelen af."
            >
              <img
                src="/assets/img/werf-case/dag2-sloop-800.webp"
                width="800"
                height="450"
                loading="lazy"
                alt="De sloopwerf op 17 juni: een graafmachine met sorteergrijper breekt de laatste muurdelen van de woning af"
              />
              <span className="sc-obs__zoom" aria-hidden="true">
                Vergroot
              </span>
            </button>
            <dl className="sc-obs__facts">
              <div>
                <dt>Gebouw</dt>
                <dd>Nog enkele muurdelen staan overeind; de graafmachine breekt ze af.</dd>
              </div>
              <div>
                <dt>Puin</dt>
                <dd>De sorteergrijper scheidt het puin ter plaatse; houten balken liggen apart.</dd>
              </div>
              <div>
                <dt>Materieel</dt>
                <dd>Graafmachine met sorteergrijper en een hoogtewerker aan de straatkant.</dd>
              </div>
              <div>
                <dt>Veiligheid</dt>
                <dd>Werfhekken rond het terrein.</dd>
              </div>
            </dl>
          </li>
        </ol>
        <div className="sc-model-footnote">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
          </svg>
          <p>
            <strong>Eerlijk vergeleken.</strong> Deze twee opnames zijn niet vanuit exact hetzelfde standpunt
            gemaakt. Bij een echte opvolging vliegen we elke ronde vanuit dezelfde GPS-positie en camerahoek,
            zodat de beelden één op één te vergelijken zijn.
          </p>
        </div>
      </div>
    </section>
  );
}
