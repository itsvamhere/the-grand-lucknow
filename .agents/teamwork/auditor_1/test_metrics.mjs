import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await page.waitForTimeout(500);

  const metrics = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    const rect = p6 ? p6.getBoundingClientRect() : null;
    const vh = window.innerHeight;
    const p6DocBottom = rect ? Math.round(rect.bottom + window.scrollY) : null;
    const rolloutStart = Math.round(p6DocBottom - vh * 0.9);
    const rolloutEnd = Math.round(p6DocBottom + 10);
    return { p6DocBottom, vh, rolloutStart, rolloutEnd, rolloutSpan: rolloutEnd - rolloutStart };
  });

  console.log('Metrics at 1440x900:', metrics);

  // Test scroll at various points
  const points = [
    0,
    metrics.rolloutStart - 50,
    metrics.rolloutStart + 100,
    Math.round((metrics.rolloutStart + metrics.rolloutEnd) / 2),
    metrics.rolloutEnd,
    metrics.rolloutEnd + 50
  ];

  for (const y of points) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(50);
    const state = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      const ops = letters.map(l => parseFloat(l.style.opacity || '1'));
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const isLight = document.body.classList.contains('is-light-theme');
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const p6Rect = p6 ? p6.getBoundingClientRect() : null;
      return {
        y: Math.round(window.scrollY),
        minOp: Math.min(...ops),
        maxOp: Math.max(...ops),
        avgOp: (ops.reduce((a,b)=>a+b, 0) / ops.length).toFixed(3),
        allZero: ops.every(o => o === 0),
        allOne: ops.every(o => o === 1),
        bodyBg,
        isLight,
        p6BottomOnScreen: p6Rect ? Math.round(p6Rect.bottom) : null
      };
    });
    console.log(`Scroll Y=${y}:`, state);
  }

  await browser.close();
}

test().catch(console.error);
