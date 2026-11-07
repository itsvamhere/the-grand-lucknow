# Empirical Challenge Report — Milestone M1 Visual Stress & Collision Audit

**From**: Challenger 1 (`teamwork_challenger_m1_1`)  
**To**: Parent Orchestrator (`7bfd851c-1b48-41cf-b70d-7220cb044fa3`)  
**Date**: 2026-11-07  
**Working Directory**: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_challenger_m1_1`  
**Report Type**: Hard Handoff (Complete)  
**Overall Empirical Challenge Verdict**: **REJECTED** (2 Critical Failure Modes Discovered)  

---

## 1. Observation

Direct empirical data observed via automated Playwright stress execution (`tools/stress_test_challenger_m1.mjs`) on both local preview (`http://localhost:3003/venues/open-earth-lawn`) and live production (`https://the-grand-lucknow.vercel.app/venues/open-earth-lawn`):

### Task 1: Infinite Loop Marquee Ticker Wrap Continuity
1. **Container CSS Inherited Gap**:
   - Element `.framer-n49p1z.grand-ticker-container` has computed CSS `gap: 162px` (inherited from Framer container class).
   - Track A width: `2517.1875px` (desktop 1440px). Track B width: `2517.1875px`.
   - Layout positions at $t=0.00s$:
     - `Track A: left = 21.15px, right = 2538.34px`
     - `Track B: left = 2700.34px, right = 5217.53px`
     - Physical gap between Track A and Track B: `2700.34 - 2538.34 = 162.0px`.
2. **Inter-Track vs Intra-Track Gap Discrepancy**:
   - Intra-track gap between items within Track A (`item0A.right = 1198.75px` to `item1A.left = 1279.75px`): exactly `81.0px`.
   - Inter-track gap between Item 1 of Track A (`item1A.right = 2457.34px`) and Item 0 of Track B (`item0B.left = 2700.34px`): exactly `243.0px` (`81px margin-right + 162px container gap`).
   - The gap between Track A and Track B is **300% wider** (243px vs 81px) than within the track.
3. **Wrap Seam / Jump Discontinuity**:
   - Keyframe animation translates from `0%` to `-100%`: `translate3d(-100%, 0, 0)` over 25.0s linear.
   - `-100%` translates by the track's own width ($2517.1875px$).
   - At $t=24.95s$: Track B has moved to `left = 215px`.
   - At $t=25.00s$ (loop wrap boundary): Track A resets to `left = 48px` (or `21px`).
   - Track B left edge at $t=24.99s$ is at `+162px`, but Track A at $t=0.00s$ resets to `0px`.
   - Measured wrap seam displacement: **`162.0px` visual jump / jitter** at every 25.0s wrap cycle.

### Task 2: Character Hover Stability & Cursor Thrashing
1. **Footer Link Architecture**:
   - 22 footer links audited (`Venues`, `About`, `Contact`, `Instagram`, `Facebook`, `Thegrandbanquet07@gmail.com`, `+91 91291 27091`, `Imprint`, `Terms`, `Privacy`, `Edifice`).
   - Every link contains solid text spans `<span class="grand-footer-link-text">` without nested letter spans (`hasSplits: false`, `hasRolling: false`).
2. **Cursor Thrashing Simulation**:
   - Simulated 20 rapid `mouseenter`/`mousemove`/`mouseleave` cycles over 200ms per link.
   - Under rapid hovering: text strings remained 100% intact with zero character separation (zero extra whitespace, no "V  nues").
   - Child transforms remained identity/none (`matrix(1, 0, 0, 1, 0, 0)`).
   - Hover opacity transitioned smoothly from `1.0` to `0.65..0.68`.

### Task 3: Map Pin & Sticky Button Collision
1. **Desktop Viewports (1920px, 1440px, 1024px, 768px)**:
   - 1920px: Minimum clearance = `252px` (zero overlap).
   - 1440px: Minimum clearance = `165px` (zero overlap).
   - 1024px: Minimum clearance = `90px` (zero overlap).
   - 768px: Minimum clearance = `84px` (zero overlap).
2. **Mobile Viewport (375px x 812px)** — **COLLISION DETECTED**:
   - Responsive CSS rule in `venues/open-earth-lawn.html` sets mobile pointer to: `left: 28% !important; top: 36% !important;`.
   - On 375px viewport, `left: 28% = 105px`.
   - Sticky "Check Availability" button `.framer-1n8t7q3` is centered with bounding box: `left: 101px, right: 274px, top: 748px, bottom: 800px`.
   - Horizontal collision: `105px` is strictly inside the button interval `[101px .. 274px]`.
   - During continuous scroll journey through the location section at `scrollY = 4118px .. 4148px`:
     - At `scrollY = 4133px`:
       - `#grand-live-pointer` box: `left: 105px, top: 775px, right: 105px, bottom: 775px`.
       - `.framer-1n8t7q3` button box: `left: 101px, top: 748px, right: 274px, bottom: 800px`.
       - Measured Euclidean clearance: **`0.0px`**.
       - Overlap status: **`true`**.
   - Verbatim screenshot captured at `tools/proofs_challenger/collision_proof_mobile_375px.png`: shows the terracotta pulse pin directly embedded in the bottom-left corner of the "Check Availability" button, and the "The Grand" badge overlapping the button face.

