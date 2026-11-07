import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  for (let y = 6500; y <= 7600; y += 150) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);

    const data = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
        text: w.innerText,
        transform: w.style.transform,
        opacity: w.style.opacity
      }));
      return {
        y: window.scrollY,
        p6Top: p6 ? Math.round(p6.getBoundingClientRect().top) : null,
        p6Bottom: p6 ? Math.round(p6.getBoundingClientRect().bottom) : null,
        words: words.slice(0, 3)
      };
    });
    console.log(`y=${y}:`, JSON.stringify(data));
  }
  await browser.close();
})();
