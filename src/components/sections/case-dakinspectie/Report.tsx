export function Report() {
  return (
    <section className="sc-report-section">
      <div className="wrap sc-report-layout">
        <div className="sc-report-copy">
          <span className="eyebrow">Het inspectiedossier</span>
          <h2 data-split="">
            Een observatie is pas
            <br />
            bruikbaar als het <span className="sc-light-grad">dossier klopt.</span>
          </h2>
          <p className="rv" data-d="140">
            Een overzichtelijke oplevering combineert het dakplan, de genummerde waarneming en de bijbehorende
            bronbeelden. Dezelfde nummering verschijnt online en in het PDF, zodat de bevinding niet losraakt
            van haar locatie.
          </p>
          <ul className="sc-report-list rv" data-d="220">
            <li>
              <span>01</span>Overzicht van de geïnspecteerde zone
            </li>
            <li>
              <span>02</span>Detailbeelden van de genummerde observaties
            </li>
            <li>
              <span>03</span>Locatie op het dakplan en duidelijke vervolgactie
            </li>
          </ul>
          <p className="sc-report-disclaimer">
            Conceptvoorstel voor de dossieropbouw. De definitieve inhoud volgt uit het inspectierapport en de
            bevestigde paneelpositie.
          </p>
        </div>
        <figure className="sc-report-visual rv rv--s" data-d="120">
          <div
            className="sc-report-preview"
            role="img"
            aria-label="Conceptuele dossierpreview met een zonnepaneelbeschadiging en nog te bevestigen daklocatie"
          >
            <div className="sc-report-preview__topbar">
              <span className="sc-report-preview__brand">
                <i aria-hidden="true" />
                PRIMELABS <b>/</b>INSPECTIEDOSSIER
              </span>
              <span className="sc-report-preview__edition">CONCEPTVOORBEELD</span>
            </div>
            <div className="sc-report-preview__paper">
              <header className="sc-report-preview__header">
                <div>
                  <span className="sc-report-preview__eyebrow">BEVINDING 01 · VISUELE INSPECTIE</span>
                  <strong>Beschadiging zonnepaneel</strong>
                  <p>Voorbeeldregistratie · paneeladres te bevestigen</p>
                </div>
                <span className="sc-report-preview__status">TE CONTROLEREN</span>
              </header>
              <div className="sc-report-preview__body">
                <div className="sc-report-preview__detail">
                  <div className="sc-report-preview__thumb">
                    <img
                      src="/assets/img/speculoos-case/obs-01-800.webp"
                      width="800"
                      height="533"
                      loading="lazy"
                      alt=""
                    />
                    <span>DETAILBEELD</span>
                  </div>
                  <div className="sc-report-preview__facts">
                    <span>WAARNEMING</span>
                    <strong>Zichtbare beschadiging</strong>
                    <span>LOCATIE</span>
                    <strong>Paneeladres na verificatie</strong>
                  </div>
                </div>
                <aside className="sc-report-preview__locator">
                  <span>DAKLOCATIE</span>
                  <div className="sc-report-preview__zones" aria-hidden="true">
                    <b>A</b>
                    <b>B</b>
                    <b>C</b>
                    <b>D</b>
                  </div>
                  <p>Veld, rij en paneel volgen na bevestiging.</p>
                </aside>
              </div>
              <div className="sc-report-preview__footer">
                <span>Bronbeelden gekoppeld aan observatie 01 en 02</span>
                <b>PDF · CONCEPT</b>
              </div>
            </div>
          </div>
          <figcaption>
            Conceptuele dossieropbouw; de definitieve rapportinhoud volgt na verificatie.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
