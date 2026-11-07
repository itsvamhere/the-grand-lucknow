import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testMobile() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    const secH = sec ? sec.offsetHeight : null;
    const vh = window.innerHeight;
    const scrollMax = secH - vh;

    // Check which h1 is visible on mobile
    const h1s = Array.from(document.querySelectorAll('h1')).map(h => ({
      text: h.textContent.replace(/\s+/g, ' ').trim(),
      parentClass: h.parentElement.className,
      grandParentClass: h.parentElement.parentElement.className,
      visible: window.getComputedStyle(h).display !== 'none' && window.getComputedStyle(h.parentElement).display !== 'none',
      lettersCount: h.querySelectorAll('.grand-hero-letter').length
    }));

    return { secH, vh, scrollMax, h1s };
  });

  console.log('Mobile Check:', JSON.stringify(res, null, 2));

  // Test scroll stepping on mobile
  if (res.scrollMax > 0) {
    for (let p of [0, 0.5, 0.85, 0.95, 1.0]) {
      const y = Math.round(res.scrollMax * p);
      await page.evaluate(sc => window.scrollTo(0, sc), y);
      await page.waitForTimeout(50);
      const letterState = await page.evaluate(() => {
        const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => {
          const comp = window.getComputedStyle(l);
          return comp.display !== 'none';
        });
        return {
          total: letters.length,
          firstChar: letters[0] ? {
            char: letters[0].innerText,
            op: letters[0].style.opacity,
            tr: letters[0].style.transform
          } : null,
          lastChar: letters[letters.length - 1] ? {
            char: letters[letters.length - 1].innerText,
            op: letters[letters.length - 1].style.opacity,
            tr: letters[letters.length - 1].style.transform
          } : null
        };
      });
      console.log(`Mobile p=${p} (y=${y}):`, JSON.stringify(letterState));
    }
  }

  await browser.close();
}

testMobile().catch(console.error);
