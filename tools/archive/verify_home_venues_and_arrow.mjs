import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Capture Navbar Button
  const navBtnEl = await page.$('nav a.framer-vO7O2');
  if (navBtnEl) {
    await navBtnEl.screenshot({ path: `${ARTIFACTS}/home_navbar_single_arrow.png` });
    console.log('✓ Captured home_navbar_single_arrow.png');
  }

  // 2. Scroll to Venues section and inspect all card H2s
  const gridEl = await page.$('#mefgjz, [data-framer-name="Venues Grid"]');
  if (gridEl) {
    await gridEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    const cards = await page.evaluate(() => {
      const grid = document.getElementById('mefgjz') || document.querySelector('[data-framer-name="Venues Grid"]');
      if (!grid) return [];
      return Array.from(grid.querySelectorAll('[data-framer-name="Venue Item"]')).map((it, idx) => {
        const h2 = it.querySelector('h2');
        const a = it.querySelector('a');
        return {
          cardIndex: idx + 1,
          h2Text: h2 ? h2.innerText.trim() : 'NONE',
          href: a ? a.getAttribute('href') : 'NONE'
        };
      });
    });

    console.log('\n=== Venue Cards in Live Grid ===');
    console.log(JSON.stringify(cards, null, 2));

    await page.screenshot({ path: `${ARTIFACTS}/home_venues_named_grid.png` });
    console.log('✓ Captured home_venues_named_grid.png');
  }

  // 3. Scroll to Location section and inspect Location button
  const locSec = await page.$('#locations-1');
  if (locSec) {
    await locSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    const locBtnEl = await locSec.$('a');
    if (locBtnEl) {
      await locBtnEl.screenshot({ path: `${ARTIFACTS}/home_location_single_arrow.png` });
      console.log('✓ Captured home_location_single_arrow.png');
    }
  }

  await browser.close();
  console.log('\nAll checks and captures completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
