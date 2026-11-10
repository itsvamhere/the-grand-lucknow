import { chromium } from 'playwright-core';

async function testPerformance() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true
  });

  const requests = [];
  let totalBytes = 0;

  page.on('response', async resp => {
    try {
      const url = resp.url();
      const status = resp.status();
      const headers = resp.headers();
      const contentLength = headers['content-length'] ? parseInt(headers['content-length'], 10) : 0;
      totalBytes += contentLength;
      requests.push({ url, status, size: contentLength, type: headers['content-type'] || '' });
    } catch {}
  });

  const start = Date.now();
  await page.goto('https://the-grand-lucknow.vercel.app/', { waitUntil: 'load', timeout: 60000 });
  const loadTime = Date.now() - start;

  requests.sort((a, b) => b.size - a.size);

  console.log('=== NETWORK AUDIT FOR MOBILE (https://the-grand-lucknow.vercel.app/) ===');
  console.log('Total Load Time:', loadTime, 'ms');
  console.log('Total Transferred Bytes (Content-Length):', (totalBytes / (1024 * 1024)).toFixed(2), 'MB');
  console.log('Total Request Count:', requests.length);
  console.log('\nTop 15 Heaviest Assets:');
  requests.slice(0, 15).forEach(r => {
    console.log(- [ KB] ...);
  });

  await browser.close();
}

testPerformance().catch(console.error);
