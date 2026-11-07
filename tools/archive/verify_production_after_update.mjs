import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const failedRequests = [];
  const consoleErrors = [];
  page.on('requestfailed', req => failedRequests.push(req.url()));
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  console.log('Navigating to live production open-earth-lawn subpage...');
  const resp = await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  console.log('HTTP Status:', resp.status());
  
  // 1. Verify Images
  const images = await page.evaluate(() => {
    const galImgs = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.getAttribute('src'),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete
    }));
    return galImgs;
  });
  console.log('Live Images Status:', images.slice(0, 6));
  
  // Screenshot Gallery
  await page.evaluate(() => {
    const gal = document.querySelector('[data-framer-name="Gallery"]');
    if (gal) gal.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'tools/prod_live_gallery.png' });
  console.log('Saved tools/prod_live_gallery.png');
  
  // 2. Verify Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'tools/prod_live_footer_exact.png' });
  console.log('Saved tools/prod_live_footer_exact.png');
  
  const footerLive = await page.evaluate(() => {
    const f = document.querySelector('footer');
    const ul = f?.querySelector('[data-framer-name="Footer Logo"] ul');
    return {
      text: f?.innerText,
      hasOfficeEmail: f?.innerText.includes('office@thegrandlucknow.in'),
      hasPhone: f?.innerText.includes('91291 27091') || f?.innerText.includes('9129127091'),
      hasVenues: f?.innerText.includes('Venues'),
      hasApartments: f?.innerText.includes('Apartments'),
      hasCasamomo: f?.innerText.includes('casamomo'),
      hasLinkedIn: f?.innerText.includes('LinkedIn'),
      hasNexenne: f?.innerText.includes('Nexenne'),
      tickerTransform: ul ? window.getComputedStyle(ul).transform : null,
      tickerDisplay: ul ? window.getComputedStyle(ul).display : null
    };
  });
  console.log('Live Footer Verification:', footerLive);
  console.log('Failed Requests:', failedRequests.length);
  console.log('Console Errors:', consoleErrors.length);
  
  await browser.close();
  console.log('Live production verification complete!');
})();
