import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Wait 4s for poll to trigger and map tiles to load
  await page.waitForTimeout(4000);

  const locSec = await page.$('#locations-1');
  if (locSec) {
    await locSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await locSec.screenshot({ path: `${ARTIFACTS}/task3_verified_desktop_section.png` });
    console.log('✓ Saved task3_verified_desktop_section.png');

    const mapEl = await page.$('#grand-vector-map');
    if (mapEl) {
      await mapEl.screenshot({ path: `${ARTIFACTS}/task3_custom_vector_map.png` });
      console.log('✓ Saved task3_custom_vector_map.png');
    }
  }

  // Mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  const locSecMob = await page.$('#locations-1');
  if (locSecMob) {
    await locSecMob.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await locSecMob.screenshot({ path: `${ARTIFACTS}/task3_verified_mobile_section.png` });
    console.log('✓ Saved task3_verified_mobile_section.png');
  }

  const finalCheck = await page.evaluate(() => {
    const sec = document.getElementById('locations-1');
    const txt = sec ? sec.textContent : '';
    const anchor = sec ? sec.querySelector('a') : null;
    return {
      hasHeadingLocation: txt.includes('Location'),
      hasAddressBindaua: txt.includes('Bindaua'),
      hasNoGomtiNagar: !txt.includes('Gomti Nagar'),
      buttonHref: anchor ? anchor.href : null,
      buttonText: anchor ? anchor.textContent.trim() : null,
      hasGrandPill: !!sec.querySelector('.grand-pill'),
      landmarkPillCount: sec.querySelectorAll('.landmark-pill').length,
      hasMapCanvas: !!sec.querySelector('canvas')
    };
  });

  console.log('Final Verification Status:', JSON.stringify(finalCheck, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
