import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec';

async function verifySubpage() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Desktop 1440x900
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log('Navigating to http://localhost:3003/venues/open-earth-lawn...');
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to location section
  const locationHeader = await page.locator('text=Location').first();
  if (await locationHeader.count() > 0) {
    await locationHeader.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  } else {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.85));
    await page.waitForTimeout(1000);
  }

  await page.screenshot({
    path: `${ARTIFACTS}/proof_subpage_location_desktop.png`,
    fullPage: false
  });
  console.log('Captured proof_subpage_location_desktop.png');

  // 2. Mobile 390x844
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobLoc = await mobilePage.locator('text=Location').first();
  if (await mobLoc.count() > 0) {
    await mobLoc.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
  } else {
    await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.85));
    await mobilePage.waitForTimeout(1000);
  }

  await mobilePage.screenshot({
    path: `${ARTIFACTS}/proof_subpage_location_mobile.png`,
    fullPage: false
  });
  console.log('Captured proof_subpage_location_mobile.png');

  await browser.close();
}

verifySubpage().catch(console.error);
