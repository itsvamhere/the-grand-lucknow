# Handoff Report — Mobile Map Pin Geometry, Pinpoint Accuracy & Venue Numbers

**From**: Explorer (`teamwork_explorer_m1_it2_2`)  
**To**: Parent Orchestrator (`7bfd851c-1b48-41cf-b70d-7220cb044fa3`) & Implementer  
**Date**: 2026-11-07  
**Working Directory**: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_it2_2`  
**Report Type**: Hard Handoff (Complete Investigation)  

---

## 1. Observation

1. **Map Pin Accuracy & Cartographic Truth**:
   - In `tools/automation/refine_master_cartography.mjs` (lines 6-8, 20-23):
     `const width = 3840; const height = 2400; const centerLon = 80.9992764; const centerLat = 26.6355667;`
     `return { x: Math.round((1920 + (x - cx)) * 10) / 10, y: Math.round((1200 + (y - cy)) * 10) / 10 };`
     The resort Lucknow is rendered at the exact center `(1920, 1200)` of the 3840x2400 map canvas (`50%, 50%`). Secondary landmark "Bindaua" village is at `lon: 80.9914, lat: 26.6438` (lines 38-39), corresponding to `(32%, 38%)`.
   - In `venues/open-earth-lawn.html` (lines 962-970):
     `#grand-live-pointer { left: 32% !important; top: 38% !important; }`
     `@media (max-width: 809.98px) { #grand-live-pointer { left: 28% !important; top: 36% !important; } }`
     This placed the pin away from The Grand Resort and directly on top of Bindaua village in the fields.

2. **Empirical Collision Discovered by Challenger 1**:
   - On 375px mobile viewport: `left: 28%` computed to `105px`.
   - The sticky "Check Availability" button `.framer-1n8t7q3` is centered at `left: 101px, right: 274px, top: 748px, bottom: 800px`.
   - Continuous scroll journey through the Location section produced `dist = 0px, overlap = true` between `scrollY = 4118px .. 4148px`.

3. **Center-Column Conflict Across Viewports**:
   - When `#grand-live-pointer` is set to `left: 50% !important; top: 50% !important;` inside an unadjusted 100% width map container, Playwright testing recorded:
     - W=1920: `hadOverlap = true, minD = 0px` (pinX = 960px, btn = [873.5px .. 1046.5px])
     - W=1440: `hadOverlap = true, minD = 0px` (pinX = 720px, btn = [633.5px .. 806.5px])
     - W=1024: `hadOverlap = true, minD = 0px` (pinX = 512px, btn = [425.5px .. 598.5px])
     - W=768:  `hadOverlap = true, minD = 0px` (pinX = 384px, btn = [297.5px .. 470.5px])
     - W=375:  `hadOverlap = true, minD = 0px` (pinX = 187.5px, btn = [101px .. 274px])
     Because both the sticky button and the pin are centered at 50% horizontally, vertical scroll inevitably causes direct collision.

4. **Framed Map Container Empirical Performance**:
   - When `#subpage-vector-map` is framed with `width: 170% !important; left: -69% !important;` under `@media (max-width: 809.98px)` and `width: 140% !important; left: -38% !important;` under `@media (min-width: 810px)`, with `#grand-live-pointer { left: 50% !important; top: 50% !important; }`:
     - W=1920: `hadOverlap = false, minD = 252px, pinX = 614px, btnLeft = 866px`
     - W=1440: `hadOverlap = false, minD = 164px, pinX = 461px, btnLeft = 625px`
     - W=1024: `hadOverlap = false, minD = 90px, pinX = 328px, btnLeft = 417px`
     - W=768:  `hadOverlap = false, minD = 174px, pinX = 123px, btnLeft = 297px`
     - W=375:  `hadOverlap = false, minD = 40.3px, pinX = 60px, btnLeft = 101.3px`
     - Visual proof captured at `tools/proof_mobile_map_framing.png` confirms flawless framing, zero edge whitespace, and clean >40px clearance.

5. **Venue Card Numbers & Superscript Remnants**:
   - In `venues/open-earth-lawn.html` line 1159:
     - Card 1 (`Grassland Gala`): `<div class="framer-84xumc"><p ...>2</p></div>` renders an unwanted superscript "2" after `Sqft` (`55,000 Sqft²`).
     - Card 2 (`Garden Galaxy`): `<div class="framer-84xumc"><p ...>1,500</p></div>` renders a floating superscript "1,500" over `Sqft` (`120 Sqft¹⁵⁰⁰`), while retaining Casa Momo placeholder values `120 Sqft` and `6` guests.

---

## 2. Logic Chain

1. **Why Pin Accuracy was Broken (Observation 1)**:
   - In the master map image `the_grand_lucknow_master_map_1920.png`, the resort is centered at `(50%, 50%)`.
   - Previous arbitrary repositioning to `32%, 38%` moved the pin to Bindaua village.
   - Therefore, the pin MUST be anchored at `left: 50% !important; top: 50% !important;` relative to the map canvas to maintain 100% cartographic fidelity.

2. **Why Center-Aligned Pin Collides (Observations 2 & 3)**:
   - The sticky button is centered at 50% width on all screen sizes.
   - If `#subpage-vector-map` is centered at 100% width, a pin at `50%` sits in the exact horizontal middle of the button.
   - Because the map is vertically traversed during scroll, vertical overlap occurs during the scroll journey.

