import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const homeNav = await page.evaluate(() => {
    const fixedElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.position === 'fixed' && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
    });
    return fixedElements.map(el => ({
      tag: el.tagName,
      className: el.className,
      rect: el.getBoundingClientRect(),
      text: el.innerText?.slice(0, 50)?.replace(/\n/g, ' ')
    }));
  });

  console.log('HOME fixed elements at bottom:', JSON.stringify(homeNav, null, 2));

  const pageLawn = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageLawn.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageLawn.waitForTimeout(500);

  const lawnNav = await pageLawn.evaluate(() => {
    const fixedElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.position === 'fixed' && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
    });
    return fixedElements.map(el => ({
      tag: el.tagName,
      className: el.className,
      rect: el.getBoundingClientRect(),
      text: el.innerText?.slice(0, 50)?.replace(/\n/g, ' ')
    }));
  });

  console.log('LAWN fixed elements at bottom:', JSON.stringify(lawnNav, null, 2));

  await browser.close();
})();
