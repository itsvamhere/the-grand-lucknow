import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const ticker = await page.evaluate(() => {
    const ul = document.querySelector('footer .framer-n49p1z ul');
    if (!ul) return null;
    return {
      ulStyle: ul.getAttribute('style'),
      ulComputed: {
        transform: window.getComputedStyle(ul).transform,
        display: window.getComputedStyle(ul).display,
        gap: window.getComputedStyle(ul).gap
      },
      lis: Array.from(ul.querySelectorAll('li')).map(li => ({
        html: li.innerHTML,
        style: li.getAttribute('style'),
        width: li.offsetWidth,
        height: li.offsetHeight
      }))
    };
  });

  console.log(JSON.stringify(ticker, null, 2));
  await browser.close();
})();
