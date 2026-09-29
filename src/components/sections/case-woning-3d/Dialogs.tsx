// Vergrootvensters (<dialog>) van deze case; geopend door src/scripts/case-inspectie.js / case-woning.js.
export function Dialogs() {
  return (
    <>
      <dialog className="sc-plan-dialog cw-photo-dialog" id="photoDialog" aria-label="Vergrote bronfoto">
        {" "}
        <button
          type="button"
          className="sc-dialog-close"
          data-close-photo=""
          aria-label="Sluit de vergrote foto"
        >
          ×
        </button>{" "}
        <img width="1600" height="1067" alt="" /> <p />
      </dialog>
    </>
  );
}
