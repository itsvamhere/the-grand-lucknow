import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const TARGET_URL = 'https://the-grand-lucknow.vercel.app/venues/open-earth-lawn';

async function runEmpiricalStressTest() {
  console.log('======================================================================');
  console.log('EMPIRICAL CHALLENGER: PRODUCTION NETWORK & BROWSER STRESS TEST');
  console.log(`Target: ${TARGET_URL}`);
  console.log('======================================================================\n');

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const testResults = {
    totalRequests: 0,
    responsesByStatus: {},
    failedRequests: [],
    httpErrors: [], // 4xx or 5xx
    consoleErrors: [],
    consoleWarnings: [],
    pageExceptions: [],
    resourcesHarvested: {
      images: [],
      stylesheets: [],
      scripts: [],
      fonts: [],
      documents: [],
      other: []
    },
    specificVerifications: {}
  };

  // 1. DESKTOP RUN WITH FULL SCROLL
  console.log('>>> [PHASE 1] Desktop Run (1440x900) with complete page scroll traversal...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await desktopContext.newPage();

  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      testResults.consoleErrors.push({ text, location: msg.location() });
    } else if (type === 'warning') {
      testResults.consoleWarnings.push({ text, location: msg.location() });
    }
  });

  page.on('pageerror', err => {
    testResults.pageExceptions.push({ message: err.message, stack: err.stack });
  });

  page.on('requestfailed', req => {
    testResults.failedRequests.push({
      url: req.url(),
      resourceType: req.resourceType(),
      errorText: req.failure()?.errorText
    });
  });

  page.on('response', resp => {
    testResults.totalRequests++;
    const status = resp.status();
    testResults.responsesByStatus[status] = (testResults.responsesByStatus[status] || 0) + 1;
    const url = resp.url();
    const req = resp.request();
    const resourceType = req.resourceType();
    const headers = resp.headers();

    const record = {
      url,
      status,
      contentType: headers['content-type'] || '',
      contentLength: headers['content-length'] || ''
    };

    if (status >= 400) {
      testResults.httpErrors.push(record);
    }

    if (resourceType === 'image') testResults.resourcesHarvested.images.push(record);
    else if (resourceType === 'stylesheet') testResults.resourcesHarvested.stylesheets.push(record);
    else if (resourceType === 'script') testResults.resourcesHarvested.scripts.push(record);
    else if (resourceType === 'font') testResults.resourcesHarvested.fonts.push(record);
    else if (resourceType === 'document') testResults.resourcesHarvested.documents.push(record);
    else testResults.resourcesHarvested.other.push(record);
  });

  const response = await page.goto(TARGET_URL, {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  console.log(`Initial page load HTTP status: ${response.status()}`);

  // Slow scroll down through entire page
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Traversing full page height (${totalHeight}px) to trigger lazy assets...`);
  
  for (let y = 0; y <= totalHeight; y += 400) {
    await page.evaluate(top => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
  }
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);

  // Check specific DOM states & assets
  const domChecks = await page.evaluate(() => {
    const heroImg = document.querySelector('img[src*="the_grand_open_earth_lawn_hero.jpg"]');
    const heroNaturalWidth = heroImg ? heroImg.naturalWidth : 0;
    const heroNaturalHeight = heroImg ? heroImg.naturalHeight : 0;

    const card2 = document.querySelector('img[src*="card_2_grassland_gala.webp"]');
    const card2Loaded = card2 ? card2.naturalWidth > 0 : false;

    const card3 = document.querySelector('img[src*="card_3_ballroom.webp"]');
    const card3Loaded = card3 ? card3.naturalWidth > 0 : false;

    const venueLinkGrassland = document.querySelector('a[href="/venues/grassland-gala"]');
    const venueLinkGarden = document.querySelector('a[href="/venues/garden-galaxy"]');

    return {
      heroImgFound: !!heroImg,
      heroNaturalWidth,
      heroNaturalHeight,
      card2Found: !!card2,
      card2Loaded,
      card3Found: !!card3,
      card3Loaded,
      venueLinkGrasslandFound: !!venueLinkGrassland,
      venueLinkGardenFound: !!venueLinkGarden
    };
  });

  testResults.specificVerifications.domChecks = domChecks;
  await desktopContext.close();

  // 2. MOBILE RUN (375x812)
  console.log('\n>>> [PHASE 2] Mobile Run (375x812 iPhone X) with full scroll...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on('console', msg => {
    if (msg.type() === 'error') {
      testResults.consoleErrors.push({ text: `[Mobile] ${msg.text()}`, location: msg.location() });
    }
  });

  mobilePage.on('pageerror', err => {
    testResults.pageExceptions.push({ message: `[Mobile] ${err.message}`, stack: err.stack });
  });

  mobilePage.on('requestfailed', req => {
    testResults.failedRequests.push({
      url: `[Mobile] ${req.url()}`,
      resourceType: req.resourceType(),
      errorText: req.failure()?.errorText
    });
  });

  await mobilePage.goto(TARGET_URL, {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  const mobileHeight = await mobilePage.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= mobileHeight; y += 400) {
    await mobilePage.evaluate(top => window.scrollTo(0, top), y);
    await mobilePage.waitForTimeout(100);
  }
  await mobilePage.waitForTimeout(1500);

  await mobileContext.close();
  await browser.close();

  // 3. CONCURRENT STRESS & EXACT BYTE VERIFICATION VIA FETCH
  console.log('\n>>> [PHASE 3] Concurrency & Exact Byte Verification via Direct HTTP Fetch...');

  // Specific Asset 1: Open Earth Lawn Hero
  const heroUrl = 'https://the-grand-lucknow.vercel.app/images/venues/the_grand_open_earth_lawn_hero.jpg';
  const heroRes = await fetch(heroUrl);
  const heroBuf = await heroRes.arrayBuffer();
  testResults.specificVerifications.heroAsset = {
    url: heroUrl,
    status: heroRes.status,
    byteSize: heroBuf.byteLength,
    expectedByteSize: 76737,
    matchesExpected: heroBuf.byteLength === 76737,
    contentType: heroRes.headers.get('content-type')
  };

  // Specific Asset 2 & 3: Cards
  const card2Url = 'https://the-grand-lucknow.vercel.app/images/card_2_grassland_gala.webp';
  const card2Res = await fetch(card2Url);
  const card2Buf = await card2Res.arrayBuffer();
  testResults.specificVerifications.card2Asset = {
    url: card2Url,
    status: card2Res.status,
    byteSize: card2Buf.byteLength,
    contentType: card2Res.headers.get('content-type')
  };

  const card3Url = 'https://the-grand-lucknow.vercel.app/images/card_3_ballroom.webp';
  const card3Res = await fetch(card3Url);
  const card3Buf = await card3Res.arrayBuffer();
  testResults.specificVerifications.card3Asset = {
    url: card3Url,
    status: card3Res.status,
    byteSize: card3Buf.byteLength,
    contentType: card3Res.headers.get('content-type')
  };

  // Specific Venue Links (Direct & Redirect checks)
  const venueGrasslandUrl = 'https://the-grand-lucknow.vercel.app/venues/grassland-gala';
  const venueGrasslandDirect = await fetch(venueGrasslandUrl, { redirect: 'manual' });
  const venueGrasslandFollow = await fetch(venueGrasslandUrl, { redirect: 'follow' });
  testResults.specificVerifications.venueGrassland = {
    url: venueGrasslandUrl,
    initialStatus: venueGrasslandDirect.status,
    initialLocation: venueGrasslandDirect.headers.get('location'),
    finalStatus: venueGrasslandFollow.status,
    finalUrl: venueGrasslandFollow.url
  };

  const venueGardenUrl = 'https://the-grand-lucknow.vercel.app/venues/garden-galaxy';
  const venueGardenDirect = await fetch(venueGardenUrl, { redirect: 'manual' });
  const venueGardenFollow = await fetch(venueGardenUrl, { redirect: 'follow' });
  testResults.specificVerifications.venueGarden = {
    url: venueGardenUrl,
    initialStatus: venueGardenDirect.status,
    initialLocation: venueGardenDirect.headers.get('location'),
    finalStatus: venueGardenFollow.status,
    finalUrl: venueGardenFollow.url
  };

  // Concurrency Stress: 10 parallel requests to each key asset
  console.log('Sending burst of 10 concurrent requests to hero image...');
  const burstResults = await Promise.all(
    Array.from({ length: 10 }).map(async (_, idx) => {
      const start = Date.now();
      const r = await fetch(heroUrl);
      const b = await r.arrayBuffer();
      const duration = Date.now() - start;
      return { idx, status: r.status, size: b.byteLength, durationMs: duration };
    })
  );
  testResults.specificVerifications.concurrencyBurst = burstResults;

  // PRINT SUMMARY
  console.log('\n======================================================================');
  console.log('CHALLENGER STRESS TEST RESULTS:');
  console.log('======================================================================');
  console.log(`Total Requests Processed: ${testResults.totalRequests}`);
  console.log('Response Status Counts:', JSON.stringify(testResults.responsesByStatus));
  console.log(`HTTP Errors (4xx/5xx): ${testResults.httpErrors.length}`);
  console.log(`Failed Requests: ${testResults.failedRequests.length}`);
  console.log(`Console Errors: ${testResults.consoleErrors.length}`);
  console.log(`Console Warnings: ${testResults.consoleWarnings.length}`);
  console.log(`Page Exceptions: ${testResults.pageExceptions.length}`);
  console.log('\nHarvested Resources Breakdown:');
  console.log(`  - Documents: ${testResults.resourcesHarvested.documents.length}`);
  console.log(`  - Stylesheets: ${testResults.resourcesHarvested.stylesheets.length}`);
  console.log(`  - Scripts: ${testResults.resourcesHarvested.scripts.length}`);
  console.log(`  - Images: ${testResults.resourcesHarvested.images.length}`);
  console.log(`  - Fonts: ${testResults.resourcesHarvested.fonts.length}`);
  console.log(`  - Other: ${testResults.resourcesHarvested.other.length}`);
  console.log('\nSpecific Assertions:');
  console.log('  Hero Asset (76737 bytes):', testResults.specificVerifications.heroAsset);
  console.log('  Card 2 (Grassland Gala):', testResults.specificVerifications.card2Asset);
  console.log('  Card 3 (Ballroom):', testResults.specificVerifications.card3Asset);
  console.log('  Venue Link Grassland Gala:', testResults.specificVerifications.venueGrassland);
  console.log('  Venue Link Garden Galaxy:', testResults.specificVerifications.venueGarden);
  console.log('  DOM Checks:', testResults.specificVerifications.domChecks);

  // Write out full raw log to a json report
  fs.writeFileSync('tools/challenger_stress_results.json', JSON.stringify(testResults, null, 2));
  console.log('\nDetailed JSON saved to tools/challenger_stress_results.json');
}

runEmpiricalStressTest().catch(err => {
  console.error('STRESS TEST CRASHED:', err);
  process.exit(1);
});
