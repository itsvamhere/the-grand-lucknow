import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const h1 = document.querySelector('.hidden-u6hac7 h1');
    const wordSpans = Array.from(h1.querySelectorAll(':scope > span'));
    return wordSpans.map(w => {
      const rect = w.getBoundingClientRect();
      const letters = Array.from(w.querySelectorAll('.grand-hero-letter')).map(l => {
        const lRect = l.getBoundingClientRect();
        return { char: l.innerText, top: lRect.top, bottom: lRect.bottom, height: lRect.height };
      });
      return {
        text: w.innerText,
        style: w.getAttribute('style'),
        rect: { top: rect.top, bottom: rect.bottom, height: rect.height },
        letters
      };
    });
  });

  console.log('Word spans at y=0:', JSON.stringify(res, null, 2));
  await browser.close();
}

test().catch(console.error);
