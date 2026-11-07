# Marquee Loop Continuity Analysis & Fix Strategy

**Agent**: `teamwork_explorer_m1_it2_1` (Marquee Loop Continuity Explorer)  
**Parent Orchestrator**: `7bfd851c-1b48-41cf-b70d-7220cb044fa3`  
**Date**: 2026-11-07  
**Target File**: `venues/open-earth-lawn.html`  
**Focus**: Infinite loop marquee wrap seam jump and uneven track gap remediation  

---

## 1. Executive Summary

Empirical stress testing conducted by Challenger 1 (`teamwork_challenger_m1_1`) revealed that the 2-track CSS marquee ticker in `venues/open-earth-lawn.html` suffers from a **162px visual wrap jump** every 25 seconds and an **uneven inter-track item gap of 243px** (300% wider than the intra-track gap of 81px).

This investigation isolated the root cause:
1. Element `.framer-n49p1z.grand-ticker-container` inherits `gap: 162px` from Framer's baseline CSS rule `.framer-zHQwT .framer-n49p1z`.
2. The custom CSS rule `.grand-ticker-container` at lines 1251–1258 in `venues/open-earth-lawn.html` specifies `display: flex !important;`, `overflow: hidden !important;`, but omits `gap: 0 !important;`.
3. Adding `gap: 0 !important;` to `.grand-ticker-container` completely eliminates the 162px offset, proves mathematical zero-seam displacement ($\Delta_{wrap} = 0.000px$), and establishes identical 81px item spacing across both tracks on desktop (and 40px on mobile).

---

## 2. Codebase DOM & CSS Hierarchy Audit

### 2.1 Location of `.grand-ticker-container` in `venues/open-earth-lawn.html`

In `venues/open-earth-lawn.html`, `.grand-ticker-container` is defined in two locations:

#### A. CSS Declaration Block (Lines 1250–1258):
```css
/* PURE CSS 2-TRACK MARQUEE TICKER (SEAMLESS INFINITE LOOP) */
.grand-ticker-container {
  display: flex !important;
  overflow: hidden !important;
  width: 100% !important;
  position: relative !important;
  mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
}
```
*Observation*: `gap` is not defined here, allowing inherited styles to take precedence.

#### B. HTML Instances in Footer:
1. **Desktop Footer Variant (Line 1310)**:
   ```html
   <footer class="framer-18na9ah" data-framer-name="Footer">
     <div class="ssr-variant hidden-o5o8qi">
       <div class="framer-192t1bg-container" data-framer-name="Footer Test">
         <div name="Footer Test" class="framer-zHQwT framer-yRUcs framer-1aamxx2 framer-v-1aamxx2" data-framer-name="Desktop">
           ...
           <div class="framer-n49p1z grand-ticker-container" data-framer-name="Footer Logo">
             <div class="grand-ticker-track track-a">...</div>
             <div class="grand-ticker-track track-b" aria-hidden="true">...</div>
           </div>
         </div>
       </div>
     </div>
   ```
2. **Mobile Footer Variant (Line 1319)**:
   ```html
     <div class="ssr-variant hidden-72rtr7 hidden-p8zd8m">
       <div class="framer-192t1bg-container" data-framer-name="Footer Test">
         <div name="Footer Test" class="framer-zHQwT framer-yRUcs framer-1aamxx2 framer-v-n1wrvs" data-framer-name="Mobile">
           ...
           <div class="framer-n49p1z grand-ticker-container" data-framer-name="Footer Logo">
             <div class="grand-ticker-track track-a">...</div>
             <div class="grand-ticker-track track-b" aria-hidden="true">...</div>
           </div>
         </div>
       </div>
     </div>
   </footer>
   ```

### 2.2 Framer Inherited Wrapper Rules

In the minified Framer stylesheet inside `<head>` (line 48):
- **Desktop Wrapper Rule**:
  ```css
  .framer-zHQwT .framer-n49p1z {
    height: min-content;
    overflow: var(--overflow-clip-fallback,clip);
    flex-flow: row;
    flex: none;
    place-content: center flex-start;
    align-items: center;
    gap: 162px;
    width: 2806px;
    padding: 0;
    display: flex;
    position: relative;
  }
  ```
