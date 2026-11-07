import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifyLiveVercel() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // 1. Initial State
  const initial = await page.evaluate(() => {
    return {
      title: document.title,
      bg: window.getComputedStyle(document.body).backgroundColor
    };
  });
  console.log('Live initial:', initial);

  // 2. Scroll to rollout range (y = 5250)
  await page.evaluate(() => { window.scrollTo(0, 5250); });
  await page.waitForTimeout(100);
  const rollout = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      opacity: window.getComputedStyle(w).opacity,
      transform: window.getComputedStyle(w).transform
    }));
    return {
      scrollY: window.scrollY,
      words: words.slice(0, 3)
    };
  });
  console.log('Live rollout at 5250:', rollout);

  // 3. Scroll to complete rollout + cream (y = 5500)
  await page.evaluate(() => { window.scrollTo(0, 5500); });
  await page.waitForTimeout(100);
  const cream = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      opacity: window.getComputedStyle(w).opacity
    }));
    return {
      scrollY: window.scrollY,
      bg: window.getComputedStyle(document.body).backgroundColor,
      words: words.slice(0, 3)
    };
  });
  console.log('Live rollout complete at 5500:', cream);

  // 4. Footer check at bottom
  await page.evaluate(() => { window.scrollTo(0, 9500); });
  await page.waitForTimeout(200);
  const footer = await page.evaluate(() => {
    const f = document.querySelector('footer');
    return {
      exists: !!f,
      bg: f ? window.getComputedStyle(f).backgroundColor : null,
      innerBg: f?.querySelector('.framer-1aamxx2') ? window.getComputedStyle(f.querySelector('.framer-1aamxx2')).backgroundColor : null
    };
  });
  console.log('Live footer:', footer);

  await browser.close();
}

verifyLiveVercel().catch(console.error);
