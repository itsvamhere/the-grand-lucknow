import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function captureBtn() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const btn = await page.$('.framer-18mvsw1-container a');
  if (btn) {
    await btn.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_2/lawn_book_now_fixed.png' });
    console.log('Saved lawn_book_now_fixed.png');
  }

  // Also capture full navbar & hero at 1024x768 to match media_1793859280171_e667e7a9.png
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_2/lawn_hero_1024_fixed.png' });
  console.log('Saved lawn_hero_1024_fixed.png');

  await browser.close();
}

captureBtn().catch(console.error);
