export function Approach() {
  return (
    <section className="sec sc-brief" id="aanpak">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">Wat de case laat zien</span>
            <h2 data-split="">
              Voortgang die je
              <br />
              <span className="grad">naast elkaar legt.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de aanpak">
            <span className="sc-section-note__meta">
              <b>01</b>DE AANPAK
            </span>
            <p>
              Een werf verandert elke dag. Door op vaste momenten vanuit de lucht op te nemen, ontstaat een
              tijdlijn waarop bouwheer, aannemer en projectteam dezelfde feiten zien.
            </p>
          </aside>
        </div>
        <div className="sc-brief-grid">
          <article className="card sc-brief-card rv" data-tilt="" data-d="0">
            <div className="card__top">
              <span className="card__num">01</span>
              <span className="card__ico" aria-hidden="true">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 8V6a2 2 0 0 1 2-2h2" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                  <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
                  <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
            </div>
            <h3>Een vaste referentie</h3>
            <p>
              Het overzicht van dag 1 legt de toestand van de werf vast: wat staat er nog, waar liggen de
              containers en de machines.
            </p>
            <a className="tlink tlink--b card__link" href="#tijdlijn">
              Bekijk dag 1{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="card__bar" aria-hidden="true" />
          </article>
          <article className="card sc-brief-card rv" data-tilt="" data-d="100">
            <div className="card__top">
              <span className="card__num">02</span>
              <span className="card__ico" aria-hidden="true">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 15-6.7" />
                  <path d="M21 4v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7" />
                  <path d="M3 20v-5h5" />
                </svg>
              </span>
            </div>
            <h3>Voortgang per opnamedag</h3>
            <p>
              Een dag later toont de video hoe de afbraak vordert. Naast elkaar gelegd wordt het verschil
              zichtbaar, zonder dat iemand de werf op moet.
            </p>
            <a className="tlink tlink--b card__link" href="#video">
              Bekijk de video{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="card__bar" aria-hidden="true" />
          </article>
          <article className="card sc-brief-card rv" data-tilt="" data-d="200">
            <div className="card__top">
              <span className="card__num">03</span>
              <span className="card__ico" aria-hidden="true">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="7" width="8" height="10" rx="1" />
                  <rect x="13" y="7" width="8" height="10" rx="1" />
                  <path d="M5 11h4M15 11h4" />
                </svg>
              </span>
            </div>
            <h3>Werflogistiek in één beeld</h3>
            <p>
              Containers, machines, werfhekken en circulatie: het overzicht laat zien hoe de werf
              georganiseerd is, en of dat verandert.
            </p>
            <a className="tlink tlink--b card__link" href="#tijdlijn">
              Bekijk het overzicht{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <span className="card__bar" aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  );
}
