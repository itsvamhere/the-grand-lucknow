import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  // 1. Map Pin Check
  await page.evaluate(() => {
    const loc = document.querySelector('#location') || document.querySelector('[data-framer-name="Location"]');
    if (loc) loc.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'tools/test_verified_map.png' });
  
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
  console.log('Map Pin Data:', mapData);
  
  // 2. Other Venues Cards Check
  await page.evaluate(() => {
    const cards = document.querySelector('.framer-hs3p09') || document.querySelector('img[alt="Grassland Gala"]');
    if (cards) cards.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'tools/test_verified_cards.png' });
  
  const cardData = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasGrassland20k: text.includes('20,000'),
      hasGarden15k: text.includes('15,000'),
      has800Guests: text.includes('800'),
      has300Guests: text.includes('300'),
      has120Sqft: text.includes('120 Sqft')
    };
  });
  console.log('Card Numbers Data:', cardData);
  
  // 3. Footer and Navbar Check
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'tools/test_verified_footer.png' });
  
  const navFooterData = await page.evaluate(() => {
    const nav = document.querySelector('header[data-framer-name="Navbar Wrapper"]');
    const isNavHidden = nav ? (nav.classList.contains('nav-hidden-over-footer') || window.getComputedStyle(nav).opacity === '0') : null;
    const ticker = document.querySelector('.grand-ticker-track');
    return {
      isNavHidden,
      tickerRunning: ticker ? (window.getComputedStyle(ticker).animationPlayState === 'running') : false
    };
  });
  console.log('Nav Footer Data:', navFooterData);
  
  await browser.close();
  console.log('Visual verification complete!');
})();
