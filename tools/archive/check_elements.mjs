import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  const info = await page.evaluate(() => {
    const sec = document.getElementById('locations-1');
    const imgDiv = sec?.querySelector('.framer-1esgfsu');
    const btn = sec?.querySelector('.framer-1c38j8y-container');
    const a = sec?.querySelector('a[href*="book"]');
    return {
      sec: !!sec,
      imgDiv: !!imgDiv,
      imgDivChildren: imgDiv ? imgDiv.children.length : 0,
      btn: !!btn,
      a: !!a
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

main();
