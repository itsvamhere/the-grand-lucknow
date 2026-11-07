import path from 'path';
import fs from 'fs';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const brainDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566';

async function fetchLiveCasamomoFooter() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating to https://www.casamomo.at/ ...');
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: path.join(brainDir, 'live_casamomo_footer.png') });

  const footerData = await page.evaluate(() => {
    // Find all footer elements and oversized display text
    const footer = document.querySelector('footer') || document.querySelector('[data-framer-name*="Footer"]') || document.querySelector('.framer-eiqszw');
    
    // Look for giant letters "CASA MOMO" or "MO CASA"
    const all = Array.from(document.querySelectorAll('*'));
    const wordmarkEls = all.filter(el => {
      const txt = (el.innerText || '').trim();
      return (txt.includes('CASA') || txt.includes('MOMO')) && el.children.length < 5;
    }).map(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: el.className,
        text: el.innerText.trim(),
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        color: style.color,
        rect: { top: rect.top + window.scrollY, width: rect.width, height: rect.height },
        outerHTML: el.outerHTML.slice(0, 300)
      };
    });

    return {
      footerSelector: footer ? footer.className : 'not found',
      footerHTML: footer ? footer.outerHTML.slice(0, 1500) : null,
      wordmarkEls
    };
  });

  console.log('Live casamomo footer data:');
  console.dir(footerData, { depth: null });
  await browser.close();
}

fetchLiveCasamomoFooter().catch(console.error);
