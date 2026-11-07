import path from 'path';
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function inspectFooterDetails() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const footerDetails = await page.evaluate(() => {
    const footer = document.querySelector('footer, [data-framer-name="Footer"]');
    if (!footer) return 'No footer found';

    // Find all text elements inside footer
    const all = footer.querySelectorAll('*');
    const texts = [];
    for (const el of all) {
      if (el.children.length === 0 && el.textContent.trim()) {
        const style = window.getComputedStyle(el);
        texts.push({
          tag: el.tagName,
          text: el.textContent.trim(),
          fs: style.fontSize,
          ff: style.fontFamily,
          color: style.color,
          cls: el.parentElement.className
        });
      }
    }
    return {
      footerClasses: footer.className,
      texts
    };
  });

  console.log('Footer details from live casamomo.at:');
  console.dir(footerDetails, { depth: null });
  await browser.close();
}

inspectFooterDetails().catch(console.error);
