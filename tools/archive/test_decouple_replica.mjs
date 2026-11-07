import fs from 'fs';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const originalPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html';
const testPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/test_replica_n1.html';
const ARTIFACTS = 'C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3';

let html = fs.readFileSync(originalPath, 'utf8');

// Decouple external Framer runtime that resets to 404 when pathname is not boutique-n1
html = html.replace(/<script[^>]*script_main[^>]*><\/script>/g, '');
html = html.replace(/<script type="framer\/handover"[^>]*>[\s\S]*?<\/script>/g, '');

fs.writeFileSync(testPath, html, 'utf8');

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/venues/test_replica_n1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const title = await page.title();
  const bodyText = await page.innerText('body');
  const has404 = bodyText.includes("doesn't exist") || bodyText.includes("Page Not Found");

  console.log('Title:', title);
  console.log('Has 404:', has404);
  console.log('First 200 chars:', bodyText.substring(0, 200).replace(/\s+/g, ' '));

  await page.screenshot({ path: `${ARTIFACTS}/test_replica_n1_screenshot.png`, fullPage: false });
  console.log('Saved screenshot to test_replica_n1_screenshot.png');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
