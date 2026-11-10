import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false, hasTouch: false },
  { name: 'tablet',  width: 768,  height: 1024, isMobile: true,  hasTouch: true },
  { name: 'mobile',  width: 375,  height: 812,  isMobile: true,  hasTouch: true }
];

const PAGES_TO_TEST = [
  { name: 'home', path: '/' },
  { name: 'venue_subpage', path: '/venues/open-earth-lawn' },
  { name: 'booking_page', path: '/book/venue' }
];

async function runAudit() {
  const outDir = resolve(process.cwd(), '.previews');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const report = {};

  for (const p of PAGES_TO_TEST) {
    const pageUrl = `http://localhost:3003${p.path}`;
    report[p.name] = {};

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
        deviceScaleFactor: vp.isMobile ? 2 : 1
      });

      const page = await context.newPage();
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', err => consoleErrors.push(err.message));

      try {
        await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 20000 });
        await page.waitForTimeout(1000);

        // Deep bounding box overflow evaluation
        const overflow = await page.evaluate(() => {
          const docW = document.documentElement.clientWidth || window.innerWidth;
          const allEls = Array.from(document.querySelectorAll('body *'));
          const bleeding = [];

          for (const el of allEls) {
            if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'DEFS'].includes(el.tagName)) continue;
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;

            if (r.right > docW + 1.5) {
              bleeding.push({
                tag: el.tagName.toLowerCase(),
                id: el.id || '',
                className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 40) : '',
                excessPx: Math.round(r.right - docW)
              });
            }
            if (bleeding.length >= 8) break;
          }

          return {
            scrollW: document.documentElement.scrollWidth,
            clientW: docW,
            hasRootOverflow: document.documentElement.scrollWidth > docW + 1.5,
            bleedingCount: bleeding.length,
            bleedingSamples: bleeding
          };
        });

        // Sticky button check
        const stickyBtn = await page.evaluate(() => {
          const btn = document.querySelector('a[href*="/book/venue"], button[class*="sticky"], div[class*="sticky"]');
          if (!btn) return null;
          const r = btn.getBoundingClientRect();
          const style = window.getComputedStyle(btn);
          return {
            visible: r.width > 0 && r.height > 0,
            zIndex: style.zIndex,
            position: style.position
          };
        });

        const screenshotPath = `${outDir}/${p.name}_${vp.name}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });

        report[p.name][vp.name] = {
          url: pageUrl,
          overflow,
          stickyBtn,
          consoleErrorsCount: consoleErrors.length,
          consoleErrors: consoleErrors.slice(0, 3),
          screenshot: screenshotPath
        };

      } catch (err) {
        report[p.name][vp.name] = { error: err.message };
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

runAudit().catch(console.error);
