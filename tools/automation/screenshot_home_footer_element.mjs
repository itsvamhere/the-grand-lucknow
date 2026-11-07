import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  const footerEle = await page.$('footer');
  await footerEle.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Take screenshot of home page footer element
  await footerEle.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_home_footer_element.png' });
  console.log('Saved proof_home_footer_element.png');
  await browser.close();
})();
