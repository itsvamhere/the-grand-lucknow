import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Visiting /venues/grassland-gala...');
  const res = await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  console.log('Status:', res.status());
  console.log('URL after goto:', page.url());

  const info = await page.evaluate(() => {
    const title = document.title;
    const h1 = document.querySelector('h1') ? document.querySelector('h1').innerText : null;
    const nav = document.querySelector('header');
    const f = document.querySelector('footer');
    return {
      title,
      h1,
      navVisible: nav ? window.getComputedStyle(nav).display !== 'none' : false,
      footerBg: f ? window.getComputedStyle(f).backgroundColor : null,
      framerZ: f && f.querySelector('.framer-zHQwT') ? window.getComputedStyle(f.querySelector('.framer-zHQwT')).backgroundColor : null
    };
  });
  console.log('Venue N2 Info:', JSON.stringify(info, null, 2));

  await page.screenshot({ path: 'tools/test_n2_desktop.png' });
  console.log('Saved tools/test_n2_desktop.png');

  await browser.close();
}

test().catch(console.error);
