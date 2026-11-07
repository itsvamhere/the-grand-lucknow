import fs from 'fs';
import path from 'path';

const lawnFile = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let content = fs.readFileSync(lawnFile, 'utf8');

// -------------------------------------------------------------
// 1. Restore Navigation Bar Consistency (Matching index.html)
// -------------------------------------------------------------

// A. Desktop Nav Links
// Replace href="/#venues" with href="/venues"
content = content.replaceAll('href="/#venues"', 'href="/venues"');
// Replace href="/#about" with href="/about"
content = content.replaceAll('href="/#about"', 'href="/about"');
// Replace href="/#contact" with href="/contact"
content = content.replaceAll('href="/#contact"', 'href="/contact"');

// B. Desktop "Book Now" Button
// In open-earth-lawn.html, replace the button class, framer-name, and remove framer-appear animation delay:
// Look for the desktop button container:
const oldDesktopBtnContainer = /<div class="framer-18mvsw1-container" data-framer-appear-id="18mvsw1" style="[^"]*">([\s\S]*?)<\/div><!--\/\$-->/i;

// The exact button matching index.html and media_1793859231371_192783ce.png:
const newDesktopBtnContainer = `<div class="framer-18mvsw1-container" style="will-change:transform;opacity:1;transform:none;"><!--$--><a class="framer-vO7O2 framer-9t14z3 framer-v-wf9qrl framer-1swxj4p" data-framer-name="White" data-highlight="true" href="/contact" onclick="var m=document.getElementById('grand-booking-modal'); if(m){m.style.display='flex'; return false;}" style="backdrop-filter:none;background-color:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202));corner-shape:superellipse(1);-webkit-backdrop-filter:none;border-bottom-left-radius:2px;border-bottom-right-radius:2px;border-top-left-radius:2px;border-top-right-radius:2px"><div class="framer-10dp641" data-framer-name="Nav Link"><div class="framer-nbr5p7-container" data-code-component-plugin-id="api"><!--$--><span data-rolling-label style="font-family:&quot;Lay Grotesk Regular&quot;, &quot;Lay Grotesk Regular Placeholder&quot;, sans-serif;font-size:calc(17px * (1 - var(--casa-phone, 0)) + 15px * var(--casa-phone, 0));font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.2em;color:var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1));position:relative;display:inline-block;overflow:hidden;white-space:nowrap;width:max-content;margin:0;user-select:none;vertical-align:top"><span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">Book Now</span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">B</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">B</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">B</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">o</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">o</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">k</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">k</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">k</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden"> </span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none"> </span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)"> </span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">N</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">N</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">N</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">o</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">w</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">w</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">w</span></span></span><!--/$--></div></div><div class="framer-1ko9uiy" style="--corner-shape-fallback:0.634;corner-shape:superellipse(1.8);border-bottom-left-radius:calc(4px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)));border-bottom-right-radius:calc(4px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)));border-top-left-radius:calc(4px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)));border-top-right-radius:calc(4px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)))"><div data-framer-component-type="SVG" parentsize="0" _constraints="[object Object]" rotation="0" shadows class="framer-14b9qd0" aria-hidden="true" style="image-rendering:pixelated;flex-shrink:0"><div class="svgContainer" style="width:100%;height:100%;aspect-ratio:inherit"><svg style="width:100%;height:100%;"><use href="#svg-1267704399_390"/></svg></div></div><div data-framer-component-type="SVG" parentsize="0" _constraints="[object Object]" rotation="0" shadows class="framer-m12jrg" aria-hidden="true" style="image-rendering:pixelated;flex-shrink:0"><div class="svgContainer" style="width:100%;height:100%;aspect-ratio:inherit"><svg style="width:100%;height:100%;"><use href="#svg-1267704399_390"/></svg></div></div></div></a><!--/$--></div>`;

content = content.replace(oldDesktopBtnContainer, newDesktopBtnContainer);

// C. Mobile Menu Navigation Links
// Mobile link 4 was "Open in Maps" linking to Google Maps; replace it with "Book Now" matching index.html
const oldMobileMapsLink = /<!--\$--><a class="framer-1fslfdg framer-fx9txd"[^>]*href="https:\/\/maps\.app\.goo\.gl\/[^"]*"[\s\S]*?<\/a><!--\/\$-->/i;
const newMobileBookNowLink = `<!--$--><a class="framer-1fslfdg framer-fx9txd" data-framer-name="Nav Link" href="/contact" onclick="var m=document.getElementById('grand-booking-modal'); if(m){m.style.display='flex'; return false;}"><div class="framer-188zsml-container" data-code-component-plugin-id="api" data-framer-name="Link Roll" name="Link Roll"><!--$--><span data-rolling-label style="font-family:&quot;Lay Grotesk Regular&quot;, &quot;Lay Grotesk Regular Placeholder&quot;, sans-serif;font-size:32px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.2em;color:rgb(255, 240, 202);position:relative;display:inline-block;overflow:hidden;white-space:nowrap;width:max-content;margin:0;user-select:none;vertical-align:top"><span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">Book Now</span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">B</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">B</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">B</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">o</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">o</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">k</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">k</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">k</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden"> </span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none"> </span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)"> </span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">N</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">N</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">N</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">o</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">o</span></span><span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">w</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">w</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">w</span></span></span><!--/$--></div></a><!--/$-->`;
content = content.replace(oldMobileMapsLink, newMobileBookNowLink);

