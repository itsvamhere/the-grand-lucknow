import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function check() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  for (const url of ['https://the-grand-lucknow.vercel.app/venues', 'https://the-grand-lucknow.vercel.app/about', 'https://the-grand-lucknow.vercel.app/contact']) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const info = await page.evaluate(() => {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const logoEl = document.querySelector('[data-framer-name="Logo"] text, #svg-1334768056_3843 text');
      const logoFill = logoEl ? window.getComputedStyle(logoEl).fill : null;
      const logoImg = document.querySelector('[data-framer-name="Logo"] img');
      return {
        bodyBg,
        logoFill,
        logoImgSrc: logoImg ? logoImg.src : null
      };
    });
    console.log(url, info);
  }
  await browser.close();
}

check().catch(console.error);
