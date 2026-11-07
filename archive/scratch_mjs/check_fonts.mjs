import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('https://casamomo.at', { waitUntil: 'domcontentloaded' });
  
  const headings = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('*').forEach(el => {
      const text = el.innerText ? el.innerText.trim() : '';
      if (text.includes('CASA') || text.includes('MOMO') || text.includes('Boutique')) {
        const style = window.getComputedStyle(el);
        list.push({
          tag: el.tagName,
          text: text.slice(0, 40),
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight
        });
      }
    });
    return list.slice(0, 10);
  });
  
  console.log('Casamomo Headings:', JSON.stringify(headings, null, 2));

  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'domcontentloaded' });
  const grandHeadings = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('*').forEach(el => {
      const text = el.innerText ? el.innerText.trim() : '';
      if (text.includes('GRAND') || text.includes('LUCKNOW')) {
        const style = window.getComputedStyle(el);
        list.push({
          tag: el.tagName,
          text: text.slice(0, 40),
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight
        });
      }
    });
    return list.slice(0, 10);
  });
  console.log('Grand Headings:', JSON.stringify(grandHeadings, null, 2));

  await browser.close();
}

run();
