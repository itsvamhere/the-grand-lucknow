import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkContact() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3003/contact', { waitUntil: 'networkidle' });
  const text = await page.evaluate(() => document.body.innerText);
  console.log('--- Body text on /contact: ---');
  console.log(text);
  await browser.close();
}

checkContact().catch(console.error);
