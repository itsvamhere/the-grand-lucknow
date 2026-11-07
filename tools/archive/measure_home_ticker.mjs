import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function measureTicker() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  
  const dim = await page.evaluate(() => {
    const logo = document.querySelector('[data-framer-name="Footer Logo"]');
    const ul = logo ? logo.querySelector('ul') : null;
    const lis = ul ? Array.from(ul.querySelectorAll('li')) : [];
    return {
      logoRect: logo ? logo.getBoundingClientRect() : null,
      ulScrollWidth: ul ? ul.scrollWidth : 0,
      ulTransform: ul ? ul.style.transform : null,
      lis: lis.map(li => ({
        w: li.offsetWidth,
        h: li.offsetHeight,
        rect: li.getBoundingClientRect()
      }))
    };
  });
  
  console.log('Home Ticker Measurements:', JSON.stringify(dim, null, 2));
  await browser.close();
}

measureTicker().catch(console.error);
