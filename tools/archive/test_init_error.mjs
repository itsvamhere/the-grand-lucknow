import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const testInit = await page.evaluate(() => {
    try {
      const RESORT_COORDS = [80.9914, 26.6438];
      const mapStyle = {
        version: 8,
        sources: {
          openmaptiles: {
            type: 'vector',
            url: 'https://tiles.openfreemap.org/planet'
          }
        },
        layers: [
          { id: 'background', type: 'background', paint: { 'background-color': '#FFF1C9' } }
        ]
      };

      const m = new maplibregl.Map({
        container: 'grand-vector-map',
        style: mapStyle,
        center: RESORT_COORDS,
        zoom: 12.8,
        attributionControl: false
      });
      return { success: true };
    } catch (e) {
      return { error: e.message, stack: e.stack };
    }
  });

  console.log('TEST INIT:', JSON.stringify(testInit, null, 2));
  await page.waitForTimeout(2000);

  const canvasCheck = await page.evaluate(() => {
    const el = document.getElementById('grand-vector-map');
    const c = el ? el.querySelector('canvas') : null;
    return { hasCanvas: !!c };
  });
  console.log('CANVAS CHECK:', canvasCheck);

  await browser.close();
}

main();
