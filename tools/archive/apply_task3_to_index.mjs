import fs from 'fs';

const filePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. Remove Gomti Nagar from metadata & alt text
html = html.replaceAll('in Gomti Nagar', 'in Bindaua, Lucknow (Raibareli Rd)');
html = html.replaceAll('Gomti Nagar', 'Bindaua, Lucknow');

// 2. Change section id="locations-1" heading: "Locations" -> "Location"
// We need to change both the desktop and mobile SSR headings in section locations-1
const loc1Start = html.indexOf('id="locations-1"');
if (loc1Start === -1) {
  console.error('id="locations-1" not found!');
  process.exit(1);
}
const loc1End = html.indexOf('</section>', loc1Start);
let loc1 = html.substring(loc1Start, loc1End + 10);

// In loc1, replace >Locations< and >Locations</span> with >Location< and >Location</span>
loc1 = loc1.replaceAll('>Locations<', '>Location<');
loc1 = loc1.replaceAll('>Locations</span>', '>Location</span>');

// 3. Update Address Copy in loc1
// Replace the paragraph text
const oldParagraphRegex = /<div class="framer-e56v93-container"[^>]*>[\s\S]*?<\/div><\/div><!--\/\$-->/i;
const newParagraphHTML = `<div class="framer-e56v93-container" data-code-component-plugin-id="84d4c1"><!--$--><div class="ssr-variant"><p lang="en" style="font-family:&quot;Lay Grotesk Regular&quot;, &quot;Lay Grotesk Regular Placeholder&quot;, sans-serif;font-size:var(--grand-p1-size, 32px);font-style:normal;font-weight:400;letter-spacing:var(--grand-p1-ls, -0.2px);line-height:var(--grand-p1-lh, 1.2em);text-align:left;width:100%;margin:0;padding:0;display:flex;flex-wrap:wrap;column-gap:0.28em;justify-content:flex-start;color:var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1));text-transform:none;hyphens:manual;-webkit-hyphens:manual;overflow-wrap:normal;word-break:normal"><span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:none">22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301</span></span></p></div><!--/$--></div>`;

loc1 = loc1.replace(oldParagraphRegex, newParagraphHTML);

// 4. Update the Button in loc1 to "Open in Maps ↗"
// Helper: rolling letters for Framer
function makeRollingText(word) {
  let res = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${word}</span>`;
  for (const ch of word) {
    res += `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`;
  }
  return res;
}

const rollingOpenInMaps = makeRollingText('Open in Maps ↗');
const oldButtonRegex = /<a class="framer-vO7O2 framer-9t14z3 framer-v-1lavhxb framer-1swxj4p"[^>]*href="\.\/book"[\s\S]*?<\/a><!--\/\$-->/i;
const newButtonHTML = `<a class="framer-vO7O2 framer-9t14z3 framer-v-1lavhxb framer-1swxj4p" data-framer-name="Dark" href="https://maps.app.goo.gl/94Dr1K1iPbZ3kR117" target="_blank" rel="noopener noreferrer" style="backdrop-filter:none;background-color:var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1));corner-shape:superellipse(1);-webkit-backdrop-filter:none;border-bottom-left-radius:2px;border-bottom-right-radius:2px;border-top-left-radius:2px;border-top-right-radius:2px"><div class="framer-10dp641" data-framer-name="Nav Link"><div class="framer-nbr5p7-container" data-code-component-plugin-id="api"><!--$--><span data-rolling-label style="font-family:&quot;Lay Grotesk Regular&quot;, &quot;Lay Grotesk Regular Placeholder&quot;, sans-serif;font-size:calc(17px * (1 - var(--grand-phone, 0)) + 15px * var(--grand-phone, 0));font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.2em;color:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2);position:relative;display:inline-block;overflow:hidden;white-space:nowrap;width:max-content;margin:0;user-select:none;vertical-align:top">${rollingOpenInMaps}</span><!--/$--></div></div><div class="framer-1ko9uiy" style="--corner-shape-fallback:0.634;corner-shape:superellipse(1.8);border-bottom-left-radius:calc(4px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)));border-bottom-right-radius:calc(4px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)));border-top-left-radius:calc(4px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)));border-top-right-radius:calc(4px*var(--one-if-corner-shape-supported,var(--corner-shape-fallback,1)))"></div></a><!--/$-->`;

loc1 = loc1.replace(oldButtonRegex, newButtonHTML);

// 5. Replace Image in framer-1esgfsu with Vector Map Container
const oldImageWrapperRegex = /<div class="framer-1esgfsu">[\s\S]*?<\/div><\/div><\/section>/i;
const newMapContainerHTML = `<div class="framer-1esgfsu">
  <div id="grand-vector-map-container" style="width:100%; height:100%; min-height:480px; position:relative; overflow:hidden; border-radius:4px; border:1px solid rgba(184, 108, 70, 0.25); box-shadow:0 16px 40px rgba(0,0,0,0.4);">
    <div id="grand-vector-map" style="width:100%; height:100%; min-height:480px; background:#FFF1C9;"></div>
  </div>
</div></div></section>`;

loc1 = loc1.replace(oldImageWrapperRegex, newMapContainerHTML);

// Put loc1 back into html
html = html.substring(0, loc1Start) + loc1 + html.substring(loc1End + 10);

// 6. Add MapLibre CSS in <head>
if (!html.includes('maplibre-gl.css')) {
  html = html.replace('</head>', '<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />\n</head>');
}

// 7. Add Custom CSS for Pins & Markers in <head>
const mapPinStyles = `
<style id="grand-map-styles">
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
    font-family: "Lay Grotesk Regular", -apple-system, sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 5px 12px;
    border-radius: 2px;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(184, 108, 70, 0.35);
    margin-bottom: 4px;
    text-transform: uppercase;
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
    font-family: "Lay Grotesk Regular", -apple-system, sans-serif;
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
  }
  .maplibregl-control-container { display: none !important; }
