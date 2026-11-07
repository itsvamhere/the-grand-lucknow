import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const headerHeight = await page.evaluate(() => {
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    return sec ? sec.offsetHeight : null;
  });
  console.log('Original headerSec height at 1440x900:', headerHeight);

  // Let's find where letters start animating
  const animRanges = await page.evaluate(async (maxH) => {
    const h1 = document.querySelector('.hidden-u6hac7 h1') || document.querySelector('h1');
    const spans = Array.from(h1.querySelectorAll('span'));
    const results = [];
    for (let y = maxH - 2000; y <= maxH; y += 50) {
      window.scrollTo(0, y);
      await new Promise(r => requestAnimationFrame(r));
      const styles = spans.map(s => ({
        text: s.innerText,
        transform: s.style.transform || window.getComputedStyle(s).transform,
        opacity: s.style.opacity || window.getComputedStyle(s).opacity
      })).filter(s => s.text && s.text.length === 1);
      
      const moved = styles.filter(s => s.opacity !== '1' || (s.transform && s.transform !== 'none' && s.transform !== 'matrix(1, 0, 0, 1, 0, 0)'));
      if (moved.length > 0) {
        results.push({ y, movedCount: moved.length, sample: moved[0] });
      }
    }
    return results;
  }, headerHeight);

  console.log('Letters anim range in original:', JSON.stringify(animRanges.slice(0, 5), null, 2));
  console.log('Total steps where letters moved:', animRanges.length);
  if (animRanges.length > 0) {
    console.log('First step:', animRanges[0]);
    console.log('Last step:', animRanges[animRanges.length - 1]);
  }

  await browser.close();
}

test().catch(console.error);
