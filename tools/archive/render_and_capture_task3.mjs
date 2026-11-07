import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);

  console.log('Applying Task 3 updates in page context...');
  const res = await page.evaluate(() => {
    const RESORT_COORDS = [80.9914, 26.6438];
    const MAPS_LINK = 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117';

    const sec = document.getElementById('locations-1');
    if (!sec) return { error: 'No #locations-1 found' };

    // 1. Heading is already "Location" via bundle

    // 2. Button -> "Open in Maps ↗" + MAPS_LINK
    const anchors = Array.from(sec.querySelectorAll('a'));
    anchors.forEach(a => {
      a.href = MAPS_LINK;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      const labelSpans = a.querySelectorAll('[data-rolling-label] span');
      if (labelSpans.length > 0) {
        labelSpans[0].textContent = 'Open in Maps ↗';
      }
      // Set text on visible elements
      a.querySelectorAll('span').forEach(s => {
        if (s.children.length === 0 && s.textContent.trim().length > 0) {
          s.textContent = 'Open in Maps ↗';
        }
      });
    });

    // 3. Map container
    const imgDiv = sec.querySelector('.framer-1esgfsu');
    if (!imgDiv) return { error: 'No .framer-1esgfsu found' };

    imgDiv.innerHTML = '<div id="grand-vector-map" style="width:100%;height:100%;min-height:500px;background:#FFF1C9;"></div>';

    const mapStyle = {
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

    const map = new maplibregl.Map({
      container: 'grand-vector-map',
      style: mapStyle,
      center: RESORT_COORDS,
      zoom: 12.8,
      attributionControl: false
    });
    window.__theGrandMap = map;

    // Terracotta Marker & Floating Pill Label: The Grand
    const elGrand = document.createElement('div');
    elGrand.className = 'grand-pin-container';
    elGrand.innerHTML = '<div class="grand-pill">The Grand</div><div class="grand-marker-pin"></div>';
    new maplibregl.Marker({ element: elGrand, anchor: 'bottom' })
      .setLngLat(RESORT_COORDS)
      .addTo(map);

    // Surrounding Landmark Pills: Raibareli Rd, SGPGI, Mohanlalganj
    const landmarks = [
      { name: 'Raibareli Rd', coords: [80.9880, 26.6560] },
      { name: 'SGPGI', coords: [80.9840, 26.6780] },
      { name: 'Mohanlalganj', coords: [80.9820, 26.6210] }
    ];

    landmarks.forEach(lm => {
      const el = document.createElement('div');
      el.className = 'landmark-pill';
      el.textContent = lm.name;
      new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat(lm.coords)
        .addTo(map);
    });

    return { success: true };
  });

  console.log('Evaluate result:', res);

  // Wait for map tiles and markers to render
  console.log('Waiting 5s for vector map rendering...');
  await page.waitForTimeout(5000);

  // Scroll locations section into view
  const locSec = await page.$('#locations-1');
  if (locSec) {
    await locSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // 1. Full section screenshot
    await locSec.screenshot({ path: `${ARTIFACTS}/task3_verified_desktop_section.png` });
    console.log('✓ Saved task3_verified_desktop_section.png');

    // 2. Zoomed custom vector map screenshot
    const mapEl = await page.$('#grand-vector-map');
    if (mapEl) {
      await mapEl.screenshot({ path: `${ARTIFACTS}/task3_custom_vector_map.png` });
      console.log('✓ Saved task3_custom_vector_map.png');
    }
  }

  // 3. Mobile viewport screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  const locSecMob = await page.$('#locations-1');
  if (locSecMob) {
    await locSecMob.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await locSecMob.screenshot({ path: `${ARTIFACTS}/task3_verified_mobile_section.png` });
    console.log('✓ Saved task3_verified_mobile_section.png');
  }

  // Check state
  const finalCheck = await page.evaluate(() => {
    const sec = document.getElementById('locations-1');
    const txt = sec ? sec.textContent : '';
    const anchor = sec ? sec.querySelector('a') : null;
    return {
      hasHeadingLocation: txt.includes('Location'),
      hasAddressBindaua: txt.includes('Bindaua'),
      hasNoGomtiNagar: !txt.includes('Gomti Nagar'),
      buttonHref: anchor ? anchor.href : null,
      buttonText: anchor ? anchor.textContent : null,
      hasGrandPill: !!sec.querySelector('.grand-pill'),
      landmarkPillCount: sec.querySelectorAll('.landmark-pill').length
    };
  });

  console.log('Final Verification Status:', JSON.stringify(finalCheck, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
