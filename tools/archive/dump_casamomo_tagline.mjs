import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.casamomo.at/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const el = document.querySelector('.framer-153bgu-container');
    const heroTagline = document.querySelector('.framer-1mzmlpu');
    
    // Get computed styles for tagline and its children
    function getStyles(e) {
      if (!e) return null;
      const s = window.getComputedStyle(e);
      return {
        tag: e.tagName,
        className: e.className,
        display: s.display,
        position: s.position,
        top: s.top,
        left: s.left,
        bottom: s.bottom,
        right: s.right,
        width: s.width,
        height: s.height,
        padding: s.padding,
        margin: s.margin,
        flexDirection: s.flexDirection,
        justifyContent: s.justifyContent,
        alignItems: s.alignItems,
        color: s.color,
        fontSize: s.fontSize,
        fontFamily: s.fontFamily,
        letterSpacing: s.letterSpacing,
        lineHeight: s.lineHeight,
        zIndex: s.zIndex,
        background: s.background
      };
    }

    const taglineChildrenStyles = [];
    if (heroTagline) {
      heroTagline.querySelectorAll('*').forEach(child => {
        taglineChildrenStyles.push(getStyles(child));
      });
    }

    return {
      containerHTML: el ? el.outerHTML : '',
      taglineHTML: heroTagline ? heroTagline.outerHTML : '',
      taglineStyles: getStyles(heroTagline),
      taglineChildrenStyles
    };
  });

  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/casamomo_hero_tagline.json', JSON.stringify(data, null, 2));
  console.log('Saved tagline details!');

  await browser.close();
}

main().catch(console.error);
