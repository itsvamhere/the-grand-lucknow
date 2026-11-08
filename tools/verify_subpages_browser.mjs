import { chromium } from 'playwright-core';
import path from 'path';

async function testPage(url, venueSlug) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const res = await page.goto(url, { waitUntil: 'networkidle' });
  console.log(`\n=== Testing ${url} (HTTP ${res.status()}) ===`);

  const title = await page.title();
  console.log('Page Title:', title);

  const h1Text = await page.locator('h1').first().innerText();
  console.log('H1 Text:', h1Text.replace(/\s+/g, ' ').trim());

  // Check Gallery
  const galleryImgs = await page.locator('img').evaluateAll(imgs => 
    imgs.map(i => i.src).slice(0, 6)
  );
  console.log('Gallery Images (first 6):', galleryImgs);

  // Check Description
  const descText = await page.locator('[data-framer-name="Description"]').innerText();
  console.log('Description:', descText.slice(0, 100).replace(/\s+/g, ' ') + '...');

  // Check Venue Lists (recommended cards)
  const vListLinks = await page.locator('[data-framer-name="Venue Lists"] a').evaluateAll(links => 
    links.map(l => l.getAttribute('href'))
  );
  console.log('Recommended Venue Links:', vListLinks);

  // Check Location section
  const locH2 = page.locator('#bigtext-1 h2').first();
  const locInitialOpacity = await locH2.evaluate(el => window.getComputedStyle(el).opacity);
  console.log('Location initial opacity:', locInitialOpacity);

  // Scroll to bottom footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);

  // Take screenshot of footer
  const footerShot = path.join('tools', `proof_${venueSlug}_footer.png`);
  await page.locator('footer.framer-18na9ah').screenshot({ path: footerShot });
  console.log(`Saved screenshot: ${footerShot}`);

  console.log('Console Errors:', errors.length);
  if (errors.length > 0) {
    console.log('Error logs:', errors.slice(0, 3));
  }

  await browser.close();
}

async function run() {
  await testPage('http://localhost:3003/venues/grassland-gala', 'grassland_gala');
  await testPage('http://localhost:3003/venues/grand-ballroom', 'grand_ballroom');
}

run().catch(console.error);
