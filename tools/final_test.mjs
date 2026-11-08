import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  // Desktop
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await desktop.waitForTimeout(500);
  await desktop.screenshot({ path: 'tools/final_desktop_verified.png' });
  console.log('Saved tools/final_desktop_verified.png');

  // Mobile
  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobile.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await mobile.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobile.waitForTimeout(500);
  await mobile.screenshot({ path: 'tools/final_mobile_verified.png' });
  console.log('Saved tools/final_mobile_verified.png');

  await browser.close();
}

test().catch(console.error);
