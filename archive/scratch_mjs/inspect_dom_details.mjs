import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function check() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Venues DOM
  await page.goto('http://localhost:3003/venues', { waitUntil: 'networkidle' });
  const venueImgs = await page.$$eval('img', imgs => imgs.map(i => ({ src: i.src, alt: i.alt, className: i.className })));
  console.log('--- ALL IMGS ON /venues ---');
  console.log(venueImgs);

  const cardTitles = await page.$$eval('[data-framer-name="Venue Card"], [data-framer-name="Venue Item"]', els => els.map(e => e.innerText));
  console.log('--- CARD TITLES ---');
  console.log(cardTitles);

  // Imprint DOM
  await page.goto('http://localhost:3003/imprint', { waitUntil: 'networkidle' });
  const imprintText = await page.evaluate(() => document.body.innerText);
  console.log('--- IMPRINT TEXT ---');
  console.log(imprintText);

  await browser.close();
}
check().catch(console.error);
