import { chromium } from 'playwright-core';

async function extractVenuesDetails() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://www.thegrandlucknow.in', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Extract the venues section
  const venueCards = await page.evaluate(() => {
    // Look for headings under #venues or Our Venues
    const venuesHeader = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Our Venues'));
    if (!venuesHeader) return 'No Our Venues h2 found';

    const section = venuesHeader.closest('section') || venuesHeader.parentElement;
    
    // Find all h3 or card containers
    const h3s = Array.from(section.querySelectorAll('h3'));
    return h3s.map(h3 => {
      // Find card container
      const card = h3.closest('div[class*="rounded"], div[class*="card"], div[class*="p-"]') || h3.parentElement;
      const img = card ? card.querySelector('img') : null;
      return {
        name: h3.innerText.trim(),
        text: card ? card.innerText.trim() : '',
        imgSrc: img ? img.src : null,
        imgAlt: img ? img.alt : null
      };
    });
  });

  console.log('Venue Cards Details:', JSON.stringify(venueCards, null, 2));

  await browser.close();
}

extractVenuesDetails().catch(console.error);
