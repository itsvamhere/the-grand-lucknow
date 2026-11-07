import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

async function runVerification() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- 1. Testing /venues ---');
  await page.goto('http://localhost:3003/venues', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const venuesText = await page.evaluate(() => document.body.innerText);
  console.log('Contains "Boutique N°":', /Boutique N°/i.test(venuesText));
  console.log('Contains "Apartment Details":', /Apartment Details/i.test(venuesText));
  console.log('Contains "N°01":', /N°01/i.test(venuesText));
  console.log('Contains "N°02":', /N°02/i.test(venuesText));

  // Check card images: should be 0 Casa Momo apartment photos
  const imgSources = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.framer-1x6zbyb img, .framer-7r75h2 img')).map(img => img.src);
  });
  console.log('Card image count on /venues:', imgSources.length);
  console.log('Card images:', imgSources);

  // Take screenshot of /venues cards
  await page.screenshot({ path: path.join(projectDir, 'verified_venues_blank_cards.png') });

  console.log('\n--- 2. Testing Footer Socials ---');
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);

  const footerText = await page.evaluate(() => document.body.innerText);
  console.log('Contains "LinkedIn":', /LinkedIn/i.test(footerText));
  console.log('Contains "Facebook":', /Facebook/i.test(footerText));
  console.log('Contains "Instagram":', /Instagram/i.test(footerText));

  const socialLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*="facebook"], a[href*="instagram"], a[href*="linkedin"]')).map(a => ({
      text: a.innerText.trim(),
      href: a.href
    }));
  });
  console.log('Social Links found:', socialLinks);
  await page.screenshot({ path: path.join(projectDir, 'verified_footer_socials.png') });

  console.log('\n--- 3. Testing /contact ("send us and not me") ---');
  await page.goto('http://localhost:3003/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const contactText = await page.evaluate(() => document.body.innerText);
  console.log('Contains "send me":', /send me/i.test(contactText));
  console.log('Contains "give me":', /give me/i.test(contactText));
  console.log('Contains "send us":', /send us/i.test(contactText));
  console.log('Contains "give us":', /give us/i.test(contactText));

  await page.screenshot({ path: path.join(projectDir, 'verified_contact_send_us.png') });

  console.log('\n--- 4. Testing Home Page Locations Map Cutout ---');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 8500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(projectDir, 'verified_home_map_cutout.png') });

  await browser.close();
  console.log('\n✓ All tests completed successfully!');
}

runVerification().catch(console.error);
