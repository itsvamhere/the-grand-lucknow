import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    // Let's check how the hero title behaves as we scroll from y=0 to y=8000
    for (let y = 0; y <= 7000; y += 1000) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(200);

      const data = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const p6 = document.querySelector('[data-framer-name="Gallery Image 6"]');
        return {
          y: window.scrollY,
          h1Text: h1 ? h1.innerText : null,
          h1Opacity: h1 ? window.getComputedStyle(h1).opacity : null,
          h1Transform: h1 ? window.getComputedStyle(h1).transform : null,
          h1Rect: h1 ? h1.getBoundingClientRect() : null,
          p6Rect: p6 ? p6.getBoundingClientRect() : null
        };
      });
      console.log(`CASAMOMO at y=${y}:`, JSON.stringify(data));
    }
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
