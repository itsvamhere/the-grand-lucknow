import { chromium } from 'playwright-core';

const PROD_SLUGS = [
  'open-earth-lawn',
  'grassland-gala',
  'garden-galaxy',
  'the-grand-courtyard',
  'the-royal-legacy-banquet'
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  let allPassed = true;

  for (const slug of PROD_SLUGS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const url = `https://the-grand-lucknow.vercel.app/venues/${slug}`;
    const res = await page.goto(url, { waitUntil: 'networkidle' });

    console.log(`\n========================================`);
    console.log(`LIVE PROD STACKING TEST: ${slug} (HTTP ${res.status()})`);
    console.log(`========================================`);

    // Scroll so button overlaps map pointer
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

    const check = await page.evaluate(() => {
      const btn = document.querySelector('[data-framer-name="Sticky Button"] a');
      const map = document.querySelector('#grand-live-pointer');
      if (!btn || !map) return null;

      const bRect = btn.getBoundingClientRect();
      const mRect = map.getBoundingClientRect();

      const intersectX = Math.max(bRect.left, mRect.left) + 15;
      const intersectY = Math.max(bRect.top, mRect.top) + 10;
      const topEl = document.elementFromPoint(intersectX, intersectY);

      return {
        btnZIndex: window.getComputedStyle(btn.closest('[data-framer-name="Button Overlay"]') || btn).zIndex,
        mapPinZIndex: window.getComputedStyle(map).zIndex,
        isButtonOnTop: btn.contains(topEl) || btn === topEl,
        topElTag: topEl ? topEl.tagName : null
      };
    });

    console.log(`- Button z-index: ${check?.btnZIndex} (Expected 40)`);
    console.log(`- Map Pin z-index: ${check?.mapPinZIndex} (Expected 2)`);
    console.log(`- Top element at intersection: <${check?.topElTag}>`);
    console.log(`- Is Button Cleanly On Top: ${check?.isButtonOnTop ? 'PASS' : 'FAIL'}`);

    if (!check?.isButtonOnTop) allPassed = false;

    // Capture screenshot on production
    const btnEl = await page.$('[data-framer-name="Sticky Button"]');
    if (btnEl) {
      const box = await btnEl.boundingBox();
      if (box) {
        await page.screenshot({
          path: `tools/proofs/prod_button_over_pin_${slug}.png`,
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
    console.log('\n================================================================');
    console.log('>>> ALL 5 LIVE PRODUCTION SUBPAGES VERIFIED: BUTTON ON TOP! <<<');
    console.log('================================================================\n');
  } else {
    console.error('\n>>> LIVE PRODUCTION VERIFICATION FAILED! <<<\n');
    process.exit(1);
  }
})();
