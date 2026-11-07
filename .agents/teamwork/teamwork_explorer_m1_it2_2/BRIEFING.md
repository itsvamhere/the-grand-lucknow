# BRIEFING — 2026-11-07T07:40:00Z

## Mission
Investigate the exact CSS fix to eliminate the mobile map pin collision with the sticky "Check Availability" button in venues/open-earth-lawn.html, restore 100% map pin accuracy to (50%, 50%), and resolve venue card numbers/superscript defects.

## 🔒 My Identity
- Archetype: explorer
- Roles: Mobile Map Pin Geometry Explorer
- Working directory: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\.agents\teamwork\teamwork_explorer_m1_it2_2
- Original parent: 7bfd851c-1b48-41cf-b70d-7220cb044fa3
- Milestone: M1 Iteration 2

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- All target edits for the implementer must be confined to venues/open-earth-lawn.html
- Mobile pin anchor must have >40px clearance to the left of the sticky button's left edge (101px) across all scroll positions
- Desktop and tablet coordinates must remain collision-free
- Do not modify source code directly; communicate actionable proposals in analysis.md and handoff.md
- Pin MUST remain anchored at the true resort location at (50%, 50%) in the master map

## Current Parent
- Conversation ID: 7bfd851c-1b48-41cf-b70d-7220cb044fa3
- Updated: 2026-11-07T07:38:30Z

## Investigation State
- **Explored paths**:
  - `venues/open-earth-lawn.html` (map styles, markup, venue cards at line 1159)
  - `venues/casamomo_boutique_n1_original.html` (geometry of map and button clearance across viewports)
  - `tools/stress_test_challenger_m1.mjs` & `tools/probe_map_mobile.mjs`
  - `the_grand_lucknow_master_map_1920.png` cartography generator scripts
- **Key findings**:
  1. Map Pin Collision & Accuracy: Master map center (50%, 50%) is The Grand Resort. Shifting pin to (32%, 38%) or (28%, 36%) put the pin on Bindaua village in the fields. But keeping pin at (50%, 50%) with centered map causes collision on all viewports because button is also centered. Solution: Frame map container `#subpage-vector-map` (width: 170%, left: -69% on mobile; width: 140%, left: -38% on desktop) while keeping `#grand-live-pointer` at `left: 50% !important; top: 50% !important;`. Verified 0 collision, >40px clearance on mobile (minD = 40.3px, pinX = 60px), 90px-252px clearance on desktop/tablet.
  2. Numbers & Superscript:
     - Card 1 (Grassland Gala): unwanted superscript "2" in `.framer-84xumc` makes it "55,000 Sqft²".
     - Card 2 (Garden Galaxy): accidentally contains "1,500" inside `.framer-84xumc` (floating superscript "1,500" over Sqft) and Casa Momo apartment placeholder "120 Sqft" and "6" guests. Needs update to 45,000 Sqft, 1,000 guests, and `.framer-84xumc` hidden/removed.
- **Unexplored areas**: None. All geometric and text defects explored, measured, and verified.

## Key Decisions Made
- Validated framed map container approach as superior because it maintains 100% cartographic accuracy (pin and resort locked at 50%, 50%) while shifting physical screen anchor to 60px on mobile with 41px clearance from the button.
- Verified exact CSS rules and HTML replacements needed for implementer.

## Artifact Index
- analysis.md — Exhaustive geometric analysis, CSS fix strategies, and DOM replacements
- handoff.md — 5-component handoff report for parent orchestrator and implementer
