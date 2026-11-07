import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function diagnose() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const el = document.querySelector('.framer-18mvsw1-container');
    if (!el) return 'No element';
    const cs = window.getComputedStyle(el);
    
    // Find all matching CSS rules
    const matched = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && el.matches(rule.selectorText)) {
            matched.push({ selector: rule.selectorText, cssText: rule.cssText });
          }
        }
      } catch (e) {}
    }

    return {
      computedOpacity: cs.opacity,
      currentInlineStyle: el.getAttribute('style'),
      matched
    };
  });

  console.log('Result:', JSON.stringify(res, null, 2));
  await browser.close();
}

diagnose().catch(console.error);
