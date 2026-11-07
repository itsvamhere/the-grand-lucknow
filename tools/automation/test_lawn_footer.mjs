import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Take screenshot of footer
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_lawn_new_footer.png' });

  const footerState = await page.evaluate(() => {
    const f = document.querySelector('footer');
    if (!f) return { error: 'no footer' };
    const r = f.getBoundingClientRect();
    const cs = window.getComputedStyle(f);
    return {
      rect: r,
      bg: cs.backgroundColor,
      textPreview: f.innerText.slice(0, 300).replace(/\n/g, ' ')
    };
  });

  console.log(JSON.stringify(footerState, null, 2));
  await browser.close();
})();
