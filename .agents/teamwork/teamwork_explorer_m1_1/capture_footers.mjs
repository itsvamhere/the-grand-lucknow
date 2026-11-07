import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Home page
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const homeFooter = page.locator('footer.framer-18na9ah');
  await homeFooter.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await homeFooter.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_explorer_m1_1/proof_home_footer.png' });

  // 2. Subpage
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const subFooter = page.locator('footer.framer-18na9ah');
  await subFooter.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await subFooter.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_explorer_m1_1/proof_sub_footer.png' });

  // 3. Inspect computed styles of the ticker and links in both
  const homeStats = await page.evaluate(async () => {
    // switch to home
    return null;
  });

  await browser.close();
  console.log('Screenshots captured!');
}

main().catch(console.error);
