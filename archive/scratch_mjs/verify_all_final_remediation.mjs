import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';

async function test() {
  console.log('--- Starting Final Verification ---');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Check About Page for Pills and Location Map
  console.log('Checking /about ...');
  await page.goto('http://localhost:3003/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const pills = await page.$$eval('.framer-1piqdra, .framer-1q2r93m', els => els.map(e => ({ text: e.innerText, display: getComputedStyle(e).display })));
  console.log('Pills on /about:', pills);

  // Check Locations image
  const locationImg = await page.$eval('.framer-13u7jne-container img', img => ({ src: img.src, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight })).catch(e => e.message);
  console.log('Location image on /about:', locationImg);

  // Screenshot Locations section
  const locationsEl = await page.$('[data-framer-name="Locations"]');
  if (locationsEl) {
    await locationsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(artifactDir, 'verified_locations_not_blank.png') });
    console.log('✓ Captured verified_locations_not_blank.png');
  }

  // 2. Check Contact Page for Normal Google Map Cutout
  console.log('\nChecking /contact ...');
  await page.goto('http://localhost:3003/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const contactImgs = await page.$$eval('img', imgs => imgs.map(i => ({ src: i.src, naturalWidth: i.naturalWidth })));
  console.log('Images on /contact:', contactImgs);
  await page.screenshot({ path: path.join(artifactDir, 'verified_contact_google_map.png') });
  console.log('✓ Captured verified_contact_google_map.png');

  // 3. Check Footer on Home Page for "THE GRAND" Marquee & "Built by Edifice"
  console.log('\nChecking Home Page Footer ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const footerText = await page.evaluate(() => document.body.innerText);
  console.log('Includes "THE GRAND"?', footerText.includes('THE GRAND'));
  console.log('Includes "Built by"?', /built\s+by/i.test(footerText));
  console.log('Includes "Edifice"?', /edifice/i.test(footerText));

  // Check SVG text content in footer
  const svgTexts = await page.$$eval('footer svg text, [data-framer-name="Footer"] svg text', els => els.map(e => e.textContent));
  console.log('Footer SVG Texts:', svgTexts);

  await page.screenshot({ path: path.join(artifactDir, 'verified_footer_the_grand_edifice.png') });
  console.log('✓ Captured verified_footer_the_grand_edifice.png');

  // 4. Check Logo Typography on Desktop Header
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  const logoInfo = await page.$eval('nav img, header img, [data-framer-name="Navbar Menu Subpages"] img, .framer-1j5k357 img', img => ({ src: img.src, width: img.clientWidth, height: img.clientHeight })).catch(e => e.message);
  console.log('Logo Info:', logoInfo);
  await page.screenshot({ path: path.join(artifactDir, 'verified_header_logo.png') });
  console.log('✓ Captured verified_header_logo.png');

  await browser.close();
  console.log('--- Final Verification Finished! ---');
}

test().catch(console.error);
