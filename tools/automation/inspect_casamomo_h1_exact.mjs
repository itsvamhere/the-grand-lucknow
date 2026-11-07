import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    const h1Outer = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return {
        outerHTML: h1 ? h1.outerHTML : null,
        parentHTML: h1?.parentElement ? h1.parentElement.outerHTML.slice(0, 500) : null,
        computed: {
          fontSize: window.getComputedStyle(h1).fontSize,
          lineHeight: window.getComputedStyle(h1).lineHeight,
          flexDirection: window.getComputedStyle(h1).flexDirection,
          flexWrap: window.getComputedStyle(h1).flexWrap,
          justifyContent: window.getComputedStyle(h1).justifyContent,
          alignItems: window.getComputedStyle(h1).alignItems
        }
      };
    });
    console.log('CASAMOMO H1 AT 1024x576:\n', JSON.stringify(h1Outer, null, 2));
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
