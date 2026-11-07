# Technical Analysis & Fix Strategy: Universal Footer & Other Venues Parity

**Author**: Explorer 1 (`teamwork_explorer_m1_1`)  
**Parent Orchestrator**: `7bfd851c-1b48-41cf-b70d-7220cb044fa3`  
**Milestone**: M1 (Subpage Parity, Universal Footer & Venue Polish)  
**Target File**: `venues/open-earth-lawn.html`  
**Reference File**: `index.html` (Strictly READ ONLY)  
**Status**: COMPLETE  

---

## Executive Summary

A deep architectural and forensic audit comparing the universal footer in `index.html` and `venues/open-earth-lawn.html`, alongside the "Other Venues" card grid, revealed critical root causes for visual regressions:
1. **Broken Letters ("V  nues", "A  out")**: Caused by an artificial JavaScript stagger loop (`initGrandFooterMotions()`, lines 1542-1605 in `open-earth-lawn.html`) that split link text into inline-block spans with individual `transition-delay` and vertical transforms, compounded by hover interference from the magnetic cursor follower.
2. **Font Size Discrepancy & Giant Footer Banner**: In `index.html`, `.framer-xj8hz2` displays "THE GRAND" at 1203px x 150px using an inline SVG background image. In `open-earth-lawn.html` (lines 1443-1454, 1511-1528), this was replaced with 4 inline `<svg>` vector path elements styled with fluid multipliers (`min(2405px, calc(var(--grand-page-w) * 1.503125))`), forcing the height to 270px on a standard 1440px desktop (180% larger than reference).
3. **Marquee Ticker Loop Breakdown**: `index.html` relies on Framer's React runtime (`script_main.mjs`) for infinite ticker virtualization. `open-earth-lawn.html` lacks this runtime and attempted a CSS keyframe translation with incorrect calc dimensions and hardcoded mobile pixel offsets (`-1284px`), producing visual stutter, jumps, and gaps.
4. **Missing Breakpoint Classes**: The responsive wrapper classes from `index.html` (`hidden-o5o8qi` for desktop/tablet; `hidden-72rtr7 hidden-p8zd8m` for mobile) are missing from the subpage's `<style data-framer-breakpoint-css>`, which uses `hidden-1azqig2`, `hidden-1l94oxb`, `hidden-u6hac7`.
5. **Other Venues Card Inaccuracies (Line 1125)**: Card 1 renders a black SVG rectangle placeholder with heading "Open Earth Lawn N°2". Card 2 uses a legacy Framer CDN image with heading "Open Earth Lawn N°3". Neither redirects reliably due to missing aliases in `server.mjs` and `vercel.json`.

---

## Part 1: Structural Comparison (`index.html` vs `venues/open-earth-lawn.html`)

### 1.1 `index.html` (Canonical Reference)
- **Container**: `<footer class="framer-1a6q2h0" tabIndex="0">` (line 48).
- **Responsive SSR Architecture**:
  - **Desktop / Tablet Variant** (`>= 810px`):
    ```html
    <div class="ssr-variant hidden-o5o8qi">
      <div class="framer-v-1aamxx2" tabIndex="0">
        <!-- Top row: Book a tour button, legal links, time display, social links -->
        <!-- Marquee Ticker: .framer-1k7cvy2 > .framer-fhy8w2 > ul.framer-1a42wfv -->
        <!-- Brand Title: .framer-xj8hz2 ("THE GRAND") -->
      </div>
    </div>
    ```
  - **Mobile Variant** (`<= 809.98px`):
    ```html
    <div class="ssr-variant hidden-72rtr7 hidden-p8zd8m">
      <div class="framer-v-n1wrvs" tabIndex="0">
        <!-- Compact stacked layout for small viewports -->
      </div>
    </div>
    ```
- **Styling Architecture**:
  - Background: `var(--token-16db3221-68a2-44ed-9694-dc30db0040db, rgb(20, 26, 21))` (Dark Forest / Black Olive).
  - Text Color: `var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))` (Warm Ivory / Sand).
  - Ticker: Displays "THE GRAND" repeated with separator emblems (`/images/emblem.svg` / star motifs), rendered as `li.ticker-item`.
  - Brand Heading: `.framer-xj8hz2` uses CSS background-image:
    ```css
    .framer-xj8hz2 {
      width: 1203px;
      height: 150px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="50%" y="225" text-anchor="middle" font-family="\'Lay Grotesk Regular\', sans-serif" font-size="192" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    ```

### 1.2 `venues/open-earth-lawn.html` (Current State & Deficiencies)
- **Container**: Lines 1435-1540.
- **Removed Responsive Wrapper**: The outer `.ssr-variant.hidden-o5o8qi` wrapper was stripped. The page attempted a single dynamic layout with complex CSS viewport calculations:
  ```css
  width: min(2405px, calc(var(--grand-page-w, 100vw) * 1.503125));
  height: min(300px, calc(var(--grand-page-w, 100vw) * 0.187500));
  ```
