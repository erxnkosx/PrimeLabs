/* ==========================================================================
   Case 01 — fotografische inspectie. Geen 3D: dit script opent alleen het
   vergrote dakoverzicht (dakplan) en de detailbeelden van de observaties.
   Ontbreekt een element of kent de browser <dialog> niet, dan gebeurt er niets.
   ========================================================================== */
(function () {
  'use strict';
  function dialoog(id) {
    var d = document.getElementById(id);
    return d && typeof d.showModal === 'function' ? d : null;
  }
  function sluitbaar(d, knop) {
    var k = d.querySelector(knop);
    if (k) k.addEventListener('click', function () { d.close(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  }

  var plan = dialoog('planDialog'), open = document.querySelector('[data-open-plan]');
  if (plan && open) {
    open.addEventListener('click', function () { plan.showModal(); });
    sluitbaar(plan, '[data-close-plan]');
  }

  var foto = dialoog('photoDialog');
  if (foto) {
    var img = foto.querySelector('img'), cap = foto.querySelector('p');
    Array.prototype.forEach.call(document.querySelectorAll('[data-photo]'), function (knop) {
      knop.addEventListener('click', function () {
        var bron = knop.querySelector('img');
        img.src = knop.getAttribute('data-photo');
        img.alt = bron ? bron.alt : '';
        cap.textContent = knop.getAttribute('data-caption') || '';
        foto.showModal();
      });
    });
    sluitbaar(foto, '[data-close-photo]');
  }
})();

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
