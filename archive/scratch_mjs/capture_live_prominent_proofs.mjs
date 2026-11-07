import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';
const url = 'https://the-grand-lucknow.vercel.app';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Desktop 1440x900
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Capture navbar over dark hero
  const navDesk = page.locator('[data-framer-name="Navbar Wrapper"]').first();
  await navDesk.screenshot({
    path: path.join(artifactsDir, 'live_prominent_logo_hero_dark.png')
  });

  // Capture hero crop with logo and GRAND
  await page.screenshot({
    path: path.join(artifactsDir, 'live_prominent_desktop_hero_full.png'),
    clip: { x: 0, y: 0, width: 1440, height: 450 }
  });

  // Scroll down to the terracotta / light section
  // Let's scroll to the location / booking section
  await page.evaluate(() => window.scrollTo(0, 16000));
  await page.waitForTimeout(800);

  await page.screenshot({
    path: path.join(artifactsDir, 'live_prominent_desktop_scrolled.png'),
    clip: { x: 0, y: 0, width: 1440, height: 350 }
  });

  // 2. Mobile 390x844
  const mobPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  await mobPage.goto(url, { waitUntil: 'domcontentloaded' });
  await mobPage.waitForTimeout(2000);

  const mobNav = mobPage.locator('header, [data-framer-name="Mobile Navbar"]').first();
  await mobNav.screenshot({
    path: path.join(artifactsDir, 'live_prominent_logo_mobile_hero.png')
  });

  await mobPage.evaluate(() => window.scrollTo(0, 16000));
  await mobPage.waitForTimeout(800);

  await mobNav.screenshot({
    path: path.join(artifactsDir, 'live_prominent_logo_mobile_scrolled.png')
  });

  console.log('Successfully captured live prominent logo proofs from Vercel!');
  await browser.close();
}

run().catch(console.error);
