import { chromium } from 'playwright-core';

async function testGala() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const consoleErrors = [];
  const network404s = [];

  // Desktop
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desktop.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  desktop.on('response', res => {
    if (res.status() === 404) network404s.push(res.url());
  });

  console.log('Testing http://localhost:3003/venues/grassland-gala on desktop...');
  const res = await desktop.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  console.log('Desktop Status:', res.status());
  console.log('URL:', desktop.url());

  const dCheck = await desktop.evaluate(() => {
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
  console.log('Desktop Check:', JSON.stringify(dCheck, null, 2));

  // Screenshot hero
  await desktop.screenshot({ path: 'tools/gala_desktop_hero.png' });
  console.log('Saved tools/gala_desktop_hero.png');

  // Scroll to footer
  await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await desktop.waitForTimeout(500);
  await desktop.screenshot({ path: 'tools/gala_desktop_footer.png' });
  console.log('Saved tools/gala_desktop_footer.png');

  // Mobile
  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobile.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  await mobile.screenshot({ path: 'tools/gala_mobile_hero.png' });
  console.log('Saved tools/gala_mobile_hero.png');

  await mobile.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobile.waitForTimeout(500);
  await mobile.screenshot({ path: 'tools/gala_mobile_footer.png' });
  console.log('Saved tools/gala_mobile_footer.png');

  console.log('Console Errors:', consoleErrors.length);
  console.log('404 Errors:', network404s.length);

  await browser.close();
}

testGala().catch(console.error);
