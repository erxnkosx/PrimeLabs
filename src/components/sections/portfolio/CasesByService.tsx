// CASES PER DIENST
// elke case staat bij de dienst waarvoor ze is uitgevoerd (#dienst-01 tot #dienst-03,
// dezelfde nummering als diensten.html#d1-#d3)
export function CasesByService() {
  return (
    <section className="sec" id="cases">
      <div className="wrap">
        <div className="split-head">
          <div>
            <span className="eyebrow">Cases per dienst</span>
            <h2 data-split="">
              Gesorteerd op
              <br />
              wat u nodig hebt.
            </h2>
          </div>
          <p className="lead rv" data-d="160">
            Elke case staat bij de dienst waarvoor ze is uitgevoerd. De casepagina’s zijn interne previews:
            projectbeelden verschijnen pas publiek na controle en toestemming.
          </p>
        </div>
        <nav className="pf-nav rv" aria-label="Spring naar een dienst">
          <a href="#dienst-01">
            <span>01</span>Dak- &amp; gevelinspecties<b>Case 01</b>
          </a>
          <a href="#dienst-02">
            <span>02</span>Periodieke werfopvolging<b>Case 02</b>
          </a>
          <a href="#dienst-03">
            <span>03</span>Fotogrammetrie &amp; 3D<b>Case 03</b>
          </a>
        </nav>
        {/* 01 — Visuele dak- en gevelinspecties */}
        <div className="pf-group" id="dienst-01">
          <header className="pf-group__head rv">
            <span className="svc__n">01</span>
            <h3>Visuele dak- en gevelinspecties</h3>
            <p>
              Daken, gevels en technieken in beeld, met genummerde aandachtspunten in een technisch
              inspectierapport.
            </p>
            <a className="tlink tlink--b" href="/diensten#d1">
              Over deze dienst{" "}
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
          </header>
          <div className="pf-grid">
            <article className="case case--featured rv" data-tilt="" data-d="0" style={{ "--i": "0" }}>
              <div className="case__img">
                <img
                  src="/assets/img/cases/case-speculoos-dak.webp"
                  width="1200"
                  height="900"
                  loading="lazy"
                  alt="Bovenaanzicht van een productiedak met vier rijen zonnepanelen en twee lichtstraten"
                />
                <span className="case__tag">
                  <i aria-hidden="true" />
                  Technisch rapport beschikbaar
                </span>
              </div>
              <div className="case__body">
                <span className="case__n">Case 01 · Productiesite Puurs</span>
                <h4>Een productiehal, paneel voor paneel.</h4>
                <p>
                  Systematische visuele inspectie van 4.200 m² dakbedekking en PV-installatie. Volledig
                  gedocumenteerd in een technisch inspectierapport met genummerde observaties en
                  detailopnames.
                </p>
                <a className="case__open" href="/portfolio/dakinspectie-speculoosfabriek-puurs">
                  Bekijk de uitgebreide case <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
        {/* 02 — Periodieke werfopvolging */}
        <div className="pf-group" id="dienst-02">
          <header className="pf-group__head rv">
            <span className="svc__n">02</span>
            <h3>Periodieke werfopvolging</h3>
            <p>
              Vaste intervallen en identieke GPS-standpunten, van nulmeting tot eindopname: een objectieve
              visuele tijdlijn van de werf.
            </p>
            <a className="tlink tlink--b" href="/diensten#d2">
              Over deze dienst{" "}
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
          </header>
          <div className="pf-grid">
            <article className="case case--featured rv" data-tilt="" data-d="0" style={{ "--i": "1" }}>
              <div className="case__img">
                <img
                  src="/assets/img/werf-case/dag1-overzicht-1200.webp"
                  srcSet="/assets/img/werf-case/dag1-overzicht-800.webp 800w, /assets/img/werf-case/dag1-overzicht-1200.webp 1200w"
                  sizes="(max-width: 760px) 100vw, 45vw"
                  width="1200"
                  height="645"
                  loading="lazy"
                  alt="Luchtopname van een sloopwerf: een half gesloopte rijwoning, containers met gesorteerd puin en een graafmachine"
                />
                <span className="case__tag">
                  <i aria-hidden="true" />
                  Multi-tijdlijn · 2 opnamedagen
                </span>
              </div>
              <div className="case__body">
                <span className="case__n">Case 02 · Sloopwerf</span>
                <h4>Een sloopwerf, dag na dag.</h4>
                <p>
                  Twee opnamedagen boven dezelfde werf: een 48 MP-overzicht op 16 juni en 4K-video van de
                  afbraak een dag later, naast elkaar gelegd als visuele tijdlijn.
                </p>
                <a className="case__open" href="/portfolio/werfopvolging-sloopwerf">
                  Bekijk de uitgebreide case <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
        {/* 03 — Fotogrammetrie & 3D-modellering */}
        <div className="pf-group" id="dienst-03">
          <header className="pf-group__head rv">
            <span className="svc__n">03</span>
            <h3>Fotogrammetrie &amp; 3D-modellering</h3>
            <p>Van dronebeelden naar 3D-modellen, orthofoto’s en meetbare data voor CAD, BIM en GIS.</p>
            <a className="tlink tlink--b" href="/diensten#d3">
              Over deze dienst{" "}
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
          </header>
          <div className="pf-grid">
            <article className="case case--featured rv" data-tilt="" data-d="0" style={{ "--i": "2" }}>
              <div className="case__img">
                <img
                  src="/assets/img/cases/case-woning-drone.webp"
                  srcSet="/assets/img/cases/case-woning-drone-800.webp 800w, /assets/img/cases/case-woning-drone.webp 1200w"
                  sizes="(max-width: 760px) 100vw, 45vw"
                  width="1200"
                  height="800"
                  loading="lazy"
                  alt="Luchtfoto van een moderne woning met plat dak, een zonnecollector en lichtkoepels, gezien vanaf de straatkant"
                />
                <span className="case__tag">
                  <i aria-hidden="true" />
                  Interactief 3D-model
                </span>
              </div>
              <div className="case__body">
                <span className="case__n">Case 03 · Woning met platte daken</span>
                <h4>Een woning, rondom in 3D.</h4>
                <p>
                  Een interactief 3D-model uit 80 dronebeelden: dak, gevels, terras en tuin in één ruimtelijk
                  overzicht, rechtstreeks in de browser.
                </p>
                <a className="case__open" href="/portfolio/3d-model-woning">
                  Bekijk de uitgebreide case <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
