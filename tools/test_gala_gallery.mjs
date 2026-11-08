import { chromium } from 'playwright-core';

async function testGallery() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });

  // Scroll to gallery
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'tools/gala_gallery_1.png' });

  await page.evaluate(() => window.scrollTo(0, 3200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'tools/gala_gallery_2.png' });

  console.log('Saved gallery screenshots');
  await browser.close();
}

testGallery().catch(console.error);
