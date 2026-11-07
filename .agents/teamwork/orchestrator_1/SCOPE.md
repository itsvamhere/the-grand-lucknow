# Scope: Subpage Parity, Universal Footer & Venue Polish

## Architecture
- Target Subpage: `venues/open-earth-lawn.html`
- Untouchable Reference: `index.html` (Must NOT be modified)
- Asset Directory: `images/` (specifically `images/venues/the_grand_open_earth_lawn_hero.jpg`)
- Testing Tools: Playwright test scripts in `tools/`
- Production Platform: Vercel CLI (`npx vercel --prod --yes`)

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Universal Footer Replication | Clone exact footer markup, CSS variables, infinite loop marquee ticker, fix broken letters ('V  nues', 'A  out'), font size matching index.html down to pixel | M1 | ORIGINAL_REQUEST § Follow-up 2026-11-07 |
| 2 | Location Overlap & Button | Capitalize heading to 'Location', increase contrast to rgba(78, 82, 64, 0.50) / #4E5240, style 'Open in Maps' button with #616452 background and #FFF0CA text | M1 | ORIGINAL_REQUEST § Follow-up 2026-11-07 |
| 3 | Map Badge & Pulse Positioning | Anchor pin at true resort center (50%, 50%), adjust map framing / offset / translateY or button clearance to prevent overlap with sticky CTA | M1 | ORIGINAL_REQUEST § Follow-up 2026-11-07T07:37:47Z |
| 4 | Gallery Image Replacement | Copy user image media_1794032332967_bb41bc6b.jpg to images/venues/the_grand_open_earth_lawn_hero.jpg and replace all 6 slide photos with it | M1 | ORIGINAL_REQUEST § Follow-up 2026-11-07 |
| 5 | Gallery Numbering & Clean-up | Remove room/space text ('Living Room'), format numbering strictly as fraction format (1/6, 2/6, 3/6, 4/6, 5/6, 6/6) | M1 | ORIGINAL_REQUEST § Follow-up 2026-11-07 |
| 6 | Other Venues Cards & Links | Replace black SVG box with home page card images (/images/card_2_grassland_gala.webp, /images/card_3_ballroom.webp) and verify redirects to /venues/grassland-gala and /venues/garden-galaxy | M1 | ORIGINAL_REQUEST § Follow-up 2026-11-07 |
| 7 | Verification & Deployment | Run local visual verification with Playwright scripts, deploy to Vercel production (`npx vercel --prod --yes`), and smoke test live URL | M1 | DISPATCH.md |
| 8 | Marquee Loop Seam & Gap Fix | Set `.grand-ticker-container { gap: 0 !important; }` to eliminate 162px wrap jump and restore equal 81px item spacing | M1 | Challenger 1 Stress Finding |
| 9 | Number Specifications & Superscript Clean-up | Purge floating superscript "1,500" from `.framer-84xumc` ("55,000 Sqft"); update Garden Galaxy card from apartment specs (120/6) to authentic resort specs (45,000 Sqft / 1,000 guests) | M1 | ORIGINAL_REQUEST § Follow-up 2026-11-07T07:37:47Z |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Subpage Parity, Universal Footer & Venue Polish | Implement features 1-9 in `venues/open-earth-lawn.html`, verify locally, deploy to Vercel production | none | IN_PROGRESS (Iteration 2) |

## Code Layout
- Exclusive Write Ownership:
  - Worker owns: `venues/open-earth-lawn.html`, `images/venues/the_grand_open_earth_lawn_hero.jpg`, `server.mjs`, `vercel.json`, and test verification scripts in `tools/`
  - Untouchable: `index.html` (READ ONLY)
