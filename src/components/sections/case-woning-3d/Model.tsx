export function Model() {
  return (
    <section className="sc-model-section" id="model">
      <div className="sc-model-glow" aria-hidden="true" />
      <div className="wrap sc-model-content">
        <div className="sc-section-head sc-section-head--dark">
          <div>
            <span className="eyebrow">Verken het model</span>
            <h2 data-split="">
              Draai zelf rond
              <br />
              <span className="sc-light-grad">dak, gevels en tuin.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij het model">
            <span className="sc-section-note__meta">
              <b>02</b>HET MODEL
            </span>
            <p>
              Laad het model en kies een standpunt, of draai en zoom zelf. Het is een Gaussian splat: een
              fotorealistische 3D-weergave die rechtstreeks in de browser draait.
            </p>
          </aside>
        </div>
        <div className="sc-viewer rv" data-d="180">
          <div className="sc-viewer__main">
            <div className="sc-viewer__tabs" role="group" aria-label="Kies een beeld">
              <button className="sc-view-tab is-active" type="button" aria-pressed="true" data-view="model">
                3D-model <span>01</span>
              </button>
              <button className="sc-view-tab" type="button" aria-pressed="false" data-view="boven">
                Bovenaanzicht <span>02</span>
              </button>
              <button className="sc-view-tab" type="button" aria-pressed="false" data-view="dak">
                Dakdetail <span>03</span>
              </button>
            </div>
            <div className="sc-viewer__stage cw-stage" id="modelStage" data-viewer-state="poster">
              <div className="sc-viewer__poster" data-panel="model">
                <img
                  src="/assets/img/woning-case/model-poster.webp"
                  srcSet="/assets/img/woning-case/model-poster-960.webp 960w, /assets/img/woning-case/model-poster.webp 1600w"
                  sizes="(max-width: 900px) 100vw, 66vw"
                  width="1600"
                  height="1000"
                  loading="lazy"
                  alt="Render uit het 3D-model van de woning met tuin"
                />
                <div className="sc-viewer__poster-scrim" />
                <div className="sc-viewer__poster-copy">
                  <span className="sc-overline">
                    <i aria-hidden="true" />
                    INTERACTIEF 3D-MODEL
                  </span>
                  <strong>Verken de woning</strong>
                  <span>Het model is 7,4 MB groot en laadt pas als je erom vraagt.</span>
                  <button className="sc-load-model" id="loadModel" type="button">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m8 5 12 7-12 7V5Z" />
                    </svg>
                    Laad het 3D-model{" "}
                  </button>
                </div>
              </div>
              <canvas
                className="sc-viewer__canvas"
                id="modelCanvas"
                aria-label="Interactief 3D-model van de woning; slepen om te draaien, rechts slepen om te verschuiven, scrollen om te zoomen, of de pijltjestoetsen gebruiken"
                hidden
              />
              <div className="sc-viewer__image" data-panel="boven" hidden>
                {" "}
                <img
                  src="/assets/img/woning-case/boven.webp"
                  width="1600"
                  height="1000"
                  loading="lazy"
                  alt="Bovenaanzicht uit het 3D-model: de woning met platte daken, het terras en de lange tuin met overkapping"
                />{" "}
              </div>
              <div className="sc-viewer__image" data-panel="dak" hidden>
                {" "}
                <img
                  src="/assets/img/woning-case/foto-dak.webp"
                  width="1600"
                  height="1067"
                  loading="lazy"
                  alt="Bronfoto van het platte dak met de achterkant van de zonnecollector, ventilatiekanalen, een dakopening met opstand en lichtkoepels"
                />{" "}
              </div>
              <div className="sc-viewer__hud sc-viewer__hud--top" aria-hidden="true">
                <span className="sc-hud-pill">
                  <i className="sc-live-dot" />
                  <span id="viewLabel">3D-MODEL · GAUSSIAN SPLAT</span>
                </span>
                <span className="sc-hud-coords">410.454 SPLATS</span>
              </div>
              <div
                className="cw-presets"
                id="modelPresets"
                role="group"
                aria-label="Standpunten in het model"
                hidden
              >
                {" "}
                <button type="button" data-preset="overzicht" aria-pressed="true">
                  Overzicht
                </button>{" "}
                <button type="button" data-preset="dak" aria-pressed="false">
                  Dak
                </button>{" "}
                <button type="button" data-preset="gevel" aria-pressed="false">
                  Achtergevel
                </button>{" "}
                <button type="button" data-preset="tuin" aria-pressed="false">
                  Tuin
                </button>{" "}
              </div>
              <div className="sc-viewer__hud sc-viewer__hud--bottom">
                <span className="sc-viewer__hint" id="viewerHint">
                  Gebruik de knoppen om van beeld te wisselen
                </span>
                <div className="sc-viewer__controls" id="modelControls" hidden>
                  {" "}
                  <button
                    type="button"
                    id="spinModel"
                    aria-pressed="true"
                    aria-label="Automatisch draaien aan of uit"
                    title="Automatisch draaien"
                  >
                    {" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 12a9 9 0 1 1-3-6.7" />
                      <path d="M21 3v6h-6" />
                    </svg>{" "}
                  </button>{" "}
                  <button
                    type="button"
                    id="resetModel"
                    aria-label="Terug naar het overzicht"
                    title="Terug naar het overzicht"
                  >
                    {" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>{" "}
                  </button>{" "}
                </div>
              </div>
              <div className="sc-viewer__loading" id="modelLoading" role="status" aria-live="polite" hidden>
                <div className="sc-spinner" aria-hidden="true" />{" "}
                <span id="loadingLabel">3D-model laden…</span>{" "}
                <div className="sc-progress-track">
                  <i id="loadingProgress" />
                </div>
              </div>
              <div className="sc-viewer__error" id="modelError" role="status" hidden />
              <span className="cw-sr" id="modelStatus" aria-live="polite" />
            </div>
            <p className="sc-viewer__caption" id="viewCaption">
              Render uit het 3D-model. Laad het model om zelf rond de woning te draaien.
            </p>
          </div>
          <aside className="sc-finding-card cw-model-card" aria-labelledby="model-card-title">
            <div className="sc-finding-card__top">
              <span className="sc-status">
                <i aria-hidden="true" />
                Opgeleverd
              </span>
              <span className="sc-finding-card__id">3D-MODEL</span>
            </div>
            <span className="sc-finding-card__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.5 3.5 7.2v9.6L12 21.5l8.5-4.7V7.2Z" />
                <path d="m3.5 7.2 8.5 4.7 8.5-4.7" />
                <path d="M12 11.9v9.6" />
              </svg>
            </span>
            <h3 id="model-card-title">Over dit model</h3>
            <p className="sc-finding-card__desc">
              Een Gaussian splat: ruim een half miljoen kleine, gekleurde ellipsen die samen de woning
              fotorealistisch weergeven.
            </p>
            <dl className="sc-finding-data">
              <div>
                <dt>Bronbeelden</dt>
                <dd>80 dronefoto’s, schuin en loodrecht</dd>
              </div>
              <div>
                <dt>Vlucht</dt>
                <dd>Eén vlucht van ca. 19 minuten</dd>
              </div>
              <div>
                <dt>Model</dt>
                <dd>410.454 splats: de woning en de eigen tuin</dd>
              </div>
              <div>
                <dt>Webversie</dt>
                <dd>7,4 MB, na bijsnijden en compressie van de scan van 134 MB</dd>
              </div>
            </dl>
            <p className="sc-finding-card__note">
              Een splat is een visueel model. Voor maatvoering leveren we een gegeorefereerde puntenwolk of
              een mesh, gemeten op grondcontrolepunten.
            </p>
          </aside>
        </div>
        <div className="sc-model-footnote">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4.4 8-11V5l-8-3-8 3v6c0 6.6 8 11 8 11Z" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <p>
            <strong>Bijgesneden voor publicatie.</strong> Het model toont de woning en de eigen tuin: de
            straat, de oprit met de geparkeerde auto’s en de tuinen van de buren zijn weggeknipt. Langs de
            perceelgrenzen blijft een smalle rand zichtbaar. Het volledige model en alle bronfoto’s horen in
            het afgeschermde klantendossier.
          </p>
        </div>
      </div>
    </section>
  );
}
