import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';
import fs from 'fs';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566";

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 24px; background: #111; color: #eee; font-family: sans-serif; }
    h1 { font-size: 20px; margin-bottom: 8px; color: #fff; }
    p { margin-top: 0; color: #888; font-size: 13px; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: 1fr; gap: 32px; max-width: 1440px; margin: 0 auto; }
    .card { background: #1c1c1c; border: 1px solid #333; border-radius: 8px; overflow: hidden; }
    .card-header { padding: 12px 16px; background: #242424; font-weight: 600; font-size: 14px; border-bottom: 1px solid #333; }
    .card-img { width: 100%; display: block; }
  </style>
</head>
<body>
  <h1>Localhost:3003 — "THE GRAND" Oversized Footer Vector Verification</h1>
  <p>Outlined vector typography scaled to exact viewBox="0 0 2404.809 300.206" (Desktop) & viewBox="0 0 1202.351 150.096" (Mobile) matching CASA MOMO's EL PACRE Regular ticker geometry.</p>
  
  <div class="grid">
    <div class="card">
      <div class="card-header">1. Desktop Footer View (1440px) — Smooth Ticker with "THE GRAND" Vector Outline</div>
      <img class="card-img" src="localhost_the_grand_footer_desktop.png">
    </div>
    
    <div class="card" style="max-width: 450px;">
      <div class="card-header">2. Mobile Footer View (390px iPhone) — Responsive Vector Scaling</div>
      <img class="card-img" src="localhost_the_grand_footer_mobile.png">
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(artifactsDir, "footer_the_grand_comp.html"), html);

async function captureComp() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1480, height: 1800 } });
  await page.goto('file:///' + path.join(artifactsDir, "footer_the_grand_comp.html").replace(/\\/g, '/'));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactsDir, "localhost_the_grand_footer_comparison.png"), fullPage: true });
  await browser.close();
  console.log('Composite proof saved!');
}

captureComp().catch(console.error);
