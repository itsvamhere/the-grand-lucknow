import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll to Location section
  const locSec = await page.$('#locations-1');
  if (locSec) {
    await locSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);

    // Capture the entire location info block / viewport containing the button
    await page.screenshot({
      path: `${ARTIFACTS}/home_location_single_arrow.png`,
      fullPage: false
    });
    console.log('✓ Captured full viewport of location section at home_location_single_arrow.png');
  }

  await browser.close();
}

main().catch(console.error);
