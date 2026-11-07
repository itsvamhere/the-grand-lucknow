import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function tracePhoto6() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  for (let y = 5000; y <= 7200; y += 200) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(50);

    const pos = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const r = p6 ? p6.getBoundingClientRect() : null;
      return r ? { top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height) } : null;
    });

    console.log(`y=${y}: Photo 6 top=${pos?.top}, bottom=${pos?.bottom}`);
  }

  await browser.close();
}

tracePhoto6().catch(console.error);
