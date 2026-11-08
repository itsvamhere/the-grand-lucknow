import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  
  const sqftElements = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    return all
      .filter(el => el.innerText && el.innerText.includes('Sqft') && el.children.length <= 2)
      .map(el => ({ tag: el.tagName, text: el.innerText, parent: el.parentElement?.className }));
  });
  console.log('Elements with Sqft:');
  console.log(sqftElements);

  await browser.close();
})();
