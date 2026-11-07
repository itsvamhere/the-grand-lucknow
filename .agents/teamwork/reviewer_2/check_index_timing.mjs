import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkIndexNavTiming() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'load' });

  const timing = await page.evaluate(() => {
    const nav = document.querySelector('header nav, [data-framer-name="Navigation"]');
    if (!nav) return 'No nav found';
    const anims = nav.getAnimations ? nav.getAnimations().map(a => ({
      duration: a.effect?.getTiming()?.duration,
      delay: a.effect?.getTiming()?.delay,
      op: window.getComputedStyle(nav).opacity
    })) : [];
    return {
      navOpacity: window.getComputedStyle(nav).opacity,
      anims
    };
  });

  console.log('Index nav timing at t=0 load:', JSON.stringify(timing, null, 2));
  await browser.close();
}

checkIndexNavTiming().catch(console.error);
