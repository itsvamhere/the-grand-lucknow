import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function check() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://casamomo.at', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const logoHtml = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    return l ? l.outerHTML : 'no logo';
  });
  console.log('Casa Momo logo HTML:');
  console.log(logoHtml);

  // Check subpage e.g. apartments
  await page.goto('https://casamomo.at/apartments/boutique-n1', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const subLogoHtml = await page.evaluate(() => {
    const l = document.querySelector('[data-framer-name="Logo"]');
    return l ? l.outerHTML : 'no logo';
  });
  console.log('Subpage logo HTML:');
  console.log(subLogoHtml);

  await browser.close();
}

check().catch(console.error);
