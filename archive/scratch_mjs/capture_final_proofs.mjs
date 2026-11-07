import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

async function capture() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Venues
  await page.goto('http://localhost:3003/venues', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(projectDir, 'verified_venues_final.png') });

  // 2. Contact
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.click('a[href="./contact"], a[href="/contact"]');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(projectDir, 'verified_contact_final.png') });

  // 3. Footer Socials
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(projectDir, 'verified_socials_final.png') });

  await browser.close();
  console.log('✓ All final screenshots captured!');
}

capture().catch(console.error);
