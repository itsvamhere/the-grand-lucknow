import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testNavbarAndButton() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('--- Checking index.html ---');
  await page.goto('http://localhost:3003/', { waitUntil: 'load' });
  await page.waitForTimeout(500);

  const indexNav = await page.evaluate(() => {
    // Look for nav links in desktop nav
    const links = Array.from(document.querySelectorAll('nav a, header a, [data-framer-name="Navigation"] a, [data-framer-name="Header"] a'))
      .map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }))
      .filter(l => l.text.length > 0);
    
    // Find Book Now button
    const bookNow = Array.from(document.querySelectorAll('a')).find(a => a.innerText.trim().toUpperCase() === 'BOOK NOW');
    let btnStyle = null;
    if (bookNow) {
      const cs = window.getComputedStyle(bookNow);
      btnStyle = {
        bg: cs.backgroundColor,
        color: cs.color,
        borderWidth: cs.borderWidth,
        borderStyle: cs.borderStyle,
        borderRadius: cs.borderRadius,
        opacity: cs.opacity
      };
    }
    return { links, btnStyle };
  });

  console.log('Index nav links:', indexNav.links);
  console.log('Index Book Now button style:', indexNav.btnStyle);

  console.log('\n--- Checking venues/open-earth-lawn ---');
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await page.waitForTimeout(500);

  const lawnNav = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, header a, [data-framer-name="Navigation"] a, [data-framer-name="Header"] a, .framer-18mvsw1-container a'))
      .map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }))
      .filter(l => l.text.length > 0);
    
    const bookNow = Array.from(document.querySelectorAll('a')).find(a => a.innerText.trim().toUpperCase() === 'BOOK NOW');
    let btnStyle = null;
    if (bookNow) {
      const cs = window.getComputedStyle(bookNow);
      btnStyle = {
        bg: cs.backgroundColor,
        color: cs.color,
        borderWidth: cs.borderWidth,
        borderStyle: cs.borderStyle,
        borderRadius: cs.borderRadius,
        opacity: cs.opacity
      };
    }
    return { links, btnStyle };
  });

  console.log('Open Earth Lawn nav links:', lawnNav.links);
  console.log('Open Earth Lawn Book Now button style:', lawnNav.btnStyle);

  // Take screenshot of button
  const btnElem = await page.$('a:has-text("Book Now")');
  if (btnElem) {
    await btnElem.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_2/independent_book_now.png' });
    console.log('Saved independent_book_now.png');
  }

  await browser.close();
}

testNavbarAndButton().catch(console.error);
