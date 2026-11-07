import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function findDef() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const res = await page.evaluate(() => {
    const el = document.getElementById('svg-1740432189_381');
    if (!el) {
      // Find all elements with id starting with svg
      const allSvgIds = Array.from(document.querySelectorAll('[id*="svg"]')).map(e => e.id);
      return { found: false, allSvgIds };
    }
    return {
      found: true,
      tagName: el.tagName,
      outerHTML: el.outerHTML
    };
  });

  console.log('Definition info:', JSON.stringify(res, null, 2));
  await browser.close();
}

findDef().catch(console.error);
