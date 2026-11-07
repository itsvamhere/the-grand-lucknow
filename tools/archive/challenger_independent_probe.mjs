import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function auditEnvironment(baseUrl, label) {
  console.log(`\n===============================================================`);
  console.log(`[INDEPENDENT CHALLENGER AUDIT] ${label} (${baseUrl})`);
  console.log(`===============================================================`);

  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  const envResults = {
    label,
    url: baseUrl,
    desktop_marquee: null,
    mobile_marquee: null,
    mobile_pin_clearance: null,
    venue_numbers: null,
    superscript_suppressed: null
  };

  // 1. Desktop Marquee Test (1440x900) - NO STYLES INJECTED
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${baseUrl}/venues/open-earth-lawn`, { waitUntil: 'networkidle', timeout: 45000 });

    const marqueeRes = await page.evaluate(async () => {
      const containers = Array.from(document.querySelectorAll('.grand-ticker-container'));
      // Container 0 is desktop
      const container = containers[0];
      if (!container) return { error: 'No container found' };

      const trackA = container.querySelector('.grand-ticker-track.track-a');
      const trackB = container.querySelector('.grand-ticker-track.track-b');
      if (!trackA || !trackB) return { error: 'Tracks not found' };

      const cs = window.getComputedStyle(container);
      const itemsA = Array.from(trackA.querySelectorAll('.ticker-item'));
      const itemsB = Array.from(trackB.querySelectorAll('.ticker-item'));

      const anims = document.getAnimations();
      const trackAAnim = anims.find(a => a.effect && a.effect.target === trackA);
      const trackBAnim = anims.find(a => a.effect && a.effect.target === trackB);
      const animDuration = parseFloat(window.getComputedStyle(trackA).animationDuration) || 25;

      // Initial state t = 0
      if (trackAAnim && trackBAnim) {
        trackAAnim.currentTime = 0;
        trackBAnim.currentTime = 0;
      }
      const itemA0_at_0 = itemsA[0].getBoundingClientRect().left;
      const itemA1_at_0 = itemsA[1].getBoundingClientRect().left;

      // End state t = animDuration - 1ms
      if (trackAAnim && trackBAnim) {
        trackAAnim.currentTime = (animDuration * 1000) - 1;
        trackBAnim.currentTime = (animDuration * 1000) - 1;
      }
      const itemB0_at_end = itemsB[0].getBoundingClientRect().left;
      const itemB1_at_end = itemsB[1].getBoundingClientRect().left;

      const seamDeltaItem0 = Math.abs(itemB0_at_end - itemA0_at_0);
      const seamDeltaItem1 = Math.abs(itemB1_at_end - itemA1_at_0);

      // Reset to 0 for static gap check
      if (trackAAnim && trackBAnim) {
        trackAAnim.currentTime = 0;
        trackBAnim.currentTime = 0;
      }
      const intraTrackGap = itemsA[1].getBoundingClientRect().left - itemsA[0].getBoundingClientRect().right;
      const interTrackGap = itemsB[0].getBoundingClientRect().left - itemsA[1].getBoundingClientRect().right;
      const trackGap = trackB.getBoundingClientRect().left - trackA.getBoundingClientRect().right;

      return {
        computedGap: cs.gap,
        trackGap,
        intraTrackGap,
        interTrackGap,
        gapDelta: Math.abs(interTrackGap - intraTrackGap),
        seamDeltaItem0,
        seamDeltaItem1,
        trackWidthA: trackA.offsetWidth,
        trackWidthB: trackB.offsetWidth,
        tracksEqual: trackA.offsetWidth === trackB.offsetWidth
      };
    });

    envResults.desktop_marquee = marqueeRes;
    console.log('Desktop Marquee:', JSON.stringify(marqueeRes, null, 2));

    // Also check Venue specs and superscripts
    const venueAudit = await page.evaluate(() => {
      const sup = document.querySelector('.framer-84xumc');
      const supCs = sup ? window.getComputedStyle(sup) : null;
      const supDisplay = supCs ? supCs.display : 'not_found';

      // Check card 2 Garden Galaxy
      const card2Title = Array.from(document.querySelectorAll('h3, h4, p, span')).find(el => el.textContent.includes('Garden Galaxy'));
      const card2Container = card2Title ? card2Title.closest('.framer-1a6fghv, .framer-6rg8a, [data-framer-name], div') : null;
      const fullText = document.body.innerText;

      const has45k = fullText.includes('45,000');
      const has1000 = fullText.includes('1,000');
      const has120sqft = fullText.includes('120 Sqft') || fullText.includes('120 sqft');
      const has6guests = fullText.match(/\b6 guests\b/i) !== null;

      return {
        supDisplay,
        has45k,
        has1000,
        has120sqft,
        has6guests
      };
    });

    envResults.venue_numbers = venueAudit;
    console.log('Venue Numbers & Superscripts:', JSON.stringify(venueAudit, null, 2));

    await page.close();
  }

  // 2. Mobile Tests (375x812) - NO STYLES INJECTED
  {
    const page = await browser.newPage({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
      isMobile: true
    });
    await page.goto(`${baseUrl}/venues/open-earth-lawn`, { waitUntil: 'networkidle', timeout: 45000 });

    const mobileMarqueeRes = await page.evaluate(async () => {
      const containers = Array.from(document.querySelectorAll('.grand-ticker-container'));
      // Container 1 is mobile
      const container = containers[1] || containers[0];
      const trackA = container.querySelector('.grand-ticker-track.track-a');
      const trackB = container.querySelector('.grand-ticker-track.track-b');

      const cs = window.getComputedStyle(container);
      const itemsA = Array.from(trackA.querySelectorAll('.ticker-item'));
      const itemsB = Array.from(trackB.querySelectorAll('.ticker-item'));

      const anims = document.getAnimations();
      const trackAAnim = anims.find(a => a.effect && a.effect.target === trackA);
      const trackBAnim = anims.find(a => a.effect && a.effect.target === trackB);
      const animDuration = parseFloat(window.getComputedStyle(trackA).animationDuration) || 18;

      if (trackAAnim && trackBAnim) {
        trackAAnim.currentTime = 0;
        trackBAnim.currentTime = 0;
      }
      const itemA0_at_0 = itemsA[0].getBoundingClientRect().left;

      if (trackAAnim && trackBAnim) {
        trackAAnim.currentTime = (animDuration * 1000) - 1;
        trackBAnim.currentTime = (animDuration * 1000) - 1;
      }
      const itemB0_at_end = itemsB[0].getBoundingClientRect().left;
      const seamDeltaItem0 = Math.abs(itemB0_at_end - itemA0_at_0);

      if (trackAAnim && trackBAnim) {
        trackAAnim.currentTime = 0;
        trackBAnim.currentTime = 0;
      }
      const intraTrackGap = itemsA[1].getBoundingClientRect().left - itemsA[0].getBoundingClientRect().right;
      const interTrackGap = itemsB[0].getBoundingClientRect().left - itemsA[1].getBoundingClientRect().right;
      const trackGap = trackB.getBoundingClientRect().left - trackA.getBoundingClientRect().right;

      return {
        computedGap: cs.gap,
        trackGap,
        intraTrackGap,
        interTrackGap,
        gapDelta: Math.abs(interTrackGap - intraTrackGap),
        seamDeltaItem0,
        trackWidthA: trackA.offsetWidth,
        trackWidthB: trackB.offsetWidth,
        tracksEqual: trackA.offsetWidth === trackB.offsetWidth
      };
    });

    envResults.mobile_marquee = mobileMarqueeRes;
    console.log('Mobile Marquee:', JSON.stringify(mobileMarqueeRes, null, 2));

    // Map pin & sticky button collision across scroll
    const mapCollisionRes = await page.evaluate(() => {
      const pin = document.getElementById('grand-live-pointer');
      const btn = document.querySelector('.framer-1n8t7q3[data-framer-name="Sticky Button"], .framer-1n8t7q3');
      const mapSec = document.getElementById('subpage-vector-map') || document.querySelector('.framer-tfszgi[data-framer-name="Location"]');

      if (!pin || !btn || !mapSec) {
        return { error: 'Missing pin, button, or mapSec' };
      }

      const pinStyle = window.getComputedStyle(pin);
      const mapSecStyle = window.getComputedStyle(mapSec);

      const mapRect = mapSec.getBoundingClientRect();
      const absTop = window.scrollY + mapRect.top;

      let minDistance = 99999;
      let hadOverlap = false;
      const samples = [];

      for (let y = absTop - 600; y <= absTop + mapRect.height + 200; y += 15) {
        window.scrollTo(0, y);
        const pBox = pin.getBoundingClientRect();
        const bBox = btn.getBoundingClientRect();

        const pinVisible = (pBox.bottom > 0 && pBox.top < window.innerHeight && pBox.right > 0 && pBox.left < window.innerWidth);
        const btnVisible = (bBox.bottom > 0 && bBox.top < window.innerHeight && bBox.right > 0 && bBox.left < window.innerWidth);

        if (pinVisible && btnVisible) {
          const overlap = !(pBox.right < bBox.left || pBox.left > bBox.right || pBox.bottom < bBox.top || pBox.top > bBox.bottom);
          const dx = Math.max(0, Math.max(pBox.left - bBox.right, bBox.left - pBox.right));
          const dy = Math.max(0, Math.max(pBox.top - bBox.bottom, bBox.top - pBox.bottom));
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (overlap) hadOverlap = true;
          if (dist < minDistance) minDistance = dist;

          samples.push({
            scrollY: y,
            pBox: { left: Math.round(pBox.left), top: Math.round(pBox.top), right: Math.round(pBox.right) },
            bBox: { left: Math.round(bBox.left), top: Math.round(bBox.top), right: Math.round(bBox.right) },
            dx: Math.round(dx),
            dy: Math.round(dy),
            dist: Math.round(dist),
            overlap
          });
        }
      }

      samples.sort((a, b) => a.dist - b.dist);

      return {
        pinLeftComputed: pinStyle.left,
        pinTopComputed: pinStyle.top,
        mapWidthComputed: mapSecStyle.width,
        mapLeftComputed: mapSecStyle.left,
        minDistance: Math.round(minDistance),
        hadOverlap,
        closestSample: samples[0]
      };
    });

    envResults.mobile_pin_clearance = mapCollisionRes;
    console.log('Mobile Pin & Button Collision:', JSON.stringify(mapCollisionRes, null, 2));

    await page.close();
  }

  await browser.close();
  return envResults;
}

async function main() {
  const local = await auditEnvironment('http://localhost:3003', 'LOCAL PREVIEW');
  const prod = await auditEnvironment('https://the-grand-lucknow.vercel.app', 'LIVE PRODUCTION');

  console.log('\n===============================================================');
  console.log('FINAL AUDIT SUMMARY & VERIFICATION GATES');
  console.log('===============================================================');

  const checkPass = (res) => {
    const dMarqueePass = res.desktop_marquee.computedGap === '0px' &&
      res.desktop_marquee.trackGap === 0 &&
      res.desktop_marquee.gapDelta === 0 &&
      res.desktop_marquee.seamDeltaItem0 < 1.0 &&
      res.desktop_marquee.tracksEqual;

    const mMarqueePass = res.mobile_marquee.computedGap === '0px' &&
      res.mobile_marquee.trackGap === 0 &&
      res.mobile_marquee.gapDelta === 0 &&
      res.mobile_marquee.seamDeltaItem0 < 1.0 &&
      res.mobile_marquee.tracksEqual;

    const pinPass = res.mobile_pin_clearance.hadOverlap === false &&
      res.mobile_pin_clearance.minDistance >= 40;

    const venuePass = res.venue_numbers.supDisplay === 'none' &&
      res.venue_numbers.has45k &&
      res.venue_numbers.has1000 &&
      !res.venue_numbers.has120sqft &&
      !res.venue_numbers.has6guests;

    return {
      dMarqueePass,
      mMarqueePass,
      pinPass,
      venuePass,
      allPass: dMarqueePass && mMarqueePass && pinPass && venuePass
    };
  };

  const localEval = checkPass(local);
  const prodEval = checkPass(prod);

  console.log('LOCAL PREVIEW GATES:', localEval);
  console.log('LIVE PRODUCTION GATES:', prodEval);

  const finalVerdict = localEval.allPass && prodEval.allPass ? 'CONFIRMED' : 'REJECTED';
  console.log(`\n>>> EMPIRICAL CHALLENGER VERDICT: ${finalVerdict} <<<`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
