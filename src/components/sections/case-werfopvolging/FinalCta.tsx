export function FinalCta() {
  return (
    <section className="sec sec--tight sc-final-cta">
      <div className="wrap">
        <div className="cta rv">
          <div className="cta__c">
            <span className="eyebrow">Uw werf in beeld?</span>
            <h2>Volg uw werf van nulmeting tot oplevering.</h2>
            <p>
              Bespreek de intervallen, de standpunten en wat u per ronde wilt ontvangen: foto’s, video of een
              tijdlijn.
            </p>
          </div>
          <a className="btn btn--p" href="/offerte">
            Vraag een voorstel aan{" "}
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
