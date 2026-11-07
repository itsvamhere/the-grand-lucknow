import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const PROOFS_DIR = 'tools/proofs_challenger';
fs.mkdirSync(PROOFS_DIR, { recursive: true });

async function runChallengerStressTest(baseUrl, label) {
  console.log(`\n===============================================================`);
  console.log(`[CHALLENGER STRESS SUITE] Testing ${label}: ${baseUrl}`);
  console.log(`===============================================================`);

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const results = {
    label,
    url: baseUrl,
    task1_marquee: { passed: false, details: [] },
    task2_hover: { passed: false, details: [] },
    task3_collision: { passed: false, details: [] },
    task4_gallery: { passed: false, details: [] },
    overallPassed: false
  };

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    console.log(`Loading ${baseUrl}/venues/open-earth-lawn ...`);
    const resp = await page.goto(`${baseUrl}/venues/open-earth-lawn`, {
      waitUntil: 'networkidle',
      timeout: 45000
    });
    console.log(`HTTP Status: ${resp?.status()}`);

    // =========================================================================
    // TASK 1: INFINITE LOOP MARQUEE TICKER STRESS TEST
    // =========================================================================
    console.log(`\n>>> TASK 1: Infinite loop marquee ticker sampling & wrap continuity`);
    await page.evaluate(() => {
      const footer = document.querySelector('footer.framer-18na9ah');
      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
    });
    await page.waitForTimeout(600);

    const tickerStress = await page.evaluate(async () => {
      const container = document.querySelector('.grand-ticker-container');
      const trackA = document.querySelector('.grand-ticker-track.track-a');
      const trackB = document.querySelector('.grand-ticker-track.track-b');

      if (!container || !trackA || !trackB) {
        return { error: 'Ticker container or tracks not found' };
      }

      // Check CSS animation definitions
      const trackAStyle = window.getComputedStyle(trackA);
      const animDuration = parseFloat(trackAStyle.animationDuration) || 25; // seconds
      const animTiming = trackAStyle.animationTimingFunction;
      const animIteration = trackAStyle.animationIterationCount;

      const trackAItems = Array.from(trackA.querySelectorAll('.ticker-item'));
      const trackBItems = Array.from(trackB.querySelectorAll('.ticker-item'));

      // Web Animations API control
      const anims = document.getAnimations();
      const trackAAnim = anims.find(a => a.effect && a.effect.target === trackA);
      const trackBAnim = anims.find(a => a.effect && a.effect.target === trackB);

      const samples = [];
      const testTimes = [0, 5, 12.5, 24.5, 24.8, 24.9, 24.95, 25.0, 25.05, 25.1, 26.0];

      for (const t of testTimes) {
        // Set animation time directly (at t = animDuration, sample limit t -> T^- to evaluate wrap continuity)
        if (trackAAnim && trackBAnim) {
          const sampleMs = (t === animDuration) ? (t * 1000) - 1 : t * 1000;
          trackAAnim.currentTime = sampleMs;
          trackBAnim.currentTime = sampleMs;
        }

        const boxContainer = container.getBoundingClientRect();
        const boxA = trackA.getBoundingClientRect();
        const boxB = trackB.getBoundingClientRect();

        const itemA0 = trackAItems[0] ? trackAItems[0].getBoundingClientRect() : null;
        const itemA1 = trackAItems[1] ? trackAItems[1].getBoundingClientRect() : null;
        const itemB0 = trackBItems[0] ? trackBItems[0].getBoundingClientRect() : null;
        const itemB1 = trackBItems[1] ? trackBItems[1].getBoundingClientRect() : null;

        // Gap between Track A and Track B
        const trackGap = boxB.left - boxA.right;
        // Gap between last item of Track A and first item of Track B
        const itemABGap = itemB0 && itemA1 ? itemB0.left - itemA1.right : null;
        // Gap between items within Track A
        const intraTrackGap = itemA1 && itemA0 ? itemA1.left - itemA0.right : null;

        samples.push({
          timeSec: t,
          trackALeft: boxA.left,
          trackARight: boxA.right,
          trackBLeft: boxB.left,
          trackBRight: boxB.right,
          trackWidthA: boxA.width,
          trackWidthB: boxB.width,
          trackGap,
          itemABGap,
          intraTrackGap,
          itemA0Left: itemA0?.left,
          itemA1Left: itemA1?.left,
          itemB0Left: itemB0?.left,
          itemB1Left: itemB1?.left
        });
      }

      // Check Wrap Continuity:
      // At t = 0.0s, Item A0 position should exactly equal Item B0 position at t = 25.0s
      const sampleAt0 = samples.find(s => s.timeSec === 0);
      const sampleAt25 = samples.find(s => s.timeSec === 25.0);

      const seamDiffA0vsB0 = sampleAt0 && sampleAt25 ? Math.abs(sampleAt0.itemA0Left - sampleAt25.itemB0Left) : 9999;
      const seamDiffA1vsB1 = sampleAt0 && sampleAt25 ? Math.abs(sampleAt0.itemA1Left - sampleAt25.itemB1Left) : 9999;
      const widthMatch = sampleAt0 ? Math.abs(sampleAt0.trackWidthA - sampleAt0.trackWidthB) < 1 : false;

      // Resume animation
      if (trackAAnim) trackAAnim.play();
      if (trackBAnim) trackBAnim.play();

      return {
        animDuration,
        animTiming,
        animIteration,
        trackWidthA: sampleAt0?.trackWidthA,
        trackWidthB: sampleAt0?.trackWidthB,
        widthMatch,
        seamDiffA0vsB0,
        seamDiffA1vsB1,
        samples
      };
    });

    console.log(`Ticker Duration: ${tickerStress.animDuration}s, Timing: ${tickerStress.animTiming}, Iteration: ${tickerStress.animIteration}`);
    console.log(`Track A width: ${tickerStress.trackWidthA}px, Track B width: ${tickerStress.trackWidthB}px (Match: ${tickerStress.widthMatch})`);
    console.log(`Wrap Seam Difference (Item A0 at 0s vs Item B0 at 25s): ${tickerStress.seamDiffA0vsB0.toFixed(3)}px`);
    console.log(`Wrap Seam Difference (Item A1 at 0s vs Item B1 at 25s): ${tickerStress.seamDiffA1vsB1.toFixed(3)}px`);

    tickerStress.samples.forEach(s => {
      console.log(`  t=${s.timeSec.toFixed(2)}s | TrackA: [${Math.round(s.trackALeft)}..${Math.round(s.trackARight)}] | TrackB: [${Math.round(s.trackBLeft)}..${Math.round(s.trackBRight)}] | Inter-Track Item Gap: ${s.itemABGap ? Math.round(s.itemABGap) : 'N/A'}px (Intra-gap: ${Math.round(s.intraTrackGap)}px)`);
    });

    const task1Pass = tickerStress.widthMatch &&
      tickerStress.seamDiffA0vsB0 < 1.0 &&
      tickerStress.seamDiffA1vsB1 < 1.0 &&
      tickerStress.samples.every(s => s.trackGap < 1.0); // Track B starts directly adjacent to Track A

    results.task1_marquee = {
      passed: task1Pass,
      animDuration: tickerStress.animDuration,
      seamDiffA0vsB0: tickerStress.seamDiffA0vsB0,
      seamDiffA1vsB1: tickerStress.seamDiffA1vsB1,
      samples: tickerStress.samples
    };
    console.log(`>>> TASK 1 VERDICT: ${task1Pass ? 'PASS (Zero visual seam / jump mathematically & empirically verified)' : 'FAIL'}`);

    await page.screenshot({ path: path.join(PROOFS_DIR, `${label}_task1_ticker.png`) });

    // =========================================================================
    // TASK 2: CHARACTER HOVER STABILITY STRESS TEST
    // =========================================================================
    console.log(`\n>>> TASK 2: Character hover stability & rapid cursor thrashing`);
    const footerLinks = await page.$$('footer.framer-18na9ah a');
    console.log(`Found ${footerLinks.length} footer link elements to stress-test.`);

    const linkResults = [];
    for (let i = 0; i < footerLinks.length; i++) {
      const link = footerLinks[i];
      const linkText = (await link.textContent()).trim();
      if (!linkText) continue;

      // Check DOM structure before hover
      const domPre = await link.evaluate(el => {
        const spans = Array.from(el.querySelectorAll('span'));
        const hasSplits = spans.some(s => s.textContent.trim().length === 1);
        const hasRolling = el.querySelector('[data-rolling-label]') !== null;
        return {
          innerHtml: el.innerHTML,
          spanCount: spans.length,
          hasSplits,
          hasRolling,
          computedLetterSpacing: window.getComputedStyle(el).letterSpacing,
          computedOpacity: window.getComputedStyle(el).opacity
        };
      });

      // Cursor thrashing: Rapidly enter and leave link 20 times over 200ms
      const box = await link.boundingBox();
      let thrashPassed = true;
      if (box) {
        for (let cycle = 0; cycle < 10; cycle++) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.waitForTimeout(10);
          await page.mouse.move(box.x - 50, box.y - 50);
          await page.waitForTimeout(10);
        }
        // Hover state check
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(50);
      }

      const domPost = await link.evaluate(el => {
        const text = el.textContent.trim();
        const spans = Array.from(el.querySelectorAll('span'));
        const hasSplits = spans.some(s => s.textContent.trim().length === 1);
        const childTransforms = spans.map(s => window.getComputedStyle(s).transform);
        const hasNonIdentityTransform = childTransforms.some(t => t && t !== 'none' && t !== 'matrix(1, 0, 0, 1, 0, 0)');
        const opacity = window.getComputedStyle(el).opacity;

        return {
          text,
          hasSplits,
          hasNonIdentityTransform,
          opacity
        };
      });

      // Clear hover
      await page.mouse.move(0, 0);

      const noSplitting = !domPre.hasSplits && !domPost.hasSplits && !domPost.hasNonIdentityTransform;
      const textIntact = !domPost.text.includes('  ') && domPost.text === linkText;

      linkResults.push({
        text: linkText,
        spanCount: domPre.spanCount,
        hasRolling: domPre.hasRolling,
        noSplitting,
        textIntact,
        hoverOpacity: domPost.opacity,
        pass: noSplitting && textIntact
      });

      console.log(`  Link "${linkText}": spans=${domPre.spanCount}, rolling=${domPre.hasRolling}, noSplit=${noSplitting}, hoverOpacity=${domPost.opacity}`);
    }

    const task2Pass = linkResults.every(lr => lr.pass);
    results.task2_hover = {
      passed: task2Pass,
      linkResults
    };
    console.log(`>>> TASK 2 VERDICT: ${task2Pass ? 'PASS (Zero character splitting, solid text spans under cursor thrashing)' : 'FAIL'}`);

    await page.screenshot({ path: path.join(PROOFS_DIR, `${label}_task2_hover.png`) });

    // =========================================================================
    // TASK 3: MAP PIN & STICKY BUTTON COLLISION ACROSS 5 VIEWPORT SIZES
    // =========================================================================
    console.log(`\n>>> TASK 3: Map pin & sticky button collision across 5 responsive viewports`);
    const viewports = [
      { width: 1920, height: 1080, name: '1920px (Large Desktop)' },
      { width: 1440, height: 900, name: '1440px (Desktop)' },
      { width: 1024, height: 768, name: '1024px (Tablet Landscape)' },
      { width: 768, height: 1024, name: '768px (Tablet Portrait)' },
      { width: 375, height: 812, name: '375px (Mobile)' }
    ];

    const vpResults = [];
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(500);

      // Locate map section and pin
      const collisionAudit = await page.evaluate(async () => {
        const pin = document.getElementById('grand-live-pointer');
        const btn = document.querySelector('.framer-1n8t7q3[data-framer-name="Sticky Button"], .framer-1n8t7q3');
        const mapSec = document.getElementById('subpage-vector-map') || document.querySelector('.framer-tfszgi[data-framer-name="Location"]');

        if (!pin || !btn || !mapSec) {
          return { error: 'Pin, sticky button, or map section not found', hasPin: !!pin, hasBtn: !!btn, hasMap: !!mapSec };
        }

        const mapRect = mapSec.getBoundingClientRect();
        const absoluteMapTop = window.scrollY + mapRect.top;
        const mapHeight = mapRect.height;

        // Sample continuous scroll journey through the map section
        let minDistance = 99999;
        let hadOverlap = false;
        const scrollSamples = [];

        const startScroll = Math.max(0, absoluteMapTop - window.innerHeight);
        const endScroll = absoluteMapTop + mapHeight;
        const step = Math.max(30, (endScroll - startScroll) / 20);

        for (let y = startScroll; y <= endScroll; y += step) {
          window.scrollTo(0, y);
          const pBox = pin.getBoundingClientRect();
          const bBox = btn.getBoundingClientRect();

          // Check if pin is currently visible in viewport
          const pinInViewport = (pBox.bottom > 0 && pBox.top < window.innerHeight && pBox.right > 0 && pBox.left < window.innerWidth);
          const btnInViewport = (bBox.bottom > 0 && bBox.top < window.innerHeight && bBox.right > 0 && bBox.left < window.innerWidth);

          if (pinInViewport && btnInViewport) {
            const overlap = !(pBox.right < bBox.left || pBox.left > bBox.right || pBox.bottom < bBox.top || pBox.top > bBox.bottom);
            const dx = Math.max(0, Math.max(pBox.left - bBox.right, bBox.left - pBox.right));
            const dy = Math.max(0, Math.max(pBox.top - bBox.bottom, bBox.top - pBox.bottom));
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (overlap) hadOverlap = true;
            if (dist < minDistance) minDistance = dist;

            scrollSamples.push({
              scrollY: Math.round(y),
              pinLeft: Math.round(pBox.left),
              pinTop: Math.round(pBox.top),
              btnLeft: Math.round(bBox.left),
              btnTop: Math.round(bBox.top),
              dist: Math.round(dist),
              overlap
            });
          }
        }

        return {
          minDistance,
          hadOverlap,
          scrollSamples
        };
      });

      console.log(`  Viewport ${vp.name}: Had Overlap = ${collisionAudit.hadOverlap}, Min Clearance = ${Math.round(collisionAudit.minDistance)}px`);
      const vpPassed = !collisionAudit.hadOverlap && collisionAudit.minDistance >= 40;
      vpResults.push({
        viewport: vp.name,
        width: vp.width,
        hadOverlap: collisionAudit.hadOverlap,
        minDistance: collisionAudit.minDistance,
        passed: vpPassed
      });

      await page.screenshot({ path: path.join(PROOFS_DIR, `${label}_task3_map_vp_${vp.width}.png`) });
    }

    const task3Pass = vpResults.every(v => v.passed);
    results.task3_collision = {
      passed: task3Pass,
      vpResults
    };
    console.log(`>>> TASK 3 VERDICT: ${task3Pass ? 'PASS (Strictly zero collision across all 5 responsive viewports)' : 'FAIL'}`);

    // =========================================================================
    // TASK 4: GALLERY FRACTION NUMBERING REGEX AUDIT
    // =========================================================================
    console.log(`\n>>> TASK 4: Gallery fraction numbering regex audit (^[1-6]/6$)`);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => {
      const slider = document.querySelector('[data-framer-name="Photo Slider"]') || document.querySelector('.framer-6rg8a');
      if (slider) slider.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(600);

    const galleryAudit = await page.evaluate(() => {
      // Find all counter elements in gallery slides
      const fractionRegex = /^[1-6]\/6$/;
      const allTextNodes = Array.from(document.querySelectorAll('*'))
        .filter(el => el.children.length === 0 && el.textContent.trim().length > 0);

      // Find fraction elements
      const fractionElements = allTextNodes
        .filter(el => fractionRegex.test(el.textContent.trim()))
        .map(el => el.textContent.trim());

      // Check for forbidden old labels in the gallery section
      const gallerySec = document.querySelector('[data-framer-name="Photo Slider"]') || document.body;
      const forbiddenTerms = ['Living Room', 'Bedroom', '01', '02', '03', '04', '05', '06', '1 / 6', '2 / 6'];
      const forbiddenFound = forbiddenTerms.filter(term => gallerySec.innerHTML.includes(`>${term}<`));

      // Check alignment of counter
      const counterContainer = document.querySelector('.framer-6rg8a');
      const counterStyle = counterContainer ? window.getComputedStyle(counterContainer) : null;
      const isRightAligned = counterStyle ? (counterStyle.justifyContent === 'flex-end' || counterStyle.textAlign === 'right') : false;

      return {
        fractionElements,
        fractionCount: fractionElements.length,
        forbiddenFound,
        isRightAligned
      };
    });

    console.log(`Found ${galleryAudit.fractionCount} fraction counters:`, galleryAudit.fractionElements);
    console.log(`Forbidden legacy terms found in gallery:`, galleryAudit.forbiddenFound);
    console.log(`Counter right-aligned:`, galleryAudit.isRightAligned);

    // Verify exactly 1/6 through 6/6 exist
    const expectedFractions = ['1/6', '2/6', '3/6', '4/6', '5/6', '6/6'];
    const allExpectedPresent = expectedFractions.every(f => galleryAudit.fractionElements.includes(f));
    const allMatchRegex = galleryAudit.fractionElements.every(f => /^[1-6]\/6$/.test(f));
    const zeroForbidden = galleryAudit.forbiddenFound.length === 0;

    const task4Pass = allExpectedPresent && allMatchRegex && zeroForbidden;
    results.task4_gallery = {
      passed: task4Pass,
      fractionElements: galleryAudit.fractionElements,
      allExpectedPresent,
      allMatchRegex,
      zeroForbidden
    };
    console.log(`>>> TASK 4 VERDICT: ${task4Pass ? 'PASS (Strict regex ^[1-6]/6$ across all slides, zero legacy labels)' : 'FAIL'}`);

    await page.screenshot({ path: path.join(PROOFS_DIR, `${label}_task4_gallery.png`) });

    results.overallPassed = task1Pass && task2Pass && task3Pass && task4Pass;

    await browser.close();
    return results;
  } catch (err) {
    console.error('Error during stress test:', err);
    await browser.close();
    results.error = err.message;
    return results;
  }
}

