import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const b = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await b.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const p = await context.newPage();
  await p.goto('http://localhost:3003/venues/open-earth-lawn');
  
  const mapData = await p.evaluate(() => {
    const pin = document.getElementById('grand-live-pointer');
    const btn = document.querySelector('.framer-1n8t7q3[data-framer-name="Sticky Button"], .framer-1n8t7q3');
    const mapSec = document.getElementById('subpage-vector-map') || document.querySelector('.framer-tfszgi[data-framer-name="Location"]');
    
    const mapRect = mapSec.getBoundingClientRect();
    const absTop = window.scrollY + mapRect.top;
    
    const samples = [];
    for (let y = absTop - 600; y <= absTop + mapRect.height + 200; y += 15) {
      window.scrollTo(0, y);
      const pBox = pin.getBoundingClientRect();
      const bBox = btn.getBoundingClientRect();
      
      const pinVisible = (pBox.bottom > 0 && pBox.top < window.innerHeight);
      const btnVisible = (bBox.bottom > 0 && bBox.top < window.innerHeight);
      
      if (pinVisible && btnVisible) {
        const overlap = !(pBox.right < bBox.left || pBox.left > bBox.right || pBox.bottom < bBox.top || pBox.top > bBox.bottom);
        const dx = Math.max(0, Math.max(pBox.left - bBox.right, bBox.left - pBox.right));
        const dy = Math.max(0, Math.max(pBox.top - bBox.bottom, bBox.top - pBox.bottom));
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        samples.push({
          scrollY: y,
          pin: { left: Math.round(pBox.left), top: Math.round(pBox.top), right: Math.round(pBox.right), bottom: Math.round(pBox.bottom) },
          btn: { left: Math.round(bBox.left), top: Math.round(bBox.top), right: Math.round(bBox.right), bottom: Math.round(bBox.bottom) },
          dx: Math.round(dx),
          dy: Math.round(dy),
          dist: Math.round(dist),
          overlap
        });
      }
    }
    
    samples.sort((a, b) => a.dist - b.dist);
    return {
      pinComputed: {
        left: window.getComputedStyle(pin).left,
        top: window.getComputedStyle(pin).top
      },
      closest5: samples.slice(0, 5)
    };
  });
  
  console.log(JSON.stringify(mapData, null, 2));
  await b.close();
}

main();
