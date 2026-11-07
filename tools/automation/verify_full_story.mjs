import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifyFullStory() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // 1. Initial State (y = 0)
  const y0 = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      opacity: window.getComputedStyle(w).opacity,
      transform: window.getComputedStyle(w).transform
    }));
    return {
      title: document.title,
      scrollY: window.scrollY,
      bg: window.getComputedStyle(document.body).backgroundColor,
      words: words.slice(0, 3)
    };
  });
  console.log('1. Initial State (y=0):', y0);

  // 2. Mid Gallery (y = 3500)
  await page.evaluate(() => { window.scrollTo(0, 3500); });
  await page.waitForTimeout(100);
  const y3500 = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      opacity: window.getComputedStyle(w).opacity,
      transform: window.getComputedStyle(w).transform
    }));
    return {
      scrollY: window.scrollY,
      bg: window.getComputedStyle(document.body).backgroundColor,
      words: words.slice(0, 3)
    };
  });
  console.log('2. Mid Gallery (y=3500):', y3500);

  // 3. Photo 6 Arrival (y = 5050)
  await page.evaluate(() => { window.scrollTo(0, 5050); });
  await page.waitForTimeout(100);
  const y5050 = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      opacity: window.getComputedStyle(w).opacity,
      transform: window.getComputedStyle(w).transform
    }));
    return {
      scrollY: window.scrollY,
      bg: window.getComputedStyle(document.body).backgroundColor,
      words: words.slice(0, 3)
    };
  });
  console.log('3. Photo 6 In View (y=5050):', y5050);

  // 4. Active Rollout & Fade (y = 5250)
  await page.evaluate(() => { window.scrollTo(0, 5250); });
  await page.waitForTimeout(100);
  const y5250 = await page.evaluate(() => {
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
  console.log('4. Rollout Active (y=5250):', y5250);

  // 5. Complete Fade & Cream Background (y = 5500)
  await page.evaluate(() => { window.scrollTo(0, 5500); });
  await page.waitForTimeout(100);
  const y5500 = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      opacity: window.getComputedStyle(w).opacity,
      transform: window.getComputedStyle(w).transform
    }));
    return {
      scrollY: window.scrollY,
      bg: window.getComputedStyle(document.body).backgroundColor,
      btnTheme: document.querySelector('[data-framer-name="Sticky Button"] a')?.getAttribute('data-framer-name'),
      words: words.slice(0, 3)
    };
  });
  console.log('5. Rollout Complete + Cream BG (y=5500):', y5500);

  // 6. Universal Footer at Bottom (y = 9500)
  await page.evaluate(() => { window.scrollTo(0, 9500); });
  await page.waitForTimeout(200);
  const footerData = await page.evaluate(() => {
    const f = document.querySelector('footer');
    return {
      exists: !!f,
      bg: f ? window.getComputedStyle(f).backgroundColor : null,
      innerBg: f?.querySelector('.framer-1aamxx2') ? window.getComputedStyle(f.querySelector('.framer-1aamxx2')).backgroundColor : null,
      logoW: f?.querySelector('.framer-xj8hz2') ? f.querySelector('.framer-xj8hz2').offsetWidth : null,
      logoH: f?.querySelector('.framer-xj8hz2') ? f.querySelector('.framer-xj8hz2').offsetHeight : null
    };
  });
  console.log('6. Universal Footer Check:', footerData);

  // Take proof screenshots for user
  await page.evaluate(() => { window.scrollTo(0, 5180); });
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_photo6_fading_in_action.png' });

  await page.evaluate(() => { window.scrollTo(0, 5400); });
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_photo6_faded_out.png' });

  await browser.close();
}

verifyFullStory().catch(console.error);
