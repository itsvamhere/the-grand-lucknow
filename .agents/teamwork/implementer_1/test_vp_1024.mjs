import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const headerInfo = await page.evaluate(() => {
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    return {
      secHeight: sec ? sec.offsetHeight : null,
      maxScrollOfSec: sec ? sec.offsetHeight - window.innerHeight : null,
      pageHeight: document.documentElement.scrollHeight
    };
  });
  console.log('Header info at 1024x768:', headerInfo);

  const scrollPositions = [0, 2000, 4000, 5000, 5500, 5800, 6000, 6500, 6800, 7000];

  for (const y of scrollPositions) {
    await page.evaluate((sc) => window.scrollTo(0, sc), y);
    await page.waitForTimeout(50);

    const data = await page.evaluate(() => {
      const h1 = document.querySelector('.hidden-u6hac7 h1');
      const rect = h1 ? h1.getBoundingClientRect() : null;
      const letters = Array.from(document.querySelectorAll('.hidden-u6hac7 .grand-hero-letter'));
      return {
        h1Top: rect ? rect.top : null,
        h1Bottom: rect ? rect.bottom : null,
        isVisibleInViewport: rect ? (rect.bottom > 0 && rect.top < window.innerHeight) : false,
        firstLetter: letters[0] ? {
          opacity: window.getComputedStyle(letters[0]).opacity,
          transform: window.getComputedStyle(letters[0]).transform
        } : null
      };
    });

    console.log(`y = ${y}:`, JSON.stringify(data));
  }

  await browser.close();
}

test().catch(console.error);
