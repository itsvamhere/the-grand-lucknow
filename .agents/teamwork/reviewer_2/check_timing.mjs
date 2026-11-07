import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkPillTiming() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const timing = await page.evaluate(() => {
    const pill = document.querySelector('.framer-gaygr9');
    if (!pill) return null;
    return pill.getAnimations().map(a => ({
      playState: a.playState,
      currentTime: a.currentTime,
      duration: a.effect?.getTiming()?.duration,
      delay: a.effect?.getTiming()?.delay,
      endDelay: a.effect?.getTiming()?.endDelay,
      fill: a.effect?.getTiming()?.fill
    }));
  });

  console.log('Pill animation timing:', JSON.stringify(timing, null, 2));
  await browser.close();
}

checkPillTiming().catch(console.error);
