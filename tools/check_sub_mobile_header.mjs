import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  const headerInfo = await page.evaluate(() => {
    const headers = document.querySelectorAll('header');
    return Array.from(headers).map(h => ({
      class: h.className,
      rect: h.getBoundingClientRect(),
      style: h.getAttribute('style'),
      text: h.innerText,
      display: window.getComputedStyle(h).display,
      visibility: window.getComputedStyle(h).visibility,
      opacity: window.getComputedStyle(h).opacity
    }));
  });
  console.log('Subpage Mobile Headers:', JSON.stringify(headerInfo, null, 2));

  await browser.close();
}

test().catch(console.error);
