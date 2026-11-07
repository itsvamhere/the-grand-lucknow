import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function exportCleanMap() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 3840, height: 2400 },
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
          zoom: 14.85,
          attributionControl: false
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

  console.log('Rendering 3840x2400 high-res vector map at zoom 14.85 (Maximized Details)...');
  await page.waitForFunction(() => window.__mapIdle === true, { timeout: 45000 })
    .catch(() => console.log('Timeout waiting for idle, taking shot...'));

  await page.waitForTimeout(3500);

  const outPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_carto_base.png';
  await page.screenshot({ path: outPath });
  console.log('Saved base map to', outPath);

  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_carto_base.png'
  });

  await browser.close();
}

exportCleanMap().catch(console.error);
