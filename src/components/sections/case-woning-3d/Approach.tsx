export function Approach() {
  return (
    <section className="sec sc-brief" id="aanpak">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">Wat de case laat zien</span>
            <h2 data-split="">
              Van losse beelden
              <br />
              naar <span className="grad">één ruimtelijk model.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de aanpak">
            <span className="sc-section-note__meta">
              <b>01</b>DE AANPAK
            </span>
            <p>
              Een losse foto toont telkens één hoek. Het 3D-model legt alle beelden samen, zodat dak, gevels
              en terras in hun onderlinge samenhang te bekijken zijn, zonder ladder of dakbetreding.
            </p>
          </aside>
        </div>
        <div className="sc-brief-grid">
          <article className="card sc-brief-card rv" data-tilt="" data-d="0">
            <div className="card__top">
              <span className="card__num">01</span>
              <span className="card__ico" aria-hidden="true">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2.5 3.5 7.2v9.6L12 21.5l8.5-4.7V7.2Z" />
                  <path d="m3.5 7.2 8.5 4.7 8.5-4.7" />
                  <path d="M12 11.9v9.6" />
                </svg>
              </span>
            </div>
            <h3>Het geheel in één model</h3>
            <p>
              Dakvlakken, dakranden, gevels, terras en tuin in één fotorealistische 3D-weergave, van elke kant
              te bekijken.
            </p>
            <a className="tlink tlink--b card__link" href="#model">
              Verken het model{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="card__bar" aria-hidden="true" />
          </article>
          <article className="card sc-brief-card rv" data-tilt="" data-d="100">
            <div className="card__top">
              <span className="card__num">02</span>
              <span className="card__ico" aria-hidden="true">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 5h-5L8 7H4.5A2.5 2.5 0 0 0 2 9.5v8A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-8A2.5 2.5 0 0 0 19.5 7H16Z" />
                  <circle cx="12" cy="13" r="3.4" />
                </svg>
              </span>
            </div>
            <h3>Details uit de bronbeelden</h3>
            <p>
              Voor wie dichterbij wil kijken, blijven de originele foto’s de referentie: aansluitingen,
              doorvoeren en gevelafwerking.
            </p>
            <a className="tlink tlink--b card__link" href="#opnames">
              Bekijk de bronbeelden{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="card__bar" aria-hidden="true" />
          </article>
          <article className="card sc-brief-card rv" data-tilt="" data-d="200">
            <div className="card__top">
              <span className="card__num">03</span>
              <span className="card__ico" aria-hidden="true">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
                  <path d="M12 12v9M8 17l4 4 4-4" />
                </svg>
              </span>
            </div>
            <h3>Licht genoeg voor het web</h3>
            <p>
              Na bijsnijden en compressie gaat het model van 134 MB naar 7,4 MB en draait het vlot in een
              gewone browser, zonder extra software.
            </p>
            <a className="tlink tlink--b card__link" href="#werkwijze">
              Zo is het gemaakt{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="card__bar" aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  );
}
