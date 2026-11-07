import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testMobileMenu() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Check open-earth-lawn.html
  const pageLawn = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageLawn.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await pageLawn.waitForTimeout(1000);

  // Click mobile hamburger menu
  const menuBtnLawn = await pageLawn.$('[data-framer-name="Menu Button"], .framer-1a48cst');
  console.log('Lawn menu button found:', !!menuBtnLawn);
  if (menuBtnLawn) {
    await menuBtnLawn.click();
    await pageLawn.waitForTimeout(600);
  }
  await pageLawn.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_1/lawn_mobile_menu.png' });

  // Extract mobile nav link text and font-size
  const lawnLinks = await pageLawn.evaluate(() => {
    return Array.from(document.querySelectorAll('header .framer-fx9txd')).map(a => {
      const span = a.querySelector('span');
      const cs = span ? window.getComputedStyle(span) : null;
      return {
        href: a.getAttribute('href'),
        text: a.textContent.replace(/\s+/g, ' ').trim(),
        fontSize: cs ? cs.fontSize : null,
        rollingSpansCount: a.querySelectorAll('[data-rolling-label] span').length
      };
    });
  });

  console.log('LAWN MOBILE LINKS:', JSON.stringify(lawnLinks, null, 2));

  await browser.close();
}

testMobileMenu().catch(console.error);
