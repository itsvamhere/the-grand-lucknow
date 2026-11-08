import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  
  // Scroll so sticky button is directly over the map pin
  await page.evaluate(() => {
    const map = document.querySelector('#grand-live-pointer');
    if (map) {
      // Align map pin close to bottom: 48px where sticky button rests
      const rect = map.getBoundingClientRect();
      const scrollY = window.scrollY + rect.top - (window.innerHeight - 80);
      window.scrollTo(0, scrollY);
    }
  });
  await page.waitForTimeout(300);

  // Take screenshot BEFORE fix
  await page.screenshot({ path: 'tools/proofs/test_overlap_before_fix.png' });

  // Now apply the CSS fix dynamically to test
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'test-button-zindex-fix';
    style.innerHTML = `
      [data-framer-name="Button Overlay"],
      .framer-8m2qta {
        z-index: 40 !important;
      }
      [data-framer-name="Sticky Button"],
      .framer-1n8t7q3 {
        z-index: 40 !important;
      }
      #grand-live-pointer {
        z-index: 2 !important;
      }
      .casa-map-chip.active-venue-chip {
        z-index: 2 !important;
      }
    `;
    document.head.appendChild(style);
  });
  await page.waitForTimeout(200);

  // Take screenshot AFTER fix
  await page.screenshot({ path: 'tools/proofs/test_overlap_after_fix.png' });

  // Verify stacking order using elementFromPoint
  const stackingTest = await page.evaluate(() => {
    const btn = document.querySelector('[data-framer-name="Sticky Button"] a');
    const r = btn.getBoundingClientRect();
    // Point inside the button
    const topEl = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return {
      topElementTag: topEl ? topEl.tagName : null,
      topElementClass: topEl ? topEl.className : null,
      isButtonOrDescendant: btn.contains(topEl) || btn === topEl
    };
  });
  console.log('Stacking test at center of Check Availability button:');
  console.log(stackingTest);

  await browser.close();
})();
