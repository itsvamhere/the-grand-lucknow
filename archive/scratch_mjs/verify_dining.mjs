import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifyDining() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 5200));
  await page.waitForTimeout(1500);

  const shot = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_dining_updated.png';
  await page.screenshot({ path: shot });
  console.log('Saved:', shot);

  await browser.close();
}

verifyDining().catch(console.error);
