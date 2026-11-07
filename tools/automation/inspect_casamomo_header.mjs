import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const headerHtml = await page.evaluate(() => {
    const h = document.querySelector('header');
    return h ? h.outerHTML.slice(0, 3000) : 'no header';
  });

  console.log(headerHtml);
  await browser.close();
})();
