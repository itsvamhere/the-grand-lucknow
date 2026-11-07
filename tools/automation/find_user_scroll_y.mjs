import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  for (let y = 3000; y <= 6000; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(50);
    const p6 = await page.evaluate(() => {
      const el = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const r = el ? el.getBoundingClientRect() : null;
      return r ? { top: Math.round(r.top), bottom: Math.round(r.bottom) } : null;
    });
    console.log(`y=${y}:`, p6);
  }
  await browser.close();
})();
