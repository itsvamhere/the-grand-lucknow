import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });

  // Scroll to bottom of boutique-n1
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const stickyInFooter = await page.evaluate(() => {
    const btn = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
    if (!btn) return { error: 'no btn' };
    const r = btn.getBoundingClientRect();
    const cs = window.getComputedStyle(btn);
    return {
      top: r.top,
      opacity: cs.opacity,
      transform: cs.transform,
      style: btn.getAttribute('style'),
      parentStyle: btn.parentElement ? btn.parentElement.getAttribute('style') : null
    };
  });

  console.log('Live Casa Momo sticky button at bottom:', JSON.stringify(stickyInFooter, null, 2));
  await browser.close();
})();
