import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  const fontBuf = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/fonts/el_pacre_regular.woff2');
  const fontBase64 = fontBuf.toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/wawoff2@2.0.1/build/decompress_binding.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js"></script>
    </head>
    <body>
      <div id="output">Loading...</div>
      <script>
        async function convert() {
          try {
            const base64 = "${fontBase64}";
            const binStr = atob(base64);
            const woff2Bytes = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) woff2Bytes[i] = binStr.charCodeAt(i);

            // Wait for Module / decompress
            let ttfBytes;
            if (window.Module && window.Module.decompress) {
              ttfBytes = window.Module.decompress(woff2Bytes);
            } else if (window.decompress) {
              ttfBytes = window.decompress(woff2Bytes);
            } else {
              // wait for runtime
              await new Promise(r => setTimeout(r, 500));
              ttfBytes = Module.decompress(woff2Bytes);
            }

            const font = opentype.parse(ttfBytes.buffer);
            console.log('Font parsed successfully!', font.names.fontFamily);

            // Get SVG path for "THE GRAND"
            // font.getPath(text, x, y, fontSize, options)
            const path = font.getPath('THE GRAND', 0, 23, 27, { letterSpacing: 0.1 });
            const pathData = path.toPathData(3);
            window.__pathData = pathData;
            window.__fontFamily = font.names.fontFamily.en;
            document.getElementById('output').innerText = 'SUCCESS';
          } catch(e) {
            document.getElementById('output').innerText = 'ERROR: ' + e.message;
            console.error(e);
          }
        }
        window.addEventListener('load', convert);
      </script>
    </body>
    </html>
  `);

  await page.waitForTimeout(2000);
  const result = await page.evaluate(() => ({
    status: document.getElementById('output').innerText,
    fontFamily: window.__fontFamily,
    pathDataLen: window.__pathData ? window.__pathData.length : 0,
    pathDataSnippet: window.__pathData ? window.__pathData.slice(0, 100) : null
  }));
  console.log('Conversion result:\n', result);

  if (result.pathDataLen > 0) {
    const fullPath = await page.evaluate(() => window.__pathData);
    fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/the_grand_vector_path.txt', fullPath, 'utf8');
    console.log('Saved exact outlined vector path to the_grand_vector_path.txt!');
  }

  await browser.close();
}

run();
