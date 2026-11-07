import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';
const liveUrl = 'https://the-grand-lucknow.vercel.app';

async function captureLiveBlackLogo() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto(liveUrl + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Check dark hero state
  const darkFill = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    return el ? window.getComputedStyle(el).fill : null;
  });
  console.log('Live Dark Hero Logo Fill:', darkFill);

  // Inject cream background to simulate light panel / light section
  await page.evaluate(() => {
    const light = document.createElement('div');
    light.id = 'cream-bg-test';
    light.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:120px; background:#F3ECDD; z-index:1;';
    document.body.appendChild(light);
    window.dispatchEvent(new Event('scroll'));
  });
  await page.waitForTimeout(600);

  const lightFill = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    return el ? window.getComputedStyle(el).fill : null;
  });
  console.log('Live Light Section Logo Fill (Black):', lightFill);

  await page.screenshot({
    path: path.join(artifactsDir, 'live_black_logo_on_cream.png'),
    clip: { x: 30, y: 15, width: 320, height: 80 }
  });

  await browser.close();
  console.log('Live black logo proof captured successfully!');
}

captureLiveBlackLogo().catch(console.error);
