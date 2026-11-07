import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkPages() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const urls = [
    'http://localhost:3003/',
    'http://localhost:3003/about.html',
    'http://localhost:3003/contact.html',
    'http://localhost:3003/venues.html',
    'http://localhost:3003/imprint.html',
    'http://localhost:3003/privacy.html',
    'http://localhost:3003/terms.html'
  ];

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });
    const info = await page.evaluate(() => {
      const bBg = window.getComputedStyle(document.body).backgroundColor;
      const hBg = window.getComputedStyle(document.documentElement).backgroundColor;
      const logoColor = window.getComputedStyle(document.documentElement).getPropertyValue('--grand-logo-color');
      return { bBg, hBg, logoColor };
    });
    console.log(url.replace('http://localhost:3003', '') || '/', info);
  }
  await browser.close();
}
checkPages().catch(console.error);
