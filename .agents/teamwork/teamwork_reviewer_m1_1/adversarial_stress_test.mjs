import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const AUDIT_PROOF_DIR = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_reviewer_m1_1/audit_proofs';
fs.mkdirSync(AUDIT_PROOF_DIR, { recursive: true });

async function stressTest() {
  console.log('=== STARTING ADVERSARIAL STRESS TEST & VISUAL VERIFICATION ===\n');

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  // Test across 3 viewports:
  // 1. Desktop 1920x1080 (ultrawide/large desktop)
  // 2. Desktop 1440x900 (standard laptop)
  // 3. Tablet 1024x768 (mid breakpoint)
  // 4. Mobile 375x812 (iPhone X/12)
  const viewports = [
    { name: 'desktop_1920', width: 1920, height: 1080, isMobile: false },
    { name: 'desktop_1440', width: 1440, height: 900, isMobile: false },
    { name: 'tablet_1024', width: 1024, height: 768, isMobile: false },
    { name: 'mobile_375', width: 375, height: 812, isMobile: true }
  ];

  const prodUrl = 'https://the-grand-lucknow.vercel.app/venues/open-earth-lawn';

  for (const vp of viewports) {
    console.log(`\n--- Stress Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.isMobile ? 2 : 1,
      isMobile: vp.isMobile
    });

    const page = await context.newPage();
    const consoleErrors = [];
    const failedReqs = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', req => {
      failedReqs.push(req.url());
    });

    const response = await page.goto(prodUrl, { waitUntil: 'networkidle', timeout: 45000 });
    console.log(`[HTTP] Status: ${response?.status()}`);

    // Check footer visibility rules per viewport
    const footerAudit = await page.evaluate(() => {
      const footer = document.querySelector('footer.framer-18na9ah');
      if (!footer) return { error: 'No footer found' };

      const desktopVariant = footer.querySelector('.ssr-variant.hidden-o5o8qi');
      const mobileVariant = footer.querySelector('.ssr-variant.hidden-72rtr7');
      const dStyle = desktopVariant ? window.getComputedStyle(desktopVariant) : null;
      const mStyle = mobileVariant ? window.getComputedStyle(mobileVariant) : null;

      const trackA = footer.querySelector('.grand-ticker-track.track-a');
      const trackB = footer.querySelector('.grand-ticker-track.track-b');
      const trackABox = trackA ? trackA.getBoundingClientRect() : null;
      const trackBBox = trackB ? trackB.getBoundingClientRect() : null;

      // Banner checks
      const banner = footer.querySelector('.framer-xj8hz2');
      const bStyle = banner ? window.getComputedStyle(banner) : null;

      return {
        desktopDisplay: dStyle ? dStyle.display : null,
        mobileDisplay: mStyle ? mStyle.display : null,
        trackAWidth: trackABox ? trackABox.width : 0,
        trackBWidth: trackBBox ? trackBBox.width : 0,
        bannerWidth: bStyle ? bStyle.width : null,
        bannerHeight: bStyle ? bStyle.height : null,
        bannerBgImg: bStyle ? bStyle.backgroundImage.slice(0, 50) : null
      };
    });

    console.log(`[Footer Variants] Desktop display: ${footerAudit.desktopDisplay}, Mobile display: ${footerAudit.mobileDisplay}`);
    console.log(`[Marquee Tracks] Track A width: ${footerAudit.trackAWidth}px, Track B width: ${footerAudit.trackBWidth}px`);
    console.log(`[Banner] Size: ${footerAudit.bannerWidth} x ${footerAudit.bannerHeight}`);

    // Scroll to footer and take screenshot
    await page.evaluate(() => {
      const footer = document.querySelector('footer.framer-18na9ah');
      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(AUDIT_PROOF_DIR, `footer_${vp.name}.png`) });

    // Scroll to location and take screenshot
    await page.evaluate(() => {
      const loc = document.getElementById('bigtext-1');
      if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(AUDIT_PROOF_DIR, `location_${vp.name}.png`) });

    // Scroll to map pin and verify overlap
    await page.evaluate(() => {
      const map = document.querySelector('.framer-tfszgi[data-framer-name="Location"]') || document.getElementById('subpage-vector-map');
      if (map) map.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(500);

    const mapClearance = await page.evaluate(() => {
      const pin = document.getElementById('grand-live-pointer');
      const btn = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
      if (!pin || !btn) return { error: 'Missing elements' };
      const pb = pin.getBoundingClientRect();
      const bb = btn.getBoundingClientRect();

      const overlap = !(pb.right < bb.left || pb.left > bb.right || pb.bottom < bb.top || pb.top > bb.bottom);
      const dx = Math.max(0, Math.max(pb.left - bb.right, bb.left - pb.right));
      const dy = Math.max(0, Math.max(pb.top - bb.bottom, bb.top - pb.bottom));
      return {
        overlap,
        distance: Math.sqrt(dx * dx + dy * dy),
        pinLeft: pb.left,
        pinTop: pb.top,
        btnLeft: bb.left,
        btnTop: bb.top
      };
    });

    console.log(`[Map Pin] Overlap with Sticky CTA: ${mapClearance.overlap}, Distance: ${Math.round(mapClearance.distance || 0)}px`);
    await page.screenshot({ path: path.join(AUDIT_PROOF_DIR, `map_${vp.name}.png`) });

    console.log(`[Console Errors] Count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) console.warn('Errors:', consoleErrors);
    console.log(`[Failed Requests] Count: ${failedReqs.length}`);
    if (failedReqs.length > 0) console.warn('Failed URLs:', failedReqs);

    await context.close();
  }

  // Next: Test Route Redirection & HTTP responses for other venues
  console.log('\n--- Stress Testing Other Venues Navigation & Redirects ---');
  const routePage = await browser.newPage();
  
  const testRoutes = [
    { path: '/venues/grassland-gala', expectedTitleSubstring: 'Grassland' },
    { path: '/venues/garden-galaxy', expectedTitleSubstring: 'Garden' }
  ];

  for (const tr of testRoutes) {
    const fullUrl = `https://the-grand-lucknow.vercel.app${tr.path}`;
    console.log(`Checking route: ${fullUrl}`);
    const res = await routePage.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const finalUrl = routePage.url();
    const status = res?.status();
    const title = await routePage.title();
    console.log(`-> HTTP Status: ${status}, Final URL: ${finalUrl}, Page Title: "${title}"`);
  }

  await browser.close();
  console.log('\n=== ADVERSARIAL STRESS TEST COMPLETE ===');
}

stressTest().catch(err => {
  console.error('Stress test fatal error:', err);
  process.exit(1);
});
