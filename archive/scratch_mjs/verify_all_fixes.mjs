import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

async function verify() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const networkRequests = [];
  page.on('request', req => {
    const url = req.url();
    if (url.includes('framerusercontent.com/sites/')) {
      networkRequests.push(url);
    }
  });

  console.log('Navigating to http://localhost:3003/...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Check 1: Network leakage
  console.log(`Framer CDN site leaks: ${networkRequests.length}`);
  if (networkRequests.length > 0) {
    console.warn('Leaked URLs:', networkRequests);
  } else {
    console.log('✓ PASSED: Zero framerusercontent.com/sites/ leakage!');
  }

  // Check 2: DOM scan on /
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\n--- Checking Forbidden Words on Home Page ---');
  const forbidden = ['Moritz', 'Casa Momo', 'Graz', 'Austria', 'apartment', 'Boutique N°', 'kitchenware', 'grocery', 'flat', 'infant', 'Christmas markets'];
  for (const word of forbidden) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    const has = regex.test(bodyText);
    console.log(`Contains "${word}": ${has ? 'FAILED ✗' : 'CLEAN ✓'}`);
  }

  // Check 3: Hero text
  const heroText = await page.evaluate(() => {
    const heroWords = Array.from(document.querySelectorAll('[data-framer-name="Hero Word"]')).map(el => el.textContent.trim());
    return heroWords;
  });
  console.log('\nHero words:', heroText);

  // Take screenshot of home page top
  await page.screenshot({ path: path.join(projectDir, 'verified_home_hero.png') });

  // Scroll to venues cards
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(projectDir, 'verified_home_cards.png') });

  // Scroll to reviews
  await page.evaluate(() => window.scrollTo(0, 11000));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(projectDir, 'verified_home_reviews.png') });

  // Scroll to giant footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(projectDir, 'verified_home_footer.png') });

  // Check About page
  console.log('\nNavigating to http://localhost:3003/about...');
  await page.goto('http://localhost:3003/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const aboutText = await page.evaluate(() => document.body.innerText);
  console.log('--- Checking Forbidden Words on About Page ---');
  for (const word of forbidden) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    const has = regex.test(aboutText);
    console.log(`About contains "${word}": ${has ? 'FAILED ✗' : 'CLEAN ✓'}`);
  }

  const hasPhilosophy = /My Philosophy/i.test(aboutText);
  console.log(`About contains "My Philosophy": ${hasPhilosophy ? 'FAILED ✗' : 'CLEAN ✓'}`);

  const hasOurVision = /Our Vision/i.test(aboutText);
  console.log(`About contains "Our Vision": ${hasOurVision ? 'PASSED ✓' : 'NOT FOUND ✗'}`);

  await page.screenshot({ path: path.join(projectDir, 'verified_about_top.png') });

  // Mobile check (375px)
  console.log('\nTesting mobile layout (375x812)...');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(projectDir, 'verified_mobile_hero.png') });

  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: path.join(projectDir, 'verified_mobile_footer.png') });

  await browser.close();
  console.log('\nAll verification checks complete!');
}

verify().catch(console.error);
