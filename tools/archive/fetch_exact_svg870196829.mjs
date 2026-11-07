import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function fetchExactSvg870196829() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  const fullSvg = await page.evaluate(() => {
    const el = document.getElementById('svg870196829_4253');
    return el ? el.outerHTML : null;
  });

  if (fullSvg) {
    fs.writeFileSync(path.join(root, 'tools', 'casamomo_svg870196829_4253.svg'), fullSvg);
    console.log('Saved casamomo_svg870196829_4253.svg, length:', fullSvg.length);
  }
  await browser.close();
}

fetchExactSvg870196829().catch(console.error);
