import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function renderMaplibreDirect() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

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
    fetch('http://localhost:3003/grand_detailed_style.json')
      .then(r => r.json())
      .then(style => {
        const map = new maplibregl.Map({
          container: 'map',
          style: style,
          center: [80.9992764, 26.6355667],
          zoom: 13.8,
          attributionControl: false
        });
        map.on('load', () => {
          window.__mapLoaded = true;
        });
        map.on('idle', () => {
          window.__mapIdle = true;
        });
      })
      .catch(e => {
        console.error(e);
        window.__mapError = e.message;
      });
  </script>
</body>
</html>`);

  console.log('Waiting for MapLibre map to load and become idle...');
  await page.waitForFunction(() => window.__mapIdle === true || window.__mapLoaded === true, { timeout: 20000 })
    .catch(() => console.log('Timeout waiting for idle, proceeding anyway...'));
  
  await page.waitForTimeout(2500);

  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_maplibre_lucknow_render.png'
  });
  console.log('Saved proof_maplibre_lucknow_render.png');

  await browser.close();
}

renderMaplibreDirect().catch(console.error);
