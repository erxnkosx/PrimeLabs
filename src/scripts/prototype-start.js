/* ==========================================================================
   Start van de testpagina /prototype (was een inline <script> in prototype.html).
   three.js en proto.js zijn op dit moment al geladen door PageScripts.
   ========================================================================== */
(function () {
  if (!window.THREE || !window.PROTO) return;
  window.__P = {};
  [['c0', 'current'], ['cA', 'archi'], ['cB', 'shading'], ['cC', 'cloud'], ['cD', 'district']]
    .forEach(function (p) {
      try { window.__P[p[0]] = window.PROTO[p[1]](document.getElementById(p[0])); }
      catch (e) { console.error(p[0], e); }
    });
})();

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
