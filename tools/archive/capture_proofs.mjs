import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Capture Top Header / Navbar region (desktop bar)
  // The header is at the top of the viewport
  await page.screenshot({
    path: `${ARTIFACTS}/home_navbar_single_arrow.png`,
    clip: { x: 0, y: 0, width: 1440, height: 120 }
  });
  console.log('✓ Captured home_navbar_single_arrow.png (Header bar)');

  // 2. Scroll to Venues section and capture the venue cards grid
  const gridEl = await page.$('#mefgjz, [data-framer-name="Venues Grid"]');
  if (gridEl) {
    await gridEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    const cards = await page.evaluate(() => {
      const grid = document.getElementById('mefgjz') || document.querySelector('[data-framer-name="Venues Grid"]');
      if (!grid) return [];
      return Array.from(grid.querySelectorAll('[data-framer-name="Venue Item"]')).map((it, idx) => {
        const h2 = it.querySelector('h2');
        return {
          index: idx + 1,
          name: h2 ? h2.innerText.trim() : 'NONE'
        };
      });
    });
    console.log('Live Venue Cards:', cards);

    // Scroll slightly so the grid title and first 2-3 cards are centered
    await page.screenshot({
      path: `${ARTIFACTS}/home_venues_named_grid.png`,
      clip: { x: 0, y: 350, width: 1440, height: 950 }
    });
    console.log('✓ Captured home_venues_named_grid.png');
  }

  // 3. Scroll to Location section and capture Location CTA button
  const locSec = await page.$('#locations-1');
  if (locSec) {
    await locSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);

    // Find the button in location section
    const locBtn = await page.$('#locations-1 a[href*="maps.app.goo.gl"]');
    if (locBtn) {
      await locBtn.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await locBtn.screenshot({
        path: `${ARTIFACTS}/home_location_single_arrow.png`,
        padding: 20
      });
      console.log('✓ Captured home_location_single_arrow.png (Location button)');
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch(console.error);
