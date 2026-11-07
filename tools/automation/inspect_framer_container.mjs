import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const details = await page.evaluate(() => {
    const el = document.querySelector('.framer-3msmtm-container');
    if (!el) return { error: 'not found' };
    
    // Check all attributes, data-*, and computed style rules
    const attrs = {};
    for (const a of el.attributes) {
      attrs[a.name] = a.value;
    }
    
    // Find any children with animations or effects
    const children = Array.from(el.querySelectorAll('*')).map(c => ({
      tag: c.tagName,
      class: c.className,
      style: c.getAttribute('style')
    }));

    // Find script or data-framer-component-type
    const section = el.closest('section');

    return {
      attrs,
      style: el.getAttribute('style'),
      children,
      sectionId: section ? section.id : null,
      sectionClass: section ? section.className : null
    };
  });

  console.log(JSON.stringify(details, null, 2));
  await browser.close();
})();
