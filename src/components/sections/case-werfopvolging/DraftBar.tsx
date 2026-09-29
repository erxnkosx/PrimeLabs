export function DraftBar() {
  return (
    <div className="sc-draftbar" role="note">
      <div className="wrap sc-draftbar__in">
        <span className="sc-draftbar__dot" aria-hidden="true" />
        <p>
          <strong>Interne conceptpreview</strong>
          <span>
            Publiceer pas na toestemming van de opdrachtgever en de aannemer: hun materieel is herkenbaar in
            beeld. Personen, nummerplaten en het winkelopschrift zijn vervaagd.
          </span>
        </p>
        <span className="sc-draftbar__label">VOORSTEL</span>
      </div>
    </div>
  );
}
