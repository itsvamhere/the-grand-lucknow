import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function listColors() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  const bgs = await page.evaluate(() => {
    const set = new Set();
    document.querySelectorAll('*').forEach(el => {
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') set.add(bg);
    });
    return Array.from(set);
  });
  console.log('Unique background colors on page:', bgs);
  await browser.close();
}
listColors().catch(console.error);
