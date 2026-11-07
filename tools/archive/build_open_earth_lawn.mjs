import fs from 'fs';

const srcPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html';
const destPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';

let html = fs.readFileSync(srcPath, 'utf8');

// 1. Decouple Framer React Hydration runtime that overrides SSR content
html = html.replace(/<script[^>]*script_main[^>]*><\/script>/g, '');
html = html.replace(/<script type="framer\/handover"[^>]*>[\s\S]*?<\/script>/g, '');

// 2. SEO & Title
html = html.replace(/<title>[^<]*<\/title>/, '<title>Open Earth Lawn • Premier Luxury Event Estate • The Grand Lucknow</title>');
html = html.replace(/content="[^"]*Designer Apartment in Graz[^"]*"/g, 'content="Open Earth Lawn • 55,000 Sqft Premier Event Estate • The Grand Lucknow"');

// 3. Main Headline & Subtitle Swaps
html = html.replaceAll('N°01  – Designer Apartment in Graz', 'Open Earth Lawn  – Premier Event Estate');
html = html.replaceAll('N°01 – Designer Apartment in Graz', 'Open Earth Lawn – Premier Event Estate');
html = html.replaceAll('N°01', 'Open Earth Lawn');
html = html.replaceAll('Designer Apartment in Graz', 'Premier Event Estate in Lucknow');
html = html.replaceAll('Designer Apartment', 'Premier Event Estate');
html = html.replaceAll('Apartment Details', 'Venue Details');
html = html.replaceAll('Apartment  Details', 'Venue  Details');
html = html.replaceAll('Apartment', 'Venue');
html = html.replaceAll('Graz', 'Lucknow');

// 4. Description Copy
const oldDesc = /Bedroom walls with a mossy patina no designer could fake[^<]*/g;
const newDesc = "Spanning 55,000 square feet of manicured, open-sky lush greens, Open Earth Lawn is the signature outdoor event canvas of The Grand Lucknow. Surrounded by towering royal palm canopies and soft ambient architectural illumination, it offers a grand stage for 1,000 to 1,500 guests with extensive dedicated parking, pristine lawns, and bespoke hospitality orchestrations for majestic weddings and gala celebrations.";
html = html.replace(oldDesc, newDesc);

// 5. Features & Specs
html = html.replaceAll('>60<', '>55,000<');
html = html.replaceAll('>sq ft<', '>Sqft<');
html = html.replaceAll('>4<', '>1,000 – 1,500<');
html = html.replaceAll('>Guests<', '>Guests Capacity<');

// 6. Section "Other Places to Stay" -> "Other Venues to Explore"
html = html.replaceAll('Other Places to Stay', 'Other Venues to Explore');
html = html.replaceAll('Other  Places  to  Stay', 'Other  Venues  to  Explore');

// 7. Swap gallery photo URLs to use venue image card_1_open_earth.webp across slots
html = html.replaceAll('/images/card_1_open_earth.webp', '/images/card_1_open_earth.webp');
// Replace existing apartment gallery photos with card_1_open_earth.webp
html = html.replace(/\/images\/boutique_[^"'\s\)]+/g, '/images/card_1_open_earth.webp');
html = html.replace(/\/images\/loft_[^"'\s\)]+/g, '/images/card_1_open_earth.webp');

// 8. Replace Location Map static cutout with Live MapLibre Vector Map
const mapStartIdx = html.indexOf('data-framer-name="Location Map"');
const mapEndIdx = html.indexOf('</div></div><!--/$--></div></div><div class="framer-2iif9c"', mapStartIdx);

if (mapStartIdx !== -1 && mapEndIdx !== -1) {
  const mapReplacement = `data-framer-name="Location Map" name="Location Map">
    <div id="venue-vector-map-container" style="width:100%; height:100%; min-height:540px; position:relative; overflow:hidden; border-radius:4px; background:#F3ECDD;">
      <div id="venue-vector-map" style="width:100%; height:100%; min-height:540px; background:#F3ECDD;"></div>
    </div>
  </div></div>`;
  
  html = html.substring(0, mapStartIdx) + mapReplacement + html.substring(mapEndIdx + 19);
  console.log('Successfully replaced static Location Map with venue vector map container!');
}

// 9. Update "Open in Maps" button link
html = html.replaceAll('https://maps.app.goo.gl/XUXToyq7AmszPGK69', 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117');

// 10. Inject MapLibre scripts and custom vector map initialization in <head> and </body>
const mapHeadInjection = `
  <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />
  <style>
    #venue-vector-map-container {
      width: 100%;
      height: 100%;
      min-height: 540px;
      position: relative;
      overflow: hidden;
      background: #F3ECDD;
    }
    #venue-vector-map {
      width: 100%;
      height: 100%;
      min-height: 540px;
      background: #F3ECDD;
    }
    .maplibregl-control-container { display: none !important; }
    .grand-pin-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transform: translate(-50%, -100%);
      z-index: 20;
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
      background: rgba(255, 255, 255, 0.85);
      color: #2F2A24;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(184, 108, 70, 0.25);
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      font-family: -apple-system, sans-serif;
      z-index: 5;
    }
    .landmark-road {
      background: #768B9E;
      border: 1px solid #5A6F82;
      color: #FFFFFF;
      font-weight: 600;
      font-size: 10px;
      letter-spacing: 0.04em;
    }
  </style>
`;

const mapInitScript = `
  <script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
  <script id="venue-map-init">
  (function() {
    function initVenueMap() {
      var mapEl = document.getElementById('venue-vector-map');
      if (!mapEl || window.__venueMapInit) return;
      window.__venueMapInit = true;

      var coords = [80.9992764, 26.6355667];
      var map = new maplibregl.Map({
        container: 'venue-vector-map',
        style: '/grand_detailed_style.json',
        center: coords,
        zoom: 14.5,
        attributionControl: false
      });

      // Venue Terracotta Pin with "Open Earth Lawn" Label
      var elGrand = document.createElement('div');
      elGrand.className = 'grand-pin-container';
      elGrand.innerHTML = '<div class="grand-pill">Open Earth Lawn • The Grand</div><div class="grand-marker-pin"></div>';
      new maplibregl.Marker({ element: elGrand, anchor: 'bottom' })
        .setLngLat(coords)
        .addTo(map);

      // Essential Civic Landmarks
      var landmarks = [
        { name: 'Raibareli Rd (NH-24B)', coords: [80.9965, 26.6385], type: 'road' },
        { name: 'Bindaua', coords: [80.9990, 26.6430] },
        { name: 'Tirupati College of Engineering', coords: [80.9958, 26.6480] },
        { name: 'Govt ITI Mohanlalganj', coords: [81.0015, 26.6315] },
        { name: 'Bindaua Pani Tanki', coords: [81.0028, 26.6442] },
        { name: 'Ahmadpur Khalsa', coords: [81.0090, 26.6445] },
        { name: 'Hanuman Mandir', coords: [81.0085, 26.6475] }
      ];

      landmarks.forEach(function(lm) {
        var el = document.createElement('div');
        el.className = 'landmark-pill ' + (lm.type ? 'landmark-' + lm.type : '');
        el.textContent = lm.name;
        new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat(lm.coords)
          .addTo(map);
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initVenueMap);
    } else {
      initVenueMap();
    }
    window.addEventListener('load', initVenueMap);
  })();
  </script>
`;

html = html.replace('</head>', mapHeadInjection + '\n</head>');
html = html.replace('</body>', mapInitScript + '\n</body>');

fs.writeFileSync(destPath, html, 'utf8');
console.log('Successfully built /venues/open-earth-lawn.html!');
