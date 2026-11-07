import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function check() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const q1 = document.querySelectorAll('[data-framer-name="Sticky Header Text"] h1');
    const q2 = document.querySelectorAll('.grand-hero-letter');
    const qAllH1 = document.querySelectorAll('h1');
    const headerSec = document.querySelector('section#apartment-header, .framer-151qtkn');
    return {
      q1Count: q1.length,
      q2Count: q2.length,
      h1Count: qAllH1.length,
      headerSecHeight: headerSec ? headerSec.offsetHeight : null,
      letters: Array.from(q2).map(l => l.innerText)
    };
  });

  console.log('Result:', JSON.stringify(res, null, 2));
  await browser.close();
}

check().catch(console.error);
