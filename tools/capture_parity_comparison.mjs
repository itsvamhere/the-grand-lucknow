import { chromium } from 'playwright-core';

async function captureComparison() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Home
  const homePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await homePage.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await homePage.waitForTimeout(2000);
  await homePage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await homePage.waitForTimeout(1000);
  const homeFooter = await homePage.$('footer');
  if (homeFooter) {
    await homeFooter.screenshot({ path: 'tools/parity_home_footer.png' });
    console.log('Saved tools/parity_home_footer.png');
  }
  await homePage.close();

  // 2. Lawn
  const lawnPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await lawnPage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await lawnPage.waitForTimeout(2000);
  await lawnPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await lawnPage.waitForTimeout(1000);
  const lawnFooter = await lawnPage.$('footer');
  if (lawnFooter) {
    await lawnFooter.screenshot({ path: 'tools/parity_lawn_footer.png' });
    console.log('Saved tools/parity_lawn_footer.png');
  }
  await lawnPage.close();

  await browser.close();
}

captureComparison().catch(console.error);