- **Mobile Wrapper Rule**:
  ```css
  .framer-zHQwT.framer-v-n1wrvs .framer-n49p1z {
    width: 100%;
    overflow: visible;
  }
  ```
Because `.framer-zHQwT .framer-n49p1z` sets `gap: 162px;` and `.grand-ticker-container` did not override it, the flex container separates Track A and Track B by an extra **162px** in both desktop and mobile viewports.

---

## 3. Mathematical Proof of Spacing and Seam Wrap Continuity

### 3.1 Structural Variables
- $N = 2$: Number of `.ticker-item` elements per track.
- $W_{item}$: Bounding box width of `.ticker-item` ($1177.59375px$ desktop, $337.5px$ mobile).
- $M$: Right margin applied to `.ticker-item` ($81px$ desktop at line 1270; $40px$ mobile at line 1285).
- $G$: Flex container gap between Track A and Track B ($162px$ in baseline; $0px$ in proposed fix).
- $W_{track}$: Total physical layout width of a track.

Since each track contains $N$ items and each item has right margin $M$:
$$W_{track} = \sum_{i=1}^N (W_{item} + M) = N \cdot (W_{item} + M)$$
For desktop:
$$W_{track} = 2 \cdot (1177.59375px + 81px) = 2 \cdot 1258.59375px = 2517.1875px$$
(Note: with padding/subpixel rendering, measured between $2517px$ and $2568px$).

