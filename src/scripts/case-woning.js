/* ==========================================================================
   Case 02 — interactief 3D-model van een woning (Gaussian splat, SOG)
   De PlayCanvas-engine en het model (7,4 MB) laden pas als de bezoeker op
   "Laad het 3D-model" klikt. Daarna: slepen = draaien, rechts slepen of twee
   vingers = verschuiven, scrollen of knijpen = zoomen, en vier vaste
   standpunten. Buiten beeld wordt er niet gerenderd.
   ========================================================================== */
const ENGINE = 'https://cdn.jsdelivr.net/npm/playcanvas@2.22.6/build/playcanvas.min.mjs';
const MODEL = '/assets/models/woning-3d.sog'; /* [Next.js] absoluut: de pagina staat niet meer in de root */

const stage = document.getElementById('modelStage');
const canvas = document.getElementById('modelCanvas');
const loadButton = document.getElementById('loadModel');
const loading = document.getElementById('modelLoading');
const loadingLabel = document.getElementById('loadingLabel');
const loadingProgress = document.getElementById('loadingProgress');
const errorBox = document.getElementById('modelError');
const controlsBox = document.getElementById('modelControls');
const presetBox = document.getElementById('modelPresets');
const resetButton = document.getElementById('resetModel');
const spinButton = document.getElementById('spinModel');
const hint = document.getElementById('viewerHint');
const viewLabel = document.getElementById('viewLabel');
const caption = document.getElementById('viewCaption');
const poster = document.querySelector('.sc-viewer__poster');
const status = document.getElementById('modelStatus');
const tabs = [...document.querySelectorAll('.sc-view-tab')];
const panels = [...document.querySelectorAll('[data-panel]')];
const presetButtons = [...document.querySelectorAll('[data-preset]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = window.matchMedia('(pointer: coarse)').matches;
const HINT_MODEL = touch ? 'Veeg = draaien · twee vingers = zoomen en verschuiven' : 'Slepen = draaien · rechts slepen = verschuiven · scrollen = zoomen';

/* standpunten in modelruimte (na de 180°-draaiing om z): doel, yaw, pitch (graden), afstand */
const PRESETS = {
  overzicht: { t: [-2, 3, -15.5], yaw: -22, pitch: 30, dist: 31, label: 'Overzicht van woning en tuin' },   /* = het posterbeeld */
  dak: { t: [-2, 6, -21], yaw: 20, pitch: 62, dist: 15, label: 'Plat dak: collector, koepels en doorvoeren' },
  gevel: { t: [-2, 2, -12], yaw: 0, pitch: 20, dist: 15, label: 'Achtergevel en terras' },
  tuin: { t: [-2, 1, 6], yaw: 200, pitch: 38, dist: 28, label: 'Tuin met overkapping' }
};
const LIMITS = { pitchMin: 4, pitchMax: 88, distMin: 5, distMax: 70 };

let pc = null;
let app = null;
let camera = null;
let loaded = false;
let loadingModel = false;
let currentView = 'model';
let visible = true;
let spin = !reducedMotion;
let lastInput = 0;
let poging = 0;          /* laadpogingen: een mislukte import onthoudt de browser */
let asset = null;
let focusNaLaden = false; /* stond de focus op de knop? een uitgeschakelde knop verliest ze meteen */

/* camera: huidige en gewenste toestand, gedempt naar elkaar toe */
const cur = { tx: 0, ty: 0, tz: 0, yaw: 0, pitch: 30, dist: 30 };
const goal = { ...cur };

function setGoal(p, instant) {
  goal.tx = p.t[0]; goal.ty = p.t[1]; goal.tz = p.t[2];
  /* de kortste weg rond: yaw-verschil binnen ±180° */
  let yaw = p.yaw;
  while (yaw - cur.yaw > 180) yaw -= 360;
  while (yaw - cur.yaw < -180) yaw += 360;
  goal.yaw = yaw; goal.pitch = p.pitch; goal.dist = p.dist;
  if (instant || reducedMotion) Object.assign(cur, goal);
}

function setView(name) {
  currentView = name;
  tabs.forEach((tab) => {
    const active = tab.dataset.view === name;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== name; });
  /* het canvas heeft al een maat terwijl het model laadt, maar blijft onzichtbaar
     (en dus onklikbaar) boven de poster tot het model er echt is */
  canvas.hidden = name !== 'model';
  canvas.style.visibility = loaded ? '' : 'hidden';
  if (poster) poster.hidden = name !== 'model' || loaded;
  stage.classList.toggle('is-image-view', name !== 'model');
  if (name !== 'model') errorBox.hidden = true;
  if (presetBox) presetBox.hidden = name !== 'model' || !loaded;
  controlsBox.hidden = name !== 'model' || !loaded;
  const labels = {
    model: ['3D-MODEL · GAUSSIAN SPLAT', 'Render uit het 3D-model. Laad het model om zelf rond de woning te draaien.', 'Gebruik de knoppen om van beeld te wisselen'],
    boven: ['BOVENAANZICHT UIT HET MODEL', 'Bovenaanzicht uit hetzelfde 3D-model: dakvlakken, terras en tuin in één beeld.', 'Bovenaanzicht · render uit het model'],
    dak: ['DAKDETAIL · BRONFOTO', 'Een van de 80 bronfoto’s: het platte dak met de zonnecollector, ventilatiekanalen, een dakopening en lichtkoepels.', 'Bronfoto · plat dak']
  };
  const [label, description, hintText] = labels[name];
  viewLabel.textContent = loaded && name === 'model' ? '3D-MODEL · INTERACTIEF' : label;
  caption.textContent = loaded && name === 'model'
    ? 'Interactief 3D-model uit 80 dronebeelden. Kies een standpunt of draai zelf rond de woning.'
    : description;
  hint.textContent = loaded && name === 'model' ? HINT_MODEL : hintText;
  if (app) app.autoRender = loaded && visible && name === 'model';
}
tabs.forEach((tab) => tab.addEventListener('click', () => setView(tab.dataset.view)));

function showError(message) {
  loading.hidden = true;
  if (!loaded) {
    canvas.style.visibility = 'hidden';
    if (poster) poster.hidden = currentView !== 'model';
  }
  errorBox.textContent = message;
  errorBox.hidden = false;
  loadingModel = false;
  loadButton.disabled = false;
  loadButton.textContent = 'Opnieuw proberen';
  if (focusNaLaden) loadButton.focus({ preventScroll: true });
}

function progress(fraction, text) {
  loadingProgress.style.width = `${Math.round(Math.max(0.03, Math.min(1, fraction)) * 100)}%`;
  loadingLabel.textContent = text;
}

/* ---------------- invoer: draaien, verschuiven, zoomen ---------------- */
const pointers = new Map();
let pinchStart = 0, pinchDist = 0;
function touched() { lastInput = performance.now(); }
function vrij() {
  touched();
  if (!loaded || !presetButtons.some((x) => x.getAttribute('aria-pressed') === 'true')) return;
  presetButtons.forEach((x) => x.setAttribute('aria-pressed', 'false'));
  viewLabel.textContent = '3D-MODEL · INTERACTIEF';
}
function pan(dx, dy) {
  /* verschuif het doel in het schermvlak, evenredig met de afstand.
     rechts R = (cos y, 0, -sin y), omhoog U = (-sin y sin p, cos p, -cos y sin p) */
  const k = cur.dist * 0.0016;
  const y = cur.yaw * Math.PI / 180, p = cur.pitch * Math.PI / 180;
  goal.tx += -Math.cos(y) * dx * k - Math.sin(y) * Math.sin(p) * dy * k;
  goal.ty += Math.cos(p) * dy * k;
  goal.tz += Math.sin(y) * dx * k - Math.cos(y) * Math.sin(p) * dy * k;
}
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
canvas.addEventListener('pointerdown', (e) => {
  canvas.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, button: e.button, shift: e.shiftKey });
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
    pinchDist = goal.dist;
  }
  touched();
});
canvas.addEventListener('pointermove', (e) => {
  const p = pointers.get(e.pointerId);
  if (!p) return;
  const dx = e.clientX - p.x, dy = e.clientY - p.y;
  p.x = e.clientX; p.y = e.clientY;
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (pinchStart > 0) goal.dist = clamp(pinchDist * pinchStart / d, LIMITS.distMin, LIMITS.distMax);
    pan(dx / 2, dy / 2);
  } else if (p.button === 2 || p.shift) {
    pan(dx, dy);
  } else {
    goal.yaw -= dx * 0.28;
    goal.pitch = clamp(goal.pitch + dy * 0.22, LIMITS.pitchMin, LIMITS.pitchMax);
  }
  vrij();
});
const release = (e) => { pointers.delete(e.pointerId); pinchStart = 0; };
canvas.addEventListener('pointerup', release);
canvas.addEventListener('pointercancel', release);
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  goal.dist = clamp(goal.dist * Math.exp(e.deltaY * 0.0011), LIMITS.distMin, LIMITS.distMax);
  vrij();
}, { passive: false });
/* toetsenbord: pijlen draaien, + en - zoomen */
canvas.tabIndex = 0;
canvas.addEventListener('keydown', (e) => {
  const step = { ArrowLeft: [8, 0, 1], ArrowRight: [-8, 0, 1], ArrowUp: [0, -5, 1], ArrowDown: [0, 5, 1], '+': [0, 0, 0.85], '=': [0, 0, 0.85], '-': [0, 0, 1.18] }[e.key];
  if (!step) return;
  e.preventDefault();
  goal.yaw += step[0];
  goal.pitch = clamp(goal.pitch + step[1], LIMITS.pitchMin, LIMITS.pitchMax);
  goal.dist = clamp(goal.dist * step[2], LIMITS.distMin, LIMITS.distMax);
  vrij();
});
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

