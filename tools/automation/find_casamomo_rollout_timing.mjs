import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    for (let y = 4500; y <= 7500; y += 250) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(100);

      const data = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const p6 = document.querySelector('[data-framer-name="Gallery Image 6"]');
        const firstLetter = h1?.querySelector('span[style*="translate"]');
        const anyTransformed = Array.from(h1?.querySelectorAll('span') || []).some(s => {
          const st = s.getAttribute('style') || '';
          return st.includes('-115%') || st.includes('translateY(-') || st.includes('rotate(-');
        });
        return {
          y: window.scrollY,
          p6Top: p6 ? Math.round(p6.getBoundingClientRect().top) : null,
          p6Bottom: p6 ? Math.round(p6.getBoundingClientRect().bottom) : null,
          anyTransformed,
          firstLetterStyle: firstLetter ? firstLetter.getAttribute('style') : null
        };
      });
      console.log(`y=${y}:`, JSON.stringify(data));
    }
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
