import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectFooterStructure() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const footerData = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return 'No footer tag';
    
    // Find all children and components inside footer
    const comps = Array.from(footer.querySelectorAll('[data-framer-name]')).map(c => ({
      name: c.getAttribute('data-framer-name'),
      tag: c.tagName,
      cls: c.className,
      rect: c.getBoundingClientRect()
    }));

    return {
      footerHTML: footer.outerHTML,
      comps
    };
  });

  console.log('Footer comps:', footerData.comps);
  console.log('Footer HTML length:', footerData.footerHTML ? footerData.footerHTML.length : 0);
  // Look for any text or SVG in footer
  await browser.close();
}

inspectFooterStructure().catch(console.error);
