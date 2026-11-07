import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  const ulDump = await page.evaluate(() => {
    const ul = document.querySelector('footer .framer-n49p1z ul');
    if (!ul) return null;
    return {
      outerHTML: ul.outerHTML,
      parentOuter: ul.parentElement.outerHTML.slice(0, 500),
      rect: ul.getBoundingClientRect(),
      childrenCount: ul.children.length,
      childRects: Array.from(ul.children).map(c => c.getBoundingClientRect())
    };
  });

  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/home_ticker_dump.json', JSON.stringify(ulDump, null, 2), 'utf8');
  console.log('Saved home_ticker_dump.json');
  await browser.close();
})();