presetButtons.forEach((b) => b.addEventListener('click', () => {
  const p = PRESETS[b.dataset.preset];
  if (!p) return;
  setGoal(p);
  presetButtons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  viewLabel.textContent = p.label.toUpperCase();
  touched();
}));
resetButton.addEventListener('click', () => {
  setGoal(PRESETS.overzicht);
  presetButtons.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.preset === 'overzicht')));
  viewLabel.textContent = PRESETS.overzicht.label.toUpperCase();
  touched();
});
spinButton.addEventListener('click', () => {
  spin = !spin;
  spinButton.setAttribute('aria-pressed', String(spin));
  lastInput = 0;
});

/* ---------------- laden ---------------- */
async function loadModel() {
  if (loadingModel || loaded) return;
  loadingModel = true;
  focusNaLaden = document.activeElement === loadButton;
  errorBox.hidden = true;
  loading.hidden = false;
  loadButton.disabled = true;
  progress(0.03, '3D-viewer laden…');
  if (!pc) {
    try {
      /* bij een nieuwe poging een andere URL: de browser onthoudt een mislukte import */
      /* [Next.js] webpackIgnore/turbopackIgnore: de browser laadt de engine zelf van jsDelivr, zoals voorheen */
      pc = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ poging++ ? `${ENGINE}?r=${poging}` : ENGINE);
    } catch (err) {
      showError('De 3D-viewer kon niet geladen worden. Controleer de verbinding en probeer opnieuw.');
      return;
    }
  }
  if (!app && !opzetten()) return;
  laadAsset();
}

