import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectBigFooterText() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const bigTexts = await page.evaluate(() => {
    const footer = document.querySelector('footer, [data-framer-name="Footer"]');
    if (!footer) return [];
    const res = [];
    footer.querySelectorAll('*').forEach(el => {
      const fs = parseFloat(window.getComputedStyle(el).fontSize);
      if (fs > 50 && el.innerText && el.innerText.trim()) {
        const rect = el.getBoundingClientRect();
        res.push({
          tag: el.tagName,
          cls: el.className,
          text: el.innerText.trim(),
          fs,
          fontFamily: window.getComputedStyle(el).fontFamily,
          top: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
          outerHTML: el.outerHTML.slice(0, 400)
        });
      }
    });
    return res;
  });

  console.log('Big texts in casamomo.at footer:');
  console.dir(bigTexts, { depth: null });
  await browser.close();
}

inspectBigFooterText().catch(console.error);
