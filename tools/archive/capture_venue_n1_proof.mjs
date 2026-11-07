import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000/venues/venue-n1 ...');
  await page.goto('http://localhost:3000/venues/venue-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take hero screenshot
  await page.screenshot({ path: `${ARTIFACTS}/venue_n1_current_hero.png` });
  console.log('Saved hero screenshot');

  // Scroll down and screenshot specs / middle
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${ARTIFACTS}/venue_n1_current_middle.png` });
  console.log('Saved middle screenshot');

  // Scroll down to bottom
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${ARTIFACTS}/venue_n1_current_bottom.png` });
  console.log('Saved bottom screenshot');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
