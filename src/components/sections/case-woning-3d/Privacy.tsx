export function Privacy() {
  return (
    <section className="sc-private-section">
      <div className="wrap sc-private-card rv">
        <div className="sc-private-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
          </svg>
        </div>
        <div className="sc-private-copy">
          <span className="eyebrow">Publiek en privé</span>
          <h2>
            Een publieke case.
            <br />
            Een privé model.
          </h2>
          <p>
            Op de website staat een bijgesneden model zonder adres. Het volledige model, alle bronfoto’s en de
            ruwe scan horen in het afgeschermde klantendossier.
          </p>
        </div>
        <div className="sc-private-levels">
          <div>
            <span>Publieke pagina</span>
            <strong>Bijgesneden model en geselecteerde beelden</strong>
          </div>
          <div>
            <span>Privé dossier</span>
            <strong>Volledig model en alle 80 bronfoto’s</strong>
          </div>
          <a href="/offerte" className="sc-private-link">
            Bespreek een 3D-opname <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
