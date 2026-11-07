import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function findFooterWordmark() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const els = await page.evaluate(() => {
    // Search for any element containing CASA or MOMO or having SVG near the bottom
    const bottomEls = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      if (top > document.body.scrollHeight - 1500) {
        if (el.tagName === 'SVG' || (el.innerText && (el.innerText.includes('CASA') || el.innerText.includes('MOMO')))) {
          bottomEls.push({
            tag: el.tagName,
            cls: el.className ? (typeof el.className === 'string' ? el.className.slice(0, 40) : 'svg') : '',
            text: el.innerText ? el.innerText.trim().slice(0, 50) : '',
            top: Math.round(top),
            height: Math.round(rect.height),
            width: Math.round(rect.width),
            outer: el.outerHTML.slice(0, 300)
          });
        }
      }
    }
    return bottomEls;
  });

  console.log('Bottom elements on casamomo.at:');
  console.dir(els, { depth: null });
  await browser.close();
}

findFooterWordmark().catch(console.error);
