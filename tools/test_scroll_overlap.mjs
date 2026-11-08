import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  
  // 1. Initial state (scrolled at top)
  let state = await page.evaluate(() => {
    const loc = document.querySelector('#bigtext-1 h2');
    const r = document.querySelector('#bigtext-1').getBoundingClientRect();
    return {
      top: r.top,
      opacity: window.getComputedStyle(loc).opacity
    };
  });
  console.log('Scrolled at top:', state);

  // 2. Scroll to Location section so it overlaps the navbar
  await page.evaluate(() => {
    const loc = document.querySelector('#bigtext-1');
    loc.scrollIntoView({ behavior: 'instant', block: 'start' });
    // Scroll a tiny bit so top is around 50px (under navbar height 110px)
    window.scrollBy(0, -60);
  });
  await page.waitForTimeout(100);

  state = await page.evaluate(() => {
    const loc = document.querySelector('#bigtext-1 h2');
    const r = document.querySelector('#bigtext-1').getBoundingClientRect();
    return {
      top: r.top,
      opacity: window.getComputedStyle(loc).opacity
    };
  });
  console.log('Scrolled into navbar overlap zone:', state);

  // 3. Scroll past Location section
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await page.waitForTimeout(100);

  state = await page.evaluate(() => {
    const loc = document.querySelector('#bigtext-1 h2');
    const r = document.querySelector('#bigtext-1').getBoundingClientRect();
    return {
      top: r.top,
      opacity: window.getComputedStyle(loc).opacity
    };
  });
  console.log('Scrolled past Location section:', state);

  await browser.close();
})();
