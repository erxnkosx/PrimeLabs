// HERO + FORMULIER
export function RequestHero() {
  return (
    <section className="hero hero--page" id="aanvraag">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap quote">
        {/* linkerkolom */}
        <div>
          <span className="eyebrow">Offerte aanvragen</span>
          <h1 data-split="" style={{ fontSize: "clamp(2.4rem,4.6vw,3.7rem)" }}>
            Vertel ons wat u<br />
            wilt laten inspecteren.
          </h1>
          <p className="hero__sub rv" data-d="200" style={{ marginTop: "24px", maxWidth: "46ch" }}>
            Hoe concreter de locatie en inspectievraag, hoe gerichter we de haalbaarheid en prijs kunnen
            beoordelen.
          </p>
          <ul className="infos rv" data-d="280">
            <li>
              <span className="ico">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>Actief in België</span>
            </li>
            <li>
              <span className="ico">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <a href="mailto:info@primelabs.be">info@primelabs.be</a>
            </li>
            <li>
              <span className="ico">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L21 14.5v3a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 3.5 5.7A2.5 2.5 0 0 1 6 3Z" />
                </svg>
              </span>
              <a href="tel:+32478261704">+32 478 26 17 04</a>
            </li>
          </ul>
          {/* 3D locatiescène */}
          <div
            className="view view--sm rv rv--s"
            data-d="340"
            style={{ marginTop: "30px" }}
            role="img"
            aria-label="3D-weergave van een locatie in een omgevingsraster, met een oplichtende markering op het te inspecteren gebouw."
          >
            <canvas id="beaconCanvas" aria-hidden="true" />
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
            <div className="view__hud" aria-hidden="true">
              <div className="hud-row hud-row--t">
                <span className="hud-tag">
                  <i className="hud-dot" />
                  <span>Locatie / uw project</span>
                </span>
                <span>België</span>
              </div>
              <div
                className="hud-row"
                style={{ bottom: "16px", fontSize: ".53rem", color: "rgba(198,172,236,.5)" }}
              >
                <span>Sleep om te draaien</span>
                <span className="hud-sm">Bereikbaarheid wordt vooraf gecheckt</span>
              </div>
            </div>
          </div>
          <div className="tips rv" data-d="400">
            <h4>Vermeld bij voorkeur:</h4>
            <ul>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.5 12.5 2.5 2.5 4.5-5" />
                </svg>
                het adres en type locatie
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.5 12.5 2.5 2.5 4.5-5" />
                </svg>
                het doel van de inspectie
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.5 12.5 2.5 2.5 4.5-5" />
                </svg>
                de gewenste timing
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.5 12.5 2.5 2.5 4.5-5" />
                </svg>
                eventuele plannen of referentiefoto’s
              </li>
            </ul>
          </div>
        </div>
        {/* formulier */}
        <div className="form rv rv--s" data-d="160" id="quoteForm">
          <div className="form__body">
            <div className="form__head">
              <h2>Inspectieaanvraag</h2>
              <div className="form__meter" aria-hidden="true">
                <div className="form__bar">
                  <i id="formBar" />
                </div>
                <span className="form__cnt" id="formCnt">
                  0 van 6 velden
                </span>
              </div>
            </div>
            <form id="quote" noValidate>
              <div className="fgrid">
                <label className="field">
                  <span>
                    Naam <em>*</em>
                  </span>
                  <input type="text" name="naam" placeholder="Uw naam" autoComplete="name" required />
                  <span className="field__err">Vul uw naam in.</span>
                </label>
                <label className="field">
                  <span>Bedrijf</span>
                  <input type="text" name="bedrijf" placeholder="Bedrijfsnaam" autoComplete="organization" />
                </label>
                <label className="field">
                  <span>
                    E-mailadres <em>*</em>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="naam@bedrijf.be"
                    autoComplete="email"
                    required
                  />
                  <span className="field__err">Vul een geldig e-mailadres in.</span>
                </label>
                <label className="field">
                  <span>Telefoon</span>
                  <input type="tel" name="telefoon" placeholder="+32 ..." autoComplete="tel" />
                </label>
              </div>
              <label className="field">
                <span>
                  Type inspectie <em>*</em>
                </span>
                <span className="sel">
                  <select name="type" required defaultValue="">
                    <option value="">Selecteer een dienst</option>
                    <option>Visuele dak- en gevelinspectie</option>
                    <option>Periodieke werfopvolging (met nulmeting)</option>
                    <option>Fotogrammetrie &amp; 3D-modellering</option>
                    <option>Nog te bepalen: we stemmen het samen af</option>
                  </select>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
                <span className="field__err">Kies een type inspectie.</span>
              </label>
              <label className="field">
                <span>
                  Adres <em>*</em>
                </span>
                <input
                  type="text"
                  name="adres"
                  placeholder="Straat, huisnummer en gemeente"
                  autoComplete="street-address"
                  required
                />
                <span className="field__err">Vul het adres van de locatie in.</span>
              </label>
              <label className="field">
                <span>
                  Uw inspectievraag <em>*</em>
                </span>
                <textarea
                  name="vraag"
                  required
                  placeholder="Beschrijf kort welke zones u wilt laten vastleggen en waarvoor u het resultaat gebruikt."
                />
                <span className="field__err">Beschrijf kort wat u wilt laten vastleggen.</span>
              </label>
              <label className="check" id="consentWrap">
                <input type="checkbox" name="consent" required />
                <span className="check__box">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7" />
                  </svg>
                </span>
                <span>
                  Ik ga ermee akkoord dat Primelabs mijn gegevens gebruikt om deze aanvraag te beantwoorden.{" "}
                  <span style={{ color: "var(--muted)" }}>
                    (Het privacybeleid wordt hier gelinkt zodra het online staat.)
                  </span>
                </span>
              </label>
              <button className="btn btn--p" type="submit">
                Aanvraag versturen{" "}
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
              </button>
              <p className="form__note">
                Uw gegevens worden uitsluitend gebruikt om uw aanvraag te behandelen.
              </p>
            </form>
          </div>
          {/* na verzenden */}
          <div className="form__done" id="quoteDone" role="status" aria-live="polite">
            <div className="done__ico">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
            </div>
            <h3>Uw aanvraag staat klaar</h3>
            <p>
              Uw mailprogramma opent met onderstaande aanvraag naar <strong>info@primelabs.be</strong>. Opent
              er niets? Kopieer de tekst en mail of bel ons gerust.
            </p>
            <div className="done__box" id="doneBox" />
            <div className="done__row">
              {" "}
              <button className="btn btn--p" type="button" id="copyBtn">
                Kopieer de aanvraag
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
                </svg>{" "}
              </button>{" "}
              <a className="tlink" href="tel:+32478261704">
                Of bel +32 478 26 17 04
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
                </svg>{" "}
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
