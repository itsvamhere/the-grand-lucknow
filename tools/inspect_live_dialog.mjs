import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/book/apartment?apartment=boutique-n1', { waitUntil: 'networkidle' });
  
  // Find the exact arrival button inside role="search"
  const searchBar = await page.$('[role="search"]');
  const arrBtn = await searchBar.$('button'); // first button in grid is Arrival
  console.log('Arrival button text:', await arrBtn.innerText());
  
  await arrBtn.click();
  await page.waitForTimeout(600);

  // Check aria-expanded
  console.log('aria-expanded:', await arrBtn.getAttribute('aria-expanded'));

  // Find dialog
  const dialogs = await page.$$('[role="dialog"], [aria-modal="true"], .casa-bk-dialog, [data-floating-ui-portal]');
  console.log('Dialogs found:', dialogs.length);

  for (const d of dialogs) {
    console.log('Dialog tag:', await d.evaluate(el => el.tagName), 'class:', await d.evaluate(el => el.className));
    console.log('Dialog innerText snippet:', (await d.innerText()).slice(0, 300));
  }

  // Also check all elements with class containing 'casa' or 'calendar'
  const calEls = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*'))
      .filter(el => (el.className && typeof el.className === 'string' && (el.className.includes('cal') || el.className.includes('dialog') || el.className.includes('popover'))) || el.getAttribute('role') === 'dialog')
      .map(el => ({ tag: el.tagName, class: el.className, text: el.innerText.slice(0, 100) }));
  });
  console.log('Calendar elements:', calEls);

  await browser.close();
})();
