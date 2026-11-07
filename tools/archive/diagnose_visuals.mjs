import { chromium } from 'playwright-core';
import fs from 'fs';

async function diagnose() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- DIAGNOSING HOMEPAGE (http://localhost:3003/) ---');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'tools/diag_home_top.png', clip: { x: 0, y: 0, width: 1440, height: 300 } });
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);
  
  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'tools/diag_home_footer.png' });
  }

  const homeFooterInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return 'NO FOOTER';
    return {
      text: footer.innerText.slice(0, 300),
      hasTickerUl: !!footer.querySelector('ul'),
      svgCount: footer.querySelectorAll('svg').length,
      useCount: footer.querySelectorAll('use').length,
      tickerHtml: footer.querySelector('[data-framer-name="Footer Logo"]')?.innerHTML?.slice(0, 400)
    };
  });
  console.log('Home footer info:', JSON.stringify(homeFooterInfo, null, 2));

  console.log('--- DIAGNOSING VENUE (http://localhost:3003/venues/open-earth-lawn) ---');
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'tools/diag_lawn_top.png', clip: { x: 0, y: 0, width: 1440, height: 300 } });

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);

  const lawnFooterEl = await page.$('footer');
  if (lawnFooterEl) {
    await lawnFooterEl.screenshot({ path: 'tools/diag_lawn_footer.png' });
  }

  const lawnFooterInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return 'NO FOOTER';
    return {
      text: footer.innerText.slice(0, 300),
      hasTickerUl: !!footer.querySelector('ul'),
      svgCount: footer.querySelectorAll('svg').length,
      useCount: footer.querySelectorAll('use').length,
      tickerHtml: footer.querySelector('[data-framer-name="Footer Logo"]')?.innerHTML?.slice(0, 400)
    };
  });
  console.log('Lawn footer info:', JSON.stringify(lawnFooterInfo, null, 2));

  await browser.close();
  console.log('Diagnosis complete. Screenshots saved.');
}

diagnose().catch(err => {
  console.error(err);
  process.exit(1);
});