3. **Why Map Framing Reconciles Accuracy & Collision (Observation 4)**:
   - `#subpage-vector-map` contains both the map image and `#grand-live-pointer`.
   - Sizing `#subpage-vector-map` to `170%` with `left: -69%` on mobile places the 50% center at $x = -0.69 \times 375 + 0.5 \times (1.70 \times 375) = 60.0px$.
   - The pin and the map image move in lockstep with zero relative drift: the pin stays at `(50%, 50%)` on The Grand Resort, while rendering at $60px$ on screen.
   - Since the button's left edge is at $101.3px$, horizontal clearance is $101.3 - 60.0 = 41.3px > 40px$ across all vertical positions, completely eliminating collision.
   - Sizing `#subpage-vector-map` to `140%` with `left: -38%` on desktop/tablet places the center at $32\%$ of the viewport with $90px - 252px$ clearance, maintaining zero collision.

4. **Why Numbers and Superscript Must be Fixed (Observation 5)**:
   - `.framer-84xumc` was the legacy $m^2$ superscript container. Hiding it via `.framer-84xumc { display: none !important; }` removes both the unwanted `2` on Grassland Gala and the floating `1,500` on Garden Galaxy.
   - Updating Card 2's text from `120` to `45,000` and `6` to `1,000` aligns the resort subpage with authentic ballroom venue scale.

---

## 3. Caveats

- **No Caveats**: All findings and formulas were empirically verified using Playwright against the local preview server (`http://localhost:3003/venues/open-earth-lawn`).
- Visual proof of mobile map framing was saved to `tools/proof_mobile_map_framing.png`.
- No source code in `venues/open-earth-lawn.html` was directly modified by this explorer agent, adhering strictly to read-only investigation rules.

---

## 4. Conclusion

The implementer must apply three targeted modifications strictly inside `venues/open-earth-lawn.html`:

### Modification 1: Map Framing & Pin Locking in CSS
In `<style id="grand-subpage-map-styles">` (lines 960-987):
```css
  /* Pin locked 100% to true resort location at center of master map */
  #grand-live-pointer {
    left: 50% !important;
    top: 50% !important;
  }

  /* Map container framing: shifts physical view while keeping pin locked on resort */
  #subpage-vector-map {
    width: 140% !important;
    height: 100% !important;
    position: absolute !important;
    top: 0 !important;
    left: -38% !important;
    background: #FFF0CA;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  @media (max-width: 809.98px) {
    #subpage-vector-map {
      width: 170% !important;
      left: -69% !important;
    }
    #grand-live-pointer {
      left: 50% !important;
      top: 50% !important;
    }
  }

  /* Suppress legacy m² superscript container across venue cards */
  .framer-84xumc {
    display: none !important;
  }
```

### Modification 2: Garden Galaxy Card Numbers in HTML
In line 1159:
- In Card 2 (`Garden Galaxy`), change `<p ...>120</p>` to `<p ...>45,000</p>`.
- In Card 2 (`Garden Galaxy`), change `<p ...>6</p>` to `<p ...>1,000</p>`.

---

## 5. Verification Method

To independently verify the implementation:

### 1. Execute Multi-Viewport Scroll Collision Probe
```powershell
cd C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo
node -e "import('file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs').then(async ({ chromium }) => { const b = await chromium.launch({ channel: 'msedge', headless: true }); const p = await b.newPage(); await p.goto('http://localhost:3003/venues/open-earth-lawn'); const vps = [1920, 1440, 1024, 768, 375]; for (const w of vps) { await p.setViewportSize({ width: w, height: 900 }); const res = await p.evaluate(() => { const pin = document.getElementById('grand-live-pointer'); const btn = document.querySelector('.framer-1n8t7q3'); const loc = document.querySelector('[data-framer-name=\'Location\']'); const absTop = loc.offsetTop; const h = loc.offsetHeight; let hadOverlap = false; let minD = 99999; for (let y = absTop - 600; y <= absTop + h + 200; y += 15) { window.scrollTo(0, y); const pB = pin.getBoundingClientRect(); const bB = btn.getBoundingClientRect(); if (pB.bottom > 0 && pB.top < window.innerHeight && bB.bottom > 0 && bB.top < window.innerHeight) { const overlap = !(pB.right < bB.left || pB.left > bB.right || pB.bottom < bB.top || pB.top > bB.bottom); const dx = Math.max(0, Math.max(pB.left - bB.right, bB.left - pB.right)); const dy = Math.max(0, Math.max(pB.top - bB.bottom, bB.top - pB.bottom)); const dist = Math.sqrt(dx*dx + dy*dy); if (overlap) hadOverlap = true; if (dist < minD) minD = dist; } } return { hadOverlap, minD: Math.round(minD) }; }); console.log('Viewport ' + w + 'px: hadOverlap = ' + res.hadOverlap + ', minD = ' + res.minD + 'px'); } await b.close(); })"
```
*Expected Output*:
`Viewport 1920px: hadOverlap = false, minD = 252px`
`Viewport 1440px: hadOverlap = false, minD = 164px`
`Viewport 1024px: hadOverlap = false, minD = 90px`
`Viewport 768px: hadOverlap = false, minD = 174px`
`Viewport 375px: hadOverlap = false, minD = 40px`

### 2. Verify Card Numbers & Zero Floating Superscripts
```powershell
cd C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo
node -e "import('file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs').then(async ({ chromium }) => { const b = await chromium.launch({ channel: 'msedge', headless: true }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.goto('http://localhost:3003/venues/open-earth-lawn'); const cardData = await p.evaluate(() => [...document.querySelectorAll('.framer-1jnzc16, .framer-mp64f1')].map(c => ({ title: c.querySelector('h2')?.textContent?.trim(), text: c.innerText.replace(/\s+/g, ' ') }))); console.log(cardData); await b.close(); })"
```
*Expected Output*:
`Grassland Gala: Grassland Gala 55,000 Sqft 1,500`
`Garden Galaxy: Garden Galaxy 45,000 Sqft 1,000`
Zero repeated or floating "1,500" superscripts.
