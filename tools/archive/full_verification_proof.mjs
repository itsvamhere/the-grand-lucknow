import path from 'path';
import fs from 'fs';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const brainDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566';

async function verifyAll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Dark Hero State
  const darkState = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"]') || document.querySelector('a[href="/"]');
    const p = el ? el.querySelector('path') : null;
    return {
      fill: p ? window.getComputedStyle(p).fill : null,
      customVar: window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color'),
      theme: document.documentElement.getAttribute('data-logo-theme')
    };
  });
  console.log('Dark Hero state:', darkState);

  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_dark_full_nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_dark_logo_crop.png'),
    clip: { x: 40, y: 25, width: 240, height: 60 }
  });

  // 2. Scroll into light cream section
  // Let's scroll using wheel so Lenis and Framer trigger their scroll transitions
  for (let i = 0; i < 55; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);

  const lightState = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"]') || document.querySelector('a[href="/"]');
    const p = el ? el.querySelector('path') : null;
    return {
      scrollY: window.scrollY,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      fill: p ? window.getComputedStyle(p).fill : null,
      customVar: window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color'),
      theme: document.documentElement.getAttribute('data-logo-theme')
    };
  });
  console.log('Light section state:', lightState);

  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_light_full_nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_light_logo_crop.png'),
    clip: { x: 40, y: 25, width: 240, height: 60 }
  });

  // 3. Take full page view comparison card
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(brainDir, 'the_grand_dark_hero_context.png'),
    clip: { x: 0, y: 0, width: 1440, height: 500 }
  });

  for (let i = 0; i < 55; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(brainDir, 'the_grand_light_cream_context.png'),
    clip: { x: 0, y: 0, width: 1440, height: 500 }
  });

  await browser.close();
  console.log('Verification completed and all proof screenshots captured!');
}

verifyAll().catch(console.error);
