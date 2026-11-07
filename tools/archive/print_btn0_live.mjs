import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const btn0Html = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    const btn = nav ? nav.querySelector('a.framer-vO7O2') : null;
    return btn ? btn.outerHTML : 'nav btn not found';
  });

  console.log('Button 0 full HTML:');
  console.log(btn0Html);

  await browser.close();
}

main().catch(console.error);
