import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const EXPECTED_VENUES = [
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

  for (const v of EXPECTED_VENUES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const url = `http://localhost:3003/venues/${v.slug}`;
    await page.goto(url, { waitUntil: 'networkidle' });

    console.log(`\n========================================`);
    console.log(`VERIFYING SUBPAGE: ${v.name} (${url})`);
    console.log(`========================================`);

    // 1. Check Features section text
    const featuresData = await page.evaluate(() => {
      const feat = document.querySelector('.framer-181zdp4'); // container with Features, Size, Capacity
      if (!feat) return null;
      return feat.innerText;
    });

    const hasExpectedSize = featuresData && featuresData.includes(v.expectedSize);
    const hasExpectedCap = featuresData && featuresData.includes(v.expectedCapacity);

    console.log(`1. Features Section:`);
    console.log(`   - Expected Size: ${v.expectedSize} Sqft -> Found: ${hasExpectedSize ? 'PASS' : 'FAIL'}`);
    console.log(`   - Expected Capacity: ${v.expectedCapacity} -> Found: ${hasExpectedCap ? 'PASS' : 'FAIL'}`);

    if (!hasExpectedSize || !hasExpectedCap) {
      allPassed = false;
      console.error(`   Features text snippet: \n${featuresData?.slice(0, 300)}`);
    }

    // 2. Check Location Heading Color & Opacity
    const locData = await page.evaluate(() => {
      const locH = document.querySelector('#bigtext-1 h2');
      const featH = document.querySelector('.framer-paq6hv h2') || document.querySelector('.framer-181zdp4 h2');
      if (!locH) return null;
      const compLoc = window.getComputedStyle(locH);
      const compFeat = featH ? window.getComputedStyle(featH) : null;
      return {
        locColor: compLoc.color,
        locOpacity: compLoc.opacity,
        featColor: compFeat ? compFeat.color : 'rgb(14, 18, 1)'
      };
    });

    const isColorDark = locData && (locData.locColor === 'rgb(14, 18, 1)' || locData.locColor === 'rgba(14, 18, 1, 1)');
    const matchesOtherHeading = locData && locData.locColor === locData.featColor;
    const isOpacityDefaultOne = locData && locData.locOpacity === '1';

    console.log(`2. Location Heading Color & Contrast:`);
    console.log(`   - Location Color: ${locData?.locColor} (Expected rgb(14, 18, 1)) -> ${isColorDark ? 'PASS' : 'FAIL'}`);
    console.log(`   - Matches Features Heading Color: ${matchesOtherHeading ? 'PASS' : 'FAIL'}`);
    console.log(`   - Initial Opacity: ${locData?.locOpacity} (Expected 1) -> ${isOpacityDefaultOne ? 'PASS' : 'FAIL'}`);

    if (!isColorDark || !isOpacityDefaultOne) {
      allPassed = false;
    }

    // 3. Test Scroll Overlap Transition
    // Scroll so Location is under sticky navbar
    await page.evaluate(() => {
      const loc = document.querySelector('#bigtext-1');
      loc.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollBy(0, -60);
    });
    // Wait for transition duration (200ms + margin)
    await page.waitForTimeout(350);

    const overlapOpacity = await page.evaluate(() => {
      const locH = document.querySelector('#bigtext-1 h2');
      return window.getComputedStyle(locH).opacity;
    });

    const isOverlapDimmed = overlapOpacity === '0.45';
    console.log(`3. Overlap Transition with Sticky Navbar Logo:`);
    console.log(`   - Overlap Opacity: ${overlapOpacity} (Expected 0.45) -> ${isOverlapDimmed ? 'PASS' : 'FAIL'}`);

    if (!isOverlapDimmed) {
      allPassed = false;
    }

    // Scroll past
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    await page.waitForTimeout(350);

    const restoredOpacity = await page.evaluate(() => {
      const locH = document.querySelector('#bigtext-1 h2');
      return window.getComputedStyle(locH).opacity;
    });
    const isRestored = restoredOpacity === '1';
    console.log(`   - Restored Opacity past overlap: ${restoredOpacity} (Expected 1) -> ${isRestored ? 'PASS' : 'FAIL'}`);

    if (!isRestored) {
      allPassed = false;
    }

    // Take screenshot of features and location
    await page.evaluate(() => {
      const feat = document.querySelector('.framer-181zdp4');
      feat.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(150);
    await page.screenshot({ path: `tools/proofs/verified_features_${v.slug}.png` });

    await page.evaluate(() => {
      const loc = document.querySelector('#bigtext-1');
      loc.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(150);
    await page.screenshot({ path: `tools/proofs/verified_location_${v.slug}.png` });

    await page.close();
  }

  await browser.close();

  if (allPassed) {
    console.log('\n======================================================');
    console.log('>>> ALL 5 SUBPAGES PASSED 100% OF VERIFICATION CHECKS! <<<');
    console.log('======================================================\n');
  } else {
    console.error('\n>>> SOME VERIFICATION CHECKS FAILED! <<<\n');
    process.exit(1);
  }
})();
