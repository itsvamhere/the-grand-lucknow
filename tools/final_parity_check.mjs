import { chromium } from 'playwright-core';

async function finalVerify() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Homepage
  console.log('--- AUDITING HOMEPAGE (http://localhost:3003/) ---');
  const homePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const homeErrors = [];
  homePage.on('console', msg => { if (msg.type() === 'error') homeErrors.push(msg.text()); });
  homePage.on('pageerror', err => homeErrors.push(err.message));

  const homeRes = await homePage.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await homePage.waitForTimeout(2000);

  const homeData = await homePage.evaluate(() => {
    const nav = document.querySelector('header');
    const footer = document.querySelector('footer');
    return {
      navExists: !!nav,
      footerExists: !!footer,
      footerTextSnippet: footer ? footer.innerText.slice(0, 150).replace(/\s+/g, ' ') : null
    };
  });
  console.log('Home status:', homeRes.status());
  console.log('Home audit:', homeData);
  console.log('Home errors:', homeErrors);
  await homePage.close();

  // 2. Subpage
  console.log('--- AUDITING VENUE SUBPAGE (http://localhost:3003/venues/open-earth-lawn) ---');
  const lawnPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const lawnErrors = [];
  lawnPage.on('console', msg => { if (msg.type() === 'error') lawnErrors.push(msg.text()); });
  lawnPage.on('pageerror', err => lawnErrors.push(err.message));

  const lawnRes = await lawnPage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await lawnPage.waitForTimeout(2000);

  const lawnData = await lawnPage.evaluate(() => {
    const nav = document.querySelector('header');
    const footer = document.querySelector('footer');
    const imgs = Array.from(document.querySelectorAll('img')).filter(i => (i.getAttribute('src') || '').includes('open_earth'));
    const ticker = document.querySelector('.framer-xj8hz2');
    const bg = ticker ? window.getComputedStyle(ticker).backgroundImage : null;
    return {
      navExists: !!nav,
      footerExists: !!footer,
      venuePhotosCount: imgs.length,
      allVenuePhotosValid: imgs.every(i => i.naturalWidth > 0),
      tickerHasSerifVector: bg ? bg.includes('112.277') : false,
      tickerHasSansText: bg ? bg.includes('Lay%20Grotesk') : false
    };
  });
  console.log('Lawn status:', lawnRes.status());
  console.log('Lawn audit:', lawnData);
  console.log('Lawn errors:', lawnErrors);
  await lawnPage.close();

  await browser.close();

  if (homeErrors.length > 0 || lawnErrors.length > 0 || !lawnData.tickerHasSerifVector || lawnData.tickerHasSansText) {
    console.error('VERIFICATION FAILED!');
    process.exit(1);
  } else {
    console.log('ALL VERIFICATION CHECKS PASSED PERFECTLY!');
  }
}

finalVerify().catch(err => {
  console.error(err);
  process.exit(1);
});
