import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    // Find all spans inside h1
    const spans = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return Array.from(h1.querySelectorAll('*')).map(s => ({
        tag: s.tagName,
        className: s.className,
        style: s.getAttribute('style'),
        text: s.innerText
      }));
    });
    console.log('CASAMOMO H1 CHILDREN:', JSON.stringify(spans, null, 2));

    // Scroll down to 7200
    await page.evaluate(() => window.scrollTo(0, 7200));
    await page.waitForTimeout(500);

    const spansScrolled = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return Array.from(h1.querySelectorAll('*')).map(s => ({
        tag: s.tagName,
        className: s.className,
        style: s.getAttribute('style'),
        computedTransform: window.getComputedStyle(s).transform,
        computedOpacity: window.getComputedStyle(s).opacity
      }));
    });
    console.log('CASAMOMO H1 CHILDREN AT y=7200:', JSON.stringify(spansScrolled, null, 2));
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