async function main() {
  console.log('STARTING EMPIRICAL CHALLENGER STRESS HARNESS...');
  const localResults = await runChallengerStressTest('http://localhost:3003', 'local');
  const prodResults = await runChallengerStressTest('https://the-grand-lucknow.vercel.app', 'prod');

  console.log('\n===============================================================');
  console.log('CHALLENGER STRESS TEST FINAL SUMMARY');
  console.log('===============================================================');
  console.log('Local Preview Server (localhost:3003):', localResults.overallPassed ? 'ALL PASS' : 'FAILED');
  console.log('  Task 1 Marquee:', localResults.task1_marquee.passed ? 'PASS' : 'FAIL');
  console.log('  Task 2 Hover:', localResults.task2_hover.passed ? 'PASS' : 'FAIL');
  console.log('  Task 3 Collision:', localResults.task3_collision.passed ? 'PASS' : 'FAIL');
  console.log('  Task 4 Gallery:', localResults.task4_gallery.passed ? 'PASS' : 'FAIL');

  console.log('\nLive Production (the-grand-lucknow.vercel.app):', prodResults.overallPassed ? 'ALL PASS' : 'FAILED');
  console.log('  Task 1 Marquee:', prodResults.task1_marquee.passed ? 'PASS' : 'FAIL');
  console.log('  Task 2 Hover:', prodResults.task2_hover.passed ? 'PASS' : 'FAIL');
  console.log('  Task 3 Collision:', prodResults.task3_collision.passed ? 'PASS' : 'FAIL');
  console.log('  Task 4 Gallery:', prodResults.task4_gallery.passed ? 'PASS' : 'FAIL');

  const finalVerdict = localResults.overallPassed && prodResults.overallPassed ? 'CONFIRMED' : 'REJECTED';
  console.log(`\nOVERALL EMPIRICAL CHALLENGE VERDICT: ${finalVerdict}`);

  fs.writeFileSync('tools/proofs_challenger/results.json', JSON.stringify({ local: localResults, prod: prodResults, verdict: finalVerdict }, null, 2));
}

main().catch(err => {
  console.error('Fatal stress test runner error:', err);
  process.exit(1);
});
