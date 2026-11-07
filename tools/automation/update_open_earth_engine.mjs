import fs from 'fs';

let html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// 1. Update CSS for transform-origin
html = html.replace(
  'transform-origin: 50% 100% !important;',
  'transform-origin: 0% 100% !important;'
);

// 2. Replace grand-subpage-engine-js
const startMarker = '<script id="grand-subpage-engine-js">';
const endMarker = '</script>\n\n<script>\n// --- REVERT MAP OVERLAY INJECTION ---';

const startIdx = html.indexOf(startMarker);
if (startIdx === -1) {
  throw new Error('Could not find grand-subpage-engine-js start marker');
}

// Find the closing script tag for grand-subpage-engine-js
const closeTag = '</script>';
const endIdx = html.indexOf(closeTag, startIdx);
if (endIdx === -1) {
  throw new Error('Could not find grand-subpage-engine-js close tag');
}

const newEngineScript = `<script id="grand-subpage-engine-js">
(function() {
  'use strict';
  var ticking = false;
  var stickyHeader = document.querySelector('[data-framer-name="Sticky Header Text"]');
  var scrollPill = document.querySelector('[data-framer-name="Sticky Header Text"] [data-framer-name="Menu Title"]');
  var h1Elements = document.querySelectorAll('[data-framer-name="Sticky Header Text"] h1');
  var colorChangeEl = document.querySelector('[data-framer-name="Color Change"] .framer-uo2c0');
  var rootDiv = document.querySelector('.framer-eIM4l');
  var stickyBtn = document.querySelector('[data-framer-name="Sticky Button"] a');

  // Cancel any Framer appear web animation on nav containers
  document.querySelectorAll('.framer-18mvsw1-container, .framer-gaygr9').forEach(function(el) {
    if (el && el.getAnimations) {
      el.getAnimations().forEach(function(anim) { anim.cancel(); });
    }
  });

  function getMetrics() {
    var p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    var rect = p6 ? p6.getBoundingClientRect() : null;
    var scrollY = window.scrollY || window.pageYOffset;
    var p6DocTop = rect ? Math.round(rect.top + scrollY) : 4980;
    var p6DocBottom = rect ? Math.round(rect.bottom + scrollY) : 5579;
    var p6Height = Math.max(300, p6DocBottom - p6DocTop);
    var vh = window.innerHeight || 768;

    var headerSec = document.querySelector('section#apartment-header, .framer-151qtkn');
    var secH = headerSec ? headerSec.offsetHeight : 6369;
    var scrollMax = Math.max(1000, secH - vh);

    // EXACT CASAMOMO TIMING:
    // Rollout starts when Photo 6 has scrolled into the upper portion of the viewport
    // On Casamomo at 1024x576: p6DocTop=4980, rollout starts at y ≈ 5130 (p6DocTop + p6Height * 0.25)
    // On Casamomo at 1440x900: p6DocTop=6396, rollout starts at y ≈ 6650 (p6DocTop + p6Height * 0.29)
    var rolloutStart = Math.round(p6DocTop + p6Height * 0.25);
    var rolloutSpan = Math.round(p6Height * 0.42); // ~250px at 1024, ~360px at 1440
    var rolloutEnd = rolloutStart + rolloutSpan;

    return {
      scrollMax: scrollMax,
      rolloutStart: rolloutStart,
      rolloutEnd: rolloutEnd,
      rolloutSpan: rolloutSpan,
      p6DocBottom: p6DocBottom
    };
  }

  function updateSubpageOnScroll() {
    var y = window.scrollY || window.pageYOffset;
    var m = getMetrics();

    // 1. Roll up and fade out title words (.grand-hero-word)
    // Staggered rollout matching Casamomo's physics:
    // translate3d(0, -115%, 0) rotate(-8deg) with transform-origin: 0% 100% and opacity: 0
    var wordDur = Math.round(m.rolloutSpan * 0.65);
    var totalWords = 3;
    var wordInterval = (m.rolloutSpan - wordDur) / Math.max(1, totalWords - 1);

    for (var h = 0; h < h1Elements.length; h++) {
      var words = h1Elements[h].querySelectorAll('.grand-hero-word');
      if (!words || words.length === 0) continue;

      for (var i = 0; i < words.length; i++) {
        var el = words[i];
        var start = m.rolloutStart + i * wordInterval;
        var end = start + wordDur;

        // Clear any initial CSS entrance animation once scroll interaction starts
        if (el.style.animation) {
          el.style.animation = 'none';
        }

        if (y <= start) {
          el.style.setProperty('transform', 'none', 'important');
          el.style.setProperty('opacity', '1', 'important');
        } else if (y >= end) {
          el.style.setProperty('transform', 'translate3d(0, -115%, 0) rotate(-8deg)', 'important');
          el.style.setProperty('opacity', '0', 'important');
        } else {
          var p = (y - start) / wordDur;
          var ease = p * p * (3 - 2 * p); // smoothstep
          var transY = -115 * ease;
          var rot = -8 * ease;
          var op = Math.max(0, 1 - ease);
          el.style.setProperty('transform', 'translate3d(0, ' + transY.toFixed(2) + '%, 0) rotate(' + rot.toFixed(2) + 'deg)', 'important');
          el.style.setProperty('opacity', op.toFixed(3), 'important');
        }
      }
    }

    // 2. Scroll pill [ ↓ Scroll to Explore ] fades out as Photo 6 approaches rolloutStart
    if (scrollPill) {
      var pillStart = m.rolloutStart - 120;
      var pillEnd = m.rolloutStart + 30;
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
      if (y >= m.scrollMax + 60) {
        stickyHeader.style.visibility = 'hidden';
      } else {
        stickyHeader.style.visibility = 'visible';
      }
    }

    // 4. Background color transition across background layers
    // Starts right as title rollout completes and finishes before Photo 6 exits!
    var colorStart = m.rolloutEnd - 30;
    var colorEnd = Math.min(m.p6DocBottom - 20, m.scrollMax);
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
    if (y >= colorStart + (colorEnd - colorStart) * 0.5) {
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
  window.addEventListener('load', updateSubpageOnScroll);
})();
</script>`;

html = html.slice(0, startIdx) + newEngineScript + html.slice(endIdx + closeTag.length);

fs.writeFileSync('venues/open-earth-lawn.html', html, 'utf8');
console.log('Successfully updated venues/open-earth-lawn.html with calibrated engine script!');
