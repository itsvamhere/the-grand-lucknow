import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkNavbar1024() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const navInfo = await page.evaluate(() => {
    const pill = document.querySelector('.framer-gaygr9, [data-framer-name="Navigation"], header nav');
    const allHeaders = Array.from(document.querySelectorAll('header, [data-framer-name="Navbar Wrapper"]'));
    return {
      pillFound: !!pill,
      pillStyle: pill ? {
        display: window.getComputedStyle(pill).display,
        visibility: window.getComputedStyle(pill).visibility,
        opacity: window.getComputedStyle(pill).opacity,
        rect: pill.getBoundingClientRect()
      } : null,
      headers: allHeaders.map(h => ({
        class: h.className,
        rect: h.getBoundingClientRect(),
        display: window.getComputedStyle(h).display,
        innerLinks: Array.from(h.querySelectorAll('a')).map(a => ({
          text: a.innerText.replace(/\s+/g, ' ').trim(),
          rect: a.getBoundingClientRect()
        }))
      }))
    };
  });

  console.log('Nav at 1024:', JSON.stringify(navInfo, null, 2));

  // Let's also check index.html at 1024x768!
  const pIndex = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await pIndex.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  const indexInfo = await pIndex.evaluate(() => {
    const allHeaders = Array.from(document.querySelectorAll('header, [data-framer-name="Navbar Wrapper"]'));
    return allHeaders.map(h => ({
      class: h.className,
      rect: h.getBoundingClientRect(),
      innerLinks: Array.from(h.querySelectorAll('a')).map(a => ({
        text: a.innerText.replace(/\s+/g, ' ').trim(),
        rect: a.getBoundingClientRect()
      }))
    }));
  });

  console.log('Index at 1024:', JSON.stringify(indexInfo, null, 2));

  await browser.close();
}

checkNavbar1024().catch(console.error);
