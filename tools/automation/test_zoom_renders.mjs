import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testZooms() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  for (const z of [15.0, 15.4, 15.8]) {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1200 },
      deviceScaleFactor: 1
    });

    await page.setContent(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />
  <script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { width: 100%; height: 100%; overflow: hidden; background: #FFF0CA; }
    #map { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    fetch('http://localhost:3003/casamomo_lucknow_style.json')
      .then(r => r.json())
      .then(style => {
        const map = new maplibregl.Map({
          container: 'map',
          style: style,
          center: [80.9992764, 26.6355667],
          zoom: ${z},
          attributionControl: false
        });
        map.on('idle', () => { window.__mapIdle = true; });
      });
  </script>
</body>
</html>`);

    console.log(`Rendering zoom ${z}...`);
    await page.waitForFunction(() => window.__mapIdle === true, { timeout: 35000 }).catch(() => {});
    await page.waitForTimeout(2000);

    const outPath = `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/test_zoom_${z}.png`;
    await page.screenshot({ path: outPath });
    console.log('Saved', outPath);
    await page.close();
  }

  await browser.close();
}

testZooms().catch(console.error);
