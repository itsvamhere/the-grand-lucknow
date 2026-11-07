import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000/venues/boutique-n1.html ...');
  await page.goto('http://localhost:3000/venues/boutique-n1.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const title = await page.title();
  const headings = await page.evaluate(() => Array.from(document.querySelectorAll('h1, h2')).map(h => h.textContent.trim()));
  console.log('Original Title:', title);
  console.log('Original Headings:', headings);

  // 1. Full Hero & Gallery Screenshot
  await page.screenshot({ path: `${ARTIFACTS}/casamomo_replica_boutique_n1_hero.png` });
  console.log('✓ Saved casamomo_replica_boutique_n1_hero.png');

  // 2. Full Page Screenshot
  await page.screenshot({ path: `${ARTIFACTS}/casamomo_replica_boutique_n1_full.png`, fullPage: true });
  console.log('✓ Saved casamomo_replica_boutique_n1_full.png');

  // 3. Mobile Viewport Screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${ARTIFACTS}/casamomo_replica_boutique_n1_mobile.png` });
  console.log('✓ Saved casamomo_replica_boutique_n1_mobile.png');

  await browser.close();
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
