import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const mapData = await page.evaluate(() => {
    // Find canvas or map container
    const canvas = document.querySelector('canvas');
    if (!canvas) return { error: 'canvas not found' };

    const parents = [];
    let p = canvas;
    while (p && p !== document.body) {
      parents.push({
        tag: p.tagName,
        id: p.id,
        class: typeof p.className === 'string' ? p.className : '',
        maskImage: window.getComputedStyle(p).maskImage,
        webkitMaskImage: window.getComputedStyle(p).webkitMaskImage,
        mask: window.getComputedStyle(p).mask,
        style: p.getAttribute('style')
      });
      p = p.parentElement;
    }
    return {
      canvasStyle: canvas.getAttribute('style'),
      parentsWithMask: parents.filter(x => x.maskImage !== 'none' || x.webkitMaskImage !== 'none' || (x.style && x.style.includes('mask')))
    };
  });

  console.log(JSON.stringify(mapData, null, 2));
  await browser.close();
})();
