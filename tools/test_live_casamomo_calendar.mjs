import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/book/apartment?apartment=boutique-n1', { waitUntil: 'networkidle' });
  
  // Click on "Arrival" button (Add date)
  const buttons = await page.$$('button');
  console.log('Found buttons:', buttons.length);
  for (const b of buttons) {
    const text = await b.innerText();
    if (text.includes('Arrival') || text.includes('Add date')) {
      console.log('Clicking Arrival button...');
      await b.click();
      break;
    }
  }

  await page.waitForTimeout(500);

  // Take screenshot of opened calendar
  await page.screenshot({ path: 'tools/proofs/casamomo_live_calendar.png' });
  console.log('Captured casamomo_live_calendar.png!');

  // Inspect the calendar dialog DOM
  const calDialogHtml = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]') || document.querySelector('.casa-bk-calendar') || document.querySelector('[aria-haspopup="dialog"][aria-expanded="true"]');
    // find popup
    const pop = Array.from(document.querySelectorAll('div, dialog')).find(el => el.innerText && el.innerText.includes('November') && el.innerText.includes('December'));
    return pop ? pop.outerHTML : 'Popup not found by text search';
  });

  console.log('Calendar Popup HTML (first 1500 chars):');
  console.log(calDialogHtml?.slice(0, 1500));

  await browser.close();
})();
