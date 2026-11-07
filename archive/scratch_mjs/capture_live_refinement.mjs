import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';
const liveUrl = 'https://the-grand-lucknow.vercel.app';

async function capture() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // Desktop
  const deskPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await deskPage.goto(liveUrl + '/', { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(2000);

  // Scroll 500px
  await deskPage.evaluate(() => window.scrollTo(0, 500));
  await deskPage.waitForTimeout(1000);
  await deskPage.screenshot({
    path: path.join(artifactsDir, 'live_refinement_desktop_sticky_nav.png'),
    clip: { x: 0, y: 0, width: 400, height: 110 }
  });

  // Mobile
  const mobPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  await mobPage.goto(liveUrl + '/', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(2000);

  await mobPage.evaluate(() => window.scrollTo(0, 500));
  await mobPage.waitForTimeout(1000);
  await mobPage.screenshot({
    path: path.join(artifactsDir, 'live_refinement_mobile_sticky_nav.png'),
    clip: { x: 0, y: 0, width: 390, height: 90 }
  });

  await browser.close();
  console.log('Live refinement proofs saved successfully!');
}

capture().catch(console.error);
