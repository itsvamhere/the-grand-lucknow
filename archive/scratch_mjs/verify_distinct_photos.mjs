import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';

async function test() {
  console.log('--- VERIFYING DISTINCT THE GRAND PHOTOS ---');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Check /venues
  console.log('Navigating to http://localhost:3003/venues ...');
  await page.goto('http://localhost:3003/venues', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const venueCardImages = await page.$$eval('[data-framer-name="Venue Card"] img, .framer-1onuq8y-container img', imgs => {
    return imgs.map(i => ({ src: i.src.replace('http://localhost:3003', ''), naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight }));
  });
  console.log('Card images on /venues (count: ' + venueCardImages.length + '):');
  console.log(venueCardImages);

  await page.screenshot({ path: path.join(artifactDir, 'verified_venues_distinct_photos.png') });
  console.log('✓ Captured verified_venues_distinct_photos.png');

  // 2. Check Home Page Cards
  console.log('\nNavigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll down to cards section
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);

  const homeCardImages = await page.$$eval('[data-framer-name="Venue Card"] img, .framer-otdg6j-container img', imgs => {
    return imgs.map(i => ({ src: i.src.replace('http://localhost:3003', ''), naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight }));
  });
  console.log('Card images on Home (count: ' + homeCardImages.length + '):');
  console.log(homeCardImages);

  await page.screenshot({ path: path.join(artifactDir, 'verified_home_distinct_photos.png') });
  console.log('✓ Captured verified_home_distinct_photos.png');

  await browser.close();
  console.log('--- Verification Finished! ---');
}

test().catch(console.error);
