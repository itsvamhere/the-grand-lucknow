import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/book/apartment?apartment=boutique-n1', { waitUntil: 'networkidle' });
  
  // Click Arrival
  const arrivalBtn = page.locator('button:has-text("Arrival")');
  await arrivalBtn.click();
  await page.waitForTimeout(1000);
  
  const dialogInfo = await page.evaluate(() => {
    // Look for all elements containing "November"
    const els = Array.from(document.querySelectorAll('*')).filter(el => {
      const directText = Array.from(el.childNodes)
        .filter(n => n.nodeType === 3)
        .map(n => n.textContent.trim())
        .join(' ');
      return directText.includes('November') || (el.children.length > 0 && el.innerText && el.innerText.includes('November 2026') && el.innerText.includes('December 2026'));
    });
    
    // Find the topmost container of the calendar
    const calContainer = Array.from(document.querySelectorAll('*')).find(el => {
      return el.innerText && el.innerText.includes('November 2026') && el.innerText.includes('December 2026') && !el.parentElement?.innerText?.includes('Check Availability');
    }) || Array.from(document.querySelectorAll('*')).find(el => el.innerText && el.innerText.includes('November 2026') && el.innerText.includes('December 2026'));

    return {
      outerHTML: calContainer ? calContainer.outerHTML : 'Not found',
      className: calContainer?.className,
      style: calContainer?.getAttribute('style')
    };
  });
  
  console.log('Dialog outerHTML length:', dialogInfo.outerHTML?.length);
  console.log('Dialog outerHTML sample:', dialogInfo.outerHTML?.slice(0, 2000));
  
  // Also take screenshot
  await page.screenshot({ path: 'tools/proofs/live_cal_proof.png' });
  
  await browser.close();
})();
