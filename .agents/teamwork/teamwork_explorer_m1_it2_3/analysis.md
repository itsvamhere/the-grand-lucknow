# Actionable Verification Plan & Exact Stress Test Suite for Worker 2

**Author**: Explorer 3 (`teamwork_explorer_m1_it2_3`)  
**Role**: Stress Harness & Gate Integration Explorer  
**Target Subpage**: `venues/open-earth-lawn.html`  
**Test Harness**: `tools/stress_test_challenger_m1.mjs`  
**Target Environments**: Local Preview (`http://localhost:3003`) & Live Production (`https://the-grand-lucknow.vercel.app`)  
**Parent Orchestrator ID**: `7bfd851c-1b48-41cf-b70d-7220cb044fa3`  
**Date**: 2026-11-07  

---

## 1. Executive Summary & Purpose

In Milestone M1 (Iteration 1), Worker 1 submitted a hard handoff claiming 100% completion across all requirements. However, Challenger 1 developed an adversarial automated Playwright stress harness (`tools/stress_test_challenger_m1.mjs`) and empirical testing revealed two critical defects:
1. **Marquee Ticker Loop Discontinuity**: An inherited `gap: 162px` on `.grand-ticker-container` created an uneven inter-track gap ($243px$ vs $81px$ intra-track) and a visible $162px$ visual jump / seam displacement every 25 seconds upon animation wrap.
2. **Mobile Map Pin Collision**: On 375px mobile viewports, `#grand-live-pointer` positioned at `left: 28%` ($105px$) directly intersects the centered sticky "Check Availability" button ($[101px..274px]$) during continuous vertical scroll between `scrollY = 4118px` and `4148px` ($minDistance = 0.61px$ to $1.41px$, failing the $>50px$ clearance threshold).

Challenger 1 correctly issued an empirical verdict of **REJECTED**.

The purpose of this document is to formulate the **exact test verification suite, execution protocol, and gate criteria** that Worker 2 must execute and satisfy across both local preview and live production before submitting its handoff report.

---

## 2. Deep Dissection of `tools/stress_test_challenger_m1.mjs`

### 2.1 Execution Topology & Runtime Environment
- **Runtime**: Node.js ES Module (`.mjs`).
- **Core Library**: Playwright-core (`msedge` browser channel in headless mode).
- **Execution Target**: Sequential audit of:
  1. `http://localhost:3003` (label: `'local'`)
  2. `https://the-grand-lucknow.vercel.app` (label: `'prod'`)
- **Artifact Output Directory**: `tools/proofs_challenger/`
- **Output Artifacts**:
  - `tools/proofs_challenger/results.json`: Complete JSON summary of metrics, samples, and pass/fail verdicts.
  - 16 high-resolution screenshot proofs capturing marquee ticker, hovered links, map pin clearance on 5 viewports, and gallery fraction numbers.

### 2.2 Task 1: Infinite Loop Marquee Ticker Sampling & Wrap Continuity
- **Target Elements**:
  - Container: `.grand-ticker-container`
  - Tracks: `.grand-ticker-track.track-a`, `.grand-ticker-track.track-b`
  - Items: `.grand-ticker-track .ticker-item`
- **Measurement Methodology**:
  - Web Animations API manipulation: samples exact animation timestamps:
    $t \in [0.0, 5.0, 12.5, 24.5, 24.8, 24.9, 24.95, 25.0, 25.05, 25.1, 26.0]$ seconds.
  - At each timestamp, extracts bounding boxes for tracks and items.
  - Computes:
    - $trackGap = boxB.left - boxA.right$
    - $itemABGap = itemB0.left - itemA1.right$
    - $intraTrackGap = itemA1.left - itemA0.right$
    - $seamDiffA0vsB0 = |itemA0Left(t=0.0s) - itemB0Left(t=25.0s)|$
    - $seamDiffA1vsB1 = |itemA1Left(t=0.0s) - itemB1Left(t=25.0s)|$
    - $widthMatch = |trackWidthA - trackWidthB| < 1.0px$
