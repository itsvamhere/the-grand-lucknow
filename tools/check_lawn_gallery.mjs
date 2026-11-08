import { chromium } from 'playwright-core';

async function checkLawnGallery() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const galleryInfo = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayedWidth: img.clientWidth,
      displayedHeight: img.clientHeight
    }));
  });

  console.log('Images on open-earth-lawn page:', JSON.stringify(galleryInfo, null, 2));
  await browser.close();
}

checkLawnGallery().catch(console.error);
