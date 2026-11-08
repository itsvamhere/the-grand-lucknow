import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/book/venue?venue=open-earth-lawn', { waitUntil: 'networkidle' });

  // Click 22 (November)
  const cal = page.locator('#casa-bk-rb-dates, [role="dialog"]').first();
  const btn22 = cal.locator('button:has-text("22")').first();
  console.log('Clicking 22...');
  await btn22.click();
  await page.waitForTimeout(400);

  // Click 26 (November)
  const btn26 = cal.locator('button:has-text("26")').first();
  console.log('Clicking 26...');
  await btn26.click();
  await page.waitForTimeout(800);

  // Read search bar text via Playwright locator
  const arrText = await page.locator('button').filter({ hasText: 'Arrival' }).innerText();
  const depText = await page.locator('button').filter({ hasText: 'Departure' }).innerText();

  console.log('Search values after selection:');
  console.log('Arrival button:\n', arrText);
  console.log('Departure button:\n', depText);

  // Screenshot
  await page.screenshot({ path: 'tools/proofs/booking_interactive_native_test.png' });
  console.log('Saved tools/proofs/booking_interactive_native_test.png');

  await browser.close();
})();
