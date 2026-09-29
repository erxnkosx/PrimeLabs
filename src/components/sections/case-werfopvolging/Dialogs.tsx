// Vergrootvensters (<dialog>) van deze case; geopend door src/scripts/case-inspectie.js.
export function Dialogs() {
  return (
    <>
      <dialog className="sc-plan-dialog" id="photoDialog" aria-label="Vergroot beeld">
        {" "}
        <button
          type="button"
          className="sc-dialog-close"
          data-close-photo=""
          aria-label="Sluit het vergrote beeld"
        >
          ×
        </button>{" "}
        <img width="1600" height="900" alt="" /> <p />
      </dialog>
    </>
  );
}