// D. Add CSS rule to force button container solid opacity & styling
const buttonCssFix = `
<style id="grand-nav-btn-fix">
.framer-18mvsw1-container {
  opacity: 1 !important;
  transform: none !important;
  animation: none !important;
}
.framer-18mvsw1-container a.framer-v-wf9qrl {
  background-color: var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202)) !important;
  color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1)) !important;
  border-radius: 2px !important;
  opacity: 1 !important;
}
.framer-18mvsw1-container a.framer-v-wf9qrl * {
  color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1)) !important;
  fill: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1)) !important;
}
/* Ensure word spans for Open Earth Lawn do not cut off ascenders or rotation */
.hidden-u6hac7 h1 > span, .hidden-1azqig2 h1 > span, .hidden-1l94oxb h1 > span {
  padding-top: 8px !important;
  margin-top: -8px !important;
  padding-bottom: 8px !important;
  margin-bottom: -8px !important;
}
</style>
`;
if (!content.includes('id="grand-nav-btn-fix"')) {
  content = content.replace('</head>', buttonCssFix + '\n</head>');
}

// -------------------------------------------------------------
// 2. Restore Hero Headline Letter-by-Letter Animation
// -------------------------------------------------------------
// Update grand-subpage-engine-js to dynamically compute triggers based on
// actual section height and window.innerHeight, handling any screen size flawlessly.

const newEngineJs = `<script id="grand-subpage-engine-js">
(function() {
  'use strict';
  var ticking = false;
  var stickyHeader = document.querySelector('[data-framer-name="Sticky Header Text"]');
  var scrollPill = document.querySelector('[data-framer-name="Sticky Header Text"] [data-framer-name="Menu Title"]');
  var h1Elements = document.querySelectorAll('[data-framer-name="Sticky Header Text"] h1');
  var colorChangeEl = document.querySelector('[data-framer-name="Color Change"] .framer-uo2c0');
  var rootDiv = document.querySelector('.framer-eIM4l');
  var stickyBtn = document.querySelector('[data-framer-name="Sticky Button"] a');

  // Cancel any Framer appear web animation on the nav button container
  var btnContainer = document.querySelector('.framer-18mvsw1-container');
  if (btnContainer && btnContainer.getAnimations) {
    btnContainer.getAnimations().forEach(function(anim) { anim.cancel(); });
  }

  function getMetrics() {
    var headerSec = document.querySelector('section#apartment-header, .framer-151qtkn');
    var secH = headerSec ? headerSec.offsetHeight : 8000;
    var vh = window.innerHeight || 900;
    var scrollMax = Math.max(1000, secH - vh);

    // Rollout starts as Photo 6 approaches its exit and finishes at scrollMax
    var rolloutSpan = Math.min(650, Math.max(380, scrollMax * 0.1));
    var rolloutStart = scrollMax - rolloutSpan;
    var rolloutEnd = scrollMax;

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

    // Word stagger partitions within [rolloutStart, rolloutEnd]:
    // "Open"  (letters 0-3):  rolloutStart to rolloutStart + 0.55 * rolloutSpan
    // "Earth" (letters 4-8):  rolloutStart + 0.22 * rolloutSpan to rolloutStart + 0.78 * rolloutSpan
    // "Lawn"  (letters 9-12): rolloutStart + 0.45 * rolloutSpan to rolloutEnd
    var wordConfigs = [
      { startIdx: 0, endIdx: 3, startY: m.rolloutStart, endY: m.rolloutStart + m.rolloutSpan * 0.55 },
      { startIdx: 4, endIdx: 8, startY: m.rolloutStart + m.rolloutSpan * 0.22, endY: m.rolloutStart + m.rolloutSpan * 0.78 },
      { startIdx: 9, endIdx: 12, startY: m.rolloutStart + m.rolloutSpan * 0.45, endY: m.rolloutEnd }
    ];

    // 1. Staggered letter-by-letter roll up & fade
    for (var h = 0; h < h1Elements.length; h++) {
      var letters = h1Elements[h].querySelectorAll('.grand-hero-letter');
      if (!letters || letters.length === 0) continue;

      for (var w = 0; w < wordConfigs.length; w++) {
        var cfg = wordConfigs[w];
        var wLettersCount = cfg.endIdx - cfg.startIdx + 1;
        var wDuration = cfg.endY - cfg.startY;
        var letDur = Math.min(140, wDuration * 0.6);
        var letInterval = (wDuration - letDur) / Math.max(1, wLettersCount - 1);

        for (var i = cfg.startIdx; i <= cfg.endIdx; i++) {
          if (i >= letters.length) break;
          var el = letters[i];
          var offsetInWord = i - cfg.startIdx;
          var start = cfg.startY + offsetInWord * letInterval;
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

    // 4. Background color transition across background layers
    var colorStart = m.rolloutStart + 50;
    var colorEnd = m.scrollMax;
    var bg;
    if (y < colorStart) {
      bg = 'rgb(14, 18, 1)';
    } else if (y >= colorEnd) {
      bg = 'rgb(232, 219, 183)';
    } else {
      var progress = (y - colorStart) / (colorEnd - colorStart);
      var easeP = progress * progress * (3 - 2 * progress); // smoothstep
      var r = Math.round(14 + (232 - 14) * easeP);
      var g = Math.round(18 + (219 - 18) * easeP);
      var b = Math.round(1 + (183 - 1) * easeP);
      bg = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    document.body.style.backgroundColor = bg;
    if (rootDiv) rootDiv.style.backgroundColor = bg;
    if (colorChangeEl) colorChangeEl.style.backgroundColor = bg;

    // 5. Invert UI elements at transition threshold
    if (y >= m.rolloutStart + 250) {
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
</script>`;

const engineRegex = /<script id="grand-subpage-engine-js">[\s\S]*?<\/script>/;
content = content.replace(engineRegex, newEngineJs);

// Write changes to open-earth-lawn.html
fs.writeFileSync(lawnFile, content, 'utf8');
console.log('Successfully applied fixes to open-earth-lawn.html!');
