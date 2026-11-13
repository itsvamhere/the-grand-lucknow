# Context Handover: The Grand Lucknow (Canonical Repository Handover)

**Version:** 5.0 (Map-Matched `#FFF0CA` + `#C2653A` Palette, Unified Nav Blur/Theme Sync, Morph Cursor & Footer `-10%` Edition)  
**Date:** 13-Nov-2026  
**Repository:** `https://github.com/itsvamhere/the-grand-lucknow` (`main` branch, latest verified code commit: `bbca151`)  
**Live Production URL:** `https://the-grand-lucknow.vercel.app`  
**Base Reference Architecture:** 1:1 Strict Clone of Casa Momo (`https://www.casamomo.at`)

---

## 1. Non-Negotiable Directives & Locked Design System

1. **Strict 1:1 Casa Momo Parity (Zero Improvisation):**
   - Replicate the home page (`/`), core routes (`/venues`, `/about`, `/contact`), venue subpages (`/venues/<slug>`), and booking route (`/book/venue`) 1:1 from Casa Momo's layout, typography, spacing, and micro-motion while keeping 100% Lucknow venue context and assets.
2. **Locked Palette (`tools/apply_palette.mjs`):**
   - **Ground Ink:** `#121110` (`rgb(18, 17, 16)`)
   - **Raised Surface / Dark Nav Text:** `#1C1A17` (`rgb(28, 26, 23)`)
   - **Map-Matched Cream (Light Backgrounds, Text on Ink, Hero/Nav Cream):** `#FFF0CA` (`rgb(255, 240, 202)`) — **must** match the master vector map background shade seamlessly across all pages (`html, body { background-color: #FFF0CA !important; }`).
   - **Vibrant Terracotta Orange (Footer, `Recent Reviews` Stars & `6` Badge):** `#C2653A` (`rgb(194, 101, 58)`) — never use duller `#964317` / `#BC6F45` / `#8A6212`.
   - **Antique Gold (Focus & Selection):** `#D9A520`
3. **Contact & Socials:** `Thegrandbanquet07@gmail.com`, `+91 91291 27091`, Instagram (`https://www.instagram.com/thegrand.lucknow/`), Facebook (`https://www.facebook.com/thegrandlucknow/`), NO LinkedIn.
4. **Attribution:** `"Built by Edifice"` (`https://elvar.in/edifice`).

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

### A. Unified Nav Bar Blur & Light/Dark Theme Sync (`updateLogoColorClass` + `#grand-palette`)
- **Navbar Container Blur:** `header div.framer-1kcv8in`, `nav > div[data-framer-name="Nav Link"]`, `.framer-1s5ig4a`, and `div[data-framer-name="Menu Button"]` use `backdrop-filter: blur(8px)` (`rgba(255,240,202,0.07)` on dark, `rgba(28,26,23,0.08)` on light).
- **Theme Sync (`index.html` & `venues/open-earth-lawn.html` shell):**
  - `updateLogoColorClass()` uses an explicit `var determined = false;` flag so a detected dark layer (`lum < 110`) is **not** overwritten by the `document.body` (`#FFF0CA`) fallback.
  - Both `html.logo-dark-text` (`data-logo-theme="dark"`) AND `document.body.classList.toggle('is-light-theme', isLight)` must always stay synced.
  - `<style id="grand-palette">` is injected right before `</body>` (after all `<style>` tags in `<head>` and `<body>`) with `html body header ...` specificity so Framer's inline/body styles cannot split-brain the Logo, Nav Links, and `Book Now ↗` CTA.

### B. Morph Cursor Pill (`Details ↗` / `Show on Maps ↗`) & Universal Button Motion
- **Cursor Selector Guard:** `index.html` contains a `<style data-morph-cursor>` tag and Framer's arrowless `div[data-morph-cursor=""]`. `initMorphCursor()` **must** query `div[data-morph-cursor="true"]` (never `[data-morph-cursor]`) and remove/hide `div[data-morph-cursor=""]`.
- **Arrow & Letter Motion:** `div[data-morph-cursor="true"]` and `.grand-map-cursor` render rolling staggered `.mc-ch` characters (`translateY(105%) -> 0%`, `calc(var(--i,0)*0.015s)`) paired with a `10×10` `↗` `<svg>` (`fill="currentColor"`).
- **All `.framer-vO7O2` Buttons (`Book Now`, `All Venues`, `Plan Your Event`, `Open in Maps`, `Check Availability`):** Share the exact nav-bar `[data-rolling-label]` character roll + `.framer-1ko9uiy` dual-arrow diagonal slide (`top: 1px; left: 1px` / `top: -10px; left: 12px`).

