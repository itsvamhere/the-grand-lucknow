import fs from 'fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const updatedScript = `
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<script id="grand-locations-override">
(function() {
  'use strict';
  var RESORT_COORDS = [80.9914, 26.6438];
  var MAPS_LINK = 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117';

  function setupMapAndButton() {
    var sec = document.getElementById('locations-1');
    if (!sec) return false;

    // 1. Fix Button link and clean rolling label
    var anchor = sec.querySelector('a');
    if (anchor) {
      anchor.href = MAPS_LINK;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      var rolling = anchor.querySelector('[data-rolling-label]');
      if (rolling && !rolling.dataset.fixed) {
        rolling.dataset.fixed = 'true';
        rolling.innerHTML = '<span style=\"font-family: inherit; font-size: inherit; color: var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2); letter-spacing: 0.04em;\">Open in Maps ↗</span>';
      }
    }

    // 2. Setup Vector Map in place of .framer-1esgfsu
    var imgDiv = sec.querySelector('.framer-1esgfsu');
    if (imgDiv) {
      if (!imgDiv.querySelector('#grand-vector-map')) {
        imgDiv.innerHTML = '<div id=\"grand-vector-map\" style=\"width:100%; height:100%; min-height:500px; background:#F3ECDD;\"></div>';
        window.__grandMapInitialized = false;
      }
      
      if (!window.__grandMapInitialized && window.maplibregl) {
        initMap();
      }
    }
  }

  function initMap() {
    if (window.__grandMapInitialized) return;
    window.__grandMapInitialized = true;

    var map = new maplibregl.Map({
      container: 'grand-vector-map',
      style: '/grand_detailed_style.json',
      center: RESORT_COORDS,
      zoom: 13.5,
      attributionControl: false
    });
    window.__theGrandMap = map;

    // Primary Terracotta Pin & Floating Label: The Grand
    var elGrand = document.createElement('div');
    elGrand.className = 'grand-pin-container';
    elGrand.innerHTML = '<div class=\"grand-pill\">The Grand</div><div class=\"grand-marker-pin\"></div>';
    new maplibregl.Marker({ element: elGrand, anchor: 'bottom' })
      .setLngLat(RESORT_COORDS)
      .addTo(map);

    // Landmarks
    var landmarks = [
      { name: 'Raibareli Rd', coords: [80.9880, 26.6560] },
      { name: 'SGPGI', coords: [80.9840, 26.6780] },
      { name: 'Mohanlalganj', coords: [80.9820, 26.6210] },
      { name: 'Kisan Path Ring Rd', coords: [81.0060, 26.6610] },
      { name: 'Bindaua', coords: [80.9990, 26.6380] }
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

  // Polling runner: run after React hydration
  setTimeout(function() {
    var pollCount = 0;
    var poll = setInterval(function() {
      pollCount++;
      setupMapAndButton();
      if (pollCount > 40) clearInterval(poll);
    }, 300);
  }, 1000);

  window.addEventListener('load', function() {
    setTimeout(setupMapAndButton, 1500);
  });
})();
</script>
`;

html = html.replace(/<script src="https:\/\/unpkg\.com\/maplibre-gl@4\.7\.1\/dist\/maplibre-gl\.js"><\/script>\s*<script id="grand-locations-override">[\s\S]*?<\/script>/, updatedScript);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Updated index.html to load /grand_detailed_style.json (110 layers)!');
