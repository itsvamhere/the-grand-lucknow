import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('file:///C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // 1. Initial navbar over hero
  const navSelector = '[data-framer-name="Navbar Wrapper"]';
  await page.locator(navSelector).first().screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/prominent_logo_hero_dark.png'
  });

  // 2. Scroll down to light section (e.g. scroll 2000px)
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(600);

  await page.locator(navSelector).first().screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/prominent_logo_light_bg.png'
  });

  // 3. Mobile viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  const mobNav = page.locator('header, [data-framer-name="Mobile Navbar"]').first();
  await mobNav.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/prominent_mobile_hero.png'
  });

  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(600);

  await mobNav.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/prominent_mobile_light.png'
  });

  console.log('Screenshots captured successfully.');
  await browser.close();
}

run().catch(console.error);
