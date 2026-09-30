export function Hero() {
  return (
    <section className="sc-hero">
      <div className="sc-hero__glow" aria-hidden="true" />
      <div className="sc-hero__grid" aria-hidden="true" />
      <div className="wrap sc-hero__in">
        <div className="sc-hero__copy">
          <a className="sc-back" href="/portfolio#dienst-03">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
              <path d="M20 12H9" />
            </svg>
            Terug naar portfolio{" "}
          </a>
          <span className="eyebrow">Case 03 · Fotogrammetrie &amp; 3D-modellering</span>
          <h1 data-split="">
            Een woning,
            <br />
            <span className="grad">rondom in 3D.</span>
          </h1>
          <p className="sc-hero__lead rv" data-d="180">
            Tachtig dronebeelden, één vlucht van ongeveer 19 minuten en een interactief 3D-model. Dakvlakken,
            dakranden, gevels en terras staan in samenhang in beeld, en je bekijkt ze vanuit elke hoek.
          </p>
          <div className="sc-hero__actions rv" data-d="280">
            <a className="btn btn--p" href="#model">
              Verken het 3D-model{" "}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
            <a className="sc-textlink" href="#opnames">
              Bekijk de bronbeelden <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="sc-hero__facts rv" data-d="360">
            <span>
              <i aria-hidden="true" />
              Private woning · locatie niet vermeld
            </span>
            <span>
              <i aria-hidden="true" />
              80 dronebeelden van 25 MP
            </span>
            <span>
              <i aria-hidden="true" />
              Interactief 3D-model in de browser
            </span>
          </div>
        </div>
        <figure className="sc-hero__visual rv rv--s" data-d="180">
          <div className="sc-hero__visual-frame cw-hero-frame">
            <img
              src="/assets/img/woning-case/model-hero.webp"
              srcSet="/assets/img/woning-case/model-hero-800.webp 800w, /assets/img/woning-case/model-hero.webp 1300w"
              sizes="(max-width: 900px) 100vw, 50vw"
              width="1300"
              height="813"
              fetchPriority="high"
              alt="Render uit het 3D-model: een woning met platte daken, een terras en een lange tuin met overkapping"
            />
            <span className="sc-hero__visual-tag">
              <span className="sc-live-dot" aria-hidden="true" />
              RENDER UIT HET 3D-MODEL
            </span>
          </div>
          <figcaption>
            Een beeld rechtstreeks uit het 3D-model; alleen de lege achtergrond is weggelaten. De straat, de
            oprit en de tuinen van de buren zijn weggeknipt.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
