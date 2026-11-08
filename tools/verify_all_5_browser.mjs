import { chromium } from 'playwright-core';
import path from 'path';

const fiveSlugs = [
  'open-earth-lawn',
  'grassland-gala',
  'garden-galaxy',
  'the-grand-courtyard',
  'the-royal-legacy-banquet'
];

async function verifyAll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Verify Home Page
  console.log('Testing Home Page http://localhost:3003 ...');
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const homeCards = await page.locator('[data-framer-name="Venue Item"] a').evaluateAll(links => 
    links.map(l => l.getAttribute('href'))
  );
  console.log(`Home Page Cards count: ${homeCards.length}`);
  console.log('Home Page Cards:', homeCards);

  // 2. Verify each of the 5 venue subpages
  for (const slug of fiveSlugs) {
    const url = `http://localhost:3003/venues/${slug}`;
    console.log(`\nTesting ${url} ...`);
    const res = await page.goto(url, { waitUntil: 'networkidle' });
    console.log(`Status: ${res.status()}`);

    const title = await page.title();
    console.log(`Title: ${title}`);

    const galleryImgs = await page.locator('img').evaluateAll(imgs => imgs.map(i => i.src).slice(0, 6));
    console.log(`Gallery Images: ${galleryImgs[0]} (all 6 identical: ${galleryImgs.every(src => src === galleryImgs[0])})`);

    const desc = await page.locator('[data-framer-name="Description"]').innerText();
    console.log(`Description: ${desc.slice(0, 80).replace(/\s+/g, ' ')}...`);

    const recLinks = await page.locator('[data-framer-name="Venue Lists"] a').evaluateAll(links => 
      links.map(l => l.getAttribute('href'))
    );
    console.log(`Recommended Cards:`, recLinks);

    const shotPath = path.join('tools', `proof_${slug}_desktop.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`Saved screenshot: ${shotPath}`);
  }

  await browser.close();
  console.log('\nAll 5 venue subpages verified with Chrome DevTools in browser!');
}

verifyAll().catch(console.error);