- **Exact Pass Criteria**:
  ```javascript
  const task1Pass = tickerStress.widthMatch &&
    tickerStress.seamDiffA0vsB0 < 1.0 &&
    tickerStress.seamDiffA1vsB1 < 1.0 &&
    tickerStress.samples.every(s => s.trackGap < 1.0);
  ```
- **Requirements for Worker 2**:
  - `.grand-ticker-container` must have `gap: 0 !important;` and `padding: 0 !important;`.
  - `.grand-ticker-track` must have `margin: 0 !important;` and `padding: 0 !important;`.
  - Intra-track item spacing must equal inter-track item spacing ($81px$ desktop, $40px$ mobile).
  - Both tracks must have identical width and translate $-100\%$ seamlessly.

### 2.3 Task 2: Character Hover Stability & Cursor Thrashing
- **Target Elements**: All 22 footer link anchors (`footer.framer-18na9ah a`).
- **Measurement Methodology**:
  - Pre-hover inspection: verifies zero single-character spans (`span.length === 1`) and zero `[data-rolling-label]` attributes.
  - Dynamic stress thrashing: rapidly simulates 10 back-and-forth mouse movement cycles (20 cursor displacements between link center and offset $(-50, -50)$ over $200ms$).
  - Hover state evaluation: checks opacity smoothly transitions to $\sim 0.65$ without broken characters.
  - Post-hover inspection: confirms text string remains unbroken (`!text.includes('  ')` and $text === linkText$) and child spans maintain identity transform (`matrix(1, 0, 0, 1, 0, 0)` or `none`).
- **Exact Pass Criteria**:
  ```javascript
  const noSplitting = !domPre.hasSplits && !domPost.hasSplits && !domPost.hasNonIdentityTransform;
  const textIntact = !domPost.text.includes('  ') && domPost.text === linkText;
  const task2Pass = linkResults.every(lr => lr.pass);
  ```
- **Requirements for Worker 2**:
  - Maintain solid word spans `<span class="grand-footer-link-text">`.
  - Zero regression: do NOT re-introduce character-splitting JavaScript or rolling transforms.

### 2.4 Task 3: Map Pin & Sticky Button Collision Across 5 Viewports
- **Target Viewports**:
  1. `1920 x 1080` (Large Desktop)
  2. `1440 x 900` (Desktop)
  3. `1024 x 768` (Tablet Landscape)
  4. `768 x 1024` (Tablet Portrait)
  5. `375 x 812` (Mobile)
- **Target Elements**:
  - Map Pin: `#grand-live-pointer`
  - Sticky Button: `.framer-1n8t7q3[data-framer-name="Sticky Button"], .framer-1n8t7q3`
  - Location Section: `#subpage-vector-map` or `.framer-tfszgi[data-framer-name="Location"]`
- **Measurement Methodology**:
  - Calculates vertical bounds of the map section:
    $startScroll = \max(0, mapTop - innerHeight)$, $endScroll = mapTop + mapHeight$, $step = \max(30, (endScroll - startScroll) / 20)$.
  - Executes dynamic scroll journey from $startScroll$ to $endScroll$.
  - At every step, if both pin and sticky button are within the active viewport:
    - Bounding box intersection check:
      $overlap = !(pBox.right < bBox.left \lor pBox.left > bBox.right \lor pBox.bottom < bBox.top \lor pBox.top > bBox.bottom)$
    - 2D Euclidean clearance:
      $dx = \max(0, \max(pBox.left - bBox.right, bBox.left - pBox.right))$
      $dy = \max(0, \max(pBox.top - bBox.bottom, bBox.top - pBox.bottom))$
      $dist = \sqrt{dx^2 + dy^2}$
- **Exact Pass Criteria**:
  ```javascript
  const vpPassed = !collisionAudit.hadOverlap && collisionAudit.minDistance > 50;
  const task3Pass = vpResults.every(v => v.passed);
  ```
  Every single viewport (especially 375px mobile) must have:
  1. $hadOverlap === false$
  2. $minDistance > 50.0px$ across the entire scroll traverse!
