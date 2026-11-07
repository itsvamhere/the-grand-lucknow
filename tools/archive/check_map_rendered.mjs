import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const mapInfo = await page.evaluate(() => {
    const mapEl = document.getElementById('grand-vector-map');
    const grandPill = document.querySelector('.grand-pill');
    const landmarks = Array.from(document.querySelectorAll('.landmark-pill')).map(el => el.textContent);
    const canvas = mapEl ? mapEl.querySelector('canvas') : null;
    return {
      mapElExists: !!mapEl,
      mapElDimensions: mapEl ? { w: mapEl.offsetWidth, h: mapEl.offsetHeight } : null,
      canvasExists: !!canvas,
      canvasDimensions: canvas ? { w: canvas.offsetWidth, h: canvas.offsetHeight } : null,
      grandPill: grandPill ? grandPill.textContent : null,
      landmarks: landmarks
    };
  });

  console.log('MAP INFO:', JSON.stringify(mapInfo, null, 2));
  await browser.close();
}

main();
