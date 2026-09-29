/* ==========================================================================
   PRIMELABS — 3D PROTOTYPES (alleen voor /prototype, niet voor de site)
   0 huidig · A architecturaal detail · B materialen & licht
   C scan-puntenwolk · D omgeving / stadsblok
   ========================================================================== */
window.PROTO = (function () {
  var T = window.THREE;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- basis-helpers ---------------- */
  function renderer(canvas) {
    var r = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    r.setClearColor(0x000000, 0);
    return r;
  }
  function edges(geo, color, op) {
    return new T.LineSegments(new T.EdgesGeometry(geo),
      new T.LineBasicMaterial({ color: color, transparent: true, opacity: op === undefined ? 0.85 : op }));
  }
  function box(w, h, d, fill, ec, eo) {
    var g = new T.Group(), geo = new T.BoxGeometry(w, h, d);
    g.add(new T.Mesh(geo, new T.MeshStandardMaterial({ color: fill, roughness: 0.92, metalness: 0.06 })));
    if (ec !== null) g.add(edges(geo, ec === undefined ? 0x962fbc : ec, eo));
    return g;
  }
  function glow(w, h, color, op) {
    return new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({
      color: color, transparent: true, opacity: op, side: T.DoubleSide,
      blending: T.AdditiveBlending, depthWrite: false
    }));
  }
  function dust(count, spread, color) {
    var p = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * spread;
      p[i * 3 + 1] = Math.random() * spread * 0.5;
      p[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    var g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3));
    return new T.Points(g, new T.PointsMaterial({
      color: color, size: 0.026, transparent: true, opacity: 0.5, depthWrite: false, blending: T.AdditiveBlending
    }));
  }
  function lights(scene, a, b) {
    scene.add(new T.AmbientLight(0x4a2bb0, 0.42));
    var d = new T.DirectionalLight(0xe8dcfb, 0.4); d.position.set(4, 7, 4); scene.add(d);
    var p1 = new T.PointLight(0x962fbc, a || 8, 18); p1.position.set(-5, 5.5, 4.5); scene.add(p1);
    var p2 = new T.PointLight(0x3a078a, b || 6, 18); p2.position.set(5, 4.5, -4); scene.add(p2);
    return { p1: p1, p2: p2 };
  }
  function grid(size, div, op) {
    var g = new T.GridHelper(size, div, 0x6b0a93, 0x231055);
    g.material.transparent = true; g.material.opacity = op === undefined ? 0.26 : op;
    return g;
  }
  function drone() {
    var g = new T.Group();
    g.add(box(0.3, 0.085, 0.3, 0x120832, 0xb769d3, 0.95));
    var rotors = [];
    [[0.21, 0.21], [-0.21, 0.21], [0.21, -0.21], [-0.21, -0.21]].forEach(function (a) {
      var arm = box(0.03, 0.02, 0.03, 0x120832, 0x6b0a93, 0.6);
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
    cone.position.y = -0.78; cone.rotation.x = Math.PI; g.add(cone);
    g.userData.rotors = rotors;
    return g;
  }
  function orbit(el, st, range) {
    var down = false, px = 0, py = 0;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      st.tYaw = st.base + nx * range.y + st.dragY;
      st.tPitch = Math.max(-0.4, Math.min(0.5, -ny * range.x + st.dragX));
      if (down) { st.dragY += (e.clientX - px) * 0.006; st.dragX += (e.clientY - py) * 0.004; px = e.clientX; py = e.clientY; }
    });
    el.addEventListener('pointerdown', function (e) { down = true; px = e.clientX; py = e.clientY; el.setPointerCapture && el.setPointerCapture(e.pointerId); });
    window.addEventListener('pointerup', function () { down = false; });
    el.addEventListener('pointerleave', function () { st.tYaw = st.base + st.dragY; st.tPitch = st.dragX; });
  }
  function loop(canvas, step) {
    var raf = 0, t0 = performance.now(), last = t0;
    step(0, 0);                       /* eerste frame direct: canvas nooit zwart */
    function frame(t) {
      raf = requestAnimationFrame(frame);
      var r = canvas.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) { last = t; return; }
      step((t - t0) / 1000, Math.min(0.05, (t - last) / 1000)); last = t;
    }
    raf = requestAnimationFrame(frame);
    return {
      stop: function () { cancelAnimationFrame(raf); },
      frame: function (t) { step(t, 0.016); }   /* handmatig een frame tekenen */
    };
  }
  function sizer(canvas, rnd, cam) {
    var rect = { w: 1, h: 1 };
    function fit() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      rect.w = w; rect.h = h; rnd.setSize(w, h, false);
      cam.aspect = w / h; cam.updateProjectionMatrix();
    }
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(canvas.parentNode);
    else window.addEventListener('resize', fit);
    return rect;
  }
  /* standaard opzet: scene, camera, renderer, licht, grid, orbit */
  function stage(canvas, camPos, target, fov) {
    var scene = new T.Scene();
    scene.fog = new T.Fog(0x0a0520, 11, 30);
    var cam = new T.PerspectiveCamera(fov || 34, 1, 0.1, 80);
    cam.position.set(camPos[0], camPos[1], camPos[2]);
    cam.lookAt(target[0], target[1], target[2]);
    var rnd = renderer(canvas), rect = sizer(canvas, rnd, cam);
    var L = lights(scene);
    var world = new T.Group(); scene.add(world);
    var st = { yaw: 0, pitch: 0, tYaw: 0, tPitch: 0, base: 0, dragX: 0, dragY: 0 };
    orbit(canvas, st, { x: 0.3, y: 0.7 });
    return {
      scene: scene, cam: cam, rnd: rnd, rect: rect, world: world, st: st, L: L,
      spin: function (t, speed) {
        var e = RM ? 1 : 0.06;
        st.yaw += (st.tYaw - st.yaw) * e; st.pitch += (st.tPitch - st.pitch) * e;
        world.rotation.y = st.yaw + (RM ? 0.25 : t * (speed === undefined ? 0.05 : speed));
        world.rotation.x = st.pitch * 0.45;
      },
      draw: function () { rnd.render(scene, cam); }
    };
  }

  /* ---------------- gedeelde bouwstenen ---------------- */
  /* zadeldak als geëxtrudeerd driehoeksprofiel */
  function gable(w, h, d, fill, ec) {
    var s = new T.Shape();
    s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.lineTo(-w / 2, 0);
    var geo = new T.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
    geo.translate(0, 0, -d / 2);
    var g = new T.Group();
    g.add(new T.Mesh(geo, new T.MeshStandardMaterial({ color: fill, roughness: 0.9 })));
    g.add(edges(geo, ec, 0.9));
    return g;
  }
  /* dakrand / opstand rond een vlak dak */
  function parapet(w, d, h, th, fill, ec) {
    var g = new T.Group();
    [[0, 0, d / 2 - th / 2, w, th], [0, 0, -d / 2 + th / 2, w, th],
     [w / 2 - th / 2, 0, 0, th, d], [-w / 2 + th / 2, 0, 0, th, d]].forEach(function (p) {
      var b = box(p[3], h, p[4], fill, ec, 0.75);
      b.position.set(p[0], h / 2, p[2]); g.add(b);
    });
    return g;
  }
  /* ramenraster op één gevel via instancing */
  function windows(cols, rows, w, h, gapX, gapY, z, rotY, color, litRatio) {
    var geo = new T.BoxGeometry(w, h, 0.05);
    var mat = new T.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.35, metalness: 0.1,
      emissive: new T.Color(color), emissiveIntensity: 0.55
    });
    var m = new T.InstancedMesh(geo, mat, cols * rows), i = 0, mtx = new T.Matrix4();
    var lit = new T.Color(0xf1e4fb), dim = new T.Color(0x3a1170);
    var totW = cols * w + (cols - 1) * gapX, totH = rows * h + (rows - 1) * gapY;
    for (var c = 0; c < cols; c++) for (var r = 0; r < rows; r++) {
      var x = -totW / 2 + w / 2 + c * (w + gapX);
      var y = -totH / 2 + h / 2 + r * (h + gapY);
      mtx.makeTranslation(x, y, 0);
      m.setMatrixAt(i, mtx);
      m.setColorAt(i, Math.random() < litRatio ? lit : dim);
      i++;
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    /* inner = afstand tot de gevel, outer = welke gevel; caller zet de positie */
    var inner = new T.Group(); inner.add(m); inner.position.z = z;
    var g = new T.Group(); g.add(inner); g.rotation.y = rotY || 0;
    return g;
  }
  /* zonnepanelen op een schuin frame */
  function solar(n, w, h, gap, tilt, color) {
    var g = new T.Group();
    for (var i = 0; i < n; i++) {
      var p = new T.Group();
      var panel = box(w, 0.03, h, 0x1a0b40, color, 0.9);
      panel.rotation.x = -tilt;
      p.add(panel);
      var leg = box(0.03, 0.14, 0.03, 0x1a0b40, color, 0.5);
      leg.position.set(0, -0.07, -h * 0.3); p.add(leg);
      p.position.x = (i - (n - 1) / 2) * (w + gap);
      g.add(p);
    }
    return g;
  }
  function ladder(h, color) {
    var g = new T.Group();
    [-0.11, 0.11].forEach(function (x) {
      var r = box(0.025, h, 0.025, 0x120832, color, 0.7); r.position.set(x, h / 2, 0); g.add(r);
    });
    var n = Math.max(3, Math.round(h / 0.22));
    var geo = new T.BoxGeometry(0.2, 0.02, 0.02);
    var m = new T.InstancedMesh(geo, new T.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.6 }), n);
    var mtx = new T.Matrix4();
    for (var i = 0; i < n; i++) { mtx.makeTranslation(0, 0.12 + i * (h - 0.2) / n, 0); m.setMatrixAt(i, mtx); }
    m.instanceMatrix.needsUpdate = true; g.add(m);
    return g;
  }
  function tree(hTrunk, rCrown, c1, c2) {
    var g = new T.Group();
    var tr = new T.Mesh(new T.CylinderGeometry(0.045, 0.06, hTrunk, 6),
      new T.MeshStandardMaterial({ color: c1, roughness: 1 }));
    tr.position.y = hTrunk / 2; g.add(tr);
    var crownGeo = new T.IcosahedronGeometry(rCrown, 0);
    var crown = new T.Mesh(crownGeo, new T.MeshStandardMaterial({ color: c1, roughness: 1, flatShading: true }));
    crown.position.y = hTrunk + rCrown * 0.7; g.add(crown);
    g.add(edges(crownGeo, c2, 0.4)).children[g.children.length - 1].position.y = hTrunk + rCrown * 0.7;
    return g;
  }
  function lamp(h, color) {
    var g = new T.Group();
    var post = box(0.05, h, 0.05, 0x120832, color, 0.5); post.position.y = h / 2; g.add(post);
    var arm = box(0.4, 0.04, 0.04, 0x120832, color, 0.5); arm.position.set(0.18, h, 0); g.add(arm);
    var bulb = new T.Mesh(new T.SphereGeometry(0.06, 12, 12), new T.MeshBasicMaterial({ color: 0xf1e4fb }));
    bulb.position.set(0.36, h - 0.02, 0); g.add(bulb);
    var halo = new T.Mesh(new T.SphereGeometry(0.16, 12, 12),
      new T.MeshBasicMaterial({ color: 0xd6a5e9, transparent: true, opacity: 0.22, blending: T.AdditiveBlending, depthWrite: false }));
    halo.position.copy(bulb.position); g.add(halo);
    return g;
  }
  function marker(pos, scale) {
    var g = new T.Group(); g.position.copy(pos);
    g.add(new T.Mesh(new T.SphereGeometry(0.055 * (scale || 1), 16, 16), new T.MeshBasicMaterial({ color: 0xf1e4fb })));
    g.add(new T.Mesh(new T.SphereGeometry(0.12 * (scale || 1), 16, 16),
      new T.MeshBasicMaterial({ color: 0x962fbc, transparent: true, opacity: 0.3, blending: T.AdditiveBlending, depthWrite: false })));
    var ring = new T.Mesh(new T.RingGeometry(0.16 * (scale || 1), 0.19 * (scale || 1), 40),
      new T.MeshBasicMaterial({ color: 0xb769d3, transparent: true, opacity: 0.6, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false }));
    g.add(ring); g.userData.ring = ring;
    return g;
  }
  /* contactschaduw als radiale canvastextuur */
  function contactShadow(size, strength) {
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var x = c.getContext('2d');
    var gr = x.createRadialGradient(64, 64, 4, 64, 64, 62);
    gr.addColorStop(0, 'rgba(0,0,0,' + (strength || 0.75) + ')');
    gr.addColorStop(0.55, 'rgba(0,0,0,' + (strength || 0.75) * 0.35 + ')');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
    var m = new T.Mesh(new T.PlaneGeometry(size, size), new T.MeshBasicMaterial({
      map: new T.CanvasTexture(c), transparent: true, depthWrite: false, opacity: 0.85
    }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.006;
    return m;
  }
  /* procedurele geveltextuur (ramenraster met enkele oplichtende ruiten) */
  function facadeTexture(cols, rows, litRatio, seedShift) {
    var C = 32, c = document.createElement('canvas');
    c.width = cols * C; c.height = rows * C;
    var x = c.getContext('2d');
    x.fillStyle = '#150833'; x.fillRect(0, 0, c.width, c.height);
    /* verdiepingslijnen */
    x.strokeStyle = 'rgba(150,47,188,.35)'; x.lineWidth = 1;
    for (var r = 0; r <= rows; r++) { x.beginPath(); x.moveTo(0, r * C); x.lineTo(c.width, r * C); x.stroke(); }
    for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) {
      var lit = ((i * 7 + j * 13 + (seedShift || 0)) % 10) / 10 < litRatio;
      var px = i * C + C * 0.22, py = j * C + C * 0.24, pw = C * 0.56, ph = C * 0.44;
      x.fillStyle = lit ? '#e9d6fb' : '#2a1250';
      x.fillRect(px, py, pw, ph);
      x.strokeStyle = lit ? 'rgba(233,214,251,.9)' : 'rgba(150,47,188,.5)';
      x.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1);
      /* raamstijl */
      x.fillStyle = lit ? 'rgba(58,17,112,.5)' : 'rgba(150,47,188,.25)';
      x.fillRect(px + pw / 2 - 0.5, py, 1, ph);
    }
    var t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace || undefined;
    return t;
  }
  /* fresnel-shell: dunne randgloed over een volume */
  function fresnelShell(geo, color, power, strength) {
    return new T.Mesh(geo, new T.ShaderMaterial({
      uniforms: { uC: { value: new T.Color(color) }, uP: { value: power || 2.6 }, uS: { value: strength || 0.85 } },
      vertexShader: [
        'varying vec3 vN; varying vec3 vV;',
        'void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0);',
        ' vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);',
        ' gl_Position = projectionMatrix * mv; }'
      ].join('\n'),
      fragmentShader: [
        'uniform vec3 uC; uniform float uP; uniform float uS;',
        'varying vec3 vN; varying vec3 vV;',
        'void main(){ float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)),0.0,1.0), uP);',
        ' gl_FragColor = vec4(uC, f * uS); }'
      ].join('\n'),
      transparent: true, blending: T.AdditiveBlending, depthWrite: false
    }));
  }
  /* punten samplen op alle mesh-oppervlakken van een groep */
  function samplePoints(root, count) {
    root.updateMatrixWorld(true);
    var tris = [], areas = [], total = 0;
    root.traverse(function (o) {
      if (!o.isMesh || !o.geometry || !o.geometry.attributes.position) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry;
      var pos = geo.attributes.position.array, m = o.matrixWorld;
      for (var i = 0; i + 8 < pos.length; i += 9) {
        var a = new T.Vector3(pos[i], pos[i + 1], pos[i + 2]).applyMatrix4(m);
        var b = new T.Vector3(pos[i + 3], pos[i + 4], pos[i + 5]).applyMatrix4(m);
        var c = new T.Vector3(pos[i + 6], pos[i + 7], pos[i + 8]).applyMatrix4(m);
        var ar = new T.Triangle(a, b, c).getArea();
        if (ar > 1e-5) { tris.push([a, b, c]); areas.push(ar); total += ar; }
      }
    });
    if (!tris.length) return new Float32Array(0);
    var cdf = [], acc = 0;
    for (var k = 0; k < areas.length; k++) { acc += areas[k] / total; cdf.push(acc); }
    var out = new Float32Array(count * 3);
    for (var n = 0; n < count; n++) {
      var rr = Math.random(), lo = 0, hi = cdf.length - 1;
      while (lo < hi) { var mid = (lo + hi) >> 1; if (cdf[mid] < rr) lo = mid + 1; else hi = mid; }
      var t = tris[lo], u = Math.random(), v = Math.random();
      if (u + v > 1) { u = 1 - u; v = 1 - v; }
      out[n * 3] = t[0].x + (t[1].x - t[0].x) * u + (t[2].x - t[0].x) * v;
      out[n * 3 + 1] = t[0].y + (t[1].y - t[0].y) * u + (t[2].y - t[0].y) * v;
      out[n * 3 + 2] = t[0].z + (t[1].z - t[0].z) * u + (t[2].z - t[0].z) * v;
    }
    return out;
  }
  function pointSprite() {
    var c = document.createElement('canvas'); c.width = c.height = 32;
    var x = c.getContext('2d');
    var g = x.createRadialGradient(16, 16, 0, 16, 16, 15);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 32, 32);
    return new T.CanvasTexture(c);
  }

  /* =======================================================================
     0 — HUIDIG (referentie): doos + dakplaat + bijgebouw
     ======================================================================= */
  function current(canvas) {
    var s = stage(canvas, [6.4, 4.4, 7.4], [0, 0.85, 0]);
    s.world.add(grid(26, 26));
    var b = new T.Group(); s.world.add(b);
    var main = box(3.5, 1.5, 2.5, 0x150725, 0x962fbc, 0.9); main.position.y = 0.75; b.add(main);
    var roof = box(3.62, 0.08, 2.62, 0x1a0b40, 0xb769d3, 0.95); roof.position.y = 1.54; b.add(roof);
    var annex = box(1.5, 0.95, 1.35, 0x150725, 0x962fbc, 0.75); annex.position.set(-2.3, 0.475, 0.5); b.add(annex);
    var aRoof = box(1.6, 0.06, 1.45, 0x1a0b40, 0xb769d3, 0.9); aRoof.position.set(-2.3, 0.98, 0.5); b.add(aRoof);
    var hv = box(0.55, 0.3, 0.55, 0x1e1048, 0xd6a5e9, 0.9); hv.position.set(0.95, 1.73, -0.6); b.add(hv);
    var hv2 = box(0.38, 0.22, 0.38, 0x1e1048, 0xd6a5e9, 0.8); hv2.position.set(-0.75, 1.69, 0.72); b.add(hv2);
    var cage = edges(new T.BoxGeometry(4.9, 2.9, 3.9), 0x6b0a93, 0.16); cage.position.y = 1.35; s.world.add(cage);
    var scan = glow(4.9, 3.9, 0x5342d7, 0.1); scan.rotation.x = -Math.PI / 2; s.world.add(scan);
    var dr = drone(); s.world.add(dr);
    s.world.add(dust(220, 9, 0xb769d3));
    return loop(canvas, function (t) {
      s.spin(t);
      scan.position.y = 0.06 + (Math.sin(t * 0.55) * 0.5 + 0.5) * 2.5;
      var a = t * 0.34;
      dr.position.set(Math.cos(a) * 3.05, 2.5 + Math.sin(t * 1.1) * 0.1, Math.sin(a) * 2.6);
      dr.rotation.y = -a + Math.PI / 2;
      dr.userData.rotors.forEach(function (r, i) { r.rotation.z += 0.9 * (i % 2 ? 1 : -1); });
      s.draw();
    });
  }

  /* =======================================================================
     A — ARCHITECTURAAL DETAIL
     ======================================================================= */
  function archi(canvas) {
    var s = stage(canvas, [6.8, 4.6, 7.6], [0, 1.0, 0]);
    s.world.add(grid(26, 26));
    var F = 0x150725, E = 0x962fbc, E2 = 0xb769d3, E3 = 0xd6a5e9;
    var b = new T.Group(); s.world.add(b);

    /* hoofdvolume met plint en verdiepinglijnen */
    var main = box(3.4, 2.0, 2.4, F, E, 0.85); main.position.y = 1.0; b.add(main);
    var plint = box(3.52, 0.18, 2.52, 0x1a0b40, E2, 0.6); plint.position.y = 0.09; b.add(plint);
    [0.78, 1.42].forEach(function (y) {
      var l = box(3.44, 0.03, 2.44, 0x1a0b40, E2, 0.45); l.position.y = y; b.add(l);
    });

    /* terugliggende bovenbouw + zadeldak met nok */
    var top = box(2.5, 0.75, 1.9, F, E, 0.8); top.position.set(-0.25, 2.37, 0); b.add(top);
    var gb = gable(2.6, 0.85, 2.0, 0x1a0b40, E3);
    gb.rotation.y = Math.PI / 2; gb.position.set(-0.25, 2.74, 0); b.add(gb);
    var ridge = box(0.06, 0.06, 2.0, 0x1e1048, E3, 0.9); ridge.position.set(-0.25, 3.6, 0); b.add(ridge);

    /* zijvleugel (L-vorm) met vlak dak en opstand */
    var wing = box(1.6, 1.15, 1.5, F, E, 0.8); wing.position.set(-2.35, 0.575, 0.45); b.add(wing);
    var wingRoof = box(1.7, 0.07, 1.6, 0x1a0b40, E2, 0.85); wingRoof.position.set(-2.35, 1.18, 0.45); b.add(wingRoof);
    var pp = parapet(1.7, 1.6, 0.16, 0.07, 0x1e1048, E3); pp.position.set(-2.35, 1.21, 0.45); b.add(pp);

    /* luifel boven de entree + deur */
    var canopy = box(1.0, 0.06, 0.5, 0x1e1048, E3, 0.85); canopy.position.set(0.5, 1.02, 1.42); b.add(canopy);
    var door = box(0.5, 0.85, 0.06, 0x1a0b40, E3, 0.95); door.position.set(0.5, 0.52, 1.22); b.add(door);
    var doorGlow = glow(0.44, 0.78, 0xd6a5e9, 0.3); doorGlow.position.set(0.5, 0.52, 1.26); b.add(doorGlow);

    /* ramenrasters: voor, achter en zijkant van het hoofdvolume */
    var wf = windows(5, 3, 0.36, 0.42, 0.22, 0.28, 1.21, 0, 0xb769d3, 0.3);
    wf.position.set(0, 1.12, 0); b.add(wf);
    var wb = windows(5, 3, 0.36, 0.42, 0.22, 0.28, 1.21, Math.PI, 0xb769d3, 0.22);
    wb.position.set(0, 1.12, 0); b.add(wb);
    var ws = windows(3, 3, 0.34, 0.42, 0.24, 0.28, 1.71, Math.PI / 2, 0xb769d3, 0.26);
    ws.position.set(0, 1.12, 0); b.add(ws);
    var wt = windows(3, 1, 0.42, 0.34, 0.26, 0, 0.96, 0, 0xd6a5e9, 0.4);
    wt.position.set(-0.25, 2.4, 0); b.add(wt);
    var ww = windows(2, 2, 0.3, 0.34, 0.2, 0.24, 0.82, -Math.PI / 2, 0xb769d3, 0.35);
    ww.position.set(-2.35, 0.6, 0.45); b.add(ww);

    /* dakkapel op het zadeldak */
    var dk = new T.Group(); dk.position.set(-0.25, 2.95, 0.72); b.add(dk);
    dk.add(box(0.7, 0.5, 0.5, 0x1a0b40, E2, 0.85));
    var dkr = gable(0.76, 0.24, 0.56, 0x1e1048, E3); dkr.position.y = 0.25; dk.add(dkr);
    var dkw = glow(0.44, 0.3, 0xd6a5e9, 0.45); dkw.position.set(0, 0, 0.26); dk.add(dkw);

    /* dakopbouw: schoorsteen, kanalen, HVAC met roosters, zonnepanelen */
    var chim = box(0.3, 0.7, 0.3, 0x1e1048, E3, 0.9); chim.position.set(0.95, 2.95, -0.55); b.add(chim);
    var cap = box(0.4, 0.06, 0.4, 0x241058, E3, 0.9); cap.position.set(0.95, 3.33, -0.55); b.add(cap);
    var hvac = new T.Group(); hvac.position.set(1.15, 2.15, 0.6); b.add(hvac);
    hvac.add(box(0.62, 0.3, 0.62, 0x1e1048, E3, 0.9));
    for (var gi = 0; gi < 4; gi++) {
      var slat = box(0.5, 0.02, 0.02, 0x241058, E3, 0.55);
      slat.position.set(0, -0.09 + gi * 0.06, 0.32); hvac.add(slat);
    }
    var fan = new T.Mesh(new T.TorusGeometry(0.17, 0.02, 6, 20), new T.MeshBasicMaterial({ color: 0xd6a5e9, transparent: true, opacity: 0.8 }));
    fan.rotation.x = Math.PI / 2; fan.position.y = 0.17; hvac.add(fan);
    var pipes = new T.Group(); pipes.position.set(1.5, 2.1, -0.1); b.add(pipes);
    [0, 0.16, 0.32].forEach(function (dx, i) {
      var p = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.5 + i * 0.12, 10),
        new T.MeshStandardMaterial({ color: 0x241058, roughness: 0.85 }));
      p.position.set(dx, (0.5 + i * 0.12) / 2, 0); pipes.add(p);
      var e = edges(p.geometry, E3, 0.5); e.position.copy(p.position); pipes.add(e);
    });
    var sol = solar(3, 0.62, 0.9, 0.12, 0.42, E3); sol.position.set(-2.35, 1.38, 0.45); b.add(sol);
    var lad = ladder(1.15, E2); lad.position.set(-1.6, 0, 0.9); b.add(lad);
    var vent = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.26, 12), new T.MeshStandardMaterial({ color: 0x241058, roughness: 0.8 }));
    vent.position.set(0.3, 2.87, -0.6); b.add(vent);
    b.add(edges(vent.geometry, E3, 0.6)).children[b.children.length - 1].position.copy(vent.position);

    /* terrein: stoep en aanrijpad */
    var walk = box(6.4, 0.05, 0.9, 0x120830, 0x6b0a93, 0.4); walk.position.set(0, 0.025, 2.4); s.world.add(walk);
    var path = box(1.1, 0.04, 1.2, 0x120830, 0x6b0a93, 0.35); path.position.set(0.5, 0.02, 1.75); s.world.add(path);

    /* scanvolume + drone + punten */
    var cage = edges(new T.BoxGeometry(5.6, 4.2, 3.6), 0x6b0a93, 0.14); cage.position.y = 2.0; s.world.add(cage);
    var scan = glow(5.6, 3.6, 0x5342d7, 0.09); scan.rotation.x = -Math.PI / 2; s.world.add(scan);
    var dr = drone(); s.world.add(dr);
    var mk = [marker(new T.Vector3(1.15, 2.32, 0.6)), marker(new T.Vector3(-2.35, 1.3, 0.45)), marker(new T.Vector3(1.71, 1.2, 0.3))];
    mk.forEach(function (m) { b.add(m); });
    s.world.add(dust(220, 10, 0xb769d3));

    return loop(canvas, function (t) {
      s.spin(t, 0.045);
      scan.position.y = 0.06 + (Math.sin(t * 0.5) * 0.5 + 0.5) * 3.6;
      var a = t * 0.3;
      dr.position.set(Math.cos(a) * 3.3, 3.5 + Math.sin(t * 1.1) * 0.12, Math.sin(a) * 2.9);
      dr.rotation.y = -a + Math.PI / 2;
      dr.userData.rotors.forEach(function (r, i) { r.rotation.z += 0.9 * (i % 2 ? 1 : -1); });
      fan.rotation.z += 0.08;
      mk.forEach(function (m, i) {
        m.userData.ring.scale.setScalar(1 + Math.sin(t * 2.1 + i * 1.4) * 0.12);
        m.userData.ring.lookAt(s.cam.position);
      });
      s.draw();
    });
  }

  /* =======================================================================
     B — MATERIALEN & LICHT (zelfde massa, andere afwerking)
     ======================================================================= */
  function shading(canvas) {
    var s = stage(canvas, [6.4, 4.2, 7.2], [0, 0.95, 0]);
    s.world.add(grid(26, 26, 0.2));
    var b = new T.Group(); s.world.add(b);

    /* geveltextuur per richting (verschillende repeat) */
    var texZ = facadeTexture(6, 4, 0.28, 0), texX = facadeTexture(4, 4, 0.22, 3);
    function facadeMats(texA, texB, top) {
      var mk = function (tex) {
        return new T.MeshStandardMaterial({
          color: 0xffffff, map: tex, emissive: new T.Color(0x6b0a93), emissiveMap: tex,
          emissiveIntensity: 1.35, roughness: 0.85, metalness: 0.05
        });
      };
      var solidMat = new T.MeshStandardMaterial({ color: top, roughness: 0.9 });
      return [mk(texA), mk(texA), solidMat, solidMat, mk(texB), mk(texB)];
    }
    var mainGeo = new T.BoxGeometry(3.5, 1.9, 2.5);
    var main = new T.Mesh(mainGeo, facadeMats(texX, texZ, 0x1a0b40));
    main.position.y = 0.95; b.add(main);
    b.add(edges(mainGeo, 0xb769d3, 0.7)).children[b.children.length - 1].position.y = 0.95;
    var shell = fresnelShell(mainGeo, 0xd6a5e9, 2.8, 0.9); shell.position.y = 0.95; shell.scale.setScalar(1.004); b.add(shell);

    var roofGeo = new T.BoxGeometry(3.66, 0.1, 2.66);
    var roof = new T.Mesh(roofGeo, new T.MeshStandardMaterial({ color: 0x241058, roughness: 0.8 }));
    roof.position.y = 1.95; b.add(roof);
    b.add(edges(roofGeo, 0xd6a5e9, 0.9)).children[b.children.length - 1].position.y = 1.95;
    b.add(fresnelShell(roofGeo, 0xd6a5e9, 3, 0.7)).children[b.children.length - 1].position.y = 1.95;

    var annexGeo = new T.BoxGeometry(1.5, 1.0, 1.4);
    var annex = new T.Mesh(annexGeo, facadeMats(texX, texZ, 0x1a0b40));
    annex.position.set(-2.32, 0.5, 0.5); b.add(annex);
    b.add(edges(annexGeo, 0xb769d3, 0.6)).children[b.children.length - 1].position.copy(annex.position);
    var shell2 = fresnelShell(annexGeo, 0xd6a5e9, 2.8, 0.75);
    shell2.position.copy(annex.position); shell2.scale.setScalar(1.005); b.add(shell2);

    var hvGeo = new T.BoxGeometry(0.6, 0.3, 0.6);
    var hv = new T.Mesh(hvGeo, new T.MeshStandardMaterial({ color: 0x241058, roughness: 0.8 }));
    hv.position.set(1.0, 2.15, -0.6); b.add(hv);
    b.add(edges(hvGeo, 0xd6a5e9, 0.9)).children[b.children.length - 1].position.copy(hv.position);

    /* contactschaduw + spiegeling op de grond */
    s.world.add(contactShadow(9, 0.8));
    function fade(m) {
      var c = m.clone();
      c.transparent = true;
      c.opacity = (m.opacity === undefined ? 1 : m.opacity) * 0.16;
      c.depthWrite = false; c.side = T.DoubleSide;   /* gespiegeld = omgekeerde winding */
      return c;
    }
    var mirror = b.clone(true);
    mirror.scale.y = -1; mirror.position.y = -0.02;
    mirror.traverse(function (o) {
      if (!o.material) return;
      o.material = Array.isArray(o.material) ? o.material.map(fade) : fade(o.material);
    });
    s.world.add(mirror);

    var scan = glow(5.2, 3.6, 0x5342d7, 0.1); scan.rotation.x = -Math.PI / 2; s.world.add(scan);
    var dr = drone(); s.world.add(dr);
    s.world.add(dust(240, 9, 0xd6a5e9));

    return loop(canvas, function (t) {
      s.spin(t, 0.045);
      scan.position.y = 0.06 + (Math.sin(t * 0.5) * 0.5 + 0.5) * 2.8;
      var a = t * 0.3;
      dr.position.set(Math.cos(a) * 3.1, 2.9 + Math.sin(t * 1.1) * 0.1, Math.sin(a) * 2.7);
      dr.rotation.y = -a + Math.PI / 2;
      dr.userData.rotors.forEach(function (r, i) { r.rotation.z += 0.9 * (i % 2 ? 1 : -1); });
      s.draw();
    });
  }

  /* =======================================================================
     C — SCAN-PUNTENWOLK
     ======================================================================= */
  function cloud(canvas) {
    var s = stage(canvas, [6.6, 4.4, 7.4], [0, 1.0, 0]);
    s.world.add(grid(26, 26, 0.18));

    /* onderliggende massa (wordt niet als vlak gerenderd, alleen gesampled) */
    var src = new T.Group();
    var m1 = new T.Mesh(new T.BoxGeometry(3.4, 2.0, 2.4)); m1.position.y = 1.0; src.add(m1);
    var m2 = new T.Mesh(new T.BoxGeometry(2.5, 0.8, 1.9)); m2.position.set(-0.25, 2.4, 0); src.add(m2);
    var sh = new T.Shape(); sh.moveTo(-1.3, 0); sh.lineTo(1.3, 0); sh.lineTo(0, 0.85); sh.lineTo(-1.3, 0);
    var g3 = new T.ExtrudeGeometry(sh, { depth: 2.0, bevelEnabled: false });
    g3.translate(0, 0, -1.0);
    var m3 = new T.Mesh(g3);
    m3.rotation.y = Math.PI / 2; m3.position.set(-0.25, 2.8, 0); src.add(m3);
    var m4 = new T.Mesh(new T.BoxGeometry(1.6, 1.15, 1.5)); m4.position.set(-2.35, 0.575, 0.45); src.add(m4);
    var m5 = new T.Mesh(new T.BoxGeometry(0.3, 0.7, 0.3)); m5.position.set(0.95, 3.0, -0.55); src.add(m5);
    var m6 = new T.Mesh(new T.BoxGeometry(0.62, 0.32, 0.62)); m6.position.set(1.1, 2.16, 0.6); src.add(m6);
    /* terrein apart, zodat het gebouw het grootste deel van de punten krijgt */
    var ground = new T.Group();
    var m7 = new T.Mesh(new T.PlaneGeometry(7, 5)); m7.rotation.x = -Math.PI / 2; m7.position.y = 0.01; ground.add(m7);

    var pB = samplePoints(src, 21000), pG = samplePoints(ground, 5000);
    var pos = new Float32Array(pB.length + pG.length);
    pos.set(pB, 0); pos.set(pG, pB.length);
    var geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    var mat = new T.ShaderMaterial({
      uniforms: {
        uScan: { value: 0 }, uSize: { value: 2.3 * Math.min(window.devicePixelRatio || 1, 1.5) },
        uTex: { value: pointSprite() },
        uCold: { value: new T.Color(0x8a4fd0) }, uHot: { value: new T.Color(0xf1e4fb) }
      },
      vertexShader: [
        'uniform float uScan; uniform float uSize;',
        'varying float vA; varying float vH;',
        'void main(){',
        ' vec4 mv = modelViewMatrix * vec4(position,1.0);',
        ' float scanned = clamp((uScan - position.y) * 2.2, 0.0, 1.0);',
        ' float band = exp(-abs(position.y - uScan) * 7.0);',
        ' vA = scanned * 0.55 + band * 0.9;',
        ' vH = band;',
        ' gl_PointSize = uSize * (1.0 + band * 1.6) * (300.0 / -mv.z);',
        ' gl_Position = projectionMatrix * mv; }'
      ].join('\n'),
      fragmentShader: [
        'uniform sampler2D uTex; uniform vec3 uCold; uniform vec3 uHot;',
        'varying float vA; varying float vH;',
        'void main(){',
        ' float a = texture2D(uTex, gl_PointCoord).a * vA;',
        ' if (a < 0.01) discard;',
        ' gl_FragColor = vec4(mix(uCold, uHot, vH), a); }'
      ].join('\n'),
      transparent: true, depthWrite: false, blending: T.AdditiveBlending
    });
    var pts = new T.Points(geo, mat); s.world.add(pts);

    /* dunne contourlijnen zodat de vorm leesbaar blijft */
    var wire = new T.Group(); s.world.add(wire);
    src.children.forEach(function (o, i) {
      if (i === src.children.length - 1) return;
      var e = edges(o.geometry, 0xb769d3, 0.22);
      e.position.copy(o.position); e.rotation.copy(o.rotation); wire.add(e);
    });

    var scanPlane = glow(5.6, 3.8, 0x5342d7, 0.08); scanPlane.rotation.x = -Math.PI / 2; s.world.add(scanPlane);
    var scanEdge = edges(new T.BoxGeometry(5.6, 0.001, 3.8), 0xf1e4fb, 0.5); s.world.add(scanEdge);
    var dr = drone(); s.world.add(dr);
    s.world.add(dust(180, 10, 0xb769d3));

    return loop(canvas, function (t) {
      s.spin(t, 0.045);
      var y = ((t * 0.55) % 5.2) - 0.4;           /* scan loopt onderaan opnieuw */
      mat.uniforms.uScan.value = y;
      scanPlane.position.y = y; scanEdge.position.y = y;
      var a = t * 0.3;
      dr.position.set(Math.cos(a) * 3.3, 3.6 + Math.sin(t * 1.1) * 0.12, Math.sin(a) * 2.9);
      dr.rotation.y = -a + Math.PI / 2;
      dr.userData.rotors.forEach(function (r, i) { r.rotation.z += 0.9 * (i % 2 ? 1 : -1); });
      s.draw();
    });
  }

  /* =======================================================================
     D — OMGEVING / STADSBLOK
     ======================================================================= */
  function district(canvas) {
    var s = stage(canvas, [8.4, 5.4, 9.2], [0, 0.9, 0], 36);
    s.world.add(grid(34, 34, 0.16));
    var F = 0x130624, E = 0x7b2fb8, E2 = 0xb769d3, E3 = 0xd6a5e9;

    /* straat met middenstreep en stoepranden */
    var street = box(24, 0.04, 2.6, 0x120830, null); street.position.set(0, 0.02, 3.6); s.world.add(street);
    var dashGeo = new T.BoxGeometry(0.7, 0.01, 0.07);
    var dashes = new T.InstancedMesh(dashGeo, new T.MeshBasicMaterial({ color: 0xb769d3, transparent: true, opacity: 0.4 }), 14);
    var mtx = new T.Matrix4();
    for (var i = 0; i < 14; i++) { mtx.makeTranslation(-9.5 + i * 1.45, 0.05, 3.6); dashes.setMatrixAt(i, mtx); }
    dashes.instanceMatrix.needsUpdate = true; s.world.add(dashes);
    [2.25, 4.95].forEach(function (z) {
      var curb = box(24, 0.1, 0.12, 0x1a0b40, E, 0.35); curb.position.set(0, 0.05, z); s.world.add(curb);
    });

    /* panden: hoogte, diepte en daktype variëren */
    var specs = [
      { x: -6.4, z: 0.2, w: 2.0, h: 1.5, d: 2.2, roof: 'flat' },
      { x: -4.2, z: 0.0, w: 1.9, h: 2.2, d: 2.4, roof: 'gable' },
      { x: -2.1, z: 0.1, w: 2.1, h: 1.8, d: 2.3, roof: 'flat' },
      { x: 0.3, z: -0.1, w: 2.3, h: 2.6, d: 2.6, roof: 'set' },   /* doelgebouw */
      { x: 2.8, z: 0.1, w: 2.0, h: 1.9, d: 2.2, roof: 'gable' },
      { x: 5.0, z: 0.0, w: 2.2, h: 1.4, d: 2.4, roof: 'flat' },
      { x: 7.2, z: 0.2, w: 1.8, h: 2.0, d: 2.1, roof: 'gable' }
    ];
    var target = null;
    specs.forEach(function (sp, idx) {
      var isTarget = sp.roof === 'set';
      var g = new T.Group(); g.position.set(sp.x, 0, sp.z); s.world.add(g);
      var eCol = isTarget ? E3 : E, eOp = isTarget ? 0.95 : 0.55;
      g.add(box(sp.w, sp.h, sp.d, F, eCol, eOp)).children[g.children.length - 1].position.y = sp.h / 2;
      var band = box(sp.w + 0.06, 0.12, sp.d + 0.06, 0x1a0b40, eCol, eOp * 0.7);
      band.position.y = 0.06; g.add(band);
      if (sp.roof === 'gable') {
        var r = gable(sp.w + 0.08, 0.6, sp.d + 0.08, 0x1a0b40, eCol);
        r.rotation.y = Math.PI / 2; r.position.y = sp.h; g.add(r);
      } else {
        var slab = box(sp.w + 0.1, 0.07, sp.d + 0.1, 0x1a0b40, eCol, eOp);
        slab.position.y = sp.h + 0.035; g.add(slab);
        var pp = parapet(sp.w + 0.1, sp.d + 0.1, 0.14, 0.06, 0x1e1048, eCol);
        pp.position.y = sp.h + 0.07; g.add(pp);
        if (idx % 2 === 0) {
          var hv = box(0.4, 0.22, 0.4, 0x1e1048, eCol, eOp);
          hv.position.set(sp.w * 0.2, sp.h + 0.18, -sp.d * 0.2); g.add(hv);
        }
      }
      if (isTarget) {
        var top = box(sp.w - 0.6, 0.7, sp.d - 0.6, F, E3, 0.9);
        top.position.set(-0.1, sp.h + 0.42, 0); g.add(top);
        var sol = solar(3, 0.5, 0.7, 0.1, 0.4, E3); sol.position.set(0.1, sp.h + 0.12, 0.5); g.add(sol);
        target = { g: g, h: sp.h };
      }
      /* ramen op de straatzijde */
      var cols = Math.max(2, Math.round(sp.w / 0.62)), rows = Math.max(1, Math.round(sp.h / 0.72));
      var w = windows(cols, rows, 0.3, 0.36, 0.2, 0.26, sp.d / 2 + 0.03, 0,
        isTarget ? 0xd6a5e9 : 0x8a4fd0, isTarget ? 0.45 : 0.28);
      w.position.y = sp.h / 2; g.add(w);
    });

    /* bomen, lantaarns, geparkeerde volumes */
    [-5.3, -3.1, 1.6, 3.9, 6.2].forEach(function (x, i) {
      var tr = tree(0.5 + (i % 2) * 0.12, 0.34 + (i % 3) * 0.05, 0x1a0b40, 0x6b0a93);
      tr.position.set(x, 0, 2.0); s.world.add(tr);
    });
    [-4.6, 0.9, 5.6].forEach(function (x) {
      var lp = lamp(1.5, E2); lp.position.set(x, 0, 2.15); s.world.add(lp);
    });
    [[-2.6, 4.2], [1.2, 4.2], [4.4, 4.2]].forEach(function (p, i) {
      var car = box(0.9, 0.32, 0.42, 0x1a0b40, E, 0.4);
      car.position.set(p[0], 0.16, p[1]); car.rotation.y = 0.02 * (i + 1); s.world.add(car);
    });

    /* achterste rij in silhouet */
    for (var k = 0; k < 9; k++) {
      var h = 1.2 + Math.random() * 2.2;
      var blk = box(1.4 + Math.random() * 0.8, h, 1.6, 0x0e0520, 0x3a078a, 0.3);
      blk.position.set(-8 + k * 2.0, h / 2, -4.2 - Math.random() * 1.2);
      s.world.add(blk);
    }

    /* inspectie van het doelgebouw */
    var cage = edges(new T.BoxGeometry(3.4, 4.4, 3.6), 0x6b0a93, 0.18);
    cage.position.set(0.3, 2.2, -0.1); s.world.add(cage);
    var scan = glow(3.4, 3.6, 0x5342d7, 0.12); scan.rotation.x = -Math.PI / 2;
    scan.position.set(0.3, 0.1, -0.1); s.world.add(scan);
    var mk = [marker(new T.Vector3(0.3, 3.3, -0.1), 1.1), marker(new T.Vector3(1.4, 1.6, 1.1), 1.0)];
    mk.forEach(function (m) { s.world.add(m); });
    var dr = drone(); s.world.add(dr);
    s.world.add(dust(260, 16, 0xb769d3));

    return loop(canvas, function (t) {
      s.spin(t, 0.035);
      scan.position.y = 0.1 + (Math.sin(t * 0.5) * 0.5 + 0.5) * 4.0;
      var a = t * 0.3;
      dr.position.set(0.3 + Math.cos(a) * 2.2, 4.3 + Math.sin(t * 1.1) * 0.12, -0.1 + Math.sin(a) * 2.0);
      dr.rotation.y = -a + Math.PI / 2;
      dr.userData.rotors.forEach(function (r, i) { r.rotation.z += 0.9 * (i % 2 ? 1 : -1); });
      mk.forEach(function (m, i) {
        m.userData.ring.scale.setScalar(1 + Math.sin(t * 2.1 + i * 1.4) * 0.12);
        m.userData.ring.lookAt(s.cam.position);
      });
      s.draw();
    });
  }

  return { current: current, archi: archi, shading: shading, cloud: cloud, district: district };
})();

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
