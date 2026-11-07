# Handoff Report — Universal Footer & Other Venues Parity (Milestone M1)

**From**: Explorer 1 (`teamwork_explorer_m1_1`)  
**To**: Parent Orchestrator (`7bfd851c-1b48-41cf-b70d-7220cb044fa3`) / Downstream Implementation Worker  
**Date**: 2026-11-07  
**Artifact Directory**: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_1\`  
**Target Codebase**: `venues/open-earth-lawn.html`, `server.mjs`, `vercel.json`  
**Reference Codebase**: `index.html` (Untouched, read-only baseline)  

---

## 1. Observation

Direct empirical observations from source code audits and browser runtime verification:

1. **Footer Container & Variant Structure in `index.html`**:
   - `index.html:48`: Outer container `<footer class="framer-1a6q2h0" tabIndex="0">` wraps two SSR variants:
     - Desktop/Tablet variant: `<div class="ssr-variant hidden-o5o8qi"><div class="framer-v-1aamxx2" tabIndex="0">...</div></div>`
     - Mobile variant: `<div class="ssr-variant hidden-72rtr7 hidden-p8zd8m"><div class="framer-v-n1wrvs" tabIndex="0">...</div></div>`
   - In `<style data-framer-breakpoint-css>` of `index.html`:
     - `@media (min-width: 1200px) { .hidden-72rtr7 { display: none !important; } }`
     - `@media (min-width: 810px) and (max-width: 1199.98px) { .hidden-p8zd8m { display: none !important; } }`
     - `@media (max-width: 809.98px) { .hidden-o5o8qi { display: none !important; } }`

2. **Footer Structure in `venues/open-earth-lawn.html`**:
   - `venues/open-earth-lawn.html:1435-1540`: The outer variant wrappers (`.ssr-variant.hidden-o5o8qi`) were completely omitted. The breakpoint classes in its `<style data-framer-breakpoint-css>` are `.hidden-1azqig2`, `.hidden-1l94oxb`, and `.hidden-u6hac7`, so `.hidden-o5o8qi` is unstyled.
   - The subpage forced arbitrary fluid viewport styles:
     `width: min(2405px, calc(var(--grand-page-w, 100vw) * 1.503125))`
     `height: min(300px, calc(var(--grand-page-w, 100vw) * 0.187500))`
     On a standard 1440px desktop screen, `height` evaluated to 270px vs 150px on `index.html`.

3. **Broken Letters ("V  nues", "A  out")**:
   - `venues/open-earth-lawn.html:1542-1605`: Custom function `initGrandFooterMotions()` attached `mouseenter` and `mouseleave` listeners to `[data-rolling-label]`. It looped over child `span` characters with:
     ```javascript
     span.style.transition = `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.016}s`;
     span.style.transform = isHover ? 'translateY(-100%)' : 'translateY(0%)';
     ```
   - Visual capture `proof_venues_hover_mid.png` and `proof_about_hover_mid.png` confirmed characters drifting apart vertically and horizontally, creating large visual gaps ('V  nues', 'A  out').
   - In `index.html`, hover on `[data-framer-name="Footer Link"]` uses pure CSS opacity/color transitions without per-character JS splitting.

4. **"THE GRAND" Banner Asset & Markup**:
   - In `index.html:520`, `.framer-xj8hz2` uses an inline SVG data URI as `background-image`:
     `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="50%" y="225" text-anchor="middle" font-family="\'Lay Grotesk Regular\', sans-serif" font-size="192" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>')`
   - In `venues/open-earth-lawn.html:1443-1454, 1511-1528`: Replaced with 4 inline `<svg>` blocks rendering path vectors (`d="M 112.277 34.868 L 115.879 ..."`), which caused rendering distortion and excessive height.

5. **Marquee Ticker Loop**:
   - In `index.html`, ticker animation is driven dynamically by Framer's React runtime (`/scripts/script_main.mjs`).
   - In `venues/open-earth-lawn.html`, Framer runtime is absent. The subpage attempted a CSS `@keyframes grandInfiniteScrollFluid` translation based on `calc(-1 * (min(2405px, ...) + min(162px, ...)))` and a hardcoded `-1284px` mobile rule, resulting in stuttering and jumping at loop reset.

6. **"Other Venues" Section (Line 1125)**:
   - Card 1 (`open-earth-lawn.html:1125-1170`):
     - `src="data:image/svg+xml;utf8,<svg ...><rect fill='%23141a15'/></svg>"` (Black box).
     - Heading: `Open Earth Lawn N°2`.
     - Link target: `/venues/grassland-gala`.
   - Card 2 (`open-earth-lawn.html:1175-1220`):
     - `src="https://framerusercontent.com/images/UayMv2I16UbQQBQkbI90HsJMv5o.webp"`.
     - Heading: `Open Earth Lawn N°3`.
     - Link target: `/venues/garden-galaxy`.
   - Disk assets exist at:
     - `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\images\card_2_grassland_gala.webp` (59,510 bytes).
     - `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\images\card_3_ballroom.webp` (52,652 bytes).
   - In `server.mjs` and `vercel.json`: No rewrites/aliases currently exist for `/venues/grassland-gala` or `/venues/garden-galaxy`.

---

## 2. Logic Chain

