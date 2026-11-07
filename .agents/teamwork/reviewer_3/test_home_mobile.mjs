import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'load' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/home_mobile_y0.png' });

  const homeHeader = await page.evaluate(() => {
    const header = document.querySelector('header');
    return {
      html: header ? header.outerHTML.slice(0, 500) : null,
      rect: header ? header.getBoundingClientRect() : null
    };
  });
  console.log('Home header:', homeHeader);

  await browser.close();
}

main().catch(console.error);
