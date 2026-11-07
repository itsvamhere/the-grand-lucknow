import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testHomeClick() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/');
  const bookBtn = await page.$('header a.framer-vO7O2');
  console.log('Home Book button href:', await bookBtn.getAttribute('href'));
  await bookBtn.click();
  await page.waitForTimeout(500);
  console.log('Home URL after click:', page.url());
  const modalState = await page.evaluate(() => {
    const modal = document.querySelector('#grand-booking-modal, [data-framer-name="Modal"], .grand-modal');
    return modal ? { exists: true, display: window.getComputedStyle(modal).display } : { exists: false };
  });
  console.log('Home modal state:', modalState);
  await browser.close();
}

testHomeClick().catch(console.error);
