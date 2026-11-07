import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Let's inspect the hero H1 words initially
  const initialWords = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
      text: w.innerText,
      rect: w.getBoundingClientRect(),
      opacity: window.getComputedStyle(w).opacity,
      transform: window.getComputedStyle(w).transform,
      visible: window.getComputedStyle(w).visibility,
      parentRect: w.parentElement?.getBoundingClientRect()
    }));
    return words;
  });
  console.log('INITIAL WORDS (y=0):', JSON.stringify(initialWords, null, 2));

  // Now let's test scrolling through the page from y=0 to y=8000 in steps of 500px
  // and see what happens to the words and when Photo 6 appears!
  const scrollSteps = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 7500, 8000];
  for (const y of scrollSteps) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);

    const stepData = await page.evaluate((top) => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
        text: w.innerText,
        rect: { x: Math.round(w.getBoundingClientRect().x), y: Math.round(w.getBoundingClientRect().y), w: Math.round(w.getBoundingClientRect().width), h: Math.round(w.getBoundingClientRect().height) },
        opacity: window.getComputedStyle(w).opacity,
        transform: w.style.transform
      }));
      return {
        y: window.scrollY,
        p6Rect: p6 ? { y: Math.round(p6.getBoundingClientRect().y), h: Math.round(p6.getBoundingClientRect().height) } : null,
        words: words.slice(0, 3)
      };
    }, y);
    console.log(`\nAt y=${y}:`, JSON.stringify(stepData));
  }

  await browser.close();
})();
