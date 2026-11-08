import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/book/venue?venue=open-earth-lawn', { waitUntil: 'networkidle' });

  const domCheck = await page.evaluate(() => {
    return {
      hasPopup: !!document.getElementById('grand-calendar-popup'),
      allIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id),
      searchButtons: Array.from(document.querySelectorAll('button')).map(b => b.innerText.slice(0, 30))
    };
  });

  console.log('DOM check:', JSON.stringify(domCheck, null, 2));
  await browser.close();
})();
