// RESULTAAT (dark, 3D dossier)
export function Results() {
  return (
    <section className="sec on-dark" id="werkwijze">
      <div className="on-dark__bg" aria-hidden="true" />
      <div className="on-dark__gr" aria-hidden="true" />
      <div className="wrap">
        <div className="on-dark__in">
          <div>
            <span className="eyebrow">Het resultaat</span>
            <h2 data-split="">
              Van vlucht naar
              <br />
              een bruikbaar
              <br />
              inspectiedossier.
            </h2>
            <p className="lead rv" data-d="200" style={{ margin: "26px 0 34px" }}>
              Geen ongesorteerde map vol foto’s. U ontvangt een logisch opgebouwd rapport met overzicht,
              detail en locatiecontext.
            </p>
            <a className="btn btn--w rv" data-d="280" href="/werkwijze">
              Bekijk onze werkwijze{" "}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <ol className="steps">
            <li className="rv" data-d="60">
              <span className="steps__n">01</span>
              <div>
                <h3>Overzichtsbeelden</h3>
                <p>De locatie en algemene toestand in context.</p>
              </div>
            </li>
            <li className="rv" data-d="140">
              <span className="steps__n">02</span>
              <div>
                <h3>Genummerde aandachtspunten</h3>
                <p>Elk relevant punt gekoppeld aan duidelijke detailbeelden.</p>
              </div>
            </li>
            <li className="rv" data-d="220">
              <span className="steps__n">03</span>
              <div>
                <h3>Beknopt inspectierapport</h3>
                <p>Een professioneel PDF-dossier voor bespreking en opvolging.</p>
              </div>
            </li>
          </ol>
        </div>
        {/* CSS 3D dossier: vouwt open tijdens het scrollen */}
        <div className="stack" aria-hidden="true">
          <div className="stack__i">
            <div className="sheet sheet--1">
              <div className="sheet__hd">
                <span>01 · Overzicht</span>
                <span>JPG</span>
              </div>
              <div className="tiles">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="rows">
                <u />
                <u />
              </div>
            </div>
            <div className="sheet sheet--2">
              <div className="sheet__hd">
                <span>02 · Aandachtspunten</span>
                <span>01–03</span>
              </div>
              <div className="tiles">
                <i />
                <i />
                <i />
              </div>
              <div className="rows">
                <u />
                <u />
                <u />
                <u />
              </div>
            </div>
            <div className="sheet sheet--3">
              <div className="sheet__hd">
                <span>03 · Rapport</span>
                <span>PDF</span>
              </div>
              <div className="pdf">
                <b>Inspectiedossier</b>
                <span>PRIMELABS · 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
