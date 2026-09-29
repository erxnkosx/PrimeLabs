export function Lab() {
  return (
    <div className="lab">
      <div className="lab__top">
        <div>
          <a className="brand" href="/" style={{ marginBottom: "26px" }}>
            <span className="mark" aria-hidden="true" />
            <span className="rule" aria-hidden="true" />
            <span className="brand__txt">
              <span className="brand__name">Primelabs</span>
              <span className="brand__sub">DRONE INSPECTIES</span>
            </span>
          </a>
          <h1>3D-prototypes: vier richtingen</h1>
          <p>
            Elk paneel is een losse, draaibare scène. Sleep om te draaien. De richtingen zijn combineerbaar —
            A + B samen is wat ik zou voorstellen, met D voor de home-hero.
          </p>
        </div>
      </div>
      <span className="lab__warn">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 8v5M12 17h.01" />
          <circle cx="12" cy="12" r="9" />
        </svg>
        Testpagina — hiervan staat nog niets op de site{" "}
      </span>
      <div className="labgrid">
        {/* referentie */}
        <article className="lab__card lab__card--wide">
          <div className="lab__view">
            <span className="lab__tag">
              <i className="hud-dot" />
              Nu op de site
            </span>
            <canvas id="c0" />
            <span className="lab__hint">Sleep om te draaien</span>
          </div>
          <div className="lab__body">
            <div>
              <span className="mono">Referentie</span>
              <h2>Huidig gebouw</h2>
              <p>
                Één doos met een dakplaat, een bijgebouw en twee dakblokjes. Technisch netjes, maar zonder
                openingen, schaal of silhouet — daardoor blijft het een doos.
              </p>
            </div>
            <ul className="lab__list">
              <li>1 hoofdvolume, rechthoekig</li>
              <li>geen ramen of deuren</li>
              <li>vlakke, egale gevels</li>
              <li>geen terrein of omgeving</li>
            </ul>
          </div>
        </article>
        {/* A */}
        <article className="lab__card">
          <div className="lab__view">
            <span className="lab__tag">
              <i className="hud-dot" />
              Optie A · architecturaal detail
            </span>
            <canvas id="cA" />
            <span className="lab__hint">Sleep om te draaien</span>
          </div>
          <div className="lab__body" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="mono">Optie A</span>
              <h2>Architecturaal detail</h2>
              <p>
                Het gebouw wordt echte architectuur: L-vorm, terugliggende bovenbouw, zadeldak met nok en
                dakkapel, en overal de details waaraan je schaal afleest.
              </p>
            </div>
            <ul className="lab__list">
              <li>L-vormig volume met setback</li>
              <li>zadeldak, nok en dakkapel</li>
              <li>ramenraster via instancing</li>
              <li>plint en verdiepinglijnen</li>
              <li>entree met luifel en deur</li>
              <li>dakrand/opstand op vlak dak</li>
              <li>schoorsteen, kanalen, ventilatie</li>
              <li>HVAC met roosters en draaiende fan</li>
              <li>zonnepanelen op frame</li>
              <li>ladder, stoep en aanrijpad</li>
            </ul>
            <div className="lab__meta">
              <span>~90 extra regels code</span>
              <span>0 kB extra download</span>
              <span>1 InstancedMesh per gevel</span>
            </div>
          </div>
        </article>
        {/* B */}
        <article className="lab__card">
          <div className="lab__view">
            <span className="lab__tag">
              <i className="hud-dot" />
              Optie B · materialen &amp; licht
            </span>
            <canvas id="cB" />
            <span className="lab__hint">Sleep om te draaien</span>
          </div>
          <div className="lab__body" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="mono">Optie B</span>
              <h2>Materialen &amp; licht</h2>
              <p>
                Zelfde massa als nu, andere afwerking: de gevels krijgen een procedurele textuur met een
                ramenraster, de randen een fresnel-gloed, en het gebouw staat écht op de grond.
              </p>
            </div>
            <ul className="lab__list">
              <li>gevel-textuur op canvas</li>
              <li>enkele oplichtende ruiten</li>
              <li>emissive glow per raam</li>
              <li>fresnel/rim-licht op de vlakken</li>
              <li>contactschaduw op de grond</li>
              <li>zachte spiegeling onder het volume</li>
              <li>verdiepinglijnen in de textuur</li>
              <li>geen extra geometrie</li>
            </ul>
            <div className="lab__meta">
              <span>goedkoopste optie</span>
              <span>textuur 192×128 px, in code getekend</span>
            </div>
          </div>
        </article>
        {/* C */}
        <article className="lab__card">
          <div className="lab__view">
            <span className="lab__tag">
              <i className="hud-dot" />
              Optie C · scan-puntenwolk
            </span>
            <canvas id="cC" />
            <span className="lab__hint">Sleep om te draaien</span>
          </div>
          <div className="lab__body" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="mono">Optie C</span>
              <h2>Scan-puntenwolk</h2>
              <p>
                Het gebouw bestaat uit 26.000 scanpunten die opbouwen terwijl het scanvlak omhoog loopt.
                Onderscheidend: het leest als drone-scandata in plaats van een 3D-modelletje.
              </p>
            </div>
            <ul className="lab__list">
              <li>26.000 punten, op het oppervlak gesampled</li>
              <li>eigen shader: gescand = zichtbaar</li>
              <li>oplichtende band op de scanhoogte</li>
              <li>zachte spriteput per punt</li>
              <li>dunne contourlijnen voor de vorm</li>
              <li>hoeft geen ramen te tekenen</li>
            </ul>
            <div className="lab__meta">
              <span>1 draw call</span>
              <span>past bij &quot;drone-survey&quot;</span>
              <span>minder letterlijk gebouw</span>
            </div>
          </div>
        </article>
        {/* D */}
        <article className="lab__card">
          <div className="lab__view">
            <span className="lab__tag">
              <i className="hud-dot" />
              Optie D · omgeving / stadsblok
            </span>
            <canvas id="cD" />
            <span className="lab__hint">Sleep om te draaien</span>
          </div>
          <div className="lab__body" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="mono">Optie D</span>
              <h2>Omgeving / stadsblok</h2>
              <p>
                Het doelgebouw staat in een echte straat: buurpanden met verschillende hoogtes en daktypes,
                stoepranden, bomen en lantaarns. Alleen het te inspecteren pand licht op.
              </p>
            </div>
            <ul className="lab__list">
              <li>7 panden, wisselende hoogte en dakvorm</li>
              <li>doelgebouw helder, rest gedempt</li>
              <li>straat met middenstreep en stoepranden</li>
              <li>bomen, lantaarns, geparkeerde volumes</li>
              <li>achterste rij in silhouet + fog</li>
              <li>scanvolume alleen rond het doelpand</li>
            </ul>
            <div className="lab__meta">
              <span>zwaarste scène</span>
              <span>instancing voor streep/ladder/ramen</span>
              <span>sterk in de hero</span>
            </div>
          </div>
        </article>
      </div>
      <p className="lab__foot">
        <strong>Mijn voorstel:</strong> A + B als nieuwe standaard voor alle scènes (detail én afwerking), D
        alleen in de home-hero omdat daar ruimte is voor een volledige locatie, en C als variant voor het
        scanmoment op de werkwijze-pagina. Zeg welke je wil en ik bouw het in — dan vervangt het de gebouwen
        in de vier bestaande scènes.{" "}
      </p>
    </div>
  );
}
