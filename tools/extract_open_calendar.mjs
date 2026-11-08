import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/book/apartment?apartment=boutique-n1', { waitUntil: 'networkidle' });
  
  // Do NOT click - inspect initial open calendar!
  const calInfo = await page.evaluate(() => {
    // Find any element containing calendar dates or month names
    const allDivs = Array.from(document.querySelectorAll('div, form, section, aside'));
    const cal = allDivs.find(d => {
      const t = d.innerText || '';
      return t.includes('Mo') && t.includes('Tu') && t.includes('We') && t.includes('Th') && t.includes('Fr') && t.includes('Sa') && t.includes('Su');
    });
    
    if (!cal) return { error: 'No calendar found' };
    
    return {
      tagName: cal.tagName,
      className: cal.className,
      id: cal.id,
      style: cal.getAttribute('style'),
      parentTag: cal.parentElement?.tagName,
      parentClass: cal.parentElement?.className,
      outerHTML: cal.outerHTML
    };
  });
  
  console.log('Calendar found:', !calInfo.error);
  if (calInfo.outerHTML) {
    console.log('Calendar HTML length:', calInfo.outerHTML.length);
    console.log('Calendar class:', calInfo.className);
    console.log('Calendar style:', calInfo.style);
    console.log('First 1000 chars:\n', calInfo.outerHTML.slice(0, 1000));
    
    // Save full calendar HTML to file for exact replication
    const fs = await import('fs');
    fs.writeFileSync('tools/casamomo_live_calendar_snippet.html', calInfo.outerHTML);
    console.log('Saved tools/casamomo_live_calendar_snippet.html');
  }
  
  await browser.close();
})();
