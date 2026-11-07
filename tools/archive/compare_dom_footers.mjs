import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function compareFooters() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Check index.html
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const homeData = await page.evaluate(() => {
    const el = document.querySelector('footer [data-framer-name="Footer Logo"] .framer-xj8hz2') || document.querySelector('footer .framer-xj8hz2');
    const computed = el ? window.getComputedStyle(el) : null;
    return {
      exists: !!el,
      tag: el ? el.tagName : null,
      html: el ? el.outerHTML : null,
      bgImage: computed ? computed.backgroundImage : null,
      width: el ? el.getBoundingClientRect().width : null,
      height: el ? el.getBoundingClientRect().height : null
    };
  });

  // 2. Check open-earth-lawn.html
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const lawnData = await page.evaluate(() => {
    const el = document.querySelector('footer [data-framer-name="Footer Logo"] .framer-xj8hz2') || document.querySelector('footer .framer-xj8hz2');
    const computed = el ? window.getComputedStyle(el) : null;
    const allFooterText = document.querySelector('footer')?.innerText;
    return {
      exists: !!el,
      tag: el ? el.tagName : null,
      html: el ? el.outerHTML : null,
      bgImage: computed ? computed.backgroundImage : null,
      width: el ? el.getBoundingClientRect().width : null,
      height: el ? el.getBoundingClientRect().height : null,
      tickerContainerHtml: document.querySelector('footer [data-framer-name="Footer Logo"]')?.innerHTML?.slice(0, 500)
    };
  });

  console.log('HOME:', JSON.stringify(homeData, null, 2));
  console.log('LAWN:', JSON.stringify(lawnData, null, 2));

  await browser.close();
}

compareFooters().catch(console.error);
