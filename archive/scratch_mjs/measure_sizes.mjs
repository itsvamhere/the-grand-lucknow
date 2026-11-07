import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  const res = await page.evaluate(() => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(svg);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('font-family', "'Lay Grotesk Regular', sans-serif");
    text.setAttribute('font-weight', '700');
    text.setAttribute('letter-spacing', '0.08em');
    text.textContent = 'GRAND';
    svg.appendChild(text);
    const out = [];
    for (let s of [260, 280, 300, 320, 340]) {
      text.setAttribute('font-size', String(s));
      const b = text.getBBox();
      out.push({ size: s, w: Math.round(b.width), h: Math.round(b.height) });
    }
    // Also test two GRANDs
    text.textContent = 'GRAND   GRAND   ';
    for (let s of [220, 240, 260]) {
      text.setAttribute('font-size', String(s));
      const b = text.getBBox();
      out.push({ twoGrands: true, size: s, w: Math.round(b.width) });
    }
    svg.remove();
    return out;
  });
  console.log(JSON.stringify(res, null, 2));
  await browser.close();
}

main().catch(console.error);
