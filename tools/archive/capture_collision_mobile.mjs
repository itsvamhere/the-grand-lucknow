import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const b = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await b.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const p = await context.newPage();
  await p.goto('http://localhost:3003/venues/open-earth-lawn');
  
  // Scroll to exact collision position
  await p.evaluate(() => {
    window.scrollTo(0, 4133);
  });
  await p.waitForTimeout(400);
  
  await p.screenshot({ path: 'tools/proofs_challenger/collision_proof_mobile_375px.png' });
  console.log('Saved collision_proof_mobile_375px.png');
  await b.close();
}

main();
