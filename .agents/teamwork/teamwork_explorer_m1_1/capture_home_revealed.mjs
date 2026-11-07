import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3003/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Scroll in steps to trigger Framer scroll transforms
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Total height:', totalHeight);

  for (let y = 0; y <= totalHeight; y += 800) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate((pos) => window.scrollTo(0, pos), totalHeight);
  await page.waitForTimeout(2000);

  const homeFooter = page.locator('footer.framer-18na9ah');
  await homeFooter.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/teamwork_explorer_m1_1/proof_home_footer_revealed.png' });

  // Inspect the styles of home footer elements
  const details = await page.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    const footerTest = footer.querySelector('[data-framer-name="Footer Test"]');
    const desktop = footer.querySelector('[data-framer-name="Desktop"]');
    const ticker = footer.querySelector('[data-framer-name="Footer Logo"]');
    const tickerTrack = ticker ? ticker.querySelector('ul') : null;
    const tickerItem = ticker ? ticker.querySelector('li') : null;
    const tickerSvgDiv = ticker ? ticker.querySelector('.framer-xj8hz2') : null;

    return {
      footerStyle: footer ? window.getComputedStyle(footer).cssText : '',
      footerTestComputed: footerTest ? {
        opacity: window.getComputedStyle(footerTest).opacity,
        transform: window.getComputedStyle(footerTest).transform,
      } : null,
      desktopComputed: desktop ? {
        width: window.getComputedStyle(desktop).width,
        height: window.getComputedStyle(desktop).height,
        padding: window.getComputedStyle(desktop).padding,
        gap: window.getComputedStyle(desktop).gap,
        backgroundColor: window.getComputedStyle(desktop).backgroundColor,
      } : null,
      tickerComputed: ticker ? {
        width: window.getComputedStyle(ticker).width,
        height: window.getComputedStyle(ticker).height,
        overflow: window.getComputedStyle(ticker).overflow,
      } : null,
      tickerTrackComputed: tickerTrack ? {
        width: window.getComputedStyle(tickerTrack).width,
        height: window.getComputedStyle(tickerTrack).height,
        gap: window.getComputedStyle(tickerTrack).gap,
        transform: window.getComputedStyle(tickerTrack).transform,
      } : null,
      tickerSvgDivComputed: tickerSvgDiv ? {
        width: window.getComputedStyle(tickerSvgDiv).width,
        height: window.getComputedStyle(tickerSvgDiv).height,
        backgroundImage: window.getComputedStyle(tickerSvgDiv).backgroundImage.substring(0, 80),
      } : null
    };
  });

  console.log('HOME FOOTER DETAILS:', JSON.stringify(details, null, 2));

  await browser.close();
}

main().catch(console.error);
