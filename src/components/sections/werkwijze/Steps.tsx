import { processtappen } from "@/content/werkwijze";
import { ProcessRail } from "./ProcessRail";

// 5 STAPPEN — per stap: wat wij doen, wat u aanlevert en wat u op dat moment in handen hebt.
// De inhoud staat in src/content/werkwijze.ts; de opmaak in src/styles/werkwijze.css.
function Icoon({ paden }: { paden: string[] }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paden.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const kolomIcoon = {
  wij: ["M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5Z", "m9 12 2 2 4-4"],
  u: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    "M22 21v-2a4 4 0 0 0-3-3.87",
  ],
  resultaat: [
    "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z",
    "M14 3v5h5",
    "m9.5 14.5 2 2 3.5-4",
  ],
};

export function Steps() {
  return (
    <section className="sec proc" id="stappen" aria-labelledby="proc-t">
      <div className="wrap">
        <div className="proc__head">
          <div>
            <span className="eyebrow">Zo werken we</span>
            <h2 id="proc-t" data-split="">
              Vijf vaste stappen.
              <br />
              Eén aanspreekpunt.
            </h2>
          </div>
          <p className="lead rv" data-d="200">
            Elke opdracht volgt dezelfde structuur. Per stap ziet u wat wij doen, wat we van u nodig hebben en
            wat u op dat moment in handen hebt.
          </p>
        </div>

        <ProcessRail
          stappen={processtappen.map(({ id, nummer, titel, mijlpaal }) => ({ id, nummer, titel, mijlpaal }))}
        />

        <ol className="proc-list">
          {processtappen.map((stap) => (
            <li className="proc-step" id={stap.id} key={stap.id} aria-labelledby={`${stap.id}-t`}>
              <div className="proc-step__kop rv">
                <div className="proc-step__badge">
                  <span className="proc-step__n">{stap.nummer}</span>
                  <span className="proc-step__ico">
                    <Icoon paden={stap.icoon} />
                  </span>
                </div>
                <h3 className="proc-step__t" id={`${stap.id}-t`}>
                  {stap.titel}
                </h3>
                <p className="proc-step__intro">{stap.intro}</p>
              </div>

              <div className="proc-step__grid rv" data-d="120">
                <div className="proc-col">
                  <h4 className="proc-col__t">
                    <Icoon paden={kolomIcoon.wij} />
                    Wat wij doen
                  </h4>
                  <ul className="proc-col__list">
                    {stap.wij.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="proc-col">
                  <h4 className="proc-col__t">
                    <Icoon paden={kolomIcoon.u} />
                    Wat u aanlevert
                  </h4>
                  <ul className="proc-col__list">
                    {stap.u.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="proc-col proc-col--res">
                  <h4 className="proc-col__t">
                    <Icoon paden={kolomIcoon.resultaat} />
                    Resultaat
                  </h4>
                  <p className="proc-col__res">{stap.resultaat}</p>
                  <span className="proc-col__ms">{stap.mijlpaal}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
