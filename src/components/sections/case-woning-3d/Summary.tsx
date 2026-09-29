export function Summary() {
  return (
    <section className="sc-summary" aria-label="Samenvatting van de case">
      <div className="wrap sc-summary__grid">
        <div className="sc-summary__intro">
          <span className="eyebrow">In één oogopslag</span>
          <p>Van losse dronebeelden naar één model dat de opdrachtgever zelf kan verkennen.</p>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">80</span>
          <span className="sc-metric__label">dronebeelden in één vlucht</span>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">3D</span>
          <span className="sc-metric__label">interactief model, rondom</span>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">7,4</span>
          <span className="sc-metric__label">MB voor de webversie</span>
        </div>
      </div>
    </section>
  );
}