1. **Broken Letter Spacing**:
   - Observation 3 shows character-by-character JS splitting and staggered CSS transitions applied on mouseenter.
   - Letters animate independently with delayed offsets, causing some letters to translate while others remain stationary.
   - Inline-block display eliminates OpenType letter spacing and kerning.
   - **Inference**: Removing `initGrandFooterMotions()` and retaining solid anchor text strings with simple CSS hover transitions directly eliminates character fragmentation.

2. **Oversized Footer Banner**:
   - Observation 4 shows `open-earth-lawn.html` replaced the 150px height data URI background with vector path SVGs scaled with `calc(var(--grand-page-w) * 0.187500)`.
   - At desktop 1440px, this multiplies to 270px.
   - **Inference**: Re-adopting the data URI background styling with `width: min(1203px, 92vw)` and `height: 150px` restores exact visual parity with `index.html`.

3. **Marquee Ticker Loop Jitter**:
   - Observation 5 shows that without React runtime virtualization, a single CSS track translating an arbitrary calculated distance fails due to subpixel misalignment.
   - **Inference**: A pure CSS 2-track marquee system (`track-a` and `track-b`), where each track animates from `translate3d(0, 0, 0)` to `translate3d(-100%, 0, 0)` over 20s linear, provides a seamless, continuous, zero-gap loop across all viewport widths.

4. **Missing Breakpoint Classes**:
   - Observations 1 and 2 reveal that `index.html` relies on `.hidden-o5o8qi` for desktop/tablet and `.hidden-72rtr7 hidden-p8zd8m` for mobile.
   - Because `open-earth-lawn.html` lacks these classes in its breakpoint style tag, importing the `index.html` footer verbatim would render both mobile and desktop variants simultaneously without media query overrides.
   - **Inference**: The worker must explicitly inject the responsive media queries for `.hidden-o5o8qi`, `.hidden-72rtr7`, and `.hidden-p8zd8m` into `open-earth-lawn.html`.

5. **Other Venues Card Images & Routing**:
   - Observation 6 confirms the presence of verified local assets `card_2_grassland_gala.webp` and `card_3_ballroom.webp`.
   - Updating `src`/`srcset` and headings ("Grassland Gala", "Garden Galaxy") corrects content accuracy.
   - Updating `server.mjs` and `vercel.json` guarantees functional navigation when clicked.

---

## 3. Caveats

1. **`index.html` Immutability**: All adjustments must be applied strictly to `venues/open-earth-lawn.html`, `server.mjs`, and `vercel.json`. `index.html` must remain 100% untouched.
2. **Sticky CTA Button Collision**: The floating `Check Availability` pill (`.framer-vO7O2`) has `position: fixed; bottom: 32px`. When the user reaches the bottom of the page, it can obscure the footer copyright text. The worker should include an `IntersectionObserver` or CSS rule to fade out the CTA when the footer is visible.
3. **Venue 2 & Venue 3 HTML Templates**: The destination routes `/venues/grassland-gala` and `/venues/garden-galaxy` map to `venues/venue-n2.html` and `venues/venue-n3.html` respectively. The worker must verify these target templates exist or configure clean aliases.

---

## 4. Conclusion

The visual and functional regressions in the footer and Other Venues section of `venues/open-earth-lawn.html` are completely cataloged, isolated to specific lines, and ready for deterministic implementation by the downstream worker.
- Replace lines 1435-1605 in `venues/open-earth-lawn.html` with the dual-variant SSR footer, pure CSS 2-track ticker, and data URI background image.
- Remove `initGrandFooterMotions()` to fix the letter staggering.
- Replace line 1125 card images with `/images/card_2_grassland_gala.webp` and `/images/card_3_ballroom.webp`, updating card titles to `Grassland Gala` and `Garden Galaxy`.
- Add clean route rewrites in `server.mjs` and `vercel.json`.

---

## 5. Verification Method

To independently verify after worker implementation:

1. **Source Code Line Inspection**:
   - Verify `venues/open-earth-lawn.html` contains `.ssr-variant.hidden-o5o8qi` and `.ssr-variant.hidden-72rtr7.hidden-p8zd8m`.
   - Verify `initGrandFooterMotions()` is completely absent.
   - Verify Card 1 has `src="/images/card_2_grassland_gala.webp"` and Card 2 has `src="/images/card_3_ballroom.webp"`.
2. **Local HTTP Verification**:
   - Start preview server: `node server.mjs` (or verify port 3003).
   - Fetch target subpage: `curl http://localhost:3003/venues/open-earth-lawn`.
   - Confirm HTTP 200 response and check that both image URLs are returned in the response HTML.
   - Verify redirects: `curl -I http://localhost:3003/venues/grassland-gala` returns 200 or 302.
3. **Headless Browser Visual QA**:
   - Run Playwright test script:
     ```javascript
     const { chromium } = require('playwright');
     (async () => {
       const browser = await chromium.launch();
       const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
       await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'domcontentloaded' });
       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
       await page.waitForTimeout(1000);
       await page.screenshot({ path: 'verify_subpage_footer.png' });
       await browser.close();
     })();
     ```
   - Check `verify_subpage_footer.png` to confirm:
     - "THE GRAND" banner height matches reference (~150px).
     - Marquee ticker flows continuously without gaps or jitter.
     - Footer links ("Venues", "About", "Experience", "Journal", "Contact") remain solid without broken letter gaps on hover.
     - "Other Venues" cards display correct photographic imagery instead of black SVG placeholders.
