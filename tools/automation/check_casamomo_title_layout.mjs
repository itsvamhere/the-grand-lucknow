import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    const layout = await page.evaluate(() => {
      const headerText = document.querySelector('[data-framer-name="Sticky Header Text"]');
      const h1 = document.querySelector('h1');
      const gallery = document.querySelector('[data-framer-name="Gallery"]');
      const csHeader = window.getComputedStyle(headerText);
      const csH1 = window.getComputedStyle(h1);
      return {
        headerRect: headerText.getBoundingClientRect(),
        headerWidth: csHeader.width,
        headerLeft: csHeader.left,
        h1Rect: h1.getBoundingClientRect(),
        h1Width: csH1.width,
        h1TextAlign: csH1.textAlign,
        h1FlexDirection: csH1.flexDirection,
        h1Display: csH1.display,
        galleryRect: gallery ? gallery.getBoundingClientRect() : null
      };
    });
    console.log('CASAMOMO TITLE & GALLERY LAYOUT:\n', JSON.stringify(layout, null, 2));
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
