import { chromium } from 'playwright-core';

async function inspectLiveDomain() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to https://www.thegrandlucknow.in ...');
  await page.goto('https://www.thegrandlucknow.in', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Get title and meta
  const title = await page.title();
  console.log('Page Title:', title);

  // Extract all text content or sections
  const headings = await page.locator('h1, h2, h3, h4').evaluateAll(els => 
    els.map(el => ({ tag: el.tagName, text: el.innerText.trim() })).filter(e => e.text.length > 0)
  );
  console.log('Headings found:', headings);

  // Find all links
  const links = await page.locator('a').evaluateAll(els => 
    els.map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') })).filter(a => a.href)
  );
  console.log('Links count:', links.length);
  const venueLinks = links.filter(l => l.href.includes('venue') || l.text.toLowerCase().includes('venue') || l.text.toLowerCase().includes('lawn') || l.text.toLowerCase().includes('ballroom'));
  console.log('Venue-related links:', venueLinks);

  // Search for venue cards / names across the entire page
  const pageText = await page.evaluate(() => document.body.innerText);
  console.log('\n--- Page text length ---', pageText.length);

  // Check if there are specific venue sections
  const cards = await page.locator('[class*="venue"], [class*="card"], [class*="item"]').evaluateAll(els =>
    els.map(el => el.innerText.trim()).filter(t => t.length > 10 && t.length < 500)
  );
  console.log('\nPotential cards (first 10):', cards.slice(0, 10));

  // Check navigation items
  const navItems = await page.locator('nav a, header a').evaluateAll(els => 
    els.map(el => ({ text: el.innerText.trim(), href: el.getAttribute('href') }))
  );
  console.log('\nNav items:', navItems);

  // Navigate to any venues page if it exists
  const venuesNav = links.find(l => l.href.includes('/venues') || l.text.toLowerCase() === 'venues');
  if (venuesNav) {
    console.log('\nFound venues link:', venuesNav);
    try {
      await page.goto(new URL(venuesNav.href, 'https://www.thegrandlucknow.in').href, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      const vHeadings = await page.locator('h1, h2, h3, h4').evaluateAll(els => 
        els.map(el => ({ tag: el.tagName, text: el.innerText.trim() })).filter(e => e.text.length > 0)
      );
      console.log('Headings on venues page:', vHeadings);
      const vPageText = await page.evaluate(() => document.body.innerText);
      console.log('Venues page text sample:\n', vPageText.slice(0, 2000));
    } catch (e) {
      console.log('Error navigating to venues page:', e.message);
    }
  }

  await browser.close();
}

inspectLiveDomain().catch(console.error);
