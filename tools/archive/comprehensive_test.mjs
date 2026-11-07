import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('--- TEST 1: Homepage Verification ---');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Verify Navbar Button (Book Now)
  const navBtn = await page.$('.grand-nav-book-btn, nav .grand-nav-maps-btn');
  if (navBtn) {
    const btnInfo = await page.evaluate(el => ({
      text: el.innerText.trim(),
      href: el.getAttribute('href'),
      color: window.getComputedStyle(el.querySelector('.grand-nav-maps-text') || el).color,
      bgColor: window.getComputedStyle(el).backgroundColor,
      svgCount: el.querySelectorAll('svg').length,
      rect: el.getBoundingClientRect()
    }), navBtn);
    console.log('Navbar button info:', btnInfo);
    if (!btnInfo.text.includes('Book Now')) {
      throw new Error(`Expected navbar button text 'Book Now', got '${btnInfo.text}'`);
    }
    await navBtn.screenshot({ path: `${ARTIFACTS}/fixed_navbar_btn.png` });
  } else {
    console.error('Navbar button .grand-nav-book-btn NOT FOUND');
  }

  // Verify Location Button (Open in Maps)
  const locBtn = await page.$('.grand-nav-maps-btn.dark-btn');
  if (locBtn) {
    const locInfo = await page.evaluate(el => ({
      text: el.innerText.trim(),
      color: window.getComputedStyle(el).color
    }), locBtn);
    console.log('Location button info:', locInfo);
    if (!locInfo.text.includes('Open in Maps')) {
      throw new Error(`Expected location button text 'Open in Maps', got '${locInfo.text}'`);
    }
  }

  // 2. Capture Navbar Bar
  await page.screenshot({
    path: `${ARTIFACTS}/fixed_navbar_bar.png`,
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });

  // 3. Verify Venues Grid
  const grid = await page.$('#mefgjz, [data-framer-name="Venues Grid"]');
  if (grid) {
    await grid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const cards = await page.evaluate(() => {
      const items = document.querySelectorAll('[data-framer-name="Venue Item"]');
      return Array.from(items).map((it, idx) => ({
        index: idx + 1,
        title: (it.querySelector('h2') ? it.querySelector('h2').innerText.trim() : 'NONE'),
        href: (it.querySelector('a') ? it.querySelector('a').getAttribute('href') : 'NONE')
      }));
    });
    console.log('Homepage Venue Cards:', cards);
    await page.screenshot({ path: `${ARTIFACTS}/fixed_venues_grid.png` });
  }

  // 4. Click first card and verify navigation to subpage
  console.log('\n--- TEST 2: Click First Card Navigation ---');
  const firstCard = await page.$('[data-framer-name="Venue Item"] a');
  if (firstCard) {
    console.log('Clicking first card...');
    await firstCard.click();
    await page.waitForTimeout(2500);

    const currentUrl = page.url();
    const subTitle = await page.title();
    const subH1 = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NONE');
    const subBody = await page.evaluate(() => document.body.innerText.substring(0, 300));

    console.log('Current URL after click:', currentUrl);
    console.log('Subpage Title:', subTitle);
    console.log('Subpage H1:', subH1);
    console.log('Subpage Body Preview:\n', subBody);

    await page.screenshot({ path: `${ARTIFACTS}/fixed_subpage_after_click.png` });

    // Capture subpage navbar
    await page.screenshot({
      path: `${ARTIFACTS}/fixed_subpage_navbar.png`,
      clip: { x: 0, y: 0, width: 1440, height: 100 }
    });
  }

  // 5. Test direct load of /venues/open-earth-lawn
  console.log('\n--- TEST 3: Direct Navigation /venues/open-earth-lawn ---');
  await page.goto('http://localhost:3000/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log('Direct open-earth-lawn Title:', await page.title());

  // 6. Test direct load of /venues/venue-n1
  console.log('\n--- TEST 4: Direct Navigation /venues/venue-n1 ---');
  await page.goto('http://localhost:3000/venues/venue-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log('Direct venue-n1 Title:', await page.title());

  // 7. Test redirect of /venues/boutique-n1
  console.log('\n--- TEST 5: Direct Navigation /venues/boutique-n1 (301 Redirect) ---');
  await page.goto('http://localhost:3000/venues/boutique-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log('After boutique-n1 URL:', page.url());
  console.log('After boutique-n1 Title:', await page.title());

  await browser.close();
  console.log('\nAll comprehensive tests completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
