import fs from 'fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// The exact verified Google Maps coordinates for The Grand Lucknow (Resort)
// Lat: 26.6355667, Lng: 80.9992764
const accurateScript = `
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<script id="grand-locations-override">
(function() {
  'use strict';
  // Canonical Google Maps place coordinates for The Grand Lucknow (Resort), Bindaua
  var RESORT_COORDS = [80.9992764, 26.6355667];
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

    // Load full cartographic style with 110 layers
    var map = new maplibregl.Map({
      container: 'grand-vector-map',
      style: '/grand_detailed_style.json',
      center: RESORT_COORDS,
      zoom: 14.2,
      attributionControl: false
    });
    window.__theGrandMap = map;

    // 1. Primary Destination Pin: The Grand Lucknow (Resort)
    var elGrand = document.createElement('div');
    elGrand.className = 'grand-pin-container';
    elGrand.innerHTML = '<div class=\"grand-pill\">The Grand Lucknow (Resort)</div><div class=\"grand-marker-pin\"></div>';
    new maplibregl.Marker({ element: elGrand, anchor: 'bottom' })
      .setLngLat(RESORT_COORDS)
      .addTo(map);

    // 2. Accurate Google Maps Landmark Network matching uploaded reference
    var googleLandmarks = [
      { name: 'Raibareli Rd (NH-24B)', coords: [80.9965, 26.6385], type: 'road' },
      { name: 'Bindaua', coords: [80.9990, 26.6430], type: 'locality' },
      { name: 'Sai Orchid Resort & Lawn', coords: [80.9942, 26.6435], type: 'venue' },
      { name: 'Tirupati College of Engineering', coords: [80.9958, 26.6480], type: 'college' },
      { name: 'Govt ITI Mohanlalganj', coords: [81.0015, 26.6320], type: 'college' },
      { name: 'Bindaua Pani Tanki', coords: [81.0028, 26.6442], type: 'utility' },
      { name: 'Ahmadpur Khalsa', coords: [81.0090, 26.6445], type: 'locality' },
      { name: 'Hanuman Mandir', coords: [81.0085, 26.6475], type: 'temple' },
      { name: 'Sardar Patel Institute of Ayurvedic', coords: [81.0005, 26.6260], type: 'college' },
      { name: '4th BN. SSB Lucknow', coords: [80.9880, 26.6300], type: 'defense' }
    ];

    googleLandmarks.forEach(function(lm) {
      var el = document.createElement('div');
      el.className = 'landmark-pill ' + (lm.type ? 'landmark-' + lm.type : '');
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

html = html.replace(/<script src="https:\/\/unpkg\.com\/maplibre-gl@4\.7\.1\/dist\/maplibre-gl\.js"><\/script>\s*<script id="grand-locations-override">[\s\S]*?<\/script>/, accurateScript);

// Update pin styles in <head> for landmark types to match Google Maps aesthetic with Casa Momo elegance
const updatedStyles = `
<style id="grand-map-styles">
  #grand-locations-map-wrap {
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }
  #grand-vector-map {
    width: 100%;
    height: 100%;
    min-height: 500px;
    background: #F3ECDD;
    display: block;
  }
  .maplibregl-control-container { display: none !important; }
  .grand-pin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transform: translate(-50%, -100%);
    z-index: 10;
  }
  .grand-pill {
    background: #B86C46;
    color: #FFF0CA;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 6px 14px;
    border-radius: 3px;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(184, 108, 70, 0.45);
    margin-bottom: 5px;
    font-family: -apple-system, sans-serif;
  }
  .grand-marker-pin {
    width: 16px;
    height: 16px;
    background: #B86C46;
    border: 3px solid #F3ECDD;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.35);
  }
  .landmark-pill {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.02em;
    white-space: nowrap;
    padding: 3px 8px;
    border-radius: 3px;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.72);
    color: #2F2A24;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(184, 108, 70, 0.28);
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    font-family: -apple-system, sans-serif;
  }
  .landmark-road {
    background: rgba(243, 236, 221, 0.9);
    border-color: #B86C46;
    color: #8C4724;
    font-weight: 600;
  }
  .landmark-locality {
    font-weight: 700;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.85);
    color: #1A1A1A;
  }
</style>
`;

html = html.replace(/<style id="grand-map-styles">[\s\S]*?<\/style>/, updatedStyles.trim());

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated accurate coordinates and Google Maps landmarks!');
