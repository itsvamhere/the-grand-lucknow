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

  console.log('1. Loading live mobile Home on Vercel...');
  await page.goto(LIVE_URL + '/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_01_home_hero.png') });
  console.log('Saved v_prod_mobile_01_home_hero.png');

  // Scroll to cards
  console.log('2. Scrolling to Venue Cards...');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_02_venue_cards.png') });
  console.log('Saved v_prod_mobile_02_venue_cards.png');

  // Scroll to N°03 ballroom card
  console.log('3. Scrolling to N°03 Ballroom...');
  await page.evaluate(() => window.scrollTo(0, 3200));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_03_card_ballroom.png') });
  console.log('Saved v_prod_mobile_03_card_ballroom.png');

  // Load venue subpage
  console.log('4. Loading Venue N°02 subpage...');
  await page.goto(LIVE_URL + '/venues/venue-n2', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_04_venue_n2_top.png') });
  console.log('Saved v_prod_mobile_04_venue_n2_top.png');

  // Scroll to Casa Momo map
  console.log('5. Scrolling to Casa Momo map...');
  await page.evaluate(() => {
    const map = document.querySelector('img[src*="UayMv2I16UbQQBQkbI90HsJMv5o"]');
    if (map) map.scrollIntoView({ behavior: 'instant', block: 'center' });
    else window.scrollTo(0, 3200);
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_05_venue_map.png') });
  console.log('Saved v_prod_mobile_05_venue_map.png');

  // Click Check Availability / Book Now
  console.log('6. Opening booking modal...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, a')).find(el => (el.textContent || '').includes('Check Availability') || (el.textContent || '').includes('Book Now'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_prod_mobile_06_booking_modal.png') });
  console.log('Saved v_prod_mobile_06_booking_modal.png');

  await browser.close();
  console.log('All mobile verifications completed on production URL!');
}

main().catch(console.error);
