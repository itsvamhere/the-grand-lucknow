import { chromium } from 'playwright-core';
import fs from 'fs';

async function test() {
  const svg = fs.readFileSync('tools/actual_xj8hz2.svg', 'utf8');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 2405, height: 350 } });
  
  await page.setContent(`
    <body style="margin: 0; background: #C2653A; display: flex; align-items: center; justify-content: center;">
      ${svg}
    </body>
  `);
  await page.screenshot({ path: 'tools/test_rendered_svg.png' });
  console.log('Saved tools/test_rendered_svg.png');

  await browser.close();
}

test().catch(console.error);
