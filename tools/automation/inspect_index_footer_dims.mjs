import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  const footerStyles = await page.evaluate(() => {
    const f = document.querySelector('footer');
    const cs = window.getComputedStyle(f);
    const desktop = f.querySelector('.framer-1aamxx2');
    const csDesktop = desktop ? window.getComputedStyle(desktop) : null;
    return {
      footer: {
        height: cs.height,
        minHeight: cs.minHeight,
        overflow: cs.overflow,
        padding: cs.padding
      },
      desktop: csDesktop ? {
        height: csDesktop.height,
        padding: csDesktop.padding,
        gap: csDesktop.gap
      } : null
    };
  });

  console.log(JSON.stringify(footerStyles, null, 2));
  await browser.close();
})();
