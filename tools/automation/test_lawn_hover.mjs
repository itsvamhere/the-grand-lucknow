import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const link = page.locator('footer a:has-text("Venues")').first();
  await link.hover();
  await page.waitForTimeout(300);

  const afterHover = await link.evaluate(el => {
    return Array.from(el.querySelectorAll('span')).map(s => ({
      text: s.textContent,
      style: s.getAttribute('style'),
      transform: window.getComputedStyle(s).transform
    }));
  });
  console.log('Lawn after hover:', JSON.stringify(afterHover.slice(0, 10), null, 2));

  await browser.close();
})();
