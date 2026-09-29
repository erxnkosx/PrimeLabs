// CTA
export function Cta() {
  return (
    <section className="sec sec--tight" style={{ paddingTop: "0" }}>
      <div className="wrap">
        <div className="cta rv">
          <div className="cta__c">
            <span className="eyebrow">Uw project als volgende case?</span>
            <h2>Laat uw locatie professioneel vastleggen.</h2>
            <p>
              Projectbeelden worden alleen als referentie gebruikt wanneer de opdrachtgever daarvoor
              toestemming geeft.
            </p>
          </div>
          <a className="btn btn--p" href="/offerte">
            Bespreek uw inspectie{" "}
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
      </div>
    </section>
  );
}
