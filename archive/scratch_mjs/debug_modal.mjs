import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testModal() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3003/venues/venue-n2', { waitUntil: 'networkidle' });
  
  const evalResult = await page.evaluate(() => {
    const el = document.getElementById('grand-booking-modal');
    if (!el) return { found: false };
    el.style.display = 'flex';
    return {
      found: true,
      display: el.style.display,
      outerHTMLPrefix: el.outerHTML.substring(0, 200),
      rect: el.getBoundingClientRect()
    };
  });
  console.log('Eval result:', evalResult);
  await browser.close();
}

testModal();
