import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll to footer element
  const footerElement = await page.$('footer');
  await footerElement.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Take screenshot of only the footer element
  await footerElement.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_footer_element_only.png' });
  console.log('Saved proof_footer_element_only.png');
  await browser.close();
})();
