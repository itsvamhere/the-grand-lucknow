import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const brainDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566';

async function verify() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Dark Hero State
  const logoEl = page.locator('[data-framer-name="Logo"]').first();
  const box = await logoEl.boundingBox();
  console.log('Logo box in Dark Hero:', box);

  const darkNavClip = { x: 0, y: 0, width: 1440, height: 110 };
  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_dark_navbar.png'),
    clip: darkNavClip
  });
  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_dark_logo.png'),
    clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 15), width: box.width + 40, height: box.height + 30 }
  });

  const getLogoColors = async () => {
    return await page.evaluate(() => {
      const defPath = document.querySelector('#svg-1334768056_3843 path');
      const defFill = defPath ? window.getComputedStyle(defPath).fill : null;
      const logoContainer = document.querySelector('[data-framer-name="Logo"]');
      const customVar = logoContainer ? window.getComputedStyle(logoContainer).getPropertyValue('--grand-logo-color') : null;
      const rootVar = window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color');
      return { defFill, customVar, rootVar };
    });
  };

  console.log('Dark state logo colors:', await getLogoColors());

  // 2. Scroll to Light Section (y = 1400)
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(600);

  console.log('Light state logo colors at y=1400:', await getLogoColors());

  const lightNavClip = { x: 0, y: 0, width: 1440, height: 110 };
  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_light_navbar.png'),
    clip: lightNavClip
  });
  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_light_logo.png'),
    clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 15), width: box.width + 40, height: box.height + 30 }
  });

  // 3. Scroll to Footer / Terracotta section
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);

  console.log('Footer state logo colors:', await getLogoColors());

  await page.screenshot({
    path: path.join(brainDir, 'the_grand_verified_footer_navbar.png'),
    clip: { x: 0, y: 0, width: 1440, height: 110 }
  });

  await browser.close();
  console.log('All screenshots saved successfully!');
}

verify().catch(console.error);
