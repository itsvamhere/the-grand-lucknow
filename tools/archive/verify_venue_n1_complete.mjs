import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('--- TEST 1: Redirect from /venues/boutique-n1 ---');
  const response = await page.goto('http://localhost:3000/venues/boutique-n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const finalUrl = page.url();
  console.log('Navigated to: http://localhost:3000/venues/boutique-n1');
  console.log('Final URL:', finalUrl);
  console.log('Matches /venues/venue-n1:', finalUrl.includes('/venues/venue-n1'));

  console.log('\n--- TEST 2: Inspect content on /venues/venue-n1 ---');
  const title = await page.title();
  console.log('Page Title:', title);

  const bodyText = await page.innerText('body');
  const has404 = bodyText.includes("doesn't exist") || bodyText.includes("Page Not Found") || title.includes("Page Not Found");
  console.log('Has 404 text:', has404);

  const h1Text = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 ? h1.textContent.trim() : 'NONE';
  });
  console.log('H1:', h1Text);

  // Take proof screenshots
  await page.screenshot({ path: `${ARTIFACTS}/venue_n1_final_hero.png` });
  console.log('✓ Captured venue_n1_final_hero.png');

  // Scroll down to middle (Specs & description)
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${ARTIFACTS}/venue_n1_final_specs.png` });
  console.log('✓ Captured venue_n1_final_specs.png');

  // Scroll down to bottom
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${ARTIFACTS}/venue_n1_final_bottom.png` });
  console.log('✓ Captured venue_n1_final_bottom.png');

  console.log('\n--- TEST 3: Port 3003 Direct Navigation ---');
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3003/venues/venue-n1', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(1500);
  console.log('Port 3003 Title:', await page2.title());
  const body2 = await page2.innerText('body');
  console.log('Port 3003 has 404:', body2.includes("doesn't exist"));

  await browser.close();
  console.log('\nAll tests complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
