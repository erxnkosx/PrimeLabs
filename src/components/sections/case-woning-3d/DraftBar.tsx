export function DraftBar() {
  return (
    <div className="sc-draftbar" role="note">
      <div className="wrap sc-draftbar__in">
        <span className="sc-draftbar__dot" aria-hidden="true" />
        <p>
          <strong>Interne conceptpreview</strong>
          <span>
            Deze case toont een private woning. Publiceer ze pas na toestemming van de eigenaar; adres en
            nummerplaten blijven onvermeld.
          </span>
        </p>
        <span className="sc-draftbar__label">VOORSTEL</span>
      </div>
    </div>
  );
}
