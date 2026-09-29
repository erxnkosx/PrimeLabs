// HERO
export function Hero() {
  return (
    <section className="hero hero--page" style={{ paddingBottom: "0" }}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap">
        <span className="eyebrow">Portfolio</span>
        <h1 data-split="" style={{ maxWidth: "18ch" }}>
          Inspectiewerk helder in beeld.
        </h1>
        <p className="hero__sub rv" data-d="240" style={{ maxWidth: "58ch", marginTop: "28px" }}>
          Een selectie van uitgevoerde opdrachten, gesorteerd per dienst: telkens de vraag van de
          opdrachtgever, de gevolgde aanpak en het opgeleverde resultaat.
        </p>
        <div className="hero__facts rv" data-d="320" style={{ marginTop: "46px" }}>
          <span className="fact">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
            3 cases · 3 diensten
          </span>
          <span className="fact">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            Publicatie enkel met toestemming
          </span>
          <span className="fact">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 20h18" />
              <path d="M5 20V8l7-4v16" />
              <path d="M12 12h5a2 2 0 0 1 2 2v6" />
            </svg>
            Geen stockfotografie
          </span>
        </div>
      </div>
    </section>
  );
}
