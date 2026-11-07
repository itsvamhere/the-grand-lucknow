import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/89415e6f-6b69-4c32-8653-44f2041dd566";

async function run() {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  // Capture desktop footer
  const footerElement = await page.$('.framer-xj8hz2');
  if (footerElement) {
    console.log('Found .framer-xj8hz2 on desktop');
  }

  // Screenshot of the whole viewport at the footer
  await page.screenshot({
    path: path.join(artifactsDir, "localhost_the_grand_footer_desktop.png")
  });
  console.log('Saved localhost_the_grand_footer_desktop.png');

  // Also capture mobile viewport
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  await mobilePage.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(1500);

  await mobilePage.screenshot({
    path: path.join(artifactsDir, "localhost_the_grand_footer_mobile.png")
  });
  console.log('Saved localhost_the_grand_footer_mobile.png');

  await browser.close();
  console.log('Verification complete!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
