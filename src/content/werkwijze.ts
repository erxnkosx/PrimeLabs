/**
 * De vijf stappen van de werkwijze (/werkwijze#stappen). Eén bron voor de stappenbalk
 * en de uitgewerkte fasen.
 *
 * Let op: deze teksten zijn opgesteld in lijn met de bestaande inhoud van de site
 * (diensten, FAQ, "wat u mag verwachten"). Laat ze door Primelabs nalezen vóór livegang.
 */
export type ProcesStap = {
  id: string;
  nummer: string;
  titel: string;
  /** Korte mijlpaal onder de titel in de stappenbalk. */
  mijlpaal: string;
  intro: string;
  wij: string[];
  u: string[];
  resultaat: string;
  /** SVG-paden (viewBox 0 0 24 24), dezelfde iconen als voorheen. */
  icoon: string[];
};

export const processtappen: ProcesStap[] = [
  {
    id: "fase-1",
    nummer: "01",
    titel: "Vraag & locatie",
    mijlpaal: "Voorstel op maat",
    intro: "U vertelt ons wat u wilt weten. Wij bekijken of en hoe de locatie in beeld gebracht kan worden.",
    wij: [
      "De inspectievraag en het doel van het resultaat scherpstellen",
      "Locatie en omgeving verkennen op kaart en luchtfoto",
      "Haalbaarheid controleren: luchtruim, omgeving en eventuele toelatingen",
    ],
    u: [
      "Het adres en het type gebouw, werf of terrein",
      "Waarvoor u het resultaat gebruikt: onderhoud, schade, oplevering, dossier …",
      "Indien beschikbaar: plannen of referentiefoto’s",
    ],
    resultaat: "Een voorstel met aanpak, scope en een transparante prijs.",
    icoon: ["M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", "M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"],
  },
  {
    id: "fase-2",
    nummer: "02",
    titel: "Scope & voorbereiding",
    mijlpaal: "Vluchtplan vastgelegd",
    intro:
      "We leggen vooraf vast wat er in beeld komt, zodat er ter plaatse niets aan het toeval wordt overgelaten.",
    wij: [
      "Zones, details en standpunten vastleggen in een vluchtplan",
      "Bereikbaarheid, omgeving en vluchtvoorwaarden nagaan",
      "De opnamedag inplannen, afgestemd op het weer",
    ],
    u: [
      "Akkoord op de afgesproken zones en details",
      "Een aanspreekpunt ter plaatse",
      "Toegang tot het terrein, waar dat nodig is",
    ],
    resultaat: "Een afgesproken scope en een bevestigde opnamedatum.",
    icoon: [
      "M4 8V6a2 2 0 0 1 2-2h2",
      "M16 4h2a2 2 0 0 1 2 2v2",
      "M20 16v2a2 2 0 0 1-2 2h-2",
      "M8 20H6a2 2 0 0 1-2-2v-2",
      "M4 12h16",
    ],
  },
  {
    id: "fase-3",
    nummer: "03",
    titel: "Opname op locatie",
    mijlpaal: "Beelden vastgelegd",
    intro: "Een gerichte vlucht door een gecertificeerde dronepiloot, volgens het afgesproken vluchtplan.",
    wij: [
      "Veilige uitvoering binnen de geldende vluchtmogelijkheden",
      "Systematisch vastleggen: eerst overzicht en context, dan detail",
      "Bij werfopvolging: telkens vanuit dezelfde GPS-standpunten",
    ],
    u: ["Het aanspreekpunt is bereikbaar tijdens de opname", "Een vrije plek om op te stijgen, in overleg"],
    resultaat: "Originele beelden in hoge resolutie van alle afgesproken zones.",
    icoon: [
      "M14.5 5h-5L8 7H4.5A2.5 2.5 0 0 0 2 9.5v8A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-8A2.5 2.5 0 0 0 19.5 7H16Z",
      "M12 9.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z",
    ],
  },
  {
    id: "fase-4",
    nummer: "04",
    titel: "Selectie & rapportage",
    mijlpaal: "Rapport opgesteld",
    intro: "Van ruwe beelden naar een overzichtelijk dossier dat meteen bruikbaar is.",
    wij: [
      "De relevante beelden selecteren en ordenen per zone",
      "Elk aandachtspunt nummeren, met detail- en overzichtsfoto en exacte locatieverwijzing",
      "Duidelijk vermelden wat we níet konden beoordelen",
      "Bij fotogrammetrie: orthofoto, puntenwolk of 3D-model verwerken",
    ],
    u: ["Niets: u hoeft in deze fase niets te doen", "Extra vragen kunt u altijd nog doorgeven"],
    resultaat: "Een genummerd inspectierapport in PDF.",
    icoon: [
      "M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
      "M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1",
      "M9 10h6M9 14h6M9 18h4",
    ],
  },
  {
    id: "fase-5",
    nummer: "05",
    titel: "Oplevering & opvolging",
    mijlpaal: "Dossier opgeleverd",
    intro: "U ontvangt het volledige digitale dossier, klaar om intern of met partners te delen.",
    wij: [
      "Rapport en originele beelden digitaal opleveren",
      "De aandachtspunten toelichten, als u dat wenst",
      "Bij een volgende opdracht: dezelfde structuur, zodat u eenvoudig vergelijkt",
    ],
    u: [
      "Het dossier gebruiken voor overleg, onderhoud of verdere beoordeling",
      "Beslissen over opvolging of een volgende opname",
    ],
    resultaat: "Een digitaal dossier dat van u is. Publicatie door ons gebeurt enkel met uw toestemming.",
    icoon: ["M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z", "M14 3v5h5", "m9.5 14.5 2 2 3.5-4"],
  },
];
