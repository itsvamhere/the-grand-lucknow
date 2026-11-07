import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function check() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('https://the-grand-lucknow.vercel.app/', { waitUntil: 'domcontentloaded' });
  const colors = await page.evaluate(() => {
    return {
      body: window.getComputedStyle(document.body).backgroundColor,
      html: window.getComputedStyle(document.documentElement).backgroundColor,
      main: document.querySelector('main') ? window.getComputedStyle(document.querySelector('main')).backgroundColor : null
    };
  });
  console.log('Colors on live:', colors);
  await browser.close();
}

check().catch(console.error);
