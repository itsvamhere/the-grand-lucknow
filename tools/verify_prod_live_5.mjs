import { chromium } from 'playwright-core';
import fs from 'fs';

const PROD_VENUES = [
  {
    slug: 'open-earth-lawn',
    name: 'Open Earth Lawn',
    expectedSize: '25,000',
    expectedCapacity: '2,500'
  },
  {
    slug: 'grassland-gala',
    name: 'Grassland Gala',
    expectedSize: '20,000',
    expectedCapacity: '800'
  },
  {
    slug: 'garden-galaxy',
    name: 'Garden Galaxy',
    expectedSize: '15,000',
    expectedCapacity: '300'
  },
  {
    slug: 'the-grand-courtyard',
    name: 'The Grand Courtyard',
    expectedSize: '15,000',
    expectedCapacity: '250'
  },
  {
    slug: 'the-royal-legacy-banquet',
    name: 'The Royal Legacy Banquet',
    expectedSize: '10,000',
    expectedCapacity: '600'
  }
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  let allPassed = true;

  for (const v of PROD_VENUES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const url = `https://the-grand-lucknow.vercel.app/venues/${v.slug}`;
    const res = await page.goto(url, { waitUntil: 'networkidle' });
    const status = res.status();

    console.log(`\n========================================`);
    console.log(`LIVE PROD: ${v.name} (HTTP ${status})`);
    console.log(`URL: ${url}`);
    console.log(`========================================`);

    if (status !== 200) {
      console.error(`HTTP status is ${status}, expected 200`);
      allPassed = false;
    }

    // 1. Check Features section text
    const featuresData = await page.evaluate(() => {
      const feat = document.querySelector('.framer-181zdp4');
      return feat ? feat.innerText : null;
    });

    const hasExpectedSize = featuresData && featuresData.includes(v.expectedSize);
    const hasExpectedCap = featuresData && featuresData.includes(v.expectedCapacity);

    console.log(`1. Features Section:`);
    console.log(`   - Size: ${v.expectedSize} Sqft -> ${hasExpectedSize ? 'PASS' : 'FAIL'}`);
    console.log(`   - Capacity: ${v.expectedCapacity} -> ${hasExpectedCap ? 'PASS' : 'FAIL'}`);

    if (!hasExpectedSize || !hasExpectedCap) {
      allPassed = false;
    }

    // 2. Check Location Heading Color & Opacity
    const locData = await page.evaluate(() => {
      const locH = document.querySelector('#bigtext-1 h2');
      if (!locH) return null;
      const compLoc = window.getComputedStyle(locH);
      return {
        locColor: compLoc.color,
        locOpacity: compLoc.opacity
      };
    });

    const isColorDark = locData && (locData.locColor === 'rgb(14, 18, 1)' || locData.locColor === 'rgba(14, 18, 1, 1)');
    const isOpacityOne = locData && locData.locOpacity === '1';

    console.log(`2. Location Heading Color:`);
    console.log(`   - Color: ${locData?.locColor} -> ${isColorDark ? 'PASS' : 'FAIL'}`);
    console.log(`   - Opacity: ${locData?.locOpacity} -> ${isOpacityOne ? 'PASS' : 'FAIL'}`);

    if (!isColorDark || !isOpacityOne) {
      allPassed = false;
    }

    // Capture screenshot of Features section
    await page.evaluate(() => {
      const feat = document.querySelector('.framer-181zdp4');
      if (feat) feat.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(150);
    await page.screenshot({ path: `tools/proofs/prod_features_${v.slug}.png` });

    // Capture screenshot of Location section
    await page.evaluate(() => {
      const loc = document.querySelector('#bigtext-1');
      if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(150);
    await page.screenshot({ path: `tools/proofs/prod_location_${v.slug}.png` });

    await page.close();
  }

  await browser.close();

  if (allPassed) {
    console.log('\n==========================================================');
    console.log('>>> ALL 5 LIVE PRODUCTION SUBPAGES VERIFIED 100% PASS! <<<');
    console.log('==========================================================\n');
  } else {
    console.error('\n>>> PROD VERIFICATION FAILED! <<<\n');
    process.exit(1);
  }
})();
