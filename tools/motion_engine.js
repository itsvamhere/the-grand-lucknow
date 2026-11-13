// The Grand motion engine: replays Framer motion on static SSR markup (no Framer runtime, so no copy/asset re-hydration).
//  0. breakpoint class on the root (Framer's runtime normally swaps it; route CSS is scoped to it)
//  1. "appear" entrance animations from the page's own <script type="framer/appear"> data (delay/duration/ease preserved)
//  2. word-by-word rise reveal on headings/paragraphs (translateY(*px) rotate(8deg) -> rest), staggered, once per block
//  3. scroll-driven image scale (0.5/0.9 -> 1), curtain parallax (-15%/+15% or -8%/+8%), Image Info / Details / Reviews reveal, and ColorChangeTrigger light-theme switch
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

  // ---- 0. breakpoint class on the root ----
  function breakpoint() {
    var root = document.querySelector('[data-framer-root]');
    if (!root) return;
    var sets = ['__framer__breakpoints', 'grand-shell-breakpoints'].map(function (id) {
      var el = document.getElementById(id); try { return JSON.parse(el.textContent); } catch (e) { return []; }
    });
    sets.forEach(function (bps) {
      bps.forEach(function (b) { root.classList.remove('framer-' + b.hash); });
      var on = bps.find(function (b) { return window.matchMedia(b.mediaQuery).matches; });
      if (on) root.classList.add('framer-' + on.hash);
    });
  }
  breakpoint();
  window.addEventListener('resize', breakpoint, { passive: true });

  // ---- 1. appear animations ----
  function appear() {
    var dataEl = document.getElementById('__framer__appearAnimationsContent');
    var bpEl = document.getElementById('__framer__breakpoints');
    if (!dataEl) return;
    var data, bps = [];
    try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }
    try { bps = JSON.parse(bpEl.textContent); } catch (e) { bps = []; }
    var active = (bps.find(function (b) { return window.matchMedia(b.mediaQuery).matches; }) || {}).hash;
    document.querySelectorAll('[data-framer-appear-id]').forEach(function (el) {
      var set = data[el.getAttribute('data-framer-appear-id')];
      if (!set) return;
      var v = set[active] || set['default'] || set[Object.keys(set)[0]];
      if (!v || !v.animate) return;
      var a = v.animate, t = a.transition || {}, i = v.initial || {};
      function tf(o) { return 'translate(' + (o.x || 0) + 'px,' + (o.y || 0) + 'px) scale(' + (o.scale == null ? 1 : o.scale) + ') rotate(' + (o.rotate || 0) + 'deg)'; }
      if (reduce) { el.style.opacity = a.opacity; el.style.transform = 'none'; return; }
      var ease = Array.isArray(t.ease) ? 'cubic-bezier(' + t.ease.join(',') + ')' : 'ease-out';
      var anim = el.animate([{ opacity: i.opacity, transform: tf(i) }, { opacity: a.opacity, transform: tf(a) }],
        { duration: (t.duration || 0.6) * 1000, delay: (t.delay || 0) * 1000, easing: ease, fill: 'both' });
      anim.onfinish = function () { el.style.opacity = a.opacity; el.style.transform = 'none'; anim.cancel(); };
    });
  }

  // ---- 2. word rise ----
  function words() {
    var inners = document.querySelectorAll('span[style*="rotate(8deg)"]');
    var groups = new Map();
    inners.forEach(function (w) {
      var block = w.closest('p,h1,h2,h3,h4') || w.parentElement.parentElement;
      if (!groups.has(block)) groups.set(block, []);
      groups.get(block).push(w);
    });
    function play(ws) {
      ws.forEach(function (w, i) {
        w.style.transition = reduce ? 'none' : 'transform 0.9s ' + EASE + ' ' + Math.min(i * 18, 450) + 'ms';
        w.style.transform = 'translateY(0px) rotate(0deg)';
      });
    }
    function checkAll() {
      var vh = window.innerHeight || 800;
      groups.forEach(function (ws, block) {
        if (block.getAttribute('data-words-played')) return;
        var r = block.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        if (r.top < vh * 1.05) {
          block.setAttribute('data-words-played', '1');
          play(ws);
        }
      });
    }
    window.addEventListener('scroll', checkAll, { passive: true });
    window.addEventListener('resize', checkAll, { passive: true });
    checkAll();
  }

  // ---- 3. scroll effects: scale-up images, curtain parallax, Image Info, Reviews, and ColorChangeTrigger ----
  function scrollEffects() {
    var scaleEls = [];
    document.querySelectorAll('main [style*="scale(0.5)"], main [style*="scale(0.9)"]').forEach(function (el) {
      var m = (el.getAttribute('style') || '').match(/scale\((0\.\d+)\)/);
      if (m) scaleEls.push({ el: el, from: parseFloat(m[1]) });
    });

    var parallaxEls = [];
    document.querySelectorAll('main [style*="translateY(-15%)"], main [style*="translateY(-8%)"], main [style*="translateY(8%)"]').forEach(function (el) {
      var m = (el.getAttribute('style') || '').match(/translateY\((-?\d+)%\)/);
      if (m) parallaxEls.push({ el: el, amp: Math.abs(parseFloat(m[1])) });
    });

    // Reveal hidden overlays (Image Info captions, card Details badges, Reviews header & carousel)
    document.querySelectorAll('[data-framer-name="Image Info"], [data-framer-name="Details"], [data-framer-name="Indicator Wrapper"], [data-framer-name="Reviews"] section, .framer-rntb33, .framer-rntb33 > ul').forEach(function (el) {
      el.style.opacity = '1';
      if (el.classList.contains('framer-rntb33')) el.style.transform = 'none';
    });

    var colorTrigger = document.querySelector('[data-framer-name="ColorChangeTrigger"], #colortrigger');
    var colorChangeEl = document.querySelector('[data-framer-name="Color Change"] .framer-uo2c0');
    var rootDiv = document.querySelector('[data-framer-root]');

    function onScroll() {
      var vh = window.innerHeight || 800;

      // Scale images smoothly as they enter viewport
      scaleEls.forEach(function (item) {
        if (reduce) { item.el.style.transform = 'scale(1)'; return; }
        var r = item.el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        // Progress 0 when top is at 95% vh, 1 when top reaches 30% vh
        var p = (vh * 0.95 - r.top) / (vh * 0.65);
        p = Math.max(0, Math.min(1, p));
        var easeP = 1 - Math.pow(1 - p, 3);
        var s = item.from + (1 - item.from) * easeP;
        item.el.style.transform = 'scale(' + s.toFixed(4) + ')';
      });

      // Curtain parallax inside image wrappers
      parallaxEls.forEach(function (item) {
        if (reduce) { item.el.style.transform = 'translateY(0%)'; return; }
        var parent = item.el.parentElement || item.el;
        var r = parent.getBoundingClientRect();
        if (r.height === 0) return;
        var p = (vh - r.top) / (vh + r.height);
        p = Math.max(0, Math.min(1, p));
        var ty = -item.amp + p * (item.amp * 2);
        item.el.style.transform = 'translateY(' + ty.toFixed(2) + '%)';
      });

      // Background color transition at ColorChangeTrigger (About & Venues pages)
      if (colorTrigger) {
        var tr = colorTrigger.getBoundingClientRect();
        // Transition over 350px around the trigger crossing 65% of viewport height
        var p = (vh * 0.65 - tr.top) / 350;
        p = Math.max(0, Math.min(1, p));
        var easeP = p * p * (3 - 2 * p);
        var rC = Math.round(18 + (246 - 18) * easeP);
        var gC = Math.round(17 + (238 - 17) * easeP);
        var bC = Math.round(16 + (220 - 16) * easeP);
        var bg = 'rgb(' + rC + ', ' + gC + ', ' + bC + ')';
        document.body.style.backgroundColor = bg;
        if (rootDiv) rootDiv.style.backgroundColor = bg;
        if (colorChangeEl) colorChangeEl.style.backgroundColor = bg;
        if (easeP >= 0.5) {
          document.body.classList.add('is-light-theme');
        } else {
          document.body.classList.remove('is-light-theme');
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    // Drag / horizontal scroll support on Reviews carousel (.framer-rntb33)
    var revTrack = document.querySelector('.framer-rntb33');
    if (revTrack) {
      revTrack.style.overflowX = 'auto';
      revTrack.style.scrollbarWidth = 'none';
      revTrack.style.cursor = 'grab';
      var isDown = false, startX = 0, scrollLeft = 0;
      revTrack.addEventListener('mousedown', function (e) {
        isDown = true; revTrack.style.cursor = 'grabbing';
        startX = e.pageX - revTrack.offsetLeft; scrollLeft = revTrack.scrollLeft;
      });
      window.addEventListener('mouseup', function () {
        if (isDown) { isDown = false; revTrack.style.cursor = 'grab'; }
      });
      revTrack.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - revTrack.offsetLeft;
        revTrack.scrollLeft = scrollLeft - (x - startX) * 1.2;
      });
    }
  }

  function init() { appear(); words(); scrollEffects(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
