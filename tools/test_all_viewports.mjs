import { chromium } from 'playwright-core';

async function testViewports() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_375', width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(1000);

    const footerEl = await page.$('footer');
    if (footerEl) {
      await footerEl.screenshot({ path: `tools/proof_lawn_footer_${vp.name}.png` });
      console.log(`Saved tools/proof_lawn_footer_${vp.name}.png`);
    }
    await page.close();
  }

  await browser.close();
}

testViewports().catch(console.error);
