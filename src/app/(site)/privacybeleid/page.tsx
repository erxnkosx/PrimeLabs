import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalPage } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { company, GA_ID, routes } from "@/config/site";
import { breadcrumbs, graph, webPage } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";

/*
 * Let op: dit privacybeleid is opgesteld op basis van hoe de site en de dienstverlening
 * werken (formulier, e-mail via Resend, hosting via Cloudflare, Google Analytics enkel met
 * toestemming, dronebeelden). Het is geen juridisch advies: laat het nalezen en vul aan
 * waar je werkwijze afwijkt (bv. je e-mailprovider, bewaartermijnen, extra verwerkers).
 */
const UPDATED = "29 september 2026";

const title = "Privacybeleid — Primelabs Drone Inspecties";
const description =
  "Hoe Primelabs Drone Inspecties omgaat met uw persoonsgegevens: offerteaanvragen, dronebeelden, cookies en analytics, bewaartermijnen en uw rechten onder de GDPR.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.privacybeleid,
  image: "/og/home.jpg",
  imageAlt: "Primelabs Drone Inspecties",
});

const toc = [
  { id: "wie", label: "Wie zijn wij" },
  { id: "gegevens", label: "Welke gegevens en waarom" },
  { id: "dronebeelden", label: "Dronebeelden" },
  { id: "cookies", label: "Cookies en analytics" },
  { id: "delen", label: "Met wie we gegevens delen" },
  { id: "bewaren", label: "Hoe lang we gegevens bewaren" },
  { id: "beveiliging", label: "Beveiliging" },
  { id: "rechten", label: "Uw rechten" },
  { id: "wijzigingen", label: "Wijzigingen" },
];

