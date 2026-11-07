import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function diagnose() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const el = document.querySelector('.framer-18mvsw1-container');
    if (!el) return 'No element';
    return {
      inlineStyle: el.getAttribute('style'),
      outerHtml: el.outerHTML.slice(0, 300),
      appearId: el.getAttribute('data-framer-appear-id')
    };
  });

  console.log('framer-18mvsw1-container:', res);
  await browser.close();
}

diagnose().catch(console.error);