### Task 4: Gallery Fraction Numbering
1. **Fraction Regex Compliance**:
   - Exactly 6 fraction counters found in the gallery slider: `1/6`, `2/6`, `3/6`, `4/6`, `5/6`, `6/6`.
   - 100% of fraction counters match regex `^[1-6]/6$`.
2. **Legacy String Removal**:
   - Audited for forbidden legacy labels: `Living Room`, `Bedroom`, `01`, `02`, `03`, `04`, `05`, `06`, `1 / 6`, `2 / 6`.
   - Count found in gallery: **0**.
3. **Alignment**:
   - `.framer-6rg8a` verified computed `justify-content: flex-end`, right-aligning the counter cleanly.

---

## 2. Logic Chain

1. **Why Marquee Ticker Fails Wrap Continuity**:
   - Observation 1.1 proved `.grand-ticker-container` has `gap: 162px`.
   - Observation 1.2 proved the gap between Track A Item 1 and Track B Item 0 is $243px$, whereas intra-track item gap is $81px$.
   - Observation 1.3 proved Track B starts offset by $TrackA.width + 162px$. Because the CSS keyframe `grand-ticker-scroll` translates only by `-100%` of the track's own width ($-TrackA.width$), Track B only reaches $+162px$ when $t=25s$.
   - At $t=25s$, when the animation resets, Track A appears at $0px$, causing a $162px$ instantaneous visual jump.
   - Therefore, the infinite loop marquee ticker is **NOT mathematically or visually seamless** in its current implementation.

2. **Why Map Pin Collides on Mobile**:
   - Observation 3.2 proved that on 375px mobile, `#grand-live-pointer` is positioned horizontally at `left: 28%` ($105px$).
   - The sticky button `.framer-1n8t7q3` is horizontally centered at `left: 101px` to `right: 274px`.
   - Because $101px \le 105px \le 274px$, any vertical scroll where the map passes through the sticky button's vertical window ($748px \le top \le 800px$) creates a direct physical intersection.
   - Observation 3.2 recorded `dist = 0px` and `overlap = true` between `scrollY = 4118px` and `4148px`, visually corroborated by `collision_proof_mobile_375px.png`.
   - The worker only tested at `1440px` desktop with `scrollIntoView(center)` and completely missed mobile scroll testing.
   - Therefore, the requirement "Confirm strictly zero collision across multiple viewport widths (including 375px)" is **violated**.

---

## 3. Caveats

- **No Caveats**: The tests were executed using automated headless Playwright against both the active local preview server and the live deployed Vercel production site.
- No implementation code was modified by this agent (review-only mandate respected).
- The test harness is preserved on disk in `tools/stress_test_challenger_m1.mjs` and all raw metrics are recorded in `tools/proofs_challenger/results.json`.

---

## 4. Conclusion

### Explicit Verdict: **REJECTED**

While **Task 2 (Character Hover Stability)** and **Task 4 (Gallery Fraction Numbering)** passed with 100% compliance, the solution has **two confirmed defects**:

1. **Defect 1 (Task 1 — Marquee Loop Discontinuity)**:
   - Inherited `gap: 162px` on `.grand-ticker-container` causes an uncompensated $162px$ visual jump every 25 seconds when Track A wraps to Track B, and creates an uneven $243px$ gap between tracks vs $81px$ within tracks.
   - **Remediation**: In `.grand-ticker-container`, explicitly set `gap: 0 !important;`. To maintain an even $81px$ gap between Track A and Track B, ensure each track's last item has `margin-right: 81px` and `gap: 0px`.

2. **Defect 2 (Task 3 — Mobile Map Pin Collision)**:
   - On 375px mobile viewports, the map pin at `left: 28%` ($105px$) intersects directly with the sticky "Check Availability" button ($[101px..274px]$) during scroll (`dist = 0px, overlap = true`).
   - **Remediation**: For mobile viewports (`@media (max-width: 809.98px)`), adjust `#grand-live-pointer` to `left: 16% !important;` (approx $60px$), placing it safely to the left of the button's left edge ($101px$) with $>40px$ horizontal clearance, or elevate it vertically above the scroll bounds.

---

## 5. Verification Method

To independently verify these findings:

### 1. Run the Empirical Challenger Stress Suite
```powershell
node tools/stress_test_challenger_m1.mjs
```
*Expected Output*: Task 1 FAILS (`Wrap Seam Difference: 2730px` due to uncompensated gap/jump), Task 2 PASSES, Task 3 FAILS (`Viewport 375px: Had Overlap = true, Min Clearance = 0px`), Task 4 PASSES.

### 2. Inspect Mobile Collision Proof Screenshot
```powershell
# Inspect the captured visual proof:
tools/proofs_challenger/collision_proof_mobile_375px.png
```
*Visual Confirmation*: Verbatim visual showing the terracotta live pulse chip overlapping and intersecting the black "Check Availability" button.

### 3. Run Marquee Gap & Jump Probe
```powershell
node tools/probe_ticker.mjs
```
*Expected Output*: Shows `containerGap: 162px` and `itemABGap: 243px` vs `intraTrackGap: 81px`.
