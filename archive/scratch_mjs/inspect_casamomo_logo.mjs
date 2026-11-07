import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('https://casamomo.at', { waitUntil: 'networkidle' });
  
  const logoInfo = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Logo"]') || document.querySelector('header svg');
    if (!el) return { error: 'not found' };
    
    // Check computed styles, SVG contents, paths, fonts
    const svg = el.querySelector('svg') || (el.tagName === 'svg' ? el : null);
    const styles = window.getComputedStyle(el);
    return {
      outerHTML: el.outerHTML,
      svgHTML: svg ? svg.outerHTML : null,
      viewBox: svg ? svg.getAttribute('viewBox') : null,
      width: svg ? svg.getAttribute('width') || styles.width : null,
      height: svg ? svg.getAttribute('height') || styles.height : null,
      fontFamily: styles.fontFamily,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
    };
  });
  
  console.log(JSON.stringify(logoInfo, null, 2));
  await browser.close();
}

run().catch(console.error);
