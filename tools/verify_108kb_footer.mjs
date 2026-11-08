import { chromium } from 'playwright-core';

async function verify() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Desktop 1440
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  console.log('Testing Desktop 1440px...');
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1500);

  const footerDesktop = await page.$('footer');
  if (footerDesktop) {
    await footerDesktop.screenshot({ path: 'tools/proof_108kb_desktop.png' });
    console.log('Saved tools/proof_108kb_desktop.png');
  }

  // 2. Mobile 375
  console.log('Testing Mobile 375px...');
  const pageMobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
  pageMobile.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  pageMobile.on('pageerror', err => errors.push(err.message));

  await pageMobile.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(2000);
  await pageMobile.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await pageMobile.waitForTimeout(1500);

  const footerMobile = await pageMobile.$('footer');
  if (footerMobile) {
    await footerMobile.screenshot({ path: 'tools/proof_108kb_mobile.png' });
    console.log('Saved tools/proof_108kb_mobile.png');
  }

  console.log('Errors caught:', errors);
  await browser.close();
}

verify().catch(console.error);
