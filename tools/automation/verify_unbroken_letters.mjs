import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);

  // Check each word in footer
  const wordCheck = await page.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    const links = Array.from(footer.querySelectorAll('a'));
    return links.map(link => {
      const groups = Array.from(link.querySelectorAll('span[data-rolling-label] > span[aria-hidden="true"]'));
      const letters = groups.map(g => ({
        char: g.children[1]?.textContent,
        left: Math.round(g.getBoundingClientRect().left),
        top: Math.round(g.getBoundingClientRect().top),
        visible: g.children[1]?.style.transform !== 'translateY(100%)'
      }));
      return {
        word: letters.map(l => l.char).join(''),
        allSameTop: letters.every(l => l.top === letters[0]?.top),
        letters
      };
    });
  });

  console.log('=== WORD INTEGRITY CHECK ===');
  wordCheck.forEach(w => {
    console.log(`Word: "${w.word}" | All on same baseline: ${w.allSameTop}`);
    if (!w.allSameTop) {
      console.log('  Letter tops:', w.letters.map(l => `${l.char}:${l.top}`).join(' '));
    }
  });

  // Screenshot footer columns matching user's Image 2
  const footerColumns = page.locator('footer .framer-1aamxx2');
  await footerColumns.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_subpage_fixed_columns.png' });

  console.log('\nSaved proof_subpage_fixed_columns.png!');
  await browser.close();
})();
