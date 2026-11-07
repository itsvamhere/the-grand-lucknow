import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const buttonInfo = await page.evaluate(() => {
    const sec = document.getElementById('locations-1');
    if (!sec) return { error: 'locations-1 not found' };
    const btn = sec.querySelector('a');
    if (!btn) return { error: 'btn not found' };
    return {
      text: btn.innerText.replace(/\s+/g, ' ').trim(),
      html: btn.outerHTML
    };
  });

  console.log('Location Button in live DOM:');
  console.log(buttonInfo.text);
  console.log(buttonInfo.html);

  await browser.close();
}

main().catch(console.error);
