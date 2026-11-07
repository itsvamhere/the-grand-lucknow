import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Check sticky button visibility at bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);

  const btnState = await page.evaluate(() => {
    const btn = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
    if (!btn) return { error: 'no sticky button' };
    const r = btn.getBoundingClientRect();
    const cs = window.getComputedStyle(btn);
    return {
      top: r.top,
      opacity: cs.opacity,
      display: cs.display,
      visibility: cs.visibility,
      transform: cs.transform
    };
  });

  console.log('Sticky button on home page at bottom:', JSON.stringify(btnState, null, 2));
  await browser.close();
})();
