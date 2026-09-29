export function RoofPlan() {
  return (
    <section className="sc-plan-section" id="dakplan">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">Oriëntatie op het dak</span>
            <h2 data-split="">
              Van dakvlak
              <br />
              naar <span className="grad">paneeladres.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de dakoriëntatie">
            <span className="sc-section-note__meta">
              <b>03</b>DE LOCATIE
            </span>
            <p>
              Een overzichtelijk dakplan maakt de bevinding bruikbaar voor iemand die het dak niet zelf heeft
              gezien. De precieze aanduiding wordt pas ingevuld wanneer de positie aan de originele opname of
              het legplan is bevestigd.
            </p>
          </aside>
        </div>
        <div className="sc-plan-card rv" data-d="100">
          <div className="sc-plan-card__image">
            <img
              src="/assets/img/speculoos-case/dak-overzicht-960.webp"
              width="960"
              height="600"
              loading="lazy"
              alt="Bovenaanzicht van het productiedak met zonnepanelen en lichtstraten"
            />
            <button
              className="sc-expand-image"
              type="button"
              data-open-plan=""
              aria-label="Vergroot het dakoverzicht"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M8 8H5M8 8v-3M16 8h3M16 8V5M8 16H5M8 16v3M16 16h3M16 16v3" />
              </svg>
              Vergroot foto{" "}
            </button>
          </div>
          <div className="sc-plan-card__body">
            <span className="sc-kicker">Voorstel voor de rapportage</span>
            <h3>Een vaste adressering voor elke observatie</h3>
            <p>Gebruik een eenvoudige structuur die ook in het PDF-dossier terugkomt:</p>
            <div className="sc-address-example" aria-label="Voorbeeld van een paneeladres">
              <span>
                <b>Veld</b>
                <i>A</i>
              </span>
              <span aria-hidden="true">/</span>
              <span>
                <b>Rij</b>
                <i>—</i>
              </span>
              <span aria-hidden="true">/</span>
              <span>
                <b>Paneel</b>
                <i>—</i>
              </span>
            </div>
            <p className="sc-plan-note">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
              </svg>
              Rij en paneel blijven open tot het paneeladres door de opdrachtgever of installateur bevestigd
              is.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
