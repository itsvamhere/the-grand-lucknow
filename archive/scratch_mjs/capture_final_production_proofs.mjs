import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';
const URL = 'https://the-grand-lucknow.vercel.app';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  console.log('1. Loading Home page...');
  await page.goto(URL + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_final_mobile_01_hero.png') });
  console.log('Captured v_final_mobile_01_hero.png');

  console.log('2. Scrolling to cards...');
  await page.evaluate(() => {
    const card = document.querySelector('a.framer-prpyo3');
    if (card) card.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_final_mobile_02_card1.png') });
  console.log('Captured v_final_mobile_02_card1.png');

  console.log('3. Scrolling to Card 3 (Ballroom)...');
  await page.evaluate(() => {
    const cards = document.querySelectorAll('a.framer-prpyo3');
    if (cards[2]) cards[2].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_final_mobile_03_card3_ballroom.png') });
  console.log('Captured v_final_mobile_03_card3_ballroom.png');

  console.log('4. Scrolling to footer marquee...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'v_final_mobile_04_footer.png') });
  console.log('Captured v_final_mobile_04_footer.png');

  await browser.close();
  console.log('All final production mobile proofs captured!');
}

main().catch(console.error);
