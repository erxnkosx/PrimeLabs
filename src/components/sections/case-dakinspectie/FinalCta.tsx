export function FinalCta() {
  return (
    <section className="sec sec--tight sc-final-cta">
      <div className="wrap">
        <div className="cta rv">
          <div className="cta__c">
            <span className="eyebrow">Uw locatie als volgende case?</span>
            <h2>Maak van complexe beelden een helder dossier.</h2>
            <p>
              Bespreek welke dakzones u in beeld wilt brengen en hoe de bevindingen het best gedeeld worden.
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
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
