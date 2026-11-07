import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testSmoothScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Scroll smoothly down using mouse wheel
  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(100);
  }

  const state1 = await page.evaluate(() => {
    return {
      scrollY: window.scrollY,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      htmlBg: window.getComputedStyle(document.documentElement).backgroundColor,
      logoColor: window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color'),
      logoTheme: document.documentElement.getAttribute('data-logo-theme')
    };
  });
  console.log('After scrolling down 30 wheels:', state1);

  // Scroll down more
  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(100);
  }

  const state2 = await page.evaluate(() => {
    return {
      scrollY: window.scrollY,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      htmlBg: window.getComputedStyle(document.documentElement).backgroundColor,
      logoColor: window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color'),
      logoTheme: document.documentElement.getAttribute('data-logo-theme')
    };
  });
  console.log('After scrolling down 60 wheels:', state2);

  await browser.close();
}
testSmoothScroll().catch(console.error);
