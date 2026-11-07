import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  // Scroll to map
  await page.evaluate(() => {
    const map = document.querySelector('#location') || document.querySelector('[data-framer-name="Location"]');
    if (map) map.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'tools/subpage_map_rendered.png' });
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'tools/subpage_footer_rendered.png' });
  
  console.log('Saved tools/subpage_map_rendered.png and tools/subpage_footer_rendered.png');
  await browser.close();
})();
