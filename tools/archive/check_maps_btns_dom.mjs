import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const btns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).filter(a => a.textContent.includes('Maps')).map(a => ({
      href: a.href,
      innerText: a.innerText,
      outerHTML: a.outerHTML
    }));
  });

  console.log('Buttons found on index.html:', btns.length);
  btns.forEach((b, i) => {
    console.log(`\n=== Button ${i} ===`);
    console.log('Href:', b.href);
    console.log('InnerText:', JSON.stringify(b.innerText));
    console.log('HTML preview:', b.outerHTML.substring(0, 400));
  });

  await browser.close();
}

main().catch(console.error);
