/*
 * Noodgreep uit de oorspronkelijke <head>: valt het laaddoek niet binnen 4 s via main.js
 * (script geblokkeerd, trage verbinding), dan valt het hier. Staat vooraan in <body> en draait
 * vóór React, tijdens het parsen van de HTML (enkel op pagina's met een laaddoek, dus niet op de testpagina's).
 */
const fallbackScript =
  'setTimeout(function(){if(window.PLmain)return;var p=document.querySelector(".pre");if(p)p.classList.add("off");var s=document.querySelector(".hs-scene");if(s)s.classList.add("is-klaar");document.body.classList.add("ready");document.querySelectorAll(".rv").forEach(function(e){e.classList.add("in")})},4000)';

export function PreloaderFallback() {
  return <script dangerouslySetInnerHTML={{ __html: fallbackScript }} />;
}
