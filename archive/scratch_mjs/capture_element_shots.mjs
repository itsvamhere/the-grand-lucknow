import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://the-grand-lucknow.vercel.app/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1500);

  const card1 = page.locator('img[src*="card_1"]');
  await card1.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/card1_element_shot.png' });
  console.log('Saved card1_element_shot.png');

  const card3 = page.locator('img[src*="card_3"]');
  if (await card3.count()) {
    await card3.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/card3_element_shot.png' });
    console.log('Saved card3_element_shot.png');
  }

  await browser.close();
}

main().catch(console.error);
