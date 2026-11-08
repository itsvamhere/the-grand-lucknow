import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  
  const debug = await page.evaluate(() => {
    const loc = document.querySelector('#bigtext-1');
    const locH = document.querySelector('#bigtext-1 h2');
    const span = locH ? locH.querySelector('span') : null;
    const r = loc.getBoundingClientRect();
    
    return {
      rect: { top: r.top, bottom: r.bottom },
      locInlineStyle: loc.getAttribute('style'),
      h2InlineStyle: locH ? locH.getAttribute('style') : null,
      spanInlineStyle: span ? span.getAttribute('style') : null,
      computedLocOpacity: window.getComputedStyle(loc).opacity,
      computedH2Opacity: locH ? window.getComputedStyle(locH).opacity : null,
      computedSpanOpacity: span ? window.getComputedStyle(span).opacity : null
    };
  });
  console.log('At top:', debug);

  // Now scroll to location
  await page.evaluate(() => {
    const loc = document.querySelector('#bigtext-1');
    loc.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy(0, -50);
  });
  await page.waitForTimeout(200);

  const debugOverlap = await page.evaluate(() => {
    const loc = document.querySelector('#bigtext-1');
    const locH = document.querySelector('#bigtext-1 h2');
    const span = locH ? locH.querySelector('span') : null;
    const r = loc.getBoundingClientRect();
    
    return {
      rect: { top: r.top, bottom: r.bottom },
      h2InlineStyle: locH ? locH.getAttribute('style') : null,
      computedH2Opacity: locH ? window.getComputedStyle(locH).opacity : null,
      computedSpanOpacity: span ? window.getComputedStyle(span).opacity : null
    };
  });
  console.log('In overlap:', debugOverlap);

  await browser.close();
})();
