import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/book/apartment?apartment=boutique-n1', { waitUntil: 'networkidle' });
  
  // Find available days in November
  // Let's find buttons with data-day
  const day15 = page.locator('button[data-day="2026-11-15"], button:has-text("15")').first();
  await day15.click();
  await page.waitForTimeout(500);
  
  const day20 = page.locator('button[data-day="2026-11-20"], button:has-text("20")').first();
  await day20.click();
  await page.waitForTimeout(500);
  
  // Inspect selected buttons styling
  const styles = await page.evaluate(() => {
    const selBtns = Array.from(document.querySelectorAll('button[data-day], button[aria-pressed="true"]')).filter(b => {
      return b.style.background && b.style.background !== 'transparent';
    });
    return selBtns.map(b => ({
      day: b.getAttribute('data-day') || b.innerText,
      bg: b.style.background,
      color: b.style.color,
      radius: b.style.borderRadius,
      outer: b.outerHTML.slice(0, 300)
    }));
  });
  
  console.log('Selected buttons styles:', styles);
  
  // Also check Arrival and Departure buttons in search bar
  const searchValues = await page.evaluate(() => {
    const arr = document.querySelector('button:has-text("Arrival") span:nth-child(2)')?.innerText;
    const dep = document.querySelector('button:has-text("Departure") span:nth-child(2)')?.innerText;
    return { arr, dep };
  });
  console.log('Search bar updated values:', searchValues);
  
  await browser.close();
})();
