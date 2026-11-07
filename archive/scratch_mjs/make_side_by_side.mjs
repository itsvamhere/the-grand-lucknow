import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 800, height: 400 } });
  
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; background:#10231D; color:white; font-family:sans-serif; padding:20px;">
      <div style="display:flex; flex-direction:column; gap:24px;">
        <div>
          <div style="font-size:14px; margin-bottom:8px; color:#A4B29E;">1. CASA MOMO REFERENCE (from casamomo.at):</div>
          <img src="file:///C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/crop_casamomo_real_logo.png" style="border:1px solid #444; border-radius:4px;"/>
        </div>
        <div>
          <div style="font-size:14px; margin-bottom:8px; color:#A4B29E;">2. THE GRAND (Local Staging):</div>
          <img src="file:///C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/crop_scrolled_1500_logo.png" style="border:1px solid #444; border-radius:4px;"/>
        </div>
      </div>
    </body>
    </html>
  `;
  await page.setContent(html);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/side_by_side_comparison.png'
  });
  console.log('Saved side_by_side_comparison.png');
  await browser.close();
}

run();
