// PAGE HERO
export function Hero() {
  return (
    <section className="hero hero--page" style={{ paddingBottom: "0" }}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap">
        <span className="eyebrow">Onze diensten</span>
        <h1 data-split="" style={{ maxWidth: "20ch" }}>
          Gerichte beeldregistratie voor technische dossiers.
        </h1>
        <p className="hero__sub rv" data-d="240" style={{ maxWidth: "56ch", marginTop: "28px" }}>
          Van een eenmalige controle tot periodieke opvolging en een meetbaar 3D-model: elke opdracht wordt
          afgestemd op uw informatiebehoefte en uw dossier, niet op het aantal vliegminuten.
        </p>
        <div className="strip rv" data-d="320" style={{ marginTop: "52px" }}>
          <div>
            <b>03</b>
            <span>Diensten</span>
          </div>
          <div>
            <b>1</b>
            <span>Dossier per opdracht</span>
          </div>
          <div>
            <b>PDF</b>
            <span>Standaard rapport</span>
          </div>
          <div>
            <b>BE</b>
            <span>Werkgebied</span>
          </div>
        </div>
      </div>
    </section>
  );
}
