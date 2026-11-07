import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const brainDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566';

async function verifyLightSection() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Scroll with 70 wheels to reach the light section
  for (let i = 0; i < 70; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(600);

  const state = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"]') || document.querySelector('a[href="/"]');
    return {
      scrollY: window.scrollY,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      customVar: window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color'),
      theme: document.documentElement.getAttribute('data-logo-theme'),
      hasDarkClass: document.documentElement.classList.contains('logo-dark-text')
    };
  });
  console.log('Cream section state:', state);

  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_cream_section_nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_cream_section_logo.png'),
    clip: { x: 40, y: 25, width: 240, height: 60 }
  });

  await browser.close();
  console.log('Saved cream section verification screenshots!');
}

verifyLightSection().catch(console.error);
