import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkCasaMomo() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  try {
    await page.goto('https://casamomo.at', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(2000);

    const logoStates = [];
    for (const y of [0, 500, 1500, 3000, 5000, 7000]) {
      await page.evaluate(y => window.scrollTo(0, y), y);
      await page.waitForTimeout(600);
      const info = await page.evaluate(() => {
        const logo = document.querySelector('[data-framer-name="Logo"]');
        const style = logo ? window.getComputedStyle(logo) : null;
        const img = logo ? logo.querySelector('img') : null;
        const svg = logo ? logo.querySelector('svg') : null;
        const text = logo ? logo.querySelector('text') : null;
        return {
          scrollY: window.scrollY,
          imgSrc: img ? img.src : null,
          textFill: text ? window.getComputedStyle(text).fill : null,
          color: style ? style.color : null,
          classes: logo ? logo.className : null,
          headerBg: document.querySelector('header') ? window.getComputedStyle(document.querySelector('header')).backgroundColor : null
        };
      });
      logoStates.push(info);
    }
    console.log('Casa Momo live states:', JSON.stringify(logoStates, null, 2));
  } catch (e) {
    console.log('Error checking casamomo:', e.message);
  }

  await browser.close();
}

checkCasaMomo().catch(console.error);
