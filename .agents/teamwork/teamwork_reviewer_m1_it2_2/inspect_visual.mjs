import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const WORK_DIR = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_reviewer_m1_it2_2';

async function inspectCards() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll to location and take screenshot
  const mapSection = await page.$('#subpage-vector-map');
  if (mapSection) {
    await mapSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(WORK_DIR, 'proof_location_map.png') });
  }

  // Scroll to cards and take screenshot
  const cardsLink = await page.$('a[href="/venues/grassland-gala"]');
  if (cardsLink) {
    await cardsLink.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(WORK_DIR, 'proof_venue_cards.png') });
  }

  // Evaluate card details
  const details = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('a[href="/venues/grassland-gala"], a[href="/venues/garden-galaxy"]'));
    return cards.map(c => {
      const sizeEl = c.querySelector('.framer-1mzugmy');
      const peopleEl = c.querySelector('.framer-anl3iy');
      const supEl = c.querySelector('.framer-84xumc');
      return {
        href: c.getAttribute('href'),
        cardText: c.innerText.replace(/\n+/g, ' | '),
        sizeText: sizeEl ? sizeEl.innerText.replace(/\n+/g, ' ') : null,
        peopleText: peopleEl ? peopleEl.innerText.replace(/\n+/g, ' ') : null,
        supComputedDisplay: supEl ? window.getComputedStyle(supEl).display : null
      };
    });
  });

  console.log('Card Inspection Results:', JSON.stringify(details, null, 2));

  // Check footer ticker
  const ticker = await page.evaluate(() => {
    const container = document.querySelector('.grand-ticker-container');
    const trackA = document.querySelector('.grand-ticker-track.track-a');
    const trackB = document.querySelector('.grand-ticker-track.track-b');
    return {
      containerDisplay: container ? window.getComputedStyle(container).display : null,
      containerGap: container ? window.getComputedStyle(container).gap : null,
      trackADisplay: trackA ? window.getComputedStyle(trackA).display : null,
      trackBDisplay: trackB ? window.getComputedStyle(trackB).display : null
    };
  });
  console.log('Ticker Inspection Results:', JSON.stringify(ticker, null, 2));

  await browser.close();
}

inspectCards().catch(console.error);
