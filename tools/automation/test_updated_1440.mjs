import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test1440() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const metrics = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"]');
    const r = p6.getBoundingClientRect();
    return {
      p6Top: Math.round(r.top + window.scrollY),
      p6Bottom: Math.round(r.bottom + window.scrollY)
    };
  });
  console.log('1440 metrics:', metrics);

  for (let y = metrics.p6Top; y <= metrics.p6Bottom; y += 100) {
    await page.evaluate((scrollY) => { window.scrollTo(0, scrollY); }, y);
    await page.waitForTimeout(60);
    
    const snap = await page.evaluate(() => {
      const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
        text: w.innerText,
        opacity: window.getComputedStyle(w).opacity,
        transform: window.getComputedStyle(w).transform
      }));
      const bg = window.getComputedStyle(document.body).backgroundColor;
      return {
        scrollY: window.scrollY,
        bg,
        words: words.slice(0, 3)
      };
    });
    console.log(`1440 y=${y}:`, JSON.stringify(snap));
  }

  await browser.close();
}

test1440().catch(console.error);
