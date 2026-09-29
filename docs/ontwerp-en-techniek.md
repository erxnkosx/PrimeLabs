> **Oorspronkelijke technische documentatie** van de statische site, ongewijzigd overgenomen.
> Alle uitleg over ontwerp, kalibratie, scènes en randgevallen blijft geldig. Alleen de
> bestandslocaties zijn veranderd bij de overstap naar Next.js:
>
> | Vroeger | Nu |
> |---|---|
> | `index.html`, `diensten.html`, … | `src/app/(site)/…/page.tsx` + secties in `src/components/sections/<pagina>/` |
> | `case-speculoosfabriek.html` | `/portfolio/dakinspectie-speculoosfabriek-puurs` |
> | `case-werf.html` | `/portfolio/werfopvolging-sloopwerf` |
> | `case-woning.html` | `/portfolio/3d-model-woning` |
> | `prototype.html`, `prototype-diensten.html` | `/prototype`, `/prototype/diensten` |
> | `assets/css/*.css` | `src/styles/legacy/*.css` |
> | `assets/js/*.js` | `src/scripts/*.js` (geladen door `src/components/scripts/PageScripts.tsx`) |
> | `assets/img`, `assets/video`, `assets/models` | `public/assets/…` (zelfde namen) |
> | `index.html#kalibreer` | `/#kalibreer` |
> | FAQ-teksten in `werkwijze.html` | `src/content/faq.ts` |
> | form-TODO in `assets/js/main.js` | `src/scripts/main.js` (zoek op `TODO`) |
>
> De lokale server (`server.js`, `.claude/launch.json`) is vervangen door `npm run dev`.

---

# Primelabs Drone Inspecties — redesign (3D & motion)

Zes pagina's, herontworpen met behoud van de huisstijl (violet/paars, diepdonker
paars, witte en lavendel vlakken, genummerde kaarten, uppercase eyebrow-labels,
Nederlandse copy) — met het echte logo en een kleurenschaal die exact uit dat logo
gesampled is.

## Bestanden

