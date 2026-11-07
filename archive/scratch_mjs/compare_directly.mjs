import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
  
  const fontBuf = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/fonts/el_pacre_regular.woff2');
  const fontBase64 = fontBuf.toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @font-face {
          font-family: 'EL PACRE Regular';
          src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        }
        body { background: #10231D; color: #FFF0CA; padding: 40px; font-family: sans-serif; }
        .row { margin-bottom: 40px; }
        .label { font-size: 13px; color: #A4B29E; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
      </style>
    </head>
    <body>
      <div class="row">
        <div class="label">1. Casamomo Original Vector Path (from casamomo.at):</div>
        <svg viewBox="0 0 216.285 27" width="288" height="36"><path d="M 82.756 0.433 L 77.962 0.433 L 78.719 2.415 L 71.834 21.917 L 69.058 26.567 L 76.159 26.567 C 75.655 25.197 75.402 23.828 75.402 22.386 C 75.402 21.052 75.619 19.646 76.051 18.132 L 76.628 18.132 C 80.017 18.132 82.612 18.925 85.063 20.331 C 85.171 21.016 85.243 21.701 85.243 22.35 C 85.243 23.828 84.955 25.197 84.45 26.567 L 93.823 26.567 L 90.759 21.917 Z M 76.881 15.789 L 80.197 6.38 L 83.694 15.789 L 76.881 15.789 Z M 186.111 4.47 L 186.111 22.494 L 187.444 26.567 L 180.271 26.567 L 181.605 22.494 L 181.605 10.922 L 174.792 26.567 L 173.097 26.567 L 166.681 10.778 L 166.681 22.494 L 168.015 26.567 L 162.608 26.567 L 163.977 22.494 L 163.977 4.47 L 162.608 0.433 L 167.33 0.433 L 175.008 19.322 L 183.227 0.433 L 187.444 0.433 L 186.111 4.47 Z M 146.973 0 C 139.656 0 134.176 5.551 134.176 13.482 C 134.176 21.449 139.439 27 146.973 27 C 154.471 27 159.734 21.809 159.734 13.482 C 159.734 5.155 154.255 0 146.973 0 Z M 149.749 23.936 C 149.1 24.116 148.451 24.188 147.802 24.188 C 143.873 24.188 140.377 20.908 138.971 15.645 C 138.61 14.275 138.43 12.977 138.43 11.752 C 138.43 7.39 140.593 4.001 144.162 3.064 C 144.81 2.884 145.495 2.812 146.144 2.812 C 150.001 2.812 153.498 5.84 154.976 11.355 C 155.373 12.797 155.553 14.167 155.553 15.428 C 155.553 19.79 153.39 22.963 149.749 23.936 Z M 203.524 0 C 196.206 0 190.727 5.551 190.727 13.482 C 190.727 21.449 195.99 27 203.524 27 C 211.022 27 216.285 21.809 216.285 13.482 C 216.285 5.155 210.805 0 203.524 0 Z M 206.299 23.936 C 205.65 24.116 205.002 24.188 204.353 24.188 C 200.424 24.188 196.927 20.908 195.521 15.645 C 195.16 14.275 194.98 12.977 194.98 11.752 C 194.98 7.39 197.143 4.001 200.712 3.064 C 201.361 2.884 202.046 2.812 202.695 2.812 C 206.552 2.812 210.048 5.84 211.526 11.355 C 211.923 12.797 212.103 14.167 212.103 15.428 C 212.103 19.79 209.94 22.963 206.299 23.936 Z M 129.793 4.47 L 129.793 22.494 L 131.127 26.567 L 123.953 26.567 L 125.287 22.494 L 125.287 10.922 L 118.474 26.567 L 116.78 26.567 L 110.363 10.778 L 110.363 22.494 L 111.697 26.567 L 106.29 26.567 L 107.66 22.494 L 107.66 4.47 L 106.29 0.433 L 111.012 0.433 L 118.69 19.322 L 126.909 0.433 L 131.127 0.433 L 129.793 4.47 Z M 37.175 0.433 L 32.38 0.433 L 33.137 2.415 L 26.252 21.917 L 23.476 26.567 L 30.578 26.567 C 30.073 25.197 29.821 23.828 29.821 22.386 C 29.821 21.052 30.037 19.646 30.47 18.132 L 31.046 18.132 C 34.435 18.132 37.03 18.925 39.482 20.331 C 39.59 21.016 39.662 21.701 39.662 22.35 C 39.662 23.828 39.374 25.197 38.869 26.567 L 48.241 26.567 L 45.177 21.917 Z M 31.299 15.789 L 34.615 6.38 L 38.112 15.789 L 31.299 15.789 Z M 20.944 20.547 L 21.629 24.945 C 19.322 26.027 15.825 27 12.148 27 C 5.443 27 0 21.449 0 13.482 C 0 5.551 5.479 0.324 12.761 0 L 13.41 0 C 16.222 0 19.141 0.829 21.268 1.874 L 21.304 7.57 C 18.889 4.578 15.681 2.812 12.401 2.812 C 11.391 2.812 10.418 2.956 9.409 3.316 C 6.056 4.47 4.182 7.426 4.182 11.463 C 4.182 12.761 4.362 14.167 4.758 15.645 C 6.164 20.872 9.228 24.188 13.518 24.188 C 16.366 24.188 18.853 22.998 20.944 20.547 Z M 68.175 20.259 C 68.175 23.72 65.507 27 58.009 27 C 55.017 27 51.857 26.259 49.55 25.178 L 50.235 20.78 C 53.155 23.195 55.125 24.296 57.937 24.296 C 62.479 24.296 63.669 22.854 63.669 21.449 C 63.669 19.43 61.614 18.096 55.882 14.095 C 53.071 12.148 49.862 9.733 49.862 6.381 C 49.862 3.172 51.34 0 58.874 0 C 61.866 0 63.957 0.757 66.264 1.875 L 65.579 6.272 C 63.2 4.037 61.29 2.704 58.622 2.704 C 55.45 2.704 54.368 4.218 54.368 5.623 C 54.368 7.642 56.099 8.976 59.379 11.103 C 64.39 14.383 68.175 16.834 68.175 20.259 Z" fill="#FFF0CA"></path></svg>
      </div>
      <div class="row">
        <div class="label">2. EL PACRE Regular Text 'CASA MOMO' (font-size 27):</div>
        <div style="font-family: 'EL PACRE Regular', serif; font-size: 27px; letter-spacing: 0.1em; line-height: 1;">CASA MOMO</div>
      </div>
      <div class="row">
        <div class="label">3. EL PACRE Regular Text 'THE GRAND' (current font-size 27, stroke 0.75):</div>
        <svg viewBox="0 0 216.285 27" width="288" height="36" overflow="visible">
          <text x="0" y="24" font-family="'EL PACRE Regular', serif" font-size="27" font-weight="700" stroke="#FFF0CA" stroke-width="0.75" paint-order="stroke fill" letter-spacing="0.14em" fill="#FFF0CA">THE GRAND</text>
        </svg>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566/direct_font_comparison.png'
  });
  console.log('Saved direct_font_comparison.png');
  await browser.close();
}

run();
