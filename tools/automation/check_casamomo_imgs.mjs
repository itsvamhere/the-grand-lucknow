import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    const imgs = await page.evaluate(() => {
      const p = document.querySelectorAll('[data-framer-name^="Gallery Image"] img');
      return Array.from(p).map(img => {
        const r = img.getBoundingClientRect();
        return {
          alt: img.getAttribute('alt'),
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
        };
      });
    });
    console.log('CASAMOMO GALLERY <img> RECTS:\n', JSON.stringify(imgs, null, 2));
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
