# Handoff Report: Verification and Deployment Pipeline
**Explorer**: `teamwork_explorer_m1_3`  
**Parent Orchestrator ID**: `7bfd851c-1b48-41cf-b70d-7220cb044fa3`  
**Milestone**: M1 (Subpage Parity, Universal Footer & Venue Polish)  
**Date**: 2026-11-07  

---

## 1. Observation
1. **Preview Server Setup (`server.mjs`)**:
   - `server.mjs` lines 7–8: `const PORT = process.env.PORT || 3003;`.
   - Running PowerShell command `Get-NetTCPConnection -LocalPort 3003` confirmed that `[::]:3003` is actively in state `Listen`.
   - Running `fetch('http://localhost:3003/venues/open-earth-lawn')` returned `Status: 200 Type: text/html; charset=utf-8`.
   - `server.mjs` lines 27–132 execute runtime text replacements via `swapText(content)` on all served HTML and JS files.
2. **Vercel Deployment Architecture**:
   - `.vercel/project.json` line 1: `{"projectId":"prj_yVNUQ8Xwkmb7otptdPtbiuLmQ4qe","orgId":"team_czfqd8DvaYce2r98sohLseCv","projectName":"the-grand-lucknow"}`.
   - `.vercelignore` lines 1–8:
     ```text
     node_modules
     raw_photos
     archive
     tools
     .agents
     server.mjs
     package.json
     package-lock.json
     ```
   - `vercel.json` lines 1–12 contains `cleanUrls: true`, `trailingSlash: false`, and rewrites `/venues/open-earth-lawn` to `/venues/open-earth-lawn.html`. It contains NO build step or serverless runtime.
   - Command `npx vercel --version` returned `Vercel CLI 65.12.1 (native)`.
3. **Localhost DOM Live Probe Output (`probe_state.mjs`)**:
   - **Footer**:
     - `index.html` footer length: `108,688` bytes, containing `<div class="framer-n49p1z" data-framer-name="Footer Logo">` with canonical ticker.
     - `venues/open-earth-lawn.html` footer length: `70,488` bytes, containing custom SVG with `viewBox="0 0 2404.809 300.206"` and width `1344px` (vs `2525px` on Home).
     - Subpage footer links contain split spans (`V  nues`, `A  out`).
   - **Location Section**:
     - `mapsBtn`: returned `null` for `.grand-nav-maps-btn` / `[data-framer-name="Location"] a.framer-vO7O2`.
     - `watermark`: color is `rgb(0, 0, 0)` with opacity `1` and split characters rather than dark olive `#4E5240` / `rgba(78, 82, 64, 0.50)`.
   - **Map Pin**:
     - Map badge `The Grand` (`.casa-map-chip.active-venue-chip`) sits at x=738, y=9675; pulse sits at x=699, y=9695; sticky CTA sits at y=800–852 in the viewport, resulting in overlap/collision when scrolling the map into view.
   - **Gallery**:
     - Contains 6 images pointing to remote Framer placeholder URLs (`https://framerusercontent.com/images/CVXtCf6tZR6dJm2eWWVQtlAQ.webp...`).
   - **Other Venues**:
     - Card 1 (`Grassland Gala`) uses an inline pitch-black SVG data URI (`data:image/svg+xml;...`).
     - Card 2 uses a remote Framer URL (`UayMv2I16UbQQBQkbI90HsJMv5o.webp`).
4. **Local Images on Disk**:
   - `images/card_2_grassland_gala.webp` (`283,228` bytes) and `images/card_3_ballroom.webp` (`205,234` bytes) exist in `images/`.
   - Source photo `media_1794032332967_bb41bc6b.jpg` exists at `C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\.user_uploaded\media_1794032332967_bb41bc6b.jpg`.
5. **Existing Playwright Tooling**:
   - Multiple test scripts in `tools/` and `tools/automation/` import Playwright successfully from `file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs` using `channel: 'msedge'`.

---

