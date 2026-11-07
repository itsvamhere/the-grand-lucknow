import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testLawnEnd() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  for (const y of [0, 200, 1000, 3000, 6000, 6800, 7000, 7150, 7300]) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/lawn_${y}.png` });
  }

  await browser.close();
  console.log('Lawn screenshots taken!');
}

testLawnEnd().catch(console.error);
