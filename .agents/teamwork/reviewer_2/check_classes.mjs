import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkClasses() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const el = document.querySelector('.framer-18mvsw1-container a');
    const cs = window.getComputedStyle(el);
    return {
      border: cs.border,
      borderTopWidth: cs.borderTopWidth,
      borderTopStyle: cs.borderTopStyle,
      borderTopColor: cs.borderTopColor
    };
  });

  console.log('Button computed border:', info);
  await browser.close();
}

checkClasses().catch(console.error);
