import { chromium } from 'playwright-core';

async function checkLive() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Checking live https://the-grand-lucknow.vercel.app ...');
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'tools/prod_live_home_top.png' });
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'tools/prod_live_home_bottom.png' });

  console.log('Checking live https://the-grand-lucknow.vercel.app/venues/open-earth-lawn ...');
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'tools/prod_live_lawn_top.png' });
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'tools/prod_live_lawn_bottom.png' });

  // Mobile check
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: 'tools/prod_live_lawn_mobile_footer.png' });

  await browser.close();
  console.log('Live production screenshots captured successfully!');
}

checkLive().catch(console.error);
