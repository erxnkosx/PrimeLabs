/**
 * Het laaddoek. main.js laat het vallen zodra lettertypes (en op de home de heroafbeelding)
 * klaar zijn; de noodgreep in de root layout doet het na 4 s als main.js niet draait.
 */
export function Preloader({ label }: { label: string }) {
  return (
    <div className="pre" aria-hidden="true">
      <div className="pre__in">
        <span className="mark" style={{ "--h": "64px" } as React.CSSProperties} aria-hidden="true" />
        <div className="pre__bar">
          <i />
        </div>
        <div className="pre__t">{label}</div>
      </div>
    </div>
  );
}
