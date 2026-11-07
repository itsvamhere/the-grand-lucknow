import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  
  const footerInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return { error: 'No footer' };
    const ticker = footer.querySelector('[data-framer-name="Footer Logo"]') || footer.querySelector('ul') || footer.querySelector('.grand-ticker-container');
    const svgDiv = footer.querySelector('.framer-xj8hz2');
    return {
      footerHeight: footer.offsetHeight,
      tickerHtml: ticker ? ticker.outerHTML.slice(0, 500) : null,
      svgDivStyle: svgDiv ? {
        width: window.getComputedStyle(svgDiv).width,
        height: window.getComputedStyle(svgDiv).height,
        bgImage: window.getComputedStyle(svgDiv).backgroundImage.slice(0, 100)
      } : null
    };
  });
  
  console.log('Home Footer Info:', JSON.stringify(footerInfo, null, 2));
  await page.screenshot({ path: 'tools/rendered_home_footer_live.png' });
  console.log('Screenshot saved to tools/rendered_home_footer_live.png');
  await browser.close();
})();
