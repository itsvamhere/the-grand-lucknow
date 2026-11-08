import { chromium } from 'playwright-core';
import path from 'path';

async function verifyLive(slug) {
  const url = `https://the-grand-lucknow.vercel.app/venues/${slug}`;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const res = await page.goto(url, { waitUntil: 'networkidle' });
  console.log(`\nVerified Live: ${url} (HTTP ${res.status()})`);

  const title = await page.title();
  console.log('Title:', title);

  const galleryImgs = await page.locator('img').evaluateAll(imgs => imgs.map(i => i.src).slice(0, 6));
  console.log('Gallery Images:', galleryImgs);

  const desc = await page.locator('[data-framer-name="Description"]').innerText();
  console.log('Description:', desc.slice(0, 90).replace(/\s+/g, ' ') + '...');

  const recLinks = await page.locator('[data-framer-name="Venue Lists"] a').evaluateAll(links => links.map(l => l.getAttribute('href')));
  console.log('Redirect Links:', recLinks);

  // Take screenshot of gallery and venue lists
  const shotPath = path.join('C:', 'Users', 'Sambhav', '.gemini', 'antigravity', 'brain', '638b99fe-ea95-4ed2-88eb-ad4caad31b4c', `prod_live_${slug}.png`);
  await page.screenshot({ path: shotPath, fullPage: false });
  console.log(`Saved screenshot: ${shotPath}`);

  await browser.close();
}

async function main() {
  await verifyLive('grassland-gala');
  await verifyLive('grand-ballroom');
}

main().catch(console.error);
