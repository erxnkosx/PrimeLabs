export function Hero() {
  return (
    <section className="sc-hero">
      <div className="sc-hero__glow" aria-hidden="true" />
      <div className="sc-hero__grid" aria-hidden="true" />
      <div className="wrap sc-hero__in">
        <div className="sc-hero__copy">
          <a className="sc-back" href="/portfolio#dienst-02">
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
          <span className="eyebrow">Case 02 · Periodieke werfopvolging</span>
          <h1 data-split="">
            Een sloopwerf,
            <br />
            <span className="grad">dag na dag.</span>
          </h1>
          <p className="sc-hero__lead rv" data-d="180">
            Twee opnamedagen boven dezelfde werf. Op 16 juni een scherp overzicht van 48 MP vanaf 56 meter
            hoogte, een dag later 4K-videobeelden van de afbraak. Zo wordt de voortgang zichtbaar: van een
            half gesloopte woning naar de laatste muurdelen.
          </p>
          <div className="sc-hero__actions rv" data-d="280">
            <a className="btn btn--p" href="#tijdlijn">
              Bekijk de tijdlijn{" "}
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
            <a className="sc-textlink" href="#video">
              Bekijk de video <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="sc-hero__facts rv" data-d="360">
            <span>
              <i aria-hidden="true" />
              Sloopwerf · locatie niet vermeld
            </span>
            <span>
              <i aria-hidden="true" />
              16 en 17 juni 2026
            </span>
            <span>
              <i aria-hidden="true" />
              48 MP-foto en 4K-video
            </span>
          </div>
        </div>
        <figure className="sc-hero__visual rv rv--s" data-d="180">
          <div className="sc-hero__visual-frame ww-hero-frame">
            <img
              src="/assets/img/werf-case/dag1-overzicht-1200.webp"
              srcSet="/assets/img/werf-case/dag1-overzicht-800.webp 800w, /assets/img/werf-case/dag1-overzicht-1200.webp 1200w, /assets/img/werf-case/dag1-overzicht.webp 2000w"
              sizes="(max-width: 900px) 100vw, 50vw"
              width="1200"
              height="645"
              fetchPriority="high"
              alt="Luchtopname van een sloopwerf: een half gesloopte rijwoning, containers met gesorteerd puin en een graafmachine"
            />
            <span className="sc-hero__visual-tag">
              <span className="sc-live-dot" aria-hidden="true" />
              DAG 1 · 16.06.2026
            </span>
          </div>
          <figcaption>
            Overzicht op 16 juni 2026, vanaf 56 m hoogte met de camera 43° naar beneden, ontwikkeld uit de
            ruwe 48 MP-opname.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
