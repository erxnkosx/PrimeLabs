// SECTOREN
export function Sectors() {
  return (
    <section className="sec" id="sectoren">
      <div className="wrap">
        <span className="eyebrow">Voor professionals in België</span>
        <h2 data-split="" style={{ maxWidth: "22ch", marginBottom: "46px" }}>
          Drone-inspecties voor situaties waarin duidelijkheid telt.
        </h2>
        <div className="grid-3">
          <article
            className="card rv"
            data-tilt=""
            data-d="0"
            style={{ background: "linear-gradient(170deg,#f9f7fd,#fff)" }}
          >
            <div className="card__top">
              <span className="card__num">01</span>
              <span className="card__ico">
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
                  <path d="M2 20h20" />
                  <path d="M4 20V9l8-5 8 5v11" />
                  <path d="M10 20v-6h4v6" />
                </svg>
              </span>
            </div>
            <h3>Aannemers &amp; nutsbedrijven</h3>
            <p>Voor plaatsbeschrijvingen, voortgang en documentatie voor en na de werken.</p>
            <span className="card__bar" />
          </article>
          <article
            className="card rv"
            data-tilt=""
            data-d="110"
            style={{ background: "linear-gradient(170deg,#f9f7fd,#fff)" }}
          >
            <div className="card__top">
              <span className="card__num">02</span>
              <span className="card__ico">
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
                  <rect x="3" y="3" width="8" height="18" rx="1.5" />
                  <rect x="13" y="8" width="8" height="13" rx="1.5" />
                  <path d="M6 7h2M6 11h2M6 15h2M16 12h2M16 16h2" />
                </svg>
              </span>
            </div>
            <h3>Gebouwbeheerders &amp; syndici</h3>
            <p>Voor een eerste visuele beoordeling van daken, gevels en moeilijk bereikbare delen.</p>
            <span className="card__bar" />
          </article>
          <article
            className="card rv"
            data-tilt=""
            data-d="220"
            style={{ background: "linear-gradient(170deg,#f9f7fd,#fff)" }}
          >
            <div className="card__top">
              <span className="card__num">03</span>
              <span className="card__ico">
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
                  <path d="M2 21h20" />
                  <path d="M5 21V7l5-3v17" />
                  <path d="M10 11h6a2 2 0 0 1 2 2v8" />
                  <path d="M14 15h1M14 18h1" />
                </svg>
              </span>
            </div>
            <h3>Industrie &amp; infrastructuur</h3>
            <p>Voor periodieke visuele controles en een herhaalbare registratie van de toestand.</p>
            <span className="card__bar" />
          </article>
        </div>
      </div>
    </section>
  );
}