| Bestand | Inhoud |
|---|---|
| `index.html` | Home: hero met full-bleed inspectie-opname, scanlaag, aandachtspunten en cijferbalk, marquee-band, diensten (3 tilt-cards), donker resultaatblok met 3D-dossier, sectoren, CTA |
| `diensten.html` | Diensten: hero + cijferstrip, **drie hoofddiensten in een zig-zag, elke rij met een eigen 3D-canvas**, scope-panel, CTA |
| `werkwijze.html` | Werkwijze: 5 stappen met een **scroll-gestuurde 3D-fasescène**, "wat u mag verwachten" (donker), FAQ-accordeon, CTA |
| `portfolio.html` | Portfolio: hero, **cases gesorteerd per dienst** (snelnavigatie + groepen `#dienst-01`–`#dienst-03`, zelfde nummering als `diensten.html#d1`–`#d3`), donker blok met voorbeeldopname + dossier-opbouw, referentiebeleid, CTA |
| `case-speculoosfabriek.html` | Case 01 (dienst 01, visuele dak- en gevelinspectie), **zonder 3D**: dakoverzicht met genummerde zones, observatie #01 (PV-klemmen en celbeschadiging) en #02 (dakrand en afwatering) met detailbeelden, samenvatting van het rapport (PDF · 48 MP · 100 % visueel · 4.200 m²), dakplan, dossierflow, afbakening |
| `case-werf.html` | Case 02 (dienst 02, periodieke werfopvolging): een sloopwerf op twee opnamedagen: 48 MP-overzicht van 16 juni, tijdlijn met feitelijke observaties per dag, 4K-video van 17 juni (hier 1080p), werkwijze, afbakening |
| `case-woning.html` | Case 03 (dienst 03, fotogrammetrie & 3D): interactief Gaussian-splatmodel van een woning met platte daken, vier standpunten, bovenaanzicht, bronfoto’s met lichtbak, werkwijze, afbakening |
| `offerte.html` | Offerte: aanvraagformulier met voortgangsmeter en validatie, contactkolom met 3D-locatiescène, checklist, "na uw aanvraag" |
| `assets/css/style.css` | Volledig designsysteem (tokens, componenten, motion, responsive, reduced-motion) |
| `assets/css/hero-scene.css` | De fotoscène van de home-hero (laadt na `style.css`) |
| `assets/js/hero-scene.js` | Kalibratiemodus voor de pins (`index.html#kalibreer`) |
| `assets/js/scene.js` | WebGL-scènes (three.js r150): `hero()`, `process()`, `beacon()` + de bouwstenen-kit `PL3D.kit()` |
| `assets/js/main.js` | Preloader, regel-reveals, scrollvoortgang, tilt, magnetische knoppen, counters, stap ↔ 3D-koppeling (werkwijze), dienstrijen ↔ eigen 3D-scène (diensten), FAQ, formulier |
| `assets/js/scene-services.js` | De drie dienstenscènes + `PL3D.serviceRows` (bouwt en tekent alleen wat in beeld is; alleen geladen op diensten.html) |
| `assets/css/speculoos-case.css` | Responsive vormgeving voor de nieuwe casepreview |
| `assets/js/case-inspectie.js` | Case 01: opent het vergrote dakoverzicht en de detailbeelden (`<dialog>`); geen three.js |
| `assets/css/case-werf.css` | Case 02: tijdlijn met "+1 dag"-stap en videoblok; hergebruikt `.sc-obs` en de lichtbak uit `speculoos-case.css` |
| `assets/css/case-woning.css` | Aanvullingen voor case 03 (standpunten, fotogalerij, lichtbak); laadt na `speculoos-case.css`, waarvan de `sc-*`-componenten gedeeld worden |
| `assets/js/case-woning.js` | Splat-viewer voor case 03: laadt de PlayCanvas-engine (2.22.6, jsDelivr) en het model pas op klik; eigen orbit (slepen, rechts slepen/twee vingers, scroll/knijpen, pijltjestoetsen), standpunten, autorotatie, pauze buiten beeld |
| `assets/models/woning-3d.sog` | Het gepubliceerde model van case 03 (7,4 MB, 410.454 splats): de woning en de eigen tuin |
| `assets/img/woning-case/` | Renders uit het model (poster, bovenaanzicht) en vijf geselecteerde bronfoto’s, verkleind en zonder EXIF/GPS |
| `prototype.html` | Testpagina: vier richtingen voor de 3D-gebouwen, naast het huidige model |
| `prototype-diensten.html` | Testpagina: elke dienstscène in een eigen paneel |
| `assets/img/primelabs-logo.webp` | Het originele logo — bron voor zowel het lockup als het uitgesneden P-teken |
| `assets/img/broox-hero-1500/2200/2800.webp` | De hero-opname (BROOX, terraskant) zonder overlays, in drie breedtes |
| `assets/img/broox-thumb.webp` | Miniatuur voor de werkwijzetegel in de resultatenbalk |
| `assets/img/broox-back.jpg` | Bronfoto (100 MP, 155 MB) — niet gebruikt door de site, niet uploaden |
| `assets/img/hero-inspectie.webp` | De vorige hero-opname (voorkant) — niet meer gebruikt |
| `assets/img/speculoos-case/` | Echte beelden, geen mock-ups: `dak-overzicht` is een loodrecht bovenaanzicht (orthobeeld) van de hal, gerenderd uit het ODM-model met de fotokleuren, zonder belichting; `obs-01`, `obs-02` en `obs-02-rand` zijn uitsneden daaruit. De vroegere conceptvisualisaties staan niet meer in de site |
| `assets/img/cases/` | Portfoliothumbnails: `case-speculoos-dak` (orthobeeld uit het ODM-model) en `case-woning-drone` (+ `-800`, dronefoto van de woning, bijgesneden tot de woning en de oprit; geen nummerplaten of personen). De werf gebruikt `werf-case/dag1-overzicht` |
| `assets/img/werf-case/` | Case 02: `dag1-overzicht` is een uitsnede uit DJI-DNG 0040 (16 juni, 8064 × 6048 raw, zelf ontwikkeld), `dag2-sloop` en `video-poster` zijn 4K-frames uit DJI-video 0059 (17 juni). Vervaagd: een arbeider, de nummerplaten van pick-up en aanhangwagen en het winkelopschrift op de gevel |
| `assets/video/werf-1706.mp4` | De video van dag 2, van HEVC 4K naar H.264 1080p (5 Mbit/s, 18 MB, geen geluid); `preload="none"` met poster |
| `assets/img/drone.webp` | De drone (DJI Mavic 4 Pro), uitgesneden met transparante achtergrond |
| `server.js` | Mini statische dev-server (`node server.js` → http://localhost:4321) |

## Lokaal bekijken

```bash
node server.js
```

De previewserver bindt aan `127.0.0.1`. Gebruik `node server.js 4322` als poort 4321 al bezet is. Het is een gewone statische server: de vroegere lokale GLB-route voor case 01 is weg, want die case heeft geen 3D-viewer meer.

## Logo & kleuren

Het logo staat in `assets/img/primelabs-logo.webp` (2000×604, transparant) en wordt
op twee manieren gebruikt — één bestand, geen tweede export nodig:

- **Lichte achtergronden** (nav): het volledige lockup als `<img class="logo">`.
- **Donkere achtergronden** (footer, preloader): `.mark` snijdt met CSS exact het
  P-teken uit hetzelfde bestand (bronrechthoek 38,113 → 348,522), met ernaast het
  woordmerk in wit (Poppins) en het scheidingslijntje in `#492d90`.

De paarse schaal is uit dat bestand gesampled met pixelanalyse op canvas:

| Token | Hex | Waar in het logo |
|---|---|---|
| `--lg-mag` | `#610085` | magenta-paars, linkerflank van de P |
| `--lg-dot` / `--brand` | `#3a078a` | de i-punt van "Primelabs" én het gemiddelde van het mark |
| `--lg-vio` | `#46187a` | violet in de stam |
| `--lg-ind` | `#140792` | indigo in het hart van de bowl |
| `--lg-div` | `#492d90` | scheidingslijntje |
| `--ink` | `#161517` | woordmerk-zwart |

`--lg-grad: linear-gradient(135deg,#610085,#3a078a 46%,#140792)` is dé huisstijl-
gradient: knoppen, nav-CTA, icoonvlakken, actieve nummers, de eyebrow-streepjes, de
scrollbalk en de gradiënttekst gebruiken exact deze stops. De lichtere tinten
(`--brand-3/4/5`, `--ind-2/3`) zijn tints van diezelfde twee logotinten en worden
enkel op donkere vlakken gebruikt. Ook de WebGL-scènes staan op die waarden.

## De hero en de scanlaag

### Indeling

De hero staat op elke pagina **onder** de vaste navigatiebalk
(`padding-top: calc(var(--nav-h) + …)`). Twee varianten:

- `.hero--home.hero--scene` — tekst links binnen `--wrap` (32 %), de opname
  **full-bleed** rechts: ze begint net vóór het einde van de tekstkolom en loopt door
  tot de vensterrand en tot boven achter de navigatie. Stijlen in
  `assets/css/hero-scene.css` (laadt ná `style.css`, enkel op `index.html`).
- `.hero--page` — één kolom met titel, inleiding en eventueel een cijferstrip;
  achtergrond via `.hero__glow` (lichtval) en `.hero__grid` (fijn meetraster).

Onder 1180 px stapelt de home-hero: de opname komt over de volle breedte onder de
tekst. Tussen 901 en 1180 px (liggende tablets, kleine laptops) staat de kop daarbij in
drie regels (*Professionele drone- / inspecties. / Helder vastgelegd.*) en staan de
kenmerken in een smalle kolom rechts naast de tekst: zo begint de opname op 508 px en
staan de drone, de kegel en de kaart Dakbedekking al in het eerste scherm (1024 × 768,
1100 × 700). De twee samengevoegde regels zijn `inline-block` met `vertical-align: top`,
anders zakt de regel door de afknippende `.line`. Onder 900 px verdwijnt de
werkwijzetegel uit de balk, onder 640 px blijven van de aandachtspunten enkel de pins
over.

Boven 1180 px blijft de knoppenrij altijd op één regel. Een containerquery op de
tekstkolom zelf (`.hero__copy`, dus ook juist met een scrollbalk) geeft onder 392 px de
knop wat minder binnenruimte en haalt het pijltje achter *Bekijk de diensten* weg; de
rij heeft anders 385 px nodig en de kolom is op 1181 px maar 355 px. Op lage
laptopschermen (hoogte ≤ 700 px, bv. 1366 × 657 met taakbalk) valt de decoratieve
onderregel weg in plaats van door de vouw gesneden te worden. Omgekeerd wordt de hero
op een smal maar hoog venster (1280 × 1024, een halve ultrawide) nooit hoger dan 68vw
(boven 1300px 63,5vw): anders wordt de scène staand, vallen de kaarttitels uit hun kaart
en valt de drone rechts af. Op gewone schermen verandert er niets.

### Kop en kenmerken

De kop staat in vijf vaste regels (*Professionele / drone- / inspecties. / Helder /
vastgelegd.*), zoals in het ontwerp; elke regel wordt een eigen `.line` voor de
onthulling, daarom staan *Helder* en *vastgelegd.* elk in een eigen `.grad`-span.
De grootte volgt twee grenzen en de kleinste wint:

- **breedte** — `4.96vw - 1px`: *Professionele* (5,64 × de lettergrootte) vult zo
  ~93 % van de tekstkolom, tot 74px vanaf ~1500px breed;
- **hoogte** — `16svh - 70px`: 74px op een scherm van 900px hoog, 53px op 768px, zodat
  de kenmerken en de resultatenbalk op laptops boven de vouw blijven. Nooit onder 40px.

Interlinie `.9`. Bij die strakke regelafstand zou `.line` (`overflow: hidden`) de
onderstokken van p en g afknippen; `padding-bottom: .16em` met een even grote
negatieve marge geeft ze ruimte zonder de regelafstand te veranderen.

Boven 1180px staan de drie kenmerken **op één lijn met de resultatenbalk**. Dat is
geen toeval van de tekstlengte maar een gedeelde band:

| | Kenmerken (links) | Resultatenbalk (rechts) |
|---|---|---|
| onderrand | onderpadding van de hero = `--hs-band-b` | `bottom: var(--hs-band-b)` |
| hoogte | `min-height: var(--hs-band-h)` | `min-height: var(--hs-band-h)` |
| inhoud | verticaal gecentreerd | verticaal gecentreerd |

De tekstkolom staat daarvoor onderaan verankerd (`justify-content: flex-end`) en de
kenmerken zijn het laatste element. `--hs-band-h` is de natuurlijke hoogte van de balk
(videominiatuur 16:10 + 4 × 6px padding). Gemeten van 1181 tot 1920px: beide banden
identiek, het verschil tussen de middens 0,0px.

Elk kenmerk heeft een vaste regelval (`Gecertificeerde<br>uitvoering` …), zodat het
precies zo breed is als zijn langste regel; samen 325px, dus met minstens 10px
tussenruimte passen ze ook in de smalste kolom (350px bij 1181px) op één rij. Onder
1180px staan die `<br>`'s uit en lopen de kenmerken vrij door zoals voorheen.

### De opname

De hero gebruikt `assets/img/broox-back.jpg` (12274 × 8179, 100 MP): het gebouw vanaf de
terraskant, met het hoge dak vol zonnepanelen, een lager grinddak, de natuurstenen gevel en
het terras met parasols en schaduwdoeken. Voor de site is daaruit een uitsnede van 3:2
genomen (bron x 1657 → 10863, y 0 → 6137, zo'n 75 % van de foto): de hele bovenkant, zodat
er ruimte is voor de drone, en minder gras op de voorgrond, waar de resultatenbalk ligt.
Die uitsnede is het coördinatenstelsel van 2000 × 1333 waarin alles hieronder staat.

| Bestand | Maat | Voor |
|---|---|---|
| `broox-hero-1500.webp` | 1500 × 1000, ~500 kB | gewone schermen (de foto staat daar op ± 1400 px) |
| `broox-hero-2200.webp` | 2200 × 1466, ~750 kB | schermen op 150 % |
| `broox-hero-2800.webp` | 2800 × 1866, ~950 kB | retina |
| `broox-thumb.webp` | 320 × 200, 32 kB | de miniatuur in de werkwijzetegel |

De browser kiest zelf via `srcset`/`sizes`. `sizes` volgt de breedte van de stage
(`max(100cqw, 1,5004 × cqh)`, gestapeld met een scène van `clamp(440px, 72vw, 680px)`
hoog): `(max-width: 611px) 660px, (max-width: 944px) 108vw, (max-width: 1020px) 1020px,
(max-width: 1180px) 100vw, max(1410px, calc(47.5vw + 277px))`. Boven 1180px is de stage
max(1,5004 × herohoogte ≤ 1410px, scènebreedte ≈ 50vw + 292px); die tweede term staat er
× 0,95 in, zodat 2560 breed op 1500w blijft (≤ 5 % opschaling) en ultrawides (3440, 3840)
niet meer zichtbaar opschalen. Wie die hoogte aanpast, past `sizes` mee aan.
Tablets op 2× halen zo 2200w in plaats van 2800w (~200 kB minder), telefoons tussen
441 en 640 px 1500w in plaats van 2200w (~250 kB minder). Voor het comprimeren kreeg de uitsnede een
nauwelijks zichtbare verzachting (0,45–0,65 px): de foto zit vol fijn bladwerk, en dat
scheelt 15–40 % bestandsgrootte. **`broox-back.jpg` zelf (155 MB) hoort niet op de server**:
de site gebruikt hem niet, hij is alleen de bron.

```
figure.hs-scene            absoluut, left = einde tekstkolom − 40px, container-type:size
  .hs-photo                masker: vloeit weg naar links, boven en onder
    .hs-stage              exact 2000×1333, dekt de scène zoals object-fit:cover
      img.hs-img           de opname (srcset)
      svg.hs-svg--tint     vlakken in merkviolet            mix-blend-mode: color
      svg.hs-svg--diepte   dunne donkerviolette laag        normaal
      svg.hs-svg--licht    randen, raster, veeg, stralen    mix-blend-mode: screen
      svg.hs-svg--drone    drone + lens (g.rig, zweeft)     normaal
  .hs-stage.hs-stage--ui   zelfde maat en positie: drie .hs-call's (kaart, lijnen, lichtpunten)
  .hs-bar                  cijferbalk + werkwijzetegel
.hs-rule                   onderregel, binnen --wrap
```

### Waarom alles op zijn plek blijft

`.hs-stage` is `width: max(100cqw, 100cqh × 1,5004)` met `aspect-ratio: 2000/1333`,
gecentreerd in de scène. Dat is precies wat `object-fit: cover` doet, maar dan als
element. Foto, SVG én de HTML-pins zitten erin, dus een positie in % van de stage is
een positie in de foto, op elke schermbreedte. `--hs-fx` / `--hs-fy` werken als
`object-position` (op telefoon staat `--hs-fx` op 60 % zodat de drone in beeld blijft).

De overgang naar de tekst is een **masker** op `.hs-photo`, geen witte verloopkleur:
de lichtval van `.hero__aura` loopt er zo gewoon doorheen, zonder naad.

### Aandachtspunten

Zoals in het ontwerp zweven de drie kaarten **boven of naast het gebouw, nooit erop**.
Een lijn loopt horizontaal van de kaart naar een knik (open ring) en daar recht omlaag
naar het punt op het gebouw. De punten zijn kleine lichtpunten (11 px, de knik 7 px): een
witte kern met een paarse rand en een dunne ring die traag uitpulseert. Elk punt is een `.hs-call` met vier maten in de foto
(x ÷ 2000, y ÷ 1333):

- `--tx` / `--ty` — het punt op het gebouw (`.hs-pin`, een klein lichtpunt);
- `--ky` — de hoogte van de knik en van de kaart (`.hs-knee`, `.hs-lead--v`);
- `--ax` — waar de kaart hangt: `.hs-call--l` hangt links van de knik, `--r` rechts.

| Kaart | Punt | Knik | Kaart hangt | Waar |
|---|---|---|---|---|
| Dakbedekking | 790,484 | 790,380 | links, vanaf x 730 | boven het hoge dak; lijn recht omlaag op de zonnepanelen |
| Afvoeren | 1298,574 | 1298,528 | rechts, vanaf x 1440 | rechts van het gebouw; knik boven de achterrand van het grinddak, punt op de uitsparing in de opstand (het enige afvoerachtige detail; rond 1290,612 ligt alleen grind). Op x 1298 en niet 1290: daar liep een lichtstraal precies door knik en leider |
| Gevelzones | 1190,722 | — | rechts, vanaf x 1440 | rechts van het gebouw; recht naar de natuursteenstrips |

Een kaart wordt nooit breder dan de ruimte tot de rand van de opname min 24 px (rechts)
of tot de tekstkolom (links): de ondertitel breekt dan over twee regels, zoals op 1366
en 1440 px. Tussen 1181 en 1300 px, en gestapeld onder 900 px, worden de kaarten compact
(zonder ondertitel); net boven het stapelpunt schuiven de rechterkaarten ook 16px naar
het gebouw toe, tussen 1300 en 1640 px 10px (tot 1640 omdat de media query de
scrollbalk meetelt). Gemeten met een zichtbare scrollbalk van 641 tot 1920 px: geen
kaart valt buiten de opname, de kaarten overlappen nergens en de rechterkaarten
blijven minstens 24 px van de schermrand. Onder 640 px blijven enkel de pins over; de
kaarten zijn daar alleen visueel verborgen, zodat schermlezers de drie namen blijven horen.

De kaarten zijn neutraal donker glas (`rgba(34,26,60,.86)` → `rgba(18,13,38,.82)`,
`backdrop-filter: blur(16px) saturate(60%) brightness(.8)`): het glas ontkleurt en dimt
wat erachter ligt, zodat gras en bomen de kaart niet bruin of groen kleuren. De balk
gebruikt hetzelfde glas. Voor schermlezers is de laag een lijst
(`role="list"`, *Aandachtspunten in deze voorbeeldopname*) met drie lijstitems; lijnen,
knik, punt en iconen zijn `aria-hidden`.

De lijnen tekenen zich bij het laden vanaf het punt naar de kaart, daarna schuift de
kaart in (`--in` per kaart). Opnieuw meten: open `index.html#kalibreer` en beweeg over
de foto; je ziet `--tx/--ty` en de SVG-coördinaten, een klik kopieert de `--tx/--ty`-regel
(`assets/js/hero-scene.js`, doet niets zonder die hash).

### Opgemeten geometrie (beeldcoördinaten)

| Element | Coördinaten |
|---|---|
| Hoog dak (zonnepanelen) | 499,510 → 953,436 → 1233,521 → 741,624 |
| Grinddak rechtsvoor | 971,601 → 1229,550 → 1387,600 → 1133,665 |
| Gevel rechts (natuursteen, lamellen) | 1133,685 → 1385,621 → 1380,706 → 1133,776 |
| Balkon (reling en vloerplaat vóór de gevel, geen gevelscan) | 1090,716 → 1157,792 |
| Schaduwdoek (vóór de gevel, geen gevelscan) | 1358,663 → 1336,697 → 1305,723 → 1283,740 → 1380,740 → 1373,707 → 1362,675 |
| Drone (`<image>`) | x 1130, y 175, breedte 500 |
| Hoofdlens | 1338.8,274 (lenzen op `drone.webp`, 1576×562: links 622,392 · hoofd 658,312 · rechts 700,397) |

De hoeken zijn opgemeten op rasterbeelden van de uitsnede (lijnen per 20 eenheden, uit de
100 MP-bron) en daarna onafhankelijk nagemeten; de tabel geeft de mediaan. Wie de foto vervangt, meet opnieuw en vervangt alleen deze getallen
(dakpad, `plDakClip`, de lichtkegel en de maten van de drie kaarten).

### De scan in vier lagen

De scan is geen lila waas die er gewoon overheen ligt, maar licht. Daarvoor staat hij in
vier aparte `<svg>`'s boven de foto (aparte elementen, omdat `mix-blend-mode` op een
`<g>` niet in elke browser betrouwbaar is; `.hs-photo` heeft een masker en mengt dus als
afgesloten groep, de lagen mengen alleen met de foto):

1. **tint** (`mix-blend-mode: color`) — kegel, daken, hun betonnen boeiboorden en de
   gevel krijgen de tint en
   verzadiging van het merkviolet (`#8b5cf6` → `#6d28d9`), maar houden de helderheid van
   de foto. Gewone menging maakte van het droge gras mauve (304°); `screen` zou alleen
   bleker en rozer maken. Gemeten in de kegel op 1600 × 900 (1260,330): rgb(186,141,220),
   tint 274° — het ontwerp geeft rgb(178,134,222).
2. **diepte** — een dunne laag `#6d28d9` op 18 % over kegel, daken en boeiboorden.
3. **licht** (`mix-blend-mode: screen`) — alles wat moet oplichten: de dakrand (2,4
   eenheden wit) met een neongloed (`#a66bff`, blur 6, ademt van .75 naar .95), het
   perspectiefraster, de scanveeg, de gevelrand en het gevelraster, en de kegel zelf:
   een heldere lichtbron bij de lens, 23 dunne stralen op gelijke afstand langs de voet
   en 7 zwakkere naar de achterranden van het hoge dak (ze doven uit met de afstand via
   een radiaal verloop op de lijn zelf en lichten om beurten op, als een scanner), en
   heldere randen naar de hoeken van de voet. Onder beide boeiboorden loopt een dunne
   lichte onderlijn, zodat de hele dakplaat oplicht zoals in het ontwerp.
4. **drone** — bovenop. De lens is een klein witheet punt (gloed r 16 met een witte kern
   van r 3). De drie cameralenzen in `drone.webp` zijn donker blauwgroen glas (waren paars
   ingekleurd), zodat het lichtpunt er echt tegen afsteekt. Rond de lens ligt een stukje
   kegel óver de camera, tot r 56 en vanaf r 35 zacht uitlopend, dus tot voorbij de
   onderrand van de behuizing: de stralen lopen ononderbroken uit de lens. Het uitlopen
   zit in de verlopen zelf, zonder masker in de zwevende groep.

**Voet van de kegel.** De kegel stopt exact op de dakomtrek zoals de lens hem ziet:
linkerhoek hoog dak → voorhoek → langs de voorrand tot P (1008,568; waar de straal naar
de hoek van het grinddak de dakrand kruist) → hoek grinddak (971,601) → voorhoek
grinddak → rechterhoek grinddak. Tussen de twee daken ligt de boeiboord van het hoge
dak met eronder glas en gevel: op het glas komt geen licht. Het stuk P → 971,601 is een buitenrand van de kegel over de
boeiboord en staat als heldere randlijn buiten `plKegelClip` (erbinnen viel de halve lijn
weg en las de naad als snijfout).
De vervaagde gloed wordt geknipt met `plKegelClip` (alles boven de dakomtrek, links en
rechts verlengd langs de dakranden).

**Rasters.** Beide daken en de gevel krijgen een perspectiefraster uit een
**homografie** van de vier opgemeten hoeken: de vakken worden naar achteren echt kleiner
(het oude lineaire raster week tot 20 eenheden af). Het raster is 1 CSS-px
(`vector-effect: non-scaling-stroke`, dus ook gestapeld zichtbaar) met een zachte
violette gloed eronder. Balkon en schaduwdoek staan vóór de gevel en zijn uit de
gevelscan geknipt (`plGevelClip`).

**Zweven.** Kegel en stralen staan vast op de dakranden; alleen de drone zweeft, en maar
1 × 1,5 beeldeenheid (≈ 1 px), zodat de lens op het punt blijft waar de stralen
samenkomen.

Alles in de scan wordt gegenereerd uit de opgemeten hoeken en de lenspositie; wie een
van beide verandert, rekent het opnieuw uit.

### Intro en prestaties

- **Doek en intro.** Het doek valt zodra de lettertypes en de heroafbeelding klaar
  zijn (`load` of `decode()`, wat eerst komt; een tab op de achtergrond stelt `decode()`
  uit), niet pas bij `window.load`. Gemeten: ~0,6 s. De grenzen tellen vanaf de
  navigatie, niet vanaf main.js: na 2,5 s valt het doek hoe dan ook (op de lettertypes
  wacht het tot 3,5 s, anders verspringt de tekst), met een failsafe op 4 s. In een tab
  op de achtergrond blijft het doek staan tot de pagina zichtbaar wordt, anders zou de
  intro al voorbij zijn bij het eerste beeld. De fotoscène wacht daarnaast apart op
  haar foto (`.is-klaar`) en fadet dan in: op een trage verbinding speelt de intro nooit
  over een half geladen foto. De
  wipe maakt eerst de bovenkant vrij (nav en kop). Pas bij `body.ready` starten de
  animaties van de fotoscène (daarvoor staan ze op `animation-play-state: paused`) en
  krijgt de herotekst `.in`, zodat de bezoeker de hele intro ziet, ook op een trage
  verbinding.
- **Zonder JavaScript.** Elke pagina heeft in de `<head>` een kleine noodgreep die niet
  van main.js afhangt: draait main.js na 4 s nog niet (geblokkeerd, een trage cdn), dan
  valt het doek toch. Zonder JavaScript verbergt een `<noscript>`-stijl het doek en toont
  ze alle inhoud en de fotoscène. Ook de rest van de pagina gaat pas onder de
  reveal-observer als het doek valt, zodat er niets onder het doek onthuld wordt.
- **Samen inzoomen.** Foto, scanlagen en aandachtspunten krijgen dezelfde `heroZoom`
  (zelfde vak, zelfde middelpunt): de scan staat bij het laden nooit naast het dak.
- **Stil buiten beeld.** Een IntersectionObserver zet `.is-uit` op de hero zodra die uit
  beeld is; dan staan alle animaties erin stil (gemeten: van 48 naar 1 lopende animatie).
- Alle animaties van de scène staan in `hero-scene.css`; `style.css` bevat niets meer
  dat alleen voor deze hero is. Bij `prefers-reduced-motion` staat alles stil in de
  eindstand.

### Resultatenbalk

De balk is slank: 6px binnenrand, cijfers in gewicht 500, een videominiatuur van 16:10.
Links begint hij een witruimte (`--hs-bar-gap`, 44–84px) na de tekstkolom, rechts
eindigt hij **exact** op de rechterlijn van `--wrap`, net als de navigatie. Binnen de
scène verwijst `100%` naar de scène en niet naar het venster; daarom rekent `.hs-scene`
de marge uit met de containereenheden van de hero (`container-type: inline-size`) in
de geregistreerde eigenschap `--hs-gutter` (`@property`, `<length>`), die als vaste
lengte doorgeeft aan de balk. Gemeten met een zichtbare scrollbalk, van 641 tot
1920 px: rechterrand balk = rechterrand navigatie, 0 px verschil.

De labels in de balk staan op `rgba(223,208,246,.86)` (≥ 5:1 op het glas). De tegel
rechts belooft geen video die er niet is: *Zo verloopt een inspectie — in 5 stappen*,
met een pijl in plaats van een playknop, naar `werkwijze.html#stappen`. Komt er een
film van een minuut, dan kan hij weer een playknop en een `<dialog>` met `<video>`
krijgen.

De onderregel rechts (*Puurs-Sint-Amands, België*) staat op het uitvloeiende, lichte
deel van de foto en is daarom donker (`--ink`, met de huisstijlgradient als lijn: ook op de
donkerste bladpixels ≥ 5:1); wit haalde daar 1,5:1.

## 3D / interactie per pagina

- **Home** — onder de hero vouwen drie dossierbladen in CSS-3D open tijdens het
  scrollen; de kaarten kantelen op muispositie.
- **Diensten** — drie hoofddiensten in een **zig-zag**: elke dienst is een eigen rij
  (`article.svc-row`, ids `#d1`–`#d3`) met links of rechts een eigen canvas
  (`#canvas-d1`–`#canvas-d3`, `BUILDERS = [SDak, SWerf, SWoning]`). 01 en 03 hebben de scène
  links en de tekst rechts, 02 (`.svc-row--reverse`) is omgedraaid; onder 900px staat altijd
  eerst de scène en direct daaronder de tekst. De viewport kantelt naar zijn tekst toe
  (`--vry-base`). Elke viewport houdt de HUD: hoeken, `hud-tag`, een statusbadge die de scène
  zelf bijwerkt, en de teller `Dienst 0x / 03`.
  01 kantoorgebouw naar de drone-opname in `assets/img/diensten-1.jpg` (alleen referentie,
  niet mee online zetten: 138 MB en met GPS-gegevens in de EXIF): lang gelijkvloers in beton
  met verticale betonvinnen links, een uitkragend wit volume met een dichte rij verticale
  lamellen in een diep kader (`ExtrudeGeometry` met uitsparing), rechts een lager,
  vooruitspringend volume met plat dak en buitenunits, en op het hoofddak een opstaande
  dakrand, twee rijen schuin opgestelde PV-modules en een centrale koelgroep. Lamellen en
  panelen zijn `InstancedMesh` met samengevoegde randlijnen (137 draw calls voor de hele
  scène). De drone vliegt drie inspectiepunten af (PV-veld, aansluiting van de koelgroep,
  lamellengevel), hangt bij elk punt stil en richt er een zachte scankegel op; de pins
  pulseren, het gescande punt licht op. 02 werf in uitvoering (ruwbouw, graafmachine die elke ronde
  hetzelfde brok in de container lost) met rond het bouwvolume een vaste, gloeiende
  spline-route langs acht GPS-standpunten; achter de drone licht het spoor op, en op elk
  standpunt volgt een opnameflits richting de ruwbouw. 03 fotogrammetrie: de woning met platte daken uit case 03, mét de tuin, nagebouwd in de
  huisstijl. Alle maten komen uit het bovenaanzicht `woning-case/boven.webp` (3,6° rechtgezet) en staan
  in de code in pixels van dat beeld (`px → scène`: 250 px = 1 eenheid ≈ 7,6 m; een terrastegel van
  60 cm = 20 px); hoogtes in meter, uit de schuine beelden. Opgebouwd: hoofdvolume met twee
  zonnecollectoren op hun frame, patio, dampkappen met leiding, platte lichtkoepel en koepeltje; het
  lage volume met glazen pui (profielen, muurlampen); terras met tegelvoegen, vuurkorven en
  lichtkoker; gazon; glazen overkapping met zeven vakken; houten schuur met rieten zadeldak; plantvak
  met conifeer, afsluiting en poort; bamboehaag, struiken en het glazen tuinhuisje. Geen texturen of
  adres, dus bruikbaar vóór de publicatie van de case. De camera kijkt vanuit de tuin, zoals de render
  van het model. De drone vliegt een raster (serpentine), de puntenwolk groeit in vluchtvolgorde mee
  (daken, gevels en kruinen) en kleurt op hoogte; daarna schuift een scanlijn over het perceel, met
  achter de lijn het polygoonmesh en ervoor nog de punten; tot slot de opmeting van het platte dak.
  Kleine onderdelen worden per soort samengevoegd tot één geometrie (155 draw calls). Dat knippen gebeurt met clipping planes (`localClippingEnabled`), die de scène
  elk frame naar de wereldruimte omzet.
- **Werkwijze** — geen 3D-scène meer. De vijf stappen staan uitgeschreven in `src/content/werkwijze.ts`
  en worden getoond als een stappenbalk die bovenaan blijft staan (voortgangslijn en actieve stap volgen
  het scrollen, `ProcessRail.tsx`) en per stap drie kolommen: wat wij doen, wat u aanlevert en het
  resultaat. Opmaak in `src/styles/werkwijze.css`. De pagina laadt geen three.js meer.
- **Portfolio** — één case per dienst, met hetzelfde nummer: links de dienst (nummer,
  uitleg, link naar de dienstpagina), rechts een brede kaart met een echte dronefoto, een
  monospace statusbadge (`.case__tag`) en een link naar de uitgebreide case. 01: productiesite
  Puurs, 02: sloopwerf, 03: woning in 3D. Zonder echt beeldmateriaal komt er geen kaart. Het donkere blok hergebruikt de hero-scène als
  schematische voorbeeldopname.
- **Case 03** — het model is een Gaussian splat in SOG-formaat (PlayCanvas). De engine
  (ca. 0,6 MB gzip) en het model laden pas bij "Laad het 3D-model"; tot dan staat er een
  render uit hetzelfde model. Het standpunt "Overzicht" is exact het posterbeeld, zodat
  er na het laden niets verspringt. Buiten beeld zet de viewer `autoRender` uit.
- **Offerte** — compacte locatiescène met pin en uitdijende grondringen; het
  formulier heeft een voortgangsmeter, inline validatie en een bevestigingsstaat.

## Het formulier (belangrijk bij livegang)

Er is geen backend. Bij verzenden wordt het formulier gevalideerd, daarna bouwt
`main.js` de aanvraag op als mailtekst, toont die in een bevestigingspaneel (met
kopieerknop) en opent het mailprogramma van de bezoeker naar `info@primelabs.be`.

Bij livegang: vervang dat ene blok (`form.addEventListener('submit', …)` in
`assets/js/main.js`, gemarkeerd met een TODO) door een POST naar een eigen endpoint
of een formulierdienst. De validatie, meter en bevestigingsstaat kunnen blijven.

## Een dienstscène bouwen

`scene.js` exporteert `PL3D.kit()`: 24 bouwstenen (`gableRoof`, `parapet`, `windowGrid`,
`crane`, `fence`, `stack`, `solar`, `crack`, `sheet`, `marker`, `scanRig`, `contactShadow`,
een deterministische `rnd` …). Elke scène in `scene-services.js` is één functie:

```js
function (kit) {
  var g = new kit.T.Group();            // alles op of boven y=0
  // … opbouw met kit-helpers …
  return {
    group: g,
    cam:  { pos: [x, y, z], target: [x, y, z] },
    hud:  { label: 'Kantoor / dak + gevel', meta: 'Visueel' },
    tick: function (t, camera) { /* vloeiende, herhalende beweging */ },
    status: function () { return 'Scan · punt 01'; },  // optioneel: tekst voor de HUD-badge
    still: 2.9                                          // optioneel: beeld bij reduced motion
  };
}
```

Een dienst toevoegen of vervangen = zo'n functie schrijven, in `BUILDERS` zetten en op
`diensten.html` een rij met `<canvas id="canvas-dN">` toevoegen. `PL3D.serviceRows(canvases,
{ onVisible, onStatus, onError })` geeft elk canvas een eigen renderer (via `podium()`),
bouwt de scène pas als het canvas binnen 700px van het venster komt (in een rustig moment),
en rekent en tekent alleen zolang er een pixel van het canvas in beeld is: één
`IntersectionObserver` zonder marge, één gedeelde `requestAnimationFrame`-lus die stilvalt
zodra niets meer in beeld is. Elke scène heeft een eigen klok, die alleen loopt terwijl je
kijkt. `main.js` zet `.is-live` op de rij die in beeld is en schrijft de status in de badge.
Alle shaders worden bij het bouwen vooraf gecompileerd, ook van onderdelen die pas later
verschijnen (kegel, scanlijn, meting), zodat de animatie daar niet hapert. De wereld zwaait
rustig heen en weer rond het ontwerpstandpunt (±0,32 rad) in plaats van eindeloos rond te
draaien. Een link naar `#d1`–`#d3` landt onder de vaste navigatie (`scroll-margin-top`).
Debughaken: `PLsvc.info()` (per rij: gebouwd, in beeld, frames, klok, mediane frametijd in
ms, draw calls, driehoeken, status),
`PLsvc.seek(i, t)`, `PL3D.serviceBuilders`, `PL3D.previewService(canvas, i)` en
`PL3D.serviceCount()`. Met `previewService` rendert `prototype-diensten.html` elke scène los.

Het aanbod telt drie hoofddiensten. Maatwerk is geen aparte dienst maar de aanpak van elke
opdracht (afgestemd op de informatiebehoefte en het dossier, niet op vliegminuten), en het
inspectierapport is de vaste oplevering bij elke dak- en gevelinspectie. De vroegere scènes
voor voor- en na-opnames, schadevaststelling, rapporten en maatwerk zijn geschrapt; voor-
en na-opnames zitten nu in de werfopvolging, schadevaststelling in de dak- en gevelinspectie.

## Techniek & randgevallen

- Alle inhoud staat in één kolom: `--wrap: min(1400px, calc(100% - clamp(32px,6vw,96px)))`.
  De navigatie, de hero (tekst, cijferbalk en onderregel), elke sectie en de footer
  gebruiken dezelfde token, dus ze lijnen op elk scherm op dezelfde lijn uit. Alleen
  het beeldvlak van de hero breekt daaruit en loopt door tot de vensterrand.
  De cijferbalk staat binnen de scène maar eindigt via `--hs-gutter` exact op
  dezelfde lijn (zie "Resultatenbalk").
- three.js komt van cdnjs met jsDelivr als fallback; zonder WebGL krijgt `<body>`
  de klasse `no3d` en valt de viewport terug op een statisch rasterpatroon.
- Renderloop pauzeert wanneer de canvas buiten beeld is; pixelratio maximaal 1.8.
- De rotorringen van de drone liggen plat (`rotation.x = PI/2`); ze draaien dus om
  hun lokale **z**-as. Om y draaien laat de ring tuimelen in plaats van rondgaan.
- Het eerste frame rendert direct bij opbouw, niet pas in een `requestAnimationFrame`:
  anders blijft een paneel zwart wanneer het tabblad tijdens het laden niet getoond wordt.
- De graafcyclus in scène 02 (werfopvolging) loopt langs vaste houdingen. Oppak- en lospunt
  worden uit die houdingen zelf berekend, en de brokken van de puinhoop worden
  geloot buiten het pad van de bak — daardoor botst er niets en ligt het brok
  elke ronde op exact dezelfde plek. Gecontroleerd met een OBB-toets over 300
  standen van de cyclus: nul doorsnijdingen. Het brok en de stofwolk volgen de bak via
  wereldcoördinaten die terug naar de lokale ruimte van de scène gaan, zodat ze ook bij
  draaien of slepen in de bak blijven.
- De drie dienstenscènes hebben elk een eigen WebGL-context (drie canvassen). Een scène
  die niet in beeld is, wordt niet doorgerekend en niet getekend; bij prefers-reduced-motion
  staat elke scène stil op haar `still`-moment en tekent ze alleen opnieuw bij slepen of
  een nieuwe maat. Lukt een context niet, dan krijgt alleen die viewport `.is-no3d` (het
  statische raster); de andere twee draaien door.
- `prefers-reduced-motion`: preloader, marquee, tilt, magnetische knoppen en
  auto-rotatie gaan uit; alle inhoud blijft zichtbaar.
- Canvas en HUD zijn `aria-hidden`; de viewport zelf heeft een beschrijvend
  `role="img"` + `aria-label`. Skip-link, focus-stijlen en toetsenbordfocus op de
  stappen van de werkwijze zijn aanwezig.
- Fonts: Inter, Inter Tight, JetBrains Mono en Poppins (woordmerk) — Google Fonts.

## Nog te doen bij echte oplevering

- **FAQ-antwoorden nalezen.** De vijf antwoorden op `werkwijze.html` zijn door mij
  opgesteld in lijn met de bestaande scope-tekst (visueel, geen thermografie, geen
  bouwkundige expertise). Laat ze bevestigen voordat ze live gaan.
- **Privacybeleid.** De consenttekst in het formulier verwijst nu naar het beleid
  zonder link, en de footerlinks `Privacybeleid` en `Bedrijfsgegevens` staan op `#`.
  Zodra die pagina's bestaan, beide op de echte URL zetten.
- **Portfolio vullen.** Een nieuw project komt als kaart in de groep van zijn dienst
  (`#dienst-01`–`#dienst-03`); pas ook de teller in `.pf-nav` aan. Met twee kaarten in een
  dienst staan ze naast elkaar, met één kaart wordt die breed.
- **Case 02 publiceren.** Pas na toestemming van de opdrachtgever en de aannemer: hun
  naam staat op de giek en de containers, en is ook in de video leesbaar (die kan niet
  vlak per vlak vervaagd worden). De locatie staat nergens vermeld; het opschrift van het
  vroegere eethuis op de gevel is in de foto’s vervaagd. De raw is ontwikkeld met een eigen
  script (lossless JPEG decoderen, witbalans uit `AsShotNeutral`, `ColorMatrix2`, 2×2
  superpixel naar 4032 × 3024); de lenscorrectie uit `OpcodeList3` is niet toegepast.
- **Case 01 aanvullen.** De observaties tonen alleen wat zichtbaar is. Het exacte
  paneeladres (observatie 01) en de positie van de donkere zones (observatie 02) komen uit
  het rapport; de originele detailfoto’s uit de vlucht zijn nog niet aangeleverd en kunnen de
  uitsneden uit het orthobeeld vervangen.
- Voor een favicon is een vierkante variant van het P-teken nodig (het huidige
  bestand is 3,3:1).
- **Video voor de hero.** De tegel in de resultatenbalk verwijst nu naar de vijf
  stappen op de werkwijzepagina. Een echte film van ongeveer een minuut maakt er weer
  een videotegel van, zoals in het ontwerp.
- `assets/img/broox-back.jpg` (155 MB) en `assets/img/hero-inspectie.webp` niet mee
  uploaden: de site gebruikt ze niet. Dat geldt ook voor `assets/img/diensten-1.jpg`
  (138 MB, referentie voor dienst 01, met GPS in de EXIF).
- **Case 03 publiceren.** Pas na toestemming van de eigenaar van de woning. Het
  gepubliceerde model is bijgesneden in wereldcoördinaten (PLY: x en y gespiegeld): weg is
  alles vóór de voorgevel (z < −24,6: oprit met auto’s en nummerplaten, straat), de tuin
  van de buren achter de linkse omheining (x < −8,5) en de rest van een autoneus vóór de
  garage (z < −23,8 en y < 2,4). Het filter schrijft een nieuwe PLY, die daarna met
  `splat-transform woning-v2.ply woning-3d.sog` (v3.7.0) naar SOG gaat. De ruwe
  bestanden (`27-9-2026.ply`, `musti.ply`, `scene.ssproj`, `musti-intel.sog` en de 80
  foto’s) horen in het klantendossier, niet op de website.
