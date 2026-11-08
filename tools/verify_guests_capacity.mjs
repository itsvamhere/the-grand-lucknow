import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/book/venue?venue=grassland-gala', { waitUntil: 'networkidle' });
  const galaGuests = await page.$eval('#grand-guests-val', el => el.innerText);
  console.log('Grassland Gala guests:', galaGuests);

  await page.goto('http://localhost:3003/book/venue?venue=garden-galaxy', { waitUntil: 'networkidle' });
  const galaxyGuests = await page.$eval('#grand-guests-val', el => el.innerText);
  console.log('Garden Galaxy guests:', galaxyGuests);

  await page.goto('http://localhost:3003/book/venue?venue=the-royal-legacy-banquet', { waitUntil: 'networkidle' });
  const banquetGuests = await page.$eval('#grand-guests-val', el => el.innerText);
  console.log('Royal Legacy Banquet guests:', banquetGuests);

  await browser.close();
})();
