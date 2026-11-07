import fs from 'fs';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function compareShots() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });

  const refPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/.user_uploaded/media_1793688950883_91597112.png';
  const ourPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/.user_uploaded/media_1793688947732_9ff433f1.png';

  const refB64 = fs.readFileSync(refPath).toString('base64');
  const ourB64 = fs.readFileSync(ourPath).toString('base64');

  const html = `
    <html>
    <body style="background: #222; color: #fff; font-family: sans-serif; padding: 20px;">
      <h2>Reference (Casa Momo)</h2>
      <img id="ref" src="data:image/png;base64,${refB64}" style="width: 100%; border: 1px solid #444;" />
      <h2>Our Site (The Grand Lucknow)</h2>
      <img id="our" src="data:image/png;base64,${ourB64}" style="width: 100%; border: 1px solid #444;" />
      <canvas id="c"></canvas>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(1000);

  // Measure the bounding box of the logo in reference image vs our image
  const analysis = await page.evaluate(async () => {
    function findLogoBounds(imgId) {
      const img = document.getElementById(imgId);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Search in top-left region: x: 0 to 400, y: 0 to 180
      const imgData = ctx.getImageData(0, 0, Math.min(canvas.width, 500), Math.min(canvas.height, 200));
      const d = imgData.data;

      // Find non-background pixels (dark pixels < 50 rgb)
      let minX = 9999, maxX = 0, minY = 9999, maxY = 0, count = 0;
      for (let y = 10; y < imgData.height; y++) {
        for (let x = 10; x < imgData.width; x++) {
          const idx = (y * imgData.width + x) * 4;
          const r = d[idx], g = d[idx+1], b = d[idx+2];
          // If dark pixel (logo text)
          if (r < 60 && g < 60 && b < 60) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            count++;
          }
        }
      }
      return {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        box: { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY },
        darkPixelCount: count
      };
    }

    return {
      reference: findLogoBounds('ref'),
      ours: findLogoBounds('our')
    };
  });

  console.log('Logo Bounds Comparison:', JSON.stringify(analysis, null, 2));

  await browser.close();
}

compareShots().catch(console.error);
