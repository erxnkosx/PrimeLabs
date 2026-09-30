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
              We brengen dak- en geveldelen gedetailleerd in beeld, ook waar ze vanaf de grond moeilijk te
              beoordelen zijn. Zo krijgt u een duidelijk overzicht van zichtbare aandachtspunten, zonder het
              dak te betreden.
            </p>
            <ul className="feat">
              <li>
                <span>
                  <b>Dakbedekking en installaties:</b> Visuele controle van dakpannen, roofing, EPDM,
                  dakdoorvoeren en de zichtbare staat van zonnepanelen en HVAC-installaties.
                </span>
              </li>
              <li>
                <span>
                  <b>Gevels en aansluitingen:</b> Vastlegging van zichtbare scheuren, vorstschade, loszittend
                  voegwerk en aandachtspunten aan gevel- en dakaansluitingen.
                </span>
              </li>
              <li>
                <span>
                  <b>Schadevaststelling en periodieke controle:</b> Gedateerde beelden van zichtbare schade,
                  bijvoorbeeld na een storm, of voor de opvolging van een gebouw doorheen de tijd.
                </span>
              </li>
              <li>
                <span>
                  <b>Visueel inspectierapport (PDF):</b> Genummerde aandachtspunten met overzichts- en
                  detailfoto’s, een aanduiding van de locatie en een concrete toelichting.
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
              aria-label="3D-weergave: een werf in uitvoering waarrond de drone een vast ingesteld vliegpatroon langs acht waypoints volgt"
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
              Volg de voortgang van uw bouwproject met beelden op vaste momenten. Door telkens hetzelfde
              ingestelde vliegpatroon met waypoints te gebruiken, ontstaat een overzichtelijke visuele
              tijdlijn van de verschillende bouwfases.
            </p>
            <ul className="feat">
              <li>
                <span>
                  <b>Nulmeting en omgevingsopname:</b> Gedateerde beelden van de werf, de openbare weg en de
                  zichtbare omgeving vóór de start van de werken.
                </span>
              </li>
              <li>
                <span>
                  <b>Herhaalbare waypointvluchten:</b> Bij opeenvolgende bezoeken vliegen we volgens hetzelfde
                  vooraf ingestelde vliegpatroon. Dat levert beelden vanuit zoveel mogelijk vergelijkbare
                  standpunten op.
                </span>
              </li>
              <li>
                <span>
                  <b>Werfinrichting en voortgang:</b> Overzicht van de bouwfases, materiaalopslag,
                  bereikbaarheid en de zichtbare inrichting van de werf.
                </span>
              </li>
              <li>
                <span>
                  <b>Rapportage en overleg:</b> Geordend beeldmateriaal voor werfvergaderingen, communicatie
                  met de bouwheer en documentatie van de voortgang.
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
              aria-label="3D-weergave: een drone vliegt een raster af boven een woning met platte daken en haar tuin, met terras, gazon, glazen overkapping en schuur; de puntenwolk groeit mee en wordt door een scanlijn omgezet in een 3D-mesh, waarna het platte dak wordt opgemeten"
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
                    <span className="hud-tag__t">Woning / 3D-mesh</span>
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
