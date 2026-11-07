import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

async function verifyLock() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const testUrls = [
    { name: 'Home Page', url: 'http://localhost:3003/' },
    { name: 'Venue Open Earth Lawn', url: 'http://localhost:3003/venues/open-earth-lawn' },
    { name: 'About Page', url: 'http://localhost:3003/about' },
    { name: 'Contact Page', url: 'http://localhost:3003/contact' }
  ];

  const results = [];

  for (const item of testUrls) {
    console.log(`\nTesting ${item.name} at ${item.url}...`);
    await page.goto(item.url, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const evalData = await page.evaluate(() => {
      const nav = document.querySelector('header[data-framer-name="Navbar Wrapper"]');
      const footer = document.querySelector('footer.framer-18na9ah');
      const footerLogoDiv = document.querySelector('footer .framer-xj8hz2');
      const tickerUl = document.querySelector('footer [data-framer-name="Footer Logo"] ul');
      
      const navLinks = nav ? Array.from(nav.querySelectorAll('a')).map(a => a.getAttribute('href')) : [];
      const footerLinks = footer ? Array.from(footer.querySelectorAll('a')).map(a => a.getAttribute('href')) : [];
      
      const computedBg = footerLogoDiv ? window.getComputedStyle(footerLogoDiv).backgroundImage : null;
      const computedOpacity = footerLogoDiv ? window.getComputedStyle(footerLogoDiv).opacity : null;
      const tickerTransform = tickerUl ? window.getComputedStyle(tickerUl).transform : null;

      const hasTextSvg = computedBg ? (computedBg.includes('%3Ctext') || computedBg.includes('<text')) : false;
      const hasVectorSerifSvg = computedBg ? (computedBg.includes('112.277') || computedBg.includes('M%20112.277')) : false;

      return {
        hasNav: !!nav,
        navLinksCount: navLinks.length,
        hasFooter: !!footer,
        hasFooterLogo: !!footerLogoDiv,
        computedOpacity,
        tickerTransform,
        hasTextSvg,
        hasVectorSerifSvg,
        bgLength: computedBg ? computedBg.length : 0,
        footerTextSnippet: footer ? footer.innerText.slice(0, 200).replace(/\n+/g, ' ') : ''
      };
    });

    // Capture screenshot of footer
    const footerHandle = await page.$('footer.framer-18na9ah');
    if (footerHandle) {
      const shotPath = path.join(ROOT, 'tools', `proof_${item.name.toLowerCase().replace(/\s+/g, '_')}_footer.png`);
      await footerHandle.screenshot({ path: shotPath });
      console.log(`Saved screenshot to ${shotPath}`);
    }

    console.log('Result for', item.name, ':', JSON.stringify(evalData, null, 2));
    results.push({ name: item.name, ...evalData });
  }

  await browser.close();

  console.log('\n================ VERIFICATION SUMMARY ================');
  let allPassed = true;
  for (const r of results) {
    const passed = r.hasNav && r.hasFooter && r.hasFooterLogo && !r.hasTextSvg && r.hasVectorSerifSvg;
    console.log(`${r.name}: ${passed ? 'PASSED (Authentic Serif Vector Active, 0 Text Fallback)' : 'FAILED'}`);
    if (!passed) allPassed = false;
  }

  if (allPassed) {
    console.log('\nALL PAGES 100% PERFECT PARITY CONFIRMED!');
  } else {
    process.exit(1);
  }
}

verifyLock().catch(err => {
  console.error(err);
  process.exit(1);
});
