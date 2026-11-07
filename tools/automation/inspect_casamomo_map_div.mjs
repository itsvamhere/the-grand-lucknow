import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const mapContainer = await page.evaluate(() => {
    const el = document.querySelector('.framer-tfszgi');
    if (!el) return { error: 'not found' };
    const s6 = el.querySelector('.framer-s6uv36-container');
    const csEl = window.getComputedStyle(el);
    const csS6 = s6 ? window.getComputedStyle(s6) : null;

    // Check inner HTML of s6
    return {
      el: {
        tag: el.tagName,
        class: el.className,
        style: el.getAttribute('style'),
        height: csEl.height,
        position: csEl.position,
        marginTop: csEl.marginTop,
        top: csEl.top
      },
      s6: s6 ? {
        class: s6.className,
        style: s6.getAttribute('style'),
        innerHTML: s6.innerHTML.slice(0, 1500)
      } : null
    };
  });

  console.log(JSON.stringify(mapContainer, null, 2));
  await browser.close();
})();
