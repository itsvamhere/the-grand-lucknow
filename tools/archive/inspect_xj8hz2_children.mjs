import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectXj8hz2Children() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const el = document.querySelector('.framer-xj8hz2');
    if (!el) return 'Not found';
    const children = Array.from(el.children).map(c => ({
      cls: c.className,
      tag: c.tagName,
      html: c.outerHTML.slice(0, 500)
    }));
    return {
      elHtml: el.outerHTML,
      children
    };
  });

  console.log('Children count:', data.children.length);
  console.dir(data.children, { depth: null });
  await browser.close();
}

inspectXj8hz2Children().catch(console.error);