## 2. Logic Chain
1. **Premise**: Vercel serves pure static files and completely ignores `server.mjs`.
   - **Observation Reference**: Observation 2 (`.vercelignore` line 6 ignores `server.mjs`; `vercel.json` has zero build commands).
   - **Deduction**: Any dynamic text replacements performed by `swapText()` in `server.mjs` will NOT occur on Vercel production. Therefore, all markup, text, and asset paths must be directly and statically written to `venues/open-earth-lawn.html`.
2. **Premise**: The subpage footer was broken by manual edits and custom SVG scaling.
   - **Observation Reference**: Observation 3 (`probe_state.mjs` found 70KB subpage footer vs 108KB home footer; `bigTextSvgWidth` 1344px vs 2525px; split letter spans).
   - **Deduction**: The user's requirement to "copy the home page one, use that footer universally in all the pages" requires cloning the exact 108KB `<footer>` block from `index.html` into `venues/open-earth-lawn.html`, restoring the canonical Framer rolling ticker and CSS classes.
3. **Premise**: The location section, map pin, gallery, and other venues defects are clearly isolated.
   - **Observation Reference**: Observation 3 & 4 (missing `#616452` button styles; black SVG placeholder in card 1; remote Framer apartment photos in gallery).
   - **Deduction**:
     - Copy `media_1794032332967_bb41bc6b.jpg` to `images/venues/the_grand_open_earth_lawn_hero.jpg` and reference it across all 6 slides.
     - Strip "Living Room" text and set clean `1/6` .. `6/6` fraction numbering.
     - Replace card 1 image with `/images/card_2_grassland_gala.webp` and card 2 image with `/images/card_3_ballroom.webp`.
     - Reposition `#subpage-vector-map` pin coordinates above and to the left to clear the sticky CTA button.
     - Set location watermark contrast to `#4E5240` / `rgba(78, 82, 64, 0.50)` and style "Open in Maps" button with `#616452` and `#FFF0CA`.
4. **Premise**: Verification must be fully automated before and after deployment.
   - **Observation Reference**: Observation 5 (Playwright via Edge channel is verified and functional in `tools/`).
   - **Deduction**: The Worker can execute a comprehensive verification script (`tools/verify_subpage_parity.mjs`) locally against `http://localhost:3003/venues/open-earth-lawn`, deploy with `npx vercel --prod --yes`, and run `tools/verify_production_smoke.mjs` against `https://the-grand-lucknow.vercel.app`.

---

## 3. Caveats
- **Live Preview Server State**: Port 3003 is already running. If the Worker edits `venues/open-earth-lawn.html`, `server.mjs` reads from disk on every request without needing a restart (lines 149–150 of `server.mjs`). However, if `server.mjs` ever dies, it can be restarted via `npm start`.
- **Framer Upstream Images**: Some background assets on subpages still fetch from Framer's CDN. This is expected behavior for Framer static builds unless self-hosted. Only the gallery photos and other venue cards are mandated to be local assets.
- No other caveats.

---

## 4. Conclusion
The verification and deployment pipeline is fully understood, verified, and ready for the Worker agent:
1. **Local Preview**: Run tests against `http://localhost:3003/venues/open-earth-lawn`.
2. **Local Verification Script**: Run automated Playwright checks asserting footer integrity, location contrast, pin clearance, gallery photos, and other venues cards.
3. **Deployment**: Run `npx vercel --prod --yes` from the project root.
4. **Production Smoke Test**: Run automated audit on `https://the-grand-lucknow.vercel.app/venues/open-earth-lawn` checking 200 OK, 0 console errors, 0 failed network requests, and visual parity.

---

## 5. Verification Method
1. **Inspect Analysis Report**:
   - Read `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_3\analysis.md`.
2. **Verify Server Liveness**:
   - Run: `node -e "fetch('http://localhost:3003/venues/open-earth-lawn').then(r => console.log('HTTP', r.status))"` (Must output `HTTP 200`).
3. **Verify Vercel CLI**:
   - Run: `npx vercel --version` (Must output `Vercel CLI 65.12.1`).
4. **Run Probe Script**:
   - Run: `node C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_3\probe_state.mjs`.