/* engine, canvas en camera: één keer per pagina */
function opzetten() {
  try {
    app = new pc.Application(canvas, { graphicsDeviceOptions: { antialias: false, alpha: false, preferWebGl2: true } });
  } catch (err) {
    app = null;
    showError('Deze browser ondersteunt de 3D-weergave niet (WebGL 2 is nodig). Bekijk de beelden hieronder.');
    return false;
  }
  app.graphicsDevice.maxPixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  app.setCanvasFillMode(pc.FILLMODE_NONE);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);
  const resize = () => app && app.resizeCanvas(stage.clientWidth, stage.clientHeight);
  new ResizeObserver(resize).observe(stage);
  resize();
  app.autoRender = false;          /* pas tekenen als het model er is */
  app.start();
  camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color(0.063, 0.039, 0.137), fov: 45, nearClip: 0.1, farClip: 300 });
  app.root.addChild(camera);
  setGoal(PRESETS.overzicht, true);
  updateCamera(0);
  app.on('update', updateCamera);
  return true;
}

function laadAsset() {
  if (asset) { app.assets.remove(asset); asset = null; }
  const a = asset = new pc.Asset('woning', 'gsplat', { url: MODEL });
  a.on('progress', (done, total) => {
    if (!total) { progress(0.4, '3D-model laden…'); return; }
    const mb = (done / 1e6).toFixed(1).replace('.', ','), tot = (total / 1e6).toFixed(1).replace('.', ',');
    progress(0.08 + 0.84 * done / total, done >= total ? 'Model ontvangen · weergave voorbereiden…' : `3D-model laden… ${mb} / ${tot} MB`);
  });
  a.on('error', () => showError('Het 3D-model kon niet geladen worden. Bekijk de beelden hieronder of probeer opnieuw.'));
  a.on('load', () => {
    const splat = new pc.Entity('woning');
    splat.addComponent('gsplat', { asset: a });
    splat.setLocalEulerAngles(0, 0, 180);    /* de scan komt met de y-as omlaag binnen */
    app.root.addChild(splat);
    loaded = true;
    loadingModel = false;
    loading.hidden = true;
    loadButton.hidden = true;
    stage.dataset.viewerState = 'ready';
    presetButtons.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.preset === 'overzicht')));
    spinButton.setAttribute('aria-pressed', String(spin));
    setView(currentView);
    if (focusNaLaden) canvas.focus({ preventScroll: true });   /* de focus niet naar <body> laten vallen */
    if (status) status.textContent = '3D-model geladen. Pijltjestoetsen draaien, plus en min zoomen.';
    lastInput = performance.now() - 2500;
  });
  app.assets.add(a);
  app.assets.load(a);
}

