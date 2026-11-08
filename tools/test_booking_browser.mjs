import { chromium } from 'playwright-core';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3003/book/venue?venue=open-earth-lawn...');
  await page.goto('http://localhost:3003/book/venue?venue=open-earth-lawn', { waitUntil: 'networkidle' });

  // 1. Initial State Screenshot
  await page.screenshot({ path: 'tools/proofs/booking_page_initial_open_earth.png' });
  console.log('Captured booking_page_initial_open_earth.png');

  // Copy to artifacts
  const artDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/638b99fe-ea95-4ed2-88eb-ad4caad31b4c';
  fs.copyFileSync('tools/proofs/booking_page_initial_open_earth.png', `${artDir}/booking_page_initial_open_earth.png`);

  // Check H1 text
  const h1Text = await page.$eval('h1', el => el.innerText);
  console.log('H1 text:', h1Text);

  // Check Calendar visibility
  const calVisible = await page.$eval('#grand-calendar-popup', el => window.getComputedStyle(el).display !== 'none');
  console.log('Calendar visible initially:', calVisible);

  // 2. Select Date Range: Click Nov 22 then Nov 26
  console.log('Clicking day 22 and day 26...');
  const day22 = page.locator('button[data-day="2026-11-22"]');
  await day22.click();
  await page.waitForTimeout(300);

  const day26 = page.locator('button[data-day="2026-11-26"]');
  await day26.click();
  await page.waitForTimeout(500);

  // Capture selection state
  await page.screenshot({ path: 'tools/proofs/booking_page_dates_selected.png' });
  fs.copyFileSync('tools/proofs/booking_page_dates_selected.png', `${artDir}/booking_page_dates_selected.png`);
  console.log('Captured booking_page_dates_selected.png');

  // Read updated arrival and departure values
  const arrivalVal = await page.$eval('#grand-arrival-val', el => el.innerText);
  const departureVal = await page.$eval('#grand-departure-val', el => el.innerText);
  console.log('Updated Arrival:', arrivalVal, '| Departure:', departureVal);

  // 3. Test venue parameter: Grassland Gala
  console.log('\nNavigating to http://localhost:3003/book/venue?venue=grassland-gala...');
  await page.goto('http://localhost:3003/book/venue?venue=grassland-gala', { waitUntil: 'networkidle' });
  
  const venueTitle = await page.$eval('#selected-venue-container h2', el => el.innerText);
  console.log('Selected Venue Title:', venueTitle);

  await page.screenshot({ path: 'tools/proofs/booking_page_grassland_gala.png' });
  fs.copyFileSync('tools/proofs/booking_page_grassland_gala.png', `${artDir}/booking_page_grassland_gala.png`);
  console.log('Captured booking_page_grassland_gala.png');

  await browser.close();
})();
