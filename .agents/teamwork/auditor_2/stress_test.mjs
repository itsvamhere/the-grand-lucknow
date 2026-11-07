import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testAdversarialStress() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await page.waitForTimeout(100);

  console.log('--- Stress Test 1: Rapid Erratic Scrolling ---');
  const scrollJumps = [0, 6500, 200, 7000, 3000, 6650, 0, 6700, 0];
  for (const y of scrollJumps) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);
  }
  // At 0 after erratic scrolling:
  const y0Final = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    return {
      allRestored: letters.every(l => l.style.opacity === '1' && (l.style.transform === 'none' || l.style.transform === '')),
      bg: window.getComputedStyle(document.body).backgroundColor
    };
  });
  console.log('After rapid erratic scrolling at y=0:', y0Final);
  if (!y0Final.allRestored || y0Final.bg !== 'rgb(14, 18, 1)') {
    throw new Error('Erratic scroll broke y=0 restoration!');
  }

  console.log('--- Stress Test 2: Window Resize Mid-Scroll ---');
  await page.evaluate(() => window.scrollTo(0, 6650));
  await page.waitForTimeout(20);
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(50);
  // Trigger scroll event on resize
  await page.evaluate(() => window.dispatchEvent(new Event('scroll')));
  await page.waitForTimeout(50);

  const resizeState = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    const allGone = letters.every(l => l.style.opacity === '0');
    const bg = window.getComputedStyle(document.body).backgroundColor;
    return { allGone, bg };
  });
  console.log('State after resize mid-scroll at y=6650:', resizeState);
  if (!resizeState.allGone || resizeState.bg !== 'rgb(255, 240, 202)') {
    throw new Error('Resize mid-scroll broke state!');
  }

  await browser.close();
  console.log('>>> STRESS TESTS PASSED <<<');
}

testAdversarialStress().catch(err => {
  console.error('Stress test failure:', err);
  process.exit(1);
});
