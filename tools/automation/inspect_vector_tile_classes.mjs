import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkClasses() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });

  await page.setContent(`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />
  <script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
</head>
<body>
  <div id="map" style="width:1000px;height:1000px;"></div>
  <script>
    fetch('http://localhost:3003/casamomo_lucknow_style.json')
      .then(r => r.json())
      .then(style => {
        const map = new maplibregl.Map({
          container: 'map',
          style: style,
          center: [80.9992764, 26.6355667],
          zoom: 14.85
        });
        map.on('idle', () => {
          const features = map.querySourceFeatures('openmaptiles', { sourceLayer: 'transportation' });
          const classes = {};
          features.forEach(f => {
            const c = f.properties.class || 'unknown';
            const sc = f.properties.subclass || 'none';
            const k = c + ' (' + sc + ')';
            classes[k] = (classes[k] || 0) + 1;
          });
          window.__classes = classes;
          window.__count = features.length;
          window.__done = true;
        });
      });
  </script>
</body>
</html>`);

  await page.waitForFunction(() => window.__done === true, { timeout: 35000 });
  const count = await page.evaluate(() => window.__count);
  const classes = await page.evaluate(() => window.__classes);
  console.log('Total transportation features in vector tiles:', count);
  console.log('Classes found in vector tiles:', JSON.stringify(classes, null, 2));
  await browser.close();
}

checkClasses().catch(console.error);
