export function Inspection() {
  return (
    <section className="sc-model-section sc-insp-section" id="inspectie">
      <div className="sc-model-glow" aria-hidden="true" />
      <div className="wrap sc-model-content">
        <div className="sc-section-head sc-section-head--dark">
          <div>
            <span className="eyebrow">De inspectie in beeld</span>
            <h2 data-split="">
              Van dakoverzicht
              <br />
              <span className="sc-light-grad">naar genummerde observaties.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de inspectie">
            <span className="sc-section-note__meta">
              <b>02</b>DE OPNAME
            </span>
            <p>
              Het volledige dak is vanuit de lucht in beeld gebracht. Het overzicht toont de ligging van de
              PV-velden, lichtstraten en dakvlakken; de observaties zoomen in op wat aandacht vraagt.
            </p>
          </aside>
        </div>
        <figure className="sc-insp-overview rv" data-d="120">
          <button
            className="sc-insp-overview__photo"
            type="button"
            data-photo="/assets/img/speculoos-case/dak-overzicht.webp"
            data-caption="Loodrecht bovenaanzicht van het productiedak, samengesteld uit de dronebeelden."
          >
            <img
              src="/assets/img/speculoos-case/dak-overzicht.webp"
              srcSet="/assets/img/speculoos-case/dak-overzicht-960.webp 960w, /assets/img/speculoos-case/dak-overzicht.webp 1600w"
              sizes="(max-width: 900px) 100vw, 1200px"
              width="1600"
              height="1000"
              loading="lazy"
              alt="Loodrecht bovenaanzicht van het productiedak: vier rijen zonnepanelen, twee lichtstraten en een lager plat dak met lichtkoepels"
            />
            <span className="sc-insp-tag">
              <i aria-hidden="true" />
              DAKOVERZICHT · LOODRECHT BOVENAANZICHT
            </span>
            <span className="sc-insp-marker sc-insp-marker--01" aria-hidden="true">
              01
            </span>
            <span className="sc-insp-marker sc-insp-marker--02" aria-hidden="true">
              02
            </span>
          </button>
          <figcaption>
            Loodrecht bovenaanzicht van het productiedak, samengesteld uit de dronebeelden. De genummerde
            markeringen tonen de zones van observatie 01 en 02; klik om te vergroten.
          </figcaption>
        </figure>
        <div className="sc-obs-grid" id="observaties">
          <article className="sc-obs rv" data-d="0" aria-labelledby="obs-01-t">
            <header className="sc-obs__head">
              <span className="sc-obs__id">OBSERVATIE #01</span>
              <span className="sc-status">
                <i aria-hidden="true" />
                Vastgesteld
              </span>
            </header>
            <h3 id="obs-01-t">Controle PV-klemmen en celbeschadiging</h3>
            <button
              className="sc-obs__photo"
              type="button"
              data-photo="/assets/img/speculoos-case/obs-01.webp"
              data-caption="Observatie 01 · PV-veld: rijen modules met hun frames en bevestiging, van bovenaf."
            >
              <img
                src="/assets/img/speculoos-case/obs-01-800.webp"
                width="800"
                height="533"
                loading="lazy"
                alt="Detail van het PV-veld van bovenaf: rijen zonnepanelen met frames en bevestiging, en een lichtstraat"
              />
              <span className="sc-obs__zoom" aria-hidden="true">
                Vergroot
              </span>
            </button>
            <dl className="sc-obs__facts">
              <div>
                <dt>Gecontroleerd</dt>
                <dd>Bevestigingsklemmen, paneelranden en het celoppervlak van de PV-velden</dd>
              </div>
              <div>
                <dt>Vastgesteld</dt>
                <dd>Zichtbare beschadiging aan een zonnepaneel</dd>
              </div>
              <div>
                <dt>Locatie</dt>
                <dd>Paneeladres volgt uit het rapport en het dakplan</dd>
              </div>
              <div>
                <dt>Vervolg</dt>
                <dd>Technische beoordeling door de installateur</dd>
              </div>
            </dl>
            <p className="sc-obs__note">
              De vaststelling is visueel. Oorzaak, elektrische werking en opbrengst horen bij de installateur.
            </p>
          </article>
          <article className="sc-obs rv" data-d="120" aria-labelledby="obs-02-t">
            <header className="sc-obs__head">
              <span className="sc-obs__id">OBSERVATIE #02</span>
              <span className="sc-status sc-status--check">
                <i aria-hidden="true" />
                Te beoordelen
              </span>
            </header>
            <h3 id="obs-02-t">Dakrand- en afwateringscontrole</h3>
            <button
              className="sc-obs__photo"
              type="button"
              data-photo="/assets/img/speculoos-case/obs-02.webp"
              data-caption="Observatie 02 · Donkere zones op de dakbedekking tussen twee PV-rijen."
            >
              <img
                src="/assets/img/speculoos-case/obs-02-800.webp"
                width="800"
                height="533"
                loading="lazy"
                alt="Detail van de dakbedekking tussen twee rijen zonnepanelen met donkere zones op het dakvlak"
              />
              <span className="sc-obs__zoom" aria-hidden="true">
                Vergroot
              </span>
            </button>
            <button
              className="sc-obs__photo sc-obs__photo--strip"
              type="button"
              data-photo="/assets/img/speculoos-case/obs-02-rand.webp"
              data-caption="Observatie 02 · Dakrand en opstand aan de hoek van het PV-dak."
            >
              <img
                src="/assets/img/speculoos-case/obs-02-rand-800.webp"
                width="800"
                height="386"
                loading="lazy"
                alt="Detail van de dakrand en de opstand aan de hoek van het dak met zonnepanelen en een lichtstraat"
              />
              <span className="sc-obs__zoom" aria-hidden="true">
                Vergroot
              </span>
            </button>
            <dl className="sc-obs__facts">
              <div>
                <dt>Gecontroleerd</dt>
                <dd>Dakranden, opstanden, lichtstraten en de afwatering van het dakvlak</dd>
              </div>
              <div>
                <dt>Zichtbaar</dt>
                <dd>Donkere zones op de dakbedekking tussen de PV-rijen</dd>
              </div>
              <div>
                <dt>Niet vast te stellen</dt>
                <dd>Of het om stilstaand water, vervuiling of vocht gaat</dd>
              </div>
              <div>
                <dt>Vervolg</dt>
                <dd>Controle van afschot en afvoeren door de dakdekker</dd>
              </div>
            </dl>
            <p className="sc-obs__note">
              Een beeld van bovenaf toont de zone, niet de oorzaak. Het rapport vermeldt de positie ten
              opzichte van de PV-rijen.
            </p>
          </article>
        </div>
        <aside className="sc-report-mini rv" data-d="160" aria-labelledby="report-mini-t">
          <div className="sc-report-mini__icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
              <path d="M14 3v5h5" />
              <path d="M9 13h6M9 17h4" />
            </svg>
          </div>
          <div className="sc-report-mini__copy">
            <span className="sc-overline">
              <i aria-hidden="true" />
              OPGELEVERD
            </span>
            <h3 id="report-mini-t">Technisch inspectierapport</h3>
            <p>
              Het overzicht, de genummerde observaties en de detailbeelden, gebundeld in één PDF voor de
              opdrachtgever en de installateur.
            </p>
          </div>
          <dl className="sc-report-mini__specs">
            <div>
              <dt>Oplevering</dt>
              <dd>PDF-rapport</dd>
            </div>
            <div>
              <dt>Resolutie</dt>
              <dd>48 MP</dd>
            </div>
            <div>
              <dt>Dekking</dt>
              <dd>100 % visueel</dd>
            </div>
            <div>
              <dt>Oppervlakte</dt>
              <dd>4.200 m²</dd>
            </div>
            <div>
              <dt>Observaties</dt>
              <dd>02, genummerd</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
