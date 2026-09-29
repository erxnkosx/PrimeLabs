export function Hero() {
  return (
    <section className="sc-hero">
      <div className="sc-hero__glow" aria-hidden="true" />
      <div className="sc-hero__grid" aria-hidden="true" />
      <div className="wrap sc-hero__in">
        <div className="sc-hero__copy">
          <a className="sc-back" href="/portfolio">
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
          <span className="eyebrow">Case 01 · Visuele dak- en gevelinspectie · Puurs</span>
          <h1 data-split="">
            Een productiehal,
            <br />
            <span className="grad">paneel voor paneel.</span>
          </h1>
          <p className="sc-hero__lead rv" data-d="180">
            Een systematische visuele inspectie van 4.200 m² dakbedekking en PV-installatie: van een scherp
            dakoverzicht naar genummerde observaties, gebundeld in een technisch inspectierapport.
          </p>
          <div className="sc-hero__actions rv" data-d="280">
            <a className="btn btn--p" href="#inspectie">
              Bekijk de inspectie{" "}
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
            <a className="sc-textlink" href="#observaties">
              Bekijk de observaties <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="sc-hero__facts rv" data-d="360">
            <span>
              <i aria-hidden="true" />
              Productiesite · regio Puurs
            </span>
            <span>
              <i aria-hidden="true" />
              48 MP-beelden · 100 % visuele dekking
            </span>
            <span>
              <i aria-hidden="true" />2 genummerde observaties
            </span>
          </div>
        </div>
        <figure className="sc-hero__visual rv rv--s" data-d="180">
          <div className="sc-hero__visual-frame">
            <img
              src="/assets/img/speculoos-case/dak-overzicht.webp"
              srcSet="/assets/img/speculoos-case/dak-overzicht-960.webp 960w, /assets/img/speculoos-case/dak-overzicht.webp 1600w"
              sizes="(max-width: 900px) 100vw, 50vw"
              width="1600"
              height="1000"
              fetchPriority="high"
              alt="Bovenaanzicht van het productiedak met vier rijen zonnepanelen, twee lichtstraten en een lager plat dak met lichtkoepels"
            />
            <span className="sc-hero__visual-tag">
              <span className="sc-live-dot" aria-hidden="true" />
              DAKOVERZICHT · DRONEOPNAME
            </span>
          </div>
          <figcaption>
            Loodrecht bovenaanzicht van de productiehal, samengesteld uit de dronebeelden.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
