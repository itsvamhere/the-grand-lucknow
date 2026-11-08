import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  const text = await page.evaluate(() => {
    const el = document.querySelector('.framer-181zdp4'); // Features container
    return el ? el.innerText : 'not found';
  });
  console.log('Open Earth Lawn Features:');
  console.log(text);

  await browser.close();
})();
