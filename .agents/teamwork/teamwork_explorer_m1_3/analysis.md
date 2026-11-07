# Technical Investigation: Verification and Deployment Pipeline
**Subpage Parity, Universal Footer & Venue Polish**
**Explorer**: `teamwork_explorer_m1_3`  
**Target Repository**: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo`  
**Target File**: `venues/open-earth-lawn.html`  
**Reference File**: `index.html` (Untouchable / Read-Only)  
**Date**: 2026-11-07  

---

## 1. Executive Summary

This technical investigation analyzes the local preview server, automated browser testing infrastructure, Vercel deployment pipeline, and production smoke verification for the subpage parity fixes across `venues/open-earth-lawn.html`.

### Core Epistemic Truths Established
1. **Preview Server Architecture (`server.mjs`)**: Currently active on `http://localhost:3003`. It executes request-time string transforms (`swapText`) on HTML and JS files.
2. **Critical Architectural Difference**: **Vercel does NOT execute `server.mjs`!** According to `.vercelignore` (which explicitly ignores `server.mjs`, `package.json`, and `node_modules`), Vercel serves pure static files. All replacements and markup fixes MUST be baked statically into `venues/open-earth-lawn.html` and disk assets.
3. **Existing Defect Status Confirmed on localhost:3003**:
   - **Footer**: Subpage has a custom 70KB SVG track with different dimensions (`1344px` vs `2525px` on Home) and broken letter spans (`V  nues`, `A  out`), whereas `index.html` has the canonical 108KB working Framer ticker.
   - **Location Section**: Heading currently renders with lowercase/uppercase anomalies and black color (`rgb(0,0,0)`) with split letter spans instead of crisp olive `#4E5240` / `rgba(78, 82, 64, 0.50)`; "Open in Maps" button lacks the `#616452` background and `#FFF0CA` text.
   - **Map Badge & Pulse**: Sits too close to the sticky bottom CTA button ("Check Availability"), creating visual collision.
   - **Gallery**: All 6 slide images currently link to remote Framer placeholder URLs (`CVXtCf6tZR6dJm2eWWVQtlAQ.webp`, `vdC19zZ0zxxk4ZeoeHw8fvtyjY.webp`, etc.) and display room titles ("Living Room").
   - **Other Venues**: Left card (`Grassland Gala`) renders a pitch-black SVG box (`data:image/svg+xml;...`) instead of the authentic card image `/images/card_2_grassland_gala.webp`.
4. **Tooling & Engine**: Playwright is available via `file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs` using `channel: 'msedge'`.
5. **Deployment Target**: Vercel project `the-grand-lucknow` (`prj_yVNUQ8Xwkmb7otptdPtbiuLmQ4qe`), deployed via `npx vercel --prod --yes` to `https://the-grand-lucknow.vercel.app`.

---

## 2. Preview Server Architecture (`server.mjs`)

### 2.1 Lifecycle and Ports
- **Runtime**: Node.js `http` module server (`server.mjs`).
- **Port Selection**: `const PORT = process.env.PORT || 3003;`.
- **Current State**: Active and listening on `[::]:3003` (verified via `Get-NetTCPConnection`).
- **Invocation**: `node server.mjs` or `npm start`.

### 2.2 Request Routing Logic
1. **URL Sanitization**: Strips query strings and Framer scale parameters:
   ```javascript
   let cleanUrl = req.url.split('?')[0].split('&scale-down-to=')[0];
   let reqPath = decodeURI(cleanUrl);
   if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
   ```
2. **HTML Handling & Subpage Serving**:
   - When `/venues/open-earth-lawn` is requested, `candidateHtml` resolves to `venues/open-earth-lawn.html`.
   - File is read from disk, passed through `swapText(content)`, and served with headers:
     `Content-Type: text/html; charset=utf-8`
     `Cache-Control: no-cache, no-store, must-revalidate, max-age=0`
3. **Venue Aliases Fallback (lines 242–269)**:
   - Supports routing for `/venues/<slug>` and `/apartments/<slug>`.
   - Resolves aliases (e.g. `boutique-n1` $\to$ `venue-n1.html`).
