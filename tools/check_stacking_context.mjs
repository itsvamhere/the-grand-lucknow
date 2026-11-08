import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  
  const hierarchy = await page.evaluate(() => {
    const btn = document.querySelector('[data-framer-name="Sticky Button"]');
    const overlay = document.querySelector('[data-framer-name="Button Overlay"]');
    const pointer = document.querySelector('#grand-live-pointer');
    const chip = document.querySelector('.casa-map-chip.active-venue-chip');
    
    function getAncestors(el) {
      const list = [];
      let cur = el;
      while (cur && cur !== document.body) {
        list.push({
          tag: cur.tagName,
          class: cur.className,
          framerName: cur.getAttribute('data-framer-name'),
          zIndex: window.getComputedStyle(cur).zIndex,
          position: window.getComputedStyle(cur).position
        });
        cur = cur.parentElement;
      }
      return list;
    }
    
    return {
      btnAncestors: btn ? getAncestors(btn) : null,
      pointerAncestors: pointer ? getAncestors(pointer) : null
    };
  });
  
  console.log('Button Ancestors:');
  console.log(hierarchy.btnAncestors);
  console.log('\nPointer Ancestors:');
  console.log(hierarchy.pointerAncestors);

  await browser.close();
})();
