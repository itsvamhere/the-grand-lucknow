import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function checkOverlap() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll so that Location header is near the top
  const locElem = page.locator('.framer-tfszgi[data-framer-name="Location"]');
  await locElem.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Take screenshot at this scroll position
  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_debug_overlap.png' });

  // Find all elements around top-left (x < 300, y < 150) in viewport:
  const elements = await page.evaluate(() => {
    const list = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= 120 && rect.left >= 0 && rect.left <= 300 && rect.width > 0 && rect.height > 0) {
        const text = el.innerText ? el.innerText.trim() : '';
        if (text && el.children.length === 0) {
          list.push({
            tag: el.tagName,
            cls: el.className,
            text: text,
            rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
            styles: {
              position: window.getComputedStyle(el).position,
              color: window.getComputedStyle(el).color,
              fontFamily: window.getComputedStyle(el).fontFamily,
              fontSize: window.getComputedStyle(el).fontSize,
              zIndex: window.getComputedStyle(el).zIndex
            }
          });
        }
      }
    }
    return list;
  });

  console.log('Top-left text elements in viewport:', elements);

  await browser.close();
}

checkOverlap().catch(console.error);