</style>
`;
if (!html.includes('id="grand-map-styles"')) {
  html = html.replace('</head>', `${mapPinStyles}\n</head>`);
}

// 8. Add MapLibre JS & Map Init Script before </body>
const mapInitScript = `
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<script id="grand-map-init-script">
(function() {
  function initGrandMap() {
    var mapContainer = document.getElementById('grand-vector-map');
    if (!mapContainer || window.__grandMapInitialized) return;
    window.__grandMapInitialized = true;

    var resortCoords = [80.9914, 26.6438];

    var mapStyle = {
      version: 8,
      sources: {
        openmaptiles: {
          type: 'vector',
          url: 'https://tiles.openfreemap.org/planet'
        }
      },
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: { 'background-color': '#FFF1C9' }
        },
        {
          id: 'landcover',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landcover',
          paint: { 'fill-color': '#F8EBC9' }
        },
        {
          id: 'landuse-residential',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landuse',
          paint: { 'fill-color': '#F8EBC9' }
        },
        {
          id: 'park',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'park',
          paint: { 'fill-color': '#F0E6C6' }
        },
        {
          id: 'landuse-park',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landuse',
          filter: ['in', 'class', 'park', 'cemetery', 'pitch', 'grass', 'forest'],
          paint: { 'fill-color': '#F0E6C6' }
        },
        {
          id: 'water',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'water',
          paint: { 'fill-color': '#F0E6C6' }
        },
        {
          id: 'road-minor',
          type: 'line',
          source: 'openmaptiles',
          'source-layer': 'transportation',
          filter: ['in', 'class', 'minor', 'service', 'track', 'path'],
          paint: {
            'line-color': '#FFFCF2',
            'line-width': ['interpolate', ['linear'], ['zoom'], 11, 1, 15, 3]
          }
        },
        {
          id: 'road-major',
          type: 'line',
          source: 'openmaptiles',
          'source-layer': 'transportation',
          filter: ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk', 'motorway'],
          paint: {
            'line-color': '#E4D6AF',
            'line-width': ['interpolate', ['linear'], ['zoom'], 10, 2, 14, 4.5, 16, 7]
          }
        }
      ]
    };

    var map = new maplibregl.Map({
      container: 'grand-vector-map',
      style: mapStyle,
      center: resortCoords,
      zoom: 12.8,
      attributionControl: false
    });
    window.__theGrandMap = map;

    // Terracotta Marker & Floating Pill Label: The Grand
    var elGrand = document.createElement('div');
    elGrand.className = 'grand-pin-container';
    elGrand.innerHTML = '<div class="grand-pill">The Grand</div><div class="grand-marker-pin"></div>';
    new maplibregl.Marker({ element: elGrand, anchor: 'bottom' })
      .setLngLat(resortCoords)
      .addTo(map);

    // Surrounding Landmark Pills
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

    map.on('load', function() {
      window.__grandMapLoaded = true;
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initGrandMap();
  } else {
    document.addEventListener('DOMContentLoaded', initGrandMap);
  }
  window.addEventListener('load', initGrandMap);
})();
</script>
`;

if (!html.includes('id="grand-map-init-script"')) {
  html = html.replace('</body>', `${mapInitScript}\n</body>`);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated index.html for Task 3!');
