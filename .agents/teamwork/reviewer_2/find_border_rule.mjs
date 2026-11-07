import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkBorderOrigin() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const el = document.querySelector('.framer-18mvsw1-container a');
    const matchedRules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && el.matches(rule.selectorText)) {
            if (rule.style.border || rule.style.borderWidth) {
              matchedRules.push({
                selector: rule.selectorText,
                border: rule.style.border,
                borderWidth: rule.style.borderWidth,
                borderColor: rule.style.borderColor,
                sheetId: sheet.ownerNode ? sheet.ownerNode.id : null
              });
            }
          }
        }
      } catch (e) {}
    }
    return matchedRules;
  });

  console.log('Rules matching border:', JSON.stringify(info, null, 2));
  await browser.close();
}

checkBorderOrigin().catch(console.error);
