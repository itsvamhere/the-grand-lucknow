import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    if (window.lenis) window.lenis.scrollTo(document.body.scrollHeight, { immediate: true });
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(600);

  const words = ['venues', 'about', 'contact', 'instagram', 'facebook'];
  const results = {};

  for (const w of words) {
    const data = await page.evaluate((word) => {
      const link = document.querySelector(`footer a[href*="${word}"]`);
      if (!link) return 'Link not found';
      const spans = link.querySelectorAll('span[data-rolling-label] > span[aria-hidden="true"]');
      return Array.from(spans).map((s) => {
        const topSpan = s.children[1];
        const rect = topSpan ? topSpan.getBoundingClientRect() : null;
        return {
          char: s.innerText.trim(),
          topY: rect ? Math.round(rect.y) : null,
          height: rect ? Math.round(rect.height) : null,
          transform: topSpan ? topSpan.style.transform : null
        };
      });
    }, w);
    results[w] = data;
  }

  console.log('SUBPAGE LETTER DATA:\n', JSON.stringify(results, null, 2));
  await browser.close();
})();
