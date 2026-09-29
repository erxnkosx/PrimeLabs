// HERO
export function Hero() {
  return (
    <section className="hero hero--home hero--scene">
      <span className="hero__aura" aria-hidden="true" />
      {/* tekst links: ongewijzigd */}
      <div className="wrap hero__in">
        <div className="hero__copy">
          <span className="eyebrow">Visuele inspectie vanuit de lucht</span>
          <h1 data-split="">
            Professionele
            <br />
            drone-
            <br />
            inspecties.
            <br />
            <span className="grad">Helder</span>
            <br />
            <span className="grad">vastgelegd.</span>
          </h1>
          <p className="hero__sub rv" data-d="240">
            Visuele drone-inspecties voor daken, gevels, werven en infrastructuur in België — met gerichte
            beelden en een overzichtelijk rapport.
          </p>
          <div className="hero__cta rv" data-d="340">
            <a className="btn btn--p" href="/offerte">
              Inspectie aanvragen{" "}
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
            </a>
            <a className="tlink" href="/diensten">
              Bekijk de diensten{" "}
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
            </a>
          </div>
          <div className="hero__facts rv" data-d="430">
            <span className="fact">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Gecertificeerde <br />
              uitvoering
            </span>
            <span className="fact">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                <path d="M14 3v5h5M9 13h6M9 17h4" />
              </svg>
              Zakelijke <br />
              rapportage
            </span>
            <span className="fact">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3.4" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
              </svg>
              Gericht op <br />
              relevante details
            </span>
          </div>
        </div>
      </div>
      {/* fotoscène: full-bleed rechts, vloeit weg onder de tekst */}
      <figure className="hs-scene">
        <div className="hs-photo">
          <div className="hs-stage">
            <img
              className="hs-img"
              src="/assets/img/broox-hero-1500.webp"
              srcSet="/assets/img/broox-hero-1500.webp 1500w, /assets/img/broox-hero-2200.webp 2200w, /assets/img/broox-hero-2800.webp 2800w"
              sizes="(max-width: 611px) 660px, (max-width: 944px) 108vw, (max-width: 1020px) 1020px, (max-width: 1180px) 100vw, max(1410px, calc(47.5vw + 277px))"
              width="2000"
              height="1333"
              fetchPriority="high"
              decoding="async"
              alt="Luchtopname van een gebouw met twee platte daken, zonnepanelen, een glazen gevel en een terras met parasols en schaduwdoeken, gezien vanaf een inspectiedrone."
            />
            {/* scanlaag:begin — gegenereerd uit de opgemeten hoeken (zie README) */}
            <svg
              className="hs-svg hs-svg--tint"
              viewBox="0 0 2000 1333"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* kegel: verzadigd violet, het sterkst bij de lens */}
                <linearGradient
                  id="plKegel"
                  x1="1338.8"
                  y1="274"
                  x2="943"
                  y2="644.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#8b5cf6" stopOpacity=".75" />
                  <stop offset=".3" stopColor="#7c3aed" stopOpacity=".6" />
                  <stop offset="1" stopColor="#6d28d9" stopOpacity=".45" />
                </linearGradient>
                <filter id="plWaas" x="-35%" y="-35%" width="170%" height="170%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
                {/* alles boven de dakomtrek: de kegel en zijn gloed stoppen op de dakrand */}
                <clipPath id="plKegelClip">
                  <path d="M0 0 L2000 0 L2000 443.1 L1387 600 L1133 665 L971 601 L1008 568.1 L741 624 L499 510 L0 274.9 Z" />
                </clipPath>
                <clipPath id="plDakClip">
                  <path d="M499 510 L953 436 L1233 521 L741 624 Z" />
                  <path d="M971 601 L1229 550 L1387 600 L1133 665 Z" />
                </clipPath>
                {/* balkon en schaduwdoek staan vóór de gevel: daar geen gevelscan */}
                <clipPath id="plGevelClip">
                  <path
                    clipRule="evenodd"
                    d="M0 0 H2000 V1333 H0 Z M1090 716 H1157 V792 H1090 Z M1358 663 L1336 697 L1305 723 L1283 740 L1380 740 L1373 707 L1362 675 Z"
                  />
                </clipPath>
              </defs>
              <path
                d="M499 510 L953 436 L1233 521 L741 624 Z M971 601 L1229 550 L1387 600 L1133 665 Z"
                fill="#8b5cf6"
                fillOpacity=".55"
              />
              <path
                d="M1133 685 L1385 621 L1380 706 L1133 776 Z"
                fill="#8b5cf6"
                fillOpacity=".5"
                clipPath="url(#plGevelClip)"
              />
              {/* de betonnen boeiboorden van beide dakplaten lichten mee op */}
              <path
                d="M499 510 L741 624 L1233 521 L1229 550 L971 601 L741 648 L499 532 Z M971 601 L1133 665 L1387 600 L1385 621 L1133 685 L971 621 Z"
                fill="#8b5cf6"
                fillOpacity=".5"
              />
              <g clipPath="url(#plKegelClip)">
                <path
                  d="M1338.8 274 L499 510 L741 624 L1008 568.1 L971 601 L1133 665 L1387 600 Z"
                  fill="url(#plKegel)"
                  filter="url(#plWaas)"
                  opacity=".5"
                />
                <path
                  d="M1338.8 274 L499 510 L741 624 L1008 568.1 L971 601 L1133 665 L1387 600 Z"
                  fill="url(#plKegel)"
                />
              </g>
            </svg>
            <svg
              className="hs-svg hs-svg--diepte"
              viewBox="0 0 2000 1333"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <g fill="#6d28d9" opacity=".18">
                <path d="M499 510 L953 436 L1233 521 L741 624 Z M971 601 L1229 550 L1387 600 L1133 665 Z" />
                <path d="M499 510 L741 624 L1233 521 L1229 550 L971 601 L741 648 L499 532 Z M971 601 L1133 665 L1387 600 L1385 621 L1133 685 L971 621 Z" />
                <path d="M1338.8 274 L499 510 L741 624 L1008 568.1 L971 601 L1133 665 L1387 600 Z" />
              </g>
            </svg>
            <svg
              className="hs-svg hs-svg--licht"
              viewBox="0 0 2000 1333"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* de stralen doven uit met de afstand tot de lens */}
                <radialGradient id="plStraal" cx="1338.8" cy="274" r="942" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#f6ecff" />
                  <stop offset=".42" stopColor="#f6ecff" stopOpacity=".8" />
                  <stop offset="1" stopColor="#f6ecff" stopOpacity=".3" />
                </radialGradient>
                <radialGradient
                  id="plStraalGloed"
                  cx="1338.8"
                  cy="274"
                  r="942"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#c98cff" />
                  <stop offset=".42" stopColor="#c98cff" stopOpacity=".8" />
                  <stop offset="1" stopColor="#c98cff" stopOpacity=".3" />
                </radialGradient>
                <radialGradient id="plStraalRand" cx="1338.8" cy="274" r="942" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#fbf6ff" />
                  <stop offset=".42" stopColor="#fbf6ff" stopOpacity=".85" />
                  <stop offset="1" stopColor="#fbf6ff" stopOpacity=".45" />
                </radialGradient>
                {/* licht bij de lens: de kegel begint helder en wordt verderop puur tint */}
                <radialGradient id="plKegelLicht" cx="1338.8" cy="274" r="693" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#e6d6ff" stopOpacity=".72" />
                  <stop offset=".16" stopColor="#b48cff" stopOpacity=".38" />
                  <stop offset=".36" stopColor="#9468f8" stopOpacity=".12" />
                  <stop offset=".6" stopColor="#8b5cf6" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="plVeeg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#f6ecff" stopOpacity="0" />
                  <stop offset=".5" stopColor="#f6ecff" stopOpacity=".42" />
                  <stop offset="1" stopColor="#f6ecff" stopOpacity="0" />
                </linearGradient>
                <filter id="plZacht" x="-35%" y="-35%" width="170%" height="170%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
                <filter id="plRand" x="-35%" y="-35%" width="170%" height="170%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              {/* gescande daken (opgemeten hoeken, zie README): oplichtend
               perspectiefraster, scanveeg en een neonrand met gloed */}
              <g className="hs-roof">
                <path
                  className="roof-grid-gloed"
                  d="M531.2 504.7 L776.7 616.5 M562.9 499.6 L811.7 609.2 M594 494.5 L845.9 602 M624.5 489.5 L879.4 595 M654.5 484.6 L912.2 588.1 M684 479.8 L944.4 581.4 M713 475.1 L975.9 574.8 M741.5 470.5 L1006.7 568.4 M769.5 465.9 L1037 562 M797 461.4 L1066.7 555.8 M824.1 457 L1095.7 549.7 M850.7 452.7 L1124.2 543.8 M876.9 448.4 L1152.2 537.9 M902.7 444.2 L1179.6 532.2 M928.1 440.1 L1206.6 526.5 M524.9 522.2 L983.6 445.3 M551.9 534.9 L1015.4 454.9 M580.1 548.2 L1048.3 464.9 M609.4 562 L1082.5 475.3 M640.1 576.5 L1117.9 486.1 M672.2 591.6 L1154.8 497.3 M705.8 607.4 L1193.1 508.9 M1003.8 594.5 L1165.7 656.6 M1035.5 588.3 L1197.1 648.6 M1066 582.2 L1227.4 640.9 M1095.5 576.4 L1256.5 633.4 M1124 570.8 L1284.5 626.2 M1151.6 565.3 L1311.5 619.3 M1178.2 560 L1337.6 612.7 M1204 554.9 L1362.7 606.2 M996 610.9 L1253.7 557.8 M1021.8 621.1 L1279 565.8 M1048.3 631.5 L1304.9 574 M1075.7 642.3 L1331.6 582.5 M1103.9 653.5 L1358.9 591.1"
                  fill="none"
                  stroke="#b877ff"
                  strokeWidth="3.5"
                  filter="url(#plZacht)"
                />
                <path
                  className="roof-grid"
                  d="M531.2 504.7 L776.7 616.5 M562.9 499.6 L811.7 609.2 M594 494.5 L845.9 602 M624.5 489.5 L879.4 595 M654.5 484.6 L912.2 588.1 M684 479.8 L944.4 581.4 M713 475.1 L975.9 574.8 M741.5 470.5 L1006.7 568.4 M769.5 465.9 L1037 562 M797 461.4 L1066.7 555.8 M824.1 457 L1095.7 549.7 M850.7 452.7 L1124.2 543.8 M876.9 448.4 L1152.2 537.9 M902.7 444.2 L1179.6 532.2 M928.1 440.1 L1206.6 526.5 M524.9 522.2 L983.6 445.3 M551.9 534.9 L1015.4 454.9 M580.1 548.2 L1048.3 464.9 M609.4 562 L1082.5 475.3 M640.1 576.5 L1117.9 486.1 M672.2 591.6 L1154.8 497.3 M705.8 607.4 L1193.1 508.9 M1003.8 594.5 L1165.7 656.6 M1035.5 588.3 L1197.1 648.6 M1066 582.2 L1227.4 640.9 M1095.5 576.4 L1256.5 633.4 M1124 570.8 L1284.5 626.2 M1151.6 565.3 L1311.5 619.3 M1178.2 560 L1337.6 612.7 M1204 554.9 L1362.7 606.2 M996 610.9 L1253.7 557.8 M1021.8 621.1 L1279 565.8 M1048.3 631.5 L1304.9 574 M1075.7 642.3 L1331.6 582.5 M1103.9 653.5 L1358.9 591.1"
                  fill="none"
                  stroke="#f6edff"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <g clipPath="url(#plDakClip)">
                  <rect
                    className="roof-sweep"
                    x="-200"
                    y="416"
                    width="200"
                    height="269"
                    fill="url(#plVeeg)"
                  />
                </g>
                <path
                  className="roof-halo"
                  d="M499 510 L953 436 L1233 521 L741 624 Z M971 601 L1229 550 L1387 600 L1133 665 Z"
                  fill="none"
                  stroke="#a66bff"
                  strokeWidth="5"
                  strokeLinejoin="round"
                  filter="url(#plRand)"
                />
                <path
                  className="roof-line"
                  d="M499 510 L953 436 L1233 521 L741 624 Z M971 601 L1229 550 L1387 600 L1133 665 Z"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <path
                  className="roof-onder"
                  d="M499 532 L741 648 L971 601 M971 621 L1133 685"
                  fill="none"
                  stroke="#f4e8ff"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  opacity=".7"
                />
              </g>
              {/* gescande gevel rechts: natuursteen en houten lamellen */}
              <g className="hs-gevel" clipPath="url(#plGevelClip)">
                <path
                  className="gevel-halo"
                  d="M1133 685 L1385 621 L1380 706 L1133 776 Z"
                  fill="none"
                  stroke="#a66bff"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  filter="url(#plRand)"
                />
                <path
                  className="gevel-grid"
                  d="M1160.2 678.1 L1159.6 768.5 M1186.9 671.3 L1185.8 761 M1213.2 664.6 L1211.5 753.8 M1239 658.1 L1236.8 746.6 M1264.4 651.6 L1261.6 739.5 M1289.3 645.3 L1286.1 732.6 M1313.8 639.1 L1310.1 725.8 M1337.9 633 L1333.8 719.1 M1361.7 626.9 L1357.1 712.5 M1133 715.8 L1383.3 649.7 M1133 746.1 L1381.6 678"
                  fill="none"
                  stroke="#c9a4ff"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="gevel-line"
                  d="M1133 685 L1385 621 L1380 706 L1133 776 Z"
                  fill="none"
                  stroke="#f4e8ff"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </g>
              {/* de lichtkegel uit de hoofdlens: stralen, gloed en randen. Ze staan
               vast op de dakranden; alleen de drone zweeft (laag 4). */}
              <g className="hs-kegel" clipPath="url(#plKegelClip)">
                <path
                  className="fan-licht"
                  d="M1338.8 274 L499 510 L741 624 L1008 568.1 L971 601 L1133 665 L1387 600 Z"
                  fill="url(#plKegelLicht)"
                />
                <g
                  className="fan-rays fan-rays--gloed"
                  stroke="url(#plStraalGloed)"
                  strokeWidth="4.5"
                  filter="url(#plZacht)"
                >
                  <line x1="1338.8" y1="274" x2="535.8" y2="527.3" />
                  <line x1="1338.8" y1="274" x2="572.6" y2="544.7" />
                  <line x1="1338.8" y1="274" x2="609.4" y2="562" />
                  <line x1="1338.8" y1="274" x2="646.3" y2="579.4" />
                  <line x1="1338.8" y1="274" x2="683.1" y2="596.7" />
                  <line x1="1338.8" y1="274" x2="719.9" y2="614.1" />
                  <line x1="1338.8" y1="274" x2="758" y2="620.4" />
                  <line x1="1338.8" y1="274" x2="797.8" y2="612.1" />
                  <line x1="1338.8" y1="274" x2="837.6" y2="603.8" />
                  <line x1="1338.8" y1="274" x2="877.5" y2="595.4" />
                  <line x1="1338.8" y1="274" x2="917.3" y2="587.1" />
                  <line x1="1338.8" y1="274" x2="957.1" y2="578.8" />
                  <line x1="1338.8" y1="274" x2="997" y2="570.4" />
                  <line x1="1338.8" y1="274" x2="998.4" y2="611.8" />
                  <line x1="1338.8" y1="274" x2="1036.2" y2="626.8" />
                  <line x1="1338.8" y1="274" x2="1074.1" y2="641.7" />
                  <line x1="1338.8" y1="274" x2="1111.9" y2="656.7" />
                  <line x1="1338.8" y1="274" x2="1150.5" y2="660.5" />
                  <line x1="1338.8" y1="274" x2="1189.9" y2="650.4" />
                  <line x1="1338.8" y1="274" x2="1229.3" y2="640.4" />
                  <line x1="1338.8" y1="274" x2="1268.7" y2="630.3" />
                  <line x1="1338.8" y1="274" x2="1308.2" y2="620.2" />
                  <line x1="1338.8" y1="274" x2="1347.6" y2="610.1" />
                </g>
                <g className="fan-rays" stroke="url(#plStraal)" strokeWidth="1.55" strokeLinecap="round">
                  <line style={{ "--i": "0" }} x1="1338.8" y1="274" x2="535.8" y2="527.3" />
                  <line style={{ "--i": "1" }} x1="1338.8" y1="274" x2="572.6" y2="544.7" />
                  <line style={{ "--i": "2" }} x1="1338.8" y1="274" x2="609.4" y2="562" />
                  <line style={{ "--i": "3" }} x1="1338.8" y1="274" x2="646.3" y2="579.4" />
                  <line style={{ "--i": "4" }} x1="1338.8" y1="274" x2="683.1" y2="596.7" />
                  <line style={{ "--i": "5" }} x1="1338.8" y1="274" x2="719.9" y2="614.1" />
                  <line style={{ "--i": "6" }} x1="1338.8" y1="274" x2="758" y2="620.4" />
                  <line style={{ "--i": "7" }} x1="1338.8" y1="274" x2="797.8" y2="612.1" />
                  <line style={{ "--i": "8" }} x1="1338.8" y1="274" x2="837.6" y2="603.8" />
                  <line style={{ "--i": "9" }} x1="1338.8" y1="274" x2="877.5" y2="595.4" />
                  <line style={{ "--i": "10" }} x1="1338.8" y1="274" x2="917.3" y2="587.1" />
                  <line style={{ "--i": "11" }} x1="1338.8" y1="274" x2="957.1" y2="578.8" />
                  <line style={{ "--i": "12" }} x1="1338.8" y1="274" x2="997" y2="570.4" />
                  <line style={{ "--i": "13" }} x1="1338.8" y1="274" x2="998.4" y2="611.8" />
                  <line style={{ "--i": "14" }} x1="1338.8" y1="274" x2="1036.2" y2="626.8" />
                  <line style={{ "--i": "15" }} x1="1338.8" y1="274" x2="1074.1" y2="641.7" />
                  <line style={{ "--i": "16" }} x1="1338.8" y1="274" x2="1111.9" y2="656.7" />
                  <line style={{ "--i": "17" }} x1="1338.8" y1="274" x2="1150.5" y2="660.5" />
                  <line style={{ "--i": "18" }} x1="1338.8" y1="274" x2="1189.9" y2="650.4" />
                  <line style={{ "--i": "19" }} x1="1338.8" y1="274" x2="1229.3" y2="640.4" />
                  <line style={{ "--i": "20" }} x1="1338.8" y1="274" x2="1268.7" y2="630.3" />
                  <line style={{ "--i": "21" }} x1="1338.8" y1="274" x2="1308.2" y2="620.2" />
                  <line style={{ "--i": "22" }} x1="1338.8" y1="274" x2="1347.6" y2="610.1" />
                  <line
                    className="fan-ray--achter"
                    style={{ "--i": "1" }}
                    x1="1338.8"
                    y1="274"
                    x2="591.9"
                    y2="494.9"
                  />
                  <line
                    className="fan-ray--achter"
                    style={{ "--i": "4" }}
                    x1="1338.8"
                    y1="274"
                    x2="684.7"
                    y2="479.7"
                  />
                  <line
                    className="fan-ray--achter"
                    style={{ "--i": "7" }}
                    x1="1338.8"
                    y1="274"
                    x2="777.6"
                    y2="464.6"
                  />
                  <line
                    className="fan-ray--achter"
                    style={{ "--i": "10" }}
                    x1="1338.8"
                    y1="274"
                    x2="870.4"
                    y2="449.5"
                  />
                  <line
                    className="fan-ray--achter"
                    style={{ "--i": "13" }}
                    x1="1338.8"
                    y1="274"
                    x2="962.9"
                    y2="439"
                  />
                  <line
                    className="fan-ray--achter"
                    style={{ "--i": "16" }}
                    x1="1338.8"
                    y1="274"
                    x2="1053"
                    y2="466.3"
                  />
                  <line
                    className="fan-ray--achter"
                    style={{ "--i": "19" }}
                    x1="1338.8"
                    y1="274"
                    x2="1143"
                    y2="493.7"
                  />
                </g>
                <g className="fan-randen" stroke="url(#plStraalRand)" strokeWidth="2.4" strokeLinecap="round">
                  <line x1="1338.8" y1="274" x2="499" y2="510" />
                  <line x1="1338.8" y1="274" x2="741" y2="624" />
                  <line x1="1338.8" y1="274" x2="1133" y2="665" />
                  <line x1="1338.8" y1="274" x2="1387" y2="600" />
                  <line className="fan-rand--binnen" x1="1338.8" y1="274" x2="953" y2="436" />
                  <line className="fan-rand--binnen" x1="1338.8" y1="274" x2="1008" y2="568.1" />
                </g>
              </g>
              {/* het stuk P→A2 is een buitenrand van de kegel, over de boeiboord: buiten
               plKegelClip, anders valt de halve lijn weg en leest de naad als snijfout */}
              <g className="fan-randen" stroke="url(#plStraalRand)" strokeWidth="2.4" strokeLinecap="round">
                <line x1="1008" y1="568.1" x2="971" y2="601" />
              </g>
            </svg>
            <svg
              className="hs-svg hs-svg--drone"
              viewBox="0 0 2000 1333"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* de lens: een klein witheet punt met een smalle lila rand */}
                <radialGradient id="plLens">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset=".3" stopColor="#fff" />
                  <stop offset=".55" stopColor="#d9b8ff" stopOpacity=".5" />
                  <stop offset="1" stopColor="#d9b8ff" stopOpacity="0" />
                </radialGradient>
                {/* rond de lens ligt de kegel óver de camera, tot voorbij de onderrand
                 van de behuizing (r 56, vanaf r 35 zacht uitlopend): zo lopen de
                 stralen ononderbroken uit de lens en niet van achter de drone.
                 Het uitlopen zit in de verlopen zelf, dus geen masker in de .rig. */}
                <radialGradient id="plKern" cx="1338.8" cy="274" r="56" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#fff" stopOpacity=".9" />
                  <stop offset=".5" stopColor="#e2cbff" stopOpacity=".6" />
                  <stop offset=".62" stopColor="#d8bcff" stopOpacity=".53" />
                  <stop offset=".81" stopColor="#c9a4ff" stopOpacity=".21" />
                  <stop offset="1" stopColor="#b98cff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="plKernStraal" cx="1338.8" cy="274" r="56" gradientUnits="userSpaceOnUse">
                  <stop offset=".62" stopColor="#fff" />
                  <stop offset=".81" stopColor="#fff" stopOpacity=".5" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g className="rig">
                <image
                  className="rig__drone"
                  href="/assets/img/drone.webp"
                  x="1130"
                  y="175"
                  width="500"
                  height="178.3"
                />
                <g className="rig__kern">
                  <path
                    d="M1338.8 274 L499 510 L741 624 L1008 568.1 L971 601 L1133 665 L1387 600 Z"
                    fill="url(#plKern)"
                  />
                  <g stroke="url(#plKernStraal)" strokeOpacity=".75" strokeWidth="1.3" strokeLinecap="round">
                    <line x1="1338.8" y1="274" x2="535.8" y2="527.3" />
                    <line x1="1338.8" y1="274" x2="572.6" y2="544.7" />
                    <line x1="1338.8" y1="274" x2="609.4" y2="562" />
                    <line x1="1338.8" y1="274" x2="646.3" y2="579.4" />
                    <line x1="1338.8" y1="274" x2="683.1" y2="596.7" />
                    <line x1="1338.8" y1="274" x2="719.9" y2="614.1" />
                    <line x1="1338.8" y1="274" x2="758" y2="620.4" />
                    <line x1="1338.8" y1="274" x2="797.8" y2="612.1" />
                    <line x1="1338.8" y1="274" x2="837.6" y2="603.8" />
                    <line x1="1338.8" y1="274" x2="877.5" y2="595.4" />
                    <line x1="1338.8" y1="274" x2="917.3" y2="587.1" />
                    <line x1="1338.8" y1="274" x2="957.1" y2="578.8" />
                    <line x1="1338.8" y1="274" x2="997" y2="570.4" />
                    <line x1="1338.8" y1="274" x2="998.4" y2="611.8" />
                    <line x1="1338.8" y1="274" x2="1036.2" y2="626.8" />
                    <line x1="1338.8" y1="274" x2="1074.1" y2="641.7" />
                    <line x1="1338.8" y1="274" x2="1111.9" y2="656.7" />
                    <line x1="1338.8" y1="274" x2="1150.5" y2="660.5" />
                    <line x1="1338.8" y1="274" x2="1189.9" y2="650.4" />
                    <line x1="1338.8" y1="274" x2="1229.3" y2="640.4" />
                    <line x1="1338.8" y1="274" x2="1268.7" y2="630.3" />
                    <line x1="1338.8" y1="274" x2="1308.2" y2="620.2" />
                    <line x1="1338.8" y1="274" x2="1347.6" y2="610.1" />
                  </g>
                </g>
                <circle className="fan-lens" cx="1338.8" cy="274" r="16" fill="url(#plLens)" />
                <circle cx="1338.8" cy="274" r="3" fill="#fff" />
              </g>
            </svg>
            {/* scanlaag:eind */}
          </div>
        </div>
        {/* aandachtspunten, in beeldcoördinaten van de opname (broox-hero-*.webp, 2000 × 1333):
           x-waarden ÷ 2000, y-waarden ÷ 1333. --tx/--ty = het punt op het gebouw,
           --ky = hoogte van de knik en van de kaart, --ax = waar de kaart hangt.
           Meten kan via index.html#kalibreer */}
        <div
          className="hs-stage hs-stage--ui"
          role="list"
          aria-label="Aandachtspunten in deze voorbeeldopname"
        >
          {/* Dakbedekking — kaart boven het dak; lijn naar rechts, dan recht omlaag op de zonnepanelen (790,484) */}
          <div
            className="hs-call hs-call--l"
            role="listitem"
            style={{
              "--tx": "39.5%",
              "--ty": "36.31%",
              "--ky": "28.51%",
              "--ax": "36.5%",
              "--in": ".8s",
              "--delay": "0s",
            }}
          >
            <span className="hs-lead hs-lead--v" aria-hidden="true" />
            <span className="hs-lead hs-lead--h" aria-hidden="true" />
            <span className="hs-knee" aria-hidden="true" />
            <span className="hs-pin" aria-hidden="true" />
            <div className="hs-tag">
              <span className="hs-tag__ico">
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
                  <path d="M3 11 12 4l9 7" />
                  <path d="M5 10v10h14V10" />
                  <path d="M9 20v-5h6v5" />
                </svg>
              </span>
              <span>
                <b>Dakbedekking</b>
                <small>Inspectie in detail</small>
              </span>
            </div>
          </div>
          {/* Afvoeren — kaart rechts van het gebouw; knik boven de achterrand van het grinddak, punt op de uitsparing in de opstand (1298,574) */}
          <div
            className="hs-call hs-call--r"
            role="listitem"
            style={{
              "--tx": "64.9%",
              "--ty": "43.06%",
              "--ky": "39.61%",
              "--ax": "72%",
              "--in": ".95s",
              "--delay": ".8s",
            }}
          >
            <span className="hs-lead hs-lead--v" aria-hidden="true" />
            <span className="hs-lead hs-lead--h" aria-hidden="true" />
            <span className="hs-knee" aria-hidden="true" />
            <span className="hs-pin" aria-hidden="true" />
            <div className="hs-tag">
              <span className="hs-tag__ico">
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
                  <path d="M6 3h12v3l-4 4v11h-4V10L6 6Z" />
                  <path d="M10 14h4" />
                </svg>
              </span>
              <span>
                <b>Afvoeren</b>
                <small>Controle op verstoppingen</small>
              </span>
            </div>
          </div>
          {/* Gevelzones — kaart rechts van het gebouw; lijn recht naar de natuursteenstrips (1190,722) */}
          <div
            className="hs-call hs-call--r"
            role="listitem"
            style={{
              "--tx": "59.5%",
              "--ty": "54.16%",
              "--ky": "54.16%",
              "--ax": "72%",
              "--in": "1.1s",
              "--delay": "1.6s",
            }}
          >
            <span className="hs-lead hs-lead--h" aria-hidden="true" />
            <span className="hs-pin" aria-hidden="true" />
            <div className="hs-tag">
              <span className="hs-tag__ico">
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
                  <rect x="3" y="4" width="18" height="16" rx="1.5" />
                  <path d="M3 9.3h18M3 14.6h18M9 4v5.3M15 4v5.3M6 9.3v5.3M12 9.3v5.3M18 9.3v5.3M9 14.6V20M15 14.6V20" />
                </svg>
              </span>
              <span>
                <b>Gevelzones</b>
                <small>Voegen en beschadigingen</small>
              </span>
            </div>
          </div>
        </div>
        {/* resultatenbalk */}
        <div className="hs-bar rv" data-d="520">
          <div className="hs-stat">
            <b>3</b>
            <span>Aandachtspunten</span>
          </div>
          <div className="hs-stat">
            <b>24</b>
            <span>Beelden</span>
          </div>
          <div className="hs-stat">
            <b>
              PDF{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                <path d="M14 3v5h5M9 13h6M9 17h4" />
              </svg>
            </b>
            <span>Rapport</span>
          </div>
          {/* er is (nog) geen video: de tegel leidt naar de vijf stappen op de
             werkwijzepagina. Komt er een film van een minuut, dan kan het
             pijltje weer een playknop worden. */}
          <a className="hs-video" href="/werkwijze#stappen">
            <span className="hs-video__thumb">
              <img
                src="/assets/img/broox-thumb.webp"
                width="320"
                height="200"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <i className="hs-play" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </i>
            </span>
            <span className="hs-video__t">
              Zo verloopt
              <br />
              een inspectie{" "}
              <small>
                in 5 stappen{" "}
                <svg
                  width="13"
                  height="13"
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
              </small>
            </span>
          </a>
        </div>
      </figure>
      <div className="hs-rule">
        <span className="hs-rule__l">
          Slimmere inspecties.
          <br />
          Sterkere gebouwen.
        </span>
        <span className="hs-rule__r">Puurs-Sint-Amands, België</span>
      </div>
    </section>
  );
}
