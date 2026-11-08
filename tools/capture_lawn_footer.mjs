import { chromium } from 'playwright-core';

async function testLawnFooter() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1500);

  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'tools/test_lawn_footer_fixed.png' });
    console.log('Saved tools/test_lawn_footer_fixed.png');
  }

  await browser.close();
}

testLawnFooter().catch(console.error);
