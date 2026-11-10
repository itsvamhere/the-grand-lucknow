import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome'
  });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  console.log('--- Testing Homepage (375x812) ---');
  await page.goto('http://localhost:3003', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const homeOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log('Homepage scrollWidth vs innerWidth:', homeOverflow);

  const reviews = await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-framer-name="Review Card"]');
    const authors = [];
    cards.forEach(c => {
      const p = c.querySelector('.framer-p9tssz p');
      if (p) authors.push(p.textContent.trim());
    });
    return authors;
  });
  console.log('Homepage review authors rendered:', reviews);

  console.log('--- Testing Subpage: /venues/open-earth-lawn (375x812) ---');
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const subOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log('Subpage scrollWidth vs innerWidth:', subOverflow);

  const mapChipStyle = await page.evaluate(() => {
    const chip = document.querySelector('.casa-map-chip.active-venue-chip');
    if (!chip) return null;
    const computed = window.getComputedStyle(chip);
    return {
      bg: computed.backgroundColor,
      color: computed.color,
      borderRadius: computed.borderRadius,
      padding: computed.padding,
      text: chip.textContent.trim()
    };
  });
  console.log('Subpage Map Chip Computed Style:', mapChipStyle);

  const footerStyle = await page.evaluate(() => {
    const legalBar = document.querySelector('footer.framer-18na9ah .framer-j9pwx');
    if (!legalBar) return null;
    const computed = window.getComputedStyle(legalBar);
    return {
      flexDirection: computed.flexDirection,
      alignItems: computed.alignItems,
      gap: computed.gap
    };
  });
  console.log('Subpage Footer Legal Bar Computed Style:', footerStyle);

  await browser.close();
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
