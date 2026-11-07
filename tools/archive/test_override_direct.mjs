import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const evalRes = await page.evaluate(() => {
    const sec = document.getElementById('locations-1');
    const imgDiv = sec ? sec.querySelector('.framer-1esgfsu') : null;
    return {
      windowMapLibre: typeof window.maplibregl !== 'undefined',
      secFound: !!sec,
      secDone: window.__grandMapInitialized,
      imgDivFound: !!imgDiv,
      imgDivHtml: imgDiv ? imgDiv.outerHTML.substring(0, 300) : null
    };
  });

  console.log('EVAL RES:', JSON.stringify(evalRes, null, 2));

  // Now manually execute the override logic in the page context and see what happens!
  console.log('Executing override directly in evaluate...');
  const execRes = await page.evaluate(() => {
    var RESORT_COORDS = [80.9914, 26.6438];
    var ADDRESS = '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301';
    var MAPS_LINK = 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117';

    var sec = document.getElementById('locations-1');
    if (!sec) return { error: 'No sec' };

    // Button
    var anchors = sec.querySelectorAll('a');
    anchors.forEach(function(anchor) {
      anchor.href = MAPS_LINK;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.querySelectorAll('span').forEach(function(s) {
        if (s.children.length === 0 && s.textContent.trim().length > 0) {
          s.textContent = 'Open in Maps ↗';
        }
      });
    });

    // Map
    var imgDiv = sec.querySelector('.framer-1esgfsu');
    if (!imgDiv) return { error: 'No imgDiv' };

    imgDiv.innerHTML = '<div id="grand-vector-map" style="width:100%;height:100%;min-height:480px;background:#FFF1C9;"></div>';

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
      attributionControl: false
    });

    var elGrand = document.createElement('div');
    elGrand.className = 'grand-pin-container';
    elGrand.innerHTML = '<div class="grand-pill">The Grand</div><div class="grand-marker-pin"></div>';
    new maplibregl.Marker({ element: elGrand, anchor: 'bottom' })
      .setLngLat(RESORT_COORDS)
      .addTo(map);

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

    return { success: true };
  });

  console.log('EXEC RES:', JSON.stringify(execRes, null, 2));

  await page.waitForTimeout(3000);

  // Take screenshot
  const locSec = await page.$('#locations-1');
  if (locSec) {
    await locSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await locSec.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/task3_verified_desktop_section.png' });
    console.log('Saved screenshot!');
  }

  await browser.close();
}

main();
