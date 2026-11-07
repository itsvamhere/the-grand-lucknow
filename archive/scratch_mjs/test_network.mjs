import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testRequests() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  const requests = [];
  page.on('request', req => {
    requests.push({ url: req.url(), method: req.method() });
  });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('Total requests:', requests.length);
  const upstream = requests.filter(r => r.url.includes('framer') || r.url.includes('workers.dev'));
  console.log('Upstream/External requests count:', upstream.length);
  upstream.forEach(r => console.log('  ', r.url));

  await browser.close();
}

testRequests().catch(console.error);
