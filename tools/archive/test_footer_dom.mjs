import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testFooterDom() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Without JS
  const contextNoJs = await browser.newContext({ javaScriptEnabled: false });
  const pageNoJs = await contextNoJs.newPage();
  await pageNoJs.goto('http://localhost:3003/venues/open-earth-lawn');
  const footerTextNoJs = await pageNoJs.evaluate(() => document.querySelector('footer')?.innerText);
  console.log('--- FOOTER TEXT WITHOUT JS ---');
  console.log(footerTextNoJs);
  
  // 2. With JS
  const contextJs = await browser.newContext({ javaScriptEnabled: true });
  const pageJs = await contextJs.newPage();
  await pageJs.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageJs.waitForTimeout(1000);
  const footerTextJs = await pageJs.evaluate(() => document.querySelector('footer')?.innerText);
  console.log('--- FOOTER TEXT WITH JS ---');
  console.log(footerTextJs);
  
  await browser.close();
}

testFooterDom().catch(console.error);
