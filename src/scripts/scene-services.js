/* ==========================================================================
   PRIMELABS — drie dienstenscènes, elk in een eigen canvas
   Eén scène per hoofddienst: 01 dak- en gevelinspecties, 02 periodieke
   werfopvolging, 03 fotogrammetrie en 3D-modellering. Op /diensten staat
   elke scène in haar eigen rij (#canvas-d1 tot #canvas-d3). PL3D.serviceRows
   bouwt een scène pas als haar canvas in de buurt komt, en rekent en tekent
   alleen zolang het canvas echt in beeld is.
   Bouwstenen komen uit PL3D.kit(); zie scene.js.
   ========================================================================== */
(function () {
  if (!window.PL3D) return;

  /* ---------------------------------------------------------------- scènes */
  /* build(kit) -> { group, cam:{pos,target}, hud:{label,meta}, tick(t,camera),
                     status() (optioneel, korte tekst voor de HUD-badge),
                     still (optioneel, tijdstip voor prefers-reduced-motion) } */

  /* ---- 01 — Visuele dak- en gevelinspecties ---- */
  /* Een kantoorgebouw naar een echte drone-opname: een lang gelijkvloers in
     beton met verticale betonvinnen links, daarboven een uitkragend wit volume
     met een dichte rij verticale lamellen (brise-soleil), rechts een lager,
     vooruitspringend volume met plat dak en buitenunits. Op het hoofddak een
     opstaande dakrand, twee rijen schuin opgestelde zonnepanelen en een
     centrale koelgroep. De drone vliegt drie inspectiepunten af (PV-veld,
     aansluiting van de koelgroep, lamellengevel), hangt bij elk punt stil en
     richt er een zachte scankegel op. Lamellen en panelen zijn InstancedMesh
     met samengevoegde randlijnen: weinig draw calls. */
  var SDak = function (kit) {
  var T = kit.T;
  var g = new T.Group();

  var BETON = 0x1a0b40, BETON2 = 0x150833, WIT = 0x2c1a66, GLAS = 0x0b0522, HOUT = 0x6d3f9e;
  var E1 = 0x962fbc, E2 = 0xb769d3, E3 = 0x6b0a93, E4 = 0xd6a5e9, HOT = 0xf1e4fb, PV = 0x5342d7;
  var TAU = Math.PI * 2, ADD = T.AdditiveBlending;

  /* doos tussen twee hoekpunten */
  function blok(x0, x1, y0, y1, z0, z1, fill, ec, eo) {
    var b = kit.solid(x1 - x0, y1 - y0, z1 - z0, fill, ec, eo);
    b.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    g.add(b);
    return b;
  }
  /* het "witte" volume: iets lichter en licht zelf een beetje op */
  function wit(obj) {
    obj.traverse(function (o) {
      if (o.isMesh && o.material && o.material.emissive) { o.material.emissive = new T.Color(0x140a36); o.material.emissiveIntensity = 1; }
    });
    return obj;
  }
  /* donker glas met een dun kader, en optioneel een zachte reflectie */
  function ruit(w, h, x, y, z, ry, gloed) {
    var r = new T.Group();
    var pg = new T.PlaneGeometry(w, h);
    r.add(new T.Mesh(pg, new T.MeshBasicMaterial({ color: GLAS, side: T.DoubleSide })));
    r.add(new T.LineSegments(new T.EdgesGeometry(pg), new T.LineBasicMaterial({ color: E2, transparent: true, opacity: 0.7 })));
    if (gloed) {
      var gl = kit.glowPlane(w * 0.96, h * 0.96, gloed, 0.16);
      gl.position.z = 0.002;
      r.add(gl);
    }
    r.position.set(x, y, z);
    r.rotation.y = ry || 0;
    g.add(r);
    return r;
  }
  /* randlijnen van één vorm, voor veel exemplaren samengevoegd tot één LineSegments */
  function randen(bron, matrices, kleur, op) {
    var src = new T.EdgesGeometry(bron).attributes.position.array, n = src.length;
    var out = new Float32Array(n * matrices.length), v = new T.Vector3();
    for (var m = 0; m < matrices.length; m++) {
      for (var i = 0; i < n; i += 3) {
        v.set(src[i], src[i + 1], src[i + 2]).applyMatrix4(matrices[m]);
        out[m * n + i] = v.x; out[m * n + i + 1] = v.y; out[m * n + i + 2] = v.z;
      }
    }
    var geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.BufferAttribute(out, 3));
    var l = new T.LineSegments(geo, new T.LineBasicMaterial({ color: kleur, transparent: true, opacity: op }));
    g.add(l);
    return l;
  }
  function veel(bron, mat, matrices) {
    var im = new T.InstancedMesh(bron, mat, matrices.length);
    for (var i = 0; i < matrices.length; i++) im.setMatrixAt(i, matrices[i]);
    im.instanceMatrix.needsUpdate = true;
    g.add(im);
    return im;
  }

  // ---- maaiveld ----
  g.add(kit.grid(6.6, 22, 0.1));
  var sh1 = kit.contactShadow(4.6, 0.5);
  sh1.position.x = -0.1; sh1.position.z = -0.1;
  g.add(sh1);
  var sh2 = kit.contactShadow(2.6, 0.42);
  sh2.position.x = 2.1; sh2.position.z = 0.55;
  g.add(sh2);

  /* waterpartij langs de voorgevel, onder de uitkraging */
  var vijver = kit.glowPlane(2.3, 0.3, PV, 0.16);
  vijver.rotation.x = -Math.PI / 2;
  vijver.position.set(-0.3, 0.012, 0.72);
  g.add(vijver);

  // ---- gelijkvloers: hoofdvolume in beton, voorgevel ingetrokken onder de uitkraging ----
  blok(-1.5, 1.3, 0, 1.0, -1.0, 0.5, BETON, E1, 0.85);
  ruit(0.38, 0.86, -0.82, 0.45, 0.505, 0, 0x5342d7);                 /* inkomdeur in houten kader */
  ruit(0.9, 0.5, 0.35, 0.55, -1.005, Math.PI, null);                 /* raamband achtergevel */

  // ---- linkervleugel met verticale betonvinnen ----
  blok(-2.35, -1.5, 0, 1.86, -1.0, 0.4, BETON2, E1, 0.8);
  ruit(0.8, 1.02, -1.925, 0.54, 0.405, 0, 0x3a078a);                 /* donker glas tussen de vinnen */
  [-2.27, -1.97, -1.67].forEach(function (x) { blok(x - 0.08, x + 0.08, 0, 1.86, 0.4, 0.8, BETON, E2, 0.85); });
  var parL = kit.parapet(0.85, 1.4, 0.06, 0.04, BETON2, E2);
  parL.position.set(-1.925, 1.86, -0.3);
  g.add(parL);

  // ---- bovenverdieping: uitkragend wit volume ----
  wit(blok(-1.5, 2.1, 1.0, 1.95, -1.1, 0.72, WIT, E4, 0.9));
  /* diep wit kader rond de voorgevel: één extrusie met een uitsparing */
  var vorm = new T.Shape();
  vorm.moveTo(0, 0); vorm.lineTo(3.6, 0); vorm.lineTo(3.6, 0.95); vorm.lineTo(0, 0.95); vorm.lineTo(0, 0);
  var gat = new T.Path();
  gat.moveTo(0.12, 0.19); gat.lineTo(3.48, 0.19); gat.lineTo(3.48, 0.75); gat.lineTo(0.12, 0.75); gat.lineTo(0.12, 0.19);
  vorm.holes.push(gat);
  var kaderGeo = new T.ExtrudeGeometry(vorm, { depth: 0.25, bevelEnabled: false });
  var kader = new T.Group();
  kader.add(new T.Mesh(kaderGeo, new T.MeshStandardMaterial({ color: WIT, roughness: 0.85 })));
  kader.add(kit.edges(kaderGeo, E4, 0.95));
  kader.position.set(-1.5, 1.0, 0.72);
  g.add(wit(kader));
  /* glas achter de lamellen; links een open raam zonder lamellen, met licht binnen */
  ruit(3.36, 0.56, 0.3, 1.47, 0.726, 0, null);
  var binnen = kit.glowPlane(0.42, 0.52, E4, 0.2);
  binnen.position.set(-1.16, 1.47, 0.73);
  g.add(binnen);
  ruit(1.0, 0.56, 2.105, 1.47, -0.1, Math.PI / 2, 0x5342d7);         /* zijraam rechts */

  /* brise-soleil: een dichte rij verticale lamellen in het kader */
  var LAM = new T.BoxGeometry(0.032, 0.56, 0.05), LAM2 = new T.BoxGeometry(0.032, 0.66, 0.05);
  var lamBoven = [], lamLaag = [], lx;
  for (lx = -0.9; lx <= 1.95; lx += 0.066) lamBoven.push(new T.Matrix4().makeTranslation(lx, 1.47, 0.86));
  /* ook op de voorkant van het lage volume rechts */
  for (lx = 2.08; lx <= 2.5; lx += 0.066) lamLaag.push(new T.Matrix4().makeTranslation(lx, 0.36, 1.37));
  var lamMat = new T.MeshStandardMaterial({ color: HOUT, roughness: 0.7, emissive: new T.Color(0x2a0f4a), emissiveIntensity: 1 });
  veel(LAM, lamMat, lamBoven);
  veel(LAM2, lamMat, lamLaag);
  randen(LAM, lamBoven, E2, 0.35);
  randen(LAM2, lamLaag, E2, 0.3);

  // ---- hoofddak: opstaande dakrand, twee rijen zonnepanelen, koelgroep ----
  var par = kit.parapet(3.6, 2.07, 0.09, 0.05, WIT, E4);
  par.position.set(0.3, 1.95, -0.065);
  g.add(wit(par));

  var TILT = 0.34, PW = 0.36, PD = 0.6, pvM = [], pvGl = [], q = new T.Quaternion(), e = new T.Euler(TILT, 0, 0), s1 = new T.Vector3(1, 1, 1);
  [0.4, -0.68].forEach(function (rz) {
    for (var i = 0; i < 8; i++) {
      var p = new T.Vector3(0.3 + (i - 3.5) * (PW + 0.03), 2.06, rz);
      q.setFromEuler(e);
      pvM.push(new T.Matrix4().compose(p, q, s1));
      pvGl.push(new T.Matrix4().compose(p.clone().setY(2.078), q, s1).multiply(new T.Matrix4().makeRotationX(-Math.PI / 2)));
    }
    blok(0.3 - 1.55, 0.3 + 1.55, 1.95, 2.0, rz - 0.18, rz - 0.15, BETON2, E3, 0.5);   /* draagrail */
  });
  var PVG = new T.BoxGeometry(PW, 0.024, PD);
  veel(PVG, new T.MeshStandardMaterial({ color: 0x120a3a, roughness: 0.35, metalness: 0.3 }), pvM);
  randen(PVG, pvM, 0xa89cf0, 0.85);
  var pvGlans = veel(new T.PlaneGeometry(PW * 0.9, PD * 0.9), new T.MeshBasicMaterial({
    color: PV, transparent: true, opacity: 0.42, side: T.DoubleSide, blending: ADD, depthWrite: false
  }), pvGl);

  /* centrale koelgroep op een opstand, met twee ventilatoren en een kanaal */
  blok(-0.15, 0.55, 1.95, 2.0, -0.37, 0.09, BETON2, E2, 0.7);
  blok(-0.1, 0.5, 2.0, 2.3, -0.35, 0.01, 0x1e1048, E4, 0.9);
  [0.05, 0.35].forEach(function (x) {
    var f = kit.cyl(0.1, 0.1, 0.04, 16, 0x120830, E4);
    f.position.set(x, 2.32, -0.17);
    g.add(f);
  });
  var kanaal = kit.pipe(0.045, 0.62, 'x', 0x120830, E2);
  kanaal.position.set(-0.42, 2.06, -0.17);
  g.add(kanaal);

  // ---- laag volume rechts: springt vooruit, plat dak met buitenunits ----
  blok(1.3, 2.55, 0, 0.78, -0.55, 1.35, BETON, E1, 0.8);
  var parR = kit.parapet(1.25, 1.9, 0.06, 0.04, BETON2, E2);
  parR.position.set(1.925, 0.78, 0.4);
  g.add(parR);
  blok(1.5, 1.78, 0.78, 0.96, 0.95, 1.08, 0x1e1048, E4, 0.85);         /* buitenunit */
  var ven = kit.pipe(0.055, 0.02, 'z', 0x120830, E4);
  ven.position.set(1.64, 0.87, 1.09);
  g.add(ven);
  blok(1.98, 2.26, 0.78, 1.0, 0.62, 0.84, 0x1e1048, E4, 0.85);         /* tweede unit met kanaal */
  var kanaal2 = kit.pipe(0.04, 0.4, 'z', 0x120830, E2);   /* naar de gevel */
  kanaal2.position.set(2.12, 0.92, 0.42);
  g.add(kanaal2);
  /* witte technische kast ernaast */
  wit(blok(2.6, 3.0, 0, 0.5, 0.6, 1.25, WIT, E4, 0.8));

  // ---- drie inspectiepunten; de pin staat langs de normaal van het vlak ----
  /* n = normaal van het vlak (voet en pin), kijk = richting waaruit de drone kijkt, d = afstand */
  var PUNTEN = [
    { p: [0.885, 2.095, 0.4], n: [0, 1, 0], kijk: [0.2, 1, 0.55], d: 1.15, naam: 'PV-veld' },       // 01 zonnepanelen
    { p: [0.55, 2.0, 0.09], n: [0, 1, 0], kijk: [0.35, 1, 0.6], d: 1.1, naam: 'koelgroep' },        // 02 aansluiting koelgroep
    { p: [0.55, 1.47, 0.9], n: [0, 0, 1], kijk: [0.1, 0.3, 1], d: 1.45, naam: 'lamellen' }          // 03 lamellengevel
  ];
  var Y = new T.Vector3(0, 1, 0), Z = new T.Vector3(0, 0, 1);
  var pins = PUNTEN.map(function (pt) {
    var n = new T.Vector3(pt.n[0], pt.n[1], pt.n[2]).normalize();
    var grp = new T.Group();
    grp.position.set(pt.p[0], pt.p[1], pt.p[2]);
    var mk = kit.marker(0, 0, 0, 0.9);
    grp.add(mk);
    var L = 0.44;
    var steel = new T.Mesh(new T.CylinderGeometry(0.008, 0.008, L, 6),
      new T.MeshBasicMaterial({ color: E4, transparent: true, opacity: 0.4, blending: ADD, depthWrite: false }));
    steel.position.copy(n).multiplyScalar(L / 2 + 0.06);
    steel.quaternion.setFromUnitVectors(Y, n);
    grp.add(steel);
    var kop = new T.Mesh(new T.OctahedronGeometry(0.05),
      new T.MeshBasicMaterial({ color: HOT, transparent: true, opacity: 0.92 }));
    kop.position.copy(n).multiplyScalar(L + 0.1);
    grp.add(kop);
    g.add(grp);
    var kijk = new T.Vector3(pt.kijk[0], pt.kijk[1], pt.kijk[2]).normalize();
    var hang = grp.position.clone().addScaledVector(kijk, pt.d);
    hang.y += 0.2;
    return { mk: mk, halo: mk.children[1], steel: steel, kop: kop, n: n, p: grp.position, hang: hang, naam: pt.naam };
  });

  // ---- drone met scankegel: top in de drone, voet op het inspectiepunt ----
  var drone = kit.drone();
  drone.position.copy(pins[0].hang);
  /* de standaardkegel van de drone wijst recht omlaag; hier richt hij zich zelf */
  drone.traverse(function (o) { if (o.geometry && o.geometry.type === 'ConeGeometry') o.visible = false; });
  g.add(drone);

  var kegel = new T.Group();
  var kGeo = new T.ConeGeometry(1, 1, 32, 1, true);
  kGeo.translate(0, -0.5, 0);
  kGeo.rotateX(-Math.PI / 2);                      // top in de oorsprong, voet op z = 1
  var kMat = new T.MeshBasicMaterial({ color: E1, transparent: true, opacity: 0, side: T.DoubleSide, blending: ADD, depthWrite: false });
  kegel.add(new T.Mesh(kGeo, kMat));
  var cirkel = new T.BufferGeometry().setFromPoints(new T.Path().absarc(0, 0, 1, 0, TAU, false).getPoints(48));
  var rMat = new T.LineBasicMaterial({ color: E4, transparent: true, opacity: 0, blending: ADD, depthWrite: false });
  var rand = new T.LineLoop(cirkel, rMat);
  rand.position.z = 1;
  kegel.add(rand);
  var pMat = new T.LineBasicMaterial({ color: HOT, transparent: true, opacity: 0, blending: ADD, depthWrite: false });
  var puls = new T.LineLoop(cirkel, pMat);        // loopt van de drone naar het punt
  kegel.add(puls);
  kegel.visible = false;
  g.add(kegel);

  /* de voetafdruk van de kegel ligt op het vlak zelf */
  var voet = new T.Group();
  var vVlak = new T.Mesh(new T.CircleGeometry(0.22, 40),
    new T.MeshBasicMaterial({ color: 0x5342d7, transparent: true, opacity: 0, side: T.DoubleSide, blending: ADD, depthWrite: false }));
  var vRing = new T.Mesh(new T.RingGeometry(0.22, 0.25, 40),
    new T.MeshBasicMaterial({ color: E4, transparent: true, opacity: 0, side: T.DoubleSide, blending: ADD, depthWrite: false }));
  voet.add(vVlak, vRing);
  voet.visible = false;
  g.add(voet);

  var rotors = drone.userData ? drone.userData.rotors : null;
  var REIS = 1.6, HANG = 2.6, STAP = REIS + HANG, CYCLE = STAP * 3;
  var dp = new T.Vector3(), rich = new T.Vector3();
  var stand = 'Scan · 01 ' + pins[0].naam;
  function glad(u) { return u * u * (3 - 2 * u); }

  return {
    group: g,
    cam: { pos: [3.7, 5.85, 6.5], target: [0.4, 1.0, 0.1] },   /* ca. 35° van boven, zoals de opname */
    hud: { label: "Kantoor / dak + gevel", meta: "Visuele inspectie" },
    still: REIS + HANG * 0.5,             /* hangt boven het PV-veld, kegel aan */
    status: function () { return stand; },
    tick: function (t, camera) {
      var c = t % CYCLE, k = Math.floor(c / STAP) % 3, u = c - k * STAP, scan = 0;
      var van = pins[(k + 2) % 3].hang, naar = pins[k].hang;
      if (u < REIS) {                                /* naar het volgende punt, met een lichte boog */
        var v = glad(u / REIS);
        dp.lerpVectors(van, naar, v);
        dp.y += 0.32 * Math.sin(Math.PI * v);
      } else {                                       /* hangen en scannen */
        var h = (u - REIS) / HANG, zwaai = Math.sin(Math.PI * h);   /* 0 aan begin en einde: geen sprong */
        scan = Math.max(0, Math.min(1, h / 0.12, (1 - h) / 0.12));
        dp.copy(naar);
        dp.x += 0.035 * zwaai * Math.sin(t * 1.3);
        dp.y += 0.045 * zwaai * Math.sin(t * 1.7);
      }
      drone.position.copy(dp);
      drone.rotation.z = 0.06 * Math.sin(t * 0.55);
      if (rotors) {
        for (var i = 0; i < rotors.length; i++) rotors[i].rotation.z = (t * 17 + i * 0.7) % TAU;
      }

      /* kegel en voetafdruk op het huidige punt */
      var P = pins[k];
      rich.subVectors(P.p, dp);
      var len = rich.length();
      kegel.position.copy(dp);
      kegel.quaternion.setFromUnitVectors(Z, rich.divideScalar(len));
      kegel.scale.set(0.25, 0.25, len);
      kegel.visible = voet.visible = scan > 0.01;
      var f = (t * 0.85) % 1;
      puls.position.z = f;
      puls.scale.set(f, f, 1);
      kMat.opacity = 0.2 * scan;
      rMat.opacity = 0.9 * scan;
      pMat.opacity = 0.65 * scan * (1 - f);
      voet.position.copy(P.p).addScaledVector(P.n, 0.012);
      voet.quaternion.setFromUnitVectors(Z, P.n);
      voet.scale.setScalar(1 + 0.08 * Math.sin(t * 3.1));
      vVlak.material.opacity = 0.22 * scan;
      vRing.material.opacity = 0.85 * scan;

      /* pins: allemaal een rustige hartslag, het gescande punt licht op */
      for (var j = 0; j < pins.length; j++) {
        var pq = pins[j], aan = j === k ? scan : 0;
        pq.mk.userData.ring.scale.setScalar(1 + 0.14 * Math.sin(t * 2.4 + j * 1.9) + aan * 0.55);
        pq.halo.material.opacity = 0.28 + 0.4 * aan;
        pq.halo.scale.setScalar(1 + 0.6 * aan);
        pq.kop.scale.setScalar(1 + 0.55 * aan + 0.08 * Math.sin(t * 2.4 + j * 1.9));
        pq.kop.rotation.y = t * 1.4 + j;
        pq.steel.material.opacity = 0.32 + 0.5 * aan;
      }

      /* de panelen glanzen mee als het PV-veld gescand wordt */
      pvGlans.material.opacity = 0.36 + 0.06 * Math.sin(t * 1.2) + (k === 0 ? 0.2 * scan : 0);

      stand = scan > 0 ? 'Scan · 0' + (k + 1) + ' ' + P.naam : 'Naar punt 0' + (k + 1);
    }
  };
};

  /* ---- werktuigen: rupsgraafmachine, puin, afvalcontainer ---------------- */
  /* Alle onderdelen hangen in geneste groepen met het scharnier in de
     oorsprong, zodat giek, steel en bak los kunnen bewegen. */
  var excavator = function (kit, c) {
    var T = kit.T;
    var g = new T.Group();

    /* --- onderwagen: twee rupsen met rollen en een draaikrans --- */
    var tr, ti, side, track, nose, roller;
    for (tr = 0; tr < 2; tr++) {
      side = tr === 0 ? -1 : 1;
      track = kit.solid(1.62, 0.2, 0.34, c.fDeep, c.eMid, 0.8);
      track.position.set(0, 0.17, side * 0.44);
      g.add(track);
      /* aandrijfwielen aan beide uiteinden — geen kale balk */
      nose = kit.pipe(0.17, 0.36, 'z', c.fCore, c.ePale);
      nose.position.set(-0.78, 0.18, side * 0.44);
      g.add(nose);
      nose = kit.pipe(0.17, 0.36, 'z', c.fCore, c.ePale);
      nose.position.set(0.78, 0.18, side * 0.44);
      g.add(nose);
      for (ti = 0; ti < 6; ti++) {
        roller = kit.pipe(0.085, 0.36, 'z', c.fCore, c.eSoft);
        roller.position.set(-0.66 + ti * 0.265, 0.1, side * 0.44);
        g.add(roller);
      }
    }
    var deck = kit.solid(1.0, 0.12, 0.96, c.fCore, c.eDeep, 0.6);
    deck.position.y = 0.33;
    g.add(deck);
    var ring = kit.cyl(0.36, 0.4, 0.1, 20, c.fBase, c.eSoft);
    ring.position.y = 0.44;
    g.add(ring);

    /* --- bovenwagen: draait om de kolom --- */
    var house = new T.Group();
    house.position.y = 0.49;
    g.add(house);

    var body = kit.solid(0.92, 0.36, 0.78, c.fBase, c.eMid, 0.85);
    body.position.set(-0.14, 0.18, 0);
    house.add(body);

    var hood = kit.solid(0.5, 0.16, 0.66, c.fSlab, c.eSoft, 0.7);
    hood.position.set(-0.36, 0.44, 0);
    house.add(hood);

    var cw = kit.solid(0.22, 0.42, 0.72, c.fSlab, c.eSoft, 0.75);
    cw.position.set(-0.68, 0.19, 0);
    house.add(cw);

    var cab = kit.solid(0.4, 0.46, 0.36, c.fSlab, c.ePale, 0.95);
    cab.position.set(0.14, 0.59, 0.2);
    house.add(cab);
    var cabRoof = kit.solid(0.44, 0.05, 0.4, c.fCore, c.ePale, 0.8);
    cabRoof.position.set(0.14, 0.84, 0.2);
    house.add(cabRoof);

    var glass = kit.glowPlane(0.3, 0.32, c.glBlue, 0.34);
    glass.position.set(0.345, 0.6, 0.2);
    glass.rotation.y = Math.PI / 2;
    house.add(glass);

    var stackPipe = kit.pipe(0.045, 0.26, 'y', c.fCore, c.ePale);
    stackPipe.position.set(-0.42, 0.62, -0.22);
    house.add(stackPipe);

    /* --- giek: scharnier in de oorsprong van de groep --- */
    var boom = new T.Group();
    boom.position.set(0.3, 0.3, 0);
    house.add(boom);
    var boomPin = kit.pipe(0.09, 0.4, 'z', c.fCore, c.ePale);
    boom.add(boomPin);
    var boomArm = kit.solid(1.04, 0.2, 0.22, c.fSlab, c.ePale, 0.85);
    boomArm.position.set(0.52, 0.02, 0);
    boom.add(boomArm);
    var boomTop = kit.solid(0.7, 0.07, 0.22, c.fBase, c.eSoft, 0.6);
    boomTop.position.set(0.44, 0.15, 0);
    boomTop.rotation.z = 0.1;
    boom.add(boomTop);
    var boomCyl = kit.pipe(0.055, 0.66, 'x', c.fCore, c.eSoft);
    boomCyl.position.set(0.36, -0.19, 0);
    boomCyl.rotation.z = 0.2;
    boom.add(boomCyl);

    /* --- steel --- */
    var stick = new T.Group();
    stick.position.set(1.04, 0, 0);
    boom.add(stick);
    var stickPin = kit.pipe(0.075, 0.3, 'z', c.fCore, c.ePale);
    stick.add(stickPin);
    var stickArm = kit.solid(0.72, 0.16, 0.17, c.fBase, c.ePale, 0.85);
    stickArm.position.set(0.36, 0, 0);
    stick.add(stickArm);
    var stickCyl = kit.pipe(0.048, 0.48, 'x', c.fCore, c.eSoft);
    stickCyl.position.set(0.22, 0.17, 0);
    stickCyl.rotation.z = -0.18;
    stick.add(stickCyl);

    /* --- bak: open schep met tanden --- */
    var bucket = new T.Group();
    bucket.position.set(0.74, 0, 0);
    stick.add(bucket);
    var bPin = kit.pipe(0.06, 0.26, 'z', c.fCore, c.ePale);
    bucket.add(bPin);
    var back = kit.solid(0.09, 0.3, 0.4, c.fCore, c.eSoft, 0.8);
    back.position.set(0.02, -0.12, 0);
    bucket.add(back);
    var floor = kit.solid(0.3, 0.07, 0.4, c.fSlab, c.ePale, 0.95);
    floor.position.set(0.19, -0.25, 0);
    bucket.add(floor);
    var cheek, cs;
    for (cs = 0; cs < 2; cs++) {
      cheek = kit.solid(0.32, 0.26, 0.05, c.fSlab, c.ePale, 0.8);
      cheek.position.set(0.18, -0.13, (cs === 0 ? -1 : 1) * 0.185);
      bucket.add(cheek);
    }
    var tooth, tj;
    for (tj = 0; tj < 4; tj++) {
      tooth = kit.solid(0.1, 0.05, 0.055, c.fCore, c.ePale, 0.95);
      tooth.position.set(0.37, -0.26, -0.15 + tj * 0.1);
      bucket.add(tooth);
    }

    g.userData.house = house;
    g.userData.boom = boom;
    g.userData.stick = stick;
    g.userData.bucket = bucket;
    return g;
  };

  /* Open afvalcontainer: vier wanden, geen deksel. */
  var skip = function (kit, c, w, h, d) {
    var T = kit.T;
    var g = new T.Group();
    var wall = function (ww, hh, dd, x, y, z) {
      var m = kit.solid(ww, hh, dd, c.fDeep, c.glBlue === undefined ? c.eSoft : c.eSoft, 0.9);
      m.position.set(x, y, z);
      g.add(m);
      return m;
    };
    var th = 0.05;
    wall(w, th, d, 0, th / 2, 0);
    wall(w, h, th, 0, h / 2, -d / 2);
    wall(w, h, th, 0, h / 2, d / 2);
    wall(th, h, d, -w / 2, h / 2, 0);
    wall(th, h * 0.82, d, w / 2, h * 0.41, 0);
    var rim = kit.glowPlane(w, d, c.glBlue, 0.14);
    rim.rotation.x = -Math.PI / 2;
    rim.position.y = h * 0.96;
    g.add(rim);
    return g;
  };

  /* ---- 02 — Periodieke werfopvolging (met nulmeting en voor-/na-opnames) ---- */
  /* Een werf in uitvoering: ruwbouw met een nieuwe verdieping per interval,
     een graafmachine die puin in een container lost. Rond het bouwvolume
     vliegt de drone een vaste, gloeiende spline-route langs acht
     GPS-standpunten en neemt op elk standpunt een opname. */
  var SWerf = function (kit) {
  var T = kit.T;
  var rnd = kit.rnd(3103);
  var g = new T.Group();

  var fDeep = 0x120830, fCore = 0x150725, fBase = 0x1a0b40, fSlab = 0x1e1048, fWarm = 0x241058;
  var eDeep = 0x6b0a93, eMid = 0x962fbc, eSoft = 0xb769d3, ePale = 0xd6a5e9;
  var glBlue = 0x5342d7, glViolet = 0x962fbc, glLilac = 0xb769d3;

  var bx = -1.7, bz = -0.9, bw = 2.0, bd = 1.7;

  g.add(kit.grid(10, 20, 0.12));
  var ground = kit.contactShadow(8.0, 0.4);
  ground.position.set(0.6, 0, 0.1);
  g.add(ground);

  var dustG = kit.dust(44, 2.6, eSoft);
  dustG.position.y = 1.4;
  g.add(dustG);

  var base = kit.solid(bw, 1.1, bd, fBase, eMid, 0.85);
  base.position.set(bx, 0.55, bz);
  g.add(base);

  var wgZ = kit.windowGrid(4, 2, 0.34, 0.3, 0.14, 0.17, bd / 2 + 0.02, 0, ePale, 0.7);
  wgZ.position.set(bx, 0.55, bz);
  g.add(wgZ);

  var wgX = kit.windowGrid(3, 2, 0.34, 0.3, 0.14, 0.17, bw / 2 + 0.02, Math.PI / 2, ePale, 0.5);
  wgX.position.set(bx, 0.55, bz);
  g.add(wgX);

  var cxs = [-0.92, 0.92], czs = [-0.77, 0.77];
  var ci, cj, col;
  for (ci = 0; ci < 2; ci++) {
    for (cj = 0; cj < 2; cj++) {
      col = kit.pipe(0.05, 1.42, "y", fCore, eSoft);
      col.position.set(bx + cxs[ci], 1.81, bz + czs[cj]);
      g.add(col);
    }
  }

  var slab3 = kit.solid(bw, 0.07, bd, fSlab, eSoft, 0.8);
  slab3.position.set(bx, 1.135, bz);
  g.add(slab3);

  var slab4 = kit.solid(bw - 0.12, 0.07, bd - 0.12, fSlab, eSoft, 0.62);
  slab4.position.set(bx, 1.72, bz);
  g.add(slab4);

  var glow3 = kit.glowPlane(bw - 0.14, bd - 0.14, glBlue, 0.24);
  glow3.rotation.x = -Math.PI / 2;
  glow3.position.set(bx, 1.2, bz);
  g.add(glow3);

  var glow4 = kit.glowPlane(bw - 0.3, bd - 0.3, glViolet, 0.15);
  glow4.rotation.x = -Math.PI / 2;
  glow4.position.set(bx, 1.78, bz);
  g.add(glow4);

  var fadeMats = [];
  var collect = function (obj) {
    obj.traverse(function (o) {
      if (o.material) {
        o.material = o.material.clone();
        o.material.transparent = true;
        fadeMats.push({ m: o.material, o: o.material.opacity });
      }
    });
  };

  var sw = 1.26, sd = 1.12;
  var sxc = bx - 0.31, szc = bz - 0.24;
  var slab5 = kit.solid(sw, 0.06, sd, fWarm, ePale, 0.9);
  slab5.position.set(sxc, 2.31, szc);
  collect(slab5);
  g.add(slab5);

  var ri, reb;
  for (ri = 0; ri < 3; ri++) {
    reb = kit.pipe(0.028, 0.32, "y", fCore, ePale);
    reb.position.set(sxc + (rnd() - 0.5) * (sw - 0.3), 2.5, szc + (rnd() - 0.5) * (sd - 0.3));
    collect(reb);
    g.add(reb);
  }

  var glow5 = kit.glowPlane(bw - 0.1, bd - 0.1, glLilac, 0.1);
  glow5.rotation.x = -Math.PI / 2;
  glow5.position.set(bx, 2.35, bz);
  g.add(glow5);

  var si, sp;
  for (si = 0; si < 2; si++) {
    sp = kit.pipe(0.032, 2.5, "y", fDeep, eMid);
    sp.position.set(bx + 1.14, 1.25, bz + (si === 0 ? -0.62 : 0.62));
    g.add(sp);
  }
  var sr, srail;
  for (sr = 0; sr < 3; sr++) {
    srail = kit.pipe(0.026, 1.5, "z", fDeep, eSoft);
    srail.position.set(bx + 1.14, 1.26 + sr * 0.56, bz);
    g.add(srail);
  }

  /* werfhek langs de bouwzijde — loopt niet meer door het werkveld */
  var fenceA = kit.fence(3.0, 0.7, eMid);
  fenceA.position.set(-1.1, 0, 1.75);
  g.add(fenceA);

  var fenceB = kit.fence(2.6, 0.7, eDeep);
  fenceB.position.set(1.6, 0, -2.1);
  g.add(fenceB);

  var stackB = kit.stack(3, 1, 0.38, 0.2, 0.52, fBase, eMid);
  stackB.position.set(-2.6, 0, 1.35);
  stackB.rotation.y = 0.24;
  g.add(stackB);

  /* ---- werkzone: graafmachine tussen puinhoop en container ---- */
  var C = {
    fDeep: fDeep, fCore: fCore, fBase: fBase, fSlab: fSlab,
    eDeep: eDeep, eMid: eMid, eSoft: eSoft, ePale: ePale, glBlue: glBlue
  };

  var PILE = { x: 0.51, z: 0.88 };
  var SKIP = { x: 3.84, z: 1.36 };
  var EXC = { x: 2.7, z: -0.2 };

  var heap = new T.Group();
  heap.position.set(PILE.x, 0, PILE.z);
  g.add(heap);

  var heapShade = kit.contactShadow(2.7, 0.5);
  heapShade.position.set(PILE.x, 0, PILE.z);
  g.add(heapShade);

  /* losse brokken over het terrein — het maaiveld is geen lege vlakte */
  var db, dbx, dbz, dbs, di, scatter = [];
  for (di = 0; di < 9; di++) {
    dbx = -2.4 + rnd() * 5.6;
    dbz = -0.9 + rnd() * 3.1;
    if (Math.abs(dbx - EXC.x) < 1.0 && Math.abs(dbz - EXC.z) < 0.8) continue;
    if (Math.abs(dbx - SKIP.x) < 1.1 && Math.abs(dbz - SKIP.z) < 0.9) continue;
    dbs = 0.08 + rnd() * 0.14;
    db = kit.solid(dbs * 1.6, dbs * 0.8, dbs * 1.3, fCore, di % 2 ? eSoft : eDeep, 0.4);
    db.position.set(dbx, dbs * 0.4, dbz);
    db.rotation.set(rnd() * 0.3, rnd() * Math.PI, rnd() * 0.3);
    g.add(db);
    scatter.push(db);
  }

  var container = skip(kit, C, 1.5, 0.62, 0.95);
  container.position.set(SKIP.x, 0, SKIP.z);
  container.rotation.y = 0.63;
  g.add(container);

  /* vulling: blokjes blijven binnen de wanden en onder de rand */
  var load = new T.Group();
  load.position.set(SKIP.x, 0, SKIP.z);
  load.rotation.y = 0.63;
  g.add(load);
  var li, lc, ls;
  for (li = 0; li < 12; li++) {
    ls = 0.1 + rnd() * 0.11;
    lc = kit.solid(ls * 1.4, ls * 0.7, ls * 1.2, li % 3 === 0 ? fSlab : fCore,
      li % 2 ? eSoft : eMid, 0.45);
    lc.position.set((rnd() - 0.5) * 0.86, 0.13 + rnd() * 0.1, (rnd() - 0.5) * 0.3);
    lc.rotation.set(rnd() * 0.35, rnd() * Math.PI, rnd() * 0.35);
    load.add(lc);
  }

  /* eigen, lichtere palet: de machine moet losstaan van de ruwbouw */
  var EX = {
    fDeep: fSlab, fCore: fBase, fBase: fWarm, fSlab: fWarm,
    eDeep: eSoft, eMid: ePale, eSoft: ePale, ePale: 0xf1e4fb, glBlue: glBlue
  };
  var exc = excavator(kit, EX);
  exc.scale.setScalar(1.2);
  exc.position.set(EXC.x, 0, EXC.z);
  exc.rotation.y = -0.34;
  g.add(exc);
  var excHouse = exc.userData.house,
      excBoom = exc.userData.boom,
      excStick = exc.userData.stick,
      excBucket = exc.userData.bucket;

  var excShade = kit.contactShadow(2.6, 0.55);
  excShade.position.set(EXC.x, 0, EXC.z);
  g.add(excShade);

  /* stofwolk bij de bak, alleen zichtbaar tijdens graven en lossen */
  var puff = kit.dust(26, 1.0, ePale);
  puff.material.opacity = 0;
  g.add(puff);

  /* houdingen: [fase, zwenk, giek, steel, bak] — bak positief = gekanteld */
  var Y_DIG = -2.35, Y_DUMP = -0.60;
  var POSE = [
    [0.00, Y_DIG, 0.33, -1.15, -0.35],
    [0.13, Y_DIG, 0.25, -1.12, 0.00],
    [0.26, Y_DIG, 0.41, -1.02, 0.75],
    [0.38, Y_DIG, 0.72, -1.49, 0.80],
    [0.56, Y_DUMP, 0.72, -1.49, 0.80],
    [0.68, Y_DUMP, 0.70, -1.46, -0.60],
    [0.78, Y_DUMP, 0.80, -1.50, 0.25],
    [0.90, -1.45, 0.80, -1.50, 0.10],
    [1.00, Y_DIG, 0.33, -1.15, -0.35]
  ];
  var CYCLE = 11.5;

  /* Eén brok dat elke ronde op exact hetzelfde punt uit de hoop komt en op
     exact hetzelfde punt in de container belandt. De punten worden uit de
     houdingen zelf afgeleid, dus bak en brok kunnen nooit uit elkaar lopen. */
  var HAUL_LOCAL = new T.Vector3(0.2, -0.12, 0);
  var setPose = function (p) {
    excHouse.rotation.y = p[1];
    excBoom.rotation.z = p[2];
    excStick.rotation.z = p[3];
    excBucket.rotation.z = p[4];
    exc.updateMatrixWorld(true);
  };
  var PICK = new T.Vector3(), DROP = new T.Vector3();
  var PICKQ = new T.Quaternion(), DROPQ = new T.Quaternion();
  setPose(POSE[1]);
  PICK.copy(HAUL_LOCAL).applyMatrix4(excBucket.matrixWorld);
  excBucket.getWorldQuaternion(PICKQ);
  setPose(POSE[5]);
  DROP.copy(HAUL_LOCAL).applyMatrix4(excBucket.matrixWorld);
  excBucket.getWorldQuaternion(DROPQ);
  setPose(POSE[0]);

  var PICKLOW = PICK.clone().setY(PICK.y - 0.12);
  var REST = new T.Vector3(SKIP.x - 0.08, 0.42, SKIP.z + 0.04);
  var RESTQ = new T.Quaternion().setFromEuler(new T.Euler(0.1, 0.63, 0.05));

  /* Het pad dat de bak door de hoop veegt wordt vrijgemaakt: elk brok dat
     de bak in de loop van de cyclus zou doorsnijden, wordt weggelaten. Zo
     zakt de bak in een kuil in plaats van door de stenen heen. */
  var poseAt = function (ph) {
    var i, a, b, u, out = [ph, 0, 0, 0, 0];
    for (i = 1; i < POSE.length; i++) { if (POSE[i][0] >= ph) break; }
    if (i >= POSE.length) i = POSE.length - 1;
    a = POSE[i - 1]; b = POSE[i];
    u = (ph - a[0]) / (b[0] - a[0]);
    u = u * u * u * (u * (u * 6 - 15) + 10);
    for (i = 1; i < 5; i++) out[i] = a[i] + (b[i] - a[i]) * u;
    return out;
  };
  var armMeshes = [];
  excBucket.traverse(function (o) { if (o.isMesh) armMeshes.push(o); });
  var sweepBoxes = [], spi, ami, sph;
  var hp = new T.Vector3(), hs = new T.Vector3(0.52, 0.52, 0.52);
  for (spi = 0; spi <= 44; spi++) {
    sph = Math.min(1, spi <= 20 ? spi * 0.017 : 0.84 + (spi - 20) * 0.0067);
    setPose(poseAt(sph));
    for (ami = 0; ami < armMeshes.length; ami++) {
      sweepBoxes.push(new T.Box3().setFromObject(armMeshes[ami]).expandByScalar(0.06));
    }
    /* ook het brok zelf: dat hangt in de bak en steekt er iets buiten */
    hp.copy(HAUL_LOCAL).applyMatrix4(excBucket.matrixWorld);
    sweepBoxes.push(new T.Box3().setFromCenterAndSize(hp, hs));
  }
  setPose(POSE[0]);
  g.updateMatrixWorld(true);   /* anders staan de brokken nog op hun lokale plek */

  var vrij = function (obj) {
    obj.updateWorldMatrix(true, false);
    var bb = new T.Box3().setFromObject(obj), q;
    for (q = 0; q < sweepBoxes.length; q++) {
      if (sweepBoxes[q].intersectsBox(bb)) return false;
    }
    return true;
  };

  /* de hoop: brokken buiten het pad, tot er genoeg liggen */
  var hTry, hOk = 0, hr, ha, hy, hsz, hc, hRad = 1.02;
  for (hTry = 0; hTry < 260 && hOk < 26; hTry++) {
    hr = hRad * Math.sqrt(rnd());
    ha = rnd() * Math.PI * 2;
    hy = 0.52 * (1 - hr / hRad) * (0.35 + rnd() * 0.65);
    hsz = 0.1 + rnd() * 0.17;
    hc = kit.solid(hsz * (1 + rnd()), hsz, hsz * (1 + rnd()),
      hOk % 3 === 0 ? fSlab : fCore, hOk % 2 === 0 ? eSoft : eMid, 0.5);
    hc.position.set(Math.cos(ha) * hr, hy + hsz * 0.4, Math.sin(ha) * hr);
    hc.rotation.set(rnd() * 0.7, rnd() * Math.PI, rnd() * 0.5);
    heap.add(hc);
    if (vrij(hc)) hOk++; else heap.remove(hc);
  }

  /* los puin dat op het pad ligt, verdwijnt */
  var hi, hd = [];
  for (hi = 0; hi < scatter.length; hi++) {
    if (!vrij(scatter[hi])) hd.push(scatter[hi]);
  }
  for (hi = 0; hi < hd.length; hi++) {
    if (hd[hi].parent) hd[hi].parent.remove(hd[hi]);
  }

  var haul = kit.solid(0.3, 0.2, 0.26, fSlab, 0xf1e4fb, 0.95);
  var haulMats = [];
  haul.traverse(function (o) {
    if (o.material) {
      o.material = o.material.clone();
      o.material.transparent = true;
      haulMats.push({ m: o.material, o: o.material.opacity });
    }
  });
  haul.position.copy(PICK);
  haul.quaternion.copy(PICKQ);
  g.add(haul);

  var TAU = Math.PI * 2, ADD = T.AdditiveBlending;

  /* ---- vaste vliegroute: een gesloten spline door acht GPS-standpunten ----
     Elke ronde vliegt de drone exact dezelfde lus rond het bouwvolume en
     neemt op elk standpunt een foto richting de ruwbouw. */
  var NWP = 8, WP = [], wi, wa;
  for (wi = 0; wi < NWP; wi++) {
    wa = wi / NWP * TAU + 0.4;
    WP.push(new T.Vector3(bx + Math.cos(wa) * 2.1, 1.78 + 0.42 * Math.sin(wa * 2 + 0.5), bz + Math.sin(wa) * 1.8));
  }
  var route = new T.CatmullRomCurve3(WP, true, 'centripetal');
  /* hetzelfde pad twee keer achter elkaar: zo hoeft het oplichtende spoor
     achter de drone nooit over de naad van de lus */
  var dubbel = new T.Curve();
  dubbel.getPoint = function (u, uit) { return route.getPointAt((u * 2) % 1, uit || new T.Vector3()); };

  var SEG = 180, RAD = 6;
  var lijn = function (geo, kleur, op) {
    var m = new T.Mesh(geo, new T.MeshBasicMaterial({ color: kleur, transparent: true, opacity: op, blending: ADD, depthWrite: false }));
    g.add(m);
    return m;
  };
  lijn(new T.TubeGeometry(route, SEG, 0.014, RAD, true), glLilac, 0.4);     /* de hele route, dof */
  lijn(new T.TubeGeometry(route, SEG, 0.045, RAD, true), glViolet, 0.07);    /* en haar gloed */
  var spoorLang = lijn(new T.TubeGeometry(dubbel, SEG * 2, 0.018, RAD, false), ePale, 0.55);
  var spoorKort = lijn(new T.TubeGeometry(dubbel, SEG * 2, 0.026, RAD, false), 0xf1e4fb, 0.95);
  var spoorGloed = lijn(new T.TubeGeometry(dubbel, SEG * 2, 0.075, RAD, false), glLilac, 0.16);
  /* per buissegment liggen RAD * 6 indices achter elkaar, dus een stuk van
     de buis tonen is één drawRange */
  var spoor = function (m, s, lengte) {
    var eind = Math.floor((1 + s) * SEG), begin = Math.max(0, Math.floor((1 + s - lengte) * SEG));
    m.geometry.setDrawRange(begin * RAD * 6, (eind - begin) * RAD * 6);
  };

  /* standpunten: ruit op vlieghoogte, loodlijn en grondring (de GPS-positie) */
  var lengtes = route.getLengths(NWP * 40), totaal = lengtes[lengtes.length - 1];
  var wpU = [], wps = [];
  for (wi = 0; wi < NWP; wi++) {
    wpU.push(lengtes[wi * 40] / totaal);           /* booglengtefractie van standpunt wi */
    var wpG = new T.Group();
    wpG.position.copy(WP[wi]);
    var ruit = new T.Mesh(new T.OctahedronGeometry(0.06),
      new T.MeshBasicMaterial({ color: ePale, transparent: true, opacity: 0.92 }));
    var wHalo = new T.Mesh(new T.SphereGeometry(0.13, 14, 14),
      new T.MeshBasicMaterial({ color: glViolet, transparent: true, opacity: 0.22, blending: ADD, depthWrite: false }));
    var lood = new T.Mesh(new T.CylinderGeometry(0.004, 0.004, WP[wi].y, 4),
      new T.MeshBasicMaterial({ color: eSoft, transparent: true, opacity: 0.16, blending: ADD, depthWrite: false }));
    lood.position.y = -WP[wi].y / 2;
    var grond = new T.Mesh(new T.RingGeometry(0.08, 0.105, 28),
      new T.MeshBasicMaterial({ color: eSoft, transparent: true, opacity: 0.34, side: T.DoubleSide, blending: ADD, depthWrite: false }));
    grond.rotation.x = -Math.PI / 2;
    grond.position.y = -WP[wi].y + 0.015;
    wpG.add(ruit, wHalo, lood, grond);
    g.add(wpG);
    wps.push({ ruit: ruit, halo: wHalo, lood: lood, grond: grond });
  }

  /* opnamekader: een korte flits van de drone naar de ruwbouw */
  var flits = new T.Group();
  var fGeo = new T.ConeGeometry(1, 1, 4, 1, true);
  fGeo.rotateY(Math.PI / 4);
  fGeo.translate(0, -0.5, 0);
  fGeo.rotateX(-Math.PI / 2);                     /* top in de oorsprong, kader op z = 1 */
  var fMat = new T.MeshBasicMaterial({ color: glViolet, transparent: true, opacity: 0, side: T.DoubleSide, blending: ADD, depthWrite: false });
  var fLijn = new T.LineBasicMaterial({ color: ePale, transparent: true, opacity: 0, blending: ADD, depthWrite: false });
  flits.add(new T.Mesh(fGeo, fMat));
  flits.add(new T.LineSegments(new T.EdgesGeometry(fGeo), fLijn));
  flits.visible = false;
  g.add(flits);
  var DOEL = new T.Vector3(bx, 1.3, bz), UP = new T.Vector3(0, 1, 0), mtx = new T.Matrix4();

  var drone = kit.drone();
  drone.traverse(function (o) { if (o.geometry && o.geometry.type === 'ConeGeometry') o.visible = false; });
  g.add(drone);
  var rotors = drone.userData && drone.userData.rotors ? drone.userData.rotors : [];

  var mk1 = kit.marker(sxc, 2.46, szc, 0.95);
  g.add(mk1);

  var LAP = 15;
  var gq = new T.Quaternion();
  var dp = new T.Vector3(), tg = new T.Vector3(), rich = new T.Vector3();
  var stand = 'Route → 01 / 08';
  var twee = function (n) { return (n < 10 ? '0' : '') + n; };

  return {
    group: g,
    cam: { pos: [7.7, 4.9, 7.9], target: [0.2, 1.1, 0.1] },
    hud: { label: "Werfzone / vaste route", meta: "Periodieke opvolging" },
    still: (wpU[2] + 0.012) * LAP,          /* net een opname op standpunt 03 */
    status: function () { return stand; },
    tick: function (t, camera) {
      var i;

      /* graafcyclus: uitzwenken, happen, optillen, lossen, terug */
      var ph = (t % CYCLE) / CYCLE, a, b, u, k;
      for (i = 1; i < POSE.length; i++) { if (POSE[i][0] >= ph) break; }
      a = POSE[i - 1]; b = POSE[i];
      u = (ph - a[0]) / (b[0] - a[0]);
      u = u * u * u * (u * (u * 6 - 15) + 10);
      excHouse.rotation.y = a[1] + (b[1] - a[1]) * u;
      excBoom.rotation.z = a[2] + (b[2] - a[2]) * u;
      excStick.rotation.z = a[3] + (b[3] - a[3]) * u;
      excBucket.rotation.z = a[4] + (b[4] - a[4]) * u;
      /* g hangt in een draaiende wereld: alles wat de bak volgt, gaat terug naar
         de lokale ruimte van g, anders drijft het brok weg bij het draaien */
      exc.updateMatrixWorld(true);
      g.getWorldQuaternion(gq).invert();

      /* het brok: op de hoop, in de bak, en daarna in de container.
         Het vervaagt pas als de bak alweer wegzwenkt, dus je ziet nooit
         dat het terugspringt naar de hoop. */
      var hf = 1;
      if (ph < 0.13) {
        /* ligt op de hoop en wordt in de laatste tel door de bak opgeschept */
        u = ph < 0.06 ? 0 : (ph - 0.06) / 0.07;
        haul.position.copy(PICKLOW).lerp(PICK, u * u * (3 - 2 * u));
        haul.quaternion.copy(PICKQ);
        if (ph < 0.05) hf = ph / 0.05;
      } else if (ph < 0.68) {
        haul.position.copy(HAUL_LOCAL).applyMatrix4(excBucket.matrixWorld);
        g.worldToLocal(haul.position);
        excBucket.getWorldQuaternion(haul.quaternion).premultiply(gq);
      } else if (ph < 0.76) {
        u = (ph - 0.68) / 0.08;
        haul.position.lerpVectors(DROP, REST, u * u);
        haul.quaternion.copy(DROPQ).slerp(RESTQ, u);
      } else {
        haul.position.copy(REST);
        haul.quaternion.copy(RESTQ);
        if (ph > 0.96) hf = 0;
        else if (ph > 0.9) hf = 1 - (ph - 0.9) / 0.06;
      }
      for (i = 0; i < haulMats.length; i++) {
        haulMats[i].m.opacity = haulMats[i].o * hf;
      }

      /* stof waar de bak bezig is */
      excBucket.getWorldPosition(puff.position);
      g.worldToLocal(puff.position);
      puff.position.y = Math.max(0.05, puff.position.y - 0.3);
      k = (ph > 0.1 && ph < 0.3) ? 1 : (ph > 0.63 && ph < 0.76) ? 0.9 : 0;
      puff.material.opacity += (k * 0.5 - puff.material.opacity) * 0.06;
      puff.rotation.y = (t * 0.25) % TAU;

      /* de nieuwe verdieping van dit interval */
      var f = 0.5 + 0.5 * Math.sin(t * 0.45);
      glow5.material.opacity = 0.05 + 0.24 * f;
      glow4.material.opacity = 0.11 + 0.07 * f;
      for (i = 0; i < fadeMats.length; i++) {
        fadeMats[i].m.opacity = fadeMats[i].o * (0.22 + 0.78 * f);
      }

      /* drone op de vaste route; het spoor licht achter hem op */
      var s = (t / LAP) % 1;
      route.getPointAt(s, dp);
      route.getTangentAt(s, tg);
      drone.position.copy(dp);
      drone.position.y += 0.05 * Math.sin(t * 1.6);
      drone.rotation.y = Math.atan2(-tg.z, tg.x);
      drone.rotation.z = 0.06 * Math.sin(t * 0.7);
      for (i = 0; i < rotors.length; i++) {
        rotors[i].rotation.z = (t * (i % 2 === 0 ? 16 : -16)) % TAU;
      }
      spoor(spoorLang, s, 0.26);
      spoor(spoorGloed, s, 0.12);
      spoor(spoorKort, s, 0.06);

      /* standpunten: oplichten als de drone passeert, flits net erna */
      var flash = 0, laatste = 0;
      for (i = 0; i < NWP; i++) {
        var d = s - wpU[i];
        d -= Math.round(d);                           /* cirkelafstand in [-0,5; 0,5] */
        var nabij = Math.max(0, 1 - Math.abs(d) / 0.035);
        var W = wps[i];
        W.ruit.scale.setScalar(1 + 0.9 * nabij);
        W.halo.material.opacity = 0.2 + 0.5 * nabij;
        W.lood.material.opacity = 0.14 + 0.3 * nabij;
        W.grond.scale.setScalar(1 + 1.6 * nabij);
        W.grond.material.opacity = 0.3 + 0.45 * nabij;
        if (d >= 0 && d < 0.03) flash = Math.max(flash, Math.sin(Math.PI * d / 0.03));
        if (wpU[i] <= s) laatste = i;
      }
      flits.visible = flash > 0.01;
      if (flits.visible) {
        rich.subVectors(DOEL, dp);
        mtx.lookAt(DOEL, dp, UP);
        flits.quaternion.setFromRotationMatrix(mtx);
        flits.position.copy(dp);
        flits.scale.set(1.35, 1.0, rich.length() * 0.92);
        fMat.opacity = 0.13 * flash;
        fLijn.opacity = 0.75 * flash;
      }

      dustG.rotation.y = (t * 0.03) % TAU;
      mk1.scale.setScalar(0.95 + 0.1 * Math.sin(t * 1.5));

      stand = flash > 0.15 ? 'Opname · ' + twee(laatste + 1) + ' / 08'
                           : 'Route → ' + twee((laatste + 1) % NWP + 1) + ' / 08';
    }
  };
};

  /* ---- 03 — Fotogrammetrie & 3D-modellering ---- */
  /* De woning met platte daken uit case 03, nagebouwd naar het bovenaanzicht
     en de render van het fotogrammetrisch model (woning-case/boven.webp en
     model-poster.webp; 1 eenheid = 200 px in het bovenaanzicht, 180° gedraaid
     zodat de camera op de tuinzijde kijkt). Hoofdvolume met collectoren,
     lichtkoepel en doorvoeren; lager volume aan de tuinzijde met glazen gevel;
     terras, gazon, glazen overkapping, de houten schuur met zadeldak en de twee
     vuurkorven. Bewust enkel volumes in huisstijl: geen texturen, geen adres.
     De drone vliegt een vast raster (serpentine) af; onder hem groeit de
     puntenwolk mee, gekleurd op hoogte. Daarna schuift een scanlijn over het
     perceel: achter de lijn is de wolk een polygoonmesh geworden, ervoor staan
     nog de losse punten. Tot slot licht de opmeting van het platte dak van het
     hoofdvolume op. Vier grondcontrolepunten markeren de georeferentie. */
  var SWoning = function (kit) {
  var T = kit.T;
  var R = kit.rnd(7331);
  var g = new T.Group();

  var F_MID = 0x1a0b40, F_HI = 0x1e1048, F_DAK = 0x241058;
  var E_MID = 0x962fbc, E_HI = 0xb769d3, E_PALE = 0xd6a5e9;
  var G_BLUE = 0x5342d7, G_HOT = 0xf1e4fb;
  var TAU = Math.PI * 2, ADD = T.AdditiveBlending;

  /* ---- opgemeten volumes (x, z in wereldeenheden; y = hoogte) ---- */
  var X_MIN = -2.2, X_MAX = 2.25, Z_MIN = -1.0, Z_MAX = 1.0;
  var W = X_MAX - X_MIN, D = Z_MAX - Z_MIN, XC = (X_MIN + X_MAX) / 2;
  var HOOFD = { x0: -2.165, x1: -0.475, z0: -0.55, z1: 0.775, h: 1.1 };    /* twee bouwlagen      */
  var LAAG = { x0: -0.475, x1: 0.015, z0: -0.4, z1: 0.7, h: 0.56 };       /* tuinzijde, 1 laag   */
  var SCHUUR = { x0: -0.95, x1: 0.4, z0: -0.99, z1: -0.65, h: 0.36, nok: 0.26 };
  var VERANDA = { x0: 0.36, x1: 1.3, z0: -0.89, z1: -0.45, h: 0.42 };
  var GAZON = { x0: 0.475, x1: 2.25, z0: -0.7, z1: 0.99 };
  var KORVEN = [[0.33, 0.865], [0.18, 0.865]], KORF = 0.065, KORF_H = 0.08;
  var PAR = 0.06;                                                          /* dakrand boven de muur */
  function binnen(v, x, z, m) { m = m || 0; return x >= v.x0 - m && x <= v.x1 + m && z >= v.z0 - m && z <= v.z1 + m; }
  function gras(x, z) { return 0.012 + 0.008 * Math.sin(x * 9.1 + z * 4.3) * Math.cos(z * 7.7 - x * 2.1); }
  function hoogte(x, z) {                    /* bovenkant van wat de drone ziet op (x, z) */
    if (binnen(HOOFD, x, z)) return HOOFD.h + (binnen(HOOFD, x, z, -0.04) ? 0 : PAR);
    if (binnen(LAAG, x, z)) return LAAG.h + (binnen(LAAG, x, z, -0.05) ? 0 : PAR * 0.8);
    if (binnen(SCHUUR, x, z)) {
      var zc = (SCHUUR.z0 + SCHUUR.z1) / 2, hd = (SCHUUR.z1 - SCHUUR.z0) / 2;
      return SCHUUR.h + SCHUUR.nok * (1 - Math.abs(z - zc) / hd);
    }
    if (binnen(VERANDA, x, z)) return VERANDA.h;
    for (var k = 0; k < KORVEN.length; k++) {
      if (Math.abs(x - KORVEN[k][0]) < KORF && Math.abs(z - KORVEN[k][1]) < KORF) return KORF_H;
    }
    return binnen(GAZON, x, z) ? gras(x, z) : 0;
  }

  g.add(kit.grid(6.0, 20, 0.09));
  var shadow = kit.contactShadow(3.8, 0.5);
  shadow.position.set(-0.9, 0.006, -0.05);
  g.add(shadow);

  /* ---- knipvlakken van de scanlijn; in tick naar de wereldruimte gezet ---- */
  var knipMesh = new T.Plane(new T.Vector3(-1, 0, 0), 0);   /* mesh: alleen x <= sx        */
  var knipBand = new T.Plane(new T.Vector3(1, 0, 0), 0);    /* verse band: x >= sx - BAND  */
  var knipWolk = new T.Plane(new T.Vector3(1, 0, 0), 0);    /* wolk: alleen x >= sx        */
  var BAND = 0.45;
  function zet(pl, nx, c) { pl.normal.set(nx, 0, 0); pl.constant = c; pl.applyMatrix4(g.matrixWorld); }

  /* ---- het mesh van het perceel: terras vlak, gazon licht ruw ---- */
  var geo = new T.PlaneGeometry(W, D, 48, 22);
  geo.rotateX(-Math.PI / 2);
  geo.translate(XC, 0, 0);
  var pos = geo.attributes.position;
  for (var i = 0; i < pos.count; i++) {
    var x = pos.getX(i), z = pos.getZ(i);
    pos.setY(i, binnen(GAZON, x, z) ? gras(x, z) + (R() - 0.5) * 0.012 : 0.002);
  }
  geo.computeVertexNormals();
  var terrain = new T.Mesh(geo, new T.MeshStandardMaterial({
    color: F_MID, roughness: 0.95, flatShading: true, transparent: true, opacity: 0.92, clippingPlanes: [knipMesh]
  }));
  g.add(terrain);
  var wireGeo = new T.WireframeGeometry(geo);
  var wire = new T.LineSegments(wireGeo,
    new T.LineBasicMaterial({ color: E_HI, transparent: true, opacity: 0.2, clippingPlanes: [knipMesh] }));
  g.add(wire);
  /* de driehoeken die net uit de wolk zijn gerekend, gloeien even na */
  var versMat = new T.LineBasicMaterial({
    color: G_HOT, transparent: true, opacity: 0, blending: ADD, depthWrite: false, clippingPlanes: [knipMesh, knipBand]
  });
  var vers = new T.LineSegments(wireGeo, versMat);
  vers.position.y = 0.004;
  g.add(vers);

  /* ---- de woning zelf: elk volume wordt mee mesh (vlak, driehoeken, randen) ---- */
  var huisMats = [];                         /* [materiaal, basisdekking] voor het uitfaden */
  function volg(mat, op) { mat.transparent = true; mat.clippingPlanes = [knipMesh]; huisMats.push([mat, op]); return mat; }
  function deel(geom, px, py, pz, fill, driehoeken, ec) {
    var d = new T.Group();
    d.position.set(px, py, pz);
    d.add(new T.Mesh(geom, volg(new T.MeshStandardMaterial({ color: fill, roughness: 0.9, metalness: 0.06 }), 1)));
    var rand = new T.EdgesGeometry(geom);
    d.add(new T.LineSegments(rand, volg(new T.LineBasicMaterial({ color: ec || E_MID }), 0.85)));
    if (driehoeken) {
      var draad = new T.WireframeGeometry(geom);
      d.add(new T.LineSegments(draad, volg(new T.LineBasicMaterial({ color: E_HI }), 0.14)));
      d.add(new T.LineSegments(draad, versMat));
    } else d.add(new T.LineSegments(rand, versMat));
    g.add(d);
    return d;
  }
  function doos(v, h, y0, fill, stap) {      /* box over een opgemeten vlak, gesegmenteerd voor de driehoeken */
    var w = v.x1 - v.x0, dd = v.z1 - v.z0;
    var bg = new T.BoxGeometry(w, h, dd, Math.max(1, Math.round(w / stap)), Math.max(1, Math.round(h / stap)), Math.max(1, Math.round(dd / stap)));
    return deel(bg, (v.x0 + v.x1) / 2, y0 + h / 2, (v.z0 + v.z1) / 2, fill, true);
  }
  function rand(v, h, y0, th, fill) {        /* opstaande dakrand rond een plat dak */
    var w = v.x1 - v.x0, dd = v.z1 - v.z0, cx = (v.x0 + v.x1) / 2, cz = (v.z0 + v.z1) / 2;
    [[cx, v.z1 - th / 2, w, th], [cx, v.z0 + th / 2, w, th], [v.x1 - th / 2, cz, th, dd - 2 * th], [v.x0 + th / 2, cz, th, dd - 2 * th]]
      .forEach(function (p) { deel(new T.BoxGeometry(p[2], h, p[3]), p[0], y0 + h / 2, p[1], F_DAK, false, E_HI); });
  }
  function glas(w, h, px, py, pz, ry, op, rx) {  /* glasvlak dat pas oplicht als het mesh er is */
    var m = new T.Mesh(new T.PlaneGeometry(w, h), volg(new T.MeshBasicMaterial({
      color: E_PALE, side: T.DoubleSide, blending: ADD, depthWrite: false
    }), op || 0.16));
    m.position.set(px, py, pz); m.rotation.set(rx || 0, ry || 0, 0);
    g.add(m);
    var lijst = new T.LineSegments(new T.EdgesGeometry(new T.PlaneGeometry(w, h)), volg(new T.LineBasicMaterial({ color: E_PALE }), 0.6));
    lijst.position.copy(m.position); lijst.rotation.copy(m.rotation);
    g.add(lijst);
    return m;
  }

  /* hoofdvolume (twee bouwlagen) en het lagere volume aan de tuinzijde */
  doos(HOOFD, HOOFD.h, 0, F_HI, 0.16);
  rand(HOOFD, PAR, HOOFD.h, 0.04);
  doos(LAAG, LAAG.h, 0, F_HI, 0.14);
  rand(LAAG, PAR * 0.8, LAAG.h, 0.05);
  /* glazen tuingevel van het lage volume, en de ramen van de verdieping erboven */
  glas(0.96, 0.4, LAAG.x1 + 0.004, 0.24, 0.12, Math.PI / 2, 0.2);
  glas(0.42, 0.36, 0.0, 0.24, LAAG.z1 + 0.004, 0, 0.14);
  glas(0.34, 0.26, HOOFD.x1 + 0.004, 0.8, 0.42, Math.PI / 2, 0.2);
  glas(0.26, 0.24, HOOFD.x1 + 0.004, 0.8, 0.02, Math.PI / 2, 0.08);  /* licht gevelpaneel */
  glas(0.1, 0.62, -0.62, 0.4, HOOFD.z1 + 0.004, 0, 0.16);             /* hoge ramen in de zijgevel */
  glas(0.1, 0.62, -0.95, 0.4, HOOFD.z1 + 0.004, 0, 0.16);

  /* op het platte dak: twee collectoren, lichtkoepel, dakluik, doorvoeren, koepeltje */
  var y1 = HOOFD.h;
  [0.505, 0.33].forEach(function (cz) {
    var c = deel(new T.BoxGeometry(0.27, 0.018, 0.15), -1.23, y1 + 0.09, cz, 0x2a1670, false, E_PALE);
    c.rotation.x = -0.55;
    deel(new T.BoxGeometry(0.02, 0.08, 0.02), -1.34, y1 + 0.04, cz - 0.04, F_DAK, false);
    deel(new T.BoxGeometry(0.02, 0.08, 0.02), -1.12, y1 + 0.04, cz - 0.04, F_DAK, false);
  });
  deel(new T.BoxGeometry(0.31, 0.06, 0.17), -0.78, y1 + 0.03, -0.075, F_DAK, false, E_PALE);
  glas(0.25, 0.12, -0.78, y1 + 0.062, -0.075, 0, 0.3, -Math.PI / 2);
  deel(new T.BoxGeometry(0.25, 0.05, 0.35), -1.6, y1 + 0.025, 0.45, F_DAK, false);
  [[-1.45, 0.61], [-1.43, 0.26]].forEach(function (p) {
    deel(new T.CylinderGeometry(0.022, 0.022, 0.14, 10), p[0], y1 + 0.07, p[1], 0x2a1670, false, E_HI);
  });
  deel(new T.BoxGeometry(0.07, 0.05, 0.07), -1.85, y1 + 0.025, 0.02, F_DAK, false, E_PALE);

  /* houten schuur met zadeldak (nok evenwijdig aan x) */
  var sw = SCHUUR.x1 - SCHUUR.x0, sd = SCHUUR.z1 - SCHUUR.z0, scx = (SCHUUR.x0 + SCHUUR.x1) / 2, scz = (SCHUUR.z0 + SCHUUR.z1) / 2;
  doos(SCHUUR, SCHUUR.h, 0, F_HI, 0.14);
  var dak = new T.Shape();
  dak.moveTo(-sd / 2 - 0.02, 0); dak.lineTo(sd / 2 + 0.02, 0); dak.lineTo(0, SCHUUR.nok); dak.lineTo(-sd / 2 - 0.02, 0);
  var dakGeo = new T.ExtrudeGeometry(dak, { depth: sw + 0.04, bevelEnabled: false, steps: 8 });
  dakGeo.translate(0, 0, -(sw + 0.04) / 2);
  dakGeo.rotateY(Math.PI / 2);
  deel(dakGeo, scx, SCHUUR.h, scz, F_DAK, true, E_HI);

  /* glazen overkapping: palen, glasdak met roeden, glazen zijwanden */
  var vw = VERANDA.x1 - VERANDA.x0, vd = VERANDA.z1 - VERANDA.z0, vcx = (VERANDA.x0 + VERANDA.x1) / 2, vcz = (VERANDA.z0 + VERANDA.z1) / 2;
  [[VERANDA.x0, VERANDA.z0], [VERANDA.x1, VERANDA.z0], [VERANDA.x0, VERANDA.z1], [VERANDA.x1, VERANDA.z1]].forEach(function (p) {
    deel(new T.BoxGeometry(0.026, VERANDA.h, 0.026), p[0], VERANDA.h / 2, p[1], F_DAK, false, E_HI);
  });
  deel(new T.BoxGeometry(vw + 0.03, 0.03, vd + 0.03), vcx, VERANDA.h, vcz, 0x2a1670, false, E_PALE);
  for (var rd = 1; rd < 7; rd++) {
    deel(new T.BoxGeometry(0.012, 0.012, vd), VERANDA.x0 + vw * rd / 7, VERANDA.h + 0.02, vcz, F_DAK, false, E_PALE);
  }
  glas(vw, VERANDA.h, vcx, VERANDA.h / 2, VERANDA.z1, 0, 0.1);
  glas(vd, VERANDA.h, VERANDA.x1, VERANDA.h / 2, vcz, Math.PI / 2, 0.1);

  /* de twee vuurkorven op het terras */
  KORVEN.forEach(function (k) { deel(new T.BoxGeometry(KORF * 2, KORF_H, KORF * 2), k[0], KORF_H / 2, k[1], F_DAK, false, E_HI); });

  /* ---- vliegroute: vier banen, serpentine ---- */
  var ROWS = 4, X0 = -2.1, X1 = 2.15, Z0 = -0.8, DZ = 0.533, FLY = 2.2;
  function route(s) {                       /* s in [0,1] -> [x, z, richting] */
    var f = Math.min(ROWS - 1e-6, s * ROWS), row = Math.floor(f), u = f - row;
    var heen = row % 2 === 0, z = Z0 + row * DZ, x;
    if (u < 0.88 || row === ROWS - 1) {
      var v = row === ROWS - 1 ? u : u / 0.88;
      x = heen ? X0 + (X1 - X0) * v : X1 - (X1 - X0) * v;
      return [x, z, heen ? 0 : Math.PI];
    }
    x = heen ? X1 : X0;
    return [x, z + DZ * (u - 0.88) / 0.12, -Math.PI / 2];
  }
  var path = [];
  for (var r = 0; r < ROWS; r++) {
    var zz = Z0 + r * DZ;
    if (r % 2 === 0) { path.push(new T.Vector3(X0, FLY, zz), new T.Vector3(X1, FLY, zz)); }
    else { path.push(new T.Vector3(X1, FLY, zz), new T.Vector3(X0, FLY, zz)); }
  }
  var pathLine = new T.Line(new T.BufferGeometry().setFromPoints(path),
    new T.LineBasicMaterial({ color: E_PALE, transparent: true, opacity: 0.32 }));
  g.add(pathLine);

  /* ---- puntenwolk: gesorteerd in de volgorde waarin de drone hem vastlegt ---- */
  function wanneer(px, pz) {                /* moment in de vlucht waarop (px, pz) onder de drone ligt */
    var rr = Math.max(0, Math.min(ROWS - 1, Math.round((pz - Z0) / DZ)));
    var uu = Math.max(0, Math.min(1, (px - X0) / (X1 - X0)));
    if (rr % 2 === 1) uu = 1 - uu;
    return (rr + uu) / ROWS;
  }
  var pts = [];
  /* bovenaanzicht: perceel, daken en de dakopbouw */
  for (i = 0; i < 2900; i++) {
    var px = X_MIN + R() * W, pz = Z_MIN + R() * D;
    pts.push({ x: px, y: hoogte(px, pz) + 0.014, z: pz, t: wanneer(px, pz) });
  }
  /* schuine beelden: ook de gevels komen in de wolk */
  function gevel(v, h, n, zijden) {
    for (var q = 0; q < n; q++) {
      var zijde = zijden[q % zijden.length], u = R(), y = R() * h, qx, qz;
      if (zijde === 'x1') { qx = v.x1; qz = v.z0 + u * (v.z1 - v.z0); }
      else if (zijde === 'x0') { qx = v.x0; qz = v.z0 + u * (v.z1 - v.z0); }
      else if (zijde === 'z1') { qz = v.z1; qx = v.x0 + u * (v.x1 - v.x0); }
      else { qz = v.z0; qx = v.x0 + u * (v.x1 - v.x0); }
      if (v !== LAAG && y < LAAG.h + PAR && binnen(LAAG, qx, qz, 0.002)) continue;   /* achter het lage volume */
      pts.push({ x: qx, y: y, z: qz, t: wanneer(qx, qz) });
    }
  }
  gevel(HOOFD, HOOFD.h + PAR, 520, ['x1', 'z1', 'x0', 'z0']);
  gevel(LAAG, LAAG.h + PAR, 160, ['x1', 'z1', 'z0']);
  gevel(SCHUUR, SCHUUR.h, 90, ['x1', 'z1', 'x0']);
  gevel(VERANDA, VERANDA.h, 70, ['x1', 'z1']);
  pts.sort(function (a, b) { return a.t - b.t; });
  var TOP = HOOFD.h + PAR;
  var pArr = new Float32Array(pts.length * 3), cArr = new Float32Array(pts.length * 3), tArr = [];
  var cLow = new T.Color(G_BLUE), cMid = new T.Color(E_MID), cTop = new T.Color(G_HOT), cc = new T.Color();
  for (i = 0; i < pts.length; i++) {
    var p = pts[i], k = Math.min(1, p.y / TOP);
    if (k < 0.5) cc.copy(cLow).lerp(cMid, k * 2); else cc.copy(cMid).lerp(cTop, (k - 0.5) * 2);
    pArr[i * 3] = p.x; pArr[i * 3 + 1] = p.y; pArr[i * 3 + 2] = p.z;
    cArr[i * 3] = cc.r; cArr[i * 3 + 1] = cc.g; cArr[i * 3 + 2] = cc.b;
    tArr.push(p.t);
  }
  var cloudGeo = new T.BufferGeometry();
  cloudGeo.setAttribute('position', new T.BufferAttribute(pArr, 3));
  cloudGeo.setAttribute('color', new T.BufferAttribute(cArr, 3));
  var cloud = new T.Points(cloudGeo, new T.PointsMaterial({
    size: 0.03, vertexColors: true, transparent: true, opacity: 0.82, depthWrite: false, blending: ADD,
    clippingPlanes: [knipWolk]
  }));
  g.add(cloud);
  function telTot(s) {                      /* aantal punten dat al gescand is */
    var lo = 0, hi = tArr.length;
    while (lo < hi) { var m = (lo + hi) >> 1; if (tArr[m] <= s) lo = m + 1; else hi = m; }
    return lo;
  }

  /* ---- scanlijn: een lichtprofiel dat daken en perceel volgt, met een zacht gordijn ---- */
  var NPROF = 96;
  var profPos = new Float32Array(NPROF * 3);
  var profGeo = new T.BufferGeometry();
  profGeo.setAttribute('position', new T.BufferAttribute(profPos, 3));
  var profMat = new T.LineBasicMaterial({ color: G_HOT, transparent: true, opacity: 0, blending: ADD, depthWrite: false });
  var profiel = new T.Line(profGeo, profMat);
  var profiel2 = new T.Line(profGeo, profMat);   /* tweede lijn net erboven: oogt dikker */
  profiel2.position.y = 0.014;
  profiel.frustumCulled = profiel2.frustumCulled = false;
  g.add(profiel, profiel2);
  function profielOp(sx) {
    for (var q = 0; q < NPROF; q++) {
      var pz2 = Z_MIN + D * q / (NPROF - 1);
      profPos[q * 3] = sx; profPos[q * 3 + 1] = hoogte(sx, pz2) + 0.02; profPos[q * 3 + 2] = pz2;
    }
    profGeo.attributes.position.needsUpdate = true;
  }
  var gc = document.createElement('canvas');
  gc.width = 2; gc.height = 64;
  var gx = gc.getContext('2d'), gr = gx.createLinearGradient(0, 0, 0, 64);
  gr.addColorStop(0, 'rgba(255,255,255,0)');
  gr.addColorStop(1, 'rgba(255,255,255,1)');
  gx.fillStyle = gr;
  gx.fillRect(0, 0, 2, 64);
  var gordijn = new T.Mesh(new T.PlaneGeometry(D, 1.6), new T.MeshBasicMaterial({
    color: E_HI, map: new T.CanvasTexture(gc), transparent: true, opacity: 0, side: T.DoubleSide, blending: ADD, depthWrite: false
  }));
  gordijn.rotation.y = Math.PI / 2;
  gordijn.position.y = 0.8;
  g.add(gordijn);

  /* ---- grondcontrolepunten (georeferentie) op de hoeken van het perceel ---- */
  [[X_MIN + 0.12, Z_MIN + 0.1], [X_MAX - 0.1, Z_MIN + 0.1], [X_MIN + 0.12, Z_MAX - 0.1], [X_MAX - 0.1, Z_MAX - 0.1]].forEach(function (c) {
    g.add(kit.marker(c[0], hoogte(c[0], c[1]) + 0.03, c[1], 0.55));
  });

  /* ---- opmeting van het platte dak: omtrek, maatlijnen, vlak en meetlabel ---- */
  var meting = new T.Group();
  var MY = HOOFD.h + PAR + 0.02, mx0 = HOOFD.x0 + 0.04, mx1 = HOOFD.x1 - 0.04, mz0 = HOOFD.z0 + 0.04, mz1 = HOOFD.z1 - 0.04;
  var mcx = (mx0 + mx1) / 2, mcz = (mz0 + mz1) / 2;
  var lijnMat = new T.LineBasicMaterial({ color: E_PALE, transparent: true, opacity: 0.8, blending: ADD, depthWrite: false });
  meting.add(new T.LineLoop(new T.BufferGeometry().setFromPoints([
    new T.Vector3(mx0, MY, mz0), new T.Vector3(mx1, MY, mz0), new T.Vector3(mx1, MY, mz1), new T.Vector3(mx0, MY, mz1)
  ]), lijnMat));
  var vlak = kit.glowPlane(mx1 - mx0, mz1 - mz0, G_BLUE, 0.14);
  vlak.rotation.x = -Math.PI / 2;
  vlak.position.set(mcx, MY - 0.005, mcz);
  meting.add(vlak);
  /* maatlijnen met eindstreepjes langs twee zijden, iets boven de dakrand */
  function maat(a, b, dir) {
    var v = [a, b];
    [a, b].forEach(function (e) { v.push(e.clone().add(dir), e.clone().sub(dir)); });
    var g2 = new T.BufferGeometry().setFromPoints([v[0], v[1], v[2], v[3], v[4], v[5]]);
    meting.add(new T.LineSegments(g2, new T.LineBasicMaterial({ color: G_HOT, transparent: true, opacity: 0.85, blending: ADD, depthWrite: false })));
  }
  maat(new T.Vector3(mx0, MY + 0.1, mz1 + 0.14), new T.Vector3(mx1, MY + 0.1, mz1 + 0.14), new T.Vector3(0, 0, 0.05));
  maat(new T.Vector3(mx1 + 0.14, MY + 0.1, mz0), new T.Vector3(mx1 + 0.14, MY + 0.1, mz1), new T.Vector3(0.05, 0, 0));
  meting.add(kit.marker(mcx, MY + 0.02, mcz, 0.85));
  var label = kit.sheet(0.82, 0.5, 3, E_PALE);
  label.position.set(-2.3, 1.85, -0.3);
  label.rotation.y = 0.75;
  meting.add(label);
  var leider = new T.Line(new T.BufferGeometry().setFromPoints([
    new T.Vector3(mcx, MY + 0.06, mcz), new T.Vector3(-1.75, 1.6, -0.18), new T.Vector3(-2.02, 1.66, -0.26)
  ]), new T.LineBasicMaterial({ color: E_PALE, transparent: true, opacity: 0.55 }));
  meting.add(leider);
  var meetMats = [];
  meting.traverse(function (o) {
    if (!o.material) return;
    o.material.transparent = true;
    meetMats.push([o.material, o.material.opacity]);
  });
  meting.visible = false;
  g.add(meting);

  /* ---- drone met opnamestrook op perceel en daken ---- */
  var drone = kit.drone();
  drone.position.set(X0, FLY, Z0);
  g.add(drone);
  var swath = kit.scanRig(0.9, 0.5, E_PALE);
  g.add(swath.group);

  var dust = kit.dust(50, 5.4, E_HI);
  g.add(dust);

  var rotors = drone.userData ? drone.userData.rotors : null;
  var droneKegel = null;                   /* de opnamekegel van de drone: alleen tijdens de vlucht */
  drone.traverse(function (o) { if (o.geometry && o.geometry.type === 'ConeGeometry') droneKegel = o; });
  var CYCLE = 17;
  var START = new T.Vector3(X0, FLY, Z0), EIND = new T.Vector3(X1, FLY, Z0 + (ROWS - 1) * DZ);
  var RUST = new T.Vector3(1.3, FLY + 0.1, 0.5), dp = new T.Vector3();   /* boven het gazon: blijft in beeld */
  var SX0 = X_MIN - 0.06, SX1 = X_MAX + 0.06;
  var stand = 'Vlucht · baan 1 / ' + ROWS;
  function kl(v) { return Math.max(0, Math.min(1, v)); }
  function glad(u) { return u * u * (3 - 2 * u); }

  return {
    group: g,
    cam: { pos: [4.5, 3.55, 4.6], target: [-0.25, 0.5, -0.05] },
    hud: { label: 'Woning / 3D-mesh', meta: 'Fotogrammetrie' },
    still: 0.64 * CYCLE,                /* scanlijn halverwege: links mesh, rechts wolk */
    status: function () { return stand; },
    tick: function (t, camera) {
      var ph = (t % CYCLE) / CYCLE;
      var vlucht = kl(ph / 0.46);                    /*  0 – 46 %: rastervlucht, de wolk groeit      */
      var sweep = kl((ph - 0.5) / 0.26);             /* 50 – 76 %: scanlijn, de wolk wordt mesh      */
      var meet = kl((ph - 0.77) / 0.07);             /* 77 – 84 %: de dakopmeting verschijnt         */
      var uit = ph > 0.93 ? 1 - (ph - 0.93) / 0.07 : 1;  /* zacht opnieuw beginnen                   */

      /* drone: raster, opzij hangen tijdens het rekenen, terug naar de start */
      if (ph < 0.46) {
        var rp = route(vlucht);
        dp.set(rp[0], FLY, rp[1]);
        drone.rotation.y = -rp[2] + Math.PI / 2;
      } else if (ph < 0.56) dp.lerpVectors(EIND, RUST, glad((ph - 0.46) / 0.1));
      else if (ph < 0.93) dp.copy(RUST);
      else dp.lerpVectors(RUST, START, glad((ph - 0.93) / 0.07));
      drone.position.set(dp.x, dp.y + 0.06 * Math.sin(t * 1.3), dp.z);
      if (rotors) for (var i = 0; i < rotors.length; i++) rotors[i].rotation.z = (t * 17 + i * 0.7) % TAU;
      swath.group.visible = ph < 0.46;
      if (droneKegel) droneKegel.visible = swath.group.visible;
      if (swath.group.visible) swath.group.position.set(dp.x, hoogte(dp.x, dp.z) + 0.05, dp.z);

      /* wolk en mesh delen de scanlijn: links ervan mesh, rechts ervan punten */
      var sx = SX0 + (SX1 - SX0) * sweep;
      g.updateWorldMatrix(true, false);
      zet(knipMesh, -1, sx);
      zet(knipWolk, 1, -sx);
      zet(knipBand, 1, -(sx - BAND));
      cloudGeo.setDrawRange(0, ph < 0.5 ? telTot(vlucht) : tArr.length);
      cloud.material.opacity = 0.82;

      var lijn = sweep > 0 && sweep < 1 ? Math.min(1, sweep / 0.05, (1 - sweep) / 0.05) : 0;
      profiel.visible = profiel2.visible = gordijn.visible = lijn > 0.01;
      if (lijn > 0.01) {
        profielOp(sx);
        gordijn.position.x = sx;
        profMat.opacity = 0.95 * lijn;
        gordijn.material.opacity = 0.2 * lijn;
      }
      versMat.opacity = 0.75 * (sweep < 1 ? lijn : 0);

      terrain.material.opacity = 0.92 * uit;
      wire.material.opacity = (0.2 + 0.08 * meet) * uit;
      for (var m = 0; m < huisMats.length; m++) huisMats[m][0].opacity = huisMats[m][1] * uit;

      var mk = meet * uit;
      meting.visible = mk > 0.01;
      for (m = 0; m < meetMats.length; m++) {
        meetMats[m][0].opacity = meetMats[m][1] * mk * (m === 0 ? 0.7 + 0.3 * Math.sin(t * 2.2) : 1);
      }
      label.position.y = 1.85 + 0.04 * Math.sin(t * 0.7);
      dust.rotation.y = (t * 0.04) % TAU;

      if (ph < 0.46) stand = 'Vlucht · baan ' + (Math.min(ROWS - 1, Math.floor(vlucht * ROWS)) + 1) + ' / ' + ROWS;
      else if (ph < 0.5) stand = 'Puntenwolk klaar';
      else if (sweep < 1) { var pc = Math.round(sweep * 100); stand = 'Mesh · ' + (pc < 10 ? '0' : '') + pc + ' %'; }
      else if (ph < 0.93) stand = 'Meting · plat dak';
      else stand = 'Nieuwe vlucht';
    }
  };
};

  /* volgorde = de rijen #d1-#d3 (canvas-d1 tot canvas-d3) op /diensten */
  var BUILDERS = [SDak, SWerf, SWoning];

  /* ------------------------------------------------ podium voor één scène */
  /* Eigen renderer, camera, licht en omgeving rond één dienstscène. Gedeeld
     door de rijen op /diensten en door de testpagina. */
  var DOLLY = 1.14;
  function podium(canvas, build, K) {
    var T = K.T, RM = window.PL3D.reduced;
    var s = build(K);
    if (!s || !s.group) throw new Error('scène zonder groep');

    var scene = new T.Scene();
    scene.fog = new T.Fog(0x0a0520, 12, 32);
    var camera = new T.PerspectiveCamera(34, 1, 0.1, 80);
    var rnd = window.PL3D.renderer(canvas);
    rnd.localClippingEnabled = true;               /* de scanlijn van 03 knipt wolk en mesh */
    window.PL3D.sizer(canvas, rnd, camera);
    var L = window.PL3D.lights(scene);
    L.p1.position.set(-5, 5.5, 4.5); L.p1.intensity = 8; L.p1.distance = 20;
    L.p2.position.set(5, 4.5, -4); L.p2.intensity = 6; L.p2.distance = 20;

    var world = new T.Group(); scene.add(world);
    world.add(K.grid(30, 30, 0.2));
    world.add(K.dust(160, 13, 0xb769d3));
    world.add(s.group);

    var rings = [];
    s.group.traverse(function (o) { if (o.userData && o.userData.ring) rings.push(o.userData.ring); });

    var c = s.cam || { pos: [6.8, 4.6, 7.6], target: [0, 1, 0] };
    var look = new T.Vector3(c.target[0], c.target[1], c.target[2]);
    var st = { yaw: 0, pitch: 0, tYaw: 0, tPitch: 0, base: 0, dragX: 0, dragY: 0 };
    window.PL3D.orbit(canvas, st, { x: 0.28, y: 0.62 });

    /* alle shaders vooraf compileren, ook van wat nu nog verborgen is (kegel,
       scanlijn, meting): anders hapert de animatie op het moment dat zo een
       onderdeel voor het eerst verschijnt */
    var verborgen = [];
    s.group.traverse(function (o) { if (!o.visible) { verborgen.push(o); o.visible = true; } });
    camera.position.set(c.pos[0], c.pos[1], c.pos[2]);
    camera.lookAt(look);
    try { rnd.compile(scene, camera); } catch (err) { }
    for (var v = 0; v < verborgen.length; v++) verborgen[v].visible = false;

    function frame(t) {
      var e = RM ? 1 : 0.06;
      st.yaw += (st.tYaw - st.yaw) * e;
      st.pitch += (st.tPitch - st.pitch) * e;
      /* rustig heen en weer rond het ontwerpstandpunt, niet eindeloos rond:
         zo draait geen scène na een minuut haar lege achterkant naar je toe */
      world.rotation.y = st.yaw + (RM ? 0.1 : 0.32 * Math.sin(t * 0.085));
      world.rotation.x = st.pitch * 0.4;
      /* de scènes zijn ontworpen voor een kader van ca. 1,3 : 1; in een
         smaller kader (gsm) trekt de camera evenredig terug */
      var d = DOLLY * Math.max(1, Math.pow(1.3 / Math.max(0.5, camera.aspect), 0.6));
      camera.position.set(c.pos[0] * d, c.pos[1] * d, c.pos[2] * d);
      camera.lookAt(look);
      world.updateMatrixWorld(true);
      if (s.tick) { try { s.tick(t, camera); } catch (err) { s.tick = null; } }
      for (var r = 0; r < rings.length; r++) rings[r].lookAt(camera.position);
      rnd.render(scene, camera);
    }
    return { frame: frame, hud: s.hud || {}, status: s.status || null, still: s.still || 0, cam: c,
             teken: function () { return rnd.info.render; } };
  }

  /* --------------------------------------------------- losse scène (debug) */
  /* Rendert één dienstscène alleen, met haar eigen camerastandpunt.
     Gebruikt door /prototype/diensten om elke scène apart te bekijken. */
  window.PL3D.previewService = function (canvas, index) {
    var K = window.PL3D.kit();
    if (!K.T || !canvas || !BUILDERS[index]) return null;
    var p = podium(canvas, BUILDERS[index], K);
    var stop = window.PL3D.loop(canvas, function (t) { p.frame(window.PL3D.reduced ? p.still : t); });
    return { stop: stop, frame: stop.frame, hud: p.hud, cam: p.cam, status: p.status };
  };
  window.PL3D.serviceCount = function () { return BUILDERS.length; };
  window.PL3D.serviceBuilders = BUILDERS;   /* voor tests */

  /* ------------------------------------------------------------ rijen */
  /* Eén scène per canvas (#canvas-d1 -> BUILDERS[0], enz.). Twee observers:
     - nabij (700 px marge): bouwt de scène vooraf, in een rustig moment;
     - zicht (geen marge): alleen zolang er een pixel van het canvas in beeld
       is, wordt de scène doorgerekend en getekend.
     Eén gedeelde requestAnimationFrame-lus, die helemaal stilvalt zodra er
     geen canvas meer in beeld is. Elke scène heeft haar eigen klok: ze loopt
     alleen terwijl je kijkt, en begint dus vooraan als ze voor het eerst
     verschijnt. Bij prefers-reduced-motion staat elke scène stil op haar
     'still'-moment en wordt alleen hertekend bij slepen of een nieuwe maat. */
  window.PL3D.serviceRows = function (canvases, opts) {
    var K = window.PL3D.kit(), T = K.T;
    if (!T || !canvases || !canvases.length) return null;
    opts = opts || {};
    var RM = window.PL3D.reduced;

    var rows = canvases.map(function (canvas, i) {
      var m = /(\d+)$/.exec(canvas.id || ''), n = m ? parseInt(m[1], 10) - 1 : i;
      return { i: i, canvas: canvas, build: BUILDERS[n], p: null, fout: !BUILDERS[n],
               zicht: false, t: 0, frames: 0, vuil: true, stand: '', tStand: -1e9, duur: new Float32Array(120) };
    });
    function mediaan(a, n) {
      if (!n) return 0;
      var l = Array.prototype.slice.call(a, 0, n).sort(function (x, y) { return x - y; });
      return Math.round(l[n >> 1] * 100) / 100;
    }
    function rijVan(el) {
      for (var i = 0; i < rows.length; i++) if (rows[i].canvas === el) return rows[i];
      return null;
    }

    function bouw(r) {
      if (r.p || r.fout) return r.p;
      try { r.p = K.T ? podium(r.canvas, r.build, K) : null; }
      catch (err) { r.p = null; }
      if (!r.p) { r.fout = true; if (opts.onError) opts.onError(r.i); }
      return r.p;
    }
    var rustig = window.requestIdleCallback
      ? function (f) { window.requestIdleCallback(f, { timeout: 600 }); }
      : function (f) { setTimeout(f, 80); };

    function meld(r, nu) {
      if (!r.p.status || !opts.onStatus || nu - r.tStand < 200) return;
      r.tStand = nu;
      var s = r.p.status();
      if (s && s !== r.stand) { r.stand = s; opts.onStatus(r.i, s); }
    }

    var raf = 0, vorige = 0;
    function lus(nu) {
      raf = 0;
      var dt = vorige ? Math.min(0.05, (nu - vorige) / 1000) : 0;
      vorige = nu;
      var bezig = false;
      for (var k = 0; k < rows.length; k++) {
        var r = rows[k];
        if (!r.zicht || !r.p) continue;
        if (RM) {
          if (!r.vuil) continue;
          r.vuil = false;
          r.p.frame(r.p.still);
        } else {
          r.t += dt;
          var t0 = performance.now();
          r.p.frame(r.t);
          r.duur[r.frames % r.duur.length] = performance.now() - t0;   /* laatste 120 frametijden */
          bezig = true;
        }
        r.frames++;
        meld(r, nu);
      }
      if (bezig) raf = requestAnimationFrame(lus);
      else vorige = 0;
    }
    function start() { if (!raf) raf = requestAnimationFrame(lus); }

    var zichtIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var r = rijVan(e.target);
        if (!r) return;
        r.zicht = e.isIntersecting;
        if (r.zicht && bouw(r)) { r.vuil = true; start(); }
        if (opts.onVisible) opts.onVisible(r.i, r.zicht && !!r.p);
      });
    }, { threshold: 0 });
    var nabijIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var r = rijVan(e.target);
        nabijIO.unobserve(e.target);
        if (r && !r.p && !r.fout) rustig(function () { bouw(r); });
      });
    }, { rootMargin: '700px 0px' });

    rows.forEach(function (r) {
      zichtIO.observe(r.canvas);
      nabijIO.observe(r.canvas);
      /* een nieuwe maat wist het canvas; slepen draait de scène (ook bij reduced motion) */
      var opnieuw = function () { r.vuil = true; if (r.zicht && r.p) start(); };
      if ('ResizeObserver' in window) new ResizeObserver(opnieuw).observe(r.canvas.parentNode);
      if (RM) {
        r.canvas.addEventListener('pointermove', opnieuw);
        r.canvas.addEventListener('pointerleave', opnieuw);
      }
    });

    return {
      count: rows.length,
      /* toestand per rij, voor tests: gebouwd, in beeld, getekende frames, klok */
      info: function () {
        return rows.map(function (r) {
          return { id: r.canvas.id, gebouwd: !!r.p, zicht: r.zicht, frames: r.frames, t: Math.round(r.t * 100) / 100, ms: mediaan(r.duur, Math.min(r.frames, r.duur.length)),
                   calls: r.p ? r.p.teken().calls : 0, tris: r.p ? r.p.teken().triangles : 0, status: r.stand };
        });
      },
      /* klok van rij i verzetten (tests en screenshots) */
      seek: function (i, t) {
        var r = rows[i];
        if (!r) return;
        r.t = t; r.vuil = true;
        if (r.zicht && r.p) start();
      },
      stop: function () {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        zichtIO.disconnect();
        nabijIO.disconnect();
      }
    };
  };
})();

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
