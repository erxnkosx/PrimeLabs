export function Brief() {
  return (
    <section className="sec sc-brief" id="inspectievraag">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">De inspectievraag</span>
            <h2 data-split="">
              Van hoog overzicht
              <br />
              naar <span className="grad">een bruikbaar detail.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de inspectievraag">
            <span className="sc-section-note__meta">
              <b>01</b>VRAAGSTUK
            </span>
            <p>
              Bij een groot dak is een detail pas bruikbaar wanneer duidelijk is waar het zich bevindt. De
              case verbindt daarom een dakoverzicht, een leesbaar dakplan en de genummerde observaties.
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
                  <path d="m3 8 9-5 9 5-9 5-9-5Z" />
                  <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
                </svg>
              </span>
            </div>
            <h3>Het dak in één beeld</h3>
            <p>
              Een loodrecht dakoverzicht toont de PV-velden, lichtstraten en dakvlakken in hun onderlinge
              ligging, nog voor je inzoomt op details.
            </p>
            <a className="tlink tlink--b card__link" href="#inspectie">
              Bekijk het dakoverzicht{" "}
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
                  <path d="M4 5.5 12 2l8 3.5v13L12 22l-8-3.5v-13Z" />
                  <path d="M4 5.5 12 9l8-3.5M12 9v13M8 3.8l8 3.6" />
                </svg>
              </span>
            </div>
            <h3>De plek terugvinden</h3>
            <p>
              Een bovenaanzicht en een paneeladres verbinden een waarneming met het juiste deel van het dak.
            </p>
            <a className="tlink tlink--b card__link" href="#dakplan">
              Bekijk het dakplan{" "}
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
                  <path d="M12 22s8-4.4 8-11V5l-8-3-8 3v6c0 6.6 8 11 8 11Z" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
            </div>
            <h3>Observaties zorgvuldig tonen</h3>
            <p>
              Elke observatie krijgt een nummer, een detailbeeld en een heldere vervolgstap, zonder oorzaak of
              gevolg te veronderstellen.
            </p>
            <a className="tlink tlink--b card__link" href="#observaties">
              Bekijk de observaties{" "}
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
