import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);

  console.log('=== 1. TICKER CONTINUOUS MOTION CHECK ===');
  for (let i = 0; i < 5; i++) {
    const tInfo = await page.evaluate(() => {
      const ul = document.querySelector('.framer-n49p1z ul');
      if (!ul) return null;
      return {
        computedTransform: window.getComputedStyle(ul).transform,
        firstItemLeft: ul.querySelector('li')?.getBoundingClientRect().left
      };
    });
    console.log(`t = ${i * 500}ms:`, JSON.stringify(tInfo));
    await page.waitForTimeout(500);
  }

  console.log('\n=== 2. LINK HOVER ROLLING TEXT MOTION CHECK ===');
  const venuesLink = page.locator('footer a:has-text("Venues")').first();
  const beforeHover = await venuesLink.evaluate(el => {
    const charGroups = el.querySelectorAll('span[style*="display: inline-block; position: relative"], span[style*="display:inline-block;position:relative"]');
    return Array.from(charGroups).map(g => ({
      topSpan: g.children[1]?.style.transform,
      botSpan: g.children[2]?.style.transform
    }));
  });
  console.log('Before hover spans (first 3):', beforeHover.slice(0, 3));

  await venuesLink.hover();
  await page.waitForTimeout(300);

  const duringHover = await venuesLink.evaluate(el => {
    const charGroups = el.querySelectorAll('span[style*="display: inline-block; position: relative"], span[style*="display:inline-block;position:relative"]');
    return Array.from(charGroups).map(g => ({
      topSpan: g.children[1]?.style.transform,
      botSpan: g.children[2]?.style.transform
    }));
  });
  console.log('During hover spans (first 3):', duringHover.slice(0, 3));

  // Move mouse away
  await page.mouse.move(0, 0);
  await page.waitForTimeout(400);

  const afterLeave = await venuesLink.evaluate(el => {
    const charGroups = el.querySelectorAll('span[style*="display: inline-block; position: relative"], span[style*="display:inline-block;position:relative"]');
    return Array.from(charGroups).map(g => ({
      topSpan: g.children[1]?.style.transform,
      botSpan: g.children[2]?.style.transform
    }));
  });
  console.log('After mouse leave spans (first 3):', afterLeave.slice(0, 3));

  console.log('\n=== 3. CAPTURE VISUAL PROOFS ===');
  // Full footer screenshot
  const footerEl = page.locator('footer.framer-18na9ah');
  await footerEl.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_master_footer_full.png' });

  // Ticker screenshot
  const tickerEl = page.locator('.framer-n49p1z');
  await tickerEl.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_master_ticker.png' });

  console.log('Verification finished successfully!');
  await browser.close();
})();
