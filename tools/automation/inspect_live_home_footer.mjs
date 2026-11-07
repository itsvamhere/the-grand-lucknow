import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Scroll to bottom of home page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Take screenshot of home page footer
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_home_footer.png' });

  // Get footer computed styles and HTML
  const footerInfo = await page.evaluate(() => {
    const f = document.querySelector('footer');
    if (!f) return { error: 'no footer' };
    const cs = window.getComputedStyle(f);
    
    // Check all children opacities
    const children = Array.from(f.querySelectorAll('*')).map(c => ({
      tag: c.tagName,
      class: c.className ? String(c.className).slice(0, 30) : '',
      opacity: window.getComputedStyle(c).opacity,
      transform: window.getComputedStyle(c).transform,
      visibility: window.getComputedStyle(c).visibility
    })).filter(x => parseFloat(x.opacity) === 0 || x.visibility === 'hidden');

    return {
      tag: f.tagName,
      className: f.className,
      rect: f.getBoundingClientRect(),
      bg: cs.backgroundColor,
      hiddenCount: children.length,
      outerHTMLPreview: f.outerHTML.slice(0, 500)
    };
  });

  console.log(JSON.stringify(footerInfo, null, 2));
  await browser.close();
})();
