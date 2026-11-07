import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkFooterLogo() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    const el = document.querySelector('.framer-1tj8hz2');
    if (!el) return 'Not found';
    const rect = el.getBoundingClientRect();
    const svg = el.querySelector('svg');
    const use = svg ? svg.querySelector('use') : null;
    const tpl = document.getElementById('svg870196829_4253');
    return {
      elRect: { width: rect.width, height: rect.height, left: rect.left, right: rect.right },
      svgRect: svg ? svg.getBoundingClientRect() : null,
      useHref: use ? use.getAttribute('href') : null,
      tplHtml: tpl ? tpl.outerHTML : null,
      parentWidth: el.parentElement ? el.parentElement.clientWidth : null
    };
  });

  console.log('Footer Logo Info:', JSON.stringify(info, null, 2));

  // Also take screenshot of exact footer logo
  const shot = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_footer_debug.png';
  await page.screenshot({ path: shot });
  console.log('Screenshot saved to', shot);

  await browser.close();
}

checkFooterLogo().catch(console.error);
