import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function runReviewerAudit() {
  console.log('=== REVIEWER 1 INDEPENDENT VERIFICATION (M1 ITERATION 2) ===\n');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = {
    r1_marquee: {},
    r2_map: {},
    r3_numbers: {},
    r4_index_untouched: {},
    adversarial_checks: {}
  };

  // -------------------------------------------------------------
  // 1. MARQUEE TICKER CHECK (Desktop & Mobile)
  // -------------------------------------------------------------
  console.log('--- 1. MARQUEE TICKER CHECK ---');
  for (const vp of [{ width: 1440, height: 900, name: 'Desktop' }, { width: 375, height: 812, name: 'Mobile' }]) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

    const isMobile = vp.width <= 809.98;
    const tickerData = await page.evaluate((isMobile) => {
      const containers = Array.from(document.querySelectorAll('.grand-ticker-container'));
      // Container 0 is desktop, 1 is mobile
      const visibleContainer = containers.find(c => {
        const cs = window.getComputedStyle(c);
        return cs.display !== 'none' && c.offsetParent !== null;
      }) || (isMobile ? containers[1] : containers[0]);

      if (!visibleContainer) return { error: 'No visible container found' };

      const cs = window.getComputedStyle(visibleContainer);
      const trackA = visibleContainer.querySelector('.grand-ticker-track.track-a');
      const trackB = visibleContainer.querySelector('.grand-ticker-track.track-b');

      if (!trackA || !trackB) return { error: 'Tracks not found' };

      const csA = window.getComputedStyle(trackA);
      const csB = window.getComputedStyle(trackB);

      const itemsA = Array.from(trackA.querySelectorAll('.ticker-item'));
      const itemsB = Array.from(trackB.querySelectorAll('.ticker-item'));

      const anims = document.getAnimations();
      const aAnim = anims.find(a => a.effect && a.effect.target === trackA);
      const bAnim = anims.find(a => a.effect && a.effect.target === trackB);

      const animDuration = parseFloat(csA.animationDuration) || 25;

      // Sample at 0
      if (aAnim && bAnim) {
        aAnim.currentTime = 0;
        bAnim.currentTime = 0;
      }
      const rectA0 = itemsA[0].getBoundingClientRect();
      const rectA1 = itemsA[1].getBoundingClientRect();
      const rectB0_at_0 = itemsB[0].getBoundingClientRect();

      const trackA_rect = trackA.getBoundingClientRect();
      const trackB_rect = trackB.getBoundingClientRect();

      const trackGap = trackB_rect.left - trackA_rect.right;
      const intraTrackGap = rectA1.left - rectA0.right;
      const interTrackGap = rectB0_at_0.left - rectA1.right;

      // Sample 1ms before wrap
      if (aAnim && bAnim) {
        aAnim.currentTime = (animDuration * 1000) - 1;
        bAnim.currentTime = (animDuration * 1000) - 1;
      }
      const rectB0_at_wrap = itemsB[0].getBoundingClientRect();
      const seamDelta = Math.abs(rectB0_at_wrap.left - rectA0.left);

      return {
        computedGap: cs.gap,
        trackGap,
        intraTrackGap,
        interTrackGap,
        gapDelta: Math.abs(interTrackGap - intraTrackGap),
        seamDelta,
        trackWidthA: trackA.offsetWidth,
        trackWidthB: trackB.offsetWidth,
        tracksEqual: trackA.offsetWidth === trackB.offsetWidth,
        itemCountA: itemsA.length,
        itemCountB: itemsB.length
      };
    }, isMobile);

    console.log(`[${vp.name}] Ticker Data:`, JSON.stringify(tickerData, null, 2));
    results.r1_marquee[vp.name] = tickerData;
    await page.close();
  }

  // -------------------------------------------------------------
  // 2. MAP PIN ANCHOR & FRAMING
  // -------------------------------------------------------------
  console.log('\n--- 2. MAP PIN ANCHOR & FRAMING ---');
  for (const vp of [
    { width: 1440, height: 900, name: 'Desktop' },
    { width: 375, height: 812, name: 'Mobile' }
  ]) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

    const mapData = await page.evaluate(() => {
      const pin = document.getElementById('grand-live-pointer');
      const mapContainer = document.getElementById('subpage-vector-map');
      if (!pin || !mapContainer) return { error: 'Pin or map container not found' };

      const csPin = window.getComputedStyle(pin);
      const csMap = window.getComputedStyle(mapContainer);
      const mapRect = mapContainer.getBoundingClientRect();
      const pinRect = pin.getBoundingClientRect();

      // Pin center relative to map container
      const pinCenterX = (pinRect.left + pinRect.right) / 2;
      const pinCenterY = (pinRect.top + pinRect.bottom) / 2;
      const mapCenterX = (mapRect.left + mapRect.right) / 2;
      const mapCenterY = (mapRect.top + mapRect.bottom) / 2;

      return {
        pinLeftComputed: csPin.left,
        pinTopComputed: csPin.top,
        mapWidthComputed: csMap.width,
        mapLeftComputed: csMap.left,
        mapRectWidth: mapRect.width,
        mapRectHeight: mapRect.height,
        pinCenterX,
        pinCenterY,
        mapCenterX,
        mapCenterY,
        diffX: Math.abs(pinCenterX - mapCenterX),
        diffY: Math.abs(pinCenterY - mapCenterY)
      };
    });

    console.log(`[${vp.name}] Map Data:`, JSON.stringify(mapData, null, 2));
    results.r2_map[vp.name] = mapData;
    await page.close();
  }

  // -------------------------------------------------------------
  // 3. NUMBERS & SUPERSCRIPT SUPPRESSION
  // -------------------------------------------------------------
  console.log('\n--- 3. NUMBERS & SUPERSCRIPT SUPPRESSION ---');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

    const numbersData = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.framer-ysBPc'));
      const suprElements = Array.from(document.querySelectorAll('.framer-84xumc'));

      const suprComputedDisplays = suprElements.map(el => window.getComputedStyle(el).display);

      const parsedCards = cards.map(c => {
        const title = c.querySelector('h2')?.textContent.trim();
        const textElements = Array.from(c.querySelectorAll('p.framer-text')).map(p => p.textContent.trim());
        const innerText = c.innerText.replace(/\s+/g, ' ');
        return {
          title,
          textElements,
          innerText
        };
      });

      return {
        suprCount: suprElements.length,
        suprDisplays: suprComputedDisplays,
        cards: parsedCards
      };
    });

    console.log('Numbers & Cards Data:', JSON.stringify(numbersData, null, 2));
    results.r3_numbers = numbersData;
    await page.close();
  }

  // -------------------------------------------------------------
  // 4. UNTOUCHED index.html CHECK
  // -------------------------------------------------------------
  console.log('\n--- 4. UNTOUCHED index.html CHECK ---');
  const indexStat = fs.statSync('index.html');
  const indexContent = fs.readFileSync('index.html', 'utf8');
  results.r4_index_untouched = {
    sizeBytes: indexStat.size,
    mtime: indexStat.mtime.toISOString(),
    isNonEmpty: indexContent.length > 0,
    hasCasaMomoOrTheGrand: indexContent.includes('The Grand')
  };
  console.log('index.html Stat:', JSON.stringify(results.r4_index_untouched, null, 2));

  // -------------------------------------------------------------
  // 5. ADVERSARIAL STRESS TEST: Pin Collision across 5 breakpoints
  // -------------------------------------------------------------
  console.log('\n--- 5. ADVERSARIAL CHECK: Pin & Sticky CTA Clearance ---');
  const viewports = [1920, 1440, 1024, 768, 375];
  for (const w of viewports) {
    const page = await browser.newPage({ viewport: { width: w, height: 800 } });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

    const clearance = await page.evaluate(() => {
      const pin = document.getElementById('grand-live-pointer');
      const btn = document.querySelector('.framer-1n8t7q3');
      const mapContainer = document.getElementById('subpage-vector-map');
      if (!pin || !btn || !mapContainer) return { error: 'elements missing' };

      const mapRect = mapContainer.getBoundingClientRect();
      const start = Math.max(0, window.scrollY + mapRect.top - window.innerHeight);
      const end = window.scrollY + mapRect.top + mapRect.height;
      const step = (end - start) / 25;

      let minHorizontalDist = 99999;
      let minDirectDist = 99999;
      let hadOverlap = false;

      for (let y = start; y <= end; y += step) {
        window.scrollTo(0, y);
        const p = pin.getBoundingClientRect();
        const b = btn.getBoundingClientRect();

        const pVisible = p.bottom > 0 && p.top < window.innerHeight && p.right > 0 && p.left < window.innerWidth;
        const bVisible = b.bottom > 0 && b.top < window.innerHeight && b.right > 0 && b.left < window.innerWidth;

        if (pVisible && bVisible) {
          const overlap = !(p.right < b.left || p.left > b.right || p.bottom < b.top || p.top > b.bottom);
          if (overlap) hadOverlap = true;

          const dx = Math.max(0, Math.max(p.left - b.right, b.left - p.right));
          const dy = Math.max(0, Math.max(p.top - b.bottom, b.top - p.bottom));
          const d = Math.sqrt(dx * dx + dy * dy);

          if (dx < minHorizontalDist) minHorizontalDist = dx;
          if (d < minDirectDist) minDirectDist = d;
        }
      }

      return {
        hadOverlap,
        minHorizontalDist,
        minDirectDist
      };
    });

    console.log(`[Viewport ${w}px] Overlap: ${clearance.hadOverlap}, Min Horiz Clearance: ${Math.round(clearance.minHorizontalDist)}px, Min Direct: ${Math.round(clearance.minDirectDist)}px`);
    results.adversarial_checks[`vp_${w}`] = clearance;
    await page.close();
  }

  await browser.close();

  fs.writeFileSync('tools/reviewer_m1_it2_results.json', JSON.stringify(results, null, 2));
  console.log('\n=== AUDIT COMPLETE — Results written to tools/reviewer_m1_it2_results.json ===');
}

runReviewerAudit().catch(err => {
  console.error('Fatal error during reviewer audit:', err);
  process.exit(1);
});