- **Requirements for Worker 2**:
  - In `venues/open-earth-lawn.html`, adjust `#grand-live-pointer` within `@media (max-width: 809.98px)` to safe coordinates (such as `left: 12% !important; top: 32% !important;` or as recommended by Explorer 2).
  - Ensure the pin bounding box maintains $>50px$ clearance to the left of the button's left edge ($101px$ on 375px viewport) or remains vertically isolated.

### 2.5 Task 4: Gallery Fraction Numbering Regex Audit
- **Target Element**: `[data-framer-name="Photo Slider"]` / `.framer-6rg8a`.
- **Measurement Methodology**:
  - Checks leaf text nodes against regex: `/^[1-6]\/6$/`.
  - Verifies presence of all 6 fractions: `['1/6', '2/6', '3/6', '4/6', '5/6', '6/6']`.
  - Scans gallery HTML for forbidden legacy terms: `['Living Room', 'Bedroom', '01', '02', '03', '04', '05', '06', '1 / 6', '2 / 6']`.
  - Verifies counter container is right-aligned (`justify-content: flex-end`).
- **Exact Pass Criteria**:
  ```javascript
  const task4Pass = allExpectedPresent && allMatchRegex && zeroForbidden;
  ```
- **Requirements for Worker 2**:
  - Zero regression: keep all 6 fractions strictly formatted as `1/6`, `2/6`, ..., `6/6` and ensure no room captions or padded numbers exist.

---

## 3. Worker 2 Step-by-Step Execution & Verification Protocol

Worker 2 must follow this sequential 6-gate verification protocol without skipping steps:

```
+-------------------------------------------------------------------+
| GATE 1: Pre-Flight Environment & Server Verification              |
| - Verify local server on port 3003                                |
| - Verify baseline git status                                      |
+---------------------------------+---------------------------------+
                                  |
                                  v
+---------------------------------+---------------------------------+
| GATE 2: Targeted Implementation of Explorer Fixes                 |
| - Apply Task 1 CSS (gap: 0 !important; on ticker container)       |
| - Apply Task 3 CSS (mobile pin coordinates left: 12% / top: 32%)  |
+---------------------------------+---------------------------------+
                                  |
                                  v
+---------------------------------+---------------------------------+
| GATE 3: Local Empirical Stress Certification                      |
| - Run node tools/stress_test_challenger_m1.mjs                    |
| - Assert Local Preview ALL PASS (Tasks 1, 2, 3, 4 = PASS)         |
| - Verify tools/verify_dom_state.mjs (39 passed, 0 failed)         |
| - Verify index.html is 100% untouched                             |
+---------------------------------+---------------------------------+
                                  |
                                  v
+---------------------------------+---------------------------------+
| GATE 4: Vercel Production Deployment                              |
| - Execute: npx vercel --prod --yes                                |
| - Confirm deployment state is READY and alias active              |
+---------------------------------+---------------------------------+
                                  |
                                  v
+---------------------------------+---------------------------------+
| GATE 5: Live Production Stress Certification                      |
| - Run node tools/stress_test_challenger_m1.mjs                    |
| - Assert Dual-Environment Summary:                                |
|     Local: ALL PASS                                               |
|     Prod: ALL PASS                                                |
|     OVERALL EMPIRICAL CHALLENGE VERDICT: CONFIRMED                |
+---------------------------------+---------------------------------+
                                  |
                                  v
+---------------------------------+---------------------------------+
| GATE 6: Artifact Indexing & Self-Contained Hard Handoff           |
| - Verify tools/proofs_challenger/results.json verdict == CONFIRMED|
| - Verify all 16 screenshot proofs exist                           |
| - Deliver handoff.md and notify Orchestrator                      |
+-------------------------------------------------------------------+
```

---

## 4. Exact Commands & Pass/Fail Criteria Table

