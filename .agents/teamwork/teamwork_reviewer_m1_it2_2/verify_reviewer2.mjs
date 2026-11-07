import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const WORK_DIR = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_reviewer_m1_it2_2';
const REPO_DIR = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

async function main() {
  console.log('======================================================================');
  console.log('REVIEWER 2 INDEPENDENT RUNTIME, ROUTING & DEPLOYMENT VERIFICATION');
  console.log('======================================================================\n');

  const report = {
    timestamp: new Date().toISOString(),
    tests: [],
    passed: 0,
    failed: 0,
    warnings: 0
  };

  function record(category, testName, passed, details, isWarning = false) {
    report.tests.push({ category, testName, passed, isWarning, details });
    if (passed) {
      report.passed++;
      console.log(`[PASS] [${category}] ${testName}`);
    } else if (isWarning) {
      report.warnings++;
      console.warn(`[WARN] [${category}] ${testName}: ${details}`);
    } else {
      report.failed++;
      console.error(`[FAIL] [${category}] ${testName}: ${details}`);
    }
  }

  // -------------------------------------------------------------------------
  // 1. STATIC INTEGRITY: index.html untampered
  // -------------------------------------------------------------------------
  const indexPath = path.join(REPO_DIR, 'index.html');
  const indexStat = fs.statSync(indexPath);
  // Nov 4, 2026 is before Milestone M1 began (Nov 5, 2026)
  const mtime = indexStat.mtime.toISOString();
  const isBeforeM1 = indexStat.mtime < new Date('2026-11-05T00:00:00Z');
  record('Untouchable File', 'index.html mtime prior to M1 start', isBeforeM1, `mtime: ${mtime}, size: ${indexStat.size}`);

  // -------------------------------------------------------------------------
  // 2. DOM & SOURCE AUDIT: open-earth-lawn.html source checks
  // -------------------------------------------------------------------------
  const subpageHtml = fs.readFileSync(path.join(REPO_DIR, 'venues/open-earth-lawn.html'), 'utf8');
  
  // Maps button styling in source
  const hasMapsBg = subpageHtml.includes('#616452');
  const hasMapsText = subpageHtml.includes('#FFF0CA');
  record('Source Audit', 'Open in Maps button styles (#616452 and #FFF0CA) in HTML/CSS', hasMapsBg && hasMapsText, `Bg: ${hasMapsBg}, Text: ${hasMapsText}`);

  // Maps URL in source
  const mapsUrlMatch = subpageHtml.match(/https:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google\.com|www\.google\.com\/maps)[^"'\s]*/i);
  record('Source Audit', 'Valid Google Maps URL in HTML', !!mapsUrlMatch, `Maps URL: ${mapsUrlMatch ? mapsUrlMatch[0] : 'None'}`);

  // Venue card links
  const hasGrasslandLink = subpageHtml.includes('href="/venues/grassland-gala"');
  const hasGardenLink = subpageHtml.includes('href="/venues/garden-galaxy"');
  record('Source Audit', 'Venue cards link to /venues/grassland-gala & /venues/garden-galaxy', hasGrasslandLink && hasGardenLink, `Grassland: ${hasGrasslandLink}, Garden: ${hasGardenLink}`);

  // -------------------------------------------------------------------------
  // 3. LAUNCH PLAYWRIGHT BROWSER (MSEDGE) FOR RUNTIME INSPECTION
  // -------------------------------------------------------------------------
  console.log('\nLaunching Edge browser for live production inspection...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const prodUrl = 'https://the-grand-lucknow.vercel.app/venues/open-earth-lawn';

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];
    const subresourceStatuses = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      pageErrors.push(err.message || String(err));
    });

    page.on('requestfailed', req => {
      failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
    });

    page.on('response', res => {
      if (res.status() >= 400) {
        subresourceStatuses.push({ url: res.url(), status: res.status() });
      }
    });

    console.log(`Navigating to ${prodUrl} ...`);
    const mainResponse = await page.goto(prodUrl, {
      waitUntil: 'networkidle',
      timeout: 45000
    });

    // Verify main HTTP status
    const httpStatus = mainResponse ? mainResponse.status() : 0;
    record('Runtime & Routing', 'Production URL returns HTTP 200', httpStatus === 200, `Status: ${httpStatus}`);

    // Verify Title
    const title = await page.title();
    record('Runtime & Routing', 'Page title is correct', title.includes('The Grand Lucknow'), `Title: "${title}"`);

    // Verify console errors
    record('Runtime & Health', 'Zero console errors', consoleErrors.length === 0, `Errors: ${JSON.stringify(consoleErrors)}`);

    // Verify page errors
    record('Runtime & Health', 'Zero uncaught page errors', pageErrors.length === 0, `Page errors: ${JSON.stringify(pageErrors)}`);

    // Verify subresources
    record('Runtime & Health', 'Zero broken subresources (status >= 400)', subresourceStatuses.length === 0, `Broken: ${JSON.stringify(subresourceStatuses)}`);

    // Verify request failures
    record('Runtime & Health', 'Zero failed network requests', failedRequests.length === 0, `Failed: ${JSON.stringify(failedRequests)}`);

    // -----------------------------------------------------------------------
    // 4. INTERACTIVE INTEGRITY: Open in Maps button styling in computed DOM
    // -----------------------------------------------------------------------
    const mapsBtnInfo = await page.evaluate(() => {
      // Find the Open in Maps button / link
      const links = Array.from(document.querySelectorAll('a'));
      const mapsLink = links.find(a => 
        a.textContent.includes('Open in Maps') || 
        a.href.includes('maps.google') || 
        a.href.includes('goo.gl/maps')
      );
      if (!mapsLink) return null;
      const cs = window.getComputedStyle(mapsLink);
      return {
        text: mapsLink.textContent.trim(),
        href: mapsLink.href,
        bgColor: cs.backgroundColor,
        color: cs.color,
        display: cs.display,
        borderRadius: cs.borderRadius
      };
    });

    if (mapsBtnInfo) {
      console.log('Maps button computed style:', mapsBtnInfo);
      // rgb(97, 100, 82) is #616452
      const isBgMatch = mapsBtnInfo.bgColor === 'rgb(97, 100, 82)' || mapsBtnInfo.bgColor.includes('97, 100, 82');
      // rgb(255, 240, 202) is #FFF0CA
      const isColorMatch = mapsBtnInfo.color === 'rgb(255, 240, 202)' || mapsBtnInfo.color.includes('255, 240, 202');
      const hasValidHref = mapsBtnInfo.href.startsWith('http') && (
        mapsBtnInfo.href.includes('google.com/maps') || 
        mapsBtnInfo.href.includes('goo.gl/maps') || 
        mapsBtnInfo.href.includes('maps.app.goo.gl')
      );

      record('Interactive Elements', 'Open in Maps button background is #616452 (rgb(97, 100, 82))', isBgMatch, `Actual: ${mapsBtnInfo.bgColor}`);
      record('Interactive Elements', 'Open in Maps button text color is #FFF0CA (rgb(255, 240, 202))', isColorMatch, `Actual: ${mapsBtnInfo.color}`);
      record('Interactive Elements', 'Open in Maps button has valid Google Maps URL', hasValidHref, `Actual href: ${mapsBtnInfo.href}`);
    } else {
      record('Interactive Elements', 'Open in Maps button found in DOM', false, 'Element not found');
    }

    // -----------------------------------------------------------------------
    // 5. VENUE CARD LINKS & LIVE NAVIGATION
    // -----------------------------------------------------------------------
    const cardLinks = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('a')).filter(a => 
        a.href.includes('/venues/grassland-gala') || 
        a.href.includes('/venues/garden-galaxy')
      );
      return cards.map(c => ({
        text: c.textContent.trim().replace(/\s+/g, ' '),
        href: c.getAttribute('href'),
        fullHref: c.href
      }));
    });

    console.log('Venue card links found:', cardLinks);
    record('Routing & Navigation', 'Grassland Gala link present on subpage', cardLinks.some(c => c.href.includes('grassland-gala')), JSON.stringify(cardLinks));
    record('Routing & Navigation', 'Garden Galaxy link present on subpage', cardLinks.some(c => c.href.includes('garden-galaxy')), JSON.stringify(cardLinks));

    // Test live navigation for both venue cards
    for (const slug of ['/venues/grassland-gala', '/venues/garden-galaxy']) {
      const targetUrl = `https://the-grand-lucknow.vercel.app${slug}`;
      console.log(`Testing direct navigation to ${targetUrl} ...`);
      const testPage = await context.newPage();
      const res = await testPage.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
      const status = res?.status() || 0;
      const targetTitle = await testPage.title();
      record('Routing & Navigation', `Route ${slug} navigates successfully (HTTP 200)`, status === 200, `Status: ${status}, Title: "${targetTitle}", Final URL: ${testPage.url()}`);
      await testPage.close();
    }

    // -----------------------------------------------------------------------
    // 6. MAP PIN & STICKY CTA CLEARANCE (DESKTOP & MOBILE)
    // -----------------------------------------------------------------------
    const viewports = [
      { name: 'Desktop 1440', width: 1440, height: 900 },
      { name: 'Tablet 768', width: 768, height: 1024 },
      { name: 'Mobile 375', width: 375, height: 812 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(400);

      const collisionResult = await page.evaluate(async () => {
        const pin = document.getElementById('grand-live-pointer');
        const cta = document.getElementById('grand-sticky-cta') || document.querySelector('.framer-y020l') || Array.from(document.querySelectorAll('a, button')).find(el => el.textContent.includes('Check Availability'));
        const locationSection = document.querySelector('.framer-1a6p89q') || document.getElementById('subpage-vector-map')?.closest('section, div[data-framer-name]');

        if (!pin) return { error: 'Pin not found' };
        if (!cta) return { error: 'Sticky CTA not found' };

        // Scroll through location section and check for bounding box overlap
        let overlapFound = false;
        let minClearance = 999999;
        const totalHeight = document.documentElement.scrollHeight;
        const step = 50;

        for (let scrollY = 0; scrollY < totalHeight; scrollY += step) {
          window.scrollTo(0, scrollY);
          const pinRect = pin.getBoundingClientRect();
          const ctaRect = cta.getBoundingClientRect();

          // Only test when pin is in or near viewport
          if (pinRect.bottom >= 0 && pinRect.top <= window.innerHeight) {
            // Check bounding box intersection
            const xOverlap = !(pinRect.right < ctaRect.left || pinRect.left > ctaRect.right);
            const yOverlap = !(pinRect.bottom < ctaRect.top || pinRect.top > ctaRect.bottom);

            if (xOverlap && yOverlap) {
              overlapFound = true;
            }

            // Horizontal clearance when vertically overlapping
            if (yOverlap) {
              const dx = Math.min(
                Math.abs(ctaRect.left - pinRect.right),
                Math.abs(pinRect.left - ctaRect.right)
              );
              if (dx < minClearance) minClearance = dx;
            }
          }
        }
        return { overlapFound, minClearance };
      });

      console.log(`[${vp.name}] Collision probe:`, collisionResult);
      record('Interactive Elements', `Map pin vs Sticky CTA zero collision on ${vp.name}`, !collisionResult.overlapFound, `Overlap: ${collisionResult.overlapFound}, Min clearance: ${collisionResult.minClearance}px`);
    }

    // -----------------------------------------------------------------------
    // 7. MARQUEE TICKER CONTINUITY IN COMPUTED DOM
    // -----------------------------------------------------------------------
    const marqueeMetrics = await page.evaluate(() => {
      const container = document.querySelector('.grand-ticker-container');
      const trackA = document.querySelector('.grand-ticker-track.track-a');
      const trackB = document.querySelector('.grand-ticker-track.track-b');
      if (!container || !trackA || !trackB) return null;

      const csContainer = window.getComputedStyle(container);
      const rectA = trackA.getBoundingClientRect();
      const rectB = trackB.getBoundingClientRect();
      return {
        gap: csContainer.gap,
        trackAWidth: rectA.width,
        trackBWidth: rectB.width,
        tracksEqual: Math.abs(rectA.width - rectB.width) < 1
      };
    });

    console.log('Marquee metrics:', marqueeMetrics);
    if (marqueeMetrics) {
      record('Marquee & Animation', 'Marquee container computed gap is 0px', marqueeMetrics.gap === '0px', `Actual gap: ${marqueeMetrics.gap}`);
      record('Marquee & Animation', 'Marquee track A and track B widths identical', marqueeMetrics.tracksEqual, `Track A: ${marqueeMetrics.trackAWidth}px, Track B: ${marqueeMetrics.trackBWidth}px`);
    }

    // -----------------------------------------------------------------------
    // 8. GALLERY & NUMBERS INTEGRITY
    // -----------------------------------------------------------------------
    const galleryAndNumbers = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const hasLivingRoom = bodyText.includes('Living Room');
      const hasBedroom = bodyText.includes('Bedroom');
      
      // Check fractions
      const fractions = ['1/6', '2/6', '3/6', '4/6', '5/6', '6/6'];
      const missingFractions = fractions.filter(f => !bodyText.includes(f));

      // Check framer-84xumc display
      const framer84Elements = Array.from(document.querySelectorAll('.framer-84xumc'));
      const allHidden = framer84Elements.every(el => window.getComputedStyle(el).display === 'none');

      // Check Garden Galaxy numbers (45,000 and 1,000)
      const has45k = bodyText.includes('45,000');
      const has1k = bodyText.includes('1,000');

      return {
        hasLivingRoom,
        hasBedroom,
        missingFractions,
        framer84Hidden: allHidden || framer84Elements.length === 0,
        has45k,
        has1k
      };
    });

    record('Content Integrity', 'Zero legacy "Living Room" or "Bedroom" captions', !galleryAndNumbers.hasLivingRoom && !galleryAndNumbers.hasBedroom, `LivingRoom: ${galleryAndNumbers.hasLivingRoom}`);
    record('Content Integrity', 'All fractions 1/6 through 6/6 present', galleryAndNumbers.missingFractions.length === 0, `Missing: ${galleryAndNumbers.missingFractions.join(',')}`);
    record('Content Integrity', 'Superscript .framer-84xumc suppressed (display: none)', galleryAndNumbers.framer84Hidden, 'All suppressed');
    record('Content Integrity', 'Garden Galaxy specifications updated to authentic resort scale (45,000 Sqft / 1,000 guests)', galleryAndNumbers.has45k && galleryAndNumbers.has1k, `45k: ${galleryAndNumbers.has45k}, 1k: ${galleryAndNumbers.has1k}`);

  } catch (err) {
    record('Runtime Failure', 'Browser runtime execution error', false, err.stack || err.message);
  } finally {
    await browser.close();
  }

  // -------------------------------------------------------------------------
  // SAVE AUDIT REPORT
  // -------------------------------------------------------------------------
  const reportPath = path.join(WORK_DIR, 'verification_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\nAudit complete! Report written to ${reportPath}`);
  console.log(`Passed: ${report.passed}, Failed: ${report.failed}, Warnings: ${report.warnings}`);
}

main().catch(e => {
  console.error('Fatal error in verify_reviewer2:', e);
  process.exit(1);
});
