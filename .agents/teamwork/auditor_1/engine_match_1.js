
(function() {
  'use strict';
  var ticking = false;
  var stickyHeader = document.querySelector('[data-framer-name="Sticky Header Text"]');
  var scrollPill = document.querySelector('[data-framer-name="Sticky Header Text"] [data-framer-name="Menu Title"]');
  var h1Elements = document.querySelectorAll('[data-framer-name="Sticky Header Text"] h1');
  var colorChangeEl = document.querySelector('[data-framer-name="Color Change"] .framer-uo2c0');
  var rootDiv = document.querySelector('.framer-eIM4l');
  var stickyBtn = document.querySelector('[data-framer-name="Sticky Button"] a');

  // Cancel any Framer appear web animation on nav containers (pill and button)
  document.querySelectorAll('.framer-18mvsw1-container, .framer-gaygr9').forEach(function(el) {
    if (el && el.getAnimations) {
      el.getAnimations().forEach(function(anim) { anim.cancel(); });
    }
  });

  function getMetrics() {
    var p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    var rect = p6 ? p6.getBoundingClientRect() : null;
    var p6DocBottom = rect ? Math.round(rect.bottom + (window.scrollY || window.pageYOffset)) : 6883;
    var vh = window.innerHeight || 768;

    // Dynamically anchored to Photo 6's physical on-screen position:
    // Starts rollout when Photo 6 bottom enters 90% of viewport height:
    var rolloutStart = Math.round(p6DocBottom - vh * 0.9);
    // Ends rollout cleanly as Photo 6 reaches the exit threshold:
    var rolloutEnd = Math.round(p6DocBottom + 10);
    var rolloutSpan = rolloutEnd - rolloutStart;

    var headerSec = document.querySelector('section#apartment-header, .framer-151qtkn');
    var secH = headerSec ? headerSec.offsetHeight : 8000;
    var scrollMax = Math.max(1000, secH - vh);

    return {
      scrollMax: scrollMax,
      rolloutStart: rolloutStart,
      rolloutEnd: rolloutEnd,
      rolloutSpan: rolloutSpan
    };
  }

  function updateSubpageOnScroll() {
    var y = window.scrollY || window.pageYOffset;
    var m = getMetrics();

    // 1. Staggered letter-by-letter roll up & fade across all 13 letters ("Open Earth Lawn")
    var letDur = 240;
    var totalLetters = 13;
    var letInterval = (m.rolloutSpan - letDur) / Math.max(1, totalLetters - 1);

    for (var h = 0; h < h1Elements.length; h++) {
      var letters = h1Elements[h].querySelectorAll('.grand-hero-letter');
      if (!letters || letters.length === 0) continue;

      for (var i = 0; i < letters.length; i++) {
        var el = letters[i];
        var start = m.rolloutStart + i * letInterval;
        var end = start + letDur;

        if (y <= start) {
          el.style.transform = 'none';
          el.style.opacity = '1';
        } else if (y >= end) {
          el.style.transform = 'translate3d(0, -115%, 0) rotate(-8deg)';
          el.style.opacity = '0';
        } else {
          var p = (y - start) / letDur;
          var ease = p * p * (3 - 2 * p); // smoothstep
          var transY = -115 * ease;
          var rot = -8 * ease;
          var op = Math.max(0, 1 - ease);
          el.style.transform = 'translate3d(0, ' + transY.toFixed(2) + '%, 0) rotate(' + rot.toFixed(2) + 'deg)';
          el.style.opacity = op.toFixed(3);
        }
      }
    }

    // 2. Scroll pill [ ↓ Scroll to Explore ] fades out as letter rollout begins
    if (scrollPill) {
      var pillStart = m.rolloutStart - 100;
      var pillEnd = m.rolloutStart + 150;
      if (y < pillStart) {
        scrollPill.style.opacity = '1';
        scrollPill.style.visibility = 'visible';
      } else if (y >= pillEnd) {
        scrollPill.style.opacity = '0';
        scrollPill.style.visibility = 'hidden';
      } else {
        var pillProg = (y - pillStart) / (pillEnd - pillStart);
        scrollPill.style.opacity = (1 - pillProg).toFixed(3);
        scrollPill.style.visibility = 'visible';
      }
    }

    // 3. Keep sticky header visible while in hero section, unpin cleanly
    if (stickyHeader) {
      stickyHeader.style.transform = 'none';
      if (y >= m.scrollMax + 50) {
        stickyHeader.style.visibility = 'hidden';
      } else {
        stickyHeader.style.visibility = 'visible';
      }
    }

    // 4. Background color transition across background layers (reaching pure cream by rolloutEnd)
    var colorStart = Math.round(m.rolloutStart + m.rolloutSpan * 0.45);
    var colorEnd = m.rolloutEnd;
    var bg;
    if (y < colorStart) {
      bg = 'rgb(14, 18, 1)';
    } else if (y >= colorEnd) {
      bg = 'rgb(255, 240, 202)';
    } else {
      var progress = (y - colorStart) / (colorEnd - colorStart);
      var easeP = progress * progress * (3 - 2 * progress); // smoothstep
      var r = Math.round(14 + (255 - 14) * easeP);
      var g = Math.round(18 + (240 - 18) * easeP);
      var b = Math.round(1 + (202 - 1) * easeP);
      bg = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    document.body.style.backgroundColor = bg;
    if (rootDiv) rootDiv.style.backgroundColor = bg;
    if (colorChangeEl) colorChangeEl.style.backgroundColor = bg;

    // 5. Invert UI elements at transition threshold (when background turns cream)
    if (y >= m.rolloutEnd - 100) {
      if (!document.body.classList.contains('is-light-theme')) {
        document.body.classList.add('is-light-theme');
        if (stickyBtn) stickyBtn.setAttribute('data-framer-name', 'Large Dark');
      }
    } else {
      if (document.body.classList.contains('is-light-theme')) {
        document.body.classList.remove('is-light-theme');
        if (stickyBtn) stickyBtn.setAttribute('data-framer-name', 'Large');
      }
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateSubpageOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateSubpageOnScroll, { passive: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateSubpageOnScroll);
  } else {
    updateSubpageOnScroll();
  }
  // Also run after fonts and images load
  window.addEventListener('load', updateSubpageOnScroll);
})();
