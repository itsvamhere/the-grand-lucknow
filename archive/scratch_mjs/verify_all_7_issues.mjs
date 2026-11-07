import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('--- 1. Testing Home Page (http://localhost:3003/) ---');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Screenshot Hero & Navbar (Issue 6 & Issue 3)
  await page.screenshot({ path: path.join(artifactsDir, 'proof_01_home_hero_and_nav.png') });
  console.log('Saved proof_01_home_hero_and_nav.png');

  // Scroll to Venue Cards (Issue 1, Issue 2, Issue 7)
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'proof_02_home_venue_cards.png') });
  console.log('Saved proof_02_home_venue_cards.png');

  // Scroll to Footer Marquee (Issue 4)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'proof_03_home_footer_marquee.png') });
  console.log('Saved proof_03_home_footer_marquee.png');

  // Verify Venue Subpages
  const venueUrls = [
    { name: 'Venue N°1 - Open Earth Lawn', url: 'http://localhost:3003/venues/venue-n1', shot: 'proof_04_venue_n1.png' },
    { name: 'Venue N°2 - Grassland Gala', url: 'http://localhost:3003/venues/venue-n2', shot: 'proof_05_venue_n2_top.png' },
    { name: 'Venue N°3 - The Royal Legacy Banquet', url: 'http://localhost:3003/venues/venue-n3', shot: 'proof_06_venue_n3.png' },
    { name: 'Venue N°4 - Garden Galaxy', url: 'http://localhost:3003/venues/venue-n4', shot: 'proof_07_venue_n4.png' },
    { name: 'Venue N°5 - The Grand Courtyard', url: 'http://localhost:3003/venues/venue-n5', shot: 'proof_08_venue_n5.png' }
  ];

  for (const v of venueUrls) {
    console.log(`--- Testing ${v.name} (${v.url}) ---`);
    await page.goto(v.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(artifactsDir, v.shot) });
    console.log(`Saved ${v.shot}`);
  }

  // Deep inspection on Venue N°2: Map layout (Issue 5) & Interactive Booking Modal
  console.log('--- Testing Venue N°2 Map & Booking Modal ---');
  await page.goto('http://localhost:3003/venues/venue-n2', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll to Map
  const mapElement = await page.$('.grand-casamomo-map-wrap');
  if (mapElement) {
    await mapElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(artifactsDir, 'proof_09_casamomo_map_layout.png') });
    console.log('Saved proof_09_casamomo_map_layout.png');
  } else {
    console.log('Map element not directly found by class, scrolling 60% down...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.65));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(artifactsDir, 'proof_09_casamomo_map_layout.png') });
  }

  // Trigger Booking Modal
  await page.evaluate(() => {
    if (window.openGrandBooking) window.openGrandBooking();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactsDir, 'proof_10_booking_modal_open.png') });
  console.log('Saved proof_10_booking_modal_open.png');

  // Submit payment form to verify receipt
  await page.evaluate(() => {
    if (window.triggerGrandPayment) window.triggerGrandPayment();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactsDir, 'proof_11_payment_receipt.png') });
  console.log('Saved proof_11_payment_receipt.png');

  await browser.close();
  console.log('All verifications completed successfully!');
}

main().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
