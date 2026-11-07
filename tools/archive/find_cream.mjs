import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function findCream() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  const els = await page.evaluate(() => {
    const res = [];
    document.querySelectorAll('*').forEach(el => {
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg === 'rgb(243, 236, 221)') {
        const r = el.getBoundingClientRect();
        res.push({
          tag: el.tagName,
          cls: el.className ? (typeof el.className === 'string' ? el.className.slice(0, 40) : '') : '',
          top: Math.round(r.top + window.scrollY),
          height: Math.round(r.height),
          width: Math.round(r.width)
        });
      }
    });
    return res;
  });
  console.log('Cream elements:', els);
  await browser.close();
}
findCream().catch(console.error);
