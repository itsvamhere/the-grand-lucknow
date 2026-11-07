import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQ FAILED:', req.url()));

  await page.goto('http://localhost:3003/tools/test_vector_map.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const mapInfo = await page.evaluate(() => {
    return {
      mapLoaded: window.map ? window.map.loaded() : 'no map object',
      canvasCount: document.querySelectorAll('canvas').length,
      markers: document.querySelectorAll('.grand-pin-container, .landmark-pill').length
    };
  });

  console.log('Map info:', mapInfo);
  await browser.close();
}

main().catch(console.error);
