/**
 * Veelgestelde vragen (werkwijze-pagina). Eén bron voor zowel de zichtbare FAQ als de
 * FAQPage-structured data, zodat die twee nooit uit elkaar lopen.
 *
 * Let op (uit de oorspronkelijke README): deze antwoorden zijn opgesteld in lijn met de
 * bestaande scope-tekst en moeten nog door Primelabs bevestigd worden vóór livegang.
 */
export type FaqItem = { id: string; question: string; answer: string };

export const faq: FaqItem[] = [
  {
    id: "a1",
    question: "Kan iedere locatie met een drone geïnspecteerd worden?",
    answer:
      "Niet overal en niet altijd. Luchtruim, omgeving en weersomstandigheden bepalen wat mogelijk is; sommige zones vragen een toelating of laten geen vlucht toe. We controleren de haalbaarheid daarom vóór de opdracht en zeggen het eerlijk wanneer een locatie of zone niet uitvoerbaar is.",
  },
  {
    id: "a2",
    question: "Doen jullie ook thermografische inspecties?",
    answer:
      "Nee. We werken met beeldregistratie in het zichtbare spectrum. Thermografie en lekdetectie horen niet bij onze opdrachten — daarvoor verwijzen we naar een gespecialiseerde partij. Fotogrammetrische metingen (orthofoto’s, puntenwolken, volumes) maken we wel, op basis van diezelfde zichtbare beelden.",
  },
  {
    id: "a3",
    question: "Is het rapport een bouwkundig expertiseverslag?",
    answer:
      "Nee. Het rapport bevat een visuele vaststelling van zichtbare toestanden en aandachtspunten, met datum en locatiecontext. Het is geen stabiliteitsstudie en geen gecertificeerde bouwkundige expertise. Wanneer specialistische interpretatie nodig is, dienen de beelden als onderbouwde input voor de bevoegde expert.",
  },
  {
    id: "a4",
    question: "Wat hebben jullie nodig om te kunnen starten?",
    answer:
      "Het adres, het doel van de inspectie en de zones die u in beeld wilt. Verder: wie ter plaatse aanspreekpunt is, of het terrein toegankelijk is en — indien beschikbaar — plannen of eerdere foto’s. Met die informatie kunnen we de scope meestal snel bepalen.",
  },
  {
    id: "a5",
    question: "Wie mag de beelden nadien gebruiken?",
    answer:
      "U ontvangt het dossier en kunt het intern of met uw partners delen. Beelden worden alleen als referentie of portfoliomateriaal gebruikt wanneer u daar expliciet toestemming voor geeft.",
  },
];
