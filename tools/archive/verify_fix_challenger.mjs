import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifyAll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  for (const vp of [{ width: 1440, height: 900, name: 'Desktop (1440px)' }, { width: 375, height: 812, name: 'Mobile (375px)' }]) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3003/venues/open-earth-lawn');

    // Inject proposed fix
    await page.addStyleTag({
      content: `
        .grand-ticker-container,
        .framer-n49p1z.grand-ticker-container {
          gap: 0 !important;
        }
      `
    });

    const isMobile = vp.width <= 809.98;
    const res = await page.evaluate(async (isMobile) => {
      const containers = Array.from(document.querySelectorAll('.grand-ticker-container'));
      // container 0 is desktop, container 1 is mobile
      const container = isMobile ? containers[1] : containers[0];
      const trackA = container.querySelector('.grand-ticker-track.track-a');
      const trackB = container.querySelector('.grand-ticker-track.track-b');

      const cs = window.getComputedStyle(container);
      const itemsA = Array.from(trackA.querySelectorAll('.ticker-item'));
      const itemsB = Array.from(trackB.querySelectorAll('.ticker-item'));

      const anims = document.getAnimations();
      const trackAAnim = anims.find(a => a.effect && a.effect.target === trackA);
      const trackBAnim = anims.find(a => a.effect && a.effect.target === trackB);

      const animDuration = parseFloat(window.getComputedStyle(trackA).animationDuration) || 25;

      // Initial state
      if (trackAAnim && trackBAnim) {
        trackAAnim.currentTime = 0;
        trackBAnim.currentTime = 0;
      }
      const itemA0_at_0 = itemsA[0].getBoundingClientRect().left;
      const itemA1_at_0 = itemsA[1].getBoundingClientRect().left;

      // End state (1ms before wrap)
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
        animDuration,
        computedGap: cs.gap,
        trackGap,
        intraTrackGap,
        interTrackGap,
        gapDelta: Math.abs(interTrackGap - intraTrackGap),
        itemA0_at_0,
        itemB0_at_end,
        seamDeltaItem0,
        seamDeltaItem1,
        trackWidthA: trackA.offsetWidth,
        trackWidthB: trackB.offsetWidth,
        tracksEqual: trackA.offsetWidth === trackB.offsetWidth
      };
    }, isMobile);

    console.log(`\n=== ${vp.name} Verification Results ===`);
    console.log(JSON.stringify(res, null, 2));
    await page.close();
  }

  await browser.close();
}

verifyAll();
