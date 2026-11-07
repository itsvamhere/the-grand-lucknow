import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3003/venues/casamomo_boutique_n1_original.html', { waitUntil: 'load' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/original_mobile_y0.png' });

  const originalHeader = await page.evaluate(() => {
    const header = document.querySelector('header');
    return {
      html: header ? header.outerHTML.slice(0, 500) : null,
      rect: header ? header.getBoundingClientRect() : null,
      visibleText: header ? header.innerText : ''
    };
  });
  console.log('Original header:', originalHeader);

  await browser.close();
}

main().catch(console.error);
