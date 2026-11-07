import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function getFooterSvg() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const svgDetails = await page.evaluate(() => {
    const el = document.querySelector('.framer-xj8hz2 svg');
    if (!el) return 'No SVG in .framer-xj8hz2';
    return {
      outerHTML: el.outerHTML,
      viewBox: el.getAttribute('viewBox'),
      parentClasses: el.parentElement.className,
      grandParentClasses: el.parentElement.parentElement.className
    };
  });

  console.log('SVG Details:', JSON.stringify(svgDetails, null, 2));
  await browser.close();
}

getFooterSvg().catch(console.error);
