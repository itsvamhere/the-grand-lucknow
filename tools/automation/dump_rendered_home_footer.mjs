import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Scroll to bottom so footer is fully in view and hydrated
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);

  // Extract footer outerHTML
  const footerHtml = await page.evaluate(() => {
    const f = document.querySelector('footer');
    return f ? f.outerHTML : null;
  });

  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/rendered_home_footer.html', footerHtml, 'utf8');
  console.log('Saved rendered_home_footer.html, length:', footerHtml.length);
  await browser.close();
})();
