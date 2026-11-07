# Context Handover: The Grand Lucknow Subpage & Parity Alignment

**Generated:** 2026-11-07 14:17 IST  
**Workspace:** `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo`  
**Live Production URL:** `https://the-grand-lucknow.vercel.app`  
**Target File:** `venues/open-earth-lawn.html` (and shared assets)

---

## 1. Executive Summary & Core Requirements

This handover captures the full operational state and exact user requirements across all feedback points:

1. **Footer Replica Law**:  
   - Replace the entire `<footer>...</footer>` in `venues/open-earth-lawn.html` with the authentic 108,688-byte footer block from `index.html`.  
   - **Zero custom SVG hacks or washed-out gradient masks**: Preserve Framer's full-bleed animated marquee ticker (`AND   THE GR`), 1 Menu, 2 Socials, 3 Contact (`Thegrandbanquet07@gmail.com`, `+91 91291 27091`), and bottom legal row.

2. **Location Heading Fade**:  
   - The "Location" heading (`#4E5240`) must remain **100% opaque (`opacity: 1`)** by default on the cream background.  
   - It must **dim to `0.45` ONLY during physical overlap** with the sticky navbar (`header[data-framer-name="Navbar Wrapper"]`), and return to `1` as soon as it clears.

3. **Map Marker Centering & Clearance**:  
   - The map pin ("The Grand" brown pill tag + pulsing dot) must be anchored at **`left: 50%`** (horizontally centered) and **`top: 40%`** on the map container.  
   - In `#grand-subpage-map-styles`, ensure `#subpage-vector-map` is centered (`width: 100% !important; left: 0 !important;`) so the pin is dead center in the viewport (`x: 50%`) with **>350px clearance** above the sticky "Check Availability" button, guaranteeing zero collision.

4. **Authentic Venue Specifications (Strict User Reference Cards)**:  
   Do not guess or use placeholder numbers. Metrics must match the user's authentic cards:
   - **Open Earth Lawn**: `55,000 Sqft` · `1,000 - 1,500 Guests` (Display `1,500`)
   - **Grassland Gala**: `20,000 Sqft` · `500 - 800 Guests` (Display `800`)
   - **Garden Galaxy**: `15,000 Sqft` · `250 - 300 Guests` (Display `300`)
   - **The Grand Courtyard**: `15,000 Sqft` · `200 - 250 Guests`
   - **The Royal Legacy Banquet**: `10,000 Sqft` · `500 - 600 Guests`
   - Eradicate all stray exponents/superscripts (`.framer-84xumc { display: none !important; }`).

5. **Gallery & Hero Stock Photos**:  
   - Do not use screenshots of the hotel building.  
   - Use the 6 curated high-res (1920x1080) WebP wedding lawn stock photos in `images/venues/`:
     - `images/venues/open_earth_lawn_1.webp` (76 KB – Sunlit expansive lawn & wedding stage)
     - `images/venues/open_earth_lawn_2.webp` (134 KB – Luxury floral arch on manicured grass)
     - `images/venues/open_earth_lawn_3.webp` (106 KB – Open-air marquee lawn landscape)
     - `images/venues/open_earth_lawn_4.webp` (195 KB – Banquet dining setup under tree canopy)
     - `images/venues/open_earth_lawn_5.webp` (354 KB – Evening garden estate banquet)
     - `images/venues/open_earth_lawn_6.webp` (64 KB – Twilight lawn with glowing fairy lights)
   - Bind `open_earth_lawn_1.webp` to Hero background and slides 1–6 in the Gallery.

6. **Subpage Venue Cards ("Other Venues")**:  
   - The cards inside `data-framer-name="Venue Lists"` must display the home page images (`/images/card_2_grassland_gala.webp` and `/images/card_3_ballroom.webp`) without black placeholder frames, with clean links to `/venues/grassland-gala` and `/venues/garden-galaxy`.

---

## 2. Inventory of Prepared Tools & Assets

| File Path | Description / Role |
| :--- | :--- |
| `tools/apply_perfect_parity.mjs` | Applies the exact `index.html` footer, updates gallery with the 6 stock photos, configures overlap-only Location fade, and anchors map pin. |
| `images/venues/open_earth_lawn_1.webp` ... `6.webp` | 6 high-res stock photos ready and verified on disk. |
| `images/the_grand_lucknow_master_map_1920.png` | 1920px master cartographic map centered on the estate. |
| `tools/eval_home_footer.mjs` | Playwright script verifying home page footer structure and ticker animation. |
| `tools/check_subpage_map_viewport.mjs` | Playwright script measuring exact pin coordinates and button clearance. |
| `tools/verify_production_live.mjs` | Live smoke test script verifying Vercel deployment status, 0 console errors, and asset load. |

---

## 3. Immediate Resume Checklist

To apply all changes, verify, and promote to production in one clean sequence:

```powershell
# 1. Navigate to workspace
cd "C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo"

# 2. Apply all parity changes to venues/open-earth-lawn.html
node tools/apply_perfect_parity.mjs

# 3. Verify locally via Playwright
node tools/eval_home_footer.mjs
node tools/check_subpage_map_viewport.mjs

# 4. Deploy to Vercel Production
npx vercel --prod --yes

# 5. Live Production Verification
node tools/verify_production_live.mjs
```

---

## 4. Active Environment & Dev Server
- **Dev Server Startup**: Run `node server.mjs` in `C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo` to serve locally on `http://localhost:3003`.
- **Playwright Core**: Installed and verified at `file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs` with Chrome channel.
