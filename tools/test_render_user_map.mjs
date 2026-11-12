import fs from 'node:fs';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

async function main() {
  const style = JSON.parse(fs.readFileSync('tools/the_grand_lucknow_user_map_style.json', 'utf8'));

  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--ignore-certificate-errors', '--disable-web-security']
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1200 }
  });

  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err));

  // The Grand Lucknow center:
  // Coordinates near Mohanlalganj / Bindaua on NH30
  // Lat: 26.635, Lon: 80.999
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
          center: [80.999, 26.635],
          zoom: 13.5,
          attributionControl: false
        });
        map.on('load', () => {
          console.log('Map loaded at zoom 13.5');
          // Wait for tiles to fully render
          map.once('idle', () => {
            console.log('Map idle!');
            window.mapReady = true;
          });
        });
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  try {
    await page.waitForFunction(() => window.mapReady === true, { timeout: 15000 });
  } catch (e) {
    console.log('Timeout waiting for idle, continuing:', e.message);
  }

  await page.waitForTimeout(2000);

  const shotBuffer = await page.screenshot({ type: 'png' });
  await sharp(shotBuffer).toFile('tools/proofs/test_user_map_z135.png');
  console.log('Saved tools/proofs/test_user_map_z135.png');

  await browser.close();
}

main().catch(console.error);
