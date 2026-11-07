import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1600px;
    height: 1000px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: #e5e3df;
    position: relative;
  }
  /* Google Maps Roads and Land */
  .map-canvas {
    width: 100%;
    height: 100%;
    position: relative;
    background: #e8ecdc; /* Natural terrain tone in Google Maps */
  }
  
  /* Green areas / parks / estates */
  .park-1 {
    position: absolute;
    top: 15%;
    left: 20%;
    width: 480px;
    height: 380px;
    background: #d2f1d2;
    border-radius: 40px 180px 70px 120px;
    opacity: 0.85;
  }
  .park-2 {
    position: absolute;
    bottom: 10%;
    right: 15%;
    width: 520px;
    height: 320px;
    background: #d8f5d8;
    border-radius: 90px 40px 140px 60px;
    opacity: 0.8;
  }
  .water-body {
    position: absolute;
    top: -50px;
    right: -100px;
    width: 450px;
    height: 350px;
    background: #aadaff;
    border-radius: 120px 40px 180px 220px;
    opacity: 0.9;
  }

  /* Roads */
  svg.roads {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* Road Labels */
  .road-label {
    position: absolute;
    font-size: 13px;
    font-weight: 500;
    color: #5f6368;
    background: rgba(255, 255, 255, 0.7);
    padding: 1px 6px;
    border-radius: 3px;
    letter-spacing: 0.2px;
  }
  .label-nh30 {
    top: 510px;
    left: 480px;
    transform: rotate(-18deg);
    font-weight: 600;
    color: #e37400;
    background: #fff;
    border: 1px solid #f9ab00;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  .label-shaheed {
    top: 280px;
    left: 780px;
    transform: rotate(32deg);
    font-weight: 600;
    color: #1a73e8;
    background: #fff;
    border: 1px solid #aecbfa;
  }

  /* Google Maps Search Card (Top Left) */
  .search-card {
    position: absolute;
    top: 24px;
    left: 24px;
    width: 392px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 14px;
    z-index: 10;
  }
  .search-icon {
    color: #5f6368;
  }
  .search-text {
    flex: 1;
    font-size: 15px;
    color: #202124;
    font-weight: 400;
  }
  .search-mic, .search-btn {
    color: #5f6368;
  }

  /* Google Maps POI Pin for The Grand */
  .poi-marker {
    position: absolute;
    top: 430px;
    left: 790px;
    transform: translate(-50%, -100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 20;
    cursor: pointer;
  }
  .pin-svg {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.35));
  }

  /* POI Label Box */
  .poi-card {
    position: absolute;
    top: 440px;
    left: 815px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06);
    padding: 16px 20px;
    width: 340px;
    z-index: 25;
  }
  .poi-title {
    font-size: 18px;
    font-weight: 600;
    color: #202124;
    line-height: 1.25;
    margin-bottom: 4px;
  }
  .poi-sub {
    font-size: 13px;
    color: #5f6368;
    margin-bottom: 6px;
  }
  .poi-rating {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #e37400;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .poi-stars {
    color: #fbbc04;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .poi-reviews {
    color: #70757a;
    font-weight: 400;
  }
  .poi-address {
    font-size: 12px;
    color: #3c4043;
    line-height: 1.4;
    border-top: 1px solid #f1f3f4;
    padding-top: 8px;
    margin-top: 4px;
  }
  .directions-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    background: #1a73e8;
    color: #ffffff;
    padding: 7px 16px;
    border-radius: 18px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  /* Nearby Landmarks */
  .landmark {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: #444746;
    background: rgba(255,255,255,0.85);
    padding: 2px 7px;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  .lm-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  /* Google Brand Logo at bottom left */
  .google-logo {
    position: absolute;
    bottom: 16px;
    left: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #5f6368;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    z-index: 10;
  }
  .google-logo span:nth-child(1) { color: #4285F4; }
  .google-logo span:nth-child(2) { color: #EA4335; }
  .google-logo span:nth-child(3) { color: #FBBC05; }
  .google-logo span:nth-child(4) { color: #4285F4; }
  .google-logo span:nth-child(5) { color: #34A853; }
  .google-logo span:nth-child(6) { color: #EA4335; }

  /* Map Controls Bottom Right */
  .map-controls {
    position: absolute;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 10;
  }
  .ctrl-box {
    width: 40px;
    height: 40px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #5f6368;
    font-weight: 300;
  }
</style>
</head>
<body>
<div class="map-canvas">
  <div class="park-1"></div>
  <div class="park-2"></div>
  <div class="water-body"></div>

  <!-- Vector Roads Network -->
  <svg class="roads" xmlns="http://www.w3.org/2000/svg">
    <!-- Local streets -->
    <path d="M-100 200 L1700 280" stroke="#ffffff" stroke-width="8" fill="none"/>
    <path d="M-100 350 L1700 420" stroke="#ffffff" stroke-width="8" fill="none"/>
    <path d="M-100 650 L1700 700" stroke="#ffffff" stroke-width="9" fill="none"/>
    <path d="M-100 820 L1700 880" stroke="#ffffff" stroke-width="7" fill="none"/>
    
    <path d="M300 -100 L250 1100" stroke="#ffffff" stroke-width="8" fill="none"/>
    <path d="M600 -100 L580 1100" stroke="#ffffff" stroke-width="8" fill="none"/>
    <path d="M1100 -100 L1150 1100" stroke="#ffffff" stroke-width="9" fill="none"/>
    <path d="M1400 -100 L1380 1100" stroke="#ffffff" stroke-width="8" fill="none"/>

    <!-- Amar Shaheed Path (Major Arterial Blue/Gold Highway) -->
    <path d="M400 -50 C700 250, 850 450, 1200 1050" stroke="#f9ab00" stroke-width="16" fill="none"/>
    <path d="M400 -50 C700 250, 850 450, 1200 1050" stroke="#ffe082" stroke-width="12" fill="none"/>

    <!-- Raibareli Road (NH 30) - Orange Arterial Highway passing Bindaua -->
    <path d="M-50 680 C350 600, 750 450, 1650 320" stroke="#e37400" stroke-width="22" fill="none"/>
    <path d="M-50 680 C350 600, 750 450, 1650 320" stroke="#f9ab00" stroke-width="16" fill="none"/>
    <path d="M-50 680 C350 600, 750 450, 1650 320" stroke="#fff8e1" stroke-width="4" stroke-dasharray="14 10" fill="none"/>

    <!-- Connector to Estate entrance -->
    <path d="M740 452 L790 430" stroke="#ffffff" stroke-width="12" fill="none"/>
    <circle cx="790" cy="430" r="10" fill="#ffffff"/>
  </svg>

  <!-- Road badges -->
  <div class="road-label label-nh30">Raibareli Rd • NH 30</div>
  <div class="road-label label-shaheed">Amar Shaheed Path</div>

  <!-- Other Areas on Map -->
  <div class="landmark" style="top: 220px; left: 450px;">
    <div class="lm-circle" style="background: #34a853;"></div>
    <span>Gomti Greens</span>
  </div>
  <div class="landmark" style="top: 590px; left: 520px;">
    <div class="lm-circle" style="background: #1a73e8;"></div>
    <span>Bindaua Junction</span>
  </div>
  <div class="landmark" style="top: 360px; left: 1220px;">
    <div class="lm-circle" style="background: #fbbc04;"></div>
    <span>Mohanlalganj Road</span>
  </div>
  <div class="landmark" style="top: 180px; left: 950px;">
    <div class="lm-circle" style="background: #ea4335;"></div>
    <span>Gomti Nagar Extension</span>
  </div>

  <!-- Search Bar Card (Google Maps UI) -->
  <div class="search-card">
    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
    <div class="search-text">The Grand, Raibareli Rd, Lucknow</div>
    <svg class="search-btn" width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>

  <!-- The Iconic Google Red Pin Marker -->
  <div class="poi-marker">
    <svg class="pin-svg" width="44" height="60" viewBox="0 0 36 50">
      <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 32 18 32s18-18.5 18-32C36 8.06 27.94 0 18 0z" fill="#EA4335"/>
      <circle cx="18" cy="18" r="8" fill="#ffffff"/>
      <circle cx="18" cy="18" r="4" fill="#B31412"/>
    </svg>
  </div>

  <!-- The Grand Info Popup Card -->
  <div class="poi-card">
    <div class="poi-title">The Grand</div>
    <div class="poi-sub">Luxury Banquet & Celebration Estate</div>
    <div class="poi-rating">
      <span>4.9</span>
      <span class="poi-stars">★★★★★</span>
      <span class="poi-reviews">(1,248)</span>
    </div>
    <div class="poi-address">
      📍 22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301<br>
      📞 +91 91291 27091 • Open 24 Hours
    </div>
    <div class="directions-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.43 10.59l-9.01-9.01c-.75-.75-2.07-.75-2.83 0l-9 9c-.78.78-.78 2.04 0 2.83l9 9c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l9.01-9.01c.79-.78.79-2.05.01-2.81zM12 20.17L3.83 12 12 3.83 20.17 12 12 20.17zm1-6.17h-2v-3.17l-2.59 2.58L7 12l5-5 5 5-1.41 1.41L13 10.83V14z"/>
      </svg>
      Directions
    </div>
  </div>

  <!-- Google Watermark -->
  <div class="google-logo">
    <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
  </div>

  <!-- Google Map Controls -->
  <div class="map-controls">
    <div class="ctrl-box" style="color: #ea4335; font-size: 16px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
      </svg>
    </div>
    <div class="ctrl-box">+</div>
    <div class="ctrl-box" style="margin-top: -6px;">−</div>
  </div>
</div>
</body>
</html>`;

const tempHtml = path.join(projectDir, 'temp_google_map.html');
fs.writeFileSync(tempHtml, htmlTemplate, 'utf-8');

async function render() {
  console.log('Rendering normal Google Maps cutout with Playwright...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto('file:///' + tempHtml.replace(/\\\\/g, '/'));
  await page.waitForTimeout(500);

  const outPathWebp = path.join(projectDir, 'images/map_cutout.webp');
  const outPathPng = path.join(projectDir, 'images/map_cutout.png');
  const outPathGoogle = path.join(projectDir, 'images/google_maps_lucknow.webp');

  await page.screenshot({ path: outPathWebp, type: 'png' });
  await page.screenshot({ path: outPathPng, type: 'png' });
  await page.screenshot({ path: outPathGoogle, type: 'png' });

  // Also copy to artifact dir
  const artifactDir = 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a';
  await page.screenshot({ path: path.join(artifactDir, 'verified_normal_google_maps.png') });

  await browser.close();
  console.log('✓ Normal Google Maps cutout created successfully at images/map_cutout.webp and images/google_maps_lucknow.webp');
}

render().catch(console.error);
