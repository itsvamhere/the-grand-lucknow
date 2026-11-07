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

  console.log('1. Checking Home Hero & Navbar');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_01_home_hero.png') });

  console.log('2. Checking Home Venue Cards');
  await page.evaluate(() => window.scrollTo(0, 3100));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_02_home_cards_top.png') });

  await page.evaluate(() => window.scrollTo(0, 3900));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_03_home_cards_n3_ballroom.png') });

  console.log('3. Checking Home Footer');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_04_home_footer.png') });

  console.log('4. Checking /venues catalog page');
  await page.goto('http://localhost:3003/venues', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_05_venues_catalog.png') });

  console.log('5. Checking Venue N°2 Subpage - Top & Details');
  await page.goto('http://localhost:3003/venues/venue-n2', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_06_venue_n2_header.png') });

  await page.evaluate(() => window.scrollTo(0, 8500));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_07_venue_n2_details.png') });

  console.log('6. Checking Venue N°2 Subpage - Map Section');
  await page.evaluate(() => window.scrollTo(0, 10700));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_08_venue_n2_casamomo_map.png') });

  console.log('7. Triggering Booking Modal');
  await page.evaluate(() => {
    if (window.openGrandBooking) window.openGrandBooking();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_09_venue_n2_booking_modal.png') });

  console.log('8. Triggering Payment Receipt');
  await page.evaluate(() => {
    if (window.triggerGrandPayment) window.triggerGrandPayment();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_proof_10_venue_n2_payment_receipt.png') });

  await browser.close();
  console.log('All master verification screenshots captured successfully!');
}

main().catch(err => {
  console.error('Error during master verification:', err);
  process.exit(1);
});
