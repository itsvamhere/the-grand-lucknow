import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const allButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button')).map(el => ({
      text: el.innerText.replace(/\s+/g, ' ').trim(),
      href: el.href,
      bg: window.getComputedStyle(el).backgroundColor,
      color: window.getComputedStyle(el).color,
      rect: el.getBoundingClientRect()
    })).filter(b => b.text.includes('Map') || b.text.includes('↗') || b.text.includes('Inquire') || b.text.includes('Book'));
  });

  console.log('Buttons on index.html:', JSON.stringify(allButtons, null, 2));

  await browser.close();
}

main().catch(console.error);