4. **Dynamic Script Proxy & Cache (lines 206–231)**:
   - If an `.mjs` or `.js` bundle is missing in local `scripts/`, it fetches upstream from `https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/<filename>`, applies `swapText`, saves to `scripts/<filename>`, and serves.
5. **Static Assets**:
   - Directly streams `.webp`, `.png`, `.jpg`, `.svg`, `.woff2` with proper MIME types.
   - If an image route returns missing, returns `404 Not Found`.

### 2.3 The Vercel Static Reality (Critical Warning)
`server.mjs` executes runtime `swapText()` replacements (e.g., replacing "Casa Momo" with "The Grand", "Boutique N°1" with "Open Earth Lawn").
However:
- `.vercelignore` ignores `server.mjs` and `package.json`.
- Vercel deploys as a **static site**, serving files directly from disk without running Node.js.
- **Worker Imperative**: Any text replacements, asset URLs, or markup changes MUST exist statically in `venues/open-earth-lawn.html`. Do not rely on `server.mjs` runtime interceptors.

---

## 3. Deep Analysis of the 5 Verification Targets & Concrete Assertions

### Feature 1: Universal Footer Replication
#### Defect Root Cause
In `venues/open-earth-lawn.html`, the footer was modified with custom character spans that flexed incorrectly, resulting in split words (`V  nues`, `A  out`). Furthermore, the big text SVG was altered to a 1344px box (`viewBox="0 0 2404.809 300.206"`) rather than matching the canonical home page footer (`index.html`) layout (`2525px` SVG / CSS rolling ticker).
#### Requirements
1. Copy the exact working `<footer>` HTML block from `index.html`.
2. Include all necessary CSS classes (`hidden-o5o8qi`, `framer-v-1aamxx2`, `ticker-item`, `framer-18na9ah`, etc.).
3. Restore the infinite-loop marquee ticker (`grandInfiniteScrollFluid`).
4. Ensure letter baselines are perfectly aligned with zero split letters.
#### Automated Assertions (Playwright)
```javascript
// 1. Structure Parity
const footer = page.locator('footer.framer-18na9ah');
await expect(footer).toBeVisible();

// 2. Continuous Marquee Ticker Motion
const tickerTrack = page.locator('footer .framer-n49p1z ul');
const t0 = await tickerTrack.evaluate(el => window.getComputedStyle(el).transform);
await page.waitForTimeout(600);
const t1 = await tickerTrack.evaluate(el => window.getComputedStyle(el).transform);
// Verify transform changes over time (continuous infinite loop)
assert.notStrictEqual(t0, t1, 'Ticker must be actively animating');

// 3. Unbroken Letters Baseline & Horizontal Spacing Check
const brokenWordReport = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll('footer a'));
  const issues = [];
  for (const link of links) {
    const charSpans = Array.from(link.querySelectorAll('span[data-rolling-label] > span[aria-hidden="true"]'));
    if (charSpans.length === 0) continue;
    const tops = charSpans.map(s => Math.round(s.getBoundingClientRect().top));
    const allSameTop = tops.every(t => t === tops[0]);
    const word = charSpans.map(s => s.children[1]?.textContent || '').join('');
    if (!allSameTop) {
      issues.push({ word, reason: 'Vertical letter splitting', tops });
    }
  }
  return issues;
});
assert.strictEqual(brokenWordReport.length, 0, `Detected broken footer letters: ${JSON.stringify(brokenWordReport)}`);

// 4. Dimensional / Font Size Parity
const footerHeight = await footer.evaluate(el => el.getBoundingClientRect().height);
// index.html desktop footer height is ~933.7px
assert.ok(Math.abs(footerHeight - 933.7) < 15, `Footer height (${footerHeight}) does not match home page`);
```

---

