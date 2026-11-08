import { chromium } from 'playwright-core';

async function testLiveGala() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const consoleErrors = [];
  const network404s = [];

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('response', res => {
    if (res.status() === 404) network404s.push(res.url());
  });

  console.log('Testing live production at https://the-grand-lucknow.vercel.app/venues/grassland-gala...');
  const res = await page.goto('https://the-grand-lucknow.vercel.app/venues/grassland-gala', { waitUntil: 'networkidle' });
  console.log('Live Status:', res.status());
  console.log('URL:', page.url());

  const check = await page.evaluate(() => {
    const nav = document.querySelector('header[data-framer-name="Navbar Wrapper"]');
    const f = document.querySelector('footer.framer-18na9ah');
    const zHQ = f ? f.querySelector('.framer-zHQwT') : null;
    const ticker = f ? (f.querySelector('.framer-xj8hz2') || f.querySelector('.framer-n49p1z')) : null;
    
    return {
      title: document.title,
      h1: document.querySelector('h1') ? document.querySelector('h1').innerText : null,
      navVisible: nav ? (window.getComputedStyle(nav).display !== 'none' && window.getComputedStyle(nav).opacity === '1') : false,
      footerBg: f ? window.getComputedStyle(f).backgroundColor : null,
      zHQ_bg: zHQ ? window.getComputedStyle(zHQ).backgroundColor : null,
      tickerHeight: ticker ? window.getComputedStyle(ticker).height : null,
      tickerWidth: ticker ? window.getComputedStyle(ticker).width : null
    };
  });
  console.log('Live Check:', JSON.stringify(check, null, 2));

  await page.screenshot({ path: 'tools/prod_gala_verified.png' });
  console.log('Saved tools/prod_gala_verified.png');

  console.log('Console Errors:', consoleErrors.length);
  console.log('404 Errors:', network404s.length);

  await browser.close();
}

testLiveGala().catch(console.error);
