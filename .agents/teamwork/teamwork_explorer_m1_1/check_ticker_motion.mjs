import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  // Check ticker opacity and transform over 3 seconds
  for (let i = 0; i < 5; i++) {
    const state = await page.evaluate(() => {
      const ul = document.querySelector('footer.framer-18na9ah [data-framer-name="Footer Logo"] ul');
      if (!ul) return null;
      return {
        opacity: window.getComputedStyle(ul).opacity,
        transform: window.getComputedStyle(ul).transform,
        display: window.getComputedStyle(ul).display,
        visible: ul.offsetParent !== null
      };
    });
    console.log(`Time ${i}s:`, state);
    await page.waitForTimeout(1000);
  }

  await browser.close();
}

main().catch(console.error);
