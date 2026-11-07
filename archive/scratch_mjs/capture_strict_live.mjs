import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';
const liveUrl = 'https://the-grand-lucknow.vercel.app';

async function captureStrictLive() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto(liveUrl + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Dark Background State (Hero)
  const darkInfo = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    const comp = el ? window.getComputedStyle(el) : null;
    return {
      fill: comp ? comp.fill : null,
      fontFamily: comp ? comp.fontFamily : null,
      fontSize: comp ? comp.fontSize : null,
      fontWeight: comp ? comp.fontWeight : null,
      classes: document.documentElement.className
    };
  });
  console.log('Live Dark Background State:', darkInfo);

  await page.screenshot({
    path: path.join(artifactsDir, 'live_strict_logo_dark_bg.png'),
    clip: { x: 30, y: 15, width: 320, height: 80 }
  });

  // 2. Simulate light section (#FFF1C9)
  await page.evaluate(() => {
    const light = document.createElement('div');
    light.id = 'cream-bg-test';
    light.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:120px; background:#FFF1C9; z-index:1;';
    document.body.appendChild(light);
    window.dispatchEvent(new Event('scroll'));
  });
  await page.waitForTimeout(600);

  const lightInfo = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
    const comp = el ? window.getComputedStyle(el) : null;
    return {
      fill: comp ? comp.fill : null,
      fontFamily: comp ? comp.fontFamily : null,
      fontSize: comp ? comp.fontSize : null,
      fontWeight: comp ? comp.fontWeight : null,
      classes: document.documentElement.className
    };
  });
  console.log('Live Light Section State (#1A241E):', lightInfo);

  await page.screenshot({
    path: path.join(artifactsDir, 'live_strict_logo_light_bg.png'),
    clip: { x: 30, y: 15, width: 320, height: 80 }
  });

  await browser.close();
  console.log('Strict live proofs captured successfully!');
}

captureStrictLive().catch(console.error);
