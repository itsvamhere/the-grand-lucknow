import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Scroll down by 1500px
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/grand_scrolled_1500.png'
  });

  const info = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    const off = document.querySelector('[data-framer-name="Off"]');
    const text = document.querySelector('#svg-1334768056_3843 text');
    return {
      logoOpacity: window.getComputedStyle(l).opacity,
      offOpacity: off ? window.getComputedStyle(off).opacity : null,
      textColor: text ? window.getComputedStyle(text).fill : null,
      textStroke: text ? window.getComputedStyle(text).stroke : null,
      fontFamily: text ? window.getComputedStyle(text).fontFamily : null,
      fontSize: text ? window.getComputedStyle(text).fontSize : null
    };
  });
  console.log('Scroll 1500 info:\n', JSON.stringify(info, null, 2));

  await browser.close();
}

run();
