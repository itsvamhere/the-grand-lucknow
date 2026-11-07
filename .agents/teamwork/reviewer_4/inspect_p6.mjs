import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });

  const t0 = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    const rect = p6 ? p6.getBoundingClientRect() : null;
    return {
      rect: rect ? { top: rect.top, bottom: rect.bottom, height: rect.height } : null,
      scrollY: window.scrollY,
      vh: window.innerHeight,
      p6DocBottom: rect ? rect.bottom + window.scrollY : null
    };
  });
  console.log('t=0 (Y=0):', t0);

  for (let y of [5000, 5500, 6000, 6300, 6400, 6500, 6650, 7000]) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);
    const atY = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const rect = p6 ? p6.getBoundingClientRect() : null;
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      const animating = letters.filter(l => l.style.opacity !== '' && l.style.opacity !== '1' && l.style.opacity !== '0');
      const zeroOp = letters.filter(l => l.style.opacity === '0');
      return {
        y: window.scrollY,
        p6Bottom: rect ? Math.round(rect.bottom) : null,
        p6DocBottom: rect ? Math.round(rect.bottom + window.scrollY) : null,
        lettersZero: zeroOp.length,
        lettersAnimating: animating.length,
        bodyBg: window.getComputedStyle(document.body).backgroundColor
      };
    });
    console.log(`Y=${y}:`, atY);
  }

  // Also test at 1366x768 (auditor viewport)
  console.log('\n--- Auditor Viewport 1366x768 ---');
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });

  for (let y of [5000, 5500, 6000, 6300, 6400, 6500, 6650, 7000]) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);
    const atY = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const rect = p6 ? p6.getBoundingClientRect() : null;
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      const zeroOp = letters.filter(l => l.style.opacity === '0');
      return {
        y: window.scrollY,
        p6Bottom: rect ? Math.round(rect.bottom) : null,
        lettersZero: zeroOp.length,
        bodyBg: window.getComputedStyle(document.body).backgroundColor
      };
    });
    console.log(`Y=${y}:`, atY);
  }

  await browser.close();
}

run().catch(console.error);
