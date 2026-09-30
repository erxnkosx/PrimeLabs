// WAT EEN CASE ZAL TONEN (dark + 3D)
export function CasePreview() {
  return (
    <section className="sec on-dark">
      <div className="on-dark__bg" aria-hidden="true" />
      <div className="on-dark__gr" aria-hidden="true" />
      <div className="wrap on-dark__in">
        <div>
          <span className="eyebrow">Wat een case zal tonen</span>
          <h2 data-split="">
            Niet de vlucht,
            <br />
            maar het dossier.
          </h2>
          <p className="lead rv" data-d="200" style={{ margin: "26px 0 30px" }}>
            Elke case die hier verschijnt, volgt dezelfde opbouw: de vraag van de opdrachtgever, de gekozen
            zones en wat er uiteindelijk is opgeleverd.
          </p>
          <ul className="expect rv" data-d="260">
            <li>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12.5 2.5 2.5 4.5-5" />
              </svg>
              De inspectievraag en het type locatie
            </li>
            <li>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12.5 2.5 2.5 4.5-5" />
              </svg>
              De afgesproken zones en standpunten
            </li>
            <li>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12.5 2.5 2.5 4.5-5" />
              </svg>
              Overzichtsbeelden met locatiecontext
            </li>
            <li>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12.5 2.5 2.5 4.5-5" />
              </svg>
              Genummerde aandachtspunten met detailbeeld
            </li>
            <li>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12.5 2.5 2.5 4.5-5" />
              </svg>
              Het opgeleverde PDF-dossier
            </li>
          </ul>
        </div>
        <div
          className="view rv rv--s"
          data-d="160"
          role="img"
          aria-label="3D-weergave van een dakinspectie: scanvolume en drone boven een gebouw met genummerde aandachtspunten."
        >
          <canvas id="folioCanvas" aria-hidden="true" />
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
          <div className="view__hud" aria-hidden="true">
            <div className="hud-row hud-row--t">
              <span className="hud-tag">
                <i className="hud-dot" />
                <span>Voorbeeldopname</span>
              </span>
              <span>Schematisch</span>
            </div>
            <div className="hud-row hud-row--m">
              <span className="hud-sm">Geen echte projectbeelden</span>
              <span>Sleep om te draaien</span>
            </div>
          </div>
          <div className="view__stats">
            <div className="vstat">
              <b>01</b>
              <span>Overzicht</span>
            </div>
            <div className="vstat">
              <b>04</b>
              <span>Aandachtspunten</span>
            </div>
            <div className="vstat">
              <b>PDF</b>
              <span>Dossier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
