/**
 * apply_task3_final.mjs
 * 
 * Task 3 final implementation:
 * - Cleans up old static/failed injections
 * - Injects a MutationObserver-based polling override script that fires AFTER
 *   Framer hydrates #locations-1 and:
 *   1. Fixes heading "Locations" -> "Location"
 *   2. Fixes body text -> correct Bindaua address
 *   3. Updates button -> "Open in Maps ↗" with correct href
 *   4. Replaces framer-1esgfsu image div with MapLibre GL vector map
 */

import { readFileSync, writeFileSync } from 'fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = readFileSync(htmlPath, 'utf8');

// ─── Step 1: Remove old map container injected inside framer-1esgfsu ─────────
// The old script injected a static div that Framer overwrites anyway
html = html.replace(
  /<div id="grand-vector-map-container"[^>]*>[\s\S]*?<\/div>\s*\n?/g,
  ''
);
html = html.replace(
  /<div id="grand-vector-map"[^>]*>[\s\S]*?<\/div>\s*\n?/g,
  ''
);

// ─── Step 2: Remove old grand-map-init-script ────────────────────────────────
html = html.replace(
  /<script id="grand-map-init-script">[\s\S]*?<\/script>\s*\n?/g,
  ''
);

// ─── Step 3: Remove old maplibre JS script tag (if standalone, not in head) ──
// Keep only the one in head; remove any stray ones before </body>
// Find if there's a duplicate maplibre script near end of body
const maplibreJsTag = '<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>';
// Count occurrences
const count = (html.match(/<script src="https:\/\/unpkg\.com\/maplibre-gl/g) || []).length;
console.log(`Found ${count} maplibre-gl script tags`);

// ─── Step 4: Ensure MapLibre CSS + pin styles are in <head> ─────────────────
const maplibreCSS = '<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />';
const pinStyles = `<style id="grand-map-styles">
  /* Grand Lucknow - MapLibre Map Styles */
  #grand-locations-map-wrap {
    width: 100%;
    height: 100%;
    min-height: 480px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }
  #grand-vector-map {
    width: 100%;
    height: 100%;
    min-height: 480px;
    background: #FFF1C9;
    display: block;
  }
  .maplibregl-control-container { display: none !important; }
  .grand-pin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transform: translate(-50%, -100%);
  }
  .grand-pill {
    background: #B86C46;
    color: #FFF0CA;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 5px 12px;
    border-radius: 2px;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(184, 108, 70, 0.35);
    margin-bottom: 4px;
    text-transform: uppercase;
    font-family: -apple-system, sans-serif;
  }
  .grand-marker-pin {
    width: 16px;
    height: 16px;
    background: #B86C46;
    border: 2.5px solid #FFF1C9;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  }
  .landmark-pill {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.02em;
    white-space: nowrap;
    padding: 4px 10px;
    border-radius: 2px;
    pointer-events: none;
    background: rgba(189, 131, 70, 0.12);
    color: #1A241E;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(184, 108, 70, 0.25);
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    font-family: -apple-system, sans-serif;
  }
</style>`;

if (!html.includes('id="grand-map-styles"')) {
  if (html.includes(maplibreCSS)) {
    html = html.replace(maplibreCSS, maplibreCSS + '\n' + pinStyles);
  } else {
    html = html.replace('</head>', maplibreCSS + '\n' + pinStyles + '\n</head>');
  }
  console.log('✓ Added MapLibre CSS + pin styles to <head>');
} else {
  // Replace existing style block
  html = html.replace(/<style id="grand-map-styles">[\s\S]*?<\/style>/, pinStyles);
  console.log('✓ Updated existing grand-map-styles');
}

if (!html.includes(maplibreCSS)) {
  html = html.replace('</head>', maplibreCSS + '\n</head>');
  console.log('✓ Added MapLibre CSS link');
}

// ─── Step 5: Build the polling override script ───────────────────────────────
const overrideScript = `
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<script id="grand-locations-override">
(function() {
  'use strict';

  var RESORT_COORDS = [80.9914, 26.6438];
  var ADDRESS = '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301';
  var MAPS_LINK = 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117';
  var done = false;

  function initGrandMap(container) {
    if (window.__grandMapInitialized) return;
    window.__grandMapInitialized = true;

    var mapDiv = document.createElement('div');
    mapDiv.id = 'grand-vector-map';
    container.innerHTML = '';
    container.appendChild(mapDiv);

    var mapStyle = {
      version: 8,
      sources: {
        openmaptiles: {
          type: 'vector',
          url: 'https://tiles.openfreemap.org/planet'
        }
      },
      layers: [
        { id: 'background', type: 'background', paint: { 'background-color': '#FFF1C9' } },
        { id: 'landcover', type: 'fill', source: 'openmaptiles', 'source-layer': 'landcover', paint: { 'fill-color': '#F8EBC9' } },
        { id: 'landuse-res', type: 'fill', source: 'openmaptiles', 'source-layer': 'landuse', paint: { 'fill-color': '#F8EBC9' } },
        { id: 'park', type: 'fill', source: 'openmaptiles', 'source-layer': 'park', paint: { 'fill-color': '#F0E6C6' } },
        {
          id: 'landuse-park', type: 'fill', source: 'openmaptiles', 'source-layer': 'landuse',
          filter: ['in', 'class', 'park', 'cemetery', 'pitch', 'grass', 'forest'],
          paint: { 'fill-color': '#F0E6C6' }
        },
        { id: 'water', type: 'fill', source: 'openmaptiles', 'source-layer': 'water', paint: { 'fill-color': '#D9E8D9' } },
        {
          id: 'road-minor', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation',
          filter: ['in', 'class', 'minor', 'service', 'track', 'path'],
          paint: { 'line-color': '#FFFCF2', 'line-width': ['interpolate', ['linear'], ['zoom'], 11, 1, 15, 3] }
        },
        {
          id: 'road-major', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation',
          filter: ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk', 'motorway'],
          paint: { 'line-color': '#E4D6AF', 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 2, 14, 4.5, 16, 7] }
        }
      ]
    };

    var map = new maplibregl.Map({
      container: 'grand-vector-map',
      style: mapStyle,
      center: RESORT_COORDS,
      zoom: 12.8,
      attributionControl: false,
      interactive: true
    });
    window.__theGrandMap = map;

    // Terracotta pin + pill label
    var elGrand = document.createElement('div');
    elGrand.className = 'grand-pin-container';
    elGrand.innerHTML = '<div class="grand-pill">The Grand</div><div class="grand-marker-pin"></div>';
    new maplibregl.Marker({ element: elGrand, anchor: 'bottom' })
      .setLngLat(RESORT_COORDS)
      .addTo(map);

    // Landmark pills
    var landmarks = [
      { name: 'Raibareli Rd', coords: [80.9880, 26.6560] },
      { name: 'SGPGI', coords: [80.9840, 26.6780] },
      { name: 'Mohanlalganj', coords: [80.9820, 26.6210] }
    ];
    landmarks.forEach(function(lm) {
      var el = document.createElement('div');
      el.className = 'landmark-pill';
      el.textContent = lm.name;
      new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat(lm.coords)
        .addTo(map);
    });

    map.on('load', function() { window.__grandMapLoaded = true; });
  }

  function applyOverride() {
    if (done) return;
    var sec = document.getElementById('locations-1');
    if (!sec) return;

    // ── 1. Fix heading: "Locations" → "Location" ──────────────────────────
    sec.querySelectorAll('h1, h2, h3, h4, h5, h6, span').forEach(function(el) {
      if (el.children.length === 0 && el.textContent.trim() === 'Locations') {
        el.textContent = 'Location';
      }
    });

    // ── 2. Fix body paragraph ──────────────────────────────────────────────
    // Find any text node or paragraph containing Gomti Nagar
    var allEls = sec.querySelectorAll('p, span');
    allEls.forEach(function(el) {
      if (el.children.length === 0 && el.textContent.includes('Gomti Nagar')) {
        el.textContent = ADDRESS;
      } else if (el.children.length <= 2 && el.textContent.includes('Gomti Nagar')) {
        // Has inner spans (Framer animation wrappers)
        var inner = el.querySelector('span');
        if (inner && inner.children.length === 0) {
          inner.textContent = ADDRESS;
        }
      }
    });

    // ── 3. Fix / inject button ────────────────────────────────────────────
    // Look for any anchor in the location section that goes to internal /book page
    // or that has "Inquire" text
    var anchors = sec.querySelectorAll('a');
    var btnFixed = false;
    anchors.forEach(function(anchor) {
      var txt = anchor.textContent.trim();
      if (txt.includes('Inquire') || txt.includes('Book') || txt.includes('Explore') || txt.includes('Maps')) {
        anchor.href = MAPS_LINK;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        // Fix visible text in all child spans
        anchor.querySelectorAll('span').forEach(function(s) {
          if (s.children.length === 0 && s.textContent.trim().length > 0) {
            s.textContent = 'Open in Maps ↗';
          }
        });
        if (anchor.querySelectorAll('span').length === 0) {
          anchor.textContent = 'Open in Maps ↗';
        }
        btnFixed = true;
      }
    });

    // If no button found, inject one into the section
    if (!btnFixed) {
      var existingBtn = sec.querySelector('[data-framer-name="Button Wrapper"], .framer-d9tq7y, .framer-fg60rc');
      if (existingBtn) {
        var newA = document.createElement('a');
        newA.href = MAPS_LINK;
        newA.target = '_blank';
        newA.rel = 'noopener noreferrer';
        newA.textContent = 'Open in Maps ↗';
        newA.style.cssText = 'display:inline-flex;align-items:center;gap:6px;color:inherit;text-decoration:none;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;';
        existingBtn.appendChild(newA);
      }
    }

    // ── 4. Replace framer-1esgfsu image with MapLibre map ────────────────
    var imgDiv = sec.querySelector('.framer-1esgfsu');
    if (imgDiv && !document.getElementById('grand-vector-map')) {
      imgDiv.innerHTML = '';
      imgDiv.style.overflow = 'hidden';
      imgDiv.style.position = 'relative';
      imgDiv.style.minHeight = '480px';
      imgDiv.id = 'grand-locations-map-wrap';

      if (window.maplibregl) {
        initGrandMap(imgDiv);
      } else {
        // Wait for maplibre to load
        var check = setInterval(function() {
          if (window.maplibregl) {
            clearInterval(check);
            initGrandMap(imgDiv);
          }
        }, 100);
      }
    }

    done = true;
    console.log('[Grand Override] Task 3 applied successfully');
  }

  // ── Polling strategy: fire after Framer hydrates ─────────────────────────
  var attempts = 0;
  var maxAttempts = 80; // 16 seconds total

  var interval = setInterval(function() {
    attempts++;
    var sec = document.getElementById('locations-1');
    if (!sec) {
      if (attempts >= maxAttempts) clearInterval(interval);
      return;
    }

    // Wait until Framer has rendered actual content (not just skeleton)
    // The section will have its paragraph text rendered when textContent is > 50 chars
    var txt = sec.textContent || '';
    var hasContent = txt.length > 100 || txt.includes('Gomti Nagar') || txt.includes('Locations') || txt.includes('Location');

    if (hasContent) {
      clearInterval(interval);
      applyOverride();
    } else if (attempts >= maxAttempts) {
      clearInterval(interval);
      applyOverride(); // fire anyway
    }
  }, 200);

  // Safety: also fire on load events
  window.addEventListener('load', function() {
    setTimeout(applyOverride, 500);
  });

  // And observe DOM for section appearance
  var observer = new MutationObserver(function(mutations) {
    var sec = document.getElementById('locations-1');
    if (sec && (sec.textContent.includes('Gomti Nagar') || sec.textContent.includes('Locations'))) {
      observer.disconnect();
      clearInterval(interval);
      applyOverride();
    }
  });
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });

})();
</script>
`;

// ─── Step 6: Inject before </body> ───────────────────────────────────────────
// Remove any existing grand-locations-override script first
html = html.replace(/<script id="grand-locations-override">[\s\S]*?<\/script>\s*\n?/g, '');

// Remove any orphaned standalone maplibre-gl.js tags (keep only first which is in head or none)
// Actually let's count: if there's already one in head that's fine; if there are strays, remove them
// The override script itself includes the maplibre JS tag, so make sure there's no dupe
const maplibrejsMatches = html.match(/<script src="https:\/\/unpkg\.com\/maplibre-gl@4\.7\.1\/dist\/maplibre-gl\.js"><\/script>/g) || [];
console.log(`Before cleanup: ${maplibrejsMatches.length} maplibre JS script tags`);
// Remove all of them and we'll add one fresh inside overrideScript above </body>
html = html.replace(/<script src="https:\/\/unpkg\.com\/maplibre-gl@4\.7\.1\/dist\/maplibre-gl\.js"><\/script>\s*\n?/g, '');

// Now inject the complete override script (which includes the maplibre JS tag) before </body>
html = html.replace('</body>', overrideScript + '\n</body>');

writeFileSync(htmlPath, html, 'utf8');

// ─── Verify ──────────────────────────────────────────────────────────────────
const final = readFileSync(htmlPath, 'utf8');
console.log('\n=== VERIFICATION ===');
console.log('Has MapLibre CSS:', final.includes('maplibre-gl.css'));
console.log('Has grand-map-styles:', final.includes('grand-map-styles'));
console.log('Has grand-locations-override script:', final.includes('grand-locations-override'));
console.log('Has MapLibre JS:', final.includes('maplibre-gl.js'));
console.log('Has MutationObserver:', final.includes('MutationObserver'));
console.log('Has RESORT_COORDS:', final.includes('80.9914, 26.6438'));
console.log('Has Maps link:', final.includes('maps.app.goo.gl/94Dr1K1iPbZ3kR117'));
console.log('Has Bindaua address:', final.includes('Bindaua'));
console.log('MapLibre JS count:', (final.match(/maplibre-gl\.js/g) || []).length);
console.log('\n✅ apply_task3_final.mjs complete!');
