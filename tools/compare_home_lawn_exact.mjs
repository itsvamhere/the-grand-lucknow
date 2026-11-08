import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);

  const homeFooter = await page.evaluate(() => {
    const f = document.querySelector('footer');
    const xj = f ? f.querySelector('.framer-xj8hz2') : null;
    const csF = f ? window.getComputedStyle(f) : {};
    const csXj = xj ? window.getComputedStyle(xj) : {};
    const zhq = f ? f.querySelector('.framer-zHQwT') : null;
    return {
      footerBg: csF.backgroundColor,
      footerWidth: f ? f.offsetWidth : null,
      footerHeight: f ? f.offsetHeight : null,
      xjWidth: xj ? xj.offsetWidth : null,
      xjHeight: xj ? xj.offsetHeight : null,
      xjBgSize: csXj.backgroundSize,
      xjBgImage: csXj.backgroundImage ? csXj.backgroundImage.slice(0, 150) : null,
      framerZhqwtBg: zhq ? window.getComputedStyle(zhq).backgroundColor : null,
      bodyBg: window.getComputedStyle(document.body).backgroundColor
    };
  });
  console.log('Homepage footer stats:', JSON.stringify(homeFooter, null, 2));

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);

  const lawnFooter = await page.evaluate(() => {
    const f = document.querySelector('footer');
    const xj = f ? f.querySelector('.framer-xj8hz2') : null;
    const csF = f ? window.getComputedStyle(f) : {};
    const csXj = xj ? window.getComputedStyle(xj) : {};
    const zhq = f ? f.querySelector('.framer-zHQwT') : null;
    return {
      footerBg: csF.backgroundColor,
      footerWidth: f ? f.offsetWidth : null,
      footerHeight: f ? f.offsetHeight : null,
      xjWidth: xj ? xj.offsetWidth : null,
      xjHeight: xj ? xj.offsetHeight : null,
      xjBgSize: csXj.backgroundSize,
      xjBgImage: csXj.backgroundImage ? csXj.backgroundImage.slice(0, 150) : null,
      framerZhqwtBg: zhq ? window.getComputedStyle(zhq).backgroundColor : null,
      bodyBg: window.getComputedStyle(document.body).backgroundColor
    };
  });
  console.log('Lawn footer stats:', JSON.stringify(lawnFooter, null, 2));

  await browser.close();
}

test().catch(console.error);
