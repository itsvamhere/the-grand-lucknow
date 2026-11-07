import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3";

async function run() {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Screenshot hero area
  await page.screenshot({
    path: path.join(artifactsDir, "hero_current_desktop.png")
  });
  console.log('Saved hero_current_desktop.png');

  // Inspect hero text elements
  const info = await page.evaluate(() => {
    const hero = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('section');
    const nodes = [];
    if (hero) {
      const all = hero.querySelectorAll('*');
      all.forEach(el => {
        if (el.children.length === 0 && el.textContent.trim()) {
          const cs = window.getComputedStyle(el);
          nodes.push({
            tag: el.tagName,
            text: el.textContent.trim(),
            color: cs.color,
            fontSize: cs.fontSize,
            fontFamily: cs.fontFamily,
            opacity: cs.opacity,
            rect: el.getBoundingClientRect()
          });
        }
      });
    }

    // Also look for Big Text or first 3 sections
    const sections = [];
    document.querySelectorAll('section, [data-framer-name]').forEach(s => {
      const name = s.getAttribute('data-framer-name');
      if (name) {
        sections.push({
          name,
          tag: s.tagName,
          rect: s.getBoundingClientRect(),
          textSnippet: s.textContent.trim().substring(0, 100)
        });
      }
    });

    return { heroNodes: nodes, sections: sections.slice(0, 15) };
  });

  console.log('Hero Nodes:', JSON.stringify(info.heroNodes, null, 2));
  console.log('Sections:', JSON.stringify(info.sections, null, 2));

  await browser.close();
}

run().catch(console.error);
