import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testReverse() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await page.waitForTimeout(500);

  // 1. Scroll down to rolloutEnd + 100
  await page.evaluate(() => window.scrollTo(0, 7300));
  await page.waitForTimeout(100);

  const atBottom = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    const ops = letters.map(l => parseFloat(l.style.opacity || '1'));
    return {
      allZero: ops.every(o => o === 0),
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      isLight: document.body.classList.contains('is-light-theme')
    };
  });
  console.log('At bottom Y=7300:', atBottom);

  // 2. Scroll reverse back to 0
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  const backAtTop = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    const ops = letters.map(l => parseFloat(l.style.opacity || '1'));
    const transforms = letters.map(l => l.style.transform);
    return {
      count: letters.length,
      allOne: ops.every(o => o === 1),
      allNoneTransform: transforms.every(t => t === 'none' || t === ''),
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      isLight: document.body.classList.contains('is-light-theme')
    };
  });
  console.log('After reverse scroll back to Y=0:', backAtTop);

  if (!backAtTop.allOne) throw new Error('Not all letters restored to opacity 1!');
  if (!backAtTop.allNoneTransform) throw new Error('Not all letters restored transform!');
  if (backAtTop.bodyBg !== 'rgb(14, 18, 1)') throw new Error('Background color not dark rgb(14, 18, 1)!');
  if (backAtTop.isLight) throw new Error('is-light-theme still active!');

  console.log('PASS: Reverse scroll cleanly and completely restored all letters and dark background.');
  await browser.close();
}

testReverse().catch(err => {
  console.error('FAIL:', err);
  process.exit(1);
});
