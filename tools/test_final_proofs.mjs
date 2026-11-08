import { chromium } from 'playwright-core';

async function testMobileAndDesktop() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Mobile 375
  const pageM = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await pageM.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageM.waitForTimeout(2000);
  await pageM.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await pageM.waitForTimeout(1500);

  const footerM = await pageM.$('footer');
  if (footerM) {
    await footerM.screenshot({ path: 'tools/final_mobile_footer.png' });
    console.log('Saved tools/final_mobile_footer.png');
  }

  // 2. Desktop 1440
  const pageD = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageD.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageD.waitForTimeout(2000);
  await pageD.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await pageD.waitForTimeout(1500);

  const footerD = await pageD.$('footer');
  if (footerD) {
    await footerD.screenshot({ path: 'tools/final_desktop_footer.png' });
    console.log('Saved tools/final_desktop_footer.png');
  }

  await browser.close();
}

testMobileAndDesktop().catch(console.error);
