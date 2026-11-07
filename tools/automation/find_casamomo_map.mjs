import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const mapSearch = await page.evaluate(() => {
    const locH = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim() === 'Location' && el.children.length === 0);
    const sec = locH.closest('section');
    
    // Find next sibling of sec or all sections around it
    const parent = sec.parentElement;
    const siblings = Array.from(parent.children).map(c => ({
      tag: c.tagName,
      id: c.id,
      class: typeof c.className === 'string' ? c.className.slice(0, 40) : '',
      text: c.innerText ? c.innerText.slice(0, 40).replace(/\n/g, ' ') : ''
    }));

    // Find any element mentioning map or Schlossberg or Boutique N°1 on map
    const chips = Array.from(document.querySelectorAll('*')).filter(el => el.textContent.includes('Schlossberg') || el.textContent.includes('Stadtpark'));

    return {
      siblings,
      chips: chips.map(c => ({
        tag: c.tagName,
        class: typeof c.className === 'string' ? c.className.slice(0, 40) : '',
        parent: c.parentElement ? c.parentElement.className : '',
        grandParent: c.parentElement && c.parentElement.parentElement ? c.parentElement.parentElement.className : ''
      }))
    };
  });

  console.log(JSON.stringify(mapSearch, null, 2));
  await browser.close();
})();
