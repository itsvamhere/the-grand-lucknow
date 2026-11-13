# Context Handover: The Grand Lucknow (Canonical Repository Handover)

**Version:** 4.0 (Full Core-Route Parity & Luxury-Wedding Palette Edition)  
**Date:** 13-Nov-2026  
**Repository:** `https://github.com/itsvamhere/the-grand-lucknow` (`main` branch)  
**Live Production URL:** `https://the-grand-lucknow.vercel.app`  
**Base Reference Architecture:** 1:1 Strict Clone of Casa Momo (`https://www.casamomo.at`)

---

## 1. Non-Negotiable Directives & Anti-Improvisation Laws

1. **Strict 1:1 Casa Momo Parity (Zero Improvisation):**
   - Replicate the home page, core routes (`/venues`, `/about`, `/contact`), venue subpages (`/venues/<slug>`), and booking route (`/book/venue`) 1:1 from Casa Momo's authentic layout, typography, spacing, and motion physics while keeping 100% of our own Lucknow context and assets.
   - **Luxury-Wedding Palette (Derived from `thegrandlucknow.in`):**
     - Ground Ink: `#121110` (`rgb(18, 17, 16)`) — replaces Casa Momo `#0E1201` / `#10231D`
     - Raised Surface: `#1C1A17` (`rgb(28, 26, 23)`) — replaces `#1A241E` / `#161A13` / `#1A1F0B`
     - Pearl Ivory: `#F6EEDC` (`rgb(246, 238, 220)`) — replaces `#FFF0CA` / `#F3ECDD` (16.4:1 contrast on `#121110`)
     - Antique Bronze (Footer Face & Accents): `#8A6212` (`rgb(138, 98, 18)`) — replaces `#BC6F45` / `#C2653A` (4.7:1 AA contrast with `#F6EEDC`)
     - Deep Bronze (Footer Outer Band): `#6B4A0C` (`rgb(107, 74, 12)`) — replaces `#964317`
     - Antique Gold (Focus & Selection): `#D9A520`
   - **Contact & Socials:** `Thegrandbanquet07@gmail.com`, `+91 91291 27091`, Instagram (`https://www.instagram.com/thegrand.lucknow/`), Facebook (`https://www.facebook.com/thegrandlucknow/`), NO LinkedIn.
   - **Attribution:** "Built by Edifice" (`https://elvar.in/edifice`).

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

3. **Subpage & Core Route UI/UX Rules:**
   - **Gallery Corners & Mobile Grid:** Gallery images maintain `0px` border-radius (`maxRadius = 0`) matching Casa Momo, and use a 4-column CSS grid on mobile (`<= 809.98px`) with a `12px` gutter (`grid-column: 1 / span 3` odd, `2 / span 3` even).
   - **Full-Bleed Footer Ticker:** `footer.framer-18na9ah .framer-n49p1z { width: 100vw !important; max-width: none !important; }` so `THE GRAND` bleeds edge-to-edge on all viewports.
   - **Sticky Button Link:** On every subpage, the sticky button links directly to `/book/venue?venue=<slug>` (no fake payment modal).

---

## 2. File & Directory Inventory

| File / Path | Purpose |
| :--- | :--- |
| `index.html` | Canonical home page with verified 5-venue cards, estate map, and antique bronze footer. |
| `venues.html` | 1:1 Casa Momo `/apartments` layout adapted for our 5 venues (`Venues with Soul`), GMB reviews, and Location section. |
| `about.html` | 1:1 Casa Momo `/about` layout with our philosophy, 64-room estate overview, scale-up photography, and Location section. |
| `contact.html` | 1:1 Casa Momo `/contact` layout with our direct phone, email, and Gomti Nagar / Raibareli Rd address. |
| `venues/<slug>.html` | Dedicated subpages for all 5 verified venues. |
| `book/venue.html` | Authentic check availability booking page wrapped in our canonical navbar + footer shell. |
| `tools/build_core_pages.mjs` | Builds `about.html`, `contact.html`, and `venues.html` from `tools/core_pages.json` + `tools/motion_engine.js`. |
| `tools/apply_edge_fix.mjs` | Injects `<style id="grand-edge-fix">` (100vw footer ticker, 4-col mobile gallery gutter, mobile footer email fit). |
| `tools/apply_palette.mjs` | Idempotent token mapper applying `#121110` / `#1C1A17` / `#F6EEDC` / `#8A6212` / `#6B4A0C` / `#D9A520` across all HTML/MJS/CSS. |
| `tools/clean_all.mjs` | Cleans venue subpages, `index.html`, `scripts/*.mjs`, and rebuilds `book/venue.html` in the canonical shell. |

---

## 3. Operational CLI Commands (For Any New Device)

### Rebuild & Apply Palette:
```bash
node tools/clean_all.mjs && node tools/build_core_pages.mjs && node tools/apply_edge_fix.mjs && node tools/apply_palette.mjs
```

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
