import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testFooterBoth() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop
  const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesk.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await pageDesk.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageDesk.waitForTimeout(1500);
  await pageDesk.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\test_footer_desktop.png' });
  await pageDesk.close();

  // 2. Mobile (iPhone 14 viewport: 390x844)
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await pageMobile.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await pageMobile.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageMobile.waitForTimeout(1500);
  await pageMobile.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\test_footer_mobile.png' });
  await pageMobile.close();

  console.log('Saved desktop and mobile footer screenshots.');
  await browser.close();
}

testFooterBoth().catch(console.error);