| Gate | Phase | Verification Command | Expected Output / Acceptance Threshold |
| :--- | :--- | :--- | :--- |
| **Gate 1** | Local Server Pre-Flight | `Get-NetTCPConnection -LocalPort 3003` | State: `Listen` on port 3003 |
| **Gate 2** | Code Application | Inspect `venues/open-earth-lawn.html` | `.grand-ticker-container { gap: 0 !important; }`<br>`#grand-live-pointer { left: 12% !important; }` in mobile media query |
| **Gate 3.1** | Local Stress Test | `node tools/stress_test_challenger_m1.mjs` | `Local Preview Server (localhost:3003): ALL PASS`<br>- Task 1: `seamDiff < 1.0px`, `trackGap < 1.0px`<br>- Task 2: 22 links PASS<br>- Task 3: 5 viewports PASS (`minDistance > 50px`)<br>- Task 4: 6 fractions match `^[1-6]/6$` |
| **Gate 3.2** | Local DOM Integrity | `node tools/verify_dom_state.mjs` | `AUDIT SUMMARY: 39 PASSED, 0 FAILED` |
| **Gate 3.3** | Untouchable Baseline | `git status --porcelain index.html` | Empty output (zero modifications to `index.html`) |
| **Gate 4** | Production Deployment | `npx vercel --prod --yes` | `Ready State: READY`<br>`Production: https://the-grand-lucknow.vercel.app` |
| **Gate 5** | Production Stress Test | `node tools/stress_test_challenger_m1.mjs` | `OVERALL EMPIRICAL CHALLENGE VERDICT: CONFIRMED`<br>Both Local and Prod `ALL PASS` |
| **Gate 6** | Evidence Inspection | `Get-Content tools/proofs_challenger/results.json` | `"verdict": "CONFIRMED"`<br>Local: `"overallPassed": true`<br>Prod: `"overallPassed": true` |

---

## 5. Failure Recovery & Edge Case Troubleshooting

1. **If Local Preview Server is Down**:
   - Symptom: `tools/stress_test_challenger_m1.mjs` throws `ERR_CONNECTION_REFUSED` on port 3003.
   - Remedy: Start the server with `node server.mjs` in a background daemon task or terminal before running tests.
2. **If Task 1 Ticker Still Shows `trackGap > 1.0px`**:
   - Cause: Framer wrapper class `.framer-n49p1z` or child track margin.
   - Remedy: Ensure `.framer-n49p1z.grand-ticker-container` has `gap: 0 !important; column-gap: 0 !important; row-gap: 0 !important; padding: 0 !important;`, and tracks have `margin: 0 !important;`.
3. **If Task 3 Mobile Clearance is between 30px and 50px**:
   - Cause: The test requires $minDistance > 50.0px$. If the pin is placed at `left: 18%` ($67.5px$), $101px - 67.5px = 33.5px < 50px$.
   - Remedy: Move the pin further left to `left: 12% !important;` ($45px$ on 375px screen), giving $101px - 45px = 56px > 50px$, safely exceeding the threshold.
4. **If Live Production Serves Stale CDN Cache**:
   - Symptom: Local tests pass but production tests fail immediately after deployment.
   - Remedy: Verify deployment URL directly. If CDN caching delays update, run `npx vercel --prod --force --yes` and wait 15 seconds for edge propagation before triggering the test runner.

---

## 6. Handoff Requirements for Worker 2

Worker 2 must include the following verbatim proof blocks in its `handoff.md`:
1. Verbatim console output from `node tools/stress_test_challenger_m1.mjs` showing:
   ```
   Local Preview Server (localhost:3003): ALL PASS
   Live Production (the-grand-lucknow.vercel.app): ALL PASS
   OVERALL EMPIRICAL CHALLENGE VERDICT: CONFIRMED
   ```
2. Exact numeric values extracted from `tools/proofs_challenger/results.json`:
   - `task1_marquee.seamDiffA0vsB0` ($< 1.0px$)
   - `task1_marquee.trackGap` ($< 1.0px$)
   - `task3_collision.vpResults[4].minDistance` ($> 50.0px$ on 375px mobile)
   - `task3_collision.vpResults[4].hadOverlap` (`false`)
3. Confirmation of all 16 proof screenshots generated in `tools/proofs_challenger/`.
