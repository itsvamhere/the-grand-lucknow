import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testCancelAnimation() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });

  const before = await page.evaluate(() => {
    const pill = document.querySelector('.framer-gaygr9');
    return {
      opacity: window.getComputedStyle(pill).opacity,
      animsCount: pill.getAnimations().length
    };
  });
  console.log('Before cancel:', before);

  const after = await page.evaluate(() => {
    const pill = document.querySelector('.framer-gaygr9');
    pill.getAnimations().forEach(a => a.cancel());
    return {
      opacity: window.getComputedStyle(pill).opacity,
      animsCount: pill.getAnimations().length
    };
  });
  console.log('After cancel:', after);

  await browser.close();
}

testCancelAnimation().catch(console.error);
