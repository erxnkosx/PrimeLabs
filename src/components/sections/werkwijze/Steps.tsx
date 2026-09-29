// 5 STAPPEN + 3D
export function Steps() {
  return (
    <section className="sec" id="stappen">
      <div className="wrap exp exp--rev">
        {/* de stappen */}
        <div className="exp__list">
          <article
            className="svc rv"
            id="s1"
            tabIndex={0}
            data-num="01"
            data-title={"Vraag & locatie"}
            data-desc="De locatie wordt in kaart gebracht: adres, type gebouw en de vraag erachter."
          >
            <div className="svc__hd">
              <span className="svc__n">01</span>
              <h3>Vraag &amp; locatie</h3>
              <span className="svc__ico">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
            </div>
            <p>
              U bezorgt het adres, de inspectievraag en indien mogelijk enkele referentiefoto’s of plannen.
            </p>
          </article>
          <article
            className="svc rv"
            id="s2"
            tabIndex={0}
            data-num="02"
            data-title={"Scope & voorbereiding"}
            data-desc="De zones en standpunten liggen vast; bereikbaarheid en vluchtvoorwaarden zijn gecheckt."
          >
            <div className="svc__hd">
              <span className="svc__n">02</span>
              <h3>Scope &amp; voorbereiding</h3>
              <span className="svc__ico">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
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
            <p>
              We bepalen welke zones, details en standpunten nodig zijn en controleren bereikbaarheid,
              omgeving en vluchtvoorwaarden.
            </p>
          </article>
          <article
            className="svc rv"
            id="s3"
            tabIndex={0}
            data-num="03"
            data-title="Opname op locatie"
            data-desc="Gerichte vlucht: overzicht, context en details worden systematisch vastgelegd."
          >
            <div className="svc__hd">
              <span className="svc__n">03</span>
              <h3>Opname op locatie</h3>
              <span className="svc__ico">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 5h-5L8 7H4.5A2.5 2.5 0 0 0 2 9.5v8A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-8A2.5 2.5 0 0 0 19.5 7H16Z" />
                  <circle cx="12" cy="13" r="3.4" />
                </svg>
              </span>
            </div>
            <p>
              De dronevlucht wordt gericht uitgevoerd. Overzicht, context en details worden systematisch
              vastgelegd.
            </p>
          </article>
          <article
            className="svc rv"
            id="s4"
            tabIndex={0}
            data-num="04"
            data-title={"Selectie & rapportage"}
            data-desc="Relevante beelden worden geselecteerd en per aandachtspunt genummerd."
          >
            <div className="svc__hd">
              <span className="svc__n">04</span>
              <h3>Selectie &amp; rapportage</h3>
              <span className="svc__ico">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="4" width="14" height="18" rx="2" />
                  <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
                  <path d="M9 10h6M9 14h6M9 18h4" />
                </svg>
              </span>
            </div>
            <p>
              We selecteren de relevante beelden en verwerken de aandachtspunten in een helder, genummerd
              inspectierapport.
            </p>
          </article>
          <article
            className="svc rv"
            id="s5"
            tabIndex={0}
            data-num="05"
            data-title={"Oplevering & opvolging"}
            data-desc="Het digitale dossier wordt opgeleverd — bij herhaling in dezelfde structuur."
          >
            <div className="svc__hd">
              <span className="svc__n">05</span>
              <h3>Oplevering &amp; opvolging</h3>
              <span className="svc__ico">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 3v5h5" />
                  <path d="m9.5 14.5 2 2 3.5-4" />
                </svg>
              </span>
            </div>
            <p>
              U ontvangt het digitale dossier. Bij terugkerende opdrachten gebruiken we dezelfde structuur
              voor eenvoudige vergelijking.
            </p>
          </article>
        </div>
        {/* sticky 3D-fase */}
        <div className="exp__sticky rv rv--s">
          <div
            className="view exp__view"
            role="img"
            aria-label="3D-weergave die per stap meebeweegt: eerst de locatiemarkering, dan de afgesproken inspectiezones, vervolgens de dronevlucht met scanvlak, daarna de genummerde aandachtspunten en tot slot het opgeleverde dossier."
          >
            <canvas id="procCanvas" aria-hidden="true" />
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
            <div className="view__hud" aria-hidden="true">
              <div className="hud-row hud-row--t">
                <span className="hud-tag">
                  <i className="hud-dot" />
                  <span id="procPhase">Fase 01 / locatie</span>
                </span>
                <span>Werkwijze</span>
              </div>
              <div
                className="hud-row"
                style={{ bottom: "18px", fontSize: ".53rem", color: "rgba(198,172,236,.5)" }}
              >
                <span className="hud-sm">Scroll om de fasen te doorlopen</span>
                <span id="procCount">01 / 05</span>
              </div>
            </div>
          </div>
          <div className="exp__meta">
            <span className="mono" id="procNum">
              Stap 01
            </span>
            <strong id="procTitle">Vraag &amp; locatie</strong>
            <p id="procDesc">De locatie wordt in kaart gebracht: adres, type gebouw en de vraag erachter.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
