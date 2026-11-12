import { chromium } from 'playwright-core';

async function verify() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--ignore-certificate-errors', '--disable-web-security']
  });

  // 1. Desktop Test (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8089/venues/open-earth-lawn.html', { waitUntil: 'networkidle' });

  // Scroll to Location section
  await page.evaluate(() => {
    const loc = document.querySelector('[data-framer-name="Location"]');
    if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1000);

  // Take screenshot of location map section
  const mapElement = await page.$('[data-framer-name="Location"]');
  if (mapElement) {
    await mapElement.screenshot({ path: 'tools/proofs/verified_user_map_desktop.png' });
    console.log('Saved tools/proofs/verified_user_map_desktop.png');
  }

  // Hover over the map to show custom cursor
  const box = await mapElement.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2);
    await page.waitForTimeout(500);
    await mapElement.screenshot({ path: 'tools/proofs/verified_user_map_desktop_hover.png' });
    console.log('Saved tools/proofs/verified_user_map_desktop_hover.png');
  }

  // 2. Mobile Test (375x812)
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto('http://localhost:8089/venues/open-earth-lawn.html', { waitUntil: 'networkidle' });
  await mobilePage.evaluate(() => {
    const loc = document.querySelector('[data-framer-name="Location"]');
    if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await mobilePage.waitForTimeout(1000);

  const mobileMap = await mobilePage.$('[data-framer-name="Location"]');
  if (mobileMap) {
    await mobileMap.screenshot({ path: 'tools/proofs/verified_user_map_mobile.png' });
    console.log('Saved tools/proofs/verified_user_map_mobile.png');
  }

  await browser.close();
  console.log('Verification run complete!');
}

verify().catch(console.error);
