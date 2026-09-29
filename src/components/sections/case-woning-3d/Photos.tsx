export function Photos() {
  return (
    <section className="sec cw-photos" id="opnames">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">De bronbeelden</span>
            <h2 data-split="">
              Wat de camera
              <br />
              <span className="grad">van dichtbij zag.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de bronbeelden">
            <span className="sc-section-note__meta">
              <b>03</b>DE OPNAMES
            </span>
            <p>
              Het model geeft het overzicht, de foto’s geven de details. Een selectie uit de 80 beelden,
              bijgesneden tot de woning en de eigen tuin: zonder nummerplaten, personen, buren of straat.
            </p>
          </aside>
        </div>
        <div className="cw-gallery">
          <button
            className="cw-photo cw-photo--wide rv"
            type="button"
            data-d="0"
            data-photo="/assets/img/woning-case/foto-achtergevel.webp"
            data-caption="Uitbouw aan de achtergevel met grote glaspartijen en het terras."
          >
            <img
              src="/assets/img/woning-case/foto-achtergevel-800.webp"
              width="800"
              height="519"
              loading="lazy"
              alt="Uitbouw aan de achtergevel met grote glaspartijen en een terras in keramische tegels"
            />
            <span className="cw-photo__label">
              <b>01</b>Achtergevel &amp; terras
            </span>
          </button>
          <button
            className="cw-photo rv"
            type="button"
            data-d="80"
            data-photo="/assets/img/woning-case/foto-dak.webp"
            data-caption="Plat dak met de zonnecollector, ventilatiekanalen, een dakopening met opstand en lichtkoepels."
          >
            <img
              src="/assets/img/woning-case/foto-dak-800.webp"
              width="800"
              height="533"
              loading="lazy"
              alt="Plat dak met de achterkant van de zonnecollector, ventilatiekanalen, een dakopening met opstand en lichtkoepels"
            />
            <span className="cw-photo__label">
              <b>02</b>Plat dak &amp; technieken
            </span>
          </button>
          <button
            className="cw-photo rv"
            type="button"
            data-d="160"
            data-photo="/assets/img/woning-case/foto-collector.webp"
            data-caption="Zonnecollector op een stalen frame, ventilatiepijpen en de dakopening."
          >
            <img
              src="/assets/img/woning-case/foto-collector-800.webp"
              width="800"
              height="533"
              loading="lazy"
              alt="Zonnecollector op een stalen frame, ventilatiepijpen en een dakopening op het platte dak"
            />
            <span className="cw-photo__label">
              <b>03</b>Collector &amp; doorvoeren
            </span>
          </button>
          <button
            className="cw-photo rv"
            type="button"
            data-d="240"
            data-photo="/assets/img/woning-case/foto-gevel.webp"
            data-caption="Gevelafwerking: baksteen, een lichte gevelplaat en de aansluiting bij het raam."
          >
            <img
              src="/assets/img/woning-case/foto-gevel-800.webp"
              width="800"
              height="533"
              loading="lazy"
              alt="Detail van de gevel in donkere baksteen met een lichte gevelplaat en een raam"
            />
            <span className="cw-photo__label">
              <b>04</b>Gevelafwerking
            </span>
          </button>
          <button
            className="cw-photo rv"
            type="button"
            data-d="320"
            data-photo="/assets/img/woning-case/foto-overkapping.webp"
            data-caption="Overkapping aan de tuinzijde, met het terras en het gazon."
          >
            <img
              src="/assets/img/woning-case/foto-overkapping-800.webp"
              width="800"
              height="533"
              loading="lazy"
              alt="Glazen overkapping aan de tuinzijde naast het terras en het gazon"
            />
            <span className="cw-photo__label">
              <b>05</b>Overkapping tuinzijde
            </span>
          </button>
        </div>
        <p className="cw-photos__note">
          Klik op een foto om ze groter te bekijken. Alle beelden zijn verkleind en zonder GPS-gegevens
          opgeslagen.
        </p>
      </div>
    </section>
  );
}