### Feature 2: Location Section Contrast & "Open in Maps" Button
#### Defect Root Cause
1. Watermark heading renders washed out or inconsistent lowercase (`location`), whereas Casamomo reference uses crisp, capitalized `Location` with dark-olive `#4E5240` / `rgba(78, 82, 64, 0.50)` contrast.
2. The "Open in Maps" CTA button lacked dark-olive pill styling (`#616452` background, `#FFF0CA` cream text, pill border-radius).
#### Automated Assertions (Playwright)
```javascript
// 1. Capitalization & Text
const watermarkText = await page.locator('[data-framer-name="Location Text"], #bigtext-1, .framer-fg60rc h2, .framer-fg60rc p').first().textContent();
assert.ok(watermarkText.includes('Location'), 'Location heading must be capitalized');
assert.ok(!watermarkText.includes('location'), 'Lowercase "location" must not appear');

// 2. Contrast & Color Check
const watermarkColor = await page.locator('#bigtext-1, [data-framer-name="Location Text"]').first().evaluate(el => {
  const style = window.getComputedStyle(el);
  return { color: style.color, opacity: style.opacity };
});
// Verify color reflects #4E5240 / rgba(78, 82, 64, 0.50)
console.log('Watermark style:', watermarkColor);

// 3. "Open in Maps" Button Styling
const mapsBtn = page.locator('[data-framer-name="Location"] a.framer-vO7O2, a.grand-nav-maps-btn').first();
await expect(mapsBtn).toBeVisible();
const btnStyle = await mapsBtn.evaluate(el => {
  const cs = window.getComputedStyle(el);
  return {
    bg: cs.backgroundColor,
    color: cs.color,
    radius: cs.borderRadius,
    href: el.getAttribute('href')
  };
});
// #616452 is rgb(97, 100, 82); #FFF0CA is rgb(255, 240, 202)
assert.ok(btnStyle.bg.includes('97') || btnStyle.bg.includes('616452') || btnStyle.bg === 'rgb(97, 100, 82)', 'Button bg must be dark olive #616452');
assert.ok(btnStyle.color.includes('255, 240, 202') || btnStyle.color.includes('fff0ca'), 'Button text must be cream #FFF0CA');
assert.ok(parseInt(btnStyle.radius) >= 20 || btnStyle.radius.includes('9999px'), 'Button must have pill radius');
```

---

### Feature 3: Map Badge & Pulse Positioning (No Overlap)
#### Defect Root Cause
In `#subpage-vector-map`, the "The Grand" chip and cyan pulse dot were positioned at `bottom: 32px`, `left: 50%`, directly intersecting the sticky "Check Availability" CTA button in the viewport.
#### Geometry & Safety Buffer Requirements
- Badge `The Grand` moved above and to the left (e.g. `top: 38%`, `left: 22%` or `bottom: 140px`, `left: calc(50% - 130px)`).
- Cyan pulsating dot sits safely above the CTA boundary.
- **Strict Invariant**: `BoundingBox(Chip)` $\cap$ `BoundingBox(CTA Button)` $= \emptyset$.
#### Automated Assertions (Playwright)
```javascript
await page.locator('#subpage-vector-map').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);

const overlapCheck = await page.evaluate(() => {
  const chip = document.querySelector('.casa-map-chip.active-venue-chip, .grand-pill');
  const pulse = document.querySelector('.casa-map-pulse');
  const cta = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
  
  if (!chip || !cta) return { error: 'Elements missing' };
  
  const cRect = chip.getBoundingClientRect();
  const pRect = pulse ? pulse.getBoundingClientRect() : null;
  const bRect = cta.getBoundingClientRect();
  
  const intersects = (r1, r2) => !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
  
  return {
    chipIntersectsCta: intersects(cRect, bRect),
    pulseIntersectsCta: pRect ? intersects(pRect, bRect) : false,
    distanceY: bRect.top - cRect.bottom,
    distanceX: bRect.left - cRect.right
  };
});

assert.strictEqual(overlapCheck.chipIntersectsCta, false, 'Map badge MUST NOT overlap Sticky CTA button');
assert.strictEqual(overlapCheck.pulseIntersectsCta, false, 'Pulse dot MUST NOT overlap Sticky CTA button');
```

---

