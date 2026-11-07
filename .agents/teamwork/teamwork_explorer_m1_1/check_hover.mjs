import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Scroll to footer
  const footer = page.locator('footer.framer-18na9ah');
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Hover over "Venues" link in footer
  const venuesLink = footer.locator('a[data-framer-name="Footer Link"]').first();
  await venuesLink.hover();
  await page.waitForTimeout(150); // mid-animation

  await venuesLink.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_explorer_m1_1/proof_venues_hover_mid.png' });

  await page.waitForTimeout(500); // after animation completes
  await venuesLink.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_explorer_m1_1/proof_venues_hover_end.png' });

  // Now hover over About link
  const aboutLink = footer.locator('a[data-framer-name="Footer Link"]').nth(1);
  await aboutLink.hover();
  await page.waitForTimeout(150);
  await aboutLink.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_explorer_m1_1/proof_about_hover_mid.png' });

  await page.waitForTimeout(500);
  await aboutLink.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_explorer_m1_1/proof_about_hover_end.png' });

  await browser.close();
  console.log('Hover screenshots captured!');
}

main().catch(console.error);
