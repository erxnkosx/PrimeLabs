/* ==========================================================================
   Start van de testpagina /prototype/diensten (was een inline <script> in
   prototype-diensten.html). three.js, scene.js en scene-services.js zijn op dit
   moment al geladen door PageScripts.
   ========================================================================== */
(function () {
  var TITLES = [
    ['01', 'Visuele dak- en gevelinspecties'],
    ['02', 'Periodieke werfopvolging'],
    ['03', 'Fotogrammetrie & 3D-modellering']
  ];
  if (!window.THREE || !window.PL3D || !window.PL3D.previewService) return;
  var n = window.PL3D.serviceCount ? window.PL3D.serviceCount() : 0;
  var grid = document.getElementById('grid');
  window.__S = {};
  for (var i = 0; i < n; i++) {
    var t = TITLES[i] || [String(i + 1), 'Scène ' + (i + 1)];
    var card = document.createElement('article');
    card.className = 'card';
    card.innerHTML =
      '<div class="view2"><span class="tag"><i class="hud-dot"></i> Dienst ' + t[0] + '</span>' +
      '<canvas id="sc' + i + '"></canvas><span class="hudl" id="hd' + i + '">—</span></div>' +
      '<div class="body2"><h2>' + t[1] + '</h2><p id="mt' + i + '">—</p></div>';
    grid.appendChild(card);
  }
  for (var j = 0; j < n; j++) {
    try {
      var api = window.PL3D.previewService(document.getElementById('sc' + j), j);
      window.__S['sc' + j] = api;
      if (api && api.hud) {
        document.getElementById('hd' + j).textContent = api.hud.label || '';
        document.getElementById('mt' + j).textContent =
          (api.hud.label || '') + (api.hud.meta ? ' · ' + api.hud.meta : '');
      }
    } catch (e) { console.error('scene ' + j, e); }
  }
})();

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
