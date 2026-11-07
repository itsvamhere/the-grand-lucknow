import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('Tracking ticker on home page over 3 seconds:');
  for (let i = 0; i < 6; i++) {
    const tInfo = await page.evaluate(() => {
      const ul = document.querySelector('.framer-n49p1z ul');
      if (!ul) return null;
      return {
        styleTransform: ul.style.transform,
        computedTransform: window.getComputedStyle(ul).transform,
        ulRect: ul.getBoundingClientRect(),
        firstLiRect: ul.querySelector('li')?.getBoundingClientRect()
      };
    });
    console.log(`t = ${i * 500}ms:`, JSON.stringify(tInfo));
    await page.waitForTimeout(500);
  }

  await browser.close();
})();
