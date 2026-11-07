import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkPillOpacity() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const pill = document.querySelector('.framer-gaygr9');
    if (!pill) return null;
    const anims = pill.getAnimations ? pill.getAnimations().map(a => ({
      playState: a.playState,
      currentTime: a.currentTime,
      effect: a.effect ? a.effect.getKeyframes() : null
    })) : [];
    
    const inlineStyle = pill.getAttribute('style');
    const cs = window.getComputedStyle(pill);

    // Also check parent animations
    let p = pill.parentElement;
    const pAnims = [];
    while (p && p !== document.body) {
      if (p.getAnimations && p.getAnimations().length > 0) {
        pAnims.push({
          tag: p.tagName,
          class: p.className,
          anims: p.getAnimations().map(a => ({ playState: a.playState, kf: a.effect?.getKeyframes() }))
        });
      }
      p = p.parentElement;
    }

    return {
      inlineStyle,
      computedOpacity: cs.opacity,
      anims,
      pAnims
    };
  });

  console.log('Pill opacity info at 1440:', JSON.stringify(info, null, 2));

  // Check on index.html too!
  const pIndex = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pIndex.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  const indexInfo = await pIndex.evaluate(() => {
    const pill = document.querySelector('.framer-gaygr9');
    if (!pill) return null;
    return {
      inlineStyle: pill.getAttribute('style'),
      computedOpacity: window.getComputedStyle(pill).opacity
    };
  });
  console.log('Index pill info at 1440:', JSON.stringify(indexInfo, null, 2));

  await browser.close();
}

checkPillOpacity().catch(console.error);
