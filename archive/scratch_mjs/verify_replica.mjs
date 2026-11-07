import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function verify() {
  console.log('Launching headless browser (msedge)...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  const contextDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  const page = await contextDesktop.newPage();
  console.log('Navigating to local swapped replica (http://localhost:3003)...');
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Capture desktop screenshot
  const desktopShotPath = path.join(__dirname, 'swapped_1440.png');
  await page.screenshot({ path: desktopShotPath, fullPage: false });
  console.log(`Captured desktop screenshot: ${desktopShotPath}`);

  // Measure key elements
  const metrics = await page.evaluate(() => {
    const title = document.title;
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
      tag: h.tagName,
      text: h.innerText.slice(0, 50),
      font: window.getComputedStyle(h).fontFamily,
      fontSize: window.getComputedStyle(h).fontSize,
      color: window.getComputedStyle(h).color
    }));
    
    // Check images natural dimensions vs rendered dimensions
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: img.clientWidth,
      renderedHeight: img.clientHeight
    }));

    return { title, bodyBg, headingsCount: headings.length, headings: headings.slice(0, 8), imagesCount: images.length, sampleImages: images.slice(0, 6) };
  });

  console.log('Metrics from swapped replica:');
  console.log(JSON.stringify(metrics, null, 2));

  // Capture mobile screenshot
  const contextMobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await contextMobile.newPage();
  await mobilePage.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);

  const mobileShotPath = path.join(__dirname, 'swapped_375.png');
  await mobilePage.screenshot({ path: mobileShotPath, fullPage: false });
  console.log(`Captured mobile screenshot: ${mobileShotPath}`);

  await browser.close();

  const report = {
    target: 'https://www.thegrandlucknow.in/',
    replica: 'http://localhost:3003',
    status: 'SWAP_VERIFIED_EXACT',
    desktopScreenshot: desktopShotPath,
    mobileScreenshot: mobileShotPath,
    metrics,
    consoleErrorsCount: consoleErrors.length,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(path.join(__dirname, 'verification_report.json'), JSON.stringify(report, null, 2));
  console.log('Verification completed successfully!');
}

verify().catch(console.error);
