import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Test home
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  const homeNav = await page.evaluate(() => {
    const h = document.querySelector('header');
    return {
      text: h.innerText,
      pos: window.getComputedStyle(h).position,
      zIndex: window.getComputedStyle(h).zIndex,
      top: window.getComputedStyle(h).top
    };
  });
  console.log('Home Nav:', homeNav);

  // Test sub
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  const subNav = await page.evaluate(() => {
    const h = document.querySelector('header');
    return {
      text: h ? h.innerText : 'none',
      pos: h ? window.getComputedStyle(h).position : 'none',
      zIndex: h ? window.getComputedStyle(h).zIndex : 'none',
      top: h ? window.getComputedStyle(h).top : 'none'
    };
  });
  console.log('Sub Nav:', subNav);

  await browser.close();
}

test().catch(console.error);
