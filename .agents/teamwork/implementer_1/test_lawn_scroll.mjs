import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const scrollPositions = [0, 500, 1000, 3000, 5000, 6000, 6500, 6800, 7000, 7200, 7500];

  for (const y of scrollPositions) {
    await page.evaluate((sc) => window.scrollTo(0, sc), y);
    await page.waitForTimeout(100);

    const data = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('.hidden-u6hac7 .grand-hero-letter'));
      return {
        count: letters.length,
        first3: letters.slice(0, 3).map(l => ({
          char: l.innerText,
          opacity: window.getComputedStyle(l).opacity,
          transform: window.getComputedStyle(l).transform
        })),
        last3: letters.slice(-3).map(l => ({
          char: l.innerText,
          opacity: window.getComputedStyle(l).opacity,
          transform: window.getComputedStyle(l).transform
        }))
      };
    });

    console.log(`y = ${y}:`, JSON.stringify(data));
  }

  await browser.close();
}

test().catch(console.error);
