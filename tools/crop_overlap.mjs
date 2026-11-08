import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  
  // Apply fix
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

    // Scroll so that the map pointer is slightly behind the Check Availability button
    const map = document.querySelector('#grand-live-pointer');
    const btn = document.querySelector('[data-framer-name="Sticky Button"]');
    const mRect = map.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    // Scroll so mRect.top overlaps bRect.top + 20px
    const diff = mRect.top - bRect.top;
    window.scrollBy(0, diff - 15);
  });
  await page.waitForTimeout(300);

  // Take screenshot of the button region
  const btnEl = await page.$('[data-framer-name="Sticky Button"]');
  if (btnEl) {
    const box = await btnEl.boundingBox();
    if (box) {
      await page.screenshot({
        path: 'tools/proofs/test_cropped_overlap_fix.png',
        clip: {
          x: Math.max(0, box.x - 50),
          y: Math.max(0, box.y - 50),
          width: box.width + 100,
          height: box.height + 100
        }
      });
    }
  }

  await browser.close();
})();
