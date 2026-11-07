import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function takeSectionScreenshots() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Screenshot the 3 paragraphs at y = 7800
  await page.evaluate(() => window.scrollTo(0, 7800));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_estate_paragraphs.png' });

  // 2. Screenshot the big headline at y = 13200
  await page.evaluate(() => window.scrollTo(0, 13400));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_we_believe_clean.png' });

  console.log('Screenshots taken successfully.');
  await browser.close();
}

takeSectionScreenshots().catch(console.error);
