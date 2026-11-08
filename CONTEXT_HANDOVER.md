# Context Handover: The Grand Lucknow (Canonical Repository Handover)

**Version:** 3.0 (Multi-Device Institutional Memory Edition)  
**Date:** 08-Nov-2026  
**Repository:** `https://github.com/itsvamhere/the-grand-lucknow` (`main` branch)  
**Live Production URL:** `https://the-grand-lucknow.vercel.app`  
**Base Reference Architecture:** 1:1 Strict Clone of Casa Momo (`https://www.casamomo.at`)

---

## 1. Non-Negotiable Directives & Anti-Improvisation Laws

1. **Strict 1:1 Casa Momo Parity (Zero Improvisation):**
   - The user has explicitly mandated: **"replicate the home page and subpages as it is without improvising repeatedly, 1:1 copying Casa Momo"**.
   - Do NOT redesign, do NOT change the palette, typography, layout rhythm, or animations.
   - We are strictly adapting Casa Momo's authentic high-craft Austrian architectural framework to **The Grand Lucknow** by swapping:
     - Branding (`THE GRAND` serif SVG logo, uppercase and lowercase replacements).
     - Color Palette: Dark Olive `#0E1201`, Deep Forest `#161A13`, Warm Beige `#FFF0CA`, Terracotta `#BC6F45` / `#964317`.
     - Contact & Socials: `office@thegrandlucknow.in`, `+91 91291 27091`, Facebook (`https://www.facebook.com/thegrandlucknow/`), NO LinkedIn.
     - Attribution: "Built by Edifice" (`https://elvar.in/edifice`).

2. **The 5 Verified Venues (Strict Authority):**
   The Grand Lucknow has exactly **5 verified venues**. Do NOT invent or keep any other venue:
   - **1. Open Earth Lawn (`open-earth-lawn` / `venue-n1`):**
     - Size: `25,000 Sqft` · Capacity: `2,500` (Display: `1,000 - 2,500 Guests`)
     - Image: `/images/venues/open_earth_lawn_official.webp`
     - URL: `/venues/open-earth-lawn`
     - Context: Signature outdoor event canvas spanning lush open-sky manicured greens with towering palm canopies.
   - **2. Grassland Gala (`grassland-gala` / `venue-n2`):**
     - Size: `20,000 Sqft` · Capacity: `800` (Display: `500 - 800 Guests`)
     - Image: `/images/venues/grassland_gala_official.webp`
     - URL: `/venues/grassland-gala`
     - Context: Idyllic celebration lawn for large-scale wedding receptions and vibrant evening cocktail banquets.
   - **3. Garden Galaxy (`garden-galaxy` / `venue-n3`):**
     - Size: `15,000 Sqft` · Capacity: `300` (Display: `250 - 300 Guests`)
     - Image: `/images/venues/garden_galaxy_official.webp`
     - URL: `/venues/garden-galaxy`
     - Context: Intimate open-air garden expanse designed for curated milestone gatherings and pre-wedding celebrations.
   - **4. The Grand Courtyard (`the-grand-courtyard` / `venue-n4`):**
     - Size: `15,000 Sqft` · Capacity: `250` (Display: `200 - 250 Guests`)
     - Image: `/images/venues/the_grand_courtyard_official.webp`
     - URL: `/venues/the-grand-courtyard`
     - Context: Architecturally framed central courtyard blending Awadhi architectural charm for Haldi, Mehndi, and private rituals.
   - **5. The Royal Legacy Banquet (`the-royal-legacy-banquet` / `venue-n5` / `grand-ballroom`):**
     - Size: `10,000 Sqft` · Capacity: `600` (Display: `400 - 600 Guests`)
     - Image: `/images/venues/royal_legacy_banquet_official.webp`
     - URL: `/venues/the-royal-legacy-banquet`
     - Context: Regal pillarless indoor banquet hall with soaring ceilings, crystal chandeliers, and advanced acoustics.

3. **Subpage UI/UX Rules:**
   - **Location Heading Fade:** The "Location" heading on cream background is `#0E1201` (opacity `1`) and dims to `0.45` **ONLY** during physical intersection/overlap with the floating sticky navbar logo.
   - **Sticky Button Stacking:** The sticky "Check Availability" button floats with `z-index: 40 !important` and sits cleanly above the map pin marker (`z-index: 2`).
   - **Sticky Button Link:** On every subpage, the sticky button links to `/book/venue?venue=<slug>`:
     - `open-earth-lawn.html` -> `/book/venue?venue=open-earth-lawn`
     - `grassland-gala.html` -> `/book/venue?venue=grassland-gala`
     - `garden-galaxy.html` -> `/book/venue?venue=garden-galaxy`
     - `the-grand-courtyard.html` -> `/book/venue?venue=the-grand-courtyard`
     - `the-royal-legacy-banquet.html` -> `/book/venue?venue=the-royal-legacy-banquet`
   - **Footer:** 108 KB Casa Momo terracotta footer with `#964317` background and 270px rolling serif ticker (`THE GRAND`).

4. **Check Availability Dedicated Page (`/book/venue`):**
   - Base template: Casa Momo's authentic booking experience (`tools/casamomo_book_page.html`).
   - H1: `Check Availability` in Lay Grotesk Regular.
   - Search Bar: `ARRIVAL` (Add date), `DEPARTURE` (Add date), `GUESTS` (Capacity/Guests), `Search ↗` button.
   - Interactive 2-month Calendar Dropdown (`November 2026` & `December 2026`):
     - Anchored directly under `Arrival` / `Departure` with `z-index: 10000 !important`.
     - Struck-through past dates, active future dates.
     - Terracotta range highlight `#BC6F45`.
     - Toggles on `Arrival` or `Departure` click.
   - Selected Venue Card:
     - Preloads based on `?venue=<slug>` (e.g. `/book/venue?venue=grassland-gala`).
     - Shows verified photo, title, size badge, capacity badge, and authentic description.
     - Status: "Choose your dates to see the price" -> "Available for [Dates]".
     - CTA: `Check dates ↗` / `Inquire for Dates ↗` (opens WhatsApp `+91 91291 27091` or direct call).
   - Other Venues List: Allows visitors to browse and switch between the other 4 venues directly on the page.

---

## 2. File & Directory Inventory

| File / Path | Purpose |
| :--- | :--- |
| `index.html` | Canonical home page with verified 5-venue cards, estate map, and 108 KB terracotta footer. |
| `venues.html` | Venues gallery and overview page. |
| `venues/<slug>.html` | Dedicated subpages for all 5 verified venues. |
| `book/venue.html` | Authentic Casa Momo check availability booking page. |
| `book/apartment.html` | Parity alias for `/book/venue.html`. |
| `vercel.json` | Clean URLs, trailing slashes, and rewrites for all venues and booking paths. |
| `server.mjs` | Local development server on port 3003 with dynamic text swaps. |
| `tools/generate_5_venue_subpages.mjs` | Master script to generate all 5 verified subpages and their aliases. |
| `tools/build_booking_page.mjs` | Master script to assemble `book/venue.html` from `casamomo_book_page.html`. |

---

## 3. Operational CLI Commands (For Any New Device)

### Start Dev Server:
```bash
node server.mjs
# Serves at http://localhost:3003
```

### Regenerate Subpages:
```bash
node tools/generate_5_venue_subpages.mjs
```

### Rebuild Booking Page:
```bash
node tools/build_booking_page.mjs
```

### Deploy to Production:
```bash
npx vercel --prod --yes
```
