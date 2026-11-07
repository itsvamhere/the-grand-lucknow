import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testRapidScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Rapid scrub test: 0 -> 7200 -> 3000 -> 7200 -> 0 in rapid succession
  const scrubSteps = [0, 2000, 5000, 6800, 7150, 4000, 6900, 7150, 6500, 2000, 0];
  for (const y of scrubSteps) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    // minimal wait to simulate rapid wheel/touch scrub
    await page.waitForTimeout(20);
    const letterSummary = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('.hidden-u6hac7 .grand-hero-letter'));
      const ops = letters.map(l => parseFloat(l.style.opacity || '1'));
      return {
        y: window.scrollY,
        minOp: Math.min(...ops),
        maxOp: Math.max(...ops),
        avgOp: (ops.reduce((a, b) => a + b, 0) / ops.length).toFixed(2)
      };
    });
    console.log(`Scrub to y=${y} -> actual y=${letterSummary.y}, avgOp=${letterSummary.avgOp}`);
  }

  // Check final state at y=0
  await page.waitForTimeout(100);
  const finalState = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('.hidden-u6hac7 .grand-hero-letter'));
    return letters.map(l => ({
      char: l.innerText,
      op: l.style.opacity,
      tr: l.style.transform
    }));
  });

  const allReset = finalState.every(l => l.op === '1' && l.tr === 'none');
  console.log('Returned to y=0 all letters reset cleanly:', allReset);
  if (!allReset) {
    console.log('Unreset letters:', finalState.filter(l => l.op !== '1' || l.tr !== 'none'));
  }

  await browser.close();
}

testRapidScroll().catch(console.error);
