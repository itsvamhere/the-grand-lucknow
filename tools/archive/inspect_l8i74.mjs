import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectL8i74() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const el = document.querySelector('.framer-L8i74');
    if (!el) return 'Not found';
    const rect = el.getBoundingClientRect();
    return {
      outerHTML: el.outerHTML,
      rect: { top: rect.top + window.scrollY, left: rect.left, width: rect.width, height: rect.height }
    };
  });

  console.log('framer-L8i74 rect:', data.rect);
  console.log('framer-L8i74 HTML length:', data.outerHTML ? data.outerHTML.length : 0);
  if (data.outerHTML) {
    console.log('framer-L8i74 HTML snippet:');
    console.log(data.outerHTML.slice(0, 1500));
  }
  await browser.close();
}

inspectL8i74().catch(console.error);
