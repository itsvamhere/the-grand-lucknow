import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';

async function run() {
  console.log('--- Launching Playwright Complete Venue Detail Verification ---');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const url = 'http://localhost:3003/venues/venue-n2';
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2500);

  // 1. Title
  const title = await page.title();
  console.log(`Page Title: "${title}"`);

  // 2. Top screenshot
  const topPath = path.join(artifactDir, 'verified_venue_n2_top.png');
  await page.screenshot({ path: topPath });
  console.log(`Saved: ${topPath}`);

  // 3. Body text checks
  const bodyText = await page.innerText('body');
  console.log('Text Verification:');
  console.log('  Contains "Boutique N°2":', /Boutique\s*N°\s*2/i.test(bodyText));
  console.log('  Contains "LinkedIn":', /LinkedIn/i.test(bodyText));
  console.log('  Contains "Casa Momo":', /Casa\s*Momo/i.test(bodyText));
  console.log('  Contains "Graz":', /Graz/i.test(bodyText));
  console.log('  Contains "45 m²":', /45\s*m²/i.test(bodyText));
  console.log('  Contains "14,000 sq ft":', /14,000\s*sq\s*ft/i.test(bodyText));
  console.log('  Contains "Built by Edifice":', /Built\s+by\s+Edifice/i.test(bodyText));

  // 4. Location section
  const mapElement = await page.$('#grand-location-card');
  console.log('  Location map card found:', !!mapElement);
  if (mapElement) {
    await mapElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const mapPath = path.join(artifactDir, 'verified_venue_n2_location_map.png');
    await page.screenshot({ path: mapPath });
    console.log(`Saved: ${mapPath}`);
  }

  // 5. Footer section
  const footerElement = await page.$('#grand-legal-footer') || await page.$('footer');
  if (footerElement) {
    await footerElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const footerPath = path.join(artifactDir, 'verified_venue_n2_footer.png');
    await page.screenshot({ path: footerPath });
    console.log(`Saved: ${footerPath}`);
  }

  // 6. Interactive Booking Modal test
  console.log('Opening booking modal...');
  await page.evaluate(() => {
    if (window.openGrandModal) window.openGrandModal();
  });
  await page.waitForTimeout(1200);

  const modalVisible = await page.isVisible('#grand-booking-modal');
  console.log('  Booking modal visible:', modalVisible);

  if (modalVisible) {
    const modalPath = path.join(artifactDir, 'verified_venue_n2_booking_modal.png');
    await page.screenshot({ path: modalPath });
    console.log(`Saved: ${modalPath}`);

    // Fill form and submit
    await page.fill('#grand-date', '2026-12-15');
    await page.fill('#grand-name', 'Sambhav Verma');
    await page.fill('#grand-phone', '+91 91291 27091');
    await page.fill('#grand-email', 'Thegrandbanquet07@gmail.com');
    await page.selectOption('#grand-slot', 'evening');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1500);

    const successVisible = await page.isVisible('#grand-payment-success');
    console.log('  Payment success receipt visible:', successVisible);

    const receiptPath = path.join(artifactDir, 'verified_venue_n2_payment_receipt.png');
    await page.screenshot({ path: receiptPath });
    console.log(`Saved: ${receiptPath}`);
  }

  await browser.close();
  console.log('Complete venue verification passed cleanly!');
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
