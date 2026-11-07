import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Use Lenis scroll if available or scroll down
  await page.evaluate(() => {
    if (window.lenis) {
      window.lenis.scrollTo('bottom', { immediate: true });
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_explorer_m1_1/proof_home_viewport_bottom.png' });

  // Get scroll position
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log('ScrollY after scroll:', scrollY);

  await browser.close();
}

main().catch(console.error);
