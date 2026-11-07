import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const mapElement = await page.evaluate(() => {
    // Find section with Location
    const locH = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim() === 'Location' && el.children.length === 0);
    const sec = locH.closest('section');
    if (!sec) return { error: 'no section' };
    
    // Check all elements inside this section
    const els = Array.from(sec.querySelectorAll('*'));
    const masks = els.filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.maskImage !== 'none' || cs.webkitMaskImage !== 'none' || (el.getAttribute('style') && el.getAttribute('style').includes('mask'));
    }).map(el => ({
      tag: el.tagName,
      class: typeof el.className === 'string' ? el.className.slice(0, 40) : '',
      maskImage: window.getComputedStyle(el).maskImage,
      webkitMaskImage: window.getComputedStyle(el).webkitMaskImage,
      style: el.getAttribute('style')
    }));

    return {
      secId: sec.id,
      masks,
      svgCount: sec.querySelectorAll('svg').length,
      imgCount: sec.querySelectorAll('img').length
    };
  });

  console.log(JSON.stringify(mapElement, null, 2));
  await browser.close();
})();
