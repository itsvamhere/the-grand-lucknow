import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testVercelProduction() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  const testPages = [
    { name: 'Home', url: 'https://the-grand-lucknow.vercel.app/' },
    { name: 'Open Earth Lawn', url: 'https://the-grand-lucknow.vercel.app/venues/open-earth-lawn' },
    { name: 'About', url: 'https://the-grand-lucknow.vercel.app/about' },
    { name: 'Venues Overview', url: 'https://the-grand-lucknow.vercel.app/venues' }
  ];

  for (const t of testPages) {
    const failedRequests = [];
    const consoleErrors = [];

    const reqListener = req => {
      // ignore chrome-extension or third-party telemetry if any
      if (!req.url().includes('google-analytics')) {
        failedRequests.push({ url: req.url(), failure: req.failure() });
      }
    };
    const resListener = res => {
      if (res.status() >= 400 && !res.url().includes('google-analytics')) {
        failedRequests.push({ url: res.url(), status: res.status() });
      }
    };
    const consoleListener = msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    };

    page.on('requestfailed', reqListener);
    page.on('response', resListener);
    page.on('console', consoleListener);

    console.log(`\n=== Testing ${t.name} (${t.url}) ===`);
    const resp = await page.goto(t.url, { waitUntil: 'networkidle' });
    console.log('HTTP Status:', resp ? resp.status() : 'none');
    await page.waitForTimeout(1000);

    console.log(`${t.name} failed requests count:`, failedRequests.length);
    if (failedRequests.length > 0) {
      console.log('Failures:', failedRequests);
    }
    console.log(`${t.name} console errors count:`, consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors);
    }

    // Unbind listeners for next page
    page.off('requestfailed', reqListener);
    page.off('response', resListener);
    page.off('console', consoleListener);
  }

  // Also test rollout animation on Open Earth Lawn
  console.log('\n=== Testing Rollout Animation on Live Vercel ===');
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  // scroll to y = 5250
  await page.evaluate(() => window.scrollTo(0, 5250));
  await page.waitForTimeout(100);
  const midRollout = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      opacity: window.getComputedStyle(w).opacity,
      transform: window.getComputedStyle(w).transform
    }));
    return words.slice(0, 3);
  });
  console.log('Words at y=5250:', midRollout);

  // scroll to y = 5500
  await page.evaluate(() => window.scrollTo(0, 5500));
  await page.waitForTimeout(100);
  const endRollout = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      opacity: window.getComputedStyle(w).opacity
    }));
    const bg = window.getComputedStyle(document.body).backgroundColor;
    return { words: words.slice(0, 3), bg };
  });
  console.log('State at y=5500:', endRollout);

  // Take proof screenshot of live Vercel
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_vercel_fixed.png' });

  await browser.close();
}

testVercelProduction().catch(console.error);
