// Vergrootvensters (<dialog>) van deze case; geopend door src/scripts/case-inspectie.js.
export function Dialogs() {
  return (
    <>
      <dialog className="sc-plan-dialog" id="planDialog" aria-label="Vergroot dakoverzicht">
        {" "}
        <button
          type="button"
          className="sc-dialog-close"
          data-close-plan=""
          aria-label="Sluit het vergrote dakoverzicht"
        >
          ×
        </button>{" "}
        <img
          src="/assets/img/speculoos-case/dak-overzicht.webp"
          width="1600"
          height="1000"
          loading="lazy"
          alt="Bovenaanzicht van het productiedak met zonnepanelen en lichtstraten"
        />{" "}
        <p>Dakoverzicht · loodrecht bovenaanzicht, samengesteld uit de dronebeelden.</p>
      </dialog>
      <dialog className="sc-plan-dialog" id="photoDialog" aria-label="Vergroot inspectiebeeld">
        {" "}
        <button
          type="button"
          className="sc-dialog-close"
          data-close-photo=""
          aria-label="Sluit het vergrote beeld"
        >
          ×
        </button>{" "}
        <img width="1600" height="1067" alt="" /> <p />
      </dialog>
    </>
  );
}
