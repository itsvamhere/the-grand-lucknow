import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function logImages() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const imageRequests = [];
  page.on('response', response => {
    const url = response.url();
    const ct = response.headers()['content-type'] || '';
    if (ct.includes('image') || /\.(png|webp|jpg|jpeg|svg)/i.test(url)) {
      imageRequests.push({ url, status: response.status(), contentType: ct });
    }
  });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  console.log(`Total image requests: ${imageRequests.length}`);
  console.log(JSON.stringify(imageRequests, null, 2));

  await browser.close();
}

logImages().catch(console.error);