### Feature 4: Gallery Photo Replacement & Numbering Clean-up
#### Defect Root Cause
1. Slide images currently point to remote Framer placeholder apartment photos (`CVXtCf6tZR6dJm2eWWVQtlAQ.webp`, `vdC19zZ0zxxk4ZeoeHw8fvtyjY.webp`, `SddmKT60VwqookDK5SjzoRisU.webp`).
2. Slide captions contain room descriptions ("Living Room").
3. Slide counter is not formatted strictly as single-fraction `1/6`, `2/6` ... `6/6`.
#### Requirements
1. Copy source asset `C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\.user_uploaded\media_1794032332967_bb41bc6b.jpg` to `images/venues/the_grand_open_earth_lawn_hero.jpg`.
2. Replace all 6 slide images with this authentic image.
3. Remove/hide room label ("Living Room").
4. Enforce fraction numbering `1/6`, `2/6`, `3/6`, `4/6`, `5/6`, `6/6`.
#### Automated Assertions (Playwright)
```javascript
// 1. Image Replacement & Availability
const galleryImgs = await page.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('.framer-1rjv5m9 img'));
  return imgs.map(img => ({
    src: img.src,
    naturalWidth: img.naturalWidth,
    loaded: img.complete && img.naturalWidth > 0
  }));
});
assert.strictEqual(galleryImgs.length, 6, 'Must have exactly 6 gallery images');
for (let i = 0; i < galleryImgs.length; i++) {
  const img = galleryImgs[i];
  assert.ok(img.src.includes('the_grand_open_earth_lawn_hero.jpg'), `Slide ${i+1} must use authentic open earth lawn photo`);
  assert.ok(!img.src.includes('CVXtCf6tZR6dJm2eWWVQtlAQ'), `Slide ${i+1} must not use Framer apartment placeholder`);
  assert.ok(img.loaded, `Slide ${i+1} image must load successfully (naturalWidth > 0)`);
}

// 2. Room Label Removal
const galleryText = await page.locator('.framer-1rjv5m9, .framer-1s87mre').textContent();
assert.ok(!galleryText.includes('Living Room'), 'Living Room label must be completely removed');

// 3. Numbering Format Check (1/6 through 6/6)
const counters = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('.framer-10h7a2v, [data-framer-name="Number"], [data-framer-name="Counter"]'));
  return els.map(e => e.textContent.trim()).filter(t => t.includes('/6'));
});
assert.ok(counters.length > 0, 'Fraction counter (x/6) must exist');
```

---

### Feature 5: "Other Venues" Section Imagery & Active Redirects
#### Defect Root Cause
In `[data-framer-name="Apartment Lists"]` / `.framer-2iif9c`:
1. Card 1 (`Grassland Gala`) currently renders an inline SVG data URI (`data:image/svg+xml;...`) producing a solid black box.
2. Card 2 links to upstream Framer assets instead of the local webp image.
#### Requirements
1. Card 1 image replaced with `/images/card_2_grassland_gala.webp`.
2. Card 2 image replaced with `/images/card_3_ballroom.webp`.
3. Links verified to redirect correctly to `/venues/grassland-gala` and `/venues/garden-galaxy`.
#### Automated Assertions (Playwright)
```javascript
const otherCards = page.locator('[data-framer-name="Apartment Lists"] a, .framer-2iif9c a');
const card1Img = otherCards.nth(0).locator('img');
const card2Img = otherCards.nth(1).locator('img');

// Check Card 1 Image
const c1Src = await card1Img.getAttribute('src');
assert.ok(c1Src.includes('card_2_grassland_gala.webp'), 'Card 1 must use card_2_grassland_gala.webp');
assert.ok(!c1Src.startsWith('data:image/svg+xml'), 'Card 1 must NOT be black SVG data URI');

// Check Card 2 Image
const c2Src = await card2Img.getAttribute('src');
assert.ok(c2Src.includes('card_3_ballroom.webp'), 'Card 2 must use card_3_ballroom.webp');

// Verify Click Redirects / HTTP 200
const card1Href = await otherCards.nth(0).getAttribute('href');
const card2Href = await otherCards.nth(1).getAttribute('href');
assert.ok(card1Href.includes('grassland-gala') || card1Href.includes('venue-n2'), 'Card 1 must link to Grassland Gala');
assert.ok(card2Href.includes('garden-galaxy') || card2Href.includes('venue-n3'), 'Card 2 must link to Garden Galaxy');
```

---

## 4. Automated Playwright Verification Suite Specification

