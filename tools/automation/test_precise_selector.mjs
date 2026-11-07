import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const testMatch = await page.evaluate(() => {
    const link = document.querySelector('footer a[href*="venues"]');
    if (!link) return 'no link';
    const groups = link.querySelectorAll('span[data-rolling-label] > span[aria-hidden="true"]');
    return Array.from(groups).map((g, i) => ({
      i,
      text: g.textContent,
      childrenCount: g.children.length,
      c0_hidden: g.children[0]?.textContent,
      c1_top: g.children[1]?.textContent,
      c2_bot: g.children[2]?.textContent
    }));
  });

  console.log('Tested precise selector:', JSON.stringify(testMatch, null, 2));
  await browser.close();
})();
