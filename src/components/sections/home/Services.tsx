// DIENSTEN
export function Services() {
  return (
    <section className="sec" id="diensten">
      <div className="wrap">
        <div className="split-head">
          <div>
            <span className="eyebrow">Diensten</span>
            <h2 data-split="">
              Geen dronebeelden om de beelden.
              <br />
              Wel informatie die u verder helpt.
            </h2>
          </div>
          <p className="lead rv" data-d="160">
            Elke opdracht start vanuit een concrete vraag. We brengen relevante zones in beeld, structureren
            de bevindingen en leveren een dossier dat eenvoudig intern of met partners gedeeld kan worden.
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
                  aria-hidden="true"
                >
                  <path d="M6 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
                  <path d="M6 13H4a2 2 0 0 0-2 2v7h20v-7a2 2 0 0 0-2-2h-2" />
                  <path d="M10 8h4M10 12h4M10 16h4" />
                </svg>
              </span>
            </div>
            <h3>Dak- &amp; gevelinspecties</h3>
            <p>
              Daken, goten, schouwen en gevels in beeld zonder stelling of hoogtewerker, met zichtbare schade
              genummerd vastgelegd en standaard een inspectierapport in PDF.
            </p>
            <a className="tlink tlink--b card__link" href="/diensten#d1">
              Meer informatie{" "}
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
            <span className="card__bar" />
          </article>
          <article className="card rv" data-tilt="" data-d="90">
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
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 0 1 15-6.7" />
                  <path d="M21 4v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7" />
                  <path d="M3 20v-5h5" />
                </svg>
              </span>
            </div>
            <h3>Periodieke werfopvolging</h3>
            <p>
              Van nulmeting tot oplevering: beelden op vaste momenten, volgens hetzelfde ingestelde
              vliegpatroon, zodat u de voortgang eenvoudig kunt vergelijken.
            </p>
            <a className="tlink tlink--b card__link" href="/diensten#d2">
              Meer informatie{" "}
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
            <span className="card__bar" />
          </article>
          <article className="card rv" data-tilt="" data-d="180">
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
                  aria-hidden="true"
                >
                  <path d="M12 2.5 3.5 7.2v9.6L12 21.5l8.5-4.7V7.2Z" />
                  <path d="m3.5 7.2 8.5 4.7 8.5-4.7" />
                  <path d="M12 11.9v9.6" />
                </svg>
              </span>
            </div>
            <h3>Fotogrammetrie &amp; 3D-modellering</h3>
            <p>
              Meetbare data uit dronebeelden: orthofoto’s op schaal, puntenwolken voor CAD en BIM, 3D-modellen
              en volumemetingen.
            </p>
            <a className="tlink tlink--b card__link" href="/diensten#d3">
              Meer informatie{" "}
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
            <span className="card__bar" />
          </article>
        </div>
      </div>
    </section>
  );
}
