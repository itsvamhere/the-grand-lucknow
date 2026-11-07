import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function extractExactCasamomoFooterSvg() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const bgImg = await page.evaluate(() => {
    const el = document.querySelector('.framer-xj8hz2');
    if (!el) return null;
    return el.style.backgroundImage;
  });

  console.log('Background image raw length:', bgImg ? bgImg.length : 0);
  if (bgImg) {
    fs.writeFileSync(path.join(root, 'tools', 'casamomo_footer_bg_image.txt'), bgImg);
    console.log('Saved to tools/casamomo_footer_bg_image.txt');
  }
  await browser.close();
}

extractExactCasamomoFooterSvg().catch(console.error);