### 3.2 Intra-Track Spacing
Within Track A:
- Item 0 occupies $[0, W_{item}]$.
- Item 1 begins at $W_{item} + M$ (offset by Item 0's margin-right $M$).
- Intra-track gap = $\text{Start}(\text{Item 1}) - \text{End}(\text{Item 0}) = (W_{item} + M) - W_{item} = M$.
  - Desktop: $M = \mathbf{81.0px}$.
  - Mobile: $M = \mathbf{40.0px}$.

### 3.3 Inter-Track Spacing (Track A Item 1 to Track B Item 0)
- Track A begins at $X_0$ and ends at $X_0 + W_{track}$.
- Item 1 of Track A ends at:
  $$\text{End}(\text{Item 1}_A) = X_0 + W_{track} - M$$
- In flexbox, Track B starts immediately after Track A plus the container gap $G$:
  $$\text{Start}(\text{Track B}) = X_0 + W_{track} + G$$
- Item 0 of Track B starts at the leading edge of Track B:
  $$\text{Start}(\text{Item 0}_B) = \text{Start}(\text{Track B}) = X_0 + W_{track} + G$$
- Therefore, the physical inter-track gap $\text{Gap}_{inter}$ is:
  $$\text{Gap}_{inter} = \text{Start}(\text{Item 0}_B) - \text{End}(\text{Item 1}_A) = (X_0 + W_{track} + G) - (X_0 + W_{track} - M) = M + G$$

#### Baseline Case ($G = 162px$):
$$\text{Gap}_{inter} = 81px + 162px = \mathbf{243.0px} \ne \text{Gap}_{intra} (81px)$$
The gap between Track A and Track B is $243px$, creating a conspicuous 300% gap expansion every 2 items.

#### Fixed Case ($G = 0px$):
$$\text{Gap}_{inter} = 81px + 0px = \mathbf{81.0px} \equiv \text{Gap}_{intra}$$
On mobile:
$$\text{Gap}_{inter} = 40px + 0px = \mathbf{40.0px} \equiv \text{Gap}_{intra}$$
Inter-track and intra-track spacing become perfectly uniform and indistinguishable.

### 3.4 Translation Math & Wrap Seam Proof
The CSS animation rule is:
```css
@keyframes grand-ticker-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
}
```
In CSS transforms, `translate3d(-100%, 0, 0)` translates the element along the X axis by exactly $-1 \times \text{element.offsetWidth} = -W_{track}$.

Let $p(t) = \frac{t}{T} \in [0, 1)$ be the normalized linear animation progress over duration $T$ ($25s$ desktop, $18s$ mobile).
The global position of Track A is:
$$X_A(t) = X_0 - p(t) \cdot W_{track}$$
The global position of Track B is:
$$X_B(t) = (X_0 + W_{track} + G) - p(t) \cdot W_{track}$$

At the wrap boundary, as $t \to T^-$ (i.e., $p(t) \to 1^-$):
$$X_B(T^-) = X_0 + W_{track} + G - 1 \cdot W_{track} = X_0 + G$$
At the instant of reset ($t = 0^+$):
Track A returns to $p = 0$:
$$X_A(0^+) = X_0$$
The visual seam displacement $\Delta_{wrap}$ at loop reset is:
$$\Delta_{wrap} = |X_B(T^-) - X_A(0^+)| = |(X_0 + G) - X_0| = G$$

- When $G = 162px$: $\Delta_{wrap} = \mathbf{162.0px}$. Track A snaps backward by $162px$ when the loop resets, producing the visual jump observed by Challenger 1.
- When $G = 0px$: $\Delta_{wrap} = \mathbf{0.000px}$. Track B reaches the exact coordinate where Track A restarts, producing an unbroken, mathematically seamless loop.

---

## 4. Actionable Fix Strategy

### 4.1 Target Location
**File**: `venues/open-earth-lawn.html`  
**Lines**: 1251–1258  

### 4.2 Proposed CSS Modification

#### Existing Code (Lines 1251–1258):
```css
/* PURE CSS 2-TRACK MARQUEE TICKER (SEAMLESS INFINITE LOOP) */
.grand-ticker-container {
  display: flex !important;
  overflow: hidden !important;
  width: 100% !important;
  position: relative !important;
  mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
}
```

#### Replacement Code:
```css
/* PURE CSS 2-TRACK MARQUEE TICKER (SEAMLESS INFINITE LOOP) */
.grand-ticker-container,
.framer-n49p1z.grand-ticker-container {
  display: flex !important;
  overflow: hidden !important;
  width: 100% !important;
  position: relative !important;
  gap: 0 !important;
  mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
}
```

### 4.3 Why This Fix Is Safe and Sufficient
1. **Specificity & Override**: Using `.grand-ticker-container, .framer-n49p1z.grand-ticker-container` with `gap: 0 !important;` decisively overrides Framer's `.framer-zHQwT .framer-n49p1z` rule (`gap: 162px`) on both desktop and mobile variants.
2. **Zero Secondary Side Effects**: `.grand-ticker-container` is strictly a wrapper for `.grand-ticker-track.track-a` and `.grand-ticker-track.track-b`. Zero other layout elements exist inside it. Setting `gap: 0` does not affect any child element's internal box model.
3. **Responsive Stability**: Both desktop (25s) and mobile (18s) use the same container selector. Both inherit `gap: 0 !important;`. Intra-item spacing remains governed by `.grand-ticker-track .ticker-item { margin-right: 81px !important; }` on desktop and `margin-right: 40px !important;` on mobile (`@media (max-width: 809.98px)`).

---

## 5. Verification Evidence Table

Empirical test executed via Playwright (`tools/verify_fix_challenger.mjs`) on `http://localhost:3003/venues/open-earth-lawn`:

| Metric | Baseline (Defective) | With Proposed Fix (`gap: 0 !important;`) | Status |
|---|---|---|---|
| **Container Computed Gap** (Desktop) | `162px` | `0px` | **FIXED** |
| **Track Gap ($X_B - X_{A,right}$)** | `162.0px` | `0.0px` | **FIXED** |
| **Intra-Track Gap** (Desktop) | `81.0px` | `81.0px` | **PASS** |
| **Inter-Track Gap** (Desktop) | `243.0px` | `81.0px` | **FIXED** |
| **Gap Discrepancy ($\Delta Gap$)** | `162.0px` (300% discrepancy) | `0.0px` (Identical) | **PASS** |
| **Wrap Seam Delta ($\Delta_{wrap}$)** | `162.0px` jump | `0.000px` (Continuous) | **PASS** |
| **Mobile Computed Gap** (375px) | `162px` | `0px` | **FIXED** |
| **Mobile Intra-Track Gap** | `40.0px` | `40.0px` | **PASS** |
| **Mobile Inter-Track Gap** | `202.0px` (505% discrepancy) | `40.0px` | **FIXED** |
| **Mobile Gap Discrepancy** | `162.0px` | `0.0px` (Identical) | **PASS** |

Both viewports confirm 100% mathematical and visual continuity.
