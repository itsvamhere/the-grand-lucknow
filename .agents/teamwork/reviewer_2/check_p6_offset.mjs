import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkP6Offset() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    return {
      p6OffsetTop: p6?.offsetTop,
      p6ParentOffsetTop: p6?.parentElement?.offsetTop,
      secOffsetHeight: sec?.offsetHeight,
      vh: window.innerHeight,
      scrollMax: (sec?.offsetHeight || 8000) - window.innerHeight
    };
  });

  console.log('P6 offset data at 1366x768:', data);

  // Check at 1024x768
  await page.setViewportSize({ width: 1024, height: 768 });
  const data1024 = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    return {
      p6OffsetTop: p6?.offsetTop,
      secOffsetHeight: sec?.offsetHeight,
      vh: window.innerHeight,
      scrollMax: (sec?.offsetHeight || 8000) - window.innerHeight
    };
  });
  console.log('P6 offset data at 1024x768:', data1024);

  // Check at 390x844 (mobile)
  await page.setViewportSize({ width: 390, height: 844 });
  const dataMobile = await page.evaluate(() => {
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
    return {
      p6OffsetTop: p6?.offsetTop,
      secOffsetHeight: sec?.offsetHeight,
      vh: window.innerHeight,
      scrollMax: (sec?.offsetHeight || 8000) - window.innerHeight
    };
  });
  console.log('P6 offset data at 390x844:', dataMobile);

  await browser.close();
}

checkP6Offset().catch(console.error);
