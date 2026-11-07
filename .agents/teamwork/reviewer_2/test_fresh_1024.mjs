import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testFresh1024() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_2/fresh_1024.png' });
  console.log('Captured fresh_1024.png');

  await browser.close();
}

testFresh1024().catch(console.error);
