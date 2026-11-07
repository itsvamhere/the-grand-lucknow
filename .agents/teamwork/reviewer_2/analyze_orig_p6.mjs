import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function analyzeOrigAtPhoto6() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  // Looking at the user's browser, window size is approx 1366 x 768 or 1440 x 900
  // Note in the screenshot the taskbar is at bottom, tab bar at top. Viewport is ~1366x650 or ~1440x800.
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });

  // Let's find Photo 6 rect as we scroll
  for (let y = 5000; y <= 7500; y += 200) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(50);

    const data = await page.evaluate(() => {
      // Photo 6 / gallery image 6
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const p6Rect = p6 ? p6.getBoundingClientRect() : null;

      // Letters state
      const h1 = document.querySelector('.hidden-u6hac7 h1') || document.querySelector('h1');
      const spans = Array.from(h1 ? h1.querySelectorAll('span') : []);
      const letters = spans.filter(s => s.innerText && s.innerText.length === 1 && !s.style.clipPath);
      const letterStyles = letters.map(s => ({
        c: s.innerText,
        op: s.style.opacity || window.getComputedStyle(s).opacity,
        tr: s.style.translate || s.style.transform || window.getComputedStyle(s).transform
      }));

      // Background color
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;

      return {
        p6Top: p6Rect ? Math.round(p6Rect.top) : null,
        p6Bottom: p6Rect ? Math.round(p6Rect.bottom) : null,
        bodyBg,
        lettersCount: letterStyles.length,
        allLettersRolledOut: letterStyles.every(l => l.tr && (l.tr.includes('-115%') || l.op === '0')),
        sampleLetter: letterStyles[letterStyles.length - 1]
      };
    });

    console.log(`y=${y}: p6Top=${data.p6Top}, p6Bottom=${data.p6Bottom}, bg=${data.bodyBg}, rolledOut=${data.allLettersRolledOut}, lastLetter=${JSON.stringify(data.sampleLetter)}`);
  }

  await browser.close();
}

analyzeOrigAtPhoto6().catch(console.error);
