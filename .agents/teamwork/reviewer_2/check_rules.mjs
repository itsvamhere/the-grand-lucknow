import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkEveryRule() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const rules = await page.evaluate(() => {
    const el = document.querySelector('.framer-18mvsw1-container a');
    const matched = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      try {
        for (let j = 0; j < sheet.cssRules.length; j++) {
          const rule = sheet.cssRules[j];
          if (rule.selectorText && el.matches(rule.selectorText)) {
            matched.push({
              sheetId: sheet.ownerNode?.id || `sheet_${i}`,
              selector: rule.selectorText,
              cssText: rule.cssText
            });
          }
        }
      } catch (e) {}
    }
    return matched;
  });

  console.log('Matched rules count:', rules.length);
  rules.filter(r => r.cssText.includes('border')).forEach(r => console.log(r));
  await browser.close();
}

checkEveryRule().catch(console.error);
