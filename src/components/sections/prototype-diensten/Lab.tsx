export function Lab() {
  return (
    <div className="lab">
      <a className="brand" href="/diensten" style={{ marginBottom: "24px" }}>
        <span className="mark" aria-hidden="true" />
        <span className="rule" aria-hidden="true" />
        <span className="brand__txt">
          <span className="brand__name">Primelabs</span>
          <span className="brand__sub">DRONE INSPECTIES</span>
        </span>
      </a>
      <h1>Dienstenscènes, los bekeken</h1>
      <p className="intro">
        Dezelfde drie scènes als op de dienstenpagina, maar elk in een eigen paneel zodat je ze naast elkaar
        kunt beoordelen. Sleep om te draaien. Op de echte pagina staat elke scène in haar eigen rij naast de
        tekst van de dienst, en draait ze alleen zolang ze in beeld is.
      </p>
      <div className="labgrid" id="grid" />
    </div>
  );
}
