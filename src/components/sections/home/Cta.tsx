// CTA
export function Cta() {
  return (
    <section className="sec sec--tight" id="contact">
      <div className="wrap">
        <div className="cta rv">
          <div className="cta__c">
            <span className="eyebrow">Klaar om te starten?</span>
            <h2>Beschrijf kort wat u wilt laten inspecteren.</h2>
            <p>U ontvangt een gerichte reactie met de juiste aanpak en een transparant voorstel.</p>
          </div>
          <a className="btn btn--p" href="/offerte">
            Vraag een offerte aan{" "}
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
