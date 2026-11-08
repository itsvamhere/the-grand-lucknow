import { chromium } from 'playwright-core';
import fs from 'fs';

async function inspectAll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Desktop 1440px
  console.log('Testing Desktop 1440px...');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const desktopErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') desktopErrors.push(msg.text());
  });
  page.on('pageerror', err => desktopErrors.push(err.message));

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Screenshot hero
  await page.screenshot({ path: 'tools/subpage_final_hero_desktop.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Screenshot gallery
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'tools/subpage_final_gallery_desktop.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Screenshot footer
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1500);

  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'tools/subpage_final_footer_desktop.png' });
    console.log('Saved tools/subpage_final_footer_desktop.png');
  }

  // 2. Mobile 375px
  console.log('Testing Mobile 375px...');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const mobileErrors = [];
  mobilePage.on('console', msg => {
    if (msg.type() === 'error') mobileErrors.push(msg.text());
  });
  mobilePage.on('pageerror', err => mobileErrors.push(err.message));

  await mobilePage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await mobilePage.waitForTimeout(1500);

  const mobileFooterEl = await mobilePage.$('footer');
  if (mobileFooterEl) {
    await mobileFooterEl.screenshot({ path: 'tools/subpage_final_footer_mobile.png' });
    console.log('Saved tools/subpage_final_footer_mobile.png');
  }

  // Check gallery images
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.getAttribute('src'),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }));
  });

  console.log('Gallery photos check:');
  const lawnPhotos = images.filter(i => i.src && i.src.includes('open_earth'));
  console.log(`Found ${lawnPhotos.length} lawn photos, all naturalWidth = ${lawnPhotos[0]?.naturalWidth}`);

  console.log('Desktop errors:', desktopErrors);
  console.log('Mobile errors:', mobileErrors);

  await browser.close();
}

inspectAll().catch(console.error);
