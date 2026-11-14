import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const runArg = args.find((a) => a.startsWith('--run='));
const portArg = args.find((a) => a.startsWith('--port='));
const RUN_NUMBER = runArg ? Number(runArg.split('=')[1]) : 1;
const EXPLICIT_PORT = portArg ? Number(portArg.split('=')[1]) : null;

const VIEWPORTS = [
  { tier: 'Phone', label: '375x812', width: 375, height: 812, isMobile: true },
  { tier: 'Phone', label: '390x844', width: 390, height: 844, isMobile: true },
  { tier: 'Phone', label: '430x932', width: 430, height: 932, isMobile: true },
  { tier: 'Tablet', label: '768x1024', width: 768, height: 1024, isMobile: true },
  { tier: 'Tablet', label: '820x1180', width: 820, height: 1180, isMobile: true },
  { tier: 'Laptop', label: '1440x900', width: 1440, height: 900, isMobile: false },
];

const SCROLL_STOPS = [0, 25, 50, 75, 100];

const ALL_CORE_ROUTES = [
  '/',
  '/venues',
  '/venues/open-earth-lawn',
  '/venues/grassland-gala',
  '/venues/garden-galaxy',
  '/venues/the-grand-courtyard',
  '/venues/the-royal-legacy-banquet',
  '/about',
  '/contact',
  '/book/venue',
  '/book/rooms',
  '/imprint',
  '/terms',
  '/privacy',
  '/refunds',
  '/service-delivery',
];

const DEEP_AUDIT_ROUTES_BY_RUN = {
  1: ['/', '/about', '/venues', '/book/rooms', '/imprint'],
  2: ['/'],
  3: ['/venues', '/venues/open-earth-lawn'],
  4: ['/book/venue'],
  5: ['/about', '/contact', '/imprint', '/terms', '/privacy', '/refunds', '/service-delivery'],
  6: ['/book/rooms'],
  7: ALL_CORE_ROUTES,
};

const SURFACE_EXPECTED_RGB = {
  dark: 'rgb(20, 18, 14)',
  light: 'rgb(245, 238, 219)',
  'sand-muted': 'rgb(234, 224, 200)',
  taupe: 'rgb(110, 104, 83)',
  terracotta: 'rgb(196, 99, 53)',
  'terracotta-card': 'rgb(184, 93, 59)',
};

function slugifyRoute(route) {
  if (route === '/') return 'home';
  return route.replace(/^\//, '').replace(/\//g, '-');
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address();
      const port = typeof addr === 'object' && addr ? addr.port : 3013;
      srv.close(() => resolve(port));
    });
  });
}

