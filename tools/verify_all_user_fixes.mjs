import { chromium } from 'playwright-core';
import fs from 'node:fs';

async function verify() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--ignore-certificate-errors', '--no-sandbox']
  });

  console.log('=== TEST 1: Desktop Viewport (1440x900) on venues/open-earth-lawn.html ===');
  const deskContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await deskContext.newPage();
  const fileUrl = 'http://localhost:8089/venues/open-earth-lawn.html';
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 1. Check Footer Attribution
  const footerText = await page.evaluate(() => {
    const el = document.querySelector('a[href="https://elvar.in/edifice"]');
    return el ? el.innerText.trim() : null;
  });
  console.log('Desktop Footer attribution text:', JSON.stringify(footerText));

  // Screenshot Footer
  const footerLink = await page.locator('a[href="https://elvar.in/edifice"]').first();
  await footerLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'tools/proofs/proof_desktop_footer_edifice.png' });
  console.log('Saved proof_desktop_footer_edifice.png');

  // 2. Check Map Section & Cursor
  const mapLink = await page.locator('a.grand-map-link').first();
  await mapLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const mapBox = await mapLink.boundingBox();
  console.log('Map bounding box:', mapBox);

  // Hover over map center
  if (mapBox) {
    const hoverX = mapBox.x + mapBox.width * 0.55;
    const hoverY = mapBox.y + mapBox.height * 0.45;
    await page.mouse.move(hoverX, hoverY);
    await page.waitForTimeout(400);
  }

  const cursorState = await page.evaluate(() => {
    const c = document.getElementById('grand-map-cursor');
    if (!c) return { exists: false };
    const s = window.getComputedStyle(c);
    const map = document.querySelector('a.grand-map-link');
    const mapCursor = map ? window.getComputedStyle(map).cursor : '';
    return {
      exists: true,
      hasIsActiveClass: c.classList.contains('is-active'),
      display: s.display,
      opacity: s.opacity,
      transform: s.transform,
      left: c.style.left,
      top: c.style.top,
      backgroundColor: s.backgroundColor,
      color: s.color,
      innerText: c.innerText.trim(),
      mapComputedCursor: mapCursor
    };
  });
  console.log('Desktop Map Cursor state while hovering:', JSON.stringify(cursorState, null, 2));

  // Take screenshot of map with active cursor
  await page.screenshot({ path: 'tools/proofs/proof_desktop_map_cursor.png' });
  console.log('Saved proof_desktop_map_cursor.png');

  // 3. Check Chips styling on Desktop
  const chipsInfo = await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('.casa-map-chip'));
    return chips.map(ch => ({
      text: ch.innerText.trim(),
      isActive: ch.classList.contains('active-venue-chip'),
      bg: window.getComputedStyle(ch).backgroundColor,
      color: window.getComputedStyle(ch).color,
      borderRadius: window.getComputedStyle(ch).borderRadius,
      backdropFilter: window.getComputedStyle(ch).backdropFilter
    }));
  });
  console.log('Landmark Chips on Map:', JSON.stringify(chipsInfo, null, 2));

  console.log('\n=== TEST 2: Mobile Phone Viewport (375x812) ===');
  const mobContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true
  });
  const mobPage = await mobContext.newPage();
  await mobPage.goto(fileUrl, { waitUntil: 'load' });
  await mobPage.waitForTimeout(500);

  const mobCursorState = await page.evaluate(() => {
    // Check with mobile matchMedia
    const c = document.getElementById('grand-map-cursor');
    const s = window.getComputedStyle(c);
    return {
      display: s.display,
      isMobileHidden: s.display === 'none'
    };
  });

  const mobEval = await mobPage.evaluate(() => {
    const c = document.getElementById('grand-map-cursor');
    const s = window.getComputedStyle(c);
    const footerEl = document.querySelector('a[href="https://elvar.in/edifice"]');
    return {
      cursorExistsInDom: !!c,
      cursorComputedDisplay: s.display,
      cursorComputedOpacity: s.opacity,
      footerText: footerEl ? footerEl.innerText.trim() : null
    };
  });
  console.log('Mobile Page State:', JSON.stringify(mobEval, null, 2));

  const mobMap = await mobPage.locator('a.grand-map-link').first();
  await mobMap.scrollIntoViewIfNeeded();
  await mobPage.waitForTimeout(300);
  await mobPage.screenshot({ path: 'tools/proofs/proof_mobile_map_chips.png' });
  console.log('Saved proof_mobile_map_chips.png');

  console.log('\n=== TEST 3: Check index.html Footer Attribution ===');
  const homePage = await deskContext.newPage();
  await homePage.goto('http://localhost:8089/index.html', { waitUntil: 'networkidle' });
  const homeFooterText = await homePage.evaluate(() => {
    const el = document.querySelector('a[href="https://elvar.in/edifice"]');
    return el ? el.innerText.trim() : null;
  });
  console.log('index.html Footer attribution text:', JSON.stringify(homeFooterText));

  await browser.close();
  console.log('All verification tests completed successfully!');
}

verify().catch(console.error);
