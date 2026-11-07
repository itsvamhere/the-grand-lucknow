import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const btnInfo = await page.evaluate(() => {
      const btn = document.querySelector('[data-framer-name="Sticky Button"]');
      if (!btn) return 'Not found';
      const cs = window.getComputedStyle(btn);
      return {
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        transform: cs.transform,
        rect: btn.getBoundingClientRect()
      };
    });
    console.log('LIVE CASAMOMO STICKY BTN AT BOTTOM:', btnInfo);
  } catch (e) {
    console.log('Error:', e.message);
  }
  await browser.close();
})();
