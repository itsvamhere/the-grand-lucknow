import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });

  // 1. Check Navbar on Homepage
  const navbarInfo = await page.evaluate(() => {
    const headers = document.querySelectorAll('header');
    return Array.from(headers).map(h => ({
      class: h.className,
      style: h.getAttribute('style'),
      rect: h.getBoundingClientRect(),
      computedPos: window.getComputedStyle(h).position,
      computedDisplay: window.getComputedStyle(h).display,
      computedTop: window.getComputedStyle(h).top,
      computedZ: window.getComputedStyle(h).zIndex,
      opacity: window.getComputedStyle(h).opacity,
      htmlSnippet: h.outerHTML.slice(0, 200)
    }));
  });
  console.log('Homepage Headers:', JSON.stringify(navbarInfo, null, 2));

  // 2. Check Footer on Homepage
  const footerInfo = await page.evaluate(() => {
    const f = document.querySelector('footer');
    if (!f) return null;
    const ticker = f.querySelector('.framer-xj8hz2') || f.querySelector('.framer-n49p1z');
    return {
      rect: f.getBoundingClientRect(),
      bg: window.getComputedStyle(f).backgroundColor,
      zHQwT_bg: f.querySelector('.framer-zHQwT') ? window.getComputedStyle(f.querySelector('.framer-zHQwT')).backgroundColor : null,
      zHQwT_padding: f.querySelector('.framer-zHQwT') ? window.getComputedStyle(f.querySelector('.framer-zHQwT')).padding : null,
      tickerRect: ticker ? ticker.getBoundingClientRect() : null,
      tickerBgImg: ticker ? window.getComputedStyle(ticker).backgroundImage.slice(0, 150) : null,
      tickerWidth: ticker ? window.getComputedStyle(ticker).width : null,
      tickerHeight: ticker ? window.getComputedStyle(ticker).height : null
    };
  });
  console.log('Homepage Footer:', JSON.stringify(footerInfo, null, 2));

  // Scroll to footer on homepage and capture screenshot
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'tools/live_home_footer_captured.png' });
  console.log('Saved tools/live_home_footer_captured.png');

  // Also capture top of homepage (with navbar)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'tools/live_home_top_captured.png' });
  console.log('Saved tools/live_home_top_captured.png');

  // Also scroll a bit down on homepage and capture sticky navbar
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'tools/live_home_scrolled_captured.png' });
  console.log('Saved tools/live_home_scrolled_captured.png');

  await browser.close();
}

test().catch(console.error);
