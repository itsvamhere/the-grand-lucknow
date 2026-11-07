import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.screenshot({ path: `${ARTIFACTS}/venue_open_earth_lawn_hero.png` });

  // Scroll down to venue details
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${ARTIFACTS}/venue_open_earth_lawn_details.png` });

  await browser.close();
  console.log('Captured venue_open_earth_lawn_hero.png and details.png');
}

main().catch(console.error);
