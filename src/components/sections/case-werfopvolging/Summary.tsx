export function Summary() {
  return (
    <section className="sc-summary" aria-label="Samenvatting van de case">
      <div className="wrap sc-summary__grid">
        <div className="sc-summary__intro">
          <span className="eyebrow">In één oogopslag</span>
          <p>Twee momenten op dezelfde werf, naast elkaar gelegd als een visuele tijdlijn.</p>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">02</span>
          <span className="sc-metric__label">opnamedagen, één dag uit elkaar</span>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">48</span>
          <span className="sc-metric__label">MP overzichtsfoto op dag 1</span>
        </div>
        <div className="sc-metric">
          <span className="sc-metric__n">4K</span>
          <span className="sc-metric__label">video van de afbraak op dag 2</span>
        </div>
      </div>
    </section>
  );
}
