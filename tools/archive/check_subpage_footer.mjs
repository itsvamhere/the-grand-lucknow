import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkSubpageFooter() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
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
      tickerComputedStyle: tickerUl ? {
        display: window.getComputedStyle(tickerUl).display,
        opacity: window.getComputedStyle(tickerUl).opacity,
        transform: window.getComputedStyle(tickerUl).transform,
      } : null,
      footerText: footer.innerText
    };
  });
  
  console.log('Subpage Footer Info:', JSON.stringify(footerInfo, null, 2));
  
  await page.screenshot({ path: 'tools/subpage_footer_current.png', fullPage: false });
  console.log('Saved tools/subpage_footer_current.png');
  
  await browser.close();
}

checkSubpageFooter().catch(console.error);
