import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifySubpage() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const failedRequests = [];
  const consoleErrors = [];
  page.on('requestfailed', req => failedRequests.push(req.url()));
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  
  // 1. Verify images
  const images = await page.evaluate(() => {
    const galImgs = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.getAttribute('src'),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }));
    return galImgs;
  });
  console.log('Images loaded:', images);
  
  // 2. Screenshot hero & gallery
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'tools/subpage_hero_verified.png' });
  
  await page.evaluate(() => {
    const gal = document.querySelector('[data-framer-name="Gallery"]');
    if (gal) gal.scrollIntoView();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'tools/subpage_gallery_verified.png' });
  
  // 3. Verify footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  const footerData = await page.evaluate(() => {
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
  console.log('Footer Verification:', footerData);
  
  await page.screenshot({ path: 'tools/subpage_footer_verified.png' });
  console.log('Saved tools/subpage_footer_verified.png');
  
  console.log('Failed requests:', failedRequests.length);
  console.log('Console errors:', consoleErrors.length);
  
  await browser.close();
}

verifySubpage().catch(console.error);
