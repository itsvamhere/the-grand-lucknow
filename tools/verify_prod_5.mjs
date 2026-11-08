import { chromium } from 'playwright-core';

const slugs = [
  'open-earth-lawn',
  'grassland-gala',
  'garden-galaxy',
  'the-grand-courtyard',
  'the-royal-legacy-banquet'
];

async function verifyProd() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Check production homepage
  console.log('Testing live production https://the-grand-lucknow.vercel.app ...');
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'networkidle' });
  const homeCards = await page.locator('[data-framer-name="Venue Item"] a').evaluateAll(links => 
    links.map(l => l.getAttribute('href'))
  );
  console.log(`Live Home Cards (${homeCards.length}):`, homeCards);

  // 2. Check each subpage
  for (const slug of slugs) {
    const url = `https://the-grand-lucknow.vercel.app/venues/${slug}`;
    const res = await page.goto(url, { waitUntil: 'networkidle' });
    const title = await page.title();
    const imgs = await page.locator('img').evaluateAll(imgs => imgs.map(i => i.src).slice(0, 6));
    const allSame = imgs.every(src => src === imgs[0]);
    const recs = await page.locator('[data-framer-name="Venue Lists"] a').evaluateAll(links => links.map(l => l.getAttribute('href')));

    console.log(`[HTTP ${res.status()}] ${slug}: ${title} | Gallery 6x identical: ${allSame} (${imgs[0]?.split('/').pop()}) | Recs: ${recs.join(', ')}`);
  }

  await browser.close();
}

verifyProd().catch(console.error);
