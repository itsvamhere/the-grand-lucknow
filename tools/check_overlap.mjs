import { chromium } from 'playwright-core';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const overlapInfo = await page.evaluate(() => {
    const f = document.querySelector('footer.framer-18na9ah');
    const ticker = f.querySelector('.framer-n49p1z');
    const ul = ticker ? ticker.querySelector('ul') : null;
    const lis = ul ? Array.from(ul.querySelectorAll('li')) : [];
    
    return {
      ulChildrenCount: ul ? ul.children.length : 0,
      ulHtml: ul ? ul.outerHTML.slice(0, 1000) : null,
      lis: lis.map(li => ({
        className: li.className,
        rect: li.getBoundingClientRect(),
        style: li.getAttribute('style'),
        childDivs: Array.from(li.querySelectorAll('div')).map(d => ({
          className: d.className,
          bgImg: window.getComputedStyle(d).backgroundImage.slice(0, 100),
          rect: d.getBoundingClientRect()
        }))
      }))
    };
  });
  console.log('Overlap Info:', JSON.stringify(overlapInfo, null, 2));

  await browser.close();
}

test().catch(console.error);