### C. Section Parity (`/venues`, `/about`, `/venues/*`) & Footer `-10%`
- **`/venues` Location & Reviews:** Uses the full Home `Locations` section (`MapLibre GL` `#grand-vector-map` `660×660` square) and full Home `Recent Reviews [6]` with continuous horizontal marquee (`grand-reviews-marquee`, pauses on hover) and 5 Lucknow wedding cards. Individual `/venues/<slug>` subpages retain their estate/vector maps.
- **Footer `"THE GRAND"` Giant Wordmark (`-10%`):** `html body footer .framer-xj8hz2` is locked to `1948px × 243px` desktop (`1080px × 135px` mobile), overriding `<style id="universal-grand-footer-styles">`.

---

## 4. File & Build Pipeline Inventory

| File / Path | Purpose |
| :--- | :--- |
| `index.html` | Home page with preloader, hero, 5 venue cards (`Details ↗` cursor), MapLibre location, Lucknow reviews marquee, and `#C2653A` footer. |
| `venues.html`, `about.html`, `contact.html`, `404.html` | Core pages built from `venues/open-earth-lawn.html` shell via `tools/build_core_pages.mjs`. |
| `venues/<slug>.html` | Dedicated subpages for all 5 verified venues (`Check Availability`, `Open in Maps`, `Show on Maps ↗`, `All Venues ↗`). |
| `book/venue.html` | Booking route wrapped in canonical navbar + footer shell. |
| `tools/build_core_pages.mjs` | Rebuilds `about.html`, `contact.html`, `venues.html` with `#FFF0CA` background, `#C2653A` stars/`6`-badge, MapLibre location, and reviews marquee. |
| `tools/apply_edge_fix.mjs` | Injects `<style id="grand-edge-fix">` (100vw footer ticker, 4-col mobile gallery gutter, mobile footer email fit). |
| `tools/apply_palette.mjs` | Idempotent palette mapper + injects `<style id="grand-palette">` before `</body>` (nav blur/theme sync, `-10%` `.framer-xj8hz2`, button & cursor motion). |

---

## 5. Operational CLI Commands

```bash
# Rebuild core pages & apply edge fix + palette/motion overrides:
node tools/build_core_pages.mjs && node tools/apply_edge_fix.mjs && node tools/apply_palette.mjs

# Start local server (serves at http://localhost:3003):
node server.mjs

# Playwright-core in this VM (use ignoreHTTPSErrors: true for CDN tiles/scripts):
NODE_PATH=/home/antigravity/scratch/node_modules node -e '...'

# Deploy to production:
npx vercel --prod --yes
```

---

## 6. Current Status & Suggested Next Steps
- **Verified in Playwright (commit `bbca151`):**
  - `Details ↗` cursor arrow (`10×10` SVG, `opacity: 1`, `0` duplicates) on `/`, `/venues`, `/venues/open-earth-lawn`.
  - Nav bar logo, links, blurred pill, and `Book Now ↗` CTA 100% theme-synced on dark hero/sections (`#FFF0CA`) and light `#FFF0CA` / `#C2653A` sections (`#1C1A17`).
  - Footer `#C2653A`, Reviews stars/`6`-badge `#C2653A`, and `-10%` footer wordmark (`1948 × 243`) verified across all pages.
  - `.framer-vO7O2` rolling-letter + dual-arrow hover animation verified on `Book Now ↗` and `All Venues ↗`.
- **Recommended Next Step:** Run `/jury` for a full 3-viewport (`1440×900`, `768×1024`, `375×812`) Awwwards audit and deploy via `npx vercel --prod --yes` when ready.