- **Inline SVG Vector Paths**: Four inline `<svg>` elements with serif paths replaced the clean data URI background image, causing high DOM bloat and extreme scaling bugs.
- **JavaScript Mutation**: Lines 1542-1605 inject `initGrandFooterMotions()`, attaching event listeners that break text rendering on hover.

---

## Part 2: Root Causes of Subpage Defects

### 2.1 The "V  nues" and "A  out" Broken Letter Spacing
- **Mechanism**:
  Lines 1555-1590 of `venues/open-earth-lawn.html`:
  ```javascript
  link.querySelectorAll('[data-rolling-label] span').forEach((span, i) => {
    span.style.transition = `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.016}s`;
    span.style.transform = isHover ? 'translateY(-100%)' : 'translateY(0%)';
  });
  ```
- **Consequences**:
  1. Adjacent characters have different transition delays (`0.016s * i`). When the cursor moves across the word, letters are suspended at different vertical offsets.
  2. Rendering each letter inside an `inline-block` container destroys OpenType font kerning and tracking, creating visible whitespace gaps between 'V' and 'e', and 'A' and 'b'.
  3. The magnetic follower cursor (`#casa-magnetic-cursor-follower`) hovers directly beneath the mouse, causing rapid mouseenter/mouseleave thrashing.

### 2.2 The "THE GRAND" Font Size & Visual Bloat
- In `index.html`, on a 1440px desktop screen, `.framer-xj8hz2` has a fixed width of 1203px and height of 150px.
- In `open-earth-lawn.html`, lines 1443-1454:
  `height: min(300px, calc(1440px * 0.187500)) = 270px`.
  This makes the text **180% larger** in height than the reference home page!

### 2.3 Marquee Ticker Loop Jitter & Jumps
- `open-earth-lawn.html` does not load Framer's `script_main.mjs` (doing so would overwrite the subpage DOM).
- The CSS keyframe attempted:
  ```css
  @keyframes grandInfiniteScrollFluid {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-1 * (min(2405px, var(--grand-page-w) * 1.503125) + min(162px, var(--grand-page-w) * 0.10125)))); }
  }
  ```
- Because the translation distance did not match the exact width of the ticker segment, each loop reset caused a noticeable snap/jump.

---

## Part 3: Step-by-Step Fix Strategy for Universal Footer

### 3.1 Restore Desktop & Mobile Responsive SSR Architecture
The worker must clone the dual-variant structure from `index.html` with explicit breakpoint CSS rules:
```html
<footer class="framer-1a6q2h0" tabIndex="0">
  <!-- Desktop / Tablet Variant (Visible >= 810px) -->
  <div class="ssr-variant hidden-o5o8qi">
    <div class="framer-v-1aamxx2" tabIndex="0">
      <!-- Complete Desktop Markup -->
    </div>
  </div>

  <!-- Mobile Variant (Visible <= 809.98px) -->
  <div class="ssr-variant hidden-72rtr7 hidden-p8zd8m">
    <div class="framer-v-n1wrvs" tabIndex="0">
      <!-- Complete Mobile Markup -->
    </div>
  </div>
</footer>
```

In the `<style>` block of `open-earth-lawn.html`, ensure the breakpoint classes are explicitly mapped:
```css
@media (min-width: 1200px) {
  .hidden-72rtr7 { display: none !important; }
}
@media (min-width: 810px) and (max-width: 1199.98px) {
  .hidden-p8zd8m { display: none !important; }
}
@media (max-width: 809.98px) {
  .hidden-o5o8qi { display: none !important; }
}
```

### 3.2 Purge `initGrandFooterMotions()` & Letter Splitting
1. Remove lines 1542-1605 in `venues/open-earth-lawn.html`.
2. Keep text content in clean, solid strings without per-character spans.
3. Use CSS-only hover states matching `index.html`:
   ```css
   .framer-1p5wquj a {
     transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
   }
   .framer-1p5wquj a:hover {
     opacity: 0.7;
   }
   ```

### 3.3 Perfect Infinite Marquee Ticker (Pure CSS 2-Track Architecture)
To achieve a completely seamless, continuous loop without Framer's React runtime:
1. Construct a wrapper with two identical tracks (`track-a` and `track-b`):
   ```html
   <div class="grand-ticker-container">
     <div class="grand-ticker-track">
       <div class="ticker-item"><span>THE GRAND</span><span class="ticker-star">★</span></div>
       <div class="ticker-item"><span>THE GRAND</span><span class="ticker-star">★</span></div>
       <div class="ticker-item"><span>THE GRAND</span><span class="ticker-star">★</span></div>
       <div class="ticker-item"><span>THE GRAND</span><span class="ticker-star">★</span></div>
     </div>
     <div class="grand-ticker-track" aria-hidden="true">
       <div class="ticker-item"><span>THE GRAND</span><span class="ticker-star">★</span></div>
       <div class="ticker-item"><span>THE GRAND</span><span class="ticker-star">★</span></div>
       <div class="ticker-item"><span>THE GRAND</span><span class="ticker-star">★</span></div>
       <div class="ticker-item"><span>THE GRAND</span><span class="ticker-star">★</span></div>
     </div>
   </div>
   ```
