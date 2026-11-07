import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'load' });
  await page.waitForTimeout(500);

  // In original Casa Momo, find gallery image 6 and letters
  for (let y of [5000, 5500, 6000, 6200, 6300, 6400, 6500, 6600, 6650, 6700, 6800, 7000]) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(50);
    const state = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const rect = p6 ? p6.getBoundingClientRect() : null;
      const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
      // In original Casa Momo, how is H1 structured?
      const spans = h1 ? Array.from(h1.querySelectorAll('span')) : [];
      return {
        y: window.scrollY,
        p6Bottom: rect ? Math.round(rect.bottom) : null,
        p6Top: rect ? Math.round(rect.top) : null,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        h1Opacity: h1 ? window.getComputedStyle(h1).opacity : null,
        h1Transform: h1 ? window.getComputedStyle(h1).transform : null,
        h1HTML: h1 ? h1.innerHTML.substring(0, 200) : null
      };
    });
    console.log(`Y=${y}:`, state);
  }

  // Find exact scroll Y where Photo 6 bottom <= 240
  let exitY = 6650;
  for (let y = 6000; y <= 7000; y += 25) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(10);
    const p6Bottom = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      return p6 ? Math.round(p6.getBoundingClientRect().bottom) : null;
    });
    if (p6Bottom !== null && p6Bottom <= 240) {
      exitY = y;
      console.log(`Casa Momo original: Photo 6 bottom = ${p6Bottom}px at Y = ${y}`);
      break;
    }
  }

  await page.evaluate(sc => window.scrollTo(0, sc), exitY);
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_4/orig_photo6_exit.png' });

  const exitMetrics = await page.evaluate(() => {
    const h1 = document.querySelector('[data-framer-name="Sticky Header Text"] h1');
    const spans = h1 ? Array.from(h1.querySelectorAll('span')) : [];
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      h1Visible: h1 ? h1.innerText : null,
      spanStyles: spans.slice(0, 10).map(s => ({ text: s.innerText, op: s.style.opacity, tr: s.style.transform }))
    };
  });
  console.log('Casa Momo original exit metrics at exitY:', exitMetrics);

  await browser.close();
}

run().catch(console.error);
