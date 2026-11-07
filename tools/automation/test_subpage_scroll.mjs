import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  const info = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"]');
    const p6Rect = p6 ? p6.getBoundingClientRect() : null;
    const headerSec = document.querySelector('section#apartment-header, .framer-151qtkn');
    const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
    const words = document.querySelectorAll('.grand-hero-word');
    
    return {
      docHeight: document.documentElement.scrollHeight,
      p6Top: p6Rect ? Math.round(p6Rect.top + window.scrollY) : null,
      p6Bottom: p6Rect ? Math.round(p6Rect.bottom + window.scrollY) : null,
      headerSecH: headerSec ? headerSec.offsetHeight : null,
      wordsCount: words.length
    };
  });
  console.log('Page info:', info);

  const p6Top = info.p6Top || 5000;
  
  const testScrolls = [
    0,
    p6Top - 1000,
    p6Top - 500,
    p6Top - 200,
    p6Top,
    p6Top + 200,
    p6Top + 500,
    p6Top + 800,
    p6Top + 1200
  ];

  for (let i = 0; i < testScrolls.length; i++) {
    const y = testScrolls[i];
    await page.evaluate((scrollY) => {
      window.scrollTo(0, scrollY);
    }, y);
    await page.waitForTimeout(100);
    
    const state = await page.evaluate(() => {
      const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
      const stickyHeader = document.querySelector('[data-framer-name="Sticky Header Text"]');
      const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
        text: w.innerText,
        opacity: window.getComputedStyle(w).opacity,
        transform: window.getComputedStyle(w).transform
      }));
      return {
        scrollY: window.scrollY,
        stickyHeaderDisplay: stickyHeader ? window.getComputedStyle(stickyHeader).display : null,
        words
      };
    });
    console.log(`At scrollY = ${y}:`, JSON.stringify(state));
    await page.screenshot({ path: `scripts/lawn_scroll_${i}_y${y}.png` });
  }

  await browser.close();
}

test().catch(console.error);
