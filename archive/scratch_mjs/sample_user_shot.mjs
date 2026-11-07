import fs from 'fs';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function sampleImage() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  const imgPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/.user_uploaded/media_1793687731989_510f0f08.png';
  const base64 = fs.readFileSync(imgPath).toString('base64');
  const html = `
    <html><body>
    <img id="img" src="data:image/png;base64,${base64}" />
    <canvas id="c"></canvas>
    </body></html>
  `;
  await page.setContent(html);
  await page.waitForTimeout(500);

  const colors = await page.evaluate(() => {
    const img = document.getElementById('img');
    const c = document.getElementById('c');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const pBg = ctx.getImageData(5, 5, 1, 1).data;
    const textPixels = [];
    for (let x = 10; x < c.width; x += 15) {
      const p = ctx.getImageData(x, Math.floor(c.height / 2), 1, 1).data;
      textPixels.push(`rgb(${p[0]}, ${p[1]}, ${p[2]})`);
    }
    return {
      width: c.width,
      height: c.height,
      bg: `rgb(${pBg[0]}, ${pBg[1]}, ${pBg[2]})`,
      textPixels: [...new Set(textPixels)]
    };
  });

  console.log('User screenshot analysis:', colors);
  await browser.close();
}

sampleImage().catch(console.error);
