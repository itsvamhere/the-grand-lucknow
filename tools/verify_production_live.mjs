import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const failedRequests = [];
  const consoleErrors = [];
  page.on('requestfailed', req => failedRequests.push(req.url()));
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  console.log('Navigating to live production...');
  const resp = await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  console.log('Status:', resp.status());
  
  // 1. Live Map Pin Check
  await page.evaluate(() => {
    const loc = document.querySelector('#location') || document.querySelector('[data-framer-name="Location"]');
    if (loc) loc.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'tools/production_live_map.png' });
  
  const mapData = await page.evaluate(() => {
    const pin = document.querySelector('#grand-live-pointer');
    const map = document.querySelector('#subpage-vector-map');
    const btn = document.querySelector('[data-framer-name="Sticky Button"]') || document.querySelector('a:has-text("Check Availability")');
    const pRect = pin.getBoundingClientRect();
    const mRect = map.getBoundingClientRect();
    const bRect = btn ? btn.getBoundingClientRect() : null;
    return {
      pinXPercent: ((pRect.left + pRect.width / 2 - mRect.left) / mRect.width) * 100,
      pinYPercent: ((pRect.top + pRect.height / 2 - mRect.top) / mRect.height) * 100,
      clearanceAboveBtn: bRect ? (bRect.top - pRect.bottom) : null
    };
  });
  console.log('Live Production Map Pin:', mapData);
  
  // 2. Live Other Venues Cards Check
  await page.evaluate(() => {
    const cards = document.querySelector('img[alt="Grassland Gala"]');
    if (cards) cards.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'tools/production_live_cards.png' });
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log('Cards Live Checks:', {
    hasGrassland20k: text.includes('20,000'),
    hasGarden15k: text.includes('15,000'),
    has800Guests: text.includes('800'),
    has300Guests: text.includes('300'),
    has120Sqft: text.includes('120 Sqft')
  });
  
  // 3. Live Footer & Navbar Collision Check
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'tools/production_live_footer.png' });
  
  const navFooterLive = await page.evaluate(() => {
    const nav = document.querySelector('header[data-framer-name="Navbar Wrapper"]');
    const footer = document.querySelector('footer');
    return {
      navOpacity: nav ? window.getComputedStyle(nav).opacity : null,
      navTransform: nav ? window.getComputedStyle(nav).transform : null,
      footerZIndex: footer ? window.getComputedStyle(footer).zIndex : null
    };
  });
  console.log('Live Nav Footer State:', navFooterLive);
  console.log('Failed Requests:', failedRequests.length);
  console.log('Console Errors:', consoleErrors.length);
  
  await browser.close();
  console.log('Production live verification complete!');
})();
