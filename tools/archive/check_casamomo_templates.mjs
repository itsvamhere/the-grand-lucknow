import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkCasamomoSvgTemplates() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  const svgTemplates = await page.evaluate(() => {
    const el = document.getElementById('svg-templates');
    if (!el) return 'No #svg-templates';
    const svgs = Array.from(el.querySelectorAll('svg')).map(s => ({
      id: s.id,
      viewBox: s.getAttribute('viewBox'),
      html: s.outerHTML.slice(0, 300)
    }));
    return svgs;
  });

  console.log('casamomo.at svg-templates:');
  console.dir(svgTemplates, { depth: null });
  await browser.close();
}

checkCasamomoSvgTemplates().catch(console.error);
