import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkDiff() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const pIndex = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pLawn = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await pIndex.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await pLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const getDetails = (sel) => {
    const a = document.querySelector(sel);
    const cs = window.getComputedStyle(a);
    const textSpan = a.querySelector('[data-rolling-label]');
    const tcs = textSpan ? window.getComputedStyle(textSpan) : null;
    return {
      padding: cs.padding,
      border: cs.border,
      margin: cs.margin,
      fontSize: tcs?.fontSize,
      lineHeight: tcs?.lineHeight,
      fontFamily: tcs?.fontFamily,
      boxSizing: cs.boxSizing,
      height: cs.height,
      innerSpanHeight: textSpan?.offsetHeight
    };
  };

  const dIndex = await pIndex.evaluate(getDetails, '.framer-1t6aeyj-container a');
  const dLawn = await pLawn.evaluate(getDetails, '.framer-18mvsw1-container a');

  console.log('Index details:', dIndex);
  console.log('Lawn details:', dLawn);

  await browser.close();
}

checkDiff().catch(console.error);
