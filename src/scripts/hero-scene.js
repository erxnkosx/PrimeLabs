/* Kalibratiemodus voor de hero-fotoscène.
   Open /#kalibreer en klik op de foto: je krijgt de waarden voor
   --tx/--ty (het punt van een aandachtspunt) én de SVG-coördinaten
   (dakcontour, lichtkegel). De --tx/--ty-regel gaat ook naar het klembord.
   --ky (knik en kaart) is dezelfde y-waarde, --ax dezelfde x-waarde. */
(() => {
  if (location.hash !== '#kalibreer') return;
  const scene = document.querySelector('.hs-scene');
  const stage = document.querySelector('.hs-stage--ui');
  if (!scene || !stage) return;

  document.documentElement.classList.add('hs-calib');
  const tip = document.createElement('div');
  tip.className = 'hs-calib__tip';
  tip.hidden = true;
  document.body.appendChild(tip);

  const read = e => {
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    return {
      css: `--tx:${(px * 100).toFixed(2)}%;--ty:${(py * 100).toFixed(2)}%`,
      svg: `${Math.round(px * 2000)},${Math.round(py * 1333)}`
    };
  };

  scene.addEventListener('mousemove', e => {
    const v = read(e);
    tip.hidden = false;
    tip.style.left = e.clientX + 'px';
    tip.style.top = e.clientY + 'px';
    tip.textContent = `${v.css}  ·  svg ${v.svg}`;
  });
  scene.addEventListener('mouseleave', () => { tip.hidden = true; });
  scene.addEventListener('click', e => {
    const v = read(e);
    console.log(`[hero] ${v.css}   svg: ${v.svg}`);
    navigator.clipboard?.writeText(v.css).catch(() => {});
  });
})();

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
