import fs from 'node:fs';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

async function renderMasterMap() {
  console.log('Reading user map style...');
  const style = JSON.parse(fs.readFileSync('tools/the_grand_lucknow_user_map_style.json', 'utf8'));

  console.log('Launching headless Chrome with deviceScaleFactor 2...');
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--ignore-certificate-errors', '--disable-web-security']
  });

  // Using 1920x1200 with deviceScaleFactor 2 captures a pristine 3840x2400 retina screenshot
  // while preserving the exact 5-10 km radius framing and typography proportions
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1200, deviceScaleFactor: 2 }
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />
      <script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
      <style>
        body, html, #map { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #FFF0CA; }
        .maplibregl-ctrl-bottom-left, .maplibregl-ctrl-bottom-right { display: none !important; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const style = ${JSON.stringify(style)};
        const map = new maplibregl.Map({
          container: 'map',
          style: style,
          center: [80.999, 26.620],
          zoom: 12.2,
          preserveDrawingBuffer: true,
          attributionControl: false
        });
        map.on('idle', () => {
          console.log('Map idle, ready to capture');
          window.mapReady = true;
        });
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  try {
    await page.waitForFunction(() => window.mapReady === true, { timeout: 20000 });
  } catch (e) {
    console.log('Wait timeout, proceeding:', e.message);
  }

  await page.waitForTimeout(1000);

  console.log('Capturing retina 3840x2400 screenshot...');
  const masterBuffer = await page.screenshot({ type: 'png' });
  await browser.close();

  console.log('Writing images/the_grand_lucknow_master_map.png (3840x2400)...');
  await sharp(masterBuffer)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile('images/the_grand_lucknow_master_map.png');

  console.log('Writing images/the_grand_lucknow_master_map_1920.png (1920x1200)...');
  await sharp(masterBuffer)
    .resize(1920, 1200)
    .png({ quality: 92, compressionLevel: 8 })
    .toFile('images/the_grand_lucknow_master_map_1920.png');

  console.log('Writing images/the_grand_lucknow_master_map.webp...');
  await sharp(masterBuffer)
    .webp({ quality: 90 })
    .toFile('images/the_grand_lucknow_master_map.webp');

  console.log('Successfully generated official master map from user JSON styling!');
}

renderMasterMap().catch(console.error);
