# Context Handover: The Grand Lucknow (Canonical Repository Handover)

**Version:** 5.1 (Self-Hosted Open-Source Fonts & MapLibre, Zero Trackers/CDN Hotlinks, Clean Legal Pages & v2.1.5 Hygiene)  
**Date:** 20-Nov-2026  
**Repository:** `https://github.com/itsvamhere/the-grand-lucknow` (`main` branch)  
**Live Production URL:** `https://the-grand-lucknow.vercel.app`

---

## 1. Non-Negotiable Directives & Locked Design System

1. **Preserved Visual & Motion Architecture:**
   - Home (`/`), core routes (`/venues`, `/about`, `/contact`), 5 venue detail routes (`/venues/<slug>`), booking (`/book/venue`), and legal pages (`/imprint`, `/privacy`, `/terms`) preserve the locked layout, typography, spacing, and micro-motion across 100% Lucknow venue content and assets.
2. **Locked Palette (`tools/apply_palette.mjs`):**
   - **Ground Ink:** `#121110` (`rgb(18, 17, 16)`)
   - **Raised Surface / Dark Nav Text:** `#1C1A17` (`rgb(28, 26, 23)`)
   - **Map-Matched Cream (Light Backgrounds, Text on Ink, Hero/Nav Cream):** `#FFF0CA` (`rgb(255, 240, 202)`) — matches the vector map background shade across all pages (`html, body { background-color: #FFF0CA !important; }`).
   - **Vibrant Terracotta Orange (Footer, `Recent Reviews` Stars & `6` Badge):** `#C2653A` (`rgb(194, 101, 58)`) — never use duller `#964317` / `#BC6F45` / `#8A6212`.
   - **Antique Gold (Focus & Selection):** `#D9A520`
3. **100% Self-Hosted Assets & Fonts (Invariant 08):**
   - Open-source `.woff2` fonts served locally via `/fonts/self-hosted-fonts.css`: `Inter` (`/fonts/inter/`), `Manrope` aliased as `"Lay Grotesk Regular"` (`/fonts/manrope/`), `DM Serif Display` aliased as `"EL PACRE Regular"` (`/fonts/dm-serif-display/`), and `Playfair Display` (`/fonts/playfair-display/`).
   - MapLibre GL v4.7.1 CSS & JS self-hosted at `/scripts/vendor/maplibre-gl.css` and `/scripts/vendor/maplibre-gl.js`.
   - Zero analytics trackers, zero remote font APIs, and zero remote CDN `.mjs` / `.woff2` / image hotlinks.
4. **Contact & Socials:** `Thegrandbanquet07@gmail.com`, `+91 91291 27091`, Instagram (`https://www.instagram.com/thegrand.lucknow/`), Facebook (`https://www.facebook.com/thegrandlucknow/`), NO LinkedIn.
5. **Attribution:** `"Built by Edifice"` (`https://elvar.in/edifice`).

---

## 2. The 5 Verified Venues (Strict Authority)

The Grand Lucknow has exactly **5 verified venues**. Do NOT invent or keep any other venue:
1. **Open Earth Lawn** (`/venues/open-earth-lawn`) — `25,000 Sqft` · `2,500` (`1,000 - 2,500 Guests`) · `/images/venues/open_earth_lawn_official.webp`
2. **Grassland Gala** (`/venues/grassland-gala`) — `20,000 Sqft` · `800` (`500 - 800 Guests`) · `/images/venues/grassland_gala_official.webp`
3. **Garden Galaxy** (`/venues/garden-galaxy`) — `15,000 Sqft` · `300` (`250 - 300 Guests`) · `/images/venues/garden_galaxy_official.webp`
4. **The Grand Courtyard** (`/venues/the-grand-courtyard`) — `15,000 Sqft` · `250` (`200 - 250 Guests`) · `/images/venues/the_grand_courtyard_official.webp`
5. **The Royal Legacy Banquet** (`/venues/the-royal-legacy-banquet`) — `10,000 Sqft` · `600` (`400 - 600 Guests`) · `/images/venues/royal_legacy_banquet_official.webp`

---

## 3. Critical Architecture & Regression-Prevention Notes

