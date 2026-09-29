/* ==========================================================================
   PRIMELABS — WebGL inspection scenes (three.js)
   PL3D.hero(canvas, opts)     : dak/gevel scanvolume met drone + aandachtspunten
   PL3D.process(canvas)        : vijf fasen van de werkwijze in een scene
   PL3D.beacon(canvas)         : locatiemarkering (offertepagina)
   PL3D.kit()                  : bouwstenen voor de dienstenscenes (scene-services.js)
   ========================================================================== */
window.PL3D = (function () {
  var T = window.THREE;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- helpers ---------------- */
  function renderer(canvas) {
    var r = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    r.setClearColor(0x000000, 0);
    return r;
  }
  function edges(geo, color, op) {
    return new T.LineSegments(new T.EdgesGeometry(geo),
      new T.LineBasicMaterial({ color: color, transparent: true, opacity: op === undefined ? 0.85 : op }));
  }
  function solid(w, h, d, fill, ec, eo) {
    var g = new T.Group();
    var geo = new T.BoxGeometry(w, h, d);
    g.add(new T.Mesh(geo, new T.MeshStandardMaterial({
      color: fill === undefined ? 0x1a0b40 : fill, roughness: 0.92, metalness: 0.06, flatShading: false
    })));
    g.add(edges(geo, ec === undefined ? 0x962fbc : ec, eo));
    g.userData.geo = geo;
    return g;
  }
  function glowPlane(w, h, color, op) {
    return new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({
      color: color, transparent: true, opacity: op, side: T.DoubleSide,
      blending: T.AdditiveBlending, depthWrite: false
    }));
  }
  function dust(count, spread, color) {
    var pos = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = Math.random() * spread * 0.55;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    var g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(pos, 3));
    return new T.Points(g, new T.PointsMaterial({
      color: color, size: 0.028, transparent: true, opacity: 0.55, depthWrite: false, blending: T.AdditiveBlending
    }));
  }
  function lights(scene) {
    scene.add(new T.AmbientLight(0x4a2bb0, 0.42));
    var d = new T.DirectionalLight(0xe8dcfb, 0.38); d.position.set(4, 7, 4); scene.add(d);
    var p1 = new T.PointLight(0x962fbc, 9, 13); p1.position.set(-4, 3.2, 3.4); scene.add(p1);
    var p2 = new T.PointLight(0x3a078a, 7, 15); p2.position.set(4.5, 2.4, -3.2); scene.add(p2);
    return { p1: p1, p2: p2 };
  }
  /* small quadcopter */
  function drone() {
    var g = new T.Group();
    var body = solid(0.3, 0.085, 0.3, 0x120832, 0xb769d3, 0.95);
    g.add(body);
    var rotors = [];
    [[0.21, 0.21], [-0.21, 0.21], [0.21, -0.21], [-0.21, -0.21]].forEach(function (a) {
      var arm = solid(0.03, 0.02, 0.03, 0x120832, 0x6b0a93, 0.6);
      arm.scale.set(1, 1, 6.5);
      arm.position.set(a[0] * 0.5, 0, a[1] * 0.5);
      arm.rotation.y = Math.atan2(a[0], a[1]);
      g.add(arm);
      var r = new T.Mesh(new T.TorusGeometry(0.1, 0.011, 6, 22),
        new T.MeshBasicMaterial({ color: 0xd6a5e9, transparent: true, opacity: 0.9 }));
      r.rotation.x = Math.PI / 2; r.position.set(a[0], 0.045, a[1]);
      g.add(r); rotors.push(r);
    });
    var cone = new T.Mesh(new T.ConeGeometry(0.4, 1.5, 20, 1, true),
      new T.MeshBasicMaterial({ color: 0x962fbc, transparent: true, opacity: 0.11, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
    cone.position.y = -0.78; cone.rotation.x = Math.PI;
    g.add(cone);
    g.userData.rotors = rotors;
    return g;
  }
  /* pointer / drag orbit */
  function orbit(el, state, range) {
    var down = false, px = 0, py = 0;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5;
      var ny = (e.clientY - r.top) / r.height - 0.5;
      state.tYaw = state.base + nx * range.y + state.dragY;
      state.tPitch = Math.max(-0.42, Math.min(0.5, -ny * range.x + state.dragX));
      if (down) {
        state.dragY += (e.clientX - px) * 0.006;
        state.dragX += (e.clientY - py) * 0.004;
        px = e.clientX; py = e.clientY;
      }
    });
    el.addEventListener('pointerdown', function (e) { down = true; px = e.clientX; py = e.clientY; el.setPointerCapture && el.setPointerCapture(e.pointerId); });
    window.addEventListener('pointerup', function () { down = false; });
    el.addEventListener('pointerleave', function () { state.tYaw = state.base + state.dragY; state.tPitch = state.dragX; });
  }
  /* rAF loop that pauses off-screen and on hidden tabs */
  function loop(canvas, step) {
    var raf = 0, t0 = performance.now(), last = t0;
    try { step(0, 0); } catch (e) { }   /* eerste frame direct: nooit een zwart paneel */
    function frame(t) {
      raf = requestAnimationFrame(frame);
      var r = canvas.getBoundingClientRect();           /* pauze buiten beeld */
      if (r.bottom < -160 || r.top > window.innerHeight + 160) { last = t; return; }
      step((t - t0) / 1000, Math.min(0.05, (t - last) / 1000));
      last = t;
    }
    raf = requestAnimationFrame(frame);
    var api = function () { cancelAnimationFrame(raf); };
    api.frame = function (t) { step(t, 0.016); };   /* handmatig frame (tests/preview) */
    return api;
  }
  function sizer(canvas, renderer, camera) {
    var rect = { w: 1, h: 1 };
    function fit() {
      var w = canvas.clientWidth || canvas.parentNode.clientWidth;
      var h = canvas.clientHeight || canvas.parentNode.clientHeight;
      if (!w || !h) return;
      rect.w = w; rect.h = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(canvas.parentNode);
    else window.addEventListener('resize', fit);
    return rect;
  }

  /* =======================================================================
     HERO — gebouw met dak, scanvolume, drone en genummerde aandachtspunten
     ======================================================================= */
  function hero(canvas, opts) {
    T = window.THREE;
    if (!T || !canvas) return null;
    opts = opts || {};
    var markerEls = opts.markers || [];
    var onHover = opts.onHover || function () { };

    var scene = new T.Scene();
    scene.fog = new T.Fog(0x0a0520, 9, 21);
    var camera = new T.PerspectiveCamera(34, 1, 0.1, 60);
    camera.position.set(6.4, 4.4, 7.4);
    camera.lookAt(0, 0.85, 0);
    var rnd = renderer(canvas);
    var rect = sizer(canvas, rnd, camera);
    lights(scene);

    var world = new T.Group(); scene.add(world);

    /* ground grid */
    var grid = new T.GridHelper(26, 26, 0x6b0a93, 0x231055);
    grid.material.transparent = true; grid.material.opacity = 0.28;
    world.add(grid);
    var floor = glowPlane(26, 26, 0x241058, 0.05); floor.rotation.x = -Math.PI / 2; floor.position.y = -0.01;
    world.add(floor);

    /* building */
    var b = new T.Group(); b.position.y = 0.0; world.add(b);
    var main = solid(3.5, 1.5, 2.5, 0x120830, 0x962fbc, 0.9); main.position.y = 0.75; b.add(main);
    var roof = solid(3.62, 0.08, 2.62, 0x1a0b40, 0xb769d3, 0.95); roof.position.y = 1.54; b.add(roof);
    var annex = solid(1.5, 0.95, 1.35, 0x120830, 0x962fbc, 0.75); annex.position.set(-2.3, 0.475, 0.5); b.add(annex);
    var annexRoof = solid(1.6, 0.06, 1.45, 0x1a0b40, 0xb769d3, 0.9); annexRoof.position.set(-2.3, 0.98, 0.5); b.add(annexRoof);
    var hvac = solid(0.55, 0.3, 0.55, 0x1e1048, 0xd6a5e9, 0.9); hvac.position.set(0.95, 1.73, -0.6); b.add(hvac);
    var hvac2 = solid(0.38, 0.22, 0.38, 0x1e1048, 0xd6a5e9, 0.8); hvac2.position.set(-0.75, 1.69, 0.72); b.add(hvac2);
    var pipeGeo = new T.CylinderGeometry(0.09, 0.09, 0.5, 14);
    var pipe = new T.Mesh(pipeGeo, new T.MeshStandardMaterial({ color: 0x201048, roughness: 0.85 }));
    pipe.position.set(1.45, 1.83, 0.55); b.add(pipe);
    var pipeEdge = edges(pipeGeo, 0xd6a5e9, 0.5);
    pipeEdge.position.copy(pipe.position); b.add(pipeEdge);
    /* facade ribs for depth */
    for (var i = -1; i <= 1; i++) {
      var rib = glowPlane(0.02, 1.3, 0x6b0a93, 0.22);
      rib.position.set(i * 1.1, 0.78, 1.262); b.add(rib);
    }

    /* scan volume cage */
    var cageGeo = new T.BoxGeometry(4.9, 2.9, 3.9);
    var cage = edges(cageGeo, 0x6b0a93, 0.16); cage.position.y = 1.35; world.add(cage);

    /* sweeping scan plane */
    var scan = glowPlane(4.9, 3.9, 0x5342d7, 0.16); scan.rotation.x = -Math.PI / 2; world.add(scan);
    var scanEdge = edges(new T.BoxGeometry(4.9, 0.001, 3.9), 0xd6a5e9, 0.55); world.add(scanEdge);

    /* aandachtspunten */
    var pts = [
      { p: new T.Vector3(0.95, 1.72, -0.6), n: new T.Vector3(0, 1, 0), t: 'Dakdoorvoer' },
      { p: new T.Vector3(-1.35, 0.78, 1.3), n: new T.Vector3(0, 0.25, 1).normalize(), t: 'Gevelzone' },
      { p: new T.Vector3(-2.3, 1.12, 0.5), n: new T.Vector3(-0.35, 1, 0).normalize(), t: 'Dakrand annex' }
    ];
    var nodes = pts.map(function (o) {
      var g = new T.Group(); g.position.copy(o.p);
      var core = new T.Mesh(new T.SphereGeometry(0.055, 16, 16), new T.MeshBasicMaterial({ color: 0xf1e4fb }));
      var halo = new T.Mesh(new T.SphereGeometry(0.11, 16, 16), new T.MeshBasicMaterial({ color: 0x962fbc, transparent: true, opacity: 0.28, blending: T.AdditiveBlending, depthWrite: false }));
      var ring = new T.Mesh(new T.RingGeometry(0.15, 0.175, 40), new T.MeshBasicMaterial({ color: 0xb769d3, transparent: true, opacity: 0.6, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
      var beam = glowPlane(0.012, 1.2, 0xb769d3, 0.18); beam.position.y = -0.6;
      g.add(core, halo, ring, beam);
      g.userData = { halo: halo, ring: ring, core: core, on: 0 };
      b.add(g);
      return g;
    });

    /* drone */
    var dr = drone(); world.add(dr);

    world.add(dust(240, 9, 0xb769d3));

    /* interaction state */
    var st = { yaw: 0, pitch: 0, tYaw: 0, tPitch: 0, base: 0, dragX: 0, dragY: 0 };
    orbit(canvas, st, { x: 0.34, y: 0.72 });

    markerEls.forEach(function (el, i) {
      el.addEventListener('pointerenter', function () { markerEls.forEach(function (e) { e.classList.remove('on'); }); el.classList.add('on'); onHover(i, pts[i]); });
      el.addEventListener('pointerleave', function () { el.classList.remove('on'); onHover(-1); });
    });

    var pv = new T.Vector3(), wp = new T.Vector3(), nrm = new T.Vector3(), toCam = new T.Vector3(), quat = new T.Quaternion();
    var stop = loop(canvas, function (t) {
      var ease = RM ? 1 : 0.06;
      st.yaw += (st.tYaw - st.yaw) * ease;
      st.pitch += (st.tPitch - st.pitch) * ease;
      world.rotation.y = st.yaw + (RM ? 0.2 : t * 0.055);
      world.rotation.x = st.pitch * 0.5;

      /* scan sweep */
      var s = (Math.sin(t * 0.55) * 0.5 + 0.5);
      var y = 0.06 + s * 2.5;
      scan.position.y = y; scanEdge.position.y = y;
      scan.material.opacity = 0.05 + 0.09 * Math.sin(t * 0.55) * Math.sin(t * 0.55);

      /* drone orbit */
      var a = t * 0.34;
      dr.position.set(Math.cos(a) * 3.05, 2.5 + Math.sin(t * 1.1) * 0.1, Math.sin(a) * 2.6);
      dr.rotation.y = -a + Math.PI / 2;
      dr.rotation.z = Math.sin(t * 0.8) * 0.05;
      dr.userData.rotors.forEach(function (r, i) { r.rotation.z += 0.9 * (i % 2 ? 1 : -1); });

      /* nodes pulse + hover state */
      nodes.forEach(function (n, i) {
        var hot = markerEls[i] && markerEls[i].classList.contains('on') ? 1 : 0;
        n.userData.on += (hot - n.userData.on) * 0.12;
        var pulse = 1 + Math.sin(t * 2.2 + i * 1.7) * 0.12 + n.userData.on * 0.5;
        n.userData.ring.scale.setScalar(pulse);
        n.userData.ring.material.opacity = 0.35 + 0.25 * Math.sin(t * 2.2 + i) + n.userData.on * 0.35;
        n.userData.halo.scale.setScalar(1 + n.userData.on * 0.7);
        n.userData.ring.lookAt(camera.position);
      });

      rnd.render(scene, camera);

      /* projecteer de 3D-punten naar de HTML-markers; punten die van de
         camera wegdraaien faden uit zodat niets door het gebouw heen zweeft */
      b.getWorldQuaternion(quat);
      for (var k = 0; k < markerEls.length; k++) {
        nodes[k].getWorldPosition(wp);
        pv.copy(wp).project(camera);
        var x = (pv.x * 0.5 + 0.5) * rect.w, yy = (-pv.y * 0.5 + 0.5) * rect.h;
        nrm.copy(pts[k].n).applyQuaternion(quat);
        toCam.copy(camera.position).sub(wp).normalize();
        var face = Math.max(0, Math.min(1, (nrm.dot(toCam) - 0.04) / 0.3));
        var el = markerEls[k];
        el.style.transform = 'translate3d(' + (x - 14) + 'px,' + (yy - 14) + 'px,0) scale(' + (0.86 + face * 0.14 + (el.classList.contains('on') ? 0.22 : 0)).toFixed(3) + ')';
        el.style.opacity = pv.z < 1 ? face.toFixed(3) : 0;
        el.style.pointerEvents = face > 0.5 ? 'auto' : 'none';
      }
    });

    return { stop: stop, camera: camera, scene: scene };
  }


  /* ---------------- fase-helpers (in/uit faden per stap) ---------------- */
  function parts(root) {
    var mats = [];
    root.traverse(function (o) {
      if (!o.material) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
        if (m.__base === undefined) { m.__base = (m.opacity === undefined ? 1 : m.opacity); m.transparent = true; }
        mats.push(m);
      });
    });
    return { root: root, mats: mats, k: 0 };
  }
  function applyK(p) {
    p.root.visible = p.k > 0.012;
    for (var i = 0; i < p.mats.length; i++) p.mats[i].opacity = p.mats[i].__base * p.k;
  }
  function track(list, s) {              /* lineair interpoleren tussen fasen */
    var i = Math.floor(s), f = s - i, a = list[Math.min(i, list.length - 1)], b = list[Math.min(i + 1, list.length - 1)];
    return a + (b - a) * f;
  }
  function locationPin(T) {
    var pin = new T.Group();
    pin.add(new T.Mesh(new T.OctahedronGeometry(0.2), new T.MeshBasicMaterial({ color: 0xd6a5e9, transparent: true, opacity: 0.95 })));
    pin.add(new T.Mesh(new T.SphereGeometry(0.36, 16, 16), new T.MeshBasicMaterial({ color: 0x962fbc, transparent: true, opacity: 0.2, blending: T.AdditiveBlending, depthWrite: false })));
    var b1 = glowPlane(0.02, 2.6, 0xb769d3, 0.28); b1.position.y = -1.3;
    var b2 = glowPlane(0.02, 2.6, 0xb769d3, 0.28); b2.position.y = -1.3; b2.rotation.y = Math.PI / 2;
    pin.add(b1, b2);
    return pin;
  }

  /* =======================================================================
     PROCESS — één scène, vijf fasen; gestuurd door de scrollpositie
     ======================================================================= */
  function process(canvas) {
    T = window.THREE;
    if (!T || !canvas) return null;

    var scene = new T.Scene();
    scene.fog = new T.Fog(0x0a0520, 11, 27);
    var camera = new T.PerspectiveCamera(34, 1, 0.1, 60);
    camera.position.set(7.4, 5.6, 8.4);
    var rnd = renderer(canvas), rect = sizer(canvas, rnd, camera);
    var L = lights(scene);
    L.p1.position.set(-5, 5.5, 4.5); L.p1.intensity = 8; L.p1.distance = 19;
    L.p2.position.set(5, 4.5, -4); L.p2.intensity = 6; L.p2.distance = 19;

    var world = new T.Group(); scene.add(world);
    var grid = new T.GridHelper(24, 24, 0x6b0a93, 0x231055);
    grid.material.transparent = true; grid.material.opacity = 0.26; world.add(grid);

    /* het gebouw staat er altijd */
    var b = new T.Group(); world.add(b);
    var main = solid(3.2, 1.4, 2.3, 0x120830, 0x962fbc, 0.8); main.position.y = 0.7; b.add(main);
    var roof = solid(3.32, 0.08, 2.42, 0x1a0b40, 0xb769d3, 0.95); roof.position.y = 1.44; b.add(roof);
    var annex = solid(1.35, 0.9, 1.25, 0x120830, 0x962fbc, 0.7); annex.position.set(-2.1, 0.45, 0.45); b.add(annex);
    var annexRoof = solid(1.45, 0.06, 1.35, 0x1a0b40, 0xb769d3, 0.8); annexRoof.position.set(-2.1, 0.93, 0.45); b.add(annexRoof);
    var hvac = solid(0.5, 0.28, 0.5, 0x1e1048, 0xd6a5e9, 0.85); hvac.position.set(0.85, 1.62, -0.55); b.add(hvac);

    /* 01 — vraag & locatie */
    var pin = locationPin(T); pin.position.set(0.2, 2.6, 0.1); world.add(pin);
    var pinRing = new T.Mesh(new T.RingGeometry(0.5, 0.56, 48),
      new T.MeshBasicMaterial({ color: 0xb769d3, transparent: true, opacity: 0.45, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
    pinRing.rotation.x = -Math.PI / 2; pinRing.position.set(0.2, 0.02, 0.1); world.add(pinRing);

    /* 02 — scope: afgesproken inspectiezones */
    function zone(w, h, pos, rot, color) {
      var g = new T.Group();
      g.add(glowPlane(w, h, color, 0.11));
      g.add(new T.LineSegments(new T.EdgesGeometry(new T.PlaneGeometry(w, h)),
        new T.LineBasicMaterial({ color: color, transparent: true, opacity: 0.8 })));
      g.position.copy(pos); g.rotation.set(rot[0], rot[1], rot[2]);
      return g;
    }
    var zones = new T.Group(); world.add(zones);
    zones.add(zone(2.5, 1.7, new T.Vector3(0, 1.5, 0), [-Math.PI / 2, 0, 0], 0xd6a5e9));
    zones.add(zone(1.5, 0.85, new T.Vector3(-0.55, 0.8, 1.17), [0, 0, 0], 0xb769d3));
    zones.add(zone(0.95, 0.8, new T.Vector3(-2.1, 0.99, 0.45), [-Math.PI / 2, 0, 0], 0xb769d3));

    /* 03 — opname: drone + scanvlak */
    var fly = new T.Group(); world.add(fly);
    var dr = drone(); fly.add(dr);
    var scan = glowPlane(4.3, 3.3, 0x5342d7, 0.15); scan.rotation.x = -Math.PI / 2; fly.add(scan);
    var scanEdge = edges(new T.BoxGeometry(4.3, 0.001, 3.3), 0xd6a5e9, 0.5); fly.add(scanEdge);

    /* 04 — selectie: genummerde aandachtspunten */
    var marks = new T.Group(); world.add(marks);
    var rings = [];
    [new T.Vector3(0.85, 1.72, -0.55), new T.Vector3(-0.55, 0.82, 1.22), new T.Vector3(-2.1, 1.05, 0.45)]
      .forEach(function (p) {
        var g = new T.Group(); g.position.copy(p);
        g.add(new T.Mesh(new T.SphereGeometry(0.06, 16, 16), new T.MeshBasicMaterial({ color: 0xf1e4fb })));
        g.add(new T.Mesh(new T.SphereGeometry(0.13, 16, 16), new T.MeshBasicMaterial({ color: 0x962fbc, transparent: true, opacity: 0.3, blending: T.AdditiveBlending, depthWrite: false })));
        var ring = new T.Mesh(new T.RingGeometry(0.17, 0.2, 40),
          new T.MeshBasicMaterial({ color: 0xb769d3, transparent: true, opacity: 0.55, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
        g.add(ring); rings.push(ring); marks.add(g);
      });

    /* 05 — oplevering: het dossier */
    var doc = new T.Group(); doc.position.set(0, 2.7, 0); world.add(doc);
    [-1, 0, 1].forEach(function (dx) {
      var s = new T.Group();
      s.add(glowPlane(1.0, 1.35, 0x5342d7, 0.15));
      s.add(new T.LineSegments(new T.EdgesGeometry(new T.PlaneGeometry(1.0, 1.35)),
        new T.LineBasicMaterial({ color: 0xd6a5e9, transparent: true, opacity: 0.7 })));
      for (var r = 0; r < 4; r++) {
        var ln = glowPlane(0.6 - 0.09 * r, 0.026, 0xb769d3, 0.45);
        ln.position.set(-0.14, 0.4 - r * 0.2, 0.004); s.add(ln);
      }
      s.position.set(dx * 1.22, dx * 0.06, -dx * 0.3);
      s.rotation.set(-0.16, dx * 0.42, dx * 0.05);
      doc.add(s);
    });

    var G = [
      { p: parts(pin), on: [1, 0.5, 0.12, 0.08, 0.08] },
      { p: parts(pinRing), on: [1, 0.65, 0.25, 0.18, 0.12] },
      { p: parts(zones), on: [0, 1, 0.7, 0.5, 0.4] },
      { p: parts(fly), on: [0, 0.12, 1, 0.3, 0.08] },
      { p: parts(marks), on: [0, 0, 0.35, 1, 0.8] },
      { p: parts(doc), on: [0, 0, 0, 0.18, 1] }
    ];
    var cams = [
      { p: [7.4, 5.6, 8.4], t: [0, 0.9, 0] },
      { p: [6.6, 4.8, 7.6], t: [0, 0.9, 0] },
      { p: [5.4, 3.5, 6.6], t: [0, 0.9, 0] },
      { p: [4.9, 4.0, 6.0], t: [0, 1.0, 0] },
      { p: [5.8, 5.6, 7.2], t: [0, 1.8, 0] }
    ];
    var stage = 0, sm = 0;
    var st = { yaw: 0, pitch: 0, tYaw: 0, tPitch: 0, base: 0, dragX: 0, dragY: 0 };
    orbit(canvas, st, { x: 0.26, y: 0.6 });
    var cp = new T.Vector3(), ct = new T.Vector3();

    var stop = loop(canvas, function (t) {
      sm += (stage - sm) * (RM ? 1 : 0.055);
      var ease = RM ? 1 : 0.06;
      st.yaw += (st.tYaw - st.yaw) * ease;
      st.pitch += (st.tPitch - st.pitch) * ease;
      world.rotation.y = st.yaw + (RM ? 0.3 : t * 0.045);
      world.rotation.x = st.pitch * 0.4;

      for (var i = 0; i < G.length; i++) {
        var want = track(G[i].on, sm);
        G[i].p.k += (want - G[i].p.k) * (RM ? 1 : 0.1);
        applyK(G[i].p);
      }

      /* fase-eigen beweging */
      pin.position.y = 2.6 + Math.sin(t * 1.5) * 0.07;
      pinRing.scale.setScalar(1 + (Math.sin(t * 1.6) * 0.5 + 0.5) * 0.5);
      var sy = 0.06 + (Math.sin(t * 0.6) * 0.5 + 0.5) * 2.3;
      scan.position.y = sy; scanEdge.position.y = sy;
      var a = t * 0.36;
      dr.position.set(Math.cos(a) * 2.9, 2.35 + Math.sin(t * 1.1) * 0.09, Math.sin(a) * 2.5);
      dr.rotation.y = -a + Math.PI / 2;
      dr.userData.rotors.forEach(function (r, k) { r.rotation.z += 0.85 * (k % 2 ? 1 : -1); });
      rings.forEach(function (r, k) {
        r.scale.setScalar(1 + Math.sin(t * 2.1 + k * 1.4) * 0.12);
        r.lookAt(camera.position);
      });
      doc.position.y = 2.7 + Math.sin(t * 0.9) * 0.06;
      doc.rotation.y = Math.sin(t * 0.25) * 0.14;

      /* camera volgt de fase */
      var i0 = Math.floor(sm), f = sm - i0, c0 = cams[Math.min(i0, cams.length - 1)], c1 = cams[Math.min(i0 + 1, cams.length - 1)];
      cp.set(c0.p[0] + (c1.p[0] - c0.p[0]) * f, c0.p[1] + (c1.p[1] - c0.p[1]) * f, c0.p[2] + (c1.p[2] - c0.p[2]) * f);
      ct.set(c0.t[0] + (c1.t[0] - c0.t[0]) * f, c0.t[1] + (c1.t[1] - c0.t[1]) * f, c0.t[2] + (c1.t[2] - c0.t[2]) * f);
      camera.position.lerp(cp, RM ? 1 : 0.06);
      camera.lookAt(ct);

      rnd.render(scene, camera);
    });

    return { stop: stop, setStage: function (i) { stage = Math.max(0, Math.min(cams.length - 1, i)); } };
  }

  /* =======================================================================
     BEACON — compacte locatiescène (offertepagina)
     ======================================================================= */
  function beacon(canvas) {
    T = window.THREE;
    if (!T || !canvas) return null;

    var scene = new T.Scene();
    scene.fog = new T.Fog(0x0a0520, 7, 18);
    var camera = new T.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 3.2, 6.6);
    camera.lookAt(0, 0.7, 0);
    var rnd = renderer(canvas), rect = sizer(canvas, rnd, camera);
    var L = lights(scene);
    L.p1.position.set(-3.5, 4, 3); L.p1.intensity = 6; L.p1.distance = 14;
    L.p2.position.set(3.5, 3, -3); L.p2.intensity = 5; L.p2.distance = 14;

    var world = new T.Group(); world.rotation.y = -0.3; scene.add(world);
    var grid = new T.GridHelper(16, 16, 0x6b0a93, 0x231055);
    grid.material.transparent = true; grid.material.opacity = 0.24; world.add(grid);

    /* wat bebouwing rondom, laag en rustig */
    [[-2.6, -1.2, 1.3, 0.55, 1.1], [2.4, -1.6, 1.2, 0.8, 1.0], [-2.2, 1.7, 1.0, 0.45, 0.9],
     [2.7, 1.5, 1.1, 0.6, 1.2], [0.1, -2.6, 1.4, 0.4, 1.0]].forEach(function (s) {
      var g = solid(s[2], s[3], s[4], 0x120830, 0x7b2fb8, 0.5);
      g.position.set(s[0], s[3] / 2, s[1]); world.add(g);
    });
    var target = solid(1.5, 1.0, 1.3, 0x1a0b40, 0xb769d3, 0.9);
    target.position.set(0.1, 0.5, 0.1); world.add(target);

    var pin = locationPin(T); pin.position.set(0.1, 2.05, 0.1); world.add(pin);
    var rings = [];
    for (var i = 0; i < 3; i++) {
      var r = new T.Mesh(new T.RingGeometry(0.44, 0.48, 48),
        new T.MeshBasicMaterial({ color: 0xb769d3, transparent: true, opacity: 0.5, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
      r.rotation.x = -Math.PI / 2; r.position.set(0.1, 0.02 + i * 0.001, 0.1);
      world.add(r); rings.push(r);
    }
    world.add(dust(140, 8, 0xb769d3));

    var st = { yaw: -0.3, pitch: 0, tYaw: -0.3, tPitch: 0, base: -0.3, dragX: 0, dragY: 0 };
    orbit(canvas, st, { x: 0.2, y: 0.5 });

    var stop = loop(canvas, function (t) {
      var ease = RM ? 1 : 0.06;
      st.yaw += (st.tYaw - st.yaw) * ease;
      st.pitch += (st.tPitch - st.pitch) * ease;
      world.rotation.y = st.yaw + (RM ? 0 : Math.sin(t * 0.12) * 0.2);
      world.rotation.x = st.pitch * 0.3;
      pin.position.y = 2.05 + Math.sin(t * 1.5) * 0.06;
      rings.forEach(function (r, i) {
        var ph = (t * 0.45 + i / 3) % 1;
        r.scale.setScalar(0.6 + ph * 3.2);
        r.material.opacity = 0.5 * (1 - ph);
      });
      rnd.render(scene, camera);
    });
    return { stop: stop };
  }

  /* =======================================================================
     KIT — bouwstenen waarmee de dienstenscènes worden samengesteld
     ======================================================================= */
  function rnd(seed) {                       /* deterministisch: zelfde layout elke load */
    var a = (seed || 1) >>> 0;
    return function () {
      a += 0x6D2B79F5; a >>>= 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function grid(size, div, op) {
    var g = new T.GridHelper(size, div, 0x6b0a93, 0x231055);
    g.material.transparent = true; g.material.opacity = op === undefined ? 0.24 : op;
    return g;
  }
  function gableRoof(w, h, d, fill, ec) {
    var s = new T.Shape();
    s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.lineTo(-w / 2, 0);
    var geo = new T.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
    geo.translate(0, 0, -d / 2);
    var g = new T.Group();
    g.add(new T.Mesh(geo, new T.MeshStandardMaterial({ color: fill, roughness: 0.9 })));
    g.add(edges(geo, ec, 0.9));
    return g;
  }
  function parapet(w, d, h, th, fill, ec) {
    var g = new T.Group();
    [[0, d / 2 - th / 2, w, th], [0, -d / 2 + th / 2, w, th],
     [w / 2 - th / 2, 0, th, d], [-w / 2 + th / 2, 0, th, d]].forEach(function (p) {
      var b = solid(p[2], h, p[3], fill, ec, 0.7);
      b.position.set(p[0], h / 2, p[1]); g.add(b);
    });
    return g;
  }
  function windowGrid(cols, rows, w, h, gapX, gapY, dist, rotY, color, litRatio) {
    var geo = new T.BoxGeometry(w, h, 0.05);
    var mat = new T.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.35, metalness: 0.1,
      emissive: new T.Color(color), emissiveIntensity: 0.6
    });
    var m = new T.InstancedMesh(geo, mat, cols * rows), i = 0, mtx = new T.Matrix4();
    var lit = new T.Color(0xf1e4fb), dim = new T.Color(0x3a1170), R = rnd(cols * 31 + rows * 7 + 3);
    var totW = cols * w + (cols - 1) * gapX, totH = rows * h + (rows - 1) * gapY;
    for (var c = 0; c < cols; c++) for (var r = 0; r < rows; r++) {
      mtx.makeTranslation(-totW / 2 + w / 2 + c * (w + gapX), -totH / 2 + h / 2 + r * (h + gapY), 0);
      m.setMatrixAt(i, mtx);
      m.setColorAt(i, R() < litRatio ? lit : dim);
      i++;
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    var inner = new T.Group(); inner.add(m); inner.position.z = dist;
    var g = new T.Group(); g.add(inner); g.rotation.y = rotY || 0;
    return g;
  }
  function pipe(radius, len, axis, fill, ec) {
    var g = new T.Group();
    var geo = new T.CylinderGeometry(radius, radius, len, 12);
    g.add(new T.Mesh(geo, new T.MeshStandardMaterial({ color: fill, roughness: 0.85 })));
    g.add(edges(geo, ec, 0.45));
    if (axis === 'x') g.rotation.z = Math.PI / 2;
    else if (axis === 'z') g.rotation.x = Math.PI / 2;
    return g;
  }
  function cyl(rTop, rBottom, h, seg, fill, ec) {
    var g = new T.Group();
    var geo = new T.CylinderGeometry(rTop, rBottom, h, seg || 16);
    g.add(new T.Mesh(geo, new T.MeshStandardMaterial({ color: fill, roughness: 0.88 })));
    g.add(edges(geo, ec, 0.5));
    return g;
  }
  function marker(x, y, z, scale) {
    var s = scale || 1, g = new T.Group();
    g.position.set(x, y, z);
    g.add(new T.Mesh(new T.SphereGeometry(0.055 * s, 16, 16), new T.MeshBasicMaterial({ color: 0xf1e4fb })));
    g.add(new T.Mesh(new T.SphereGeometry(0.12 * s, 16, 16),
      new T.MeshBasicMaterial({ color: 0x962fbc, transparent: true, opacity: 0.3, blending: T.AdditiveBlending, depthWrite: false })));
    var ring = new T.Mesh(new T.RingGeometry(0.16 * s, 0.19 * s, 40),
      new T.MeshBasicMaterial({ color: 0xb769d3, transparent: true, opacity: 0.6, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
    g.add(ring); g.userData.ring = ring; g.userData.base = s;
    return g;
  }
  function contactShadow(size, strength) {
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var x = c.getContext('2d');
    var gr = x.createRadialGradient(64, 64, 4, 64, 64, 62);
    gr.addColorStop(0, 'rgba(0,0,0,' + (strength || 0.7) + ')');
    gr.addColorStop(0.55, 'rgba(0,0,0,' + (strength || 0.7) * 0.32 + ')');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
    var m = new T.Mesh(new T.PlaneGeometry(size, size),
      new T.MeshBasicMaterial({ map: new T.CanvasTexture(c), transparent: true, depthWrite: false, opacity: 0.8 }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.006;
    return m;
  }
  function scanRig(w, d, color) {
    var group = new T.Group();
    var plane = glowPlane(w, d, color || 0x5342d7, 0.12); plane.rotation.x = -Math.PI / 2;
    var edge = edges(new T.BoxGeometry(w, 0.001, d), 0xd6a5e9, 0.5);
    group.add(plane); group.add(edge);
    return { group: group, plane: plane, edge: edge };
  }
  function sheet(w, h, lines, color) {
    var g = new T.Group();
    var geo = new T.PlaneGeometry(w, h);
    g.add(new T.Mesh(geo, new T.MeshBasicMaterial({
      color: 0x1a0b40, transparent: true, opacity: 0.74, side: T.DoubleSide, depthWrite: false
    })));
    g.add(new T.LineSegments(new T.EdgesGeometry(geo),
      new T.LineBasicMaterial({ color: color, transparent: true, opacity: 0.85 })));
    var n = Math.max(0, lines | 0);
    for (var i = 0; i < n; i++) {
      var lw = w * (0.66 - (i % 3) * 0.13);
      var ln = glowPlane(lw, h * 0.028, color, 0.5);
      ln.position.set(-w / 2 + lw / 2 + w * 0.1, h / 2 - h * 0.2 - i * (h * 0.14), 0.004);
      g.add(ln);
    }
    return g;
  }
  function crack(points, color, width) {
    var vs = points.map(function (p) { return new T.Vector3(p[0], p[1], p[2]); });
    var curve = new T.CatmullRomCurve3(vs, false, 'catmullrom', 0.15);
    var geo = new T.TubeGeometry(curve, Math.max(10, vs.length * 8), (width || 0.024) / 2, 5, false);
    return new T.Mesh(geo, new T.MeshBasicMaterial({
      color: color, transparent: true, opacity: 0.9, blending: T.AdditiveBlending, depthWrite: false
    }));
  }
  function tree(hTrunk, rCrown, fill, ec) {
    var g = new T.Group();
    var tr = new T.Mesh(new T.CylinderGeometry(0.045, 0.06, hTrunk, 6),
      new T.MeshStandardMaterial({ color: fill, roughness: 1 }));
    tr.position.y = hTrunk / 2; g.add(tr);
    var cg = new T.IcosahedronGeometry(rCrown, 0);
    var crown = new T.Mesh(cg, new T.MeshStandardMaterial({ color: fill, roughness: 1, flatShading: true }));
    crown.position.y = hTrunk + rCrown * 0.7; g.add(crown);
    var ce = edges(cg, ec, 0.4); ce.position.y = hTrunk + rCrown * 0.7; g.add(ce);
    return g;
  }
  function lamp(h, color) {
    var g = new T.Group();
    var post = solid(0.05, h, 0.05, 0x120830, color, 0.5); post.position.y = h / 2; g.add(post);
    var arm = solid(0.4, 0.04, 0.04, 0x120830, color, 0.5); arm.position.set(0.18, h, 0); g.add(arm);
    var bulb = new T.Mesh(new T.SphereGeometry(0.06, 12, 12), new T.MeshBasicMaterial({ color: 0xf1e4fb }));
    bulb.position.set(0.36, h - 0.02, 0); g.add(bulb);
    var halo = new T.Mesh(new T.SphereGeometry(0.17, 12, 12), new T.MeshBasicMaterial({
      color: 0xd6a5e9, transparent: true, opacity: 0.2, blending: T.AdditiveBlending, depthWrite: false
    }));
    halo.position.copy(bulb.position); g.add(halo);
    return g;
  }
  function fence(len, h, color) {
    var g = new T.Group();
    var n = Math.max(2, Math.round(len / 0.75) + 1);
    for (var i = 0; i < n; i++) {
      var p = solid(0.05, h, 0.05, 0x120830, color, 0.5);
      p.position.set(-len / 2 + i * (len / (n - 1)), h / 2, 0); g.add(p);
    }
    [h * 0.88, h * 0.34].forEach(function (y) {
      var r = solid(len, 0.035, 0.035, 0x120830, color, 0.4); r.position.set(0, y, 0); g.add(r);
    });
    var mesh = glowPlane(len, h * 0.55, color, 0.055); mesh.position.set(0, h * 0.58, 0); g.add(mesh);
    return g;
  }
  function crane(h, jibLen, color) {
    var g = new T.Group();
    var mast = solid(0.13, h, 0.13, 0x120830, color, 0.6); mast.position.y = h / 2; g.add(mast);
    for (var i = 1; i < Math.floor(h / 0.5); i++) {         /* vakwerk-hint */
      var band = solid(0.16, 0.02, 0.16, 0x120830, color, 0.35); band.position.y = i * 0.5; g.add(band);
    }
    var jib = new T.Group(); jib.position.y = h; g.add(jib);
    var arm = solid(jibLen, 0.08, 0.08, 0x120830, color, 0.7); arm.position.x = jibLen / 2 - 0.18; jib.add(arm);
    var counter = solid(jibLen * 0.3, 0.08, 0.08, 0x120830, color, 0.6); counter.position.x = -jibLen * 0.17; jib.add(counter);
    var cab = solid(0.19, 0.17, 0.19, 0x1e1048, color, 0.85); cab.position.set(0.12, -0.11, 0); jib.add(cab);
    var cw = solid(0.2, 0.18, 0.2, 0x1e1048, color, 0.7); cw.position.set(-jibLen * 0.3, -0.05, 0); jib.add(cw);
    var cable = solid(0.016, 0.85, 0.016, 0x120830, color, 0.5); cable.position.set(jibLen * 0.6, -0.46, 0); jib.add(cable);
    var hook = solid(0.1, 0.09, 0.1, 0x1e1048, color, 0.85); hook.position.set(jibLen * 0.6, -0.93, 0); jib.add(hook);
    g.userData.jib = jib;
    return g;
  }
  function solar(n, w, h, gap, tilt, color) {
    var g = new T.Group();
    for (var i = 0; i < n; i++) {
      var p = new T.Group();
      var panel = solid(w, 0.03, h, 0x1a0b40, color, 0.9);
      panel.rotation.x = -tilt; p.add(panel);
      var leg = solid(0.03, 0.14, 0.03, 0x1a0b40, color, 0.5);
      leg.position.set(0, -0.07, -h * 0.3); p.add(leg);
      p.position.set((i - (n - 1) / 2) * (w + gap), 0.07, 0);
      g.add(p);
    }
    return g;
  }
  function stack(cols, rows, w, h, d, fill, color) {
    var g = new T.Group();
    for (var c = 0; c < cols; c++) for (var r = 0; r < rows; r++) {
      var b = solid(w, h, d, fill, color, 0.45);
      b.position.set((c - (cols - 1) / 2) * (w * 1.06), h / 2 + r * h * 1.04, 0);
      g.add(b);
    }
    return g;
  }

  function kit() {
    T = window.THREE;
    return {
      T: T, rnd: rnd, solid: solid, edges: edges, glowPlane: glowPlane, gableRoof: gableRoof,
      parapet: parapet, windowGrid: windowGrid, pipe: pipe, cyl: cyl, marker: marker, dust: dust,
      contactShadow: contactShadow, scanRig: scanRig, sheet: sheet, crack: crack, grid: grid,
      tree: tree, lamp: lamp, fence: fence, crane: crane, drone: drone, solar: solar, stack: stack
    };
  }

  return {
    hero: hero, process: process, beacon: beacon,
    kit: kit, lights: lights, orbit: orbit, loop: loop, sizer: sizer, renderer: renderer,
    parts: parts, applyK: applyK, reduced: RM
  };
})();

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
