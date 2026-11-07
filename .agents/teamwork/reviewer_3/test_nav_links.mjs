import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testLinks() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  const venuesLink = await page.$('header a[href*="venues"]');
  await venuesLink.click();
  await page.waitForTimeout(500);
  console.log('Clicked Venues, new URL:', page.url());

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  const aboutLink = await page.$('header a[href*="about"]');
  await aboutLink.click();
  await page.waitForTimeout(500);
  console.log('Clicked About, new URL:', page.url());

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  const contactLink = await page.$('header a[href*="contact"]');
  await contactLink.click();
  await page.waitForTimeout(500);
  console.log('Clicked Contact, new URL:', page.url());

  await browser.close();
}

testLinks().catch(console.error);