### A. Unified Nav Bar Blur & Light/Dark Theme Sync (`#grand-header-sync` + `#grand-palette`)
- **Navbar Container Blur:** `header div.framer-1kcv8in`, `nav > div[data-framer-name="Nav Link"]`, `.framer-1s5ig4a`, and `div[data-framer-name="Menu Button"]` use `backdrop-filter: blur(8px)` (`rgba(255,240,202,0.07)` on dark, `rgba(28,26,23,0.08)` on light).
- **Theme Sync:**
  - `updateLogoColorClass()` / `#grand-header-sync` detects dark vs light section contrast under the header so a detected dark layer (`lum < 110`) is not overwritten by `document.body` (`#FFF0CA`).
  - Both `html.logo-dark-text` (`data-logo-theme="dark"`) AND `document.body.classList.toggle('is-light-theme', isLight)` always stay synced.
  - `<style id="grand-palette">` is injected right before `</body>` so Logo, Nav Links, and `Book Now ↗` CTA stay contrast-synced.

### B. Morph Cursor Pill (`Details ↗` / `Show on Maps ↗`) & Universal Button Motion
- **Cursor Selector Guard:** `initMorphCursor()` queries `div[data-morph-cursor="true"]` (never `[data-morph-cursor]`) and hides `div[data-morph-cursor=""]`.
- **Arrow & Letter Motion:** `div[data-morph-cursor="true"]` and `.grand-map-cursor` render rolling staggered `.mc-ch` characters paired with a `10×10` `↗` `<svg>`.
- **All `.framer-vO7O2` Buttons (`Book Now`, `All Venues`, `Plan Your Event`, `Open in Maps`, `Check Availability`):** Share nav-bar `[data-rolling-label]` character roll + `.framer-1ko9uiy` dual-arrow diagonal slide.

### C. Section Layout (`/venues`, `/about`, `/venues/*`) & Footer Wordmark
- **`/venues` Location & Reviews:** Uses the Home `Locations` section (`MapLibre GL` `#grand-vector-map` using local `/scripts/vendor/maplibre-gl.*` + `/grand_detailed_style.json`) and Home `Recent Reviews [6]` with continuous horizontal marquee (`grand-reviews-marquee`, pauses on hover) and 5 Lucknow wedding cards.
- **Footer `"THE GRAND"` Wordmark:** `html body footer .framer-xj8hz2` is sized `880px × 110px` desktop (`512px × 64px` mobile).

---

## 4. File & Build Pipeline Inventory

| File / Path | Purpose |
| :--- | :--- |
| `index.html` | Home page with preloader, hero, 5 venue cards (`Details ↗` cursor), MapLibre location, Lucknow reviews marquee, and `#C2653A` footer. |
| `venues.html`, `about.html`, `contact.html` | Core site routes with self-hosted fonts, local MapLibre (`/venues`), and reviews marquee. |
| `venues/<slug>.html` | Dedicated subpages for all 5 verified venues (`Check Availability`, `Open in Maps`, `Show on Maps ↗`, `All Venues ↗`). |
| `book/venue.html` | Booking route wrapped in canonical navbar + footer shell. |
| `imprint.html`, `privacy.html`, `terms.html` | Branded legal/estate information pages for The Grand Lucknow. |
| `fonts/self-hosted-fonts.css` | Self-hosted `@font-face` declarations for `Inter`, `Manrope` (`Lay Grotesk Regular`), `DM Serif Display` (`EL PACRE Regular`), and `Playfair Display`. |
| `scripts/vendor/maplibre-gl.*` | Locally vendored MapLibre GL v4.7.1 CSS & JS. |
| `robots.txt` | Root crawl directives (`Allow: /`). |
| `vercel.json` | Clean URL rewrites and permanent redirects for legacy routes (`/apartments/:path*`, `/venues/boutique-n*`). |
| `server.mjs` | Local static development server (`http://localhost:3003`) mirroring `vercel.json` rewrites/redirects. |
| `tools/apply_edge_fix.mjs` | Injects `<style id="grand-edge-fix">` (100vw footer ticker, 4-col mobile gallery gutter, mobile layout polish). |
| `tools/apply_palette.mjs` | Idempotent palette mapper + injects `<style id="grand-palette">` and `<script id="grand-header-sync">` before `</body>`. |
| `tools/motion_engine.js` | Shared subpage motion engine (mobile menu, parallax, footer observer, map cursor, rolling labels, morph cursor). |

---

## 5. Operational CLI Commands

```bash
# Re-apply edge fix + palette/motion overrides:
node tools/apply_edge_fix.mjs && node tools/apply_palette.mjs

# Start local static server (serves at http://localhost:3003):
node server.mjs

# Zero-leak & self-hosting audit:
node ~/.gemini/config/library/sanitize-donor.mjs . --donor "<reference-brand>,<reference-domain>"

# 3-Viewport overflow gate:
node ~/.gemini/config/library/preview-devices.mjs http://localhost:3003
```