### Reusable Test Harness Pattern
All existing working tests in `tools/` import Playwright via:
```javascript
import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
```
### Recommended Local Verification Script: `tools/verify_subpage_parity.mjs`
The Worker should execute a single, comprehensive verification script that validates all 5 features and outputs visual proof screenshots into the brain directory `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/`:
1. `proof_m1_footer_desktop.png` (Desktop 1440px footer)
2. `proof_m1_footer_mobile.png` (Mobile 390px footer)
3. `proof_m1_location_section.png` (Watermark contrast & dark-olive button)
4. `proof_m1_map_pin_clearance.png` (Map pin & pulse with sticky CTA)
5. `proof_m1_gallery_slides.png` (Authentic photo + fraction counter)
6. `proof_m1_other_venues.png` (Grassland Gala & Ballroom card imagery)

---

## 5. Vercel Deployment Pipeline Analysis

### 5.1 Project Linkage & Credentials
- **Configuration File**: `.vercel/project.json`
- **Project ID**: `prj_yVNUQ8Xwkmb7otptdPtbiuLmQ4qe`
- **Organization ID**: `team_czfqd8DvaYce2r98sohLseCv`
- **Project Name**: `the-grand-lucknow`
- **Production URL**: `https://the-grand-lucknow.vercel.app`

### 5.2 How `npx vercel --prod --yes` Operates
1. Because `.vercel/project.json` exists, the CLI automatically links to the existing project `the-grand-lucknow`.
2. `--yes` skips interactive confirmations.
3. `--prod` immediately assigns the deployment to production aliases (`the-grand-lucknow.vercel.app`).
4. Files matching `.vercelignore` are excluded:
   - Excluded: `server.mjs`, `package.json`, `node_modules`, `tools/`, `.agents/`, `archive/`.
   - Included: `index.html`, `venues/`, `images/`, `scripts/`, `fonts/`, `vercel.json`.
5. Since there is no build command or serverless function in `vercel.json`, Vercel deploys an instantaneous static artifact.

---

## 6. Post-Deployment Smoke Test Procedure

### Automated Production Smoke Test: `tools/verify_production_smoke.mjs`
Once `npx vercel --prod --yes` completes, execute a live headless audit verifying:
1. **HTTP Status Code**: 200 OK across primary routes:
   - `https://the-grand-lucknow.vercel.app/`
   - `https://the-grand-lucknow.vercel.app/venues/open-earth-lawn`
   - `https://the-grand-lucknow.vercel.app/venues/grassland-gala`
   - `https://the-grand-lucknow.vercel.app/venues/garden-galaxy`
2. **Zero Console Errors**: Listen to `page.on('console', msg => ...)` and fail if `msg.type() === 'error'`.
3. **Zero 404 Assets**: Listen to `page.on('response', res => ...)` and fail if any request to `images/`, `scripts/`, or `fonts/` returns status $\ge 400$.
4. **Live DOM Assertions**: Run the same feature assertions on the live URL to confirm static parity.
5. **Cross-Device Proof Capture**:
   - Capture `proof_production_desktop_open_earth_lawn.png` (1440x900).
   - Capture `proof_production_mobile_open_earth_lawn.png` (390x844).

---

## 7. Next Steps for Worker
1. Create `images/venues/the_grand_open_earth_lawn_hero.jpg` by copying the user source photo.
2. In `venues/open-earth-lawn.html`:
   - Replace the corrupted footer block with the byte-for-byte footer from `index.html`.
   - Update Location heading text to `Location` and contrast to `rgba(78, 82, 64, 0.50)` / `#4E5240`.
   - Style "Open in Maps" button with `#616452` dark olive bg, `#FFF0CA` cream text, and pill border-radius.
   - Adjust `#subpage-vector-map` pin coordinates to prevent sticky CTA collision.
   - Replace all 6 slide images with the authentic hero photo, strip "Living Room" text, and format counter as `1/6` .. `6/6`.
   - Update "Other Venues" card 1 image to `/images/card_2_grassland_gala.webp` and card 2 image to `/images/card_3_ballroom.webp`.
3. Run local Playwright verification against `http://localhost:3003/venues/open-earth-lawn`.
4. Run `npx vercel --prod --yes` to deploy.
5. Execute live production smoke test and capture final proof screenshots.
