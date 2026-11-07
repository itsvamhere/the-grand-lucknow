import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const result = await page.evaluate(async () => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, div, span, p'));
    const loc = headings.find(el => el.textContent.trim() === 'Location' && el.children.length === 0);
    if (!loc) return { error: 'not found' };

    // Find its section or container
    let container = loc;
    while (container && container.parentElement && !container.id && !container.getAttribute('data-framer-name')) {
      container = container.parentElement;
    }

    const initialRect = loc.getBoundingClientRect();
    const absoluteTop = initialRect.top + window.scrollY;

    // Scroll directly to absoluteTop - 200
    const testPoints = [];
    for (let offset = -200; offset <= 200; offset += 40) {
      const targetScroll = absoluteTop + offset;
      window.scrollTo(0, targetScroll);
      // Wait for framer motion or styles to apply
      await new Promise(r => setTimeout(r, 50));
      const r = loc.getBoundingClientRect();
      
      // Let's check opacity of loc and all its ancestors up to body
      const ancestors = [];
      let curr = loc;
      while (curr && curr !== document.body) {
        ancestors.push({
          tag: curr.tagName,
          id: curr.id,
          class: curr.className ? String(curr.className).slice(0, 30) : '',
          opacity: window.getComputedStyle(curr).opacity,
          transform: window.getComputedStyle(curr).transform,
          filter: window.getComputedStyle(curr).filter,
          mask: window.getComputedStyle(curr).maskImage || window.getComputedStyle(curr).webkitMaskImage
        });
        curr = curr.parentElement;
      }

      testPoints.push({
        targetScroll,
        locTop: r.top,
        ancestorsWithOpacity: ancestors.filter(a => parseFloat(a.opacity) < 1 || a.mask || a.filter !== 'none')
      });
    }

    // Also check navbar styles
    const navbar = document.querySelector('header, nav, [data-framer-name*="Nav"]');
    const navStyles = navbar ? {
      tag: navbar.tagName,
      bg: window.getComputedStyle(navbar).backgroundColor,
      backdropFilter: window.getComputedStyle(navbar).backdropFilter,
      mixBlendMode: window.getComputedStyle(navbar).mixBlendMode,
      zIndex: window.getComputedStyle(navbar).zIndex
    } : null;

    return { absoluteTop, testPoints, navStyles };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
