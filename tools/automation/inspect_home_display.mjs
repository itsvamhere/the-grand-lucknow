import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const result = await page.evaluate(() => {
    const tickers = Array.from(document.querySelectorAll('.framer-n49p1z'));
    return tickers.map((t, i) => {
      const xj = t.querySelector('.framer-xj8hz2');
      const cs = window.getComputedStyle(t);
      return {
        index: i,
        parentVisible: cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0',
        outerHtmlPrefix: xj?.outerHTML?.slice(0, 300),
        bgImage: xj?.style?.backgroundImage,
        hasSvgChildren: xj?.querySelector('svg') ? true : false,
        useHref: xj?.querySelector('use')?.getAttribute('href')
      };
    });
  });

  console.log('ALL HOME TICKERS:', JSON.stringify(result, null, 2));
  await browser.close();
})();
