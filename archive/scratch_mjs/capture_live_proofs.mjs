import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';
const liveUrl = 'https://the-grand-lucknow.vercel.app';

async function captureLiveProofs() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Mobile (iPhone 14 / 390x844, 2x scale)
  const mobContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobPage = await mobContext.newPage();
  
  console.log('Loading live production URL on Mobile...');
  await mobPage.goto(liveUrl + '/', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(2000);

  // Capture Hero & Navbar on Mobile
  await mobPage.screenshot({ path: path.join(artifactsDir, 'live_mobile_01_hero.png') });
  console.log('Captured live_mobile_01_hero.png');

  // Scroll 600px to activate sticky navbar
  await mobPage.evaluate(() => window.scrollTo(0, 600));
  await mobPage.waitForTimeout(1000);
  await mobPage.screenshot({
    path: path.join(artifactsDir, 'live_mobile_02_sticky_navbar.png'),
    clip: { x: 0, y: 0, width: 390, height: 100 }
  });
  console.log('Captured live_mobile_02_sticky_navbar.png');

  // Scroll all the way to footer
  await mobPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobPage.waitForTimeout(2000);
  await mobPage.screenshot({ path: path.join(artifactsDir, 'live_mobile_03_footer.png') });
  console.log('Captured live_mobile_03_footer.png');

  // Crop of the footer wordmark
  await mobPage.screenshot({
    path: path.join(artifactsDir, 'live_mobile_04_footer_wordmark_crop.png'),
    clip: { x: 0, y: 844 - 220, width: 390, height: 220 }
  });
  console.log('Captured live_mobile_04_footer_wordmark_crop.png');

  // 2. Desktop (1440x900)
  const deskContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const deskPage = await deskContext.newPage();
  console.log('Loading live production URL on Desktop...');
  await deskPage.goto(liveUrl + '/', { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(2000);

  await deskPage.screenshot({ path: path.join(artifactsDir, 'live_desktop_01_hero.png') });
  console.log('Captured live_desktop_01_hero.png');

  // Sticky nav on desktop
  await deskPage.evaluate(() => window.scrollTo(0, 700));
  await deskPage.waitForTimeout(1000);
  await deskPage.screenshot({
    path: path.join(artifactsDir, 'live_desktop_02_sticky_navbar.png'),
    clip: { x: 0, y: 0, width: 1440, height: 120 }
  });
  console.log('Captured live_desktop_02_sticky_navbar.png');

  // Desktop Footer
  await deskPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await deskPage.waitForTimeout(2000);
  await deskPage.screenshot({ path: path.join(artifactsDir, 'live_desktop_03_footer.png') });
  console.log('Captured live_desktop_03_footer.png');

  await browser.close();
  console.log('All live production proofs captured successfully!');
}

captureLiveProofs().catch(console.error);
