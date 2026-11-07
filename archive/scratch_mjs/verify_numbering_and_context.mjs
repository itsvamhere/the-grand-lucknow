import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function verifyUpdates() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3003...');
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 1. Check card titles
  await page.evaluate(() => window.scrollTo(0, 2600));
  await page.waitForTimeout(1500);

  const cardTitles = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[data-framer-name="Venue Card"], .framer-ysBPc'));
    return cards.map(c => {
      const titleEl = c.querySelector('[data-framer-name="Name"], h2, h3, .framer-1a4cg4');
      return c.innerText.split('\n').filter(Boolean).slice(0, 4);
    });
  });
  console.log('Venue card previews in browser:');
  console.log(JSON.stringify(cardTitles, null, 2));

  // Save screenshot of cards
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_venue_numbering.png' });
  console.log('Saved: verified_venue_numbering.png');

  // 2. Check the "We believe..." headline & paragraphs
  // Find element containing "believe"
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*')).find(e => e.innerText && e.innerText.includes('believe'));
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
    } else {
      window.scrollTo(0, 6800);
    }
  });
  await page.waitForTimeout(1500);

  const aboutText = await page.evaluate(() => {
    const body = document.body.innerText;
    const match = body.match(/believe[\s\S]{0,800}/i);
    return match ? match[0] : 'Not found';
  });
  console.log('Headline & About section text in browser:');
  console.log(aboutText);

  // Save screenshot of headline & about section
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_we_believe_headline.png' });
  console.log('Saved: verified_we_believe_headline.png');

  // Scroll down a bit more to capture the 3 paragraphs
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:\\Users\\Sambhav\\.gemini\\antigravity\\brain\\a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a\\verified_about_paragraphs.png' });
  console.log('Saved: verified_about_paragraphs.png');

  await browser.close();
}

verifyUpdates().catch(console.error);
