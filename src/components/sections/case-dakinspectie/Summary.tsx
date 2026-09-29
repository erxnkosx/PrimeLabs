export function Summary() {
  return (
    <section className="sc-summary" aria-label="Samenvatting van de case">
      <div className="wrap sc-summary__grid">
        <div className="sc-summary__intro">
          <span className="eyebrow">In één oogopslag</span>
          <p>Van een volledig dakoverzicht naar genummerde observaties en een technisch rapport.</p>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">02</span>
          <span className="sc-metric__label">genummerde observaties</span>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">4.200</span>
          <span className="sc-metric__label">m² dak en PV-installatie</span>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">PDF</span>
          <span className="sc-metric__label">inspectiedossier als oplevering</span>
        </div>
      </div>
    </section>
  );
}
