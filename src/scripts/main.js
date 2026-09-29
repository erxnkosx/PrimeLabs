/* ==========================================================================
   PRIMELABS — interactie & motion
   ========================================================================== */
(function () {
  'use strict';
  window.PLmain = true;   /* de noodgreep in de <head> grijpt alleen in als dit script niet draait */
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- preloader ---------------- */
  /* Het doek valt weg zodra de lettertypes en (op de home) de heroafbeelding
     klaar zijn, niet pas bij 'load'. Pas dan start de intro: body.ready laat
     de CSS-animaties van de fotoscène lopen, en de tekst van de hero krijgt
     .in wanneer de wipe de bovenkant al heeft vrijgemaakt. */
  var pre = $('.pre'), gevallen = false, wachtrij = [];
  function heroIn() { $$('.hero .rv, .hero .reveal-text').forEach(function (el) { el.classList.add('in'); }); }
  /* de rest van de pagina gaat pas onder de reveal-observer als het doek valt,
     zodat er niets onder het doek onthuld wordt (ook niet op de casepagina) */
  function kijk() { wachtrij.forEach(function (el) { io.observe(el); }); wachtrij = []; }
  function drop() {
    if (gevallen) return;
    /* In een tab op de achtergrond tekent Chrome geen frames, maar de
       animaties tellen wel door: bij het eerste zichtbare frame zou de intro
       al voorbij zijn. Het doek blijft dus staan tot de bezoeker kijkt. */
    if (document.hidden) { document.addEventListener('visibilitychange', drop, { once: true }); return; }
    gevallen = true;
    if (pre) {
      pre.classList.add('off');
      setTimeout(function () { pre.remove(); }, 1100);
    }
    document.body.classList.add('ready');
    setTimeout(function () { heroIn(); kijk(); }, RM || !pre ? 0 : 180);
  }
  /* decode() of 'load' van de foto, wat het eerst komt: in een tab op de
     achtergrond stelt Chrome decode() uit tot de pagina zichtbaar is */
  var heroImg = $('.hs-img'), heroScene = $('.hs-scene');
  var geladen = heroImg
    ? new Promise(function (klaar) {
        if (heroImg.complete) klaar();
        heroImg.addEventListener('load', klaar);
        heroImg.addEventListener('error', klaar);
        if (heroImg.decode) heroImg.decode().then(klaar, klaar);
      })
    /* [Next.js] dit script start na de hydratatie; is 'load' dan al voorbij, wacht niet */
    : document.readyState === 'complete' ? Promise.resolve()
    : new Promise(function (klaar) { window.addEventListener('load', klaar); });
  /* de fotoscène verschijnt en start pas als haar foto er staat, los van het
     doek: op een trage verbinding speelt de intro nooit over een halve foto */
  geladen.then(function () { if (heroScene) heroScene.classList.add('is-klaar'); });
  if (pre && !RM) {
    /* grenzen vanaf de navigatie, niet vanaf het moment dat dit script draait;
       op de lettertypes wacht het doek tot 3,5 s, anders verspringt de tekst */
    var tot = function (ms) { return new Promise(function (klaar) { setTimeout(klaar, Math.max(0, ms - performance.now())); }); };
    var lettertypes = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([
      Promise.all([geladen, lettertypes]),
      Promise.all([tot(2500), Promise.race([lettertypes, tot(3500)])])
    ]).then(function () { setTimeout(drop, 120); });
    setTimeout(drop, Math.max(0, 4000 - performance.now())); // failsafe
  } else drop();

  /* ---------------- heading line split ---------------- */
  $$('[data-split]').forEach(function (el) {
    var html = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = html.map(function (part, i) {
      return '<span class="line"><i style="transition-delay:' + (i * 90 + 120) + 'ms">' + part.trim() + '</i></span>';
    }).join('');
    el.classList.add('reveal-text');
  });

  /* ---------------- reveal on scroll ---------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.rv, .reveal-text').forEach(function (el, i) {
    if (el.dataset.d) el.style.transitionDelay = el.dataset.d + 'ms';
    /* de hero onthult zichzelf via drop(); de rest wacht in de rij tot het doek valt */
    if (!el.closest('.hero')) wachtrij.push(el);
  });

  /* ---------------- fotoscène: stil buiten beeld ---------------- */
  var scene = $('.hero--scene');
  if (scene) new IntersectionObserver(function (e) {
    scene.classList.toggle('is-uit', !e[0].isIntersecting);
  }).observe(scene);

  /* ---------------- nav + scroll progress ---------------- */
  var nav = $('.nav'), bar = $('.progress');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('is-stuck', y > 18);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--sp', h > 0 ? Math.min(1, y / h) : 0);
    }
    stepsProgress(y);
    stackProgress();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = $('.burger');
  if (burger) burger.addEventListener('click', function () {
    document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', document.body.classList.contains('menu-open'));
  });
  $$('.mob a').forEach(function (a) { a.addEventListener('click', function () { document.body.classList.remove('menu-open'); }); });

  /* ---------------- magnetic buttons ---------------- */
  if (FINE && !RM) $$('.btn, .nav__cta').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.setProperty('--mgx', ((e.clientX - r.left) / r.width - 0.5) * 9 + 'px');
      b.style.setProperty('--mgy', ((e.clientY - r.top) / r.height - 0.5) * 7 + 'px');
    });
    b.addEventListener('pointerleave', function () {
      b.style.setProperty('--mgx', '0px'); b.style.setProperty('--mgy', '0px');
    });
  });

  /* ---------------- 3D tilt cards ---------------- */
  if (FINE && !RM) $$('[data-tilt]').forEach(function (c) {
    var raf = 0, tx = 0, ty = 0;
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', px * 100 + '%');
      c.style.setProperty('--my', py * 100 + '%');
      tx = (0.5 - py) * 9; ty = (px - 0.5) * 11;
      c.classList.add('tilt');
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        c.style.setProperty('--rx', tx.toFixed(2) + 'deg');
        c.style.setProperty('--ry', ty.toFixed(2) + 'deg');
      });
    });
    c.addEventListener('pointerleave', function () {
      c.classList.remove('tilt');
      c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg');
    });
  });

  /* ---------------- spotlight vars (dark sections, cta) ---------------- */
  if (!RM) $$('.on-dark, .cta').forEach(function (s) {
    s.addEventListener('pointermove', function (e) {
      var r = s.getBoundingClientRect();
      s.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      s.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
  });

  /* ---------------- viewport parallax tilt ---------------- */
  /* de rustkanteling komt uit de CSS (--vry-base): een viewport rechts van de
     tekst kantelt naar links, zodat hij altijd naar zijn tekst toe draait */
  if (FINE && !RM) $$('.view').forEach(function (v) {
    var rust = -4;
    v.addEventListener('pointerenter', function () {
      var b = parseFloat(getComputedStyle(v).getPropertyValue('--vry-base'));
      rust = isNaN(b) ? -4 : b;
    });
    v.addEventListener('pointermove', function (e) {
      var r = v.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      v.style.setProperty('--vry', (rust + px * 7).toFixed(2) + 'deg');
      v.style.setProperty('--vrx', (1.6 - py * 5).toFixed(2) + 'deg');
    });
    v.addEventListener('pointerleave', function () {
      v.style.removeProperty('--vry'); v.style.removeProperty('--vrx');
    });
  });

  /* ---------------- counters ---------------- */
  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, to = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
      var t0 = performance.now(), dur = 1100;
      (function run(t) {
        var p = Math.min(1, (t - t0) / dur), e2 = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * e2).toFixed(dec);
        if (p < 1) requestAnimationFrame(run);
      })(t0);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ---------------- steps progress (dark section) ---------------- */
  var steps = $('.steps');
  function stepsProgress() {
    if (!steps) return;
    var items = $$('li', steps), r = steps.getBoundingClientRect();
    var mid = window.innerHeight * 0.62;
    var p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
    steps.style.setProperty('--fill', (p * 100).toFixed(1) + '%');
    items.forEach(function (li) {
      var lr = li.getBoundingClientRect();
      li.classList.toggle('on', lr.top < mid && lr.bottom > window.innerHeight * 0.18);
    });
  }

  /* ---------------- dossier stack progress ---------------- */
  var stack = $('.stack');
  function stackProgress() {
    if (!stack) return;
    var r = stack.getBoundingClientRect();
    var p = Math.max(0, Math.min(1, 1 - (r.top - window.innerHeight * 0.18) / (window.innerHeight * 0.66)));
    stack.style.setProperty('--p', p.toFixed(3));
  }

  /* ---------------- marquee: duplicate track ---------------- */
  $$('.band__t').forEach(function (t) { t.innerHTML += t.innerHTML; });

  /* ---------------- scenes ---------------- */
  var booted = false;
  function boot() {
    if (booted) return;
    try { mount(); booted = true; }
    catch (err) {
      if (!boot.retried) { boot.retried = true; setTimeout(boot, 1200); }
      else document.body.classList.add('no3d');
    }
  }
  function mount() {
    var heroCanvas = $('#heroCanvas');
    if (heroCanvas && window.PL3D) {
      var mks = $$('.mk', heroCanvas.parentNode);
      var label = $('#hudTarget');
      window.PLhero = window.PL3D.hero(heroCanvas, {
        markers: mks,
        onHover: function (i, pt) {
          if (!label) return;
          label.textContent = i < 0 ? 'Inspectie / dakzone B' : 'Punt 0' + (i + 1) + ' / ' + pt.t;
        }
      });
    }
    /* diensten: drie rijen, elk met een eigen canvas en een eigen scène.
       De manager bouwt en tekent alleen wat in beeld is (scene-services.js). */
    var svcCanvases = $$('.svc-row canvas[id^="canvas-d"]');
    if (svcCanvases.length && window.PL3D && window.PL3D.serviceRows) {
      var rij = function (c) { return c.closest('.svc-row'); };
      window.PLsvc = window.PL3D.serviceRows(svcCanvases, {
        onVisible: function (i, aan) { var r = rij(svcCanvases[i]); if (r) r.classList.toggle('is-live', aan); },
        onStatus: function (i, tekst) { var b = $('[data-status]', rij(svcCanvases[i])); if (b) b.textContent = tekst; },
        onError: function (i) { var v = svcCanvases[i].closest('.view'); if (v) v.classList.add('is-no3d'); }
      });
    }

    /* werkwijze: fasen van de scène volgen de stappen */
    var procCanvas = $('#procCanvas');
    if (procCanvas && window.PL3D) {
      var papi = window.PL3D.process(procCanvas);
      var steps = $$('.svc');
      var pm = { n: $('#procNum'), t: $('#procTitle'), d: $('#procDesc'), ph: $('#procPhase'), c: $('#procCount') };
      driveList(steps, function (i) {
        steps.forEach(function (c, k) { c.classList.toggle('active', k === i); });
        if (papi) papi.setStage(i);
        var c = steps[i]; if (!c || !pm.t) return;
        pm.n.textContent = 'Stap ' + c.dataset.num;
        pm.t.innerHTML = c.dataset.title;
        pm.d.textContent = c.dataset.desc;
        if (pm.ph) pm.ph.textContent = 'Fase ' + c.dataset.num + ' / ' + c.dataset.title.replace(/&amp;/g, '&').toLowerCase();
        if (pm.c) pm.c.textContent = c.dataset.num + ' / 0' + steps.length;
      });
    }

    /* offerte: locatiescène */
    var beaconCanvas = $('#beaconCanvas');
    if (beaconCanvas && window.PL3D) window.PL3D.beacon(beaconCanvas);

    /* portfolio: schematische voorbeeldopname */
    var folioCanvas = $('#folioCanvas');
    if (folioCanvas && window.PL3D) window.PL3D.hero(folioCanvas, { markers: [] });
  }

  /* hover, focus en scrollpositie sturen dezelfde actieve index */
  /* Hover en focus kiezen direct. Bij scrollen wint de kaart die het dichtst
     bij de focuslijn (40 % van de vensterhoogte) staat, niet de kaart die als
     laatste de band binnenkwam: met korte kaarten staan er vaak twee tegelijk
     in beeld. Zolang de muis op een kaart staat, gaat die voor. */
  function driveList(cards, onActive) {
    if (!cards.length) return;
    var onder = -1;
    cards.forEach(function (c, i) {
      c.addEventListener('pointerenter', function () { onder = i; onActive(i); });
      c.addEventListener('pointerleave', function () { if (onder === i) onder = -1; });
      c.addEventListener('focusin', function () { onActive(i); });
    });
    function dichtste() {
      if (onder > -1) return;
      var lijn = window.innerHeight * 0.4, best = -1, afstand = Infinity;
      cards.forEach(function (c, i) {
        var r = c.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var d = Math.abs(r.top + r.height / 2 - lijn);
        if (d < afstand) { afstand = d; best = i; }
      });
      if (best > -1) onActive(best);
    }
    var sio = new IntersectionObserver(dichtste, { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-18% 0px -28% 0px' });
    cards.forEach(function (c) { sio.observe(c); });
    onActive(0);
  }

  /* ---------------- FAQ ---------------- */
  $$('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.parentNode.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------------- offerteformulier ---------------- */
  (function () {
    var form = $('#quote'), card = $('#quoteForm');
    if (!form || !card) return;
    var bar = $('#formBar'), cnt = $('#formCnt'), box = $('#doneBox');
    var need = ['naam', 'email', 'type', 'adres', 'vraag', 'consent'];
    var labels = {
      naam: 'Naam', bedrijf: 'Bedrijf', email: 'E-mail', telefoon: 'Telefoon',
      type: 'Type inspectie', adres: 'Adres'
    };

    function wrapOf(el) { return el.closest('.field') || el.closest('.check'); }
    function filled(el) {
      return el.type === 'checkbox' ? el.checked : (el.value || '').trim() !== '' && el.checkValidity();
    }
    function update() {
      var n = 0;
      need.forEach(function (name) {
        var el = form.elements[name];
        if (!el) return;
        var ok = filled(el);
        if (ok) n++;
        var w = wrapOf(el);
        if (w) { w.classList.toggle('ok', ok && el.type !== 'checkbox'); if (ok) w.classList.remove('err'); }
      });
      if (bar) bar.style.setProperty('--p', (n / need.length).toFixed(3));
      if (cnt) cnt.textContent = n + ' van ' + need.length + ' velden';
    }
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    update();

    function validate() {
      var first = null;
      need.forEach(function (name) {
        var el = form.elements[name]; if (!el) return;
        var bad = el.type === 'checkbox' ? !el.checked : !filled(el);
        var w = wrapOf(el);
        if (w) w.classList.toggle('err', bad);
        if (bad && !first) first = el;
      });
      if (first) { first.focus({ preventScroll: false }); return false; }
      return true;
    }

    function compose() {
      var g = function (n) { var e = form.elements[n]; return e ? (e.value || '').trim() : ''; };
      var lines = Object.keys(labels).map(function (k) {
        return labels[k] + ': ' + (g(k) || '—');
      });
      lines.push('', 'Inspectievraag:', g('vraag'), '', '— Verstuurd via het aanvraagformulier op primelabs.be');
      return {
        subject: 'Offerteaanvraag drone-inspectie — ' + (g('type') || 'nog te bepalen') + (g('adres') ? ' — ' + g('adres') : ''),
        body: lines.join('\n')
      };
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      var m = compose();
      if (box) box.textContent = 'Aan: info@primelabs.be\nOnderwerp: ' + m.subject + '\n\n' + m.body;
      card.classList.add('done');
      var top = card.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: top, behavior: 'smooth' });
      /* TODO bij livegang: POST naar een eigen endpoint of formulierdienst.
         Zonder backend openen we het mailprogramma van de bezoeker. */
      setTimeout(function () {
        window.location.href = 'mailto:info@primelabs.be?subject=' +
          encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.body);
      }, 350);
    });

    var copy = $('#copyBtn');
    if (copy) copy.addEventListener('click', function () {
      var txt = box ? box.textContent : '';
      var done = function () {
        var old = copy.firstChild.nodeValue;
        copy.firstChild.nodeValue = 'Gekopieerd ';
        setTimeout(function () { copy.firstChild.nodeValue = old; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, function () { });
      } else if (box) {
        var r = document.createRange(); r.selectNodeContents(box);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        try { document.execCommand('copy'); done(); } catch (err) { }
      }
    });
  })();
  /* pagina's zonder canvas (de home draait op een foto) hoeven niet te wachten */
  if (document.querySelector('canvas')) {
    window.addEventListener('pl3d:ready', boot);
    (function waitForThree(n) {
      if (window.THREE) return boot();
      if (n > 40) return document.body.classList.add('no3d');
      setTimeout(function () { waitForThree(n + 1); }, 200);
    })(0);
  }

  onScroll();
  window.addEventListener('resize', onScroll);
})();

/* [Next.js] maakt dit bestand een ES-module, zodat PageScripts het dynamisch kan importeren */
export {};
