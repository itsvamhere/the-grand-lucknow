import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testErr() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('pageerror', err => {
    console.log('PAGE ERROR MESSAGE:', err.message);
    console.log('PAGE ERROR STACK:\n', err.stack);
  });

  await page.goto('http://localhost:3003/venues/boutique-n2', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await browser.close();
}

testErr().catch(console.error);
