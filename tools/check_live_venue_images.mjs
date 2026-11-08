import { chromium } from 'playwright-core';

async function checkCardImages() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://www.thegrandlucknow.in', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const images = await page.evaluate(() => {
    const venuesHeader = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Our Venues'));
    const section = venuesHeader.closest('section') || venuesHeader.parentElement;
    const cards = Array.from(section.querySelectorAll('h3')).map(h3 => {
      let el = h3;
      let bg = null;
      while (el && el !== section) {
        const style = window.getComputedStyle(el);
        if (style.backgroundImage && style.backgroundImage !== 'none') {
          bg = style.backgroundImage;
          break;
        }
        const img = el.querySelector('img');
        if (img) {
          bg = img.src;
          break;
        }
        el = el.parentElement;
      }
      return { name: h3.innerText.trim(), bg };
    });
    return cards;
  });

  console.log('Venue card images:', images);
  await browser.close();
}

checkCardImages().catch(console.error);
