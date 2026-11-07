import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const WORK_DIR = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_reviewer_m1_it2_2';

async function captureMapsBtn() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const btn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Open in Maps'));
  });

  if (btn) {
    const el = btn.asElement();
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(WORK_DIR, 'proof_maps_btn.png') });
    }
  }
  await browser.close();
}

captureMapsBtn().catch(console.error);
