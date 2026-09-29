export function Video() {
  return (
    <section className="sec ww-video-section" id="video">
      <div className="wrap">
        <div className="sc-section-head">
          <div>
            <span className="eyebrow">De video</span>
            <h2 data-split="">
              Dag 2 in beweging:
              <br />
              <span className="grad">de afbraak zelf.</span>
            </h2>
          </div>
          <aside className="sc-section-note rv" data-d="140" aria-label="Toelichting bij de video">
            <span className="sc-section-note__meta">
              <b>03</b>DE VIDEO
            </span>
            <p>
              Een stilstaand beeld toont de toestand, video toont het werk. Handig voor werfvergaderingen en
              om de voortgang te delen met wie er niet bij was.
            </p>
          </aside>
        </div>
        <div className="ww-video rv" data-d="120">
          <figure className="ww-video__frame">
            <video
              controls
              playsInline
              preload="none"
              poster="/assets/img/werf-case/video-poster.webp"
              width="1920"
              height="1080"
              aria-label="Video van 29 seconden: een graafmachine met sorteergrijper breekt de laatste muurdelen van de woning af, gezien vanuit de lucht"
            >
              <source src="/assets/video/werf-1706.mp4" type="video/mp4" />
              Je browser speelt deze video niet af.
              <a href="/assets/video/werf-1706.mp4">Download de video (18 MB)</a>.
            </video>
            <figcaption>
              17 juni 2026 · 29 seconden, opgenomen in 4K en hier getoond in Full HD. Geen geluid.
            </figcaption>
          </figure>
          <aside className="sc-finding-card ww-video__card" aria-labelledby="video-card-title">
            <div className="sc-finding-card__top">
              <span className="sc-status">
                <i aria-hidden="true" />
                Opgeleverd
              </span>
              <span className="sc-finding-card__id">VIDEO · DAG 2</span>
            </div>
            <span className="sc-finding-card__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="6" width="13" height="12" rx="2" />
                <path d="m16 10 5-3v10l-5-3" />
              </svg>
            </span>
            <h3 id="video-card-title">Over deze opname</h3>
            <p className="sc-finding-card__desc">
              Een rustige hangvlucht naast de werf, zodat de machine en het puin in één kader blijven.
            </p>
            <dl className="sc-finding-data">
              <div>
                <dt>Opname</dt>
                <dd>4K, 30 beelden per seconde</dd>
              </div>
              <div>
                <dt>Duur</dt>
                <dd>29 seconden</dd>
              </div>
              <div>
                <dt>Webversie</dt>
                <dd>Full HD, 18 MB, laadt pas bij afspelen</dd>
              </div>
              <div>
                <dt>Dag 1</dt>
                <dd>Foto van 48 MP vanaf 56 m hoogte</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
