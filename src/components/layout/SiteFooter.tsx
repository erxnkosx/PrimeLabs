import { company, mainNav, routes } from "@/config/site";

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
        </div>
        <div>
          <h4>Navigatie</h4>
          <ul>
            {mainNav.map((item) => (
              <li key={item.key}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            {/* TODO bij livegang: echte pagina's voor privacybeleid en bedrijfsgegevens */}
            <li>
              <a href="#">Privacybeleid</a>
            </li>
            <li>
              <a href="#">Bedrijfsgegevens</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
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
            BE 1017.602.056
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
