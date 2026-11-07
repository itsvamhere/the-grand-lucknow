import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifyNewImages() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3003...');
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  // 1. Screenshot Hero
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_hero_new_img.png' });
  console.log('Hero screenshot saved');

  // 2. Scroll to Venue Cards
  await page.evaluate(() => window.scrollTo(0, 2600));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_cards_new_img.png' });
  console.log('Cards 1-2 screenshot saved');

  // Scroll down more in cards
  await page.evaluate(() => window.scrollTo(0, 3700));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_cards_3_4_new_img.png' });
  console.log('Cards 3-4 screenshot saved');

  // 3. Scroll to Feature section
  await page.evaluate(() => window.scrollTo(0, 5200));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_feature_new_img.png' });
  console.log('Feature section screenshot saved');

  // 4. Scroll to Prefooter
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_prefooter_new_img.png' });
  console.log('Prefooter screenshot saved');

  await browser.close();
}

verifyNewImages().catch(console.error);
