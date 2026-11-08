import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  
  // Scroll to location
  await page.evaluate(() => {
    const loc = document.querySelector('#bigtext-1');
    loc.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy(0, -50);
  });
  
  // Wait for 350ms for transition
  await page.waitForTimeout(350);

  const opacityAfterTransition = await page.evaluate(() => {
    const locH = document.querySelector('#bigtext-1 h2');
    return window.getComputedStyle(locH).opacity;
  });
  console.log('Opacity after 350ms transition:', opacityAfterTransition);

  await browser.close();
})();
