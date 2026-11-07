# DISPATCH — Explorer 2 (Milestone M1 — Iteration 2)

## Identity
- Role: Mobile Map Pin Geometry Explorer
- Type: teamwork_explorer
- Working Directory: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_it2_2`
- Parent Orchestrator ID: `7bfd851c-1b48-41cf-b70d-7220cb044fa3`

## Mandatory Context
Read these files before starting work:
- `ORIGINAL_REQUEST.md`: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\ORIGINAL_REQUEST.md`
- Challenger 1 handoff: `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_challenger_m1_1\handoff.md`
- Target file: `venues/open-earth-lawn.html`

## Problem & Mission
Challenger 1 proved that on 375px mobile viewports, the responsive CSS rule `#grand-live-pointer { left: 28% !important; top: 36% !important; }` results in horizontal position `105px`.
The centered sticky button `.framer-1n8t7q3` occupies `left: 101px, right: 274px`.
During continuous scroll through the location section at `scrollY = 4118px .. 4148px`, the map pin directly intersects the sticky button (`dist = 0px, overlap = true`).

Investigate:
1. Exact CSS selectors and media queries in `venues/open-earth-lawn.html` controlling `#grand-live-pointer`.
2. Determine exact coordinates for `@media (max-width: 809.98px)` (e.g. `left: 16% !important; top: 32% !important;` or similar) so the pin anchor sits at approx `60px` with $>40px$ clearance to the left of the sticky button's left edge ($101px$), completely avoiding overlap across all vertical scroll positions.
3. Verify that desktop and tablet coordinates remain collision-free.
Produce an actionable fix strategy in `analysis.md` and deliver `handoff.md`.


## 2026-11-07T07:38:30Z
**From**: Parent Orchestrator (7bfd851c-1b48-41cf-b70d-7220cb044fa3)
**Context**: Critical User Feedback on Map Pin & Pinpoint Accuracy
**Content**: The user reviewed the build and stated: "the pinpoint isnt accurate and the numbers here are not accurate".
1. Map Pin Accuracy:
   - Root cause: The master map `the_grand_lucknow_master_map_1920.png` has The Grand Resort centered at (50%, 50%). Moving the pin to left: 32%, top: 38% placed it on the "Bindaua" village label in the fields!
   - Mandatory Fix: Pin MUST remain anchored at the true resort location at (50%, 50%). To prevent overlap with "Check Availability", adjust map container framing/offset/view (e.g. object-position / translateY / background position) or button clearance, but DO NOT offset the pin away from (50%, 50%).
2. Numbers & Superscript Defects:
   - Floating superscript "1,500" over "Sqft": In `.framer-84xumc` (the old m² superscript container), remove the "1,500" superscript text completely so it renders cleanly as "55,000 Sqft" (or "55,000 Sq. Ft.").
   - Garden Galaxy Card numbers: Currently displays Casa Momo apartment numbers "120 Sqft" and "6" guests! Update to authentic resort venue specifications (e.g. 45,000 Sqft and 1,000 guests, or matching index.html grand ballroom specifications), NOT 120 and 6.
**Action**: Integrate this into your analysis.md and handoff.md report!
