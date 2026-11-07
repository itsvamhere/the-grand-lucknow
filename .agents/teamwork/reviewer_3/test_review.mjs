import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/');
  const homeNav = await page.evaluate(() => {
    const navAnchors = Array.from(document.querySelectorAll('header nav a, header a[data-framer-name="Nav Link"]'));
    const bookNow = document.querySelector('header .framer-18mvsw1-container a, header a.framer-vO7O2');
    return {
      links: navAnchors.map(a => ({ text: a.innerText.replace(/\s+/g, ' ').trim(), href: a.getAttribute('href') })),
      bookNow: bookNow ? { text: bookNow.innerText.replace(/\s+/g, ' ').trim(), href: bookNow.getAttribute('href') } : null
    };
  });

  await page.goto('http://localhost:3003/venues/open-earth-lawn');
  const lawnNav = await page.evaluate(() => {
    const navAnchors = Array.from(document.querySelectorAll('header nav a, header a[data-framer-name="Nav Link"]'));
    const bookNow = document.querySelector('header .framer-18mvsw1-container a, header a.framer-vO7O2');
    return {
      links: navAnchors.map(a => ({ text: a.innerText.replace(/\s+/g, ' ').trim(), href: a.getAttribute('href') })),
      bookNow: bookNow ? { text: bookNow.innerText.replace(/\s+/g, ' ').trim(), href: bookNow.getAttribute('href') } : null
    };
  });

  console.log('HOME NAV:', JSON.stringify(homeNav, null, 2));
  console.log('LAWN NAV:', JSON.stringify(lawnNav, null, 2));

  await browser.close();
}

main().catch(console.error);
