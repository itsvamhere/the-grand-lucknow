/**
 * verify_task3_final.mjs
 * Playwright verification for Task 3 — locations section DOM override + map render
 */
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
  });
  const page = await ctx.newPage();

  page.on('pageerror', err => console.error('[PAGE ERROR]', err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') console.error('[CONSOLE ERROR]', msg.text());
    if (msg.text().includes('Grand Override') || msg.text().includes('Grand Map')) console.log('[LOG]', msg.text());
  });

  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for Framer hydration + our override to fire
  console.log('Waiting for override to apply (up to 15s)...');
  await page.waitForTimeout(3000);

  // Poll until either the address appears or 12s passes
  let addressFound = false;
  for (let i = 0; i < 40; i++) {
    const txt = await page.evaluate(() => {
      const sec = document.getElementById('locations-1');
      return sec ? sec.textContent : '';
    });
    if (txt.includes('Bindaua') || txt.includes('Raibareli')) {
      addressFound = true;
      console.log('✓ Address found in DOM after', (i + 1) * 300, 'ms');
      break;
    }
    if (txt.includes('Gomti Nagar')) {
      console.log(`  Still Gomti Nagar at ${(i + 1) * 300}ms — waiting...`);
    }
    await page.waitForTimeout(300);
  }

  // Wait extra for map canvas to render
  await page.waitForTimeout(4000);

  // ── DOM verification ──────────────────────────────────────────────────────
  const result = await page.evaluate(() => {
    const sec = document.getElementById('locations-1');
    if (!sec) return { error: 'locations-1 not found' };

    // Heading
    const headingSpans = Array.from(sec.querySelectorAll('h1, h2, h3, h4, h5, h6, span'))
      .filter(el => el.children.length === 0 && el.textContent.trim().length > 0);
    const headingText = headingSpans.find(s => s.textContent.trim().match(/^Locations?$/))?.textContent?.trim() || 'NOT FOUND';

    // Address
    const allText = sec.textContent;

    // Links
    const anchors = Array.from(sec.querySelectorAll('a'));
    const mapsLink = anchors.find(a => a.href && a.href.includes('maps.app.goo.gl'))?.href || null;
    const buttonText = anchors.find(a => a.href && a.href.includes('maps.app.goo.gl'))?.textContent?.trim() || null;

    // Map
    const mapCanvas = sec.querySelector('canvas');
    const mapDiv = document.getElementById('grand-vector-map');

    return {
      headingText,
      hasBindaua: allText.includes('Bindaua'),
      hasRaibareli: allText.includes('Raibareli'),
      hasGomtiNagar: allText.includes('Gomti Nagar'),
      mapsLink,
      buttonText,
      hasMapContainer: !!mapDiv,
      hasMapCanvas: !!mapCanvas,
      mapLoaded: window.__grandMapLoaded || false,
      grandPinPresent: !!sec.querySelector('.grand-pill'),
      landmarkPillCount: sec.querySelectorAll('.landmark-pill').length,
    };
  });

  console.log('\n=== TASK 3 VERIFICATION RESULTS ===');
  console.log(JSON.stringify(result, null, 2));

  // ── Screenshots ───────────────────────────────────────────────────────────
  // 1. Full locations section desktop
  const locSec = await page.$('#locations-1');
  if (locSec) {
    await locSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await locSec.screenshot({ path: `${ARTIFACTS}/task3_verified_desktop_section.png` });
    console.log('✓ Desktop section screenshot saved');
  }

  // 2. Zoom on map area
  const mapEl = await page.$('#grand-vector-map, #grand-locations-map-wrap, .framer-1esgfsu');
  if (mapEl) {
    await mapEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await mapEl.screenshot({ path: `${ARTIFACTS}/task3_custom_vector_map.png` });
    console.log('✓ Map screenshot saved');
  } else {
    console.log('⚠ Map element not found for screenshot');
    // Take full page screenshot for debugging
    await page.screenshot({ path: `${ARTIFACTS}/task3_debug_fullpage.png`, fullPage: true });
    console.log('✓ Debug fullpage screenshot saved');
  }

  // 3. Mobile view
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  const locSecMob = await page.$('#locations-1');
  if (locSecMob) {
    await locSecMob.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await locSecMob.screenshot({ path: `${ARTIFACTS}/task3_verified_mobile_section.png` });
    console.log('✓ Mobile section screenshot saved');
  }

  await browser.close();

  // ── Pass/Fail ─────────────────────────────────────────────────────────────
  console.log('\n=== GATE CHECK ===');
  const pass = result.hasBindaua && result.mapsLink && !result.hasGomtiNagar && result.hasMapContainer;
  console.log(`Address (Bindaua): ${result.hasBindaua ? '✅' : '❌'}`);
  console.log(`No Gomti Nagar: ${!result.hasGomtiNagar ? '✅' : '❌'}`);
  console.log(`Maps link: ${result.mapsLink ? '✅' : '❌'} ${result.mapsLink || ''}`);
  console.log(`Map container: ${result.hasMapContainer ? '✅' : '❌'}`);
  console.log(`Map canvas: ${result.hasMapCanvas ? '✅' : '⚠'}`);
  console.log(`Map loaded: ${result.mapLoaded ? '✅' : '⚠'}`);
  console.log(`Grand pin: ${result.grandPinPresent ? '✅' : '⚠'}`);
  console.log(`Landmark pills: ${result.landmarkPillCount}/3 ${result.landmarkPillCount === 3 ? '✅' : '⚠'}`);
  console.log(`\n${pass ? '✅ TASK 3 GATE: PASS' : '❌ TASK 3 GATE: FAIL — check screenshots'}`);
}

run().catch(err => { console.error('FATAL:', err); process.exit(1); });
