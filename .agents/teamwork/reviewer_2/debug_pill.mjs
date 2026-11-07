import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function debugElementAt() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    // Check element from point
    const elAtPoint = document.elementFromPoint(650, 50);
    const link = document.querySelector('header nav a, .framer-s5137h');
    const pill = document.querySelector('.framer-gaygr9');
    const header = document.querySelector('header');
    
    // Check parent tree of link
    let curr = link;
    const parents = [];
    while (curr && curr !== document.body) {
      const cs = window.getComputedStyle(curr);
      parents.push({
        tag: curr.tagName,
        class: curr.className,
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        zIndex: cs.zIndex,
        overflow: cs.overflow,
        rect: curr.getBoundingClientRect()
      });
      curr = curr.parentElement;
    }

    return {
      elAtPoint: elAtPoint ? { tag: elAtPoint.tagName, class: elAtPoint.className, text: elAtPoint.innerText } : null,
      parents
    };
  });

  console.log('Debug Element At:', JSON.stringify(info, null, 2));

  // Take screenshot of just the navbar area
  await page.screenshot({
    path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_2/navbar_clip.png',
    clip: { x: 500, y: 0, width: 524, height: 120 }
  });

  await browser.close();
}

debugElementAt().catch(console.error);
