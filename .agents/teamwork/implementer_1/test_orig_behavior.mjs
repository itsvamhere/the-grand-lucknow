import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to casamomo_boutique_n1_original.html...');
  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'load' });

  // Check immediately
  const t0 = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const spans = Array.from(h1 ? h1.querySelectorAll('span') : []);
    return spans.map(s => ({
      text: s.innerText,
      transform: s.style.transform,
      opacity: s.style.opacity
    }));
  });
  console.log('Immediate load (t=0):', JSON.stringify(t0));

  // Wait 500ms
  await page.waitForTimeout(500);
  const t500 = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const spans = Array.from(h1 ? h1.querySelectorAll('span') : []);
    return spans.map(s => ({
      text: s.innerText,
      transform: s.style.transform,
      opacity: s.style.opacity
    }));
  });
  console.log('After 500ms:', JSON.stringify(t500));

  // Wait 1500ms
  await page.waitForTimeout(1000);
  const t1500 = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const spans = Array.from(h1 ? h1.querySelectorAll('span') : []);
    return spans.map(s => ({
      text: s.innerText,
      transform: s.style.transform,
      opacity: s.style.opacity
    }));
  });
  console.log('After 1500ms:', JSON.stringify(t1500));

  // Now let's scroll from 0 to 8000 in steps of 500
  console.log('\n--- Scrolling ---');
  for (let y = 0; y <= 8000; y += 1000) {
    await page.evaluate((sc) => window.scrollTo(0, sc), y);
    await page.waitForTimeout(100);
    const ty = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const spans = Array.from(h1 ? h1.querySelectorAll('span') : []);
      return spans.map(s => ({
        text: s.innerText,
        transform: s.style.transform,
        opacity: s.style.opacity
      }));
    });
    console.log(`y = ${y}:`, JSON.stringify(ty));
  }

  await browser.close();
}

test().catch(console.error);
