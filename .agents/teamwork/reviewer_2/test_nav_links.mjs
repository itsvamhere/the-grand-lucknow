import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testLinks() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Desktop nav links:
  // Venues -> /venues
  // About -> /about
  // Contact -> /contact
  // Book Now -> /contact
  const navLinks = await page.evaluate(() => {
    const desktopNav = document.querySelector('header nav, [data-framer-name="Navigation"]');
    const links = Array.from(desktopNav.querySelectorAll('a')).map(a => ({
      text: a.innerText.replace(/\s+/g, ' ').trim(),
      href: a.getAttribute('href')
    }));
    const bookNow = document.querySelector('.framer-18mvsw1-container a');
    return {
      links,
      bookNow: bookNow ? { text: bookNow.innerText.replace(/\s+/g, ' ').trim(), href: bookNow.getAttribute('href') } : null
    };
  });

  console.log('Desktop Nav Links:', JSON.stringify(navLinks, null, 2));

  // Mobile menu test
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Find hamburger button
  const toggleBtn = await mobilePage.$('[data-framer-name="Toggle"], [data-framer-name="Menu Button"], .framer-1vd8g2r, .framer-1ngqbpf');
  console.log('Mobile toggle button found:', !!toggleBtn);

  // Get mobile drawer links before or after toggle
  const mobileLinks = await mobilePage.evaluate(() => {
    const drawerLinks = Array.from(document.querySelectorAll('.framer-1px75a6, .framer-1gyxj21, .framer-14hjx1z, .framer-1fslfdg'));
    return drawerLinks.map(a => ({
      text: a.innerText.replace(/\s+/g, ' ').trim(),
      href: a.getAttribute('href'),
      fontSize: window.getComputedStyle(a.querySelector('[data-rolling-label]') || a).fontSize
    }));
  });

  console.log('Mobile Links in DOM:', JSON.stringify(mobileLinks, null, 2));

  await browser.close();
}

testLinks().catch(console.error);
