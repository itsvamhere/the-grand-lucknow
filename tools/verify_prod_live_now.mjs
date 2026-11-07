import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

async function verifyLive() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const testUrls = [
    { name: 'Live Home Page', url: 'https://the-grand-lucknow.vercel.app' },
    { name: 'Live Open Earth Lawn', url: 'https://the-grand-lucknow.vercel.app/venues/open-earth-lawn' }
  ];

  for (const item of testUrls) {
    console.log(`Checking ${item.name} (${item.url})...`);
    await page.goto(item.url, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);

    const data = await page.evaluate(() => {
      const el = document.querySelector('footer .framer-xj8hz2');
      const bg = el ? window.getComputedStyle(el).backgroundImage : '';
      const text = document.querySelector('footer')?.innerText || '';
      return {
        hasSerifVector: bg.includes('112.277') || bg.includes('M%20112.277'),
        hasSansFallback: bg.includes('%3Ctext') || bg.includes('<text'),
        bgLength: bg.length,
        footerTextSnippet: text.slice(0, 150).replace(/\s+/g, ' ')
      };
    });

    const footerHandle = await page.$('footer');
    if (footerHandle) {
      const shot = path.join(ROOT, 'tools', `live_prod_${item.name.toLowerCase().replace(/\s+/g, '_')}.png`);
      await footerHandle.screenshot({ path: shot });
      console.log(`Saved screenshot to ${shot}`);
    }

    console.log(item.name, 'Status:', JSON.stringify(data, null, 2));
  }

  await browser.close();
}

verifyLive().catch(console.error);
