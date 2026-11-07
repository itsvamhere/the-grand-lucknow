import { chromium } from 'playwright-core';

async function checkDom() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const logos = Array.from(document.querySelectorAll('[data-framer-name="Footer Logo"]'));
    return logos.map((l, i) => ({
      index: i,
      className: l.className,
      innerHTML: l.innerHTML,
      outerHTML: l.outerHTML,
      computedStyle: {
        backgroundImage: window.getComputedStyle(l).backgroundImage,
        width: window.getComputedStyle(l).width,
        height: window.getComputedStyle(l).height,
        display: window.getComputedStyle(l).display,
        visibility: window.getComputedStyle(l).visibility
      }
    }));
  });

  console.log('Logos found on homepage:', JSON.stringify(data, null, 2));
  await browser.close();
}

checkDom().catch(console.error);
