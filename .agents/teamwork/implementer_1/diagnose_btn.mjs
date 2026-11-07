import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function diagnoseButton() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const diag = await page.evaluate(() => {
    // Find the Book Now button element
    const btn = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Book Now'));
    if (!btn) return { error: 'Button not found' };

    // Check ancestors and their opacity / filter / background
    let curr = btn;
    const ancestors = [];
    while (curr) {
      const cs = window.getComputedStyle(curr);
      ancestors.push({
        tag: curr.tagName,
        id: curr.id,
        class: curr.className,
        opacity: cs.opacity,
        filter: cs.filter,
        backdropFilter: cs.backdropFilter,
        backgroundColor: cs.backgroundColor,
        mixBlendMode: cs.mixBlendMode
      });
      curr = curr.parentElement;
    }

    // Also check elements at the button's point
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const stack = document.elementsFromPoint(x, y).map(el => ({
      tag: el.tagName,
      id: el.id,
      class: el.className
    }));

    return { ancestors, stack, rect };
  });

  console.log('Button diagnosis:', JSON.stringify(diag, null, 2));
  await browser.close();
}

diagnoseButton().catch(console.error);
