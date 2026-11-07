import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const fixedElements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*'))
      .filter(el => {
        const cs = window.getComputedStyle(el);
        return cs.position === 'fixed' || cs.position === 'sticky';
      })
      .map(el => ({
        tag: el.tagName,
        id: el.id,
        class: typeof el.className === 'string' ? el.className.slice(0, 40) : '',
        zIndex: window.getComputedStyle(el).zIndex,
        bg: window.getComputedStyle(el).backgroundColor,
        text: el.innerText ? el.innerText.slice(0, 50).replace(/\n/g, ' ') : ''
      }));
  });

  console.log(JSON.stringify(fixedElements, null, 2));
  await browser.close();
})();
