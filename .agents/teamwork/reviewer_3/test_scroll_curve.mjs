import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });

  // Probe scroll points from 0 to 8000 in steps of 200
  const results = [];
  for (let y = 0; y <= 8000; y += 200) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);

    const data = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      const visibleLetters = letters.filter(l => l.style.opacity !== '0' && l.style.opacity !== '');
      const zeroOpCount = letters.filter(l => l.style.opacity === '0').length;
      const oneOpCount = letters.filter(l => l.style.opacity === '1' || l.style.opacity === '').length;
      const bg = window.getComputedStyle(document.body).backgroundColor;
      const isLight = document.body.classList.contains('is-light-theme');
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const p6Rect = p6 ? p6.getBoundingClientRect() : null;

      return {
        totalLetters: letters.length,
        zeroOpCount,
        oneOpCount,
        animatingCount: letters.length - zeroOpCount - oneOpCount,
        bg,
        isLight,
        p6Bottom: p6Rect ? Math.round(p6Rect.bottom) : null
      };
    });

    results.push({ y, ...data });
  }

  console.table(results.filter(r => r.y >= 5800 && r.y <= 7400));
  await browser.close();
}

main().catch(console.error);
