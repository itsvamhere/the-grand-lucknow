import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function compareAtWidth(w, h) {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Home
  const pageHome = await browser.newPage({ viewport: { width: w, height: h } });
  await pageHome.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await pageHome.evaluate(() => { window.scrollTo({ top: 16420, left: 0, behavior: 'instant' }); });
  await pageHome.waitForTimeout(500);

  const homeData = await pageHome.evaluate(() => {
    const f = document.querySelector('footer');
    const inner = f.querySelector('.framer-1aamxx2');
    const cols = f.querySelector('.framer-1h4yz5c');
    const logoWrap = f.querySelector('.framer-n49p1z');
    const logo = f.querySelector('.framer-xj8hz2');
    const bottomRow = f.querySelector('.framer-26ic7s')?.parentElement;
    const a = f.querySelector('a span[data-rolling-label]');
    
    return {
      footerH: f.offsetHeight,
      innerPadding: window.getComputedStyle(inner).padding,
      innerGap: window.getComputedStyle(inner).gap,
      colsH: cols?.offsetHeight,
      colsGap: window.getComputedStyle(cols).gap,
      logoW: logo?.offsetWidth,
      logoH: logo?.offsetHeight,
      logoContainerH: logoWrap?.offsetHeight,
      linkFontSize: a ? window.getComputedStyle(a).fontSize : null,
      linkLineHeight: a ? window.getComputedStyle(a).lineHeight : null,
      bottomRowPadding: bottomRow ? window.getComputedStyle(bottomRow).padding : null
    };
  });

  // 2. Subpage
  const pageLawn = await browser.newPage({ viewport: { width: w, height: h } });
  await pageLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageLawn.evaluate(() => { window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'instant' }); });
  await pageLawn.waitForTimeout(500);

  const lawnData = await pageLawn.evaluate(() => {
    const f = document.querySelector('footer');
    const inner = f.querySelector('.framer-1aamxx2');
    const cols = f.querySelector('.framer-1h4yz5c');
    const logoWrap = f.querySelector('.framer-n49p1z');
    const logo = f.querySelector('.framer-xj8hz2');
    const bottomRow = f.querySelector('.framer-26ic7s')?.parentElement;
    const a = f.querySelector('a span[data-rolling-label]');
    
    return {
      footerH: f.offsetHeight,
      innerPadding: window.getComputedStyle(inner).padding,
      innerGap: window.getComputedStyle(inner).gap,
      colsH: cols?.offsetHeight,
      colsGap: window.getComputedStyle(cols).gap,
      logoW: logo?.offsetWidth,
      logoH: logo?.offsetHeight,
      logoContainerH: logoWrap?.offsetHeight,
      linkFontSize: a ? window.getComputedStyle(a).fontSize : null,
      linkLineHeight: a ? window.getComputedStyle(a).lineHeight : null,
      bottomRowPadding: bottomRow ? window.getComputedStyle(bottomRow).padding : null
    };
  });

  console.log(`\n=== COMPARISON AT ${w}x${h} ===`);
  console.log('HOME:', JSON.stringify(homeData, null, 2));
  console.log('LAWN:', JSON.stringify(lawnData, null, 2));

  await browser.close();
}

(async () => {
  await compareAtWidth(1440, 900);
  await compareAtWidth(1024, 768);
})();
