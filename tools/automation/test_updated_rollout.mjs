import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function testUpdated() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
  
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Test across the rollout range: 5050 to 5550 with 50px steps
  for (let y = 5050; y <= 5550; y += 50) {
    await page.evaluate((scrollY) => { window.scrollTo(0, scrollY); }, y);
    await page.waitForTimeout(60);
    
    const snap = await page.evaluate(() => {
      const words = Array.from(document.querySelectorAll('.grand-hero-word')).map(w => ({
        text: w.innerText,
        opacity: window.getComputedStyle(w).opacity,
        transform: window.getComputedStyle(w).transform
      }));
      const bg = window.getComputedStyle(document.body).backgroundColor;
      const btn = document.querySelector('[data-framer-name="Sticky Button"] a');
      const pill = document.querySelector('[data-framer-name="Sticky Header Text"] [data-framer-name="Menu Title"]');
      
      return {
        scrollY: window.scrollY,
        bg,
        btnTheme: btn ? btn.getAttribute('data-framer-name') : null,
        pillOpacity: pill ? window.getComputedStyle(pill).opacity : null,
        words: words.slice(0, 3)
      };
    });
    console.log(`y=${y}:`, JSON.stringify(snap));
    await page.screenshot({ path: `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/updated_lawn_y${y}.png` });
  }

  await browser.close();
}

testUpdated().catch(console.error);
