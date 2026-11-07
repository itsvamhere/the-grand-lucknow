import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000/venues/open-earth-lawn ...');
  await page.goto('http://localhost:3000/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // 1. Hero & Title Verification
  const title = await page.title();
  const headings = await page.evaluate(() => Array.from(document.querySelectorAll('h1, h2')).map(h => h.textContent.trim()));
  console.log('Page Title:', title);
  console.log('Headings:', headings);

  // 2. Capture Hero & Overview Screenshot
  await page.screenshot({ path: `${ARTIFACTS}/task4_hero_open_earth_lawn.png` });
  console.log('✓ Saved task4_hero_open_earth_lawn.png');

  // 3. Capture Details Table & Specs
  const specsSec = await page.$('.framer-1a6qf8, .framer-1ji8y2z, [data-framer-name="Features Wrapper"]');
  if (specsSec) {
    await specsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await specsSec.screenshot({ path: `${ARTIFACTS}/task4_specs_open_earth_lawn.png` });
    console.log('✓ Saved task4_specs_open_earth_lawn.png');
  }

  // 4. Capture Custom Vector Map Block on Venue Sub-Page
  const mapSec = await page.$('#venue-vector-map-container, #venue-vector-map, [data-framer-name="Location"]');
  if (mapSec) {
    await mapSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    await mapSec.screenshot({ path: `${ARTIFACTS}/task4_vector_map_open_earth_lawn.png` });
    console.log('✓ Saved task4_vector_map_open_earth_lawn.png');
  }

  // 5. Capture "Other Venues to Explore" Section
  const otherSec = await page.$('[data-framer-name="Apartment Lists"], .framer-2iif9c');
  if (otherSec) {
    await otherSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await otherSec.screenshot({ path: `${ARTIFACTS}/task4_other_venues_carousel.png` });
    console.log('✓ Saved task4_other_venues_carousel.png');
  }

  // 6. Mobile Viewport Check
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${ARTIFACTS}/task4_mobile_open_earth_lawn.png` });
  console.log('✓ Saved task4_mobile_open_earth_lawn.png');

  // Data audit
  const audit = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasOpenEarthLawn: text.includes('Open Earth Lawn'),
      has55000Sqft: text.includes('55,000') || text.includes('55000'),
      hasCapacity: text.includes('1,000 – 1,500') || text.includes('1000'),
      hasOtherVenues: text.includes('Other  Venues  to  Explore') || text.includes('Other Venues to Explore'),
      hasMapCanvas: !!document.querySelector('#venue-vector-map canvas'),
      hasVenuePin: !!document.querySelector('.grand-pill'),
      pinLabel: document.querySelector('.grand-pill')?.textContent
    };
  });

  console.log('Venue Page Audit:', JSON.stringify(audit, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
