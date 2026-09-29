// HERO
export function Hero() {
  return (
    <section className="hero hero--page" style={{ paddingBottom: "0" }}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap">
        <span className="eyebrow">Werkwijze</span>
        <h1 data-split="" style={{ maxWidth: "22ch" }}>
          Van inspectievraag naar helder dossier.
        </h1>
        <p className="hero__sub rv" data-d="240" style={{ maxWidth: "56ch", marginTop: "28px" }}>
          Een vaste aanpak zorgt dat de beelden bruikbaar zijn voor besluitvorming, overleg en verdere
          technische beoordeling.
        </p>
        <div className="strip rv" data-d="320" style={{ marginTop: "52px" }}>
          <div>
            <b>05</b>
            <span>Stappen</span>
          </div>
          <div>
            <b>1</b>
            <span>Vast aanspreekpunt</span>
          </div>
          <div>
            <b>PDF</b>
            <span>Opleverformaat</span>
          </div>
          <div>
            <b>=</b>
            <span>Herhaalbare structuur</span>
          </div>
        </div>
      </div>
    </section>
  );
}
