import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn');
  const visibleLinks = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('header a')).filter(a => a.offsetParent !== null);
    return anchors.map(a => ({
      text: a.innerText.replace(/\s+/g, ' ').trim(),
      href: a.getAttribute('href'),
      box: a.getBoundingClientRect()
    }));
  });

  console.log('Visible Links on 1440x900:', JSON.stringify(visibleLinks, null, 2));

  // Let's check Book Now button in home vs lawn:
  await page.goto('http://localhost:3003/');
  const homeBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('header a')).filter(a => a.offsetParent !== null && a.innerText.includes('Book Now'));
    if (btns.length === 0) return null;
    const b = btns[0];
    const s = window.getComputedStyle(b);
    return {
      text: b.innerText.replace(/\s+/g, ' ').trim(),
      href: b.getAttribute('href'),
      rect: b.getBoundingClientRect(),
      border: s.border,
      borderRadius: s.borderRadius,
      backgroundColor: s.backgroundColor,
      color: s.color,
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      height: s.height,
      padding: s.padding
    };
  });

  await page.goto('http://localhost:3003/venues/open-earth-lawn');
  const lawnBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('header a')).filter(a => a.offsetParent !== null && a.innerText.includes('Book Now'));
    if (btns.length === 0) return null;
    const b = btns[0];
    const s = window.getComputedStyle(b);
    return {
      text: b.innerText.replace(/\s+/g, ' ').trim(),
      href: b.getAttribute('href'),
      rect: b.getBoundingClientRect(),
      border: s.border,
      borderRadius: s.borderRadius,
      backgroundColor: s.backgroundColor,
      color: s.color,
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      height: s.height,
      padding: s.padding
    };
  });

  console.log('Home Button Computed Style:', JSON.stringify(homeBtn, null, 2));
  console.log('Lawn Button Computed Style:', JSON.stringify(lawnBtn, null, 2));

  await browser.close();
}

main().catch(console.error);
