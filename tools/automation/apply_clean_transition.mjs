import fs from 'node:fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Replace the fragmented letters in both H1s with clean word spans
const desktopH1 = `<h1 lang="en" style="font-family:&quot;Lay Grotesk Regular&quot;, &quot;Lay Grotesk Regular Placeholder&quot;, sans-serif;font-size:max(calc(var(--casa-page-w, 100vw) * 0.125), calc(var(--casa-phone, 0) * 64px));font-style:normal;font-weight:400;letter-spacing:-0.02em;line-height:0.95em;text-align:left;width:100%;margin:0;padding:0;display:flex;flex-wrap:wrap;column-gap:0.28em;justify-content:center;color:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202));text-transform:none;hyphens:manual;-webkit-hyphens:manual;overflow-wrap:normal;word-break:normal"><span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">Open</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">Earth</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">Lawn</span></span> <span style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap"> – Premier Luxury Event Space in Lucknow</span></h1>`;

const mobileH1 = `<h1 lang="en" style="font-family:&quot;Lay Grotesk Regular&quot;, &quot;Lay Grotesk Regular Placeholder&quot;, sans-serif;font-size:56px;letter-spacing:-1.1px;font-style:normal;font-weight:400;letter-spacing:-0.02em;line-height:0.95em;text-align:left;width:100%;margin:0;padding:0;display:flex;flex-wrap:wrap;column-gap:0.28em;justify-content:center;color:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202));text-transform:none;hyphens:manual;-webkit-hyphens:manual;overflow-wrap:normal;word-break:normal"><span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">Open</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">Earth</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">Lawn</span></span> <span style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap"> – Premier Luxury Event Space in Lucknow</span></h1>`;

// Replace H1s in HTML
const h1Regex = /<h1 lang="en" style="[^"]*font-size:max[\s\S]*?<\/h1>/;
html = html.replace(h1Regex, desktopH1);

const h1MobileRegex = /<h1 lang="en" style="[^"]*font-size:56px[\s\S]*?<\/h1>/;
html = html.replace(h1MobileRegex, mobileH1);

// 2. Replace grand-subpage-engine-js with the precision word-rollout engine
const engineScript = `<script id="grand-subpage-engine-js">
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
    var p6DocBottom = rect ? Math.round(rect.bottom + (window.scrollY || window.pageYOffset)) : 7255;
    var vh = window.innerHeight || 768;

    var headerSec = document.querySelector('section#apartment-header, .framer-151qtkn');
    var secH = headerSec ? headerSec.offsetHeight : 8045;
    var scrollMax = Math.max(1000, secH - vh);

    // EXACT CASAMOMO TIMING:
    // Rollout starts ONLY when Photo 6's bottom is exiting the screen (p6DocBottom - 80px)
    // NEVER pre-triggers while Photo 6 is in the viewport!
    var rolloutStart = Math.round(p6DocBottom - 100);
    var rolloutSpan = 520;
    var rolloutEnd = rolloutStart + rolloutSpan;

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

    // 1. Clean Word-by-Word roll up & fade across 3 words ("Open", "Earth", "Lawn")
    // Each word stays intact as a solid unit rolling up into its overflow:hidden container
    var wordDur = 260;
    var totalWords = 3;
    var wordInterval = (m.rolloutSpan - wordDur) / Math.max(1, totalWords - 1);

    for (var h = 0; h < h1Elements.length; h++) {
      var words = h1Elements[h].querySelectorAll('.grand-hero-word');
      if (!words || words.length === 0) continue;

      for (var i = 0; i < words.length; i++) {
        var el = words[i];
        var start = m.rolloutStart + i * wordInterval;
        var end = start + wordDur;

        if (y <= start) {
          el.style.transform = 'none';
          el.style.opacity = '1';
        } else if (y >= end) {
          el.style.transform = 'translate3d(0, -115%, 0) rotate(-6deg)';
          el.style.opacity = '0';
        } else {
          var p = (y - start) / wordDur;
          var ease = p * p * (3 - 2 * p); // smoothstep
          var transY = -115 * ease;
          var rot = -6 * ease;
          var op = Math.max(0, 1 - ease);
          el.style.transform = 'translate3d(0, ' + transY.toFixed(2) + '%, 0) rotate(' + rot.toFixed(2) + 'deg)';
          el.style.opacity = op.toFixed(3);
        }
      }
    }

    // 2. Scroll pill [ ↓ Scroll to Explore ] fades out at rolloutStart
    if (scrollPill) {
      var pillStart = m.rolloutStart - 80;
      var pillEnd = m.rolloutStart + 120;
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

    // 4. Background color transition across background layers (reaching pure cream by rolloutEnd)
    var colorStart = Math.round(m.rolloutStart + m.rolloutSpan * 0.35);
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
    if (y >= m.rolloutEnd - 80) {
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

html = html.replace(/<script id="grand-subpage-engine-js">[\s\S]*?<\/script>/, engineScript);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated H1 and grand-subpage-engine-js in open-earth-lawn.html!');