export default function PrivacyPage() {
  const a = company.address;
  return (
    <>
      <PageShell preloaderLabel="Privacybeleid laden" scripts="basic">
        <LegalPage
          eyebrow="Privacybeleid"
          title="Zorgvuldig met uw gegevens."
          intro="We verzamelen alleen wat nodig is om uw aanvraag te behandelen en een inspectie uit te voeren. Hieronder leest u welke gegevens dat zijn, waarom, hoe lang we ze bewaren en welke rechten u hebt."
          updated={UPDATED}
          toc={toc}
        >
          <section id="wie">
            <h2>1. Wie zijn wij</h2>
            <p>
              De verwerkingsverantwoordelijke is {company.legalName}
              {company.legalForm ? ` (${company.legalForm})` : ""}, handelend onder de naam {company.name},{" "}
              {a.street}, {a.postalCode} {a.locality}, België, ondernemingsnummer {company.kbo}.
            </p>
            <p>
              Vragen over privacy? Mail naar <a href={`mailto:${company.email}`}>{company.email}</a> of bel{" "}
              <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>.
            </p>
          </section>

          <section id="gegevens">
            <h2>2. Welke gegevens en waarom</h2>
            <h3>Offerteaanvragen en contact</h3>
            <p>
              Via het aanvraagformulier, per e-mail of telefoon ontvangen we: uw naam, eventueel bedrijfsnaam,
              e-mailadres, eventueel telefoonnummer, het adres van de te inspecteren locatie en uw
              inspectievraag. We gebruiken die om uw aanvraag te beantwoorden, de haalbaarheid te beoordelen
              en u een voorstel te doen. Rechtsgrond: maatregelen die u vóór een overeenkomst vraagt (art.
              6.1.b GDPR).
            </p>
            <h3>Uitvoering van een opdracht</h3>
            <p>
              Wordt u klant, dan verwerken we uw contact- en facturatiegegevens en de gegevens van de opdracht
              (locatie, planning, beelden, rapport). Rechtsgrond: uitvoering van de overeenkomst (art. 6.1.b)
              en onze wettelijke boekhoudkundige en fiscale verplichtingen (art. 6.1.c).
            </p>
            <h3>Websitebezoek</h3>
            <p>
              Onze hostingprovider verwerkt technisch noodzakelijke gegevens zoals uw IP-adres en
              browsergegevens, om de site veilig en beschikbaar te houden. Rechtsgrond: ons gerechtvaardigd
              belang (art. 6.1.f). Bezoekstatistieken verzamelen we alleen met uw toestemming (zie{" "}
              <a href="#cookies">Cookies en analytics</a>).
            </p>
            <p>
              We verkopen geen gegevens, gebruiken ze niet voor advertenties en doen niet aan profilering.
            </p>
          </section>

          <section id="dronebeelden">
            <h2>3. Dronebeelden</h2>
            <p>
              Tijdens een inspectie leggen we gebouwen, werven en terreinen vast. Daarbij kunnen personen,
              voertuigen of aangrenzende percelen onbedoeld in beeld komen. We beperken dat zoveel mogelijk
              door gericht te vliegen binnen de afgesproken zones.
            </p>
            <ul>
              <li>Beelden worden enkel gebruikt voor het dossier van de opdrachtgever.</li>
              <li>
                Herkenbare personen, nummerplaten en gevoelige details worden onherkenbaar gemaakt vóór een
                eventuele publicatie.
              </li>
              <li>
                Publicatie als referentie (bv. op deze website) gebeurt alleen met uitdrukkelijke toestemming
                van de opdrachtgever, en waar nodig van de eigenaar.
              </li>
            </ul>
            <p>
              Rechtsgrond: uitvoering van de overeenkomst met de opdrachtgever en, voor wie onbedoeld in beeld
              komt, ons gerechtvaardigd belang bij een correcte uitvoering van de inspectie.
            </p>
          </section>

          <section id="cookies">
            <h2>4. Cookies en analytics</h2>
            {GA_ID ? (
              <>
                <p>
                  We gebruiken Google Analytics 4 om anoniem te zien hoe bezoekers de site gebruiken, zodat we
                  ze kunnen verbeteren. Dat gebeurt uitsluitend na uw toestemming via de cookiebanner. Zonder
                  toestemming laden we niets van Google en plaatsen we geen analytische cookies. Google
                  Signals en advertentiefuncties staan uit.
                </p>
                <p>
                  U kunt uw keuze altijd wijzigen of intrekken via{" "}
                  <button
                    type="button"
                    className="foot__link"
                    data-consent-open=""
                    style={{ color: "var(--brand)", textDecoration: "underline" }}
                  >
                    cookie-instellingen
                  </button>
                  , ook onderaan elke pagina.
                </p>
              </>
            ) : (
              <p>
                Deze website gebruikt op dit moment geen analytische of marketingcookies. Wordt dat ooit
                anders, dan vragen we eerst uw toestemming.
              </p>
            )}
            <div className="legal__scroll">
              <table className="legal__table">
                <thead>
                  <tr>
                    <th>Naam</th>
                    <th>Doel</th>
                    <th>Bewaartijd</th>
                    <th>Toestemming</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>pl-consent (lokale opslag)</td>
                    <td>Onthoudt uw cookiekeuze op dit toestel</td>
                    <td>6 maanden</td>
                    <td>Niet nodig (noodzakelijk)</td>
                  </tr>
                  {GA_ID && (
                    <>
                      <tr>
                        <td>_ga</td>
                        <td>Google Analytics: onderscheidt bezoekers anoniem</td>
                        <td>13 maanden</td>
                        <td>Ja</td>
                      </tr>
                      <tr>
                        <td>_ga_…</td>
                        <td>Google Analytics: houdt de sessie bij</td>
                        <td>13 maanden</td>
                        <td>Ja</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section id="delen">
            <h2>5. Met wie we gegevens delen</h2>
            <p>
              We delen gegevens alleen met dienstverleners die ons helpen de site en de dienstverlening te
              laten werken, en alleen voor zover nodig:
            </p>
            <ul>
              <li>
                <b>Cloudflare</b>: hosting en beveiliging van de website.
              </li>
              <li>
                <b>Resend</b>: het versturen van de e-mail met uw aanvraag naar ons.
              </li>
              <li>Onze e-mailprovider, voor de verdere correspondentie.</li>
              {GA_ID && (
                <li>
                  <b>Google</b>: Google Analytics, enkel na uw toestemming.
                </li>
              )}
              <li>
                <b>jsDelivr</b>: levert de 3D-viewer op de casepagina met het woningmodel, alleen als u op
                &quot;Laad het 3D-model&quot; klikt.
              </li>
              <li>Onze boekhouder, voor de facturatie van opdrachten.</li>
            </ul>
            <p>
              Sommige van deze partijen verwerken gegevens (ook) buiten de Europese Economische Ruimte. Dat
              gebeurt dan op basis van een adequaatheidsbesluit (zoals het EU-VS Data Privacy Framework) of
              standaardcontractbepalingen van de Europese Commissie.
            </p>
          </section>

          <section id="bewaren">
            <h2>6. Hoe lang we gegevens bewaren</h2>
            <ul>
              <li>Offerteaanvragen zonder opdracht: tot 2 jaar na het laatste contact.</li>
              <li>
                Klant- en opdrachtgegevens, facturen: zolang de wettelijke boekhoudkundige en fiscale
                termijnen dat vereisen.
              </li>
              <li>Beelden en rapporten van een opdracht: zolang afgesproken met de opdrachtgever.</li>
              {GA_ID && <li>Analytische gegevens: maximaal 14 maanden in Google Analytics.</li>}
            </ul>
          </section>

          <section id="beveiliging">
            <h2>7. Beveiliging</h2>
            <p>
              De website werkt uitsluitend via een beveiligde verbinding (https). Het aanvraagformulier slaat
              niets op de website op: uw aanvraag gaat rechtstreeks per e-mail naar ons. Beelden en dossiers
              bewaren we afgeschermd en delen we alleen met de opdrachtgever of wie hij aanwijst.
            </p>
          </section>

          <section id="rechten">
            <h2>8. Uw rechten</h2>
            <p>U hebt het recht om:</p>
            <ul>
              <li>uw gegevens in te kijken en een kopie te krijgen;</li>
              <li>onjuiste gegevens te laten verbeteren;</li>
              <li>uw gegevens te laten wissen, als er geen reden meer is om ze te bewaren;</li>
              <li>de verwerking te laten beperken of er bezwaar tegen te maken;</li>
              <li>uw gegevens over te dragen aan een andere partij;</li>
              <li>een gegeven toestemming op elk moment in te trekken.</li>
            </ul>
            <p>
              Stuur daarvoor een e-mail naar <a href={`mailto:${company.email}`}>{company.email}</a>. We
              antwoorden binnen een maand.
            </p>
            <p>
              Bent u het niet eens met hoe we met uw gegevens omgaan, dan kunt u een klacht indienen bij de{" "}
              <a
                href="https://www.gegevensbeschermingsautoriteit.be"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gegevensbeschermingsautoriteit
              </a>
              , Drukpersstraat 35, 1000 Brussel.
            </p>
          </section>

          <section id="wijzigingen">
            <h2>9. Wijzigingen</h2>
            <p>
              We passen dit privacybeleid aan wanneer onze werkwijze verandert. De datum bovenaan toont de
              laatste wijziging.
            </p>
          </section>
        </LegalPage>
      </PageShell>
      <JsonLd
        data={graph(
          webPage({ path: routes.privacybeleid, name: title, description }),
          breadcrumbs([
            { name: "Home", path: routes.home },
            { name: "Privacybeleid", path: routes.privacybeleid },
          ]),
        )}
      />
    </>
  );
}
