import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });

  for (let vp of [
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1024, height: 768 },
    { width: 810, height: 1080 },
    { width: 390, height: 844 }
  ]) {
    await page.setViewportSize(vp);
    await page.waitForTimeout(50);
    const m = await page.evaluate(() => {
      const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const rect = p6 ? p6.getBoundingClientRect() : null;
      const secH = sec ? sec.offsetHeight : 0;
      const vh = window.innerHeight;
      const scrollMax = Math.max(1000, secH - vh);
      const p6DocBottom = rect ? Math.round(rect.bottom + window.scrollY) : 0;
      return { vp: { width: window.innerWidth, height: vh }, secH, scrollMax, p6DocBottom };
    });
    console.log(m);
  }
  await browser.close();
}

run().catch(console.error);
