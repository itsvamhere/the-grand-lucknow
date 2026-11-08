import { chromium } from 'playwright-core';

async function testHomeMobile() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);

  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'tools/proof_home_footer_mobile_375.png' });
    console.log('Saved tools/proof_home_footer_mobile_375.png');
  }

  await browser.close();
}

testHomeMobile().catch(console.error);
