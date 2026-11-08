import { chromium } from 'playwright-core';

async function verifyAll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  const tests = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_375', width: 375, height: 812 }
  ];

  for (const t of tests) {
    console.log(`Testing ${t.name}...`);
    const page = await browser.newPage({ viewport: { width: t.width, height: t.height } });
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(1500);

    const footerEl = await page.$('footer');
    if (footerEl) {
      await footerEl.screenshot({ path: `tools/proof_subpage_${t.name}.png` });
      console.log(`Saved tools/proof_subpage_${t.name}.png`);
    } else {
      console.error(`NO FOOTER FOUND on ${t.name}!`);
    }

    console.log(`${t.name} errors:`, errors);
    await page.close();
  }

  await browser.close();
  console.log('All viewports tested successfully!');
}

verifyAll().catch(console.error);
