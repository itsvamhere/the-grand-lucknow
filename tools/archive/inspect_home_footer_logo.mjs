import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function inspectHomeFooterLogo() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  const data = await page.evaluate(() => {
    const logoContainer = document.querySelector('footer [data-framer-name="Footer Logo"]');
    const ul = logoContainer ? logoContainer.querySelector('ul') : null;
    const li = ul ? ul.querySelector('li') : null;
    const svgDiv = li ? li.querySelector('[data-framer-name="Footer Logo"]') : null;
    const svgEl = svgDiv ? svgDiv.querySelector('svg') : null;
    return {
      logoContainerHtml: logoContainer ? logoContainer.outerHTML.slice(0, 500) : null,
      svgDivBg: svgDiv ? window.getComputedStyle(svgDiv).backgroundImage : null,
      svgDivInnerHTML: svgDiv ? svgDiv.innerHTML : null,
      svgElHtml: svgEl ? svgEl.outerHTML : null,
      liHtml: li ? li.outerHTML : null
    };
  });
  
  console.log('Home Footer Logo Details:', JSON.stringify(data, null, 2));
  await browser.close();
}

inspectHomeFooterLogo().catch(console.error);
