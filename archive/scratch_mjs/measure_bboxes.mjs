import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function measure() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  const testHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @font-face {
        font-family: "EL PACRE Regular";
        src: url("https://framerusercontent.com/assets/borEE9veyD0zs6Cs5ThKJI0LcKU.woff2");
        font-style: normal;
        font-weight: 400;
      }
    </style>
  </head>
  <body>
    <svg id="svg1" viewBox="0 0 216.285 27" width="216.285" height="27">
      <text id="t1" x="50%" y="20.5" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="20" font-weight="400" letter-spacing="0.04em" fill="#FFF0CA">THE GRAND</text>
    </svg>
    <svg id="svg2" viewBox="0 0 1202.351 150.096" width="1202.351" height="150.096">
      <text id="t2" x="50%" y="112" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="120" font-weight="400" letter-spacing="0.04em" fill="#FFF0CA">THE GRAND</text>
    </svg>
    <svg id="svg3" viewBox="0 0 2404.809 300.206" width="2404.809" height="300.206">
      <text id="t3" x="50%" y="224" text-anchor="middle" font-family="'EL PACRE Regular', serif" font-size="240" font-weight="400" letter-spacing="0.04em" fill="#FFF0CA">THE GRAND</text>
    </svg>
  </body>
  </html>
  `;

  await page.setContent(testHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const bboxes = await page.evaluate(() => {
    const toBox = (id) => {
      const b = document.getElementById(id).getBBox();
      return { x: Math.round(b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height) };
    };
    return {
      t1: toBox('t1'),
      t2: toBox('t2'),
      t3: toBox('t3'),
    };
  });

  console.log('BBoxes:', JSON.stringify(bboxes, null, 2));
  await browser.close();
}

measure().catch(console.error);
