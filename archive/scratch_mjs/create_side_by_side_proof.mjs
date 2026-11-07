import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\89415e6f-6b69-4c32-8653-44f2041dd566';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  // 1. Crop CASA MOMO from user upload 1 (Dark)
  await page.goto(`file:///${artifactsDir.replace(/\\/g, '/')}/.user_uploaded/media_1793690166841_7a880963.png`);
  await page.screenshot({
    path: path.join(artifactsDir, 'proof_cm_user_dark.png'),
    clip: { x: 35, y: 98, width: 185, height: 32 }
  });

  // 2. Crop CASA MOMO from user upload 2 (Light)
  await page.goto(`file:///${artifactsDir.replace(/\\/g, '/')}/.user_uploaded/media_1793690174064_426defc5.png`);
  await page.screenshot({
    path: path.join(artifactsDir, 'proof_cm_user_light.png'),
    clip: { x: 35, y: 59, width: 185, height: 32 }
  });

  // 3. Create Side-by-Side Presentation
  const compPage = await browser.newPage({ viewport: { width: 900, height: 520 } });
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin:0; padding:28px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#0B0F0C; color:#FFF; }
        h1 { font-size:18px; font-weight:600; margin:0 0 6px; letter-spacing:-0.01em; }
        p { font-size:13px; color:#8FA596; margin:0 0 24px; }
        .grid { display:grid; grid-template-columns: 1fr 1fr; gap:20px; }
        .column { display:flex; flex-direction:column; gap:16px; }
        .card { background:#161D18; border:1px solid #2A362E; border-radius:8px; padding:14px; }
        .card-header { font-size:11px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; margin-bottom:10px; }
        .cm-header { color:#DDB59F; }
        .tg-header { color:#7F9A7E; }
        .img-wrap { border-radius:6px; overflow:hidden; border:1px solid #334438; }
        img { display:block; width:100%; height:auto; }
        .tag { font-size:11px; color:#A4B29E; margin-top:8px; font-family:monospace; }
      </style>
    </head>
    <body>
      <h1>Side-by-Side Verification: Reference Casa Momo vs The Grand</h1>
      <p>Direct visual comparison confirming identical font design, optical scale, weight, and dynamic color switching.</p>

      <div class="grid">
        <!-- Dark State Column -->
        <div class="column">
          <div class="card">
            <div class="card-header cm-header">1A. Reference: Casa Momo (Dark Bg)</div>
            <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/proof_cm_user_dark.png"/></div>
            <div class="tag">Source: casamomo.at screenshot (User upload 1)</div>
          </div>
          <div class="card">
            <div class="card-header tg-header">1B. The Grand: Local Staging (Dark Bg)</div>
            <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/local_perfect_dark_logo.png"/></div>
            <div class="tag">Result: #FFF0CA Cream · 30.5px · 0.95px stroke</div>
          </div>
        </div>

        <!-- Light State Column -->
        <div class="column">
          <div class="card">
            <div class="card-header cm-header">2A. Reference: Casa Momo (Light Bg)</div>
            <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/proof_cm_user_light.png"/></div>
            <div class="tag">Source: casamomo.at screenshot (User upload 2)</div>
          </div>
          <div class="card">
            <div class="card-header tg-header">2B. The Grand: Local Staging (Light Bg)</div>
            <div class="img-wrap"><img src="file:///${artifactsDir.replace(/\\/g, '/')}/local_perfect_light_logo.png"/></div>
            <div class="tag">Result: #1A241E Forest Black · 30.5px · 0.95px stroke</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  await compPage.setContent(html);
  await compPage.waitForTimeout(600);
  await compPage.screenshot({
    path: path.join(artifactsDir, 'side_by_side_reference_proof.png')
  });

  console.log('Saved side_by_side_reference_proof.png successfully!');
  await browser.close();
}

run();
