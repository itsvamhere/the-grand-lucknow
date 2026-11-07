import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testOrigEnd() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  for (const y of [6000, 6500, 6800, 7000, 7200, 7400]) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/implementer_1/orig_${y}.png` });
  }

  await browser.close();
  console.log('End screenshots taken!');
}

testOrigEnd().catch(console.error);
