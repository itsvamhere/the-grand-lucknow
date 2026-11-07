import { chromium } from 'playwright-core';
import fs from 'fs';

const SUBPAGES = [
  'open-earth-lawn',
  'grassland-gala',
  'garden-galaxy',
  'the-grand-courtyard',
  'the-royal-legacy-banquet'
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  let allPassed = true;

  for (const slug of SUBPAGES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const url = `http://localhost:3003/venues/${slug}`;
    await page.goto(url, { waitUntil: 'networkidle' });

    console.log(`\n========================================`);
    console.log(`VERIFYING STACKING ORDER: ${slug}`);
    console.log(`========================================`);

    // 1. Check map pin coordinates
    const pinCoords = await page.evaluate(() => {
      const p = document.querySelector('#grand-live-pointer');
      return p ? {
        left: p.style.left,
        top: p.style.top,
        zIndex: window.getComputedStyle(p).zIndex
      } : null;
    });

    const isPinPositionSame = pinCoords && pinCoords.left === '50%' && pinCoords.top === '40%';
    const isPinZIndexLow = pinCoords && (pinCoords.zIndex === '2' || parseInt(pinCoords.zIndex) <= 2);

    console.log(`1. Map Pin Position & Stacking:`);
    console.log(`   - Coordinates: left=${pinCoords?.left}, top=${pinCoords?.top} (Expected 50%, 40%) -> ${isPinPositionSame ? 'PASS' : 'FAIL'}`);
    console.log(`   - Map Pin z-index: ${pinCoords?.zIndex} (Expected <= 2) -> ${isPinZIndexLow ? 'PASS' : 'FAIL'}`);

    if (!isPinPositionSame || !isPinZIndexLow) allPassed = false;

    // 2. Scroll until sticky button overlaps the map pointer
    await page.evaluate(() => {
      const map = document.querySelector('#grand-live-pointer');
      const btn = document.querySelector('[data-framer-name="Sticky Button"]');
      if (map && btn) {
        const mRect = map.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();
        const diff = mRect.top - bRect.top;
        window.scrollBy(0, diff - 10);
      }
    });
    await page.waitForTimeout(300);

    // 3. Verify stacking order using elementFromPoint
    const overlapState = await page.evaluate(() => {
      const btn = document.querySelector('[data-framer-name="Sticky Button"] a');
      const map = document.querySelector('#grand-live-pointer');
      if (!btn || !map) return null;

      const bRect = btn.getBoundingClientRect();
      const mRect = map.getBoundingClientRect();

      // Check if they are physically overlapping
      const isPhysicallyOverlapping = !(
        bRect.right < mRect.left ||
        bRect.left > mRect.right ||
        bRect.bottom < mRect.top ||
        bRect.top > mRect.bottom
      );

      // Check element at the intersection center point
      const intersectX = Math.max(bRect.left, mRect.left) + 15;
      const intersectY = Math.max(bRect.top, mRect.top) + 10;
      const topEl = document.elementFromPoint(intersectX, intersectY);

      return {
        isPhysicallyOverlapping,
        topElementTag: topEl ? topEl.tagName : null,
        topElementClass: topEl ? topEl.className : null,
        isButtonOnTop: btn.contains(topEl) || btn === topEl,
        btnZIndex: window.getComputedStyle(btn.closest('[data-framer-name="Button Overlay"]') || btn).zIndex
      };
    });

    console.log(`2. Overlap Verification:`);
    console.log(`   - Physically Overlapping: ${overlapState?.isPhysicallyOverlapping ? 'YES' : 'NO'}`);
    console.log(`   - Button Overlay z-index: ${overlapState?.btnZIndex} (Expected 40)`);
    console.log(`   - Top Element in Overlap Zone: <${overlapState?.topElementTag} class="${overlapState?.topElementClass}">`);
    console.log(`   - Is "Check Availability" Button On Top: ${overlapState?.isButtonOnTop ? 'PASS' : 'FAIL'}`);

    if (!overlapState?.isButtonOnTop) {
      allPassed = false;
    }

    // Capture screenshot of the overlap region
    const btnEl = await page.$('[data-framer-name="Sticky Button"]');
    if (btnEl) {
      const box = await btnEl.boundingBox();
      if (box) {
        await page.screenshot({
          path: `tools/proofs/button_over_pin_${slug}.png`,
          clip: {
            x: Math.max(0, box.x - 60),
            y: Math.max(0, box.y - 60),
            width: box.width + 120,
            height: box.height + 120
          }
        });
      }
    }

    await page.close();
  }

  await browser.close();

  if (allPassed) {
    console.log('\n======================================================');
    console.log('>>> ALL 5 SUBPAGES VERIFIED: BUTTON IS CLEANLY ON TOP OF MAP PIN! <<<');
    console.log('======================================================\n');
  } else {
    console.error('\n>>> STACKING VERIFICATION FAILED! <<<\n');
    process.exit(1);
  }
})();
