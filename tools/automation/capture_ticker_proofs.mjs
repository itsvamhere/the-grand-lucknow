import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Home page ticker
  const pageHome = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageHome.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await pageHome.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageHome.waitForTimeout(1000);
  const homeTicker = pageHome.locator('.framer-n49p1z');
  if (await homeTicker.count() > 0) {
    await homeTicker.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_home_ticker.png' });
  }

  // 2. Lawn page ticker
  const pageLawn = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await pageLawn.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageLawn.waitForTimeout(1000);
  const lawnTicker = pageLawn.locator('.framer-n49p1z');
  if (await lawnTicker.count() > 0) {
    await lawnTicker.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_lawn_ticker.png' });
  }

  // Also let's check ticker details on home page
  const homeData = await pageHome.evaluate(() => {
    const t = document.querySelector('.framer-n49p1z');
    if (!t) return null;
    const ul = t.querySelector('ul');
    const lis = t.querySelectorAll('li');
    return {
      ulTransform: ul ? ul.style.transform : null,
      ulComputedTransform: ul ? window.getComputedStyle(ul).transform : null,
      liCount: lis.length,
      lis: Array.from(lis).map(l => ({
        className: l.className,
        width: l.getBoundingClientRect().width,
        style: l.getAttribute('style'),
        innerHTML: l.innerHTML.substring(0, 200)
      }))
    };
  });

  console.log('Home Ticker Data:', JSON.stringify(homeData, null, 2));

  await browser.close();
  console.log('Capture finished!');
})();
