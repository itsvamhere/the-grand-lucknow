import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'tools/home_footer_rendered.png' });
  console.log('Saved tools/home_footer_rendered.png');
  await browser.close();
})();
