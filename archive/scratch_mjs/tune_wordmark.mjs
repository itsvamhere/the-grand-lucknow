import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 2404.809 300.206');
    document.body.appendChild(svg);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('font-family', "'Lay Grotesk Regular', sans-serif");
    text.setAttribute('font-weight', '700');
    svg.appendChild(text);

    const trials = [];
    const strings = [
      'THE GRAND   THE GRAND   ',
      'THE GRAND • THE GRAND • ',
      'THE GRAND · THE GRAND · ',
      'THE GRAND — THE GRAND — ',
      'THE GRAND'
    ];

    for (const str of strings) {
      for (let size = 200; size <= 270; size += 10) {
        text.setAttribute('font-size', String(size));
        text.setAttribute('letter-spacing', '0.04em');
        text.textContent = str;
        trials.push({ str, size, len: Math.round(text.getComputedTextLength()), target: 2405 });
      }
    }
    svg.remove();
    return trials;
  });

  console.log('Results:');
  result.filter(r => Math.abs(r.len - 2405) < 300 || r.str === 'THE GRAND').forEach(r => console.log(JSON.stringify(r)));
  await browser.close();
}

main().catch(console.error);
