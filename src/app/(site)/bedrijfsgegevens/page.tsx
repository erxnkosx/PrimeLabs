import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalPage } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { company, routes } from "@/config/site";
import { breadcrumbs, graph, webPage } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";

/*
 * Wettelijke identificatiegegevens (Wetboek van economisch recht, boek XII) + gebruik van
 * de website. Rechtsvorm, UAS-operatornummer en verzekering vul je aan in
 * src/config/site.ts; zolang die leeg zijn, verschijnen die rijen niet.
 */
const UPDATED = "29 september 2026";

const title = "Bedrijfsgegevens — Primelabs Drone Inspecties";
const description =
  "Bedrijfsgegevens van Primelabs Drone Inspecties: adres, contact, ondernemingsnummer en btw-nummer, toezicht op drone-activiteiten en gebruiksvoorwaarden van de website.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: routes.bedrijfsgegevens,
  image: "/og/home.jpg",
  imageAlt: "Primelabs Drone Inspecties",
});

const toc = [
  { id: "gegevens", label: "Identificatie" },
  { id: "toezicht", label: "Drone-activiteiten en toezicht" },
  { id: "website", label: "Gebruik van de website" },
  { id: "contact", label: "Contact" },
];

export default function BedrijfsgegevensPage() {
  const a = company.address;
  const kboLink = `https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=${company.kbo.replace(/\D/g, "")}`;
  const rijen: [string, React.ReactNode][] = [
    ["Handelsnaam", company.name],
    ["Naam", company.legalName],
    ...(company.legalForm ? ([["Rechtsvorm", company.legalForm]] as [string, React.ReactNode][]) : []),
    [
      "Adres",
      <>
        {a.street}
        <br />
        {a.postalCode} {a.locality}, België
      </>,
    ],
    [
      "E-mail",
      <a key="m" href={`mailto:${company.email}`}>
        {company.email}
      </a>,
    ],
    [
      "Telefoon",
      <a key="t" href={`tel:${company.phone}`}>
        {company.phoneDisplay}
      </a>,
    ],
    [
      "Ondernemingsnummer",
      <a key="k" href={kboLink} target="_blank" rel="noopener noreferrer">
        {company.kbo}
      </a>,
    ],
    ["Btw-nummer", `BE ${company.kbo}`],
    ...(company.droneOperatorId
      ? ([["UAS-operator", company.droneOperatorId]] as [string, React.ReactNode][])
      : []),
    ...(company.insurance ? ([["Verzekering", company.insurance]] as [string, React.ReactNode][]) : []),
    ["Werkgebied", "Heel België"],
  ];

  return (
    <>
      <PageShell preloaderLabel="Bedrijfsgegevens laden" scripts="basic">
        <LegalPage
          eyebrow="Bedrijfsgegevens"
          title="Wie er achter Primelabs staat."
          intro="De wettelijke gegevens van onze onderneming, het toezicht op onze drone-activiteiten en de voorwaarden voor het gebruik van deze website."
          updated={UPDATED}
          toc={toc}
        >
          <section id="gegevens">
            <h2>1. Identificatie</h2>
            <dl className="legal__dl">
              {rijen.map(([k, v]) => (
                <div key={k} style={{ display: "contents" }}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="toezicht">
            <h2>2. Drone-activiteiten en toezicht</h2>
            <p>
              Onze vluchten worden uitgevoerd door een gecertificeerde dronepiloot, binnen de Europese
              dronewetgeving en de geldende Belgische regels. Het toezicht op drone-activiteiten in België
              gebeurt door het Directoraat-generaal Luchtvaart van de FOD Mobiliteit en Vervoer.
            </p>
            <p>
              Onze inspecties zijn visueel: we leggen vast wat zichtbaar is. Ze vervangen geen destructief
              onderzoek, stabiliteitsstudie, keuring of bouwkundige expertise.
            </p>
          </section>

          <section id="website">
            <h2>3. Gebruik van de website</h2>
            <h3>Intellectuele eigendom</h3>
            <p>
              Teksten, beelden, 3D-weergaven en de vormgeving van deze website zijn eigendom van Primelabs of
              worden gebruikt met toestemming van de rechthebbenden. Overnemen kan alleen met onze
              schriftelijke toestemming.
            </p>
            <h3>Aansprakelijkheid</h3>
            <p>
              We doen ons best om de informatie op deze website juist en actueel te houden, maar ze is
              algemeen en vrijblijvend. Een voorstel of offerte is pas bindend na schriftelijke bevestiging.
              Voor links naar websites van derden zijn wij niet verantwoordelijk.
            </p>
            <h3>Privacy</h3>
            <p>
              Hoe we met persoonsgegevens en cookies omgaan, leest u in ons{" "}
              <a href={routes.privacybeleid}>privacybeleid</a>.
            </p>
          </section>

          <section id="contact">
            <h2>4. Contact</h2>
            <p>
              Een vraag over een inspectie of over deze gegevens? Mail naar{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a> of bel{" "}
              <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>.
            </p>
            <a className="btn btn--p legal__btn" href={routes.offerte}>
              Inspectie aanvragen
            </a>
          </section>
        </LegalPage>
      </PageShell>
      <JsonLd
        data={graph(
          webPage({ path: routes.bedrijfsgegevens, name: title, description, type: "AboutPage" }),
          breadcrumbs([
            { name: "Home", path: routes.home },
            { name: "Bedrijfsgegevens", path: routes.bedrijfsgegevens },
          ]),
        )}
      />
    </>
  );
}
