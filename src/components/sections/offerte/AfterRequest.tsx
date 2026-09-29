// NA UW AANVRAAG
export function AfterRequest() {
  return (
    <section className="sec sec--tight">
      <div className="wrap">
        <div className="split-head">
          <div>
            <span className="eyebrow">Na uw aanvraag</span>
            <h2 data-split="">
              Eerst de vraag scherp,
              <br />
              dan het voorstel.
            </h2>
          </div>
          <p className="lead rv" data-d="160">
            We sturen geen standaardprijslijst. De aanpak en prijs volgen uit de locatie, de gevraagde zones
            en de bereikbaarheid — zo betaalt u niet voor beelden die u niet nodig hebt.
          </p>
        </div>
        <div className="grid-3">
          <article className="card rv" data-tilt="" data-d="0">
            <div className="card__top">
              <span className="card__num">01</span>
              <span className="card__ico">
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
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
            </div>
            <h3>Bevestiging &amp; vragen</h3>
            <p>
              We bevestigen de aanvraag en stellen gerichte vragen als de scope of bereikbaarheid nog
              onduidelijk is.
            </p>
            <span className="card__bar" />
          </article>
          <article className="card rv" data-tilt="" data-d="110">
            <div className="card__top">
              <span className="card__num">02</span>
              <span className="card__ico">
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
                  <path d="M4 8V6a2 2 0 0 1 2-2h2" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                  <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
                  <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
                  <path d="M4 12h16" />
                </svg>
              </span>
            </div>
            <h3>Scope &amp; haalbaarheid</h3>
            <p>
              We bepalen welke zones en standpunten nodig zijn en controleren of de vlucht op die locatie
              uitvoerbaar is.
            </p>
            <span className="card__bar" />
          </article>
          <article className="card rv" data-tilt="" data-d="220">
            <div className="card__top">
              <span className="card__num">03</span>
              <span className="card__ico">
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
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 3v5h5M9 13h6M9 17h4" />
                </svg>
              </span>
            </div>
            <h3>Transparant voorstel</h3>
            <p>
              U ontvangt een voorstel met de afgesproken zones, de op te leveren beelden en het
              rapportformaat.
            </p>
            <a className="tlink tlink--b card__link" href="/werkwijze">
              Zie de volledige werkwijze{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="card__bar" />
          </article>
        </div>
      </div>
    </section>
  );
}
