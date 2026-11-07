import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  // 1. Check Pin position
  const pinRect = await page.evaluate(() => {
    const pin = document.querySelector('#grand-live-pointer');
    const map = document.querySelector('#subpage-vector-map');
    const btn = document.querySelector('[data-framer-name="Sticky Button"]') || document.querySelector('a:has-text("Check Availability")');
    if (!pin || !map) return null;
    const pBox = pin.getBoundingClientRect();
    const mBox = map.getBoundingClientRect();
    return {
      pinRelativeLeft: ((pBox.left - mBox.left) / mBox.width) * 100,
      pinRelativeTop: ((pBox.top - mBox.top) / mBox.height) * 100,
      pinLeftPx: pBox.left - mBox.left,
      pinTopPx: pBox.top - mBox.top,
      mapWidth: mBox.width,
      mapHeight: mBox.height
    };
  });
  console.log('Pin Geometry:', pinRect);
  
  // 2. Scroll to footer and check navbar collision
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  const navFooterCollision = await page.evaluate(() => {
    const nav = document.querySelector('header');
    const footer = document.querySelector('footer');
    const menuTitle = footer ? footer.querySelector('[data-framer-name="Menu Title"]') : null;
    return {
      navZIndex: nav ? window.getComputedStyle(nav).zIndex : null,
      footerZIndex: footer ? window.getComputedStyle(footer).zIndex : null,
      navTop: nav ? nav.getBoundingClientRect().top : null,
      navBottom: nav ? nav.getBoundingClientRect().bottom : null,
      menuTitleTop: menuTitle ? menuTitle.getBoundingClientRect().top : null,
      isColliding: (nav && menuTitle) ? (nav.getBoundingClientRect().bottom > menuTitle.getBoundingClientRect().top) : false
    };
  });
  console.log('Nav Footer Collision Info:', navFooterCollision);
  
  await browser.close();
})();
