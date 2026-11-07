import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function compareFooters() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Subpage
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  const subData = await page.evaluate(() => {
    const f = document.querySelector('footer');
    return {
      text: f?.innerText,
      innerHTML: f?.innerHTML.slice(0, 1000),
      htmlLength: f?.innerHTML.length,
      tickerDisplay: f ? window.getComputedStyle(f.querySelector('[data-framer-name="Footer Logo"] ul') || f).display : null,
      tickerTransform: f ? window.getComputedStyle(f.querySelector('[data-framer-name="Footer Logo"] ul') || f).transform : null
    };
  });
  
  // Home
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  const homeData = await page.evaluate(() => {
    const f = document.querySelector('footer');
    return {
      text: f?.innerText,
      innerHTML: f?.innerHTML.slice(0, 1000),
      htmlLength: f?.innerHTML.length,
      tickerDisplay: f ? window.getComputedStyle(f.querySelector('[data-framer-name="Footer Logo"] ul') || f).display : null,
      tickerTransform: f ? window.getComputedStyle(f.querySelector('[data-framer-name="Footer Logo"] ul') || f).transform : null
    };
  });
  
  console.log('Subpage Footer on Live:', JSON.stringify(subData, null, 2));
  console.log('Home Footer on Live:', JSON.stringify(homeData, null, 2));
  
  await browser.close();
}

compareFooters().catch(console.error);
