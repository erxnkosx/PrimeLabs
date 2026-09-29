// DIENSTEN: ZIG-ZAG
// Elke dienst een eigen rij met een eigen 3D-scène (#canvas-d1 tot #canvas-d3):
// 01 en 03 met de scène links, 02 omgedraaid. Maatwerk is geen aparte dienst
// maar de aanpak van elke opdracht, en het inspectierapport is de vaste oplevering.
export function ServiceRows() {
  return (
    <section className="sec" id="diensten" aria-label="De drie diensten">
      <div className="wrap services-showcase">
        <article className="svc-row" id="d1" data-num="01" aria-labelledby="d1-t">
          <div className="svc-row__media rv rv--l">
            <div
              className="view svc-row__view"
              role="img"
              aria-label="3D-weergave van een kantoorgebouw met een uitkragende bovenverdieping en lamellengevel: de drone richt een scankegel op het zonnepanelenveld, op de aansluiting van de koelgroep op het dak en op de lamellengevel"
            >
              <canvas id="canvas-d1" aria-hidden="true" />
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
              <div className="view__hud" aria-hidden="true">
                <div className="hud-row hud-row--t">
                  <span className="hud-tag">
                    <i className="hud-dot" />
                    <span className="hud-tag__t">Kantoor / dak + gevel</span>
                  </span>
                  <span className="hud-badge" data-status="">
                    Visuele inspectie
                  </span>
                </div>
                <div className="hud-row hud-row--b">
                  <span className="hud-sm">Sleep om te draaien</span>
                  <span className="hud-count">Dienst 01 / 03</span>
                </div>
              </div>
            </div>
          </div>
          <div className="svc-row__body rv" data-d="120">
            <div className="svc-row__kop">
              <span className="svc__n">01</span>
              <span className="svc-row__lijn" aria-hidden="true" />
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
                  aria-hidden="true"
                >
                  <path d="M6 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
                  <path d="M6 13H4a2 2 0 0 0-2 2v7h20v-7a2 2 0 0 0-2-2h-2" />
                  <path d="M10 8h4M10 12h4M10 16h4" />
                </svg>
              </span>
            </div>
            <h2 className="svc-row__t" id="d1-t">
              Visuele dak- en gevelinspecties
            </h2>
            <p>
              Een veilige, gedetailleerde inspectie van de volledige gebouwschil. We brengen moeilijk
              bereikbare dak- en gevelzones haarscherp in kaart zonder dure stellingen, hoogtewerkers of
              risicovolle dakbetreding.
            </p>
            <ul className="feat">
              <li>
                <span>
                  <b>Dakbedekking &amp; technieken:</b> Controle van roofing, EPDM, pannen, dakdoorvoeren en
                  visuele status van zonnepanelen en HVAC-installaties.
                </span>
              </li>
              <li>
                <span>
                  <b>Gevels &amp; aansluitingen:</b> Detectie van scheurvorming, vorstschade, loszittend
                  voegwerk, lateien en zink- of loodaansluitingen.
                </span>
              </li>
              <li>
                <span>
                  <b>Schadevaststelling &amp; preventie:</b> Objectieve, gedateerde vaststelling na
                  stormschade of als periodiek preventief onderhoud.
                </span>
              </li>
              <li>
                <span>
                  <b>Inclusief technisch inspectierapport (PDF):</b> Elk aandachtspunt genummerd met detail-
                  en overzichtsfoto’s, exacte locatieverwijzing en concrete toelichting.
                </span>
              </li>
            </ul>
          </div>
        </article>
        <article className="svc-row svc-row--reverse" id="d2" data-num="02" aria-labelledby="d2-t">
          <div className="svc-row__media rv rv--r">
            <div
              className="view svc-row__view"
              role="img"
              aria-label="3D-weergave: een werf in uitvoering waarrond de drone een vaste, gloeiende vliegroute langs acht GPS-standpunten volgt"
            >
              <canvas id="canvas-d2" aria-hidden="true" />
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
              <div className="view__hud" aria-hidden="true">
                <div className="hud-row hud-row--t">
                  <span className="hud-tag">
                    <i className="hud-dot" />
                    <span className="hud-tag__t">Werfzone / vaste route</span>
                  </span>
                  <span className="hud-badge" data-status="">
                    Periodieke opvolging
                  </span>
                </div>
                <div className="hud-row hud-row--b">
                  <span className="hud-sm">Sleep om te draaien</span>
                  <span className="hud-count">Dienst 02 / 03</span>
                </div>
              </div>
            </div>
          </div>
          <div className="svc-row__body rv" data-d="120">
            <div className="svc-row__kop">
              <span className="svc__n">02</span>
              <span className="svc-row__lijn" aria-hidden="true" />
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
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 0 1 15-6.7" />
                  <path d="M21 4v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7" />
                  <path d="M3 20v-5h5" />
                </svg>
              </span>
            </div>
            <h2 className="svc-row__t" id="d2-t">
              Periodieke werfopvolging
            </h2>
            <p>
              Behoud continue controle over de voortgang, planning en logistiek van uw bouwproject. Door
              periodiek vanuit identieke GPS-standpunten te vliegen, ontstaat een objectieve en betrouwbare
              visuele tijdlijn.
            </p>
            <ul className="feat">
              <li>
                <span>
                  <b>Nulmeting &amp; plaatsbeschrijving:</b> Gedetailleerde vastlegging van de omgeving,
                  openbare wegen en aanpalende percelen vóór aanvang der werken.
                </span>
              </li>
              <li>
                <span>
                  <b>Herhaalbare GPS-vlieglijnen:</b> Geautomatiseerde vluchten garanderen exact vergelijkbare
                  standpunten doorheen de verschillende bouwfases.
                </span>
              </li>
              <li>
                <span>
                  <b>Werflogistiek &amp; veiligheid:</b> Direct overzicht over materiaalstockage,
                  werfcirculatie, grondverzet en kraanposities.
                </span>
              </li>
              <li>
                <span>
                  <b>Rapportage &amp; overleg:</b> Direct bruikbaar beeldmateriaal voor werfvergaderingen,
                  communicatie met de bouwheer en investeerdersdossiers.
                </span>
              </li>
            </ul>
          </div>
        </article>
        <article className="svc-row" id="d3" data-num="03" aria-labelledby="d3-t">
          <div className="svc-row__media rv rv--l">
            <div
              className="view svc-row__view"
              role="img"
              aria-label="3D-weergave: een drone vliegt een raster af boven twee voorraadstapels; de puntenwolk groeit mee en wordt door een scanlijn omgezet in een 3D-mesh met volumemeting"
            >
              <canvas id="canvas-d3" aria-hidden="true" />
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
              <div className="view__hud" aria-hidden="true">
                <div className="hud-row hud-row--t">
                  <span className="hud-tag">
                    <i className="hud-dot" />
                    <span className="hud-tag__t">Stapel A / 3D-mesh</span>
                  </span>
                  <span className="hud-badge" data-status="">
                    Fotogrammetrie
                  </span>
                </div>
                <div className="hud-row hud-row--b">
                  <span className="hud-sm">Sleep om te draaien</span>
                  <span className="hud-count">Dienst 03 / 03</span>
                </div>
              </div>
            </div>
          </div>
          <div className="svc-row__body rv" data-d="120">
            <div className="svc-row__kop">
              <span className="svc__n">03</span>
              <span className="svc-row__lijn" aria-hidden="true" />
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
                  aria-hidden="true"
                >
                  <path d="M12 2.5 3.5 7.2v9.6L12 21.5l8.5-4.7V7.2Z" />
                  <path d="m3.5 7.2 8.5 4.7 8.5-4.7" />
                  <path d="M12 11.9v9.6" />
                </svg>
              </span>
            </div>
            <h2 className="svc-row__t" id="d3-t">
              Fotogrammetrie &amp; 3D-modellering
            </h2>
            <p>
              Zet luchtfotografie om in meetbare geometrische data. Wij leveren gegeorefereerde 3D-modellen en
              orthofoto’s op schaal die naadloos aansluiten op moderne CAD-, BIM- en GIS-pakketten.
            </p>
            <ul className="feat">
              <li>
                <span>
                  <b>Dense Point Clouds &amp; 3D-Mesh:</b> Puntenwolken (.LAS / .LAZ) en getextureerde
                  mesh-modellen voor as-built controles en architecturale visualisaties.
                </span>
              </li>
              <li>
                <span>
                  <b>Orthomozaïek op schaal:</b> Hoge-resolutie 2D-kaarten (GeoTIFF) zonder
                  perspectiefvervorming voor exacte oppervlakte- en afstandsmetingen.
                </span>
              </li>
              <li>
                <span>
                  <b>Volumemetingen:</b> Snelle en veilige kubatuurberekeningen van gronddepots, ontgravingen
                  en voorraadstapels.
                </span>
              </li>
              <li>
                <span>
                  <b>Terreinmodellen (DTM/DSM):</b> Inzicht in reliëf, hoogtelijnen en afschot van uw terrein
                  of werfzone.
                </span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
