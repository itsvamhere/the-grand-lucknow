# Context Handover: The Grand Lucknow (Canonical Repository Handover)

**Version:** 6.0 (1:1 Casa Momo Parity Refactor, Native Framer + Lenis Runtime & All 5 Verification Gates Passed)  
**Date:** 21-Nov-2026  
**Repository:** `https://github.com/itsvamhere/the-grand-lucknow` (`main` branch)  
**Live Production URL:** `https://the-grand-lucknow.vercel.app`

---

## 1. Architecture & Locked Design Parity

1. **1:1 Casa Momo Palette & Self-Hosted Typography:**
   - **Ground Olive:** `#0e1201`
   - **Raised Surface:** `#161a13` / `#131415`
   - **Cream Foreground / Light Surface:** `#fff0ca`
   - **Terracotta Accent:** `#bc6f45`
   - **Desktop Footer:** `#964317`
   - **Peach Tint:** `#ffe3d4`
   - **Self-Hosted Fonts (`/fonts/self-hosted-fonts.css`):** Self-hosted `.woff2` families aliased identically (`Lay Grotesk Regular`, `EL PACRE Regular`, `Inter`, `Playfair Display`), zero external CDN or Google Fonts requests.
2. **Pure Native Framer Motion + Lenis Runtime (`/scripts/script_main.mjs`):**
   - All 13 routes boot via native `<script type="module" src="/scripts/script_main.mjs">` with React `createRoot` on `#main`.
   - Legacy override band-aids (`tools/apply_palette.mjs`, `tools/apply_edge_fix.mjs`, `tools/motion_engine.js`, `grand_detailed_style.json`, `<style id="grand-palette">`, `<style id="universal-grand-footer-styles">`) have been permanently removed.
   - Zero `!important` style hacks and zero external CDN links (`framerusercontent`, `fonts.gstatic`, `smoobu`, `stripe`, `openfreemap` fully purged).
3. **Contact & Socials:**
   - Phone: `+91 91291 27091` (`tel:+919129127091`, WhatsApp `https://wa.me/919129127091`)
   - Email: `Thegrandbanquet07@gmail.com`
   - Location: `22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India` (`[26.6355667, 80.9992764]`)

---

## 2. Canonical 5 Verified Venues & Media Pipeline

Exact 5 verified venues served through the local CMS adapter (`scripts/AOQA9ZjYa.CwSXFmg7.mjs`, implementing `q.collectionByLocaleId.default`, `scanItems()`, `resolveItems()`, `resolveRichText()`, 5×6 photos + captions, 12 event-venue amenities, and `rr` alias resolver):
1. **Open Earth Lawn** (`/venues/open-earth-lawn`) — `25,000` sq ft · `2,500` guests · `images/venues/open-earth-lawn_1..6.webp`
2. **Grassland Gala** (`/venues/grassland-gala`) — `20,000` sq ft · `800` guests · `images/venues/grassland-gala_1..6.webp`
3. **Garden Galaxy** (`/venues/garden-galaxy`) — `15,000` sq ft · `300` guests · `images/venues/garden-galaxy_1..6.webp`
4. **The Grand Courtyard** (`/venues/the-grand-courtyard`) — `15,000` sq ft · `250` guests · `images/venues/the-grand-courtyard_1..6.webp`
5. **The Royal Legacy Banquet** (`/venues/the-royal-legacy-banquet`) — `10,000` sq ft · `600` guests · `images/venues/the-royal-legacy-banquet_1..6.webp`

**Hero Video & Galleries:**
- **Video Hero (`IStDm3kWi` `Video Grow`):** 9.0s H.264 `+faststart` desktop (`media/grand-teaser-desktop.mp4`, 1920×1080) & mobile (`media/grand-teaser-mobile.mp4`, 1080×1920) loops paired with `images/hero_poster_desktop.webp`, `images/hero_poster_mobile.webp`, and scrimmed `images/hero_bg.webp`.
- **`server.mjs`:** Serves clean local routes, `vercel.json` aliases, `.mp4`/`.webm`/`.xml` MIME types, and HTTP `206 Partial Content` / `416` byte-range streaming.

