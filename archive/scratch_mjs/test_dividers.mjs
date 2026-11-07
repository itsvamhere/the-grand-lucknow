import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });

  const testResults = await page.evaluate(() => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(svg);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('font-family', "'Lay Grotesk Regular', sans-serif");
    text.setAttribute('font-weight', '700');
    svg.appendChild(text);

    const configs = [
      { text: 'THE GRAND   •   ', size: 280 },
      { text: 'THE GRAND   ✦   ', size: 280 },
      { text: 'THE GRAND   ·   ', size: 290 },
      { text: 'THE GRAND   ', size: 300 },
      { text: 'THE GRAND', size: 320 }
    ];

    const out = [];
    for (const c of configs) {
      text.setAttribute('font-size', String(c.size));
      text.textContent = c.text;
      const len = Math.round(text.getComputedTextLength());
      out.push({ config: c, len, target: 2405, diff: 2405 - len });
    }
    svg.remove();
    return out;
  });

  console.log('Divider tests:', testResults);
  await browser.close();
}

main().catch(console.error);
