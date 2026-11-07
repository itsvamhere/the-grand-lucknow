# Orchestrator Dispatch Brief

## Target & Scope
- Working directory: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\orchestrator_1`
- Workspace root: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo`
- Authoritative Request: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\ORIGINAL_REQUEST.md`
- Implementation Plan: `C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\implementation_plan.md`
- Target file to update: `venues/open-earth-lawn.html`
- Untouchable file: `index.html` (Must NOT be modified)
- Source photo: `C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\.user_uploaded\media_1794032332967_bb41bc6b.jpg`

## Execution Requirements
1. **Universal Footer Replication:**
   - Clone exact markup, CSS classes (`hidden-o5o8qi`, `framer-v-1aamxx2`, `ticker-item`, `hidden-72rtr7`, `hidden-p8zd8m`), variables, and infinite loop marquee ticker from `index.html` into `venues/open-earth-lawn.html`.
   - Fix broken letters (`V  nues`, `A  out`), font sizes, and container styling.
2. **Location Overlap & Button:**
   - Capitalize heading to 'Location'.
   - Increase watermark contrast to `rgba(78, 82, 64, 0.50)` / `#4E5240`.
   - Style 'Open in Maps' button with background `#616452` and text `#FFF0CA`.
3. **Map Pin & Pulse Position:**
   - Position "The Grand" badge and pulse dot comfortably above and to the left of the sticky 'Check Availability' button to prevent any overlap.
4. **Gallery Photos & Numbering:**
   - Copy source image `media_1794032332967_bb41bc6b.jpg` to `images/venues/the_grand_open_earth_lawn_hero.jpg` (or appropriate path in `images/`).
   - Replace all 6 slide photos in the gallery with this authentic image.
   - Remove room/space text (e.g. 'Living Room').
   - Enforce numbering strictly in fraction format: `1/6`, `2/6`, `3/6`, `4/6`, `5/6`, `6/6`.
5. **Other Venues Section:**
   - Replace black SVG box with home page card images (`/images/card_2_grassland_gala.webp`, `/images/card_3_ballroom.webp`).
   - Verify links redirect properly to `/venues/grassland-gala` and `/venues/garden-galaxy`.
6. **Verification & Deployment:**
   - Verify locally with headless browser / Playwright tests across desktop and mobile.
   - Deploy to Vercel production (`vercel --prod --yes` or `npx vercel --prod --yes`).
   - Verify live production URL is functional with 0 errors.


## 2026-11-07T06:44:38Z

You are the Project Orchestrator for the Casa Momo / The Grand subpage parity and deployment task.

Working directory: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\orchestrator_1
Dispatch file: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\orchestrator_1\DISPATCH.md
Original Request: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\ORIGINAL_REQUEST.md
Implementation Plan: C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\implementation_plan.md
Workspace Root: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo

Scope & Directives:
1. Replicate the home page footer from `index.html` into `venues/open-earth-lawn.html`:
   - Exact markup, CSS variables, infinite loop marquee ticker, fix broken letters ('V  nues', 'A  out'), font size matching home page down to the pixel.
   - Do NOT modify `index.html`.
2. Location overlap:
   - Capitalize heading to 'Location'.
   - Increase watermark contrast to `rgba(78, 82, 64, 0.50)` / `#4E5240`.
   - Style 'Open in Maps' button with `#616452` background and `#FFF0CA` text.
3. Map badge & pulse:
   - Position comfortably above and to the left of the sticky 'Check Availability' button to prevent any overlap.
4. Gallery:
   - Copy source photo `C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\.user_uploaded\media_1794032332967_bb41bc6b.jpg` into `images/venues/the_grand_open_earth_lawn_hero.jpg` (or `images/` directory).
   - Replace all 6 slide photos in the gallery with this authentic image.
   - Remove room naming ('Living Room').
   - Format numbering strictly as `1/6`, `2/6`, `3/6`, `4/6`, `5/6`, `6/6`.
5. Other Venues:
   - Replace the black SVG box with home page card images (`/images/card_2_grassland_gala.webp`, `/images/card_3_ballroom.webp`).
   - Verify links redirect properly to `/venues/grassland-gala` and `/venues/garden-galaxy`.
6. Verification & Deployment:
   - Verify changes locally using Playwright test scripts.
   - Deploy to Vercel production using Vercel CLI (`npx vercel --prod --yes`).
   - Smoke test the production deployment.

Coordinate specialists, maintain progress in `progress.md` and `BRIEFING.md` in your working directory, and deliver a comprehensive handoff report when complete.


## 2026-11-07T07:38:04Z

CRITICAL USER FEEDBACK — MUST INTEGRATE INTO ITERATION 2:
The user reviewed the build with screenshots and provided direct feedback:
"the pinpoint isnt accurate and the numbers here are not accurate"

1. Map Pin Accuracy:
   - Root cause: The master map `the_grand_lucknow_master_map_1920.png` has The Grand Resort centered at (50%, 50%). Moving the pin to left: 32%, top: 38% placed it on the "Bindaua" village label in the fields!
   - Mandatory Fix: Pin MUST remain anchored at the true resort location at (50%, 50%). To prevent overlap with "Check Availability", adjust map container framing/offset/view (e.g. object-position / translateY) or button clearance, but DO NOT offset the pin away from (50%, 50%).

2. Numbers & Superscript Defects:
   - Floating superscript "1,500" over "Sqft": In `.framer-84xumc` (the old m² superscript container), remove the "1,500" superscript text completely so it renders cleanly as "55,000 Sqft" (or "55,000 Sq. Ft.").
   - Garden Galaxy Card numbers: Currently displays Casa Momo apartment numbers "120 Sqft" and "6" guests! Update to authentic resort venue specifications (e.g. 45,000 Sqft and 1,000 guests, or matching index.html grand ballroom specifications), NOT 120 and 6.

Please integrate these requirements directly into Iteration 2 scope and dispatch Worker 2 accordingly. ORIGINAL_REQUEST.md has been updated.
