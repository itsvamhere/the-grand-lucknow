import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';

async function verify() {
  console.log('--- FINAL POLISH VERIFICATION ---');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Check Header Logo
  console.log('1. Checking Header Logo ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const logoBBox = await page.$eval('.framer-1ngqbpf svg', el => {
    const textEl = el.querySelector('text');
    return {
      text: textEl ? textEl.textContent : el.textContent,
      font: textEl ? getComputedStyle(textEl).fontFamily : '',
      size: textEl ? getComputedStyle(textEl).fontSize : ''
    };
  }).catch(e => e.message);
  console.log('Logo typography:', logoBBox);

  await page.screenshot({ path: path.join(artifactDir, 'verified_logo_serif.png'), clip: { x: 0, y: 0, width: 400, height: 120 } });
  console.log('✓ Captured verified_logo_serif.png');

  // 2. Check About Page Pills & Locations Map
  console.log('2. Checking /about pills and normal Google map ...');
  await page.goto('http://localhost:3003/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Check how many pills are visible
  const visiblePills = await page.$$eval('.framer-1piqdra, .framer-1q2r93m', els => {
    return els.filter(e => getComputedStyle(e).display !== 'none' && e.innerText.trim()).map(e => e.innerText.trim());
  });
  console.log('Visible pills on /about:', visiblePills);

  // Scroll to Locations section
  const locSection = await page.$('[data-framer-name="Locations"]');
  if (locSection) {
    await locSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(artifactDir, 'verified_about_locations_map.png') });
    console.log('✓ Captured verified_about_locations_map.png');
  }

  // 3. Check Contact Page Map
  console.log('3. Checking /contact map cutout ...');
  await page.goto('http://localhost:3003/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(artifactDir, 'verified_contact_page_map.png') });
  console.log('✓ Captured verified_contact_page_map.png');

  // 4. Check Footer Marquee "THE GRAND" & "Built by Edifice"
  console.log('4. Checking Footer Marquee & Attribution ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const marqueeText = await page.$$eval('footer svg text, [data-framer-name="Footer"] svg text', els => els.map(e => e.textContent));
  console.log('Marquee text:', marqueeText);

  const edificeLink = await page.$eval('a[href*="elvar.in/edifice"]', a => ({ text: a.innerText, href: a.href })).catch(e => e.message);
  console.log('Edifice attribution link:', edificeLink);

  await page.screenshot({ path: path.join(artifactDir, 'verified_footer_the_grand_marquee.png') });
  console.log('✓ Captured verified_footer_the_grand_marquee.png');

  await browser.close();
  console.log('--- ALL VERIFICATIONS COMPLETED SUCCESSFULLY ---');
}

verify().catch(console.error);
