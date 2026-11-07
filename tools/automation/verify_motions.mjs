import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => { window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'instant' }); });
  await page.waitForTimeout(300);

  // 1. Ticker continuous movement
  const pos0 = await page.evaluate(() => {
    const el = document.querySelector('footer ul.grand-ticker-track');
    return el ? window.getComputedStyle(el).transform : null;
  });

  await page.waitForTimeout(600);

  const pos1 = await page.evaluate(() => {
    const el = document.querySelector('footer ul.grand-ticker-track');
    return el ? window.getComputedStyle(el).transform : null;
  });

  // 2. Rolling hover effect on 'About'
  const aboutLink = page.locator('footer a[href*="about"]');
  const beforeHover = await page.evaluate(() => {
    const a = document.querySelector('footer a[href*="about"]');
    const firstGroup = a.querySelector('span[data-rolling-label] > span[aria-hidden="true"]');
    return {
      top: firstGroup.children[1].style.transform,
      bot: firstGroup.children[2].style.transform
    };
  });

  await aboutLink.hover();
  await page.waitForTimeout(400);

  const duringHover = await page.evaluate(() => {
    const a = document.querySelector('footer a[href*="about"]');
    const firstGroup = a.querySelector('span[data-rolling-label] > span[aria-hidden="true"]');
    return {
      top: firstGroup.children[1].style.transform,
      bot: firstGroup.children[2].style.transform
    };
  });

  console.log('TICKER POS 0s:', pos0);
  console.log('TICKER POS 0.6s:', pos1);
  console.log('BEFORE HOVER:', beforeHover);
  console.log('DURING HOVER:', duringHover);

  await browser.close();
})();
