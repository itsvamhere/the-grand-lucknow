import { chromium } from 'playwright-core';

async function verify() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  
  const consoleErrors = [];
  const network404s = [];

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('response', res => {
    if (res.status() === 404) network404s.push(res.url());
  });

  const res = await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  console.log('Status:', res.status());
  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) console.log('Errors:', consoleErrors);
  console.log('404s count:', network404s.length);
  if (network404s.length > 0) console.log('404 URLs:', network404s);

  await browser.close();
}

verify().catch(console.error);
