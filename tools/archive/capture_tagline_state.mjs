import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3";

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  
  // Wait for Variant 3 animation to finish
  await page.waitForTimeout(4500);

  // Take screenshot of desktop hero with tagline
  await page.screenshot({
    path: path.join(artifactsDir, "hero_variant3_tagline_desktop.png")
  });
  console.log('Saved hero_variant3_tagline_desktop.png');

  // Inspect the tagline details
  const details = await page.evaluate(() => {
    const tagline = document.querySelector('.framer-1mzmlpu');
    const subtitleContainer = document.querySelector('.framer-1o6x5q9-container');
    const p = subtitleContainer?.querySelector('p');
    const spans = p ? Array.from(p.querySelectorAll('span')).map(s => ({
      text: s.textContent,
      color: window.getComputedStyle(s).color,
      fontSize: window.getComputedStyle(s).fontSize,
      fontFamily: window.getComputedStyle(s).fontFamily,
      fontWeight: window.getComputedStyle(s).fontWeight,
      opacity: window.getComputedStyle(s).opacity
    })) : [];

    const bgBehind = [];
    let curr = subtitleContainer;
    while (curr && curr !== document.body) {
      bgBehind.push({
        tag: curr.tagName,
        cls: curr.className,
        bg: window.getComputedStyle(curr).backgroundColor,
        backdropFilter: window.getComputedStyle(curr).backdropFilter,
        filter: window.getComputedStyle(curr).filter
      });
      curr = curr.parentElement;
    }

    return {
      taglineRect: tagline?.getBoundingClientRect(),
      subtitleRect: subtitleContainer?.getBoundingClientRect(),
      pStyle: p ? {
        color: window.getComputedStyle(p).color,
        fontSize: window.getComputedStyle(p).fontSize,
        fontFamily: window.getComputedStyle(p).fontFamily,
        textShadow: window.getComputedStyle(p).textShadow,
        lineHeight: window.getComputedStyle(p).lineHeight,
        letterSpacing: window.getComputedStyle(p).letterSpacing
      } : null,
      spans: spans.slice(0, 8),
      bgBehind
    };
  });

  console.log('Tagline details:', JSON.stringify(details, null, 2));

  await browser.close();
}

main().catch(console.error);
