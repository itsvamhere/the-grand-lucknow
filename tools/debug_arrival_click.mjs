import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/book/apartment?apartment=boutique-n1', { waitUntil: 'networkidle' });
  
  // Find all buttons
  const buttons = await page.$$eval('button', btns => btns.map(b => ({
    text: b.innerText,
    ariaExpanded: b.getAttribute('aria-expanded'),
    ariaHasPopup: b.getAttribute('aria-haspopup'),
    outer: b.outerHTML.slice(0, 150)
  })));
  console.log('Buttons:', buttons.filter(b => b.text.includes('Arrival') || b.text.includes('Add date') || b.text.includes('Departure')));
  
  // Click the arrival button
  await page.click('button:has-text("Arrival")');
  await page.waitForTimeout(1000);
  
  // Check aria-expanded
  const expandedBtn = await page.$eval('button:has-text("Arrival")', b => b.getAttribute('aria-expanded'));
  console.log('Arrival button aria-expanded after click:', expandedBtn);
  
  // Check any elements with role dialog
  const dialogs = await page.$$eval('[role="dialog"]', els => els.map(e => e.outerHTML));
  console.log('Dialogs found:', dialogs.length);
  if (dialogs.length > 0) {
    console.log('Dialog 0 snippet:', dialogs[0].slice(0, 500));
  } else {
    // Check all visible text on the page
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('Page text snippet around date:', bodyText.slice(0, 1000));
  }
  
  await browser.close();
})();
