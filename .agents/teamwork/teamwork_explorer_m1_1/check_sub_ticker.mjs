import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Check animation status of ul.grand-ticker-track
  const animStatus = await page.evaluate(() => {
    const track = document.querySelector('ul.grand-ticker-track');
    if (!track) return 'No track found!';
    const cs = window.getComputedStyle(track);
    const rect = track.getBoundingClientRect();
    const parentRect = track.parentElement.getBoundingClientRect();
    const items = Array.from(track.querySelectorAll('li')).map(li => {
      const r = li.getBoundingClientRect();
      return { width: r.width, left: r.left };
    });
    return {
      animation: cs.animation,
      animationPlayState: cs.animationPlayState,
      transform: cs.transform,
      trackRect: { width: rect.width, left: rect.left },
      parentRect: { width: parentRect.width, left: parentRect.left },
      itemsCount: items.length,
      items: items
    };
  });

  console.log('SUBPAGE TICKER STATUS:', JSON.stringify(animStatus, null, 2));

  await browser.close();
}

main().catch(console.error);
