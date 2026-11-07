import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    const images = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('[data-framer-name^="Gallery Image"]'));
      return items.map(img => {
        const r = img.getBoundingClientRect();
        return {
          name: img.getAttribute('data-framer-name'),
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
          alignSelf: window.getComputedStyle(img).alignSelf,
          margin: window.getComputedStyle(img).margin
        };
      });
    });
    console.log('CASAMOMO GALLERY IMAGES:\n', JSON.stringify(images, null, 2));
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
