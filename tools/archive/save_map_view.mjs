import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);
  
  const mapEl = await page.$('#grand-vector-map');
  if (mapEl) {
    await mapEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await mapEl.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/current_map_inspection.png' });
    console.log('Saved current_map_inspection.png');
  }
  await browser.close();
}

main();
