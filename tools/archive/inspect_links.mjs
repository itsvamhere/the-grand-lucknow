import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).filter(a => a.textContent.includes('Map') || a.href.includes('maps') || a.textContent.includes('Book') || a.textContent.includes('Inquire')).map(a => ({
      href: a.href,
      text: a.innerText.replace(/\n/g, ' '),
      selector: a.className,
      rect: {
        x: a.getBoundingClientRect().x,
        y: a.getBoundingClientRect().y,
        width: a.getBoundingClientRect().width,
        height: a.getBoundingClientRect().height
      }
    }));
  });
  console.log('Links found:', JSON.stringify(links, null, 2));
  await browser.close();
}

main().catch(console.error);
