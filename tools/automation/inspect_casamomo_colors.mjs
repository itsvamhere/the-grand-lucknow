import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/apartments/boutique-n1', { waitUntil: 'networkidle' });
  
  const colors = await page.evaluate(() => {
    const locH = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim() === 'Location' && el.children.length === 0);
    const navLogo = document.querySelector('header a[data-framer-name="Logo"], header svg, header [class*="Logo"]');
    const navBar = document.querySelector('header');
    const locSection = locH.closest('section');
    const mapSection = document.querySelector('.framer-tfszgi');

    return {
      locColor: window.getComputedStyle(locH).color,
      locParentColor: window.getComputedStyle(locH.parentElement).color,
      locH2Color: window.getComputedStyle(locH.closest('h2') || locH).color,
      locBg: window.getComputedStyle(locSection).backgroundColor,
      mapBg: mapSection ? window.getComputedStyle(mapSection).backgroundColor : null,
      navLogoFill: navLogo ? window.getComputedStyle(navLogo).fill : null,
      navLogoColor: navLogo ? window.getComputedStyle(navLogo).color : null,
      navBg: window.getComputedStyle(navBar).backgroundColor,
      // CSS variables on root
      rootBg: window.getComputedStyle(document.body).backgroundColor,
      token_a0f3: getComputedStyle(document.documentElement).getPropertyValue('--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3'),
      token_8ecd: getComputedStyle(document.documentElement).getPropertyValue('--token-8ecd7124-9686-4bd8-bf72-4f81314652d2')
    };
  });

  console.log(JSON.stringify(colors, null, 2));
  await browser.close();
})();