function isServerListening(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function ensureServer() {
  const port = EXPLICIT_PORT ?? (await getFreePort());
  const baseUrl = `http://127.0.0.1:${port}`;

  if (EXPLICIT_PORT) {
    const alreadyUp = await isServerListening(baseUrl);
    if (alreadyUp) {
      return { child: null, baseUrl };
    }
  }

  const nextBin = path.resolve(process.cwd(), 'node_modules/next/dist/bin/next');
  const hasBuild = fs.existsSync(path.resolve(process.cwd(), '.next/BUILD_ID'));
  const subCmd = hasBuild ? 'start' : 'dev';

  const child = spawn(process.execPath, [nextBin, subCmd, '-p', String(port)], {
    cwd: process.cwd(),
    stdio: 'pipe',
    env: { ...process.env, PORT: String(port) },
  });

  let stderrBuf = '';
  child.stderr?.on('data', (chunk) => {
    stderrBuf += chunk.toString();
  });

  const deadline = Date.now() + 45000;
  while (Date.now() < deadline) {
    if (await isServerListening(baseUrl)) {
      return { child, baseUrl };
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  child.kill('SIGTERM');
  throw new Error(`Next.js server failed to start on ${baseUrl}. stderr: ${stderrBuf}`);
}

async function launchBrowser() {
  const defaultExec = chromium.executablePath();
  if (defaultExec && fs.existsSync(defaultExec)) {
    return chromium.launch({ headless: true });
  }

  const winCandidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ];

  for (const exe of winCandidates) {
    if (fs.existsSync(exe)) {
      return chromium.launch({ executablePath: exe, headless: true });
    }
  }

  for (const channel of ['chrome', 'msedge']) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch {
      // Try next channel
    }
  }

  throw new Error('No Chromium, Chrome, or Edge browser executable found for Playwright.');
}

async function runAudit() {
  const screenshotDir = path.resolve(process.cwd(), `.audit-screenshots/run-${RUN_NUMBER}`);
  fs.mkdirSync(screenshotDir, { recursive: true });

  const { child, baseUrl } = await ensureServer();
  const browser = await launchBrowser();

  const tierResults = {
    Phone: { passed: 0, failed: 0, failures: [] },
    Tablet: { passed: 0, failed: 0, failures: [] },
    Laptop: { passed: 0, failed: 0, failures: [] },
  };

  const checkMatrix = {
    'Zero-404 Routes & Favicon': { Phone: 'PASS', Tablet: 'PASS', Laptop: 'PASS', notes: [] },
    'Zero Horizontal Overflow': { Phone: 'PASS', Tablet: 'PASS', Laptop: 'PASS', notes: [] },
    'Single Pointer-Pass Header & Wordmark': { Phone: 'PASS', Tablet: 'PASS', Laptop: 'PASS', notes: [] },
    'Chrome Contrast & Laptop Hover States': { Phone: 'PASS', Tablet: 'PASS', Laptop: 'PASS', notes: [] },
    'Surface Contrast & Opacity Integrity': { Phone: 'PASS', Tablet: 'PASS', Laptop: 'PASS', notes: [] },
    'Image Integrity (Zero &scale-down-to=)': { Phone: 'PASS', Tablet: 'PASS', Laptop: 'PASS', notes: [] },
    'Tap Targets >= 44px (< 1024px)': { Phone: 'PASS', Tablet: 'PASS', Laptop: 'N/A', notes: [] },
    'Mobile Menu Freeze, Close & ^ Button Sync': { Phone: 'PASS', Tablet: 'PASS', Laptop: 'N/A', notes: [] },
  };

  const recordFailure = (checkName, tier, detail) => {
    tierResults[tier].failed += 1;
    tierResults[tier].failures.push(`[${checkName}] ${detail}`);
    if (checkMatrix[checkName]) {
      checkMatrix[checkName][tier] = 'FAIL';
      if (checkMatrix[checkName].notes.length < 4) {
        checkMatrix[checkName].notes.push(`${tier}: ${detail}`);
      }
    }
  };

  const recordPass = (tier) => {
    tierResults[tier].passed += 1;
  };

  try {
    // 1. Verify HTTP 200 across all 12 routes + favicon.svg
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();

      const favRes = await page.goto(`${baseUrl}/favicon.svg`, { waitUntil: 'domcontentloaded' });
      if (!favRes || favRes.status() !== 200) {
        for (const tier of ['Phone', 'Tablet', 'Laptop']) {
          recordFailure('Zero-404 Routes & Favicon', tier, `/favicon.svg returned ${favRes?.status()}`);
        }
      }

      for (const route of ALL_CORE_ROUTES) {
        const res = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
        if (!res || res.status() !== 200) {
          for (const tier of ['Phone', 'Tablet', 'Laptop']) {
            recordFailure('Zero-404 Routes & Favicon', tier, `${route} returned HTTP ${res?.status()}`);
          }
          continue;
        }
        const headAudit = await page.evaluate(() => {
          const iconHref = document.querySelector('link[rel="icon"]')?.getAttribute('href') || '';
          const scripts = Array.from(document.querySelectorAll('script[src]')).map((s) => s.getAttribute('src') || '');
          const unauthorized = scripts.filter((src) =>
            /googletagmanager|google-analytics|connect\.facebook|fbevents|hotjar/i.test(src)
          );
          return { iconHref, unauthorized };
        });
        if (!headAudit.iconHref.includes('/favicon.svg')) {
          recordFailure('Zero-404 Routes & Favicon', 'Laptop', `${route} missing /favicon.svg icon link`);
        }
        if (headAudit.unauthorized.length > 0) {
          recordFailure(
            'Zero-404 Routes & Favicon',
            'Laptop',
            `${route} loaded unauthorized trackers: ${headAudit.unauthorized.join(', ')}`
          );
        }
      }

      await context.close();
    }

    const deepRoutes = DEEP_AUDIT_ROUTES_BY_RUN[RUN_NUMBER] ?? DEEP_AUDIT_ROUTES_BY_RUN[1];

    // 2. Iterate all 6 viewports x deepRoutes x 5 scroll stops
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      await context.addInitScript(() => {
        const parseRgba = (colorStr) => {
          if (!colorStr || colorStr === 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0 };
          }
          const m = colorStr.match(
            /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i
          );
          if (!m) return { r: 0, g: 0, b: 0, a: 0 };
          return {
            r: Number(m[1]),
            g: Number(m[2]),
            b: Number(m[3]),
            a: m[4] !== undefined ? Number(m[4]) : 1,
          };
        };
        const blendRgba = (fg, bg) => {
          const a = Math.max(0, Math.min(1, fg.a));
          return {
            r: fg.r * a + bg.r * (1 - a),
            g: fg.g * a + bg.g * (1 - a),
            b: fg.b * a + bg.b * (1 - a),
            a: 1,
          };
        };
        const relLum = (rgb) => {
          const chan = (c) => {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
          };
          return 0.2126 * chan(rgb.r) + 0.7152 * chan(rgb.g) + 0.0722 * chan(rgb.b);
        };
        const fmtRgb = (rgb) => `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
        const sampleLinearGradientAtY = (bgImage, py, boxTop, boxHeight) => {
          if (!bgImage || !bgImage.includes('linear-gradient') || boxHeight <= 0) return null;
          const innerStart = bgImage.indexOf('(');
          const innerEnd = bgImage.lastIndexOf(')');
          if (innerStart < 0 || innerEnd <= innerStart) return null;
          const body = bgImage.slice(innerStart + 1, innerEnd);
          const stopRegex =
            /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)(?:\s+([\d.]+)(%|px))?/gi;
          const rawStops = [];
          let m;
          while ((m = stopRegex.exec(body)) !== null) {
            let pos = null;
            if (m[5] !== undefined) {
              const v = Number(m[5]);
              pos = m[6] === 'px' ? (v / boxHeight) * 100 : v;
            }
            rawStops.push({
              r: Number(m[1]),
              g: Number(m[2]),
              b: Number(m[3]),
              a: m[4] !== undefined ? Number(m[4]) : 1,
              pos,
            });
          }
          if (rawStops.length === 0) return null;
          if (rawStops[0].pos === null) rawStops[0].pos = 0;
          if (rawStops[rawStops.length - 1].pos === null) rawStops[rawStops.length - 1].pos = 100;
          for (let i = 1; i < rawStops.length - 1; i++) {
            if (rawStops[i].pos === null) {
              rawStops[i].pos = (i / (rawStops.length - 1)) * 100;
            }
          }
          const pct = Math.max(0, Math.min(100, ((py - boxTop) / boxHeight) * 100));
          if (pct <= rawStops[0].pos) return rawStops[0];
          if (pct >= rawStops[rawStops.length - 1].pos) return rawStops[rawStops.length - 1];
          for (let i = 0; i < rawStops.length - 1; i++) {
            const s0 = rawStops[i];
            const s1 = rawStops[i + 1];
            if (pct >= s0.pos && pct <= s1.pos) {
              const span = s1.pos - s0.pos;
              const t = span > 0 ? (pct - s0.pos) / span : 0;
              return {
                r: s0.r + (s1.r - s0.r) * t,
                g: s0.g + (s1.g - s0.g) * t,
                b: s0.b + (s1.b - s0.b) * t,
                a: s0.a + (s1.a - s0.a) * t,
              };
            }
          }
          return rawStops[rawStops.length - 1];
        };
        const sampleImgPixel = (imgEl, px, py) => {
          if (!imgEl || !imgEl.complete || imgEl.naturalWidth <= 0 || imgEl.naturalHeight <= 0) {
            return null;
          }
          const irc = imgEl.getBoundingClientRect();
          if (irc.width <= 0 || irc.height <= 0) return null;
          const nw = imgEl.naturalWidth;
          const nh = imgEl.naturalHeight;
          const fit = getComputedStyle(imgEl).objectFit || 'fill';
          let scaleX = irc.width / nw;
          let scaleY = irc.height / nh;
          if (fit === 'cover') {
            const s = Math.max(scaleX, scaleY);
            scaleX = s;
            scaleY = s;
          } else if (fit === 'contain') {
            const s = Math.min(scaleX, scaleY);
            scaleX = s;
            scaleY = s;
          }
          const drawW = nw * scaleX;
          const drawH = nh * scaleY;
          const offX = (irc.width - drawW) * 0.5;
          const offY = (irc.height - drawH) * 0.5;
          const natX = Math.max(0, Math.min(nw - 1, Math.floor((px - irc.left - offX) / scaleX)));
          const natY = Math.max(0, Math.min(nh - 1, Math.floor((py - irc.top - offY) / scaleY)));
          try {
            if (!window.__tglPixelCanvas) {
              window.__tglPixelCanvas = document.createElement('canvas');
              window.__tglPixelCanvas.width = 1;
              window.__tglPixelCanvas.height = 1;
              window.__tglPixelCtx = window.__tglPixelCanvas.getContext('2d', {
                willReadFrequently: true,
              });
            }
            const ctx = window.__tglPixelCtx;
            if (!ctx) return null;
            ctx.clearRect(0, 0, 1, 1);
            ctx.drawImage(imgEl, natX, natY, 1, 1, 0, 0, 1, 1);
            const d = ctx.getImageData(0, 0, 1, 1).data;
            return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
          } catch {
            return null;
          }
        };
        const effectiveBgAtPoint = (el, px, py) => {
          const fallbackBase = { r: 20, g: 18, b: 14, a: 1 };
          const bodyBg = parseRgba(getComputedStyle(document.body).backgroundColor);
          let base = bodyBg.a > 0 ? blendRgba(bodyBg, fallbackBase) : fallbackBase;
          let hitImg = false;
          let hadScrimOrOpaqueBg = false;

          const inFixedChrome = Boolean(
            el.closest('header, [data-mobile-menu], [data-scroll-top-btn]')
          );
          if (inFixedChrome && !el.closest('[data-surface]') && typeof document.elementsFromPoint === 'function') {
            const underStack = document
              .elementsFromPoint(px, py)
              .filter(
                (n) =>
                  n !== document.documentElement &&
                  n !== document.body &&
                  !n.closest('header, [data-mobile-menu], [data-scroll-top-btn]')
              );
            const bottomUp = underStack.slice().reverse();
            for (const node of bottomUp) {
              const nSt = getComputedStyle(node);
              const nOp = parseFloat(nSt.opacity);
              if (nSt.display === 'none' || nSt.visibility === 'hidden' || nOp === 0) continue;
              const nBg = parseRgba(nSt.backgroundColor);
              if (nBg.a > 0) {
                base = blendRgba({ ...nBg, a: nBg.a * (Number.isFinite(nOp) ? nOp : 1) }, base);
              }
              if (node.tagName === 'IMG') {
                hitImg = true;
                const pxCol = sampleImgPixel(node, px, py);
                if (pxCol) {
                  base = blendRgba(
                    { ...pxCol, a: pxCol.a * (Number.isFinite(nOp) ? nOp : 1) },
                    base
                  );
                }
              }
              if (nSt.backgroundImage && nSt.backgroundImage.includes('linear-gradient')) {
                const nRc = node.getBoundingClientRect();
                const gCol = sampleLinearGradientAtY(nSt.backgroundImage, py, nRc.top, nRc.height);
                if (gCol && gCol.a > 0) {
                  const effA = gCol.a * (Number.isFinite(nOp) ? nOp : 1);
                  if (effA >= 0.2) hadScrimOrOpaqueBg = true;
                  base = blendRgba({ ...gCol, a: effA }, base);
                }
              }
            }

            const headerEl = el.closest('header');
            if (headerEl) {
              const bSt = getComputedStyle(headerEl, '::before');
              const bOp = parseFloat(bSt.opacity);
              const bH = parseFloat(bSt.height) || 0;
              if (bSt.content !== 'none' && bOp > 0 && bH > 0 && py >= 0 && py <= bH) {
                const scCol = sampleLinearGradientAtY(bSt.backgroundImage, py, 0, bH);
                if (scCol && scCol.a > 0) {
                  const effA = scCol.a * bOp;
                  if (effA >= 0.5) hadScrimOrOpaqueBg = true;
                  base = blendRgba({ ...scCol, a: effA }, base);
                }
              }
            }
          }

          const chain = [];
          let cur = el;
          while (cur && cur !== document.body && cur !== document.documentElement) {
            chain.push(cur);
            cur = cur.parentElement;
          }
          chain.reverse();
          for (const node of chain) {
            const nBg = parseRgba(getComputedStyle(node).backgroundColor);
            if (nBg.a > 0) {
              if (nBg.a >= 0.5) hadScrimOrOpaqueBg = true;
              base = blendRgba(nBg, base);
            }
          }
          return { base, unprotectedImg: hitImg && !hadScrimOrOpaqueBg };
        };
        window.__tglMeasureContrast = (el, boxEl) => {
          const st = getComputedStyle(el);
          const rc = (boxEl || el).getBoundingClientRect();
          const inHeader = Boolean(el.closest('header'));
          const ys = inHeader
            ? [
                Math.min(rc.bottom - 1, rc.top + 6),
                rc.top + rc.height / 2,
                Math.max(rc.top + 1, rc.bottom - 6),
              ]
            : [rc.top + rc.height / 2];
          const xs =
            inHeader && rc.width > 40
              ? [
                  rc.left + Math.min(12, rc.width * 0.25),
                  rc.left + rc.width / 2,
                  rc.right - Math.min(12, rc.width * 0.25),
                ]
              : [rc.left + rc.width / 2];

          let worst = null;
          for (const rawY of ys) {
            for (const rawX of xs) {
              const px = Math.max(1, Math.min(window.innerWidth - 1, Math.round(rawX)));
              const py = Math.max(1, Math.min(window.innerHeight - 1, Math.round(rawY)));
              const { base: bg, unprotectedImg } = effectiveBgAtPoint(el, px, py);
              const fgRaw = parseRgba(st.color);
              const op = parseFloat(st.opacity);
              const fgAlpha = fgRaw.a * (Number.isFinite(op) ? op : 1);
              const fg = blendRgba({ ...fgRaw, a: fgAlpha }, bg);
              const l1 = relLum(fg);
              const l2 = relLum(bg);
              const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
              if (!worst || ratio < worst.ratio) {
                worst = {
                  ratio,
                  fg: fmtRgb(fg),
                  bg: fmtRgb(bg),
                  at: `${px},${py}`,
                  unprotectedImg,
                  rawBg: st.backgroundColor,
                  rawColor: st.color,
                  textDecorationLine: st.textDecorationLine || st.textDecoration,
                };
              }
            }
          }
          return worst;
        };
      });
      const page = await context.newPage();

      for (const route of deepRoutes) {
        const consoleErrors = [];
        const pageErrors = [];
        const onConsole = (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        };
        const onPageError = (err) => pageErrors.push(err.message);
        page.on('console', onConsole);
        page.on('pageerror', onPageError);

        await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });

        for (const pct of SCROLL_STOPS) {
          await page.evaluate((scrollPct) => {
            const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            const targetY = Math.round((maxScroll * scrollPct) / 100);
            window.scrollTo({ top: targetY, behavior: 'instant' });
            window.dispatchEvent(new Event('scroll'));
          }, pct);

          // Mandatory 450ms settle wait for Lenis + GSAP ScrollTrigger + theme sampler
          await page.waitForTimeout(450);

          const domReport = await page.evaluate(
            ({ expectedMap, isMobileTier }) => {
              const overflowX = document.documentElement.scrollWidth > window.innerWidth;
              const scrollWidth = document.documentElement.scrollWidth;
              const innerWidth = window.innerWidth;

              const headers = document.querySelectorAll('header');
              const headerCount = headers.length;
              const headerEl = headers[0];
              const headerPointerEvents = headerEl ? getComputedStyle(headerEl).pointerEvents : '';

              const wordmark = document.querySelector('header a.tgl-wordmark');
              const wordmarkStyle = wordmark ? getComputedStyle(wordmark) : null;
              const wordmarkRect = wordmark ? wordmark.getBoundingClientRect() : null;

              const menuBtn = document.querySelector('header button.tgl-menu-pill');
              const menuStyle = menuBtn ? getComputedStyle(menuBtn) : null;
              const menuRect = menuBtn ? menuBtn.getBoundingClientRect() : null;

              const desktopNavLinks = Array.from(document.querySelectorAll('header nav ul.tgl-desktop-nav a'));
              const bookPill = document.querySelector('header a.tgl-book-pill');
              const desktopLinksOk = isMobileTier
                ? true
                : desktopNavLinks.length === 4 &&
                  desktopNavLinks.every((a) => {
                    const st = getComputedStyle(a);
                    const rc = a.getBoundingClientRect();
                    return st.visibility !== 'hidden' && parseFloat(st.opacity) >= 0.8 && rc.width > 0 && rc.height > 0;
                  }) &&
                  Boolean(bookPill) &&
                  getComputedStyle(bookPill).visibility !== 'hidden' &&
                  parseFloat(getComputedStyle(bookPill).opacity) >= 0.8 &&
                  bookPill.getBoundingClientRect().width > 0;

              // Check images
              const imgs = Array.from(document.querySelectorAll('img'));
              const badSrcImgs = imgs
                .filter((img) => (img.getAttribute('src') || '').includes('&scale-down-to=') || (img.getAttribute('srcset') || '').includes('&scale-down-to='))
                .map((img) => img.getAttribute('src'));
              const brokenVisibleImgs = imgs
                .filter((img) => {
                  const rc = img.getBoundingClientRect();
                  const st = getComputedStyle(img);
                  return rc.width > 0 && rc.height > 0 && st.visibility !== 'hidden' && (!img.complete || img.naturalWidth <= 0);
                })
                .map((img) => img.getAttribute('src'));

              // Surface background & text contrast / opacity checks
              const surfaceErrors = [];
              const surfaces = Array.from(document.querySelectorAll('[data-surface]'));
              for (const s of surfaces) {
                const sRect = s.getBoundingClientRect();
                if (sRect.width === 0 || sRect.height === 0) continue;
                const key = s.getAttribute('data-surface');
                const expectedBg = expectedMap[key];
                const actualBg = getComputedStyle(s).backgroundColor;
                if (expectedBg && actualBg !== expectedBg) {
                  surfaceErrors.push(`Surface "${key}" expected ${expectedBg}, got ${actualBg}`);
                }

                // Check visible text descendants inside this surface
                const textNodes = [];
                const walker = document.createTreeWalker(s, NodeFilter.SHOW_TEXT, null);
                let node;
                while ((node = walker.nextNode())) {
                  if (!node.nodeValue || !node.nodeValue.trim()) continue;
                  const el = node.parentElement;
                  if (!el) continue;
                  if (el.closest('[data-surface]') !== s) continue;
                  if (el.classList.contains('word') || el.classList.contains('invisible') || el.classList.contains('visually-hidden')) {
                    continue;
                  }
                  const st = getComputedStyle(el);
                  const rc = el.getBoundingClientRect();
                  if (rc.width <= 1 || rc.height <= 1 || st.visibility === 'hidden' || st.display === 'none') {
                    continue;
                  }
                  textNodes.push({ el, st });
                }

                for (const { el, st } of textNodes) {
                  if (parseFloat(st.opacity) < 0.95) {
                    surfaceErrors.push(`Low opacity (${st.opacity}) on <${el.tagName.toLowerCase()}> inside "${key}"`);
                    break;
                  }
                  let effectiveBg = actualBg;
                  let cur = el;
                  while (cur && cur !== s) {
                    const cBg = getComputedStyle(cur).backgroundColor;
                    const rgba = cBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                    const alpha = rgba && rgba[4] !== undefined ? Number(rgba[4]) : 1;
                    if (rgba && alpha >= 0.5) {
                      effectiveBg = cBg;
                      break;
                    }
                    cur = cur.parentElement;
                  }
                  if (st.color === effectiveBg) {
                    surfaceErrors.push(`Invisible text (${st.color} === ${effectiveBg}) on <${el.tagName.toLowerCase()}> inside "${key}"`);
                    break;
                  }
                }
              }

              // Tap targets on < 1024px
              const badTapTargets = [];
              if (isMobileTier) {
                const interactive = Array.from(document.querySelectorAll('a, button'));
                for (const el of interactive) {
                  if (el.classList.contains('visually-hidden') || el.getAttribute('aria-hidden') === 'true') continue;
                  const st = getComputedStyle(el);
                  if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) === 0) continue;
                  const rc = el.getBoundingClientRect();
                  if (rc.width === 0 && rc.height === 0) continue;
                  if (rc.height < 44 || rc.width < 44) {
                    badTapTargets.push(`${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 24)}" (${Math.round(rc.width)}x${Math.round(rc.height)})`);
                  }
                }
              }

              // Chrome contrast >= 4.5:1 across wordmark, pills, nav links, and scroll-top button
              // plus multi-point boundary straddling check across header band (y = 18, 38, 58)
              const chromeContrastErrors = [];
              const headerTheme = document.documentElement.getAttribute('data-header-theme') || 'dark';
              if (headerTheme === 'dark' && typeof document.elementsFromPoint === 'function') {
                const xProbes = [56, Math.floor(innerWidth / 2), Math.max(1, innerWidth - 56)];
                const yProbes = [18, 38, 58];
                const lightSurfaces = new Set(['light', 'sand-muted', 'taupe', 'terracotta', 'terracotta-card']);
                let straddled = false;
                for (const py of yProbes) {
                  for (const px of xProbes) {
                    for (const hit of document.elementsFromPoint(px, py)) {
                      if (hit.closest('header, [data-mobile-menu], [data-scroll-top-btn]')) continue;
                      const surf = hit.closest('[data-surface]');
                      if (surf) {
                        const attr = surf.getAttribute('data-surface') || '';
                        if (lightSurfaces.has(attr)) {
                          chromeContrastErrors.push(
                            `Boundary straddle: data-header-theme="dark" while (${px}, ${py}) lands on "${attr}"`
                          );
                          straddled = true;
                        }
                        break;
                      }
                    }
                    if (straddled) break;
                  }
                  if (straddled) break;
                }
              }

              const minRatio = 4.5;
              if (wordmark && typeof window.__tglMeasureContrast === 'function') {
                const wmRes = window.__tglMeasureContrast(wordmark);
                if (wmRes.ratio < minRatio || wmRes.unprotectedImg) {
                  chromeContrastErrors.push(
                    `.tgl-wordmark contrast ${wmRes.ratio.toFixed(2)}:1 at (${wmRes.at}) (${wmRes.fg} on ${wmRes.bg}) unprotectedImg=${wmRes.unprotectedImg}`
                  );
                }
              }
              if (isMobileTier && menuBtn && typeof window.__tglMeasureContrast === 'function') {
                const visibleMenuSpan =
                  Array.from(menuBtn.querySelectorAll('span[aria-hidden="false"]'))[0] || menuBtn;
                const mpRes = window.__tglMeasureContrast(visibleMenuSpan, menuBtn);
                if (mpRes.ratio < minRatio || mpRes.unprotectedImg) {
                  chromeContrastErrors.push(
                    `.tgl-menu-pill contrast ${mpRes.ratio.toFixed(2)}:1 at (${mpRes.at}) (${mpRes.fg} on ${mpRes.bg}) unprotectedImg=${mpRes.unprotectedImg}`
                  );
                }
              }
              if (!isMobileTier && typeof window.__tglMeasureContrast === 'function') {
                for (const navLink of desktopNavLinks) {
                  const nlRes = window.__tglMeasureContrast(navLink);
                  if (nlRes.ratio < minRatio || nlRes.unprotectedImg) {
                    chromeContrastErrors.push(
                      `.tgl-desktop-nav a "${(navLink.textContent || '').trim()}" contrast ${nlRes.ratio.toFixed(2)}:1 at (${nlRes.at}) (${nlRes.fg} on ${nlRes.bg}) unprotectedImg=${nlRes.unprotectedImg}`
                    );
                  }
                }
                if (bookPill) {
                  const bpRes = window.__tglMeasureContrast(bookPill);
                  if (bpRes.ratio < minRatio || bpRes.unprotectedImg) {
                    chromeContrastErrors.push(
                      `.tgl-book-pill contrast ${bpRes.ratio.toFixed(2)}:1 at (${bpRes.at}) (${bpRes.fg} on ${bpRes.bg}) unprotectedImg=${bpRes.unprotectedImg}`
                    );
                  }
                }
              }
              const scrollTopBtn = document.querySelector('button[data-scroll-top-btn]');
              if (scrollTopBtn && typeof window.__tglMeasureContrast === 'function') {
                const sbStyle = getComputedStyle(scrollTopBtn);
                if (
                  parseFloat(sbStyle.opacity) >= 0.8 &&
                  sbStyle.visibility !== 'hidden' &&
                  sbStyle.pointerEvents !== 'none'
                ) {
                  const target = scrollTopBtn.querySelector('span') || scrollTopBtn;
                  const sbRes = window.__tglMeasureContrast(target, scrollTopBtn);
                  if (sbRes.ratio < minRatio) {
                    chromeContrastErrors.push(
                      `button[data-scroll-top-btn] contrast ${sbRes.ratio.toFixed(2)}:1 (${sbRes.fg} on ${sbRes.bg})`
                    );
                  }
                }
              }

              return {
                overflowX,
                scrollWidth,
                innerWidth,
                headerCount,
                headerPointerEvents,
                wordmarkOk:
                  Boolean(wordmarkStyle && wordmarkRect) &&
                  wordmarkStyle.visibility !== 'hidden' &&
                  parseFloat(wordmarkStyle.opacity) >= 0.8 &&
                  wordmarkRect.width > 0 &&
                  wordmarkRect.height > 0 &&
                  wordmarkRect.left < innerWidth / 2,
                menuOk: !isMobileTier
                  ? true
                  : Boolean(menuStyle && menuRect) &&
                    menuStyle.visibility !== 'hidden' &&
                    parseFloat(menuStyle.opacity) >= 0.8 &&
                    menuRect.width >= 44 &&
                    menuRect.height >= 44,
                desktopLinksOk,
                chromeContrastErrors,
                badSrcImgs,
                brokenVisibleImgs,
                surfaceErrors,
                badTapTargets,
              };
            },
            { expectedMap: SURFACE_EXPECTED_RGB, isMobileTier: vp.width < 1024 }
          );

          const shotName = `${slugifyRoute(route)}-${vp.label}-${pct}pct.png`;
          await page.screenshot({ path: path.join(screenshotDir, shotName) });

          if (domReport.overflowX) {
            recordFailure(
              'Zero Horizontal Overflow',
              vp.tier,
              `${route} @ ${vp.label} ${pct}% scrollWidth=${domReport.scrollWidth} > innerWidth=${domReport.innerWidth}`
            );
          } else {
            recordPass(vp.tier);
          }

          if (
            domReport.headerCount !== 1 ||
            domReport.headerPointerEvents !== 'none' ||
            !domReport.wordmarkOk ||
            !domReport.menuOk ||
            !domReport.desktopLinksOk
          ) {
            recordFailure(
              'Single Pointer-Pass Header & Wordmark',
              vp.tier,
              `${route} @ ${vp.label} ${pct}% headerCount=${domReport.headerCount} pe=${domReport.headerPointerEvents} wm=${domReport.wordmarkOk} menu=${domReport.menuOk} desktop=${domReport.desktopLinksOk}`
            );
          } else {
            recordPass(vp.tier);
          }

          if (domReport.chromeContrastErrors.length > 0) {
            recordFailure(
              'Chrome Contrast & Laptop Hover States',
              vp.tier,
              `${route} @ ${vp.label} ${pct}%: ${domReport.chromeContrastErrors[0]}`
            );
          } else {
            recordPass(vp.tier);
          }

          if (domReport.surfaceErrors.length > 0) {
            recordFailure(
              'Surface Contrast & Opacity Integrity',
              vp.tier,
              `${route} @ ${vp.label} ${pct}%: ${domReport.surfaceErrors[0]}`
            );
          } else {
            recordPass(vp.tier);
          }

          if (domReport.badSrcImgs.length > 0 || domReport.brokenVisibleImgs.length > 0) {
            recordFailure(
              'Image Integrity (Zero &scale-down-to=)',
              vp.tier,
              `${route} @ ${vp.label} ${pct}% badSrc=${domReport.badSrcImgs.length} broken=${domReport.brokenVisibleImgs.length}`
            );
          } else {
            recordPass(vp.tier);
          }

          if (vp.width < 1024 && domReport.badTapTargets.length > 0) {
            recordFailure(
              'Tap Targets >= 44px (< 1024px)',
              vp.tier,
              `${route} @ ${vp.label} ${pct}%: ${domReport.badTapTargets.slice(0, 2).join('; ')}`
            );
          } else if (vp.width < 1024) {
            recordPass(vp.tier);
          }
        }

        // 3b. Verify header theme flips between dark and light sections on /about and /
        if (route === '/about' || route === '/') {
          await page.evaluate(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            window.dispatchEvent(new Event('scroll'));
          });
          await page.waitForTimeout(250);
          const topTheme = await page.evaluate(() => document.documentElement.getAttribute('data-header-theme'));

          await page.evaluate((r) => {
            const targetSelector = r === '/about' ? 'section[data-surface="light"]' : 'section[data-surface="light"]';
            const el = document.querySelector(targetSelector);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: y, behavior: 'instant' });
              window.dispatchEvent(new Event('scroll'));
            }
          }, route);
          await page.waitForTimeout(450);
          const lightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-header-theme'));

          if (topTheme !== 'dark' || lightTheme !== 'light') {
            recordFailure(
              'Single Pointer-Pass Header & Wordmark',
              vp.tier,
              `${route} @ ${vp.label} theme flip failed: top="${topTheme}", overLight="${lightTheme}"`
            );
          } else {
            recordPass(vp.tier);
          }

          // 3c. Explicit Laptop (1440x900) hover state checks over dark and light surfaces
          if (vp.width >= 1024) {
            const lightY = await page.evaluate(() => {
              const el = document.querySelector('section[data-surface="light"]');
              return el ? el.getBoundingClientRect().top + window.scrollY : null;
            });
            const hoverTargets = [
              { label: 'dark', y: 0, expBookBg: 'rgb(245, 238, 219)', expBookColor: 'rgb(20, 18, 14)' },
              ...(lightY !== null
                ? [
                    {
                      label: 'light',
                      y: lightY,
                      expBookBg: 'rgb(20, 18, 14)',
                      expBookColor: 'rgb(245, 238, 219)',
                    },
                  ]
                : []),
            ];

            for (const ht of hoverTargets) {
              await page.evaluate((targetY) => {
                window.scrollTo({ top: targetY, behavior: 'instant' });
                window.dispatchEvent(new Event('scroll'));
              }, ht.y);
              await page.mouse.move(10, 400);
              await page.waitForTimeout(450);

              const baseline = await page.evaluate(() => {
                const book = document.querySelector('header a.tgl-book-pill');
                const nav = document.querySelector('header nav ul.tgl-desktop-nav a.tgl-nav-link');
                return {
                  bookBg: book ? getComputedStyle(book).backgroundColor : '',
                  bookColor: book ? getComputedStyle(book).color : '',
                  navBg: nav ? getComputedStyle(nav).backgroundColor : '',
                  navColor: nav ? getComputedStyle(nav).color : '',
                  navDeco: nav ? getComputedStyle(nav).textDecorationLine : '',
                };
              });

              await page.locator('header a.tgl-book-pill').hover();
              await page.waitForTimeout(280);
              const bookHover = await page.evaluate(() => {
                const book = document.querySelector('header a.tgl-book-pill');
                return book && typeof window.__tglMeasureContrast === 'function'
                  ? window.__tglMeasureContrast(book)
                  : null;
              });

              await page.locator('header nav ul.tgl-desktop-nav a.tgl-nav-link').first().hover();
              await page.waitForTimeout(280);
              const navHover = await page.evaluate(() => {
                const nav = document.querySelector('header nav ul.tgl-desktop-nav a.tgl-nav-link');
                return nav && typeof window.__tglMeasureContrast === 'function'
                  ? window.__tglMeasureContrast(nav)
                  : null;
              });

              await page.mouse.move(10, 400);
              await page.waitForTimeout(260);

              if (
                !bookHover ||
                bookHover.ratio < 4.5 ||
                bookHover.rawBg !== ht.expBookBg ||
                bookHover.rawColor !== ht.expBookColor
              ) {
                recordFailure(
                  'Chrome Contrast & Laptop Hover States',
                  vp.tier,
                  `${route} @ ${vp.label} (${ht.label}) .tgl-book-pill:hover invalid: bg=${bookHover?.rawBg} color=${bookHover?.rawColor} ratio=${bookHover?.ratio?.toFixed(2)}`
                );
              } else {
                recordPass(vp.tier);
              }

              const navStateChanged =
                navHover &&
                (navHover.rawBg !== baseline.navBg ||
                  navHover.rawColor !== baseline.navColor ||
                  String(navHover.textDecorationLine).includes('underline'));
              if (!navHover || navHover.ratio < 4.5 || !navStateChanged) {
                recordFailure(
                  'Chrome Contrast & Laptop Hover States',
                  vp.tier,
                  `${route} @ ${vp.label} (${ht.label}) .tgl-nav-link:hover invalid: bg=${navHover?.rawBg} color=${navHover?.rawColor} deco=${navHover?.textDecorationLine} ratio=${navHover?.ratio?.toFixed(2)}`
                );
              } else {
                recordPass(vp.tier);
              }
            }
          }
        }

        // 3. Test MobileMenu & ScrollTopButton interaction on < 1024px for '/' and '/about'
        if (vp.width < 1024 && (route === '/' || route === '/about')) {
          const testOffsets = route === '/about' ? [0, 75] : [0, 35];
          for (const testPct of testOffsets) {
            await page.evaluate((scrollPct) => {
              const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
              window.scrollTo({ top: Math.round((maxScroll * scrollPct) / 100), behavior: 'instant' });
              window.dispatchEvent(new Event('scroll'));
            }, testPct);
            await page.waitForTimeout(300);

            const expectedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-header-theme'));
            const menuBtn = page.locator('header button.tgl-menu-pill');

            await menuBtn.click();
            await page.waitForTimeout(320);

            const openCheck = await page.evaluate((expTheme) => {
              const drawer = document.getElementById('mobile-navigation-drawer');
              if (!drawer) return { ok: false, reason: 'Drawer did not mount' };
              const dStyle = getComputedStyle(drawer);
              const expBg = expTheme === 'light' ? 'rgb(245, 238, 219)' : 'rgb(20, 18, 14)';
              if (dStyle.backgroundColor !== expBg || parseFloat(dStyle.opacity) < 0.99) {
                return { ok: false, reason: `Drawer bg=${dStyle.backgroundColor} (expected ${expBg}) opacity=${dStyle.opacity}` };
              }
              const links = Array.from(drawer.querySelectorAll('nav a'));
              if (links.length !== 5) {
                return { ok: false, reason: `Expected 5 menu links, got ${links.length}` };
              }
              for (const l of links) {
                const rc = l.getBoundingClientRect();
                if (rc.height < 44 || rc.width < 44) {
                  return { ok: false, reason: `Menu link "${l.textContent?.trim()}" smaller than 44x44` };
                }
              }
              const allDrawerLinks = Array.from(drawer.querySelectorAll('a'));
              if (typeof window.__tglMeasureContrast === 'function') {
                for (const dl of allDrawerLinks) {
                  const dlRes = window.__tglMeasureContrast(dl);
                  if (dlRes.ratio < 4.5) {
                    return {
                      ok: false,
                      reason: `Drawer link "${dl.textContent?.trim()}" contrast ${dlRes.ratio.toFixed(2)}:1 (${dlRes.fg} on ${dlRes.bg})`,
                    };
                  }
                }
              }
              const wrapper = document.querySelector('header button.tgl-menu-pill .tgl-roll-wrapper');
              const closeSpan = wrapper
                ? Array.from(wrapper.querySelectorAll('span')).find((sp) => sp.textContent?.trim() === 'Close' && !sp.classList.contains('invisible'))
                : null;
              if (wrapper && closeSpan) {
                const wRect = wrapper.getBoundingClientRect();
                const cRect = closeSpan.getBoundingClientRect();
                if (cRect.top < wRect.top - 1 || cRect.bottom > wRect.bottom + 1 || cRect.height < 12) {
                  return { ok: false, reason: 'Close label vertically clipped inside .tgl-roll-wrapper' };
                }
              }
              if (document.body.style.overflow !== 'hidden') {
                return { ok: false, reason: `Body scroll not locked (${document.body.style.overflow})` };
              }
              const scrollBtn = document.querySelector('button[aria-label="Scroll to top"]');
              if (scrollBtn) {
                const sbStyle = getComputedStyle(scrollBtn);
                if (parseFloat(sbStyle.opacity) !== 0 || sbStyle.pointerEvents !== 'none') {
                  return { ok: false, reason: `ScrollTopButton visible while menu open (opacity=${sbStyle.opacity})` };
                }
              }
              return { ok: true };
            }, expectedTheme);

            if (!openCheck.ok) {
              recordFailure(
                'Mobile Menu Freeze, Close & ^ Button Sync',
                vp.tier,
                `${route} @ ${vp.label} (${testPct}%): ${openCheck.reason}`
              );
            } else {
              recordPass(vp.tier);
            }

            // Rapid toggle test (close -> open -> close)
            await menuBtn.click();
            await page.waitForTimeout(80);
            await menuBtn.click();
            await page.waitForTimeout(80);
            await menuBtn.click();
            await page.waitForTimeout(350);

            const closedCheck = await page.evaluate(() => {
              const drawer = document.getElementById('mobile-navigation-drawer');
              return {
                drawerGone: !drawer,
                overflowRestored: document.body.style.overflow === '',
                overflow: document.body.style.overflow,
              };
            });

            if (!closedCheck.drawerGone || !closedCheck.overflowRestored) {
              recordFailure(
                'Mobile Menu Freeze, Close & ^ Button Sync',
                vp.tier,
                `${route} @ ${vp.label} rapid close failed: drawerGone=${closedCheck.drawerGone} overflow="${closedCheck.overflow}"`
              );
            } else {
              recordPass(vp.tier);
            }
          }
        }

        if (consoleErrors.length > 0 || pageErrors.length > 0) {
          recordFailure(
            'Zero-404 Routes & Favicon',
            vp.tier,
            `${route} @ ${vp.label} runtime errors: ${[...consoleErrors, ...pageErrors][0]}`
          );
        }

        page.off('console', onConsole);
        page.off('pageerror', onPageError);
      }

      await context.close();
    }
  } finally {
    await browser.close();
    if (child) {
      child.kill('SIGTERM');
    }
  }

  console.log('\n### Playwright Viewport Audit Report (Run ' + RUN_NUMBER + ')\n');
  console.log('| Check | Phone | Tablet | Laptop | Notes |');
  console.log('| :--- | :---: | :---: | :---: | :--- |');
  for (const [check, row] of Object.entries(checkMatrix)) {
    const noteText = row.notes.length > 0 ? row.notes.join(' | ') : 'Verified across viewports & scroll stops';
    console.log(`| ${check} | ${row.Phone} | ${row.Tablet} | ${row.Laptop} | ${noteText} |`);
  }

  const totalFailures =
    tierResults.Phone.failed + tierResults.Tablet.failed + tierResults.Laptop.failed;
  console.log(`\nScreenshots saved to: ${screenshotDir}`);
  console.log(
    `Totals — Phone: ${tierResults.Phone.passed} pass / ${tierResults.Phone.failed} fail | Tablet: ${tierResults.Tablet.passed} pass / ${tierResults.Tablet.failed} fail | Laptop: ${tierResults.Laptop.passed} pass / ${tierResults.Laptop.failed} fail\n`
  );

  if (totalFailures > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error('Audit script error:', err);
  process.exit(1);
});
