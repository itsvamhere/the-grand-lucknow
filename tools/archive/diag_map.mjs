import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const diag = await page.evaluate(() => {
    return {
      hasMaplibre: typeof window.maplibregl !== 'undefined',
      grandVectorMapEl: !!document.getElementById('grand-vector-map'),
      grandMapInitialized: window.__grandMapInitialized,
      grandMapLoaded: window.__grandMapLoaded,
      mapVar: !!window.__theGrandMap
    };
  });

  console.log('DIAG:', JSON.stringify(diag, null, 2));
  await browser.close();
}

main();
