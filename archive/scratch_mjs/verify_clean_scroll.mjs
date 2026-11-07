import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';
const LIVE_URL = 'https://the-grand-lucknow.vercel.app';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  console.log('1. Loading Home page...');
  await page.goto(LIVE_URL + '/', { waitUntil: 'domcontentloaded' });
  // Wait for entrance loader to finish (3.5s)
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_01_home_hero.png') });
  console.log('Captured v_prod_mobile_01_home_hero.png');

  // Scroll to Card 1
  console.log('2. Scrolling to Card 1 (Open Earth Lawn)...');
  await page.evaluate(() => {
    const card = document.querySelector('a.framer-prpyo3');
    if (card) card.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_02_card1_lawn.png') });
  console.log('Captured v_prod_mobile_02_card1_lawn.png');

  // Scroll to Card 3 (Ballroom)
  console.log('3. Scrolling to Card 3 (Ballroom)...');
  await page.evaluate(() => {
    const cards = document.querySelectorAll('a.framer-prpyo3');
    if (cards[2]) cards[2].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_03_card3_ballroom.png') });
  console.log('Captured v_prod_mobile_03_card3_ballroom.png');

  // Open fresh page for Venue N°02
  console.log('4. Loading Venue N°02 Subpage...');
  const page2 = await context.newPage();
  await page2.goto(LIVE_URL + '/venues/venue-n2', { waitUntil: 'domcontentloaded' });
  await page2.waitForTimeout(4000);
  await page2.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_04_venue_n2_top.png') });
  console.log('Captured v_prod_mobile_04_venue_n2_top.png');

  // Scroll to Map
  console.log('5. Scrolling to Casa Momo map on Venue N°02...');
  await page2.evaluate(() => {
    const map = document.querySelector('img[src*="UayMv2I16UbQQBQkbI90HsJMv5o"]');
    if (map) map.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page2.waitForTimeout(1500);
  await page2.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_05_venue_map.png') });
  console.log('Captured v_prod_mobile_05_venue_map.png');

  // Click Check Availability / Book Now
  console.log('6. Opening Booking Modal...');
  await page2.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, a')).find(el => (el.textContent || '').includes('Check Availability') || (el.textContent || '').includes('Book Now'));
    if (btn) btn.click();
  });
  await page2.waitForTimeout(1000);
  await page2.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_06_booking_modal.png') });
  console.log('Captured v_prod_mobile_06_booking_modal.png');

  await browser.close();
  console.log('🎉 All mobile production verifications complete!');
}

main().catch(console.error);
