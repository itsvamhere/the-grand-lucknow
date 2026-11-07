import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const b = await chromium.launch({ channel: 'msedge', headless: true });
  const p = await b.newPage();
  await p.goto('http://localhost:3003/venues/open-earth-lawn');
  
  const info = await p.evaluate(() => {
    const c = document.querySelector('.grand-ticker-container');
    const a = document.querySelector('.grand-ticker-track.track-a');
    const b = document.querySelector('.grand-ticker-track.track-b');
    const cs = window.getComputedStyle(c);
    const as = window.getComputedStyle(a);
    const bs = window.getComputedStyle(b);
    
    const itemsA = Array.from(a.children);
    const itemsB = Array.from(b.children);
    
    return {
      containerGap: cs.gap,
      containerPadding: cs.padding,
      aWidth: a.offsetWidth,
      bWidth: b.offsetWidth,
      aRect: a.getBoundingClientRect(),
      bRect: b.getBoundingClientRect(),
      item0A: itemsA[0]?.getBoundingClientRect(),
      item1A: itemsA[1]?.getBoundingClientRect(),
      item0B: itemsB[0]?.getBoundingClientRect(),
      item1B: itemsB[1]?.getBoundingClientRect(),
      item0AMarginRight: itemsA[0] ? window.getComputedStyle(itemsA[0]).marginRight : null,
      item1AMarginRight: itemsA[1] ? window.getComputedStyle(itemsA[1]).marginRight : null,
      item0BMarginRight: itemsB[0] ? window.getComputedStyle(itemsB[0]).marginRight : null,
      item1BMarginRight: itemsB[1] ? window.getComputedStyle(itemsB[1]).marginRight : null,
    };
  });
  
  console.log(JSON.stringify(info, null, 2));
  await b.close();
}

main();
