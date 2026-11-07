import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';

async function run() {
  console.log('--- Launching Playwright Verification ---');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  // 1. HOME PAGE
  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const homeText = await page.evaluate(() => document.body.innerText);
  console.log('Checking Home Page Text:');
  console.log('  Includes "Boutique"?', /boutique/i.test(homeText));
  console.log('  Includes "My Philosophy"?', /my\s+philosophy/i.test(homeText));
  console.log('  Includes "Our Vision"?', /our\s+vision/i.test(homeText));
  console.log('  Includes "temporary home"?', /temporary\s+home/i.test(homeText));
  console.log('  Includes "We believe"?', /we\s+believe/i.test(homeText));
  console.log('  Includes "LinkedIn"?', /linkedin/i.test(homeText));
  console.log('  Includes "Built by"?', /built\s+by/i.test(homeText));
  console.log('  Includes "Edifice"?', /edifice/i.test(homeText));

  // Check footer links
  const edificeLinks = await page.$$eval('a[href*="elvar.in/edifice"]', els => els.map(e => ({ text: e.innerText, href: e.href })));
  console.log('  Edifice links found:', edificeLinks);

  const fbLinks = await page.$$eval('a[href*="facebook.com"]', els => els.map(e => ({ text: e.innerText, href: e.href })));
  console.log('  Facebook links found:', fbLinks);

  const liLinks = await page.$$eval('a[href*="linkedin.com"]', els => els.map(e => ({ text: e.innerText, href: e.href })));
  console.log('  LinkedIn links found:', liLinks);

  // Scroll to footer & take screenshot
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  const footerImg = path.join(artifactDir, 'verified_footer_edifice.png');
  await page.screenshot({ path: footerImg });
  console.log('✓ Captured verified_footer_edifice.png');

  // 2. VENUES PAGE
  console.log('\nNavigating to http://localhost:3003/venues ...');
  await page.goto('http://localhost:3003/venues', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const venuesText = await page.evaluate(() => document.body.innerText);
  console.log('Checking Venues Page Text:');
  console.log('  Includes "Boutique"?', /boutique/i.test(venuesText));
  console.log('  Includes "N°01"?', venuesText.includes('N°01'));
  console.log('  Includes "N°02"?', venuesText.includes('N°02'));

  // Check card images (should be 0 apartment/card images)
  const cardImgs = await page.$$eval('img', imgs => imgs.filter(i => /card_|qwHsbw|AXYlw7|16UbQQ|TB8epk/i.test(i.src)).map(i => i.src));
  console.log('  Casa Momo card images count:', cardImgs.length);

  const venuesImg = path.join(artifactDir, 'verified_venues_remediated.png');
  await page.screenshot({ path: venuesImg });
  console.log('✓ Captured verified_venues_remediated.png');

  // 3. ABOUT PAGE
  console.log('\nNavigating to http://localhost:3003/about ...');
  await page.goto('http://localhost:3003/about', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const aboutText = await page.evaluate(() => document.body.innerText);
  console.log('Checking About Page Text:');
  console.log('  Includes "My Philosophy"?', /my\s+philosophy/i.test(aboutText));
  console.log('  Includes "Our Vision"?', /our\s+vision/i.test(aboutText));
  console.log('  Includes "temporary home"?', /temporary\s+home/i.test(aboutText));
  console.log('  Includes "celebration"?', /celebration/i.test(aboutText));

  const aboutImg = path.join(artifactDir, 'verified_about_remediated.png');
  await page.screenshot({ path: aboutImg });
  console.log('✓ Captured verified_about_remediated.png');

  // 4. CONTACT PAGE
  console.log('\nNavigating to http://localhost:3003/contact ...');
  await page.goto('http://localhost:3003/contact', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const contactText = await page.evaluate(() => document.body.innerText);
  console.log('Checking Contact Page Text:');
  console.log('  Includes "stay?"?', /stay\?/i.test(contactText));
  console.log('  Includes "send me"?', /send\s+me/i.test(contactText));
  console.log('  Includes "send us"?', /send\s+us/i.test(contactText));
  console.log('  Includes "+91 91291 27091"?', contactText.includes('+91 91291 27091'));

  const contactImg = path.join(artifactDir, 'verified_contact_remediated.png');
  await page.screenshot({ path: contactImg });
  console.log('✓ Captured verified_contact_remediated.png');

  // 5. IMPRINT PAGE
  console.log('\nNavigating to http://localhost:3003/imprint ...');
  await page.goto('http://localhost:3003/imprint', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const imprintText = await page.evaluate(() => document.body.innerText);
  console.log('Checking Imprint Page Text:');
  console.log('  Includes "22, Raibareli Rd, Bindaua, Lucknow"?', imprintText.includes('22, Raibareli Rd, Bindaua, Lucknow'));
  console.log('  Includes "Thegrandbanquet07@gmail.com"?', imprintText.includes('Thegrandbanquet07@gmail.com'));
  console.log('  Includes "Edifice"?', imprintText.includes('Edifice'));

  const imprintImg = path.join(artifactDir, 'verified_imprint_remediated.png');
  await page.screenshot({ path: imprintImg });
  console.log('✓ Captured verified_imprint_remediated.png');

  await browser.close();
  console.log('\n--- All Verifications Complete! ---');
}

run().catch(console.error);
