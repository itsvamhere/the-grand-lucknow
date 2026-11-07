import { chromium } from 'playwright-core';
import fs from 'fs';

async function inspectHomeFooter() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  const footerInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return { error: 'No footer found' };
    const rect = footer.getBoundingClientRect();
    const logo = footer.querySelector('[data-framer-name="Footer Logo"]');
    const tickerUl = logo ? logo.querySelector('ul') : null;
    return {
      footerVisible: rect.height > 0 && rect.width > 0,
      footerRect: { width: rect.width, height: rect.height, top: rect.top },
      logoHtml: logo ? logo.innerHTML.slice(0, 500) : null,
      tickerComputedStyle: tickerUl ? {
        display: window.getComputedStyle(tickerUl).display,
        opacity: window.getComputedStyle(tickerUl).opacity,
        transform: window.getComputedStyle(tickerUl).transform,
      } : null,
      footerText: footer.innerText
    };
  });
  
  console.log('Footer Info:', JSON.stringify(footerInfo, null, 2));
  
  const footerEl = await page.$('footer');
  if (footerEl) {
    const proofDir = 'tools/proofs';
    if (!fs.existsSync(proofDir)) fs.mkdirSync(proofDir, { recursive: true });
    await footerEl.screenshot({ path: `${proofDir}/home_footer_eval.png` });
    console.log(`Saved screenshot to ${proofDir}/home_footer_eval.png`);
  }
  
  await browser.close();
}

inspectHomeFooter().catch(console.error);
