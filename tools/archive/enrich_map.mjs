import fs from 'fs';

const htmlPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const detailedScript = `
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

    var mapStyle = {
      version: 8,
      glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
      sources: {
        openmaptiles: {
          type: 'vector',
          url: 'https://tiles.openfreemap.org/planet'
        }
      },
      layers: [
        // 1. Base Land & Background
        { id: 'background', type: 'background', paint: { 'background-color': '#F3ECDD' } },
        { id: 'landcover', type: 'fill', source: 'openmaptiles', 'source-layer': 'landcover', paint: { 'fill-color': '#F3ECDD' } },
        { id: 'landuse-res', type: 'fill', source: 'openmaptiles', 'source-layer': 'landuse', paint: { 'fill-color': '#ECE4D2' } },

        // 2. Natural / Parks / Greenery
        { id: 'park', type: 'fill', source: 'openmaptiles', 'source-layer': 'park', paint: { 'fill-color': '#E5DEC8' } },
        {
          id: 'landuse-park', type: 'fill', source: 'openmaptiles', 'source-layer': 'landuse',
          filter: ['in', 'class', 'park', 'cemetery', 'pitch', 'grass', 'forest'],
          paint: { 'fill-color': '#E5DEC8' }
        },

        // 3. Waterways & Water Bodies
        { id: 'water', type: 'fill', source: 'openmaptiles', 'source-layer': 'water', paint: { 'fill-color': '#D3DFCE' } },
        {
          id: 'waterway', type: 'line', source: 'openmaptiles', 'source-layer': 'waterway',
          paint: {
            'line-color': '#C5D5BF',
            'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 15, 3]
          }
        },

        // 4. Buildings & Estate Footprints
        {
          id: 'building', type: 'fill', source: 'openmaptiles', 'source-layer': 'building',
          minzoom: 12.5,
          paint: {
            'fill-color': '#E6DCC8',
            'fill-outline-color': '#D8CCB2'
          }
        },

        // 5. Minor / Local Road Casings & Tracks
        {
          id: 'road-minor-casing', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation',
          filter: ['in', 'class', 'minor', 'service', 'track', 'path'],
          paint: {
            'line-color': '#E8DEC7',
            'line-width': ['interpolate', ['linear'], ['zoom'], 11, 2, 14, 3.5, 16, 5]
          }
        },
        {
          id: 'road-minor', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation',
          filter: ['in', 'class', 'minor', 'service', 'track', 'path'],
          paint: {
            'line-color': '#FCF9F2',
            'line-width': ['interpolate', ['linear'], ['zoom'], 11, 1.2, 14, 2.5, 16, 3.8]
          }
        },

        // 6. Major Arteries & Highways (Raibareli Rd, Kisan Path)
        {
          id: 'road-major-casing', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation',
          filter: ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk', 'motorway'],
          paint: {
            'line-color': '#CDBBA0',
            'line-width': ['interpolate', ['linear'], ['zoom'], 10, 3, 13, 5, 16, 8.5]
          }
        },
        {
          id: 'road-major', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation',
          filter: ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk', 'motorway'],
          paint: {
            'line-color': '#E6D7BD',
            'line-width': ['interpolate', ['linear'], ['zoom'], 10, 2, 13, 3.8, 16, 6.5]
          }
        },

        // 7. Typography: Road & Street Labels
        {
          id: 'highway-name-major', type: 'symbol', source: 'openmaptiles', 'source-layer': 'transportation_name',
          minzoom: 12.0,
          filter: ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk', 'motorway'],
          layout: {
            'symbol-placement': 'line',
            'text-field': ['coalesce', ['get', 'name_en'], ['get', 'name']],
            'text-font': ['Noto Sans Regular'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 12, 10, 15, 12],
            'text-letter-spacing': 0.08
          },
          paint: {
            'text-color': '#7F6F58',
            'text-halo-color': '#F3ECDD',
            'text-halo-width': 1.5
          }
        },
        {
          id: 'highway-name-minor', type: 'symbol', source: 'openmaptiles', 'source-layer': 'transportation_name',
          minzoom: 14.2,
          filter: ['in', 'class', 'minor', 'service'],
          layout: {
            'symbol-placement': 'line',
            'text-field': ['coalesce', ['get', 'name_en'], ['get', 'name']],
            'text-font': ['Noto Sans Regular'],
            'text-size': 10,
            'text-letter-spacing': 0.04
          },
          paint: {
            'text-color': '#9E8E77',
            'text-halo-color': '#F3ECDD',
            'text-halo-width': 1.2
          }
        }
      ]
    };

    var map = new maplibregl.Map({
      container: 'grand-vector-map',
      style: mapStyle,
      center: RESORT_COORDS,
      zoom: 13.0,
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

    // Enriched Local Reference Points (Lucknow South / Raibareli Rd corridor)
    var landmarks = [
      { name: 'Raibareli Rd', coords: [80.9880, 26.6560] },
      { name: 'SGPGI', coords: [80.9840, 26.6780] },
      { name: 'Mohanlalganj', coords: [80.9820, 26.6210] },
      { name: 'Kisan Path Ring Rd', coords: [81.0060, 26.6610] },
      { name: 'Bindaua Village', coords: [80.9990, 26.6380] }
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

html = html.replace(/<script src="https:\/\/unpkg\.com\/maplibre-gl@4\.7\.1\/dist\/maplibre-gl\.js"><\/script>\s*<script id="grand-locations-override">[\s\S]*?<\/script>/, detailedScript);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully enriched map with road casings, building footprints, waterways, road labels, and landmarks!');
