import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testHover() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });

  // Check hover on "About" link
  const aboutLink = await page.$('header a[href*="about"]');
  if (aboutLink) {
    await aboutLink.hover();
    await page.waitForTimeout(300);
    const aboutHoverTransform = await page.evaluate(() => {
      const a = document.querySelector('header a[href*="about"]');
      const letterSpans = a ? Array.from(a.querySelectorAll('[data-rolling-label] span[aria-hidden="true"] > span')) : [];
      return letterSpans.slice(0, 4).map(s => s.style.transform);
    });
    console.log('About link hover transform:', aboutHoverTransform);
  }

  // Check hover on Book Now button
  const bookBtn = await page.$('header .framer-18mvsw1-container a, header a.framer-vO7O2');
  if (bookBtn) {
    await bookBtn.hover();
    await page.waitForTimeout(300);
    const btnHoverStyle = await page.evaluate(() => {
      const btn = document.querySelector('header .framer-18mvsw1-container a, header a.framer-vO7O2');
      const s = window.getComputedStyle(btn);
      return {
        bg: s.backgroundColor,
        color: s.color,
        border: s.border,
        boxShadow: s.boxShadow
      };
    });
    console.log('Book Now button hover style:', btnHoverStyle);
  }

  // Click on Book Now button - what happens?
  console.log('Clicking Book Now button...');
  const navUrlBefore = page.url();
  await bookBtn.click();
  await page.waitForTimeout(500);
  const navUrlAfter = page.url();
  console.log('URL before:', navUrlBefore, '-> URL after:', navUrlAfter);

  const modalState = await page.evaluate(() => {
    const modal = document.querySelector('#grand-booking-modal, [data-framer-name="Modal"], .grand-modal');
    return modal ? { exists: true, display: window.getComputedStyle(modal).display, visible: window.getComputedStyle(modal).visibility } : { exists: false };
  });
  console.log('Modal state after click:', modalState);

  await browser.close();
}

testHover().catch(console.error);
