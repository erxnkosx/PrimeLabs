# Primelabs Drone Inspecties — website

Website van **Primelabs Drone Inspecties** (Puurs-Sint-Amands): visuele drone-inspecties voor daken,
gevels, werven en infrastructuur in België.

Gebouwd met **Next.js 16 (App Router)**, **React 19**, **TypeScript** en **Tailwind CSS v4**.
Alle pagina's worden vooraf statisch gegenereerd (SSG): snelle laadtijden en volledige HTML voor
zoekmachines.

> Dit project is een 1-op-1 omzetting van de oorspronkelijke statische site. Opmaak, teksten, 3D-scènes
> en interacties zijn identiek; dat is gecontroleerd door elke pagina op 11 schermbreedtes element per
> element met het origineel te vergelijken. De uitgebreide ontwerp- en techniekdocumentatie staat in
> [`docs/ontwerp-en-techniek.md`](docs/ontwerp-en-techniek.md).

---

## Snel starten

Vereist: **Node.js 20.9 of hoger** (aanbevolen 22, zie `.nvmrc`).

```bash
npm install
cp .env.example .env.local     # pas NEXT_PUBLIC_SITE_URL aan indien nodig
npm run dev                    # http://localhost:3000
```

| Commando                          | Wat het doet                                                                |
| --------------------------------- | --------------------------------------------------------------------------- |
| `npm run dev`                     | ontwikkelserver met hot reload                                              |
| `npm run build`                   | productiebuild (alle pagina's statisch)                                     |
| `npm run start`                   | productiebuild lokaal serveren                                              |
| `npm run lint`                    | ESLint (Next.js core-web-vitals + TypeScript)                               |
| `npm run typecheck`               | TypeScript-controle                                                         |
| `npm run format` / `format:check` | Prettier                                                                    |
| `npm run images:og`               | favicon, app-iconen en deelafbeeldingen opnieuw genereren (Python + Pillow) |

GitHub Actions (`.github/workflows/ci.yml`) draait lint, typecheck, format-check en build bij elke push
en pull request.

## Projectstructuur

```
├── .github/workflows/ci.yml       CI: lint, typecheck, format, build
├── docs/ontwerp-en-techniek.md    oorspronkelijke ontwerp- en techniekdocumentatie
├── public/
│   ├── assets/img/ …              beelden (webp), zelfde namen als voorheen
│   ├── assets/video/              werfvideo (case 02)
│   ├── assets/models/             3D-model woning (SOG, case 03)
│   └── og/                        Open Graph-afbeeldingen per pagina (1200 × 630)
├── src/
│   ├── app/                       routes (App Router)
│   │   ├── layout.tsx             <html lang="nl-BE">, lettertypes, globale CSS, basis-metadata
│   │   ├── globals.css            Tailwind v4 + huisstijltokens
│   │   ├── (site)/                alle echte pagina's (route group, geen invloed op de URL)
│   │   │   ├── page.tsx           /
│   │   │   ├── diensten/          /diensten
│   │   │   ├── werkwijze/         /werkwijze
│   │   │   ├── portfolio/         /portfolio
│   │   │   │   └── (cases)/       de drie casepagina's + hun gedeelde CSS
│   │   │   └── offerte/           /offerte
│   │   ├── prototype/             interne testpagina's (noindex)
│   │   ├── not-found.tsx          404
│   │   ├── sitemap.ts             /sitemap.xml
│   │   ├── robots.ts              /robots.txt
│   │   ├── manifest.ts            /manifest.webmanifest
│   │   └── favicon.ico, icon.png, apple-icon.png
│   ├── components/
│   │   ├── layout/                PageShell, SiteHeader, SiteFooter, Preloader
│   │   ├── sections/<pagina>/     één component per sectie van elke pagina
│   │   ├── scripts/PageScripts.tsx laadt de interactiescripts per pagina
│   │   └── seo/JsonLd.tsx         structured data
│   ├── config/site.ts             bedrijfsgegevens, routes, navigatie, diensten, cases ← begin hier
│   ├── content/faq.ts             veelgestelde vragen (pagina + FAQ-structured data)
│   ├── lib/seo.ts                 metadata per pagina (title, description, canonical, OG, robots)
│   ├── lib/structured-data.ts     schema.org (Organization, ProfessionalService, Service, FAQ, …)
│   ├── scripts/                   oorspronkelijke interactiescripts (vanilla JS, three.js)
│   ├── styles/
│   │   ├── legacy/                oorspronkelijk designsysteem (CSS), ongewijzigd
│   │   └── fonts.ts               zelf gehoste lettertypes
│   └── types/                     TypeScript-aanvullingen
└── tools/generate-images.py       genereert iconen en OG-afbeeldingen
```

## Hoe het in elkaar zit

**Pagina's en secties.** Elke pagina (`src/app/(site)/…/page.tsx`) definieert haar metadata en
structured data en zet haar secties in een `PageShell`. Die shell rendert altijd dezelfde volgorde als
de oude HTML: laaddoek → scrollbalk → skiplink → navigatie → mobiel menu → `<main>` → footer.
Tekst aanpassen doe je in de sectie in `src/components/sections/<pagina>/`.

**Styling.** Het designsysteem is tot op de pixel afgesteld (zie de documentatie), daarom staat de
oorspronkelijke CSS ongewijzigd in `src/styles/legacy/` en wordt ze per pagina geladen zoals vroeger
(`style.css` overal, `hero-scene.css` op de home, `speculoos-case.css` + de casebestanden op de cases).
**Tailwind v4** is volledig ingericht voor nieuw werk, met de huisstijl als tokens (`bg-brand`,
`text-ink`, `border-line`, `font-display`, `rounded-card`, `bg-brand-gradient`, …; zie
`src/app/globals.css`). Tailwinds CSS-reset (preflight) staat bewust uit en de utilities zitten in een
cascade-layer, zodat Tailwind de bestaande opmaak nooit verandert. `src/app/not-found.tsx` is een
voorbeeld van een pagina die beide combineert.

**Interacties en 3D.** De scripts in `src/scripts/` (intro, reveals, formulier, three.js-scènes,
PlayCanvas-viewer) zijn de oorspronkelijke bestanden, met enkel een paar gemarkeerde aanpassingen
(zoek op `[Next.js]`). `PageScripts` laadt ze na de hydratatie in dezelfde volgorde als vroeger.
three.js (0.150.1) komt nu uit npm in plaats van een cdn. Interne links zijn bewust gewone `<a>`-links
(geen `next/link`): de scripts verwachten een volledige paginalading, net als op de statische site.

**Lettertypes.** Inter, Inter Tight, JetBrains Mono en Poppins worden zelf gehost via Fontsource
(zelfde gewichten als voorheen). Geen verzoeken meer naar Google Fonts: sneller en GDPR-vriendelijk.

## SEO

- **Metadata per pagina**: unieke `<title>` en description (de originele teksten), canonical URL,
  Open Graph en X/Twitter-kaart met eigen afbeelding, `lang="nl-BE"`, `og:locale nl_BE`.
- **Robots**: productie is indexeerbaar met `max-image-preview:large`; preview-deploys van Vercel
  krijgen automatisch `Disallow: /`; `/prototype` is `noindex` en uitgesloten in `robots.txt`.
- **`/sitemap.xml`** met alleen indexeerbare pagina's (cases pas na publicatie, zie hieronder).
- **Structured data (JSON-LD)**: `Organization` + `ProfessionalService` (adres, telefoon, e-mail,
  btw-nummer, werkgebied België, aanbod) en `WebSite` op elke pagina; `BreadcrumbList` op subpagina's;
  `ItemList` van `Service`s op /diensten; `FAQPage` op /werkwijze; `ContactPage` op /offerte.
  Test met de [Rich Results Test](https://search.google.com/test/rich-results).
- **Nette URL's** + 301-redirects van alle oude `.html`-adressen (`next.config.ts`).
- **Prestaties**: statische HTML, zelf gehoste fonts, `fetchpriority="high"` op de heroafbeelding met
  een afgestemde `srcset`, lazy loading, cacheheaders op `/assets`, 3D pas geladen waar nodig.
- **Toegankelijkheid** blijft zoals in het origineel: skiplink, focusstijlen, `aria`-labels,
  `prefers-reduced-motion`, werkt zonder JavaScript.

Na livegang: domein toevoegen in **Google Search Console** en **Bing Webmaster Tools**, de
verificatiecodes in de env-variabelen zetten (zie `.env.example`) en `https://primelabs.be/sitemap.xml`
indienen.

## Cases publiceren

De drie cases zijn **interne conceptpreviews** (toestemming van opdrachtgever/eigenaar ontbreekt nog).
Ze zijn bereikbaar via het portfolio, maar hebben `noindex`, staan niet in de sitemap en tonen de
conceptbalk. Publiceren = in `src/config/site.ts` bij de case `published: true` zetten. Dan verdwijnt de
conceptbalk, wordt de pagina indexeerbaar en komt ze in de sitemap.

## Deployen (Vercel, aanbevolen)

1. Push deze repo naar GitHub.
2. Op [vercel.com](https://vercel.com) → **Add New… → Project** → importeer de repo (framework wordt
   automatisch herkend, geen instellingen nodig).
3. Zet `NEXT_PUBLIC_SITE_URL` (bv. `https://primelabs.be`) onder **Settings → Environment Variables**.
4. Koppel het domein onder **Settings → Domains**. Kies één variant (met of zonder `www`) en laat de
   andere doorverwijzen; die variant moet gelijk zijn aan `NEXT_PUBLIC_SITE_URL`.

Andere hosting kan ook (`npm run build && npm run start`, of een Node-/Docker-omgeving). De redirects
en headers uit `next.config.ts` vereisen een Next.js-server; bij een puur statische export zou je die
in de hostingconfiguratie moeten overnemen.

## Offerteformulier (Resend)

Het formulier post naar `/api/offerte`: een **Cloudflare Pages Function** (`functions/api/offerte.ts`)
die de aanvraag via [Resend](https://resend.com) mailt naar Primelabs, met de aanvrager als
antwoordadres. Er wordt niets opgeslagen. Spam wordt geweerd met een onzichtbaar honeypotveld, een
minimale invultijd en validatie. Lukt verzenden niet (functie niet ingesteld, storing), dan opent het
mailprogramma van de bezoeker, zoals vroeger.

1. Maak een account op resend.com en voeg het domein `primelabs.be` toe onder **Domains**. Zet de
   DNS-records die Resend toont (SPF/DKIM, eventueel DMARC) bij je domeinbeheer en wacht op "Verified".
2. Maak onder **API Keys** een sleutel met "Sending access".
3. In Cloudflare → project **primelabs-aap** → **Settings** → **Variables and Secrets** (voor
   Production én Preview):
   - `RESEND_API_KEY` (type **Secret**) = de sleutel
   - `RESEND_FROM` = `Primelabs <offerte@primelabs.be>` (een adres op het geverifieerde domein)
   - `OFFERTE_TO` = `info@primelabs.be` (meerdere: komma-gescheiden)
   - optioneel `OFFERTE_BEVESTIGING` = `true`: de aanvrager krijgt een ontvangstbevestiging
4. Start een nieuwe deployment. Test het formulier op de live site.

Lokaal testen van de functie: `STATIC_EXPORT=1 npm run build` en daarna
`npx wrangler pages dev out` (met de variabelen in een `.dev.vars`-bestand). Met gewoon `npm run dev`
bestaat `/api/offerte` niet en valt het formulier terug op het mailprogramma.

## Google Analytics en cookiebanner

Zet `NEXT_PUBLIC_GA_ID` (bv. `G-XXXXXXXXXX`) als build-variabele in Cloudflare en deploy opnieuw.
Zonder die variabele is er geen analytics en verschijnt er geen banner.

- Vóór toestemming laadt er niets van Google en wordt er geen cookie gezet.
- "Weigeren" en "Accepteren" zijn even groot en even zichtbaar; de keuze geldt 6 maanden.
- "Cookie-instellingen" in de footer (en in het privacybeleid) opent de keuze opnieuw; intrekken wist
  de `_ga`-cookies meteen.
- Google Signals en advertentiefuncties staan uit. Zet in Google Analytics onder
  _Beheer → Gegevensverzameling → Gegevensbewaring_ de bewaartermijn op 14 maanden (zoals in het
  privacybeleid staat).
- Een geslaagde offerteaanvraag wordt gemeten als het event `generate_lead`. Markeer het in GA als
  "Belangrijke gebeurtenis" om conversies te zien.

## Juridische pagina's

`/privacybeleid` en `/bedrijfsgegevens` staan in `src/app/(site)/`. De gegevens komen uit
`src/config/site.ts`: vul daar `legalForm` (rechtsvorm), `droneOperatorId` (UAS-operatornummer bij
het DG Luchtvaart) en `insurance` aan; lege velden worden niet getoond. De teksten zijn opgesteld op
basis van hoe de site werkt, maar zijn **geen juridisch advies**: laat ze nalezen, zeker de
bewaartermijnen en de lijst met verwerkers (vul je e-mailprovider en boekhouder aan).

## Nog te doen vóór livegang

- [ ] **Resend instellen** (zie hierboven) en het formulier live testen.
- [ ] **Google Analytics**: property aanmaken, `NEXT_PUBLIC_GA_ID` zetten, bewaartermijn op 14 maanden.
- [ ] **Juridische teksten nalezen** en `legalForm`, `droneOperatorId`, `insurance` invullen.
- [ ] **FAQ-antwoorden laten bevestigen** (`src/content/faq.ts`).
- [ ] **Cases**: toestemming vragen en daarna publiceren (zie hierboven).
- [ ] **Search Console / Bing** instellen (zie SEO) en de sitemap indienen.
- [ ] **Google Bedrijfsprofiel** aanmaken met exact hetzelfde adres en telefoonnummer als op de site
      (belangrijk voor lokaal zoeken), en de profiel-URL toevoegen aan `sameAs` in `src/config/site.ts`.

## Wat bewust niet in de repo zit

`broox-back.jpg` (155 MB), `diensten-1.jpg` (138 MB, met GPS in de EXIF) en `hero-inspectie.webp` uit de
oude `assets/img/`: de site gebruikt ze niet en de eerste twee zijn groter dan de limiet van GitHub
(100 MB). Ook de ruwe 3D-bestanden (`*.ply`, `scene.ssproj`, bronfoto's) horen in het klantendossier.
`.gitignore` houdt ze buiten de repo. Alle beelden in `public/` zijn gecontroleerd: geen EXIF/GPS.
