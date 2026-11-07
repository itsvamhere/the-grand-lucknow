import { chromium } from 'playwright-core';

async function checkLive() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Checking https://the-grand-lucknow.vercel.app ...');
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'tools/live_prod_home_top.png' });
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'tools/live_prod_home_bottom.png' });

  console.log('Checking https://the-grand-lucknow.vercel.app/venues/open-earth-lawn ...');
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'tools/live_prod_lawn_top.png' });
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'tools/live_prod_lawn_bottom.png' });

  await browser.close();
  console.log('Done screenshots of live production.');
}

checkLive().catch(console.error);
