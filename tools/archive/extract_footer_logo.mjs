import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function extractFooterLogoComponent() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const el = document.querySelector('.framer-n49p1z');
    if (!el) return 'Not found';
    const parent = el.parentElement;
    return {
      n49p1z_HTML: el.outerHTML,
      parent_HTML: parent.outerHTML.slice(0, 5000),
      parent_rect: parent.getBoundingClientRect(),
      n49p1z_rect: el.getBoundingClientRect()
    };
  });

  console.log('n49p1z parent rect:', data.parent_rect);
  console.log('n49p1z rect:', data.n49p1z_rect);
  console.log('n49p1z HTML:');
  console.log(data.n49p1z_HTML);
  await browser.close();
}

extractFooterLogoComponent().catch(console.error);
