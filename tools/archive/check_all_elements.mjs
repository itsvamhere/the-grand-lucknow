import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkElements() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(200);

  const list = await page.evaluate(() => {
    const els = document.elementsFromPoint(110, 50) || [];
    return Array.from(els).map(el => {
      let p = el;
      const chain = [];
      while (p && p !== document.body) {
        chain.push(p.tagName + (p.className ? '.' + (typeof p.className === 'string' ? p.className.split(' ').join('.') : 'svg') : ''));
        p = p.parentElement;
      }
      return {
        tag: el.tagName,
        bg: window.getComputedStyle(el).backgroundColor,
        chain: chain.join(' > ')
      };
    });
  });
  console.log('All elements under (110, 50) at y=1500:');
  console.dir(list, { depth: null });
  await browser.close();
}
checkElements().catch(console.error);
