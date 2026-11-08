import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'networkidle' });
  
  const headingColors = await page.evaluate(() => {
    const vd = Array.from(document.querySelectorAll('h2, h3, p')).find(el => el.innerText === 'Venue Details' || el.innerText.includes('Venue Details'));
    const feat = Array.from(document.querySelectorAll('h2, h3, p')).find(el => el.innerText === 'Features');
    const desc = Array.from(document.querySelectorAll('h2, h3, p')).find(el => el.innerText === 'Description');
    const loc = document.querySelector('#bigtext-1 h2');
    
    return {
      venueDetails: vd ? { text: vd.innerText, color: window.getComputedStyle(vd).color } : null,
      features: feat ? { text: feat.innerText, color: window.getComputedStyle(feat).color } : null,
      description: desc ? { text: desc.innerText, color: window.getComputedStyle(desc).color } : null,
      location: loc ? { text: loc.innerText, color: window.getComputedStyle(loc).color } : null
    };
  });
  console.log('Heading Colors:', headingColors);

  await browser.close();
})();
