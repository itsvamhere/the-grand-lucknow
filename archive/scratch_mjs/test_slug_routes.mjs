import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testRoutes() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  for (const slug of ['boutique-n2', 'space-02', 'venue-n2']) {
    console.log('\n--- Testing /venues/' + slug + ' ---');
    await page.goto('http://localhost:3003/venues/' + slug, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const text = await page.evaluate(() => document.body.innerText.substring(0, 300));
    console.log('Text start:', text.replace(/\n/g, ' '));
  }

  await browser.close();
}

testRoutes().catch(console.error);
