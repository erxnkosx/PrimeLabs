// CTA
export function Cta() {
  return (
    <section className="sec sec--tight" id="contact" style={{ paddingTop: "0" }}>
      <div className="wrap">
        <div className="cta rv">
          <div className="cta__c">
            <span className="eyebrow">Een concrete locatie?</span>
            <h2>Bezorg ons de inspectievraag.</h2>
            <p>Met het adres, het doel en enkele foto’s kunnen we meestal snel de aanpak bepalen.</p>
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
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
