import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkLive() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  
  await page.screenshot({ path: 'tools/live_subpage_footer.png' });
  console.log('Saved tools/live_subpage_footer.png');
  
  // Also check home page footer on live
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'tools/live_home_footer.png' });
  console.log('Saved tools/live_home_footer.png');
  
  await browser.close();
}

checkLive().catch(console.error);
