import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    for (let y = 6500; y <= 8000; y += 200) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(100);

      const data = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const headerText = document.querySelector('[data-framer-name="Sticky Header Text"]');
        return {
          y: window.scrollY,
          h1Opacity: h1 ? window.getComputedStyle(h1).opacity : null,
          h1Transform: h1 ? window.getComputedStyle(h1).transform : null,
          headerOpacity: headerText ? window.getComputedStyle(headerText).opacity : null,
          headerTransform: headerText ? window.getComputedStyle(headerText).transform : null
        };
      });
      console.log(`y=${y}:`, JSON.stringify(data));
    }
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
