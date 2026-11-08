import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // 1. Test subpage scrolled to footer
  console.log('Testing subpage footer...');
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const subFooterCheck = await page.evaluate(() => {
    const nav = document.querySelector('header[data-framer-name="Navbar Wrapper"]');
    const f = document.querySelector('footer.framer-18na9ah');
    const zHQ = f ? f.querySelector('.framer-zHQwT') : null;
    const ticker = f ? (f.querySelector('.framer-xj8hz2') || f.querySelector('.framer-n49p1z')) : null;
    
    return {
      navVisible: nav ? (window.getComputedStyle(nav).display !== 'none' && window.getComputedStyle(nav).opacity === '1' && window.getComputedStyle(nav).visibility === 'visible') : false,
      navRect: nav ? nav.getBoundingClientRect() : null,
      footerBg: f ? window.getComputedStyle(f).backgroundColor : null,
      zHQ_bg: zHQ ? window.getComputedStyle(zHQ).backgroundColor : null,
      tickerHeight: ticker ? window.getComputedStyle(ticker).height : null,
      tickerWidth: ticker ? window.getComputedStyle(ticker).width : null
    };
  });
  console.log('Subpage Footer Check:', JSON.stringify(subFooterCheck, null, 2));
  await page.screenshot({ path: 'tools/subpage_footer_verified.png' });

  // 2. Test homepage scrolled to footer
  console.log('\nTesting homepage footer...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const homeFooterCheck = await page.evaluate(() => {
    const nav = document.querySelector('header[data-framer-name="Navbar Wrapper"]');
    const f = document.querySelector('footer.framer-18na9ah');
    const zHQ = f ? f.querySelector('.framer-zHQwT') : null;
    const ticker = f ? (f.querySelector('.framer-xj8hz2') || f.querySelector('.framer-n49p1z')) : null;
    
    return {
      navVisible: nav ? (window.getComputedStyle(nav).display !== 'none' && window.getComputedStyle(nav).opacity === '1' && window.getComputedStyle(nav).visibility === 'visible') : false,
      navRect: nav ? nav.getBoundingClientRect() : null,
      footerBg: f ? window.getComputedStyle(f).backgroundColor : null,
      zHQ_bg: zHQ ? window.getComputedStyle(zHQ).backgroundColor : null,
      tickerHeight: ticker ? window.getComputedStyle(ticker).height : null,
      tickerWidth: ticker ? window.getComputedStyle(ticker).width : null
    };
  });
  console.log('Homepage Footer Check:', JSON.stringify(homeFooterCheck, null, 2));
  await page.screenshot({ path: 'tools/homepage_footer_verified.png' });

  await browser.close();
}

test().catch(console.error);
