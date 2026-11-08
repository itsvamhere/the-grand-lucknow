import { chromium } from 'playwright-core';
import fs from 'fs';

async function test() {
  const svg = fs.readFileSync('tools/authentic_grand_svg.svg', 'utf8');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 350 } });
  
  await page.setContent(`
    <body style="margin: 0; background: #C2653A; display: flex; align-items: center; justify-content: center; height: 100vh;">
      <div style="width: 1202px; height: 150px;">
        ${svg.replace('<svg ', '<svg fill="#FFF0CA" style="width:100%;height:100%;" ')}
      </div>
    </body>
  `);
  await page.screenshot({ path: 'tools/rendered_authentic_grand_svg.png' });
  console.log('Saved tools/rendered_authentic_grand_svg.png');

  await browser.close();
}

test().catch(console.error);
