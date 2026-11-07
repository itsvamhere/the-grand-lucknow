import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const linkDetails = await page.evaluate(() => {
    const link = document.querySelector('footer a[href*="venues"]');
    if (!link) return 'no link';
    const spans = Array.from(link.querySelectorAll('span'));
    return spans.map((s, idx) => ({
      idx,
      text: s.textContent,
      html: s.outerHTML.slice(0, 100),
      rect: {
        left: s.getBoundingClientRect().left,
        top: s.getBoundingClientRect().top,
        width: s.getBoundingClientRect().width,
        height: s.getBoundingClientRect().height
      },
      computedDisplay: window.getComputedStyle(s).display,
      computedPosition: window.getComputedStyle(s).position
    }));
  });

  console.log('Lawn Venues link spans:', JSON.stringify(linkDetails, null, 2));
  await browser.close();
})();
