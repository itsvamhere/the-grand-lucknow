import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function extractLiveHomeFooter() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://the-grand-lucknow.vercel.app', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  const footerHtml = await page.evaluate(() => {
    const f = document.querySelector('footer');
    return f ? f.outerHTML : null;
  });
  
  fs.writeFileSync('tools/live_home_footer.html', footerHtml, 'utf8');
  console.log('Saved live_home_footer.html, length:', footerHtml.length);
  
  // Also check ticker scripts and styles
  const tickerStyles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('style')).map(s => ({ id: s.id, content: s.innerHTML.slice(0, 200) })).filter(s => s.content.includes('ticker') || s.content.includes('marquee') || s.content.includes('Footer'));
  });
  console.log('Ticker styles on home:', tickerStyles);
  
  const tickerScripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script')).map(s => ({ id: s.id, content: s.innerHTML.slice(0, 200) })).filter(s => s.content.includes('ticker') || s.content.includes('marquee') || s.content.includes('Footer') || s.content.includes('grand-ticker'));
  });
  console.log('Ticker scripts on home:', tickerScripts);

  await browser.close();
}

extractLiveHomeFooter().catch(console.error);
