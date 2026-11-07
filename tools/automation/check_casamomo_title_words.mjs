import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    const titleWords = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const spans = Array.from(h1.querySelectorAll('span')).filter(s => s.innerText && (s.innerText.includes('Boutique') || s.innerText.includes('N°1')));
      return spans.map(s => {
        const r = s.getBoundingClientRect();
        return {
          text: s.innerText,
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
        };
      });
    });
    console.log('CASAMOMO TITLE WORDS:\n', JSON.stringify(titleWords, null, 2));
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