2. Apply hardware-accelerated CSS translation:
   ```css
   .grand-ticker-container {
     display: flex;
     width: 100%;
     overflow: hidden;
     user-select: none;
     mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
     -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
   }
   .grand-ticker-track {
     display: flex;
     flex-shrink: 0;
     align-items: center;
     justify-content: space-around;
     min-width: 100%;
     animation: grand-ticker-scroll 20s linear infinite;
     will-change: transform;
   }
   @keyframes grand-ticker-scroll {
     0% { transform: translate3d(0, 0, 0); }
     100% { transform: translate3d(-100%, 0, 0); }
   }
   ```
   *Result*: Track A animates from 0% to -100%. Track B follows identically behind it. When Track A reaches -100%, Track B is exactly at 0%, producing zero jitter, zero subpixel rounding jump, and an infinite smooth stream across all screen sizes.

### 3.4 Match "THE GRAND" SVG Logo Dimensions
Replace the heavy inline path SVGs with the exact SVG background styling from `index.html`:
```html
<div class="framer-xj8hz2" data-framer-name="THE GRAND"></div>
```
```css
.framer-xj8hz2 {
  width: min(1203px, 92vw);
  height: 150px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="50%" y="225" text-anchor="middle" font-family="\'Lay Grotesk Regular\', sans-serif" font-size="192" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 auto;
}
@media (max-width: 809.98px) {
  .framer-xj8hz2 {
    width: 90vw;
    height: 70px;
  }
}
```

---

## Part 4: Step-by-Step Fix Strategy for "Other Venues" Section

### 4.1 Target Location: Line 1125 in `venues/open-earth-lawn.html`
The section currently renders two venue cards side-by-side inside `.framer-1q4p7g4` / `.framer-d5v6z6`.

#### Card 1 (Grassland Gala):
- **Current Defect**:
  - `src="data:image/svg+xml;utf8,<svg ...><rect fill='%23141a15'/></svg>"` (Black box).
  - Title reads `Open Earth Lawn N°2`.
- **Target Replacement**:
  - `src="/images/card_2_grassland_gala.webp"`
  - `srcset="/images/card_2_grassland_gala.webp 512w, /images/card_2_grassland_gala.webp 1024w"`
  - Title: `Grassland Gala`
  - Subtitle / Tag: `Venue N°2`
  - Link: `href="/venues/grassland-gala"`

#### Card 2 (Garden Galaxy):
- **Current Defect**:
  - `src="https://framerusercontent.com/images/UayMv2I16UbQQBQkbI90HsJMv5o.webp"` (Outdated Framer asset).
  - Title reads `Open Earth Lawn N°3`.
- **Target Replacement**:
  - `src="/images/card_3_ballroom.webp"`
  - `srcset="/images/card_3_ballroom.webp 512w, /images/card_3_ballroom.webp 1024w"`
  - Title: `Garden Galaxy`
  - Subtitle / Tag: `Venue N°3`
  - Link: `href="/venues/garden-galaxy"`

### 4.2 Routing & Redirect Handlers
To prevent 404s when users click the "Other Venues" cards:
1. In `server.mjs`:
   Map the slug requests to the corresponding HTML templates:
   - `/venues/grassland-gala` -> `venues/venue-n2.html`
   - `/venues/garden-galaxy` -> `venues/venue-n3.html`
   - `/venues/open-earth-lawn` -> `venues/open-earth-lawn.html`
2. In `vercel.json`:
   Add production clean-url rewrites:
   ```json
   { "source": "/venues/grassland-gala", "destination": "/venues/venue-n2.html" },
   { "source": "/venues/garden-galaxy", "destination": "/venues/venue-n3.html" }
   ```

---

## Part 5: Implementation Checklist for Downstream Worker

| Item | Action | File | Target Lines |
|---|---|---|---|
| 1 | Replace `.framer-1a6q2h0` markup with responsive SSR dual-variant structure | `venues/open-earth-lawn.html` | ~1430-1540 |
| 2 | Replace inline path SVGs with `1203px x 150px` data URI background | `venues/open-earth-lawn.html` | ~1443-1454 |
| 3 | Remove `initGrandFooterMotions()` JavaScript script block | `venues/open-earth-lawn.html` | ~1542-1605 |
| 4 | Insert pure CSS 2-track infinite marquee ticker | `venues/open-earth-lawn.html` | ~1440-1450 |
| 5 | Verify responsive breakpoint rules (`hidden-o5o8qi`, etc.) | `venues/open-earth-lawn.html` | `<style data-framer-breakpoint-css>` |
| 6 | Replace Card 1 placeholder with `/images/card_2_grassland_gala.webp` and `Grassland Gala` title | `venues/open-earth-lawn.html` | ~1125-1170 |
| 7 | Replace Card 2 Framer URL with `/images/card_3_ballroom.webp` and `Garden Galaxy` title | `venues/open-earth-lawn.html` | ~1175-1220 |
| 8 | Add route rewrites for `/venues/grassland-gala` and `/venues/garden-galaxy` | `server.mjs`, `vercel.json` | Routing config |
| 9 | Add sticky CTA button collision / hide handler on footer intersection | `venues/open-earth-lawn.html` | Bottom script block |
