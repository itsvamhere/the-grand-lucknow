import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const tickerDetails = await page.evaluate(async () => {
    // Find ticker in footer
    const f = document.querySelector('footer');
    const ticker = f.querySelector('.framer-n49p1z, [data-framer-name="Footer Logo"], ul');
    if (!ticker) return { error: 'no ticker found' };

    // Get ticker container and its children
    const ul = f.querySelector('ul');
    const lis = ul ? Array.from(ul.querySelectorAll('li')) : [];

    // Track transforms of ul and lis over 2 seconds
    const trace = [];
    for (let i = 0; i < 5; i++) {
      trace.push({
        time: i * 250,
        ulTransform: ul ? window.getComputedStyle(ul).transform : null,
        ulStyle: ul ? ul.getAttribute('style') : null,
        firstLiTransform: lis[0] ? window.getComputedStyle(lis[0]).transform : null,
        firstLiStyle: lis[0] ? lis[0].getAttribute('style') : null
      });
      await new Promise(r => setTimeout(r, 250));
    }

    return {
      tickerClass: ticker.className,
      ulClass: ul ? ul.className : null,
      liCount: lis.length,
      trace,
      ulHTML: ul ? ul.outerHTML.slice(0, 1000) : null
    };
  });

  console.log(JSON.stringify(tickerDetails, null, 2));
  await browser.close();
})();
