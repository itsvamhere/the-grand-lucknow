import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';

async function testNavbarAndButton() {
  console.log('=== TEST ACCEPTANCE CRITERIA 1, 2, 3 ===');

  // AC 3: index.html remains completely unchanged
  const indexStat = fs.statSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html');
  console.log('index.html size:', indexStat.size);
  console.log('index.html mtime:', indexStat.mtime.toISOString());
  const ac3Pass = indexStat.size === 871500 && indexStat.mtime.toISOString() === '2026-11-04T09:24:58.565Z';
  console.log('AC 3 (index.html unchanged):', ac3Pass ? 'PASS' : 'FAIL');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Load index.html via server
  await page.goto('http://localhost:3003/', { waitUntil: 'load' });
  const indexNav = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('header nav a, header a[data-framer-name="Nav Link"]'))
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
      });
    const btn = document.querySelector('header .framer-18mvsw1-container a, header a.framer-vO7O2');
    const btnStyle = btn ? window.getComputedStyle(btn) : null;
    return {
      links: anchors.map(a => ({
        text: (a.querySelector('span[data-rolling-label] > span') || a).innerText.trim(),
        href: a.getAttribute('href')
      })),
      button: btn ? {
        text: (btn.querySelector('span[data-rolling-label] > span') || btn).innerText.trim(),
        href: btn.getAttribute('href'),
        bg: btnStyle.backgroundColor,
        color: btnStyle.color,
        border: btnStyle.border,
        borderRadius: btnStyle.borderRadius,
        height: btnStyle.height
      } : null
    };
  });
  console.log('Index.html Visible Nav:', indexNav);

  // Load open-earth-lawn.html via server
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  const lawnNav = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('header nav a, header a[data-framer-name="Nav Link"]'))
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
      });
    const btn = document.querySelector('header .framer-18mvsw1-container a, header a.framer-vO7O2');
    const btnStyle = btn ? window.getComputedStyle(btn) : null;
    return {
      links: anchors.map(a => ({
        text: (a.querySelector('span[data-rolling-label] > span') || a).innerText.trim(),
        href: a.getAttribute('href')
      })),
      button: btn ? {
        text: (btn.querySelector('span[data-rolling-label] > span') || btn).innerText.trim(),
        href: btn.getAttribute('href'),
        bg: btnStyle.backgroundColor,
        color: btnStyle.color,
        border: btnStyle.border,
        borderRadius: btnStyle.borderRadius,
        height: btnStyle.height
      } : null
    };
  });
  console.log('Open Earth Lawn Visible Nav:', lawnNav);

  // Compare links
  const linksMatch = JSON.stringify(indexNav.links) === JSON.stringify(lawnNav.links);
  console.log('AC 1 (Links match):', linksMatch ? 'PASS' : 'FAIL');

  // Compare button
  const btnBgMatch = lawnNav.button.bg === 'rgb(255, 240, 202)';
  const btnColorMatch = lawnNav.button.color === 'rgb(14, 18, 1)';
  const btnBorderMatch = lawnNav.button.border === '0px none rgb(14, 18, 1)';
  const btnRadiusMatch = lawnNav.button.borderRadius === '2px';
  console.log('AC 2 Button Properties:');
  console.log('  bg:', lawnNav.button.bg, btnBgMatch ? 'PASS' : 'FAIL');
  console.log('  color:', lawnNav.button.color, btnColorMatch ? 'PASS' : 'FAIL');
  console.log('  border:', lawnNav.button.border, btnBorderMatch ? 'PASS' : 'FAIL');
  console.log('  borderRadius:', lawnNav.button.borderRadius, btnRadiusMatch ? 'PASS' : 'FAIL');

  await browser.close();
}

testNavbarAndButton().catch(console.error);