---

## 3. Critical Engine & Layout Fixes Preserved

- **Carousel Arrow Portal & Overflow (`scripts/ParallaxImage.B0avVUfL.mjs`):** Skips `display: contents` wrappers when resolving portal bounding containers so right-column slide arrows remain within container bounds.
- **Ticker & Big-Text Clipping (`scripts/IStDm3kWi...mjs`, `scripts/fr7SG9...mjs`, `index.html`):** Review ticker sets `tickerEffectOverflow: "hidden"` and `.framer-1ao0xob` / `.framer-1kqde9i` apply `overflow-x: clip; overflow-y: visible;`.
- **Descender Clearance, Button Contrast & CSSOM Caching (`scripts/shared-lib.DganPNQZ.mjs`):**
  - `AnimatedText` uses `max(${D}px, 0.22em)` bottom word-mask padding with matching negative margin to preserve exact line cadence without slicing `g, y, p, q, ?` descenders.
  - `framer-vO7O2` sets explicit color tokens on light/dark button variants so `#svg-1267704399_390` (`fill="currentColor"`) renders `#0e1201` on cream CTA pills instead of default `rgb(0, 0, 238)`.
  - `Cn()` memoizes CSSOM stylesheet rule extraction per sheet via `WeakMap` and restricts `MutationObserver` on `<head>` to `<style>`/`<link rel="stylesheet">` nodes, eliminating `2,952ms` scroll-time stylesheet recalculations (`1x` synthetic `INP: 17ms`).
- **Event Booking Flow (`scripts/Booking.DRu38j-Y.mjs`):** Event guest tiers (`×100` up to 2,500), family suites, day-based spans, INR quote mode, and live WhatsApp inquiry dispatch (`https://wa.me/919129127091`).
- **SEO & AEO Surface:** Valid `sitemap.xml`, `robots.txt`, `llms.txt` (2,249 chars), `llms-full.txt` (3,949 chars), JSON-LD Schema.org blocks, clean HTML structure across all 13 pages (removed stray `<rect>` head fragments and duplicate `#main` closing `</div>` tags in `venues.html`).

---

## 4. Verified Gate Evidence (21-Nov-2026)

| Check / Gate | Command | Result |
| :--- | :--- | :--- |
| Donor Sanitization | `node ~/.gemini/config/library/sanitize-donor.mjs . --donor "Casa Momo,casamomo.at"` | **PASSED** (`0` fails, `0` warns across `28` files) |
| Copy Kill-List | `node ~/.gemini/config/library/kill-list-linter.mjs .` | **PASSED** (`0` fails, `0` warns) |
| SEO & Metadata Audit | `node ~/.gemini/config/library/seo-audit/run-seo-audit.mjs http://127.0.0.1:3003 --canonical-origin https://the-grand-lucknow.vercel.app` | **15/15 PASSED** (`fixNowCount: 0`, `watchCount: 0`, `18` crawled URLs) |
| 3-Viewport Overflow Gate | `node ~/.gemini/config/library/preview-devices.mjs http://127.0.0.1:3003` | **`[3-VIEWPORT GATE PASSED]`** (Desktop `1440px`, Tablet `768px`, Mobile `375px`) |
| Swap Manifest Verify | `node ~/.gemini/config/library/swap-manifest.mjs verify . --ignore-pending` | **PASSED** (`0` leaks, `100%` slots swapped) |
| Full Playwright Matrix | `qa_13routes.mjs` across `13 routes × 3 viewports` | **39/39 PASSED** (`Failing rows: 0`, `0` console/page/external errors) |
| Responsiveness & Booking | Playwright `1x`/`4x` CPU trace + `/book/venue` click test | `1x` synthetic `INP: 17ms`; `Tn()` CSSOM LoAF eliminated (`0ms`); WhatsApp dispatch verified |
