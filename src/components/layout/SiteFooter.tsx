import { company, GA_ID, mainNav, routes } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <div>
          <a className="brand" href={routes.home}>
            <span className="mark" aria-hidden="true" />
            <span className="rule" aria-hidden="true" />
            <span className="brand__txt">
              <span className="brand__name">Primelabs</span>
              <span className="brand__sub">DRONE INSPECTIES</span>
            </span>
          </a>
          <p className="foot__t">Professionele visuele inspecties voor gebouwen, werven en infrastructuur.</p>
          <p className="foot__t foot__area">
            Drone-inspecties in heel België, vanuit {company.address.locality} (provincie{" "}
            {company.address.region}).
          </p>
        </div>
        <div>
          <h4 role="heading" aria-level={2}>
            Navigatie
          </h4>
          <ul>
            {mainNav.map((item) => (
              <li key={item.key}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={routes.privacybeleid}>Privacybeleid</a>
            </li>
            <li>
              <a href={routes.bedrijfsgegevens}>Bedrijfsgegevens</a>
            </li>
            {GA_ID && (
              <li>
                <button type="button" className="foot__link" data-consent-open="">
                  Cookie-instellingen
                </button>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4 role="heading" aria-level={2}>
            Contact
          </h4>
          <address>
            PRIMELABS
            <br />
            {company.address.street}
            <br />
            {company.address.postalCode} {company.address.locality}
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <br />
            <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
            <br />
            BTW BE {company.kbo}
          </address>
        </div>
      </div>
      <div className="wrap foot__b">
        <span>© 2026 Primelabs</span>
        <span>Visuele inspectie — geen destructief of bouwtechnisch onderzoek</span>
      </div>
    </footer>
  );
}
