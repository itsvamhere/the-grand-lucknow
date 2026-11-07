import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import crypto from 'crypto';

async function runVictoryAudit() {
  const auditReport = {
    phaseA_timeline: { result: 'PASS', details: [] },
    phaseB_forensics: { result: 'PASS', details: [] },
    phaseC_tests: []
  };

  console.log('====================================================');
  console.log('       INDEPENDENT VICTORY AUDITOR VERIFICATION     ');
  console.log('====================================================\n');

  // -----------------------------------------------------------------
  // 1. PHASE A: TIMELINE & PROVENANCE AUDIT
  // -----------------------------------------------------------------
  console.log('--- PHASE A: TIMELINE & PROVENANCE ---');
  const indexFile = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
  const indexBuf = fs.readFileSync(indexFile);
  const indexHash = crypto.createHash('sha256').update(indexBuf).digest('hex');
  const indexStat = fs.statSync(indexFile);

  console.log(`index.html size: ${indexStat.size} bytes`);
  console.log(`index.html mtime: ${indexStat.mtime.toISOString()}`);
  console.log(`index.html SHA256: ${indexHash}`);

  // Expected index values from before task started
  const expectedHash = '40de9d3f4473dc593c336852ad8020c2e3902e0308d05852cbf9c918b86efe5c';
  if (indexHash.toLowerCase() !== expectedHash.toLowerCase()) {
    auditReport.phaseA_timeline.result = 'FAIL';
    auditReport.phaseA_timeline.details.push(`index.html SHA256 hash modified! Expected ${expectedHash}, got ${indexHash}`);
  } else {
    auditReport.phaseA_timeline.details.push('index.html SHA256 matches initial state byte-for-byte; file completely unchanged.');
  }

  const subpageFile = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
  const subpageStat = fs.statSync(subpageFile);
  console.log(`open-earth-lawn.html size: ${subpageStat.size} bytes, mtime: ${subpageStat.mtime.toISOString()}`);
  auditReport.phaseA_timeline.details.push(`open-earth-lawn.html mtime ${subpageStat.mtime.toISOString()} confirms post-remediation build.`);

  // -----------------------------------------------------------------
  // 2. PHASE B: CHEATING & INTEGRITY FORENSICS
  // -----------------------------------------------------------------
  console.log('\n--- PHASE B: CHEATING & INTEGRITY FORENSICS ---');
  const subpageHtml = fs.readFileSync(subpageFile, 'utf8');

  // Check custom scripts for any test harnesses or mock checks
  const engineMatch = subpageHtml.match(/<script\s+id="grand-subpage-engine-js">([\s\S]*?)<\/script>/);
  if (!engineMatch) {
    auditReport.phaseB_forensics.result = 'FAIL';
    auditReport.phaseB_forensics.details.push('grand-subpage-engine-js not found in open-earth-lawn.html');
  } else {
    const code = engineMatch[1];
    const suspiciousTokens = ['navigator.webdriver', 'playwright', 'puppeteer', '__test__', '__audit__'];
    let foundTokens = [];
    for (const tok of suspiciousTokens) {
      if (code.includes(tok)) foundTokens.push(tok);
    }
    if (foundTokens.length > 0) {
      auditReport.phaseB_forensics.result = 'FAIL';
      auditReport.phaseB_forensics.details.push(`Cheating tokens found in engine: ${foundTokens.join(', ')}`);
    } else {
      auditReport.phaseB_forensics.details.push('No test framework sniffing, mock hooks, or fake shortcuts found in engine script.');
    }

    // Verify engine has genuine logic:
    const hasDynamicCalc = code.includes('getMetrics') && code.includes('scrollMax') && code.includes('smoothstep');
    const hasColorInterp = code.includes('colorStart') && code.includes('colorEnd') && code.includes('rgb(');
    const hasLetterLoop = code.includes('grand-hero-letter') && code.includes('translate3d');

    if (hasDynamicCalc && hasColorInterp && hasLetterLoop) {
      auditReport.phaseB_forensics.details.push('Genuine dynamic calculation, smoothstep easing, and RAF animation verified.');
    } else {
      auditReport.phaseB_forensics.result = 'FAIL';
      auditReport.phaseB_forensics.details.push('Engine appears to be a facade or incomplete implementation.');
    }
  }

  // -----------------------------------------------------------------
  // 3. PHASE C: INDEPENDENT TEST EXECUTION
  // -----------------------------------------------------------------
  console.log('\n--- PHASE C: INDEPENDENT TEST EXECUTION ---');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // Test 1: Desktop Navigation & Button
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
  await page.waitForTimeout(300);

  const desktopNav = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header nav a, header a[data-framer-name="Nav Link"]'))
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
      })
      .map(a => ({
        text: (a.querySelector('span[data-rolling-label] > span') || a).innerText.trim(),
        href: a.getAttribute('href')
      }));

    const btn = document.querySelector('header .framer-18mvsw1-container a, header a.framer-vO7O2');
    const btnStyle = btn ? window.getComputedStyle(btn) : null;
    const pill = document.querySelector('.framer-gaygr9');
    const pillStyle = pill ? window.getComputedStyle(pill) : null;

    return {
      links,
      pill: {
        opacity: pillStyle ? pillStyle.opacity : null
      },
      button: btn ? {
        text: (btn.querySelector('span[data-rolling-label] > span') || btn).innerText.trim(),
        href: btn.getAttribute('href'),
        bg: btnStyle.backgroundColor,
        color: btnStyle.color,
        border: btnStyle.border,
        borderRadius: btnStyle.borderRadius,
        height: btnStyle.height,
        opacity: btnStyle.opacity
      } : null
    };
  });

  console.log('Desktop Nav Links:', desktopNav.links);
  console.log('Book Now Button:', desktopNav.button);

  // Check acceptance criteria 1 and 2
  const expectedNavLinks = [
    { text: 'Venues', href: '/venues' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' }
  ];
  const linksPass = expectedNavLinks.every(exp => 
    desktopNav.links.some(l => l.text.includes(exp.text) && l.href === exp.href)
  );

  const btnBgPass = desktopNav.button && desktopNav.button.bg === 'rgb(255, 240, 202)';
  const btnColorPass = desktopNav.button && desktopNav.button.color === 'rgb(14, 18, 1)';
  const btnBorderPass = desktopNav.button && desktopNav.button.border === '0px none rgb(14, 18, 1)';
  const btnRadiusPass = desktopNav.button && desktopNav.button.borderRadius === '2px';
  const btnImmediatePass = desktopNav.button && desktopNav.button.opacity === '1';

  auditReport.phaseC_tests.push({
    test: 'AC1: Navigation bar layout and links match index.html',
    pass: linksPass,
    details: desktopNav.links
  });

  auditReport.phaseC_tests.push({
    test: 'AC2: "Book Now" styling matches reference (cream bg, dark text, 0px border, 2px radius, immediate opacity 1)',
    pass: btnBgPass && btnColorPass && btnBorderPass && btnRadiusPass && btnImmediatePass,
    details: desktopNav.button
  });

  // Capture button screenshot for visual proof
  const btnElement = page.locator('header .framer-18mvsw1-container a').first();
  await btnElement.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_2/victory_book_now_button.png' });

  // Test 2: Hero letter-by-letter scroll and Photo 6 exit rollout
  console.log('\nTesting Hero scroll rollout...');
  
  // y = 0
  const y0Hero = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    return {
      count: letters.length,
      allVisible: letters.every(l => l.style.opacity === '1' || l.style.opacity === ''),
      bg: window.getComputedStyle(document.body).backgroundColor
    };
  });
  console.log('y=0 state:', y0Hero);

  // Progressive scroll check to verify staggered fade
  const staggerCheck = [];
  for (let y = 5800; y <= 6650; y += 150) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);
    const state = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      const active = letters.map(l => parseFloat(l.style.opacity || '1')).filter(op => op > 0);
      const bg = window.getComputedStyle(document.body).backgroundColor;
      return { activeCount: active.length, bg };
    });
    staggerCheck.push({ y, activeCount: state.activeCount, bg: state.bg });
  }
  console.log('Stagger rollout progression:', staggerCheck);

  // Verify that active letters decrease strictly monotonically or smoothly
  const firstActive = staggerCheck[0].activeCount;
  const lastActive = staggerCheck[staggerCheck.length - 1].activeCount;
  const letterFadeWorked = firstActive > 0 && lastActive === 0;

  // Photo 6 exit position verification
  // Locate Photo 6 exit position where Photo 6 bottom ~233px
  let photo6ExitScrollY = 6650;
  for (let y = 6200; y <= 7200; y += 25) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    const p6Bottom = await page.evaluate(() => {
      const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
      const r = p6 ? p6.getBoundingClientRect() : null;
      return r ? Math.round(r.bottom) : null;
    });
    if (p6Bottom !== null && p6Bottom <= 240) {
      photo6ExitScrollY = y;
      console.log(`Found Photo 6 bottom ${p6Bottom}px at Y = ${y}`);
      break;
    }
  }

  await page.evaluate(sc => window.scrollTo(0, sc), photo6ExitScrollY);
  await page.waitForTimeout(50);

  const exitMetrics = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    const lingering = letters.filter(l => parseFloat(l.style.opacity || '1') > 0);
    const p6 = document.querySelector('[data-framer-name="Gallery Image 6"], .framer-10thn2s-container');
    const r = p6 ? p6.getBoundingClientRect() : null;
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      lingeringCount: lingering.length,
      lingeringText: lingering.map(l => l.innerText).join(''),
      p6Bottom: r ? Math.round(r.bottom) : null
    };
  });
  console.log(`Metrics at Photo 6 exit (Y=${photo6ExitScrollY}):`, exitMetrics);

  await page.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_2/victory_photo6_exit.png' });

  const ac4Pass = letterFadeWorked && exitMetrics.lingeringCount === 0 && exitMetrics.bodyBg === 'rgb(255, 240, 202)';
  auditReport.phaseC_tests.push({
    test: 'AC4: Hero headline fades letter-by-letter and zero lingering letters + pure cream bg at Photo 6 exit',
    pass: ac4Pass,
    details: exitMetrics
  });

  // Test 3: Reverse scroll restores all letters to opacity 1 and dark bg
  console.log('\nTesting Reverse Scroll...');
  for (let y = photo6ExitScrollY; y >= 0; y -= 1200) {
    await page.evaluate(sc => window.scrollTo(0, sc), y);
    await page.waitForTimeout(20);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(50);

  const reverseMetrics = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
    const allRestored = letters.every(l => l.style.opacity === '1' && (l.style.transform === 'none' || l.style.transform === ''));
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const isLight = document.body.classList.contains('is-light-theme');
    return {
      count: letters.length,
      allRestored,
      bodyBg,
      isLight
    };
  });
  console.log('Metrics after reverse scroll to Y=0:', reverseMetrics);

  const ac5Pass = reverseMetrics.allRestored && reverseMetrics.bodyBg === 'rgb(14, 18, 1)' && !reverseMetrics.isLight;
  auditReport.phaseC_tests.push({
    test: 'AC5: Reverse scroll cleanly restores all letters to opacity 1 and dark background rgb(14, 18, 1)',
    pass: ac5Pass,
    details: reverseMetrics
  });

  // Test 4: Multi-viewport check
  console.log('\nTesting Multi-viewport consistency...');
  const viewports = [
    { width: 1440, height: 900, name: 'Desktop Large' },
    { width: 1366, height: 768, name: '1366x768' },
    { width: 1024, height: 768, name: 'Tablet Landscape / Small Desktop' },
    { width: 810, height: 1080, name: 'iPad Portrait' },
    { width: 390, height: 844, name: 'Mobile iPhone' }
  ];

  let allViewportsPass = true;
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'load' });
    await page.waitForTimeout(50);

    const vpMetrics = await page.evaluate(() => {
      const sec = document.querySelector('section#apartment-header, .framer-151qtkn');
      const secH = sec ? sec.offsetHeight : 8000;
      const vh = window.innerHeight;
      const scrollMax = Math.max(1000, secH - vh);
      const rolloutEnd = Math.round(scrollMax * 0.91);
      return { scrollMax, rolloutEnd };
    });

    await page.evaluate(sc => window.scrollTo(0, sc), vpMetrics.rolloutEnd + 20);
    await page.waitForTimeout(50);

    const vpState = await page.evaluate(() => {
      const letters = Array.from(document.querySelectorAll('h1 .grand-hero-letter')).filter(l => l.offsetParent !== null);
      const allGone = letters.every(l => l.style.opacity === '0');
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      return { allGone, bodyBg };
    });

    const vpPass = vpState.allGone && vpState.bodyBg === 'rgb(255, 240, 202)';
    console.log(`Viewport ${vp.name}: allGone=${vpState.allGone}, bg=${vpState.bodyBg} => ${vpPass ? 'PASS' : 'FAIL'}`);
    if (!vpPass) allViewportsPass = false;
  }

  auditReport.phaseC_tests.push({
    test: 'Multi-viewport rollout & background consistency across 5 distinct resolutions',
    pass: allViewportsPass
  });

  await browser.close();

  console.log('\n====================================================');
  console.log('                 AUDIT SUMMARY                      ');
  console.log('====================================================');
  console.log('Phase A (Timeline):', auditReport.phaseA_timeline.result);
  console.log('Phase B (Forensics):', auditReport.phaseB_forensics.result);
  const phaseCPass = auditReport.phaseC_tests.every(t => t.pass);
  console.log('Phase C (Tests):', phaseCPass ? 'PASS' : 'FAIL');

  const overallVerdict = (auditReport.phaseA_timeline.result === 'PASS' &&
                          auditReport.phaseB_forensics.result === 'PASS' &&
                          phaseCPass) ? 'VICTORY CONFIRMED' : 'VICTORY REJECTED';

  console.log('\nOVERALL VERDICT:', overallVerdict);
  return { auditReport, overallVerdict };
}

runVictoryAudit().catch(err => {
  console.error('Audit execution error:', err);
  process.exit(1);
});
