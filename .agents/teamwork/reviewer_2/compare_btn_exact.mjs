import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function compareBtn() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const pIndex = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pLawn = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await pIndex.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await pLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const getBtnProps = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const span = el.querySelector('[data-rolling-label]');
    const spanCs = span ? window.getComputedStyle(span) : null;
    return {
      rect: { width: rect.width, height: rect.height },
      cs: {
        bg: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        padding: cs.padding,
        display: cs.display,
        alignItems: cs.alignItems,
        justifyContent: cs.justifyContent,
        gap: cs.gap,
        fontSize: spanCs ? spanCs.fontSize : cs.fontSize,
        lineHeight: spanCs ? spanCs.lineHeight : cs.lineHeight,
        fontFamily: spanCs ? spanCs.fontFamily : cs.fontFamily,
      },
      html: el.outerHTML
    };
  };

  const idxBtn = await pIndex.evaluate(getBtnProps, '.framer-18mvsw1-container a');
  const lawnBtn = await pLawn.evaluate(getBtnProps, '.framer-18mvsw1-container a');

  console.log('Index button:', JSON.stringify(idxBtn, null, 2));
  console.log('Lawn button:', JSON.stringify(lawnBtn, null, 2));

  await browser.close();
}

compareBtn().catch(console.error);