function updateCamera(dt) {
  if (!camera) return;
  /* rustige autorotatie tot de bezoeker zelf iets doet (en 5 s daarna weer) */
  if (spin && loaded && performance.now() - lastInput > 5000) goal.yaw += dt * 5;
  const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 6);
  for (const key of ['tx', 'ty', 'tz', 'yaw', 'pitch', 'dist']) cur[key] += (goal[key] - cur[key]) * (dt ? k : 1);
  const yaw = cur.yaw * Math.PI / 180, pitch = cur.pitch * Math.PI / 180;
  camera.setPosition(
    cur.tx + cur.dist * Math.cos(pitch) * Math.sin(yaw),
    cur.ty + cur.dist * Math.sin(pitch),
    cur.tz + cur.dist * Math.cos(pitch) * Math.cos(yaw)
  );
  camera.lookAt(cur.tx, cur.ty, cur.tz);
}

/* buiten beeld: niet renderen */
new IntersectionObserver((entries) => {
  visible = entries[0].isIntersecting;
  if (app) app.autoRender = loaded && visible && currentView === 'model';
}, { threshold: 0.02 }).observe(stage);

loadButton.addEventListener('click', loadModel);

/* lichtbak voor de bronfoto's */
const dialog = document.getElementById('photoDialog');
if (dialog && typeof dialog.showModal === 'function') {
  const img = dialog.querySelector('img'), cap = dialog.querySelector('p');
  document.querySelectorAll('[data-photo]').forEach((btn) => btn.addEventListener('click', () => {
    img.style.visibility = 'hidden';
    img.onload = () => { img.style.visibility = ''; };
    img.src = btn.dataset.photo;
    img.alt = btn.querySelector('img').alt;
    cap.textContent = btn.dataset.caption || '';
    dialog.showModal();
  }));
  dialog.querySelector('[data-close-photo]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
}

/* debughaak voor tests en posters */
window.PLwoning = {
  load: loadModel,
  get loaded() { return loaded; },
  view: (name) => setView(name),
  preset: (name) => { setGoal(PRESETS[name], true); updateCamera(0); },
  set: (t, yaw, pitch, dist) => { setGoal({ t, yaw, pitch, dist }, true); updateCamera(0); },
  spin: (on) => { spin = on; },
  state: () => ({ ...cur }),
  fps: () => (app && app.stats ? Math.round(app.stats.frame.fps) : 0),
  get rendert() { return !!(app && app.autoRender); }
};

setView('model');

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
