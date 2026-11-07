# DISPATCH — Worker 1 (Milestone M1)

## Identity
- Role: Implementation and Deployment Specialist
- Type: teamwork_worker
- Working Directory: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_worker_m1_1`
- Parent Orchestrator ID: `7bfd851c-1b48-41cf-b70d-7220cb044fa3`

## Mandatory First Step
Read `ORIGINAL_REQUEST.md` at:
`C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\ORIGINAL_REQUEST.md`

Also read the Explorer handoffs:
- Explorer 1 (Footer & Other Venues): `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_1\handoff.md`
- Explorer 2 (Location, Map Pin & Gallery): `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_2\handoff.md`
- Explorer 3 (Verification & Deployment): `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_3\handoff.md`
- Scope: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\orchestrator_1\SCOPE.md`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Write Ownership Boundaries
- You EXCLUSIVELY own:
  - `venues/open-earth-lawn.html`
  - `images/venues/the_grand_open_earth_lawn_hero.jpg`
  - `server.mjs` and `vercel.json` (for venue route rewrites)
  - `tools/` (test scripts)
- UNTOUCHABLE:
  - `index.html` (Must NEVER be modified)

## Tasks to Execute

### 1. Universal Footer Replication
- In `venues/open-earth-lawn.html`:
  - Replace the current footer (lines ~1435–1605) with the exact structure from `index.html` as detailed in Explorer 1's report:
    - Dual SSR variant structure (`.ssr-variant.hidden-o5o8qi` for desktop and `.ssr-variant.hidden-72rtr7.hidden-p8zd8m` for mobile).
    - Ensure `.hidden-o5o8qi`, `.hidden-72rtr7`, and `.hidden-p8zd8m` are defined in the media queries.
    - Restore the "THE GRAND" banner using the data URI background styling (`width: min(1203px, 92vw); height: 150px;`) matching `index.html:520`.
    - Pure CSS 2-track marquee ticker (`track-a` and `track-b` with `@keyframes` translating to `-100%`) for a 100% seamless infinite loop.
    - Remove the character-splitting JS function `initGrandFooterMotions()` to permanently eliminate broken letters ('V  nues', 'A  out').

### 2. Location Overlap & Button
- In `venues/open-earth-lawn.html`:
  - Capitalize watermark heading to 'Location' (`text-transform: capitalize !important;`).
  - Increase watermark contrast to `#4E5240` / `rgba(78, 82, 64, 0.50)`.
  - In the scroll handler at line ~512617: change `dimOpacity = 0.50`, target `locH.style.opacity` exclusively instead of dimming the entire section `locSec`, keeping buttons solid.
  - Style the "Open in Maps" button (`#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2` / `.dark-btn`) with `#616452` background and `#FFF0CA` text with `opacity: 1 !important;`.

### 3. Map Badge & Pulse Positioning
- In `venues/open-earth-lawn.html`:
  - Reposition `#grand-live-pointer` to `left: 32%; top: 38%;` (and mobile `left: 28%; top: 36%;`), providing ample clearance from the sticky "Check Availability" button.

### 4. Gallery Images & Numbering
- Create directory `images/venues/` if it does not exist.
- Copy `C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\.user_uploaded\media_1794032332967_bb41bc6b.jpg` to `images/venues/the_grand_open_earth_lawn_hero.jpg`.
- Replace all 6 slide photos in `venues/open-earth-lawn.html` with `/images/venues/the_grand_open_earth_lawn_hero.jpg`.
- Remove all room/space caption containers (`<div class="framer-1dt4o5i">` with "Living Room" / "Bedroom").
- Set `.framer-6rg8a { justify-content: flex-end !important; }`.
- Format slide counters strictly as `1/6`, `2/6`, `3/6`, `4/6`, `5/6`, `6/6` (removing the second `/ 6` div `.framer-1fsmaa4`).

### 5. Other Venues Cards & Links
- In `venues/open-earth-lawn.html` (lines ~1125–1220):
  - Replace Card 1 black SVG placeholder with `/images/card_2_grassland_gala.webp`, title "Grassland Gala", linking to `/venues/grassland-gala`.
  - Replace Card 2 image with `/images/card_3_ballroom.webp`, title "Garden Galaxy", linking to `/venues/garden-galaxy`.
  - Ensure `server.mjs` and `vercel.json` have route rewrites for `/venues/grassland-gala` and `/venues/garden-galaxy`.

### 6. Local Verification
- Write and execute an automated Playwright verification test script in `tools/` using the Edge channel (`channel: 'msedge'`).
- Verify all 5 areas locally against `http://localhost:3003/venues/open-earth-lawn`.
- Take screenshots as proof.

### 7. Vercel Production Deployment & Smoke Test
- Run `npx vercel --prod --yes` from the workspace root.
- Capture the deployment URL and output.
- Run a production smoke test script against `https://the-grand-lucknow.vercel.app/venues/open-earth-lawn` checking:
  - HTTP 200 OK
  - 0 failed network requests (no 404s on images, styles, or fonts)
  - 0 uncaught console errors
  - Proper DOM element states (footer, location, map pin, gallery, other venues).

## Completion Criteria
1. `venues/open-earth-lawn.html` contains all verified fixes.
2. `index.html` remains completely untouched.
3. Local Playwright verification passes 100%.
4. Vercel production deployment succeeds and smoke test passes 100%.
5. Deliver `handoff.md` with complete verification logs, commands, and screenshots.
6. Communicate completion via `send_message` to Parent Orchestrator ID `7bfd851c-1b48-41cf-b70d-7220cb044fa3`.
