# MASTER MULTI-AGENT BUILD & AUDIT SPECIFICATION v5.0: THE GRAND LUCKNOW (`the-grand-lucknow`)
**Target Platform:** Antigravity (Hydrogen Model — Multi-Session Builder & Auditor Pipeline)  
**Goal:** A sales-ready preview and production-hardened web application for **The Grand Lucknow** replicating the exact `casamomo.at` design framework with zero UI/UX defects, verified property data, complete Razorpay KYC legal pages, server-persisted availability holds, and cryptographic, race-condition-proof Razorpay checkout for both venues and guest rooms.  
**Mechanics & Layout Authority:** 1:1 Framer SSR Static HTML Replica (`FRAMER_V5`) of `https://casamomo.at` (Inspect DOM/motion mechanics, CSS classes, rolling labels, and vector assets; preserve `data-framer-root`). Never copy Casa Momo copy, alt text, or green/olive palette.  
**Verified Facts Source:** `https://www.thegrandlucknow.in` (Official site publishes no tariffs).

---

## 0. MULTI-SESSION ORCHESTRATION, TOKEN EFFICIENCY & HANDOVER PROTOCOL (READ FIRST)

> [!IMPORTANT]
> ### TOKEN EFFICIENCY LOCK (MANDATORY FOR ALL SUBAGENTS)
> - **Model Enforcement:** All builder and auditor subagents (`AGENT_BUILDER_[N]`, `AGENT_AUDITOR_[N]`) **MUST** be invoked with `Model: "flash"` to preserve token bandwidth and eliminate latency overhead.
> - **Zero Raw Minified HTML Context Bloat:** Existing Framer static HTML files are multi-megabyte bundles with dense inline SVG/CSS/JS. **NEVER** use `read_file` to read entire raw `.html` files into LLM context.
> - **Deterministic Node Transform Pipeline:** All HTML/DOM modifications **MUST** be executed programmatically via Node transformation scripts in `tools/*.mjs` using targeted string replacements, cheerio/regex, or AST manipulation.
> - **Execute -> Single Verification Gate -> Halt:** Builder agents must execute steps, run verification **once**, write their handover artifact, and stop. Never loop, poll, or re-verify passed checks.

To prevent single-session confirmation bias, **Builder Agents and Auditor Agents MUST be launched by the operator in separate, isolated chat sessions**:

1. **Session A — `AGENT_BUILDER_[N]` (Execution Session):**
   - Receives this specification and the current repository state.
   - Executes **one numbered step at a time** within Run `N`, running the inline `Verify` command after each step.
   - Touches **only** the files listed under `Files to Create / Modify` for Run `N`. If another file must change, halts and logs a `SCOPE_EXCEPTION_REQUEST`.
   - Modifies existing static Framer `.html` files strictly via deterministic scripts in `tools/*.mjs`—**never** overwrite the Framer DOM shell or delete `data-framer-root`.
   - Uses Casa Momo's native **inline expandable drawer** pattern (`1px solid rgba(245,238,219,0.22)` bordered accordion inside the card flow) for booking details and hold receipts—**never** invent floating SaaS popup modals from scratch.
   - Upon finishing all steps in Run `N`, outputs a **Builder Handover Artifact** (`git status`, `git diff --stat`, `node tools/... execution logs`, `tsc --noEmit` output) and stops. It may **never** grade its own Run-End Verification Block.
2. **Session B — `AGENT_AUDITOR_[N]` (Operator-Launched Fresh QA Session):**
   - Launched by the operator in a **brand-new chat session** with only this spec and the Run `N` checklist.
   - Runs `tsc --noEmit` and the deterministic Playwright audit script `node scripts/audit-viewports.mjs --run=N` against the local static server (`node server.mjs` on port `3003`) across all 6 viewports (`375x812`, `390x844`, `430x932`, `768x1024`, `820x1180`, `1440x900`).
   - Verifies `data-framer-root !== null` on all audited HTML pages.
   - Outputs the mandatory **Pass/Fail Audit Table** (`Check | Phone | Tablet | Laptop | Notes`).
3. **Hard Gate Rule:**
   - The operator starts Run `N+1` **only** when every row in `AGENT_AUDITOR_[N]`'s Pass/Fail Audit Table is `PASS`. If any check is `FAIL`, the operator returns control to `AGENT_BUILDER_[N]` to fix the exact failing item.

---

## 1. GLOBAL ARCHITECTURE, STACK & DESIGN TOKENS

### 1.1 Architecture & Stack Lock

- **Canonical Architecture:** **Existing 1:1 casamomo.at Framer SSR Static HTML Replica (FRAMER_V5) + Node Build Pipeline (`tools/*.mjs`) + Local Static Server (`server.mjs`) + Vercel Serverless Functions (`api/*.ts`) + TypeScript Data/Lib Contracts (`src/data/*.ts`, `src/lib/*.ts`)**.
- **Hosting & Runtime Target:** Vercel Static Deployment (`Framework Preset: Other`, Output Directory `.`) + Vercel Serverless Functions (`api/*.ts`) + Node 20+ local execution (`server.mjs` on port `3003`).

> [!CAUTION]
> ### HARD ARCHITECTURE LOCK (DO NOT VIOLATE)
> 1. **FORBIDDEN MIGRATION:** NEVER migrate to Next.js App Router (`src/app/*`), Remix, Astro, or overwrite existing Framer HTML pages (`index.html`, `venues.html`, `venues/*.html`, `about.html`, `contact.html`, `book/venue.html`, `imprint.html`, `terms.html`, `privacy.html`).
> 2. **NO `public/` DIRECTORY IN REPOSITORY ROOT:** NEVER create a `public/` directory in the repository root. `Framework Preset: Other` on Vercel automatically switches its Output Directory from `.` to `public` whenever a `public/` folder exists, completely breaking all root `.html` routes and resulting in 404 errors across the deployment. Store `favicon.svg` at repo root `/favicon.svg` and rewrite `/public/favicon.svg` -> `/favicon.svg` in `vercel.json` and `server.mjs` if needed.
> 3. **IN-PLACE STATIC HTML REFINEMENT:** All edits to shared headers, navigation, mobile menu, surface contrast, copy, sections, and schemas MUST be applied **in-place** across the static `.html` files via deterministic Node transformation scripts in `tools/*.mjs`, strictly preserving `data-framer-root`, Casa Momo CSS classes, rolling-label structures, and `FRAMER_V5` layout/motion parity.
> 4. **ZERO SHELL DRIFT:** Never strip or rewrite Casa Momo's Framer runtime chunks, vector definitions, or CSS animation keyframes. Any interactive widget (e.g., Venue Configurator, Room Booking Engine) mounts into dedicated containers within the existing static HTML shell.

- **Scroll Choreography & Motion Engine:**
  - **Framer SSR Motion + Lenis/GSAP Scroll Engine:** The static HTML pages utilize Casa Momo's native Framer SSR motion runtime, rolling character spans (`[data-rolling-label]`, `.mc-ch`), and smooth scroll synchronization (`src/lib/scroll.ts`).
  - Configure Lenis with `lerp: 0.1, smoothWheel: true`. Disable all smooth scrolling when `prefers-reduced-motion: reduce` is active.
- **UI State Transitions Only:** Framer Motion / CSS transitions are restricted to non-scroll UI transitions (mobile menu drawer, inline expandable booking drawers, guest stepper drawers, card photo carousels, and 3D character-roll hover states). **Never** attach uncontrolled scroll-linked opacity drops to body typography.
- **Scrubbed Properties Inventory (Scroll-Linked Parity):**
  1. **Classical Arch Window SVG:** Scrubs `strokeDashoffset` from `1` to `0` (`pathLength="1"`) and `transform: scale(0.7)` to `scale(1.65)`.
  2. **Editorial Manifesto Word Opacity:** Scrubs individual word `<span className="word">` `opacity` from `0.22` to `1.0`. (This is the *only* scroll-linked text opacity permitted in the codebase).
  3. **Editorial Feature Image Framing:** Scrubs `borderTopLeftRadius` and `borderTopRightRadius` from `28px` (at viewport bottom entry) to `0px` (at viewport center).
  4. **Surface Color Interpolation:** Scrubs section `--bg` from `#14120E` through `#6E6853` to `#F5EEDB` while simultaneously interpolating `--fg` from `#F5EEDB` to `#14120E`.

### 1.2 Immutable Brand Tokens (`src/styles/globals.css` & `#grand-palette`)
| Token | Hex | Purpose |
| :--- | :--- | :--- |
| `--bg-espresso` | `#14120E` | Primary dark surface |
| `--bg-espresso-elevated` | `#1C1915` | Dark cards, drawers, image shimmer |
| `--bg-sand` | `#F5EEDB` | Primary light warm sand surface (body background matches `#FFF0CA` vector map) |
| `--bg-sand-muted` | `#EAE0C8` | Light cards, pills, Philosophy Card 3 |
| `--bg-taupe-mid` | `#6E6853` | Scroll-interpolation midpoint surface |
| `--bg-terracotta-footer` | `#C46335` / `#C2653A` | Footer primary surface (`#C2653A` vibrant terracotta) |
| `--bg-terracotta-card` | `#B85D3B` | Philosophy Card 2 surface |
| `--text-cream` | `#F5EEDB` / `#FFF0CA` | Primary text on dark/terracotta surfaces |
| `--text-cream-muted` | `#B5AEA0` | Secondary text on dark surfaces |
| `--text-charcoal` | `#14120E` | Primary text on light sand surfaces |
| `--text-charcoal-muted` | `#5C564B` | Secondary labels on light sand surfaces |
| `--status-unavailable` | `#E06D53` | Coral-red capacity/date conflict indicator |
| `--gold-accent` | `#D9A520` | Antique Gold focus & selection indicator |

### 1.3 Strict Three-Tier Viewport Definitions & Date Serialization Rule
- **Phone:** `375px` to `809px`
- **Tablet:** `810px` to `1023px`
- **Laptop:** `>= 1024px`
- Every section explicitly defines **Phone**, **Tablet**, and **Laptop** behavior. No breakpoint gap between `810px` and `1023px` is permitted.
- Enforce `html, body { overflow-x: hidden; max-width: 100vw; }` across all tiers.
- All interactive touch targets on Phone and Tablet must be `>= 44px x 44px`.
- **Strict Timezone-Agnostic Date Rule (`YYYY-MM-DD`):** All calendar dates across client state, URL query parameters, API request bodies, `priceCalculator.ts`, and `bookingStore.ts` **MUST** be formatted and compared as plain local `YYYY-MM-DD` strings (e.g., `"2026-11-14"`). **Never** call `.toISOString()` on calendar dates (which shifts `00:00:00 IST` backward by 5.5 hours to the previous day in UTC on Vercel).
- **Server-Side Date Range Validation:** Both client and server must validate `/^d{4}-d{2}-d{2}$/`, verify `startDate <= endDate` (for venues) and `checkInDate < checkOutDate` (for rooms), and reject past dates (`startDate < todayIST`).
- **Explicit Day vs. Night Counting Rule:**
  - **Venues (`/book/venue`):** Event bookings count **inclusive calendar days**: `dayCount = Math.max(1, diffDays(startDate, endDate) + 1)` (if a client selects `2026-11-14` to `2026-11-14` for a single-day wedding, `dayCount = 1`; if `2026-11-14` to `2026-11-15`, `dayCount = 2` days).
  - **Guest Rooms (`/book/rooms`):** Overnight hotel stays count **nights**: `nights = Math.max(1, diffDays(checkInDate, checkOutDate))` (check-in `2026-11-14` to check-out `2026-11-16` = `2` nights).

### 1.4 Mechanics Reference Directory (1:1 Template Mapping — Zero Custom Layouts)
| Route / Feature | Mechanics Reference (`casamomo.at`) | Target Static File (`the-grand-lucknow`) | Canonical Route |
| :--- | :--- | :--- | :--- |
| Homepage & Preloader | `https://casamomo.at/` | `index.html` | `/` |
| Venues Index | `https://casamomo.at/apartments` | `venues.html` | `/venues` |
| Venue 1 Detail | `https://casamomo.at/apartments/boutique-1` | `venues/open-earth-lawn.html` | `/venues/open-earth-lawn` |
| Venue 2 Detail | `https://casamomo.at/apartments/boutique-2` | `venues/grassland-gala.html` | `/venues/grassland-gala` |
| Venue 3 Detail | `https://casamomo.at/apartments/boutique-3` | `venues/garden-galaxy.html` | `/venues/garden-galaxy` |
| Venue 4 Detail | `https://casamomo.at/apartments/boutique-4` | `venues/the-grand-courtyard.html` | `/venues/the-grand-courtyard` |
| Venue 5 Detail | `https://casamomo.at/apartments/boutique-5` | `venues/the-royal-legacy-banquet.html` | `/venues/the-royal-legacy-banquet` |
| About Page | `https://casamomo.at/about` | `about.html` | `/about` |
| Contact Page | `https://casamomo.at/contact` | `contact.html` | `/contact` |
| Venue Booking Engine | `https://casamomo.at/book` | `book/venue.html` | `/book/venue` |
| Room Booking Engine | `https://casamomo.at/book` (exact same `/book` template) | `book/rooms.html` | `/book/rooms` |
| Legal Suite (5 Pages) | `https://casamomo.at/imprint`, `/terms`, `/privacy` | `imprint.html`, `terms.html`, `privacy.html`, `refunds.html`, `service-delivery.html` | `/imprint`, `/terms`, `/privacy`, `/refunds`, `/service-delivery` |

---

## RUN 1: VERIFIED DATA LAYER, LEGAL CONFIG, PLAYWRIGHT AUDIT SCRIPT, ROUTE STUBS & IN-PLACE FOUNDATION ENGINE
**Assigned Agents:** `AGENT_BUILDER_1` (Session A) → `AGENT_AUDITOR_1` (Session B)  
**Objective:** Centralize all verified property, tariff, and legal data (`legalConfig.ts`), sanitize `<head>` metadata/scripts across static HTML files, fix malformed `&scale-down-to=` image URLs globally, commit the deterministic Playwright audit script (`scripts/audit-viewports.mjs`), create zero-404 route stubs, eliminate invisible text bugs at the CSS root cause, and establish unified header navigation, logo contrast, and mobile menu sync across all static pages via `tools/apply_run1_foundation.mjs`.

- **Files to Create / Modify:**
  - `package.json`
  - `tsconfig.json`
  - `favicon.svg` (repo root — NEVER `public/favicon.svg`)
  - `src/data/siteConfig.ts`
  - `src/data/venueFacts.ts`
  - `src/data/pricingConfig.ts`
  - `src/data/roomsConfig.ts`
  - `src/data/legalConfig.ts`
  - `src/lib/scroll.ts`
  - `src/lib/useSurfaceTheme.ts`
  - `src/styles/globals.css`
  - `tools/apply_run1_foundation.mjs` (in-place patching of `index.html`, `venues/open-earth-lawn.html`, `venues/*.html`, `venues.html`, `about.html`, `contact.html`, `book/venue.html`)
  - `book/rooms.html` (cloned static route shell from `book/venue.html` so `/book/rooms` links never 404 in Runs 1–5; full build in Run 5)
  - `refunds.html` (cloned static route shell from `terms.html` so legal links never 404 in Runs 1–5; full build in Run 6)
  - `service-delivery.html` (cloned static route shell from `terms.html` so legal links never 404 in Runs 1–5; full build in Run 6)
  - `vercel.json` & `server.mjs` (ensuring rewrites for all static routes and `/favicon.svg`)
  - `scripts/audit-viewports.mjs` (auditing against `node server.mjs` on port `3003`)
- **Do Not Touch:**
  - Interactive booking widget internals, raw media files in `images/` or `fonts/`.

### Step-by-Step Instructions (`AGENT_BUILDER_1`)

1. **Create Verified Property, Sample Tariff & Legal Data Files (`src/data/*`):**
   - Create `src/data/siteConfig.ts` with verified estate metadata:
     - `name`: `'The Grand Lucknow'`
     - `address`: `'22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301'` (PIN `226301` verified on official site; confirm `226301` vs `226302` with client before go-live).
     - `phones`: `['0522-2970015', '+91 91291 27091']`
     - `whatsappNumber`: `'919129127091'`
     - `email`: `'Thegrandbanquet07@gmail.com'`
     - `totalRooms`: `64`, `doubleRooms`: `56`, `familySuites`: `8`
     - `services`: `['Wedding', 'Destination Wedding', 'Rooms', 'Decoration', 'Catering', 'Event Planning']`
     - `SHOW_UNCONFIRMED_FACTS`: `false` (Strictly hides unverified claims like `500+ vehicles`, `4.9/5 Google`, `500+ celebrations`, `2 bridal green rooms`, `100% DG backup`, and per-room guest caps unless toggled `true`).
     - `SHOW_REVIEWS`: `false` (Defaults to `false` so no unverified testimonials ship; only set to `true` once real client-approved reviews are populated).
     - `analyticsProviders`: `[] as string[]` (Populated only with scripts actually configured in environment variables, e.g. `[]` when no third-party trackers are loaded).
   - Create `src/data/venueFacts.ts` with the 5 verified venues (and ensure all gallery `src` paths are clean static paths like `/images/...webp` with **zero** `&scale-down-to=` query suffixes):
     - `open-earth-lawn`: `Open Earth Lawn` | `Lawn` | `55,000` sqft (two phases combined) | `1,000 - 1,500` guests | Tags: `['Open Air Setting', 'Premium Lighting', 'Grand Celebrations']`
     - `grassland-gala`: `Grassland Gala` | `Lawn` | `20,000` sqft | `500 - 800` guests | Tags: `['Manicured Lawns', 'Garden Lighting', 'Medium Events']`
     - `garden-galaxy`: `Garden Galaxy` | `Lawn` | `15,000` sqft | `250 - 300` guests | Tags: `['Intimate Setting', 'Garden Ambiance', 'Private Events']`
     - `the-grand-courtyard`: `The Grand Courtyard` | `Lawn` | `15,000` sqft | `200 - 250` guests | Tags: `['Traditional Setting', 'Haldi & Mehndi Ceremony Space']`
     - `the-royal-legacy-banquet`: `The Royal Legacy Banquet` | `Indoor Banquet` | `10,000` sqft | `500 - 600` guests | Tags: `['Climate Controlled', 'Premium Interiors', 'Full Service']` (Fix grammar in description: use `"Lucknow's premier address"`, never `"Lucknow premier address"`).
   - Create `src/data/pricingConfig.ts` centralizing all sample tariffs and tax flags:
     - `PRICING_CONFIRMED`: `false`
     - `TAX_RATE_CONFIRMED`: `false`
     - `tariffLabel`: `'Sample tariff'`
     - `venueDailySampleTariffINR`: `{ 'open-earth-lawn': 350000, 'grassland-gala': 225000, 'the-royal-legacy-banquet': 185000, 'garden-galaxy': 125000, 'the-grand-courtyard': 95000 }`
     - `venueTokenAdvanceINR`: `25000`
     - `venueSampleGstRate`: `0.18` (Labeled in UI as `"18% sample GST — subject to CA/SAC confirmation"` while `TAX_RATE_CONFIRMED === false`).
   - Create `src/data/roomsConfig.ts` centralizing room inventory, gated occupancy assumptions, and slab-based GST:
     - `double-occupancy`: `'Double Occupancy Room'`, `count: 56`, `sampleMaxGuests: 2`, `occupancyConfirmed: false`, `sampleNightlyTariffINR: 6500`
     - `family-suite`: `'Luxury Family Suite'`, `count: 8`, `sampleMaxGuests: 4`, `occupancyConfirmed: false`, `sampleNightlyTariffINR: 14000`
     - `totalSampleRoomCapacity`: `144` (`56 * 2 + 8 * 4 = 144` guests across all 64 rooms; guest stepper on `/book/rooms` caps at `144`, never `160`).
     - Export helper:
       ```ts
       export const getRoomGstRate = (nightlyTariffINR: number): number =>
         nightlyTariffINR <= 1000 ? 0 : nightlyTariffINR <= 7500 ? 0.05 : 0.18;
       ```
   - Create `src/data/legalConfig.ts` centralizing all merchant KYC entities, refund schedules, and fulfillment SLAs so the AI never invents binding customer commitments:
     ```ts
     export const LEGAL_CONFIG = {
       LEGAL_REVIEW_PENDING: true, // Must be set to false after client & CA sign-off before live launch
       legalEntityName: '[CLIENT TO CONFIRM: Registered Legal Entity / Proprietorship / Pvt Ltd Name]',
       gstin: '[CLIENT TO CONFIRM: 15-Digit Uttar Pradesh GSTIN]',
       pan: '[CLIENT TO CONFIRM: Entity PAN]',
       jurisdictionCity: 'Lucknow, Uttar Pradesh',
       refundPolicy: {
         isSampleTemplate: true,
         venueAdvanceClause: '[CLIENT TO CONFIRM: Venue token advance refund & rescheduling schedule per signed event contract]',
         roomCancellationClause: '[CLIENT TO CONFIRM: Free cancellation window & no-show retention terms]',
         blackoutWindowClause: '[CLIENT TO CONFIRM: Peak wedding season / auspicious muhurat blackout terms]',
         refundProcessingTimeline: '[CLIENT TO CONFIRM: e.g., 5–7 working days to original payment source via Razorpay]',
       },
       serviceDeliveryPolicy: {
         isSampleTemplate: true,
         holdConfirmationSla: '[CLIENT TO CONFIRM: Concierge verification & written booking confirmation SLA]',
         venueHandoverClause: '[CLIENT TO CONFIRM: Event lawn/banquet possession & setup window prior to function]',
         roomCheckInOutClause: '[CLIENT TO CONFIRM: Standard estate front-desk check-in and check-out times]',
       },
     };
     ```
   - **Verify:** Run `tsc --noEmit`; all five data files compile with zero errors.

2. **Sanitize Static `<head>`, Square SVG Favicon & Remove Unlisted Trackers:**
   - Create a crisp 1:1 square monogram icon at repository root `/favicon.svg` (`#14120E` background, `#F5EEDB` serif `TG` monogram). **NEVER create `public/favicon.svg`**.
   - In `tools/apply_run1_foundation.mjs`, sanitize the `<head>` of all `.html` files programmatically:
     - Replace broken photograph `<link rel="icon" href="/images/hero_bg.webp">` with `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`.
     - Remove any hardcoded third-party tracking scripts (such as unconfigured Google Tag Manager or Meta Pixel snippets) from all static `.html` files unless their IDs are explicitly provided via environment variables and listed in `siteConfig.analyticsProviders`.
     - Configure `vercel.json` and `server.mjs` to serve `/favicon.svg` directly from repo root and rewrite `/public/favicon.svg` -> `/favicon.svg` for backwards compatibility.
   - **Verify:** Inspect `<head>` across `index.html` and `venues.html`; `favicon.svg` is linked and zero unauthorized third-party tracker scripts execute.

3. **Commit Deterministic Playwright Audit Script With Lenis/Framer Settle Wait (`scripts/audit-viewports.mjs`):**
   - Create `scripts/audit-viewports.mjs` and register `"audit:viewports": "node scripts/audit-viewports.mjs"` in `package.json`.
   - The script must audit against the local static server (`node server.mjs` on port `3003`) across all 6 viewports (`375x812`, `390x844`, `430x932`, `768x1024`, `820x1180`, `1440x900`) and 5 scroll positions (`0%`, `25%`, `50%`, `75%`, `100%`):
     - At each scroll stop, scroll via `window.scrollTo({ top: targetY, behavior: 'instant' })`, trigger `window.dispatchEvent(new Event('scroll'))`, and **wait `450ms`** (`await page.waitForTimeout(450)`) so Lenis (`lerp: 0.1`) and Framer SSR motion settle completely before DOM inspection and screenshot capture.
     - Assert `document.documentElement.scrollWidth <= window.innerWidth` (zero horizontal overflow).
     - Assert `document.querySelector('[data-framer-root]') !== null` (verifying Framer root integrity).
     - Assert `document.querySelectorAll('header').length === 1`.
     - Assert `<header>` wordmark and `Menu` button (on `< 1024px`) have `visibility !== 'hidden'`, `opacity >= 0.8`, and non-zero bounding rect at every scroll stop.
     - Assert zero `<img>` elements have malformed `&scale-down-to=` substrings in `src` or `srcset`, and all visible `<img>` elements have `complete === true` and `naturalWidth > 0`.
     - Assert surface contrast integrity: for every visible `[data-surface]` container, verify computed `backgroundColor` matches its token (`dark` = `rgb(20, 18, 14)`, `light` = `rgb(245, 238, 219)` / `rgb(255, 240, 202)`, `sand-muted` = `rgb(234, 224, 200)`, `terracotta` = `rgb(196, 99, 53)` / `rgb(194, 101, 58)`, `terracotta-card` = `rgb(184, 93, 59)`), and verify no visible text descendant (excluding `.word` scrub spans mid-scroll and elements over `<video>`/gradient scrims) has a computed `color` matching its enclosing `[data-surface]` `backgroundColor` or `opacity < 0.95` at rest.
     - Assert interactive tap targets on `< 1024px` have `height >= 44` or `width >= 44`.
     - Save screenshots to `.audit-screenshots/run-{N}/{viewport}-{scrollPct}.png` and print the Markdown Pass/Fail table.
   - **Verify:** Run `node --check scripts/audit-viewports.mjs`; script parses with zero syntax errors.

4. **Create Zero-404 Route Stubs (`book/rooms.html`, `refunds.html`, `service-delivery.html`) & Vercel/Server Routing:**
   - Clone clean route shells using existing static Framer HTML templates:
     - Clone `book/rooms.html` from `book/venue.html` so `/book/rooms` links never 404 in Runs 1–5.
     - Clone `refunds.html` and `service-delivery.html` from `terms.html` so footer/legal links never 404 in Runs 1–5.
   - Update `vercel.json` and `server.mjs` to include clean rewrites for `/book/rooms`, `/refunds`, `/service-delivery`, ensuring every route resolves with `HTTP 200`.
   - **Verify:** Test with `curl -I http://localhost:3003/book/rooms`, `/refunds`, `/service-delivery`; all return `200 OK`.

5. **Root-Cause Surface Theme CSS & Rogue Opacity Purge (`tools/apply_run1_foundation.mjs` / `src/styles/globals.css`):**
   - Inject the unified `<style id="grand-palette">` tag right before `</body>` across all `.html` files:
     - `[data-surface="dark"] { --bg: #14120E; --fg: #F5EEDB; --fg-muted: #B5AEA0; background-color: var(--bg); color: var(--fg); }`
     - `[data-surface="light"] { --bg: #F5EEDB; --fg: #14120E; --fg-muted: #5C564B; background-color: var(--bg); color: var(--fg); }`
     - `[data-surface="sand-muted"] { --bg: #EAE0C8; --fg: #14120E; --fg-muted: #5C564B; background-color: var(--bg); color: var(--fg); }`
     - `[data-surface="taupe"] { --bg: #6E6853; --fg: #F5EEDB; --fg-muted: #EAE0C8; background-color: var(--bg); color: var(--fg); }`
     - `[data-surface="terracotta"] { --bg: #C46335; --fg: #F5EEDB; --fg-muted: #EAE0C8; background-color: var(--bg); color: var(--fg); }`
     - `[data-surface="terracotta-card"] { --bg: #B85D3B; --fg: #F5EEDB; --fg-muted: #EAE0C8; background-color: var(--bg); color: var(--fg); }`
   - Programmatically purge every scroll-linked opacity rule that drops static text below `1` at rest (except the word-scrub in `Manifesto` and preloader fades). All static typography inherits `color: var(--fg); opacity: 1`.
   - **Verify:** Confirm no text element at rest on any route has computed `opacity < 1`.

6. **Initialize Single Lenis Scroll Engine (`src/lib/scroll.ts`):**
   - Configure a single global Lenis instance synced to the Framer SSR scroll ticker. Expose `stopScroll()` and `startScroll()` for drawers.
   - **Verify:** Scrolling any route updates with zero console errors.

7. **Deduplicate Header & Enforce Pointer-Events Pass-Through in Static HTML:**
   - Via `tools/apply_run1_foundation.mjs`, remove any duplicate `<header>` tags or ghost wordmark nodes across all static `.html` files.
   - Set `<header>` container to `pointer-events: none;` and its interactive children (Wordmark link, nav links, `Menu`/`Close` button, `Book Now` pill) to `pointer-events: auto;` so `document.elementFromPoint` never hits the header container itself.
   - **Phone (`375px–809px`) & Tablet (`810px–1023px`) Behavior:**
     - Mount the `Menu` / `Close` pill button (`min-height: 44px; min-width: 68px;`) at `position: fixed; top: 16px; right: 20px; z-index: 70;` on **all** routes including `/`.
     - Mount/dock the `THE GRAND` wordmark at `position: fixed; top: 18px; left: 20px; z-index: 70;` once `scrollY > 80px` (or after hero expansion on `/`). Never dock `THE GRAND` to the top-right edge.
   - **Laptop (`>= 1024px`) Behavior:**
     - Render `THE GRAND` at `left: 32px`, centered nav links (`Venues`, `Stay`, `About`, `Contact`), and `Book Now ↗` pill at `right: 32px`.
   - **Verify:** Inspect DOM at `375px`, `820px`, and `1440px`; exactly one `<header>` exists, `pointer-events: none` is set on `<header>`, and `Menu` is visible top-right on Phone and Tablet.

8. **Build Bulletproof Surface Theme Sampler & Logo Contrast Sync (`src/lib/useSurfaceTheme.ts` & `updateLogoColorClass`):**
   - Because `<header>` has `pointer-events: none`, sample `document.elementFromPoint(window.innerWidth / 2, 36)?.closest('[data-surface]')` inside a `requestAnimationFrame`-throttled scroll listener and sync theme classes onto `<html>` and `<body>`:
     - Over `dark` (`#14120E`): Wordmark = `#F5EEDB`; `Menu` pill = `background: rgba(245, 238, 219, 0.14); color: #F5EEDB; border: 1px solid rgba(245, 238, 219, 0.26); backdrop-filter: blur(8px);`.
     - Over `light`, `sand-muted`, `taupe`, or `terracotta`: Wordmark = `#14120E`; `Menu` pill = `background: #EAE0C8; color: #14120E; border: 1px solid rgba(20, 18, 14, 0.15);`.
   - Ensure `updateLogoColorClass()` contains an explicit `var determined = false;` flag so a detected dark layer (`lum < 110`) is **not** overwritten by the `document.body` (`#FFF0CA`) fallback.
   - Both `html.logo-dark-text` (`data-logo-theme="dark"`) AND `document.body.classList.toggle('is-light-theme', isLight)` must always stay synced.
   - **Verify:** Scroll across dark and light sections on `/`, `/about`, and `/venues`; wordmark and `Menu` pill invert contrast immediately.

9. **Fix Context-Aware Mobile Menu Drawer & Character-Roll Clipping:**
   - **Phone (`375px–809px`) & Tablet (`810px–1023px`) Behavior:**
     - Freeze the surface theme at the moment `Menu` is tapped: light sections open a solid `#F5EEDB` (`opacity: 1; z-index: 65`) drawer with `#14120E` charcoal links; dark sections open a solid `#14120E` (`opacity: 1; z-index: 65`) drawer with `#F5EEDB` cream links.
     - Render all 5 links unconditionally on every route: `Venues` (`/venues`), `Stay` (`/book/rooms`), `About` (`/about`), `Contact` (`/contact`), and `Book Now` (`/book/venue`).
     - Keep overlay `opacity: 1` during close until the `150ms` link exit stagger completes.
     - Set the `Menu` / `Close` button inner text-roll wrapper to `height: 1.25em; line-height: 1.25; overflow: hidden; display: inline-flex; align-items: center;` so `"Close"` never slices vertically.
     - Lock scroll (`document.body.style.overflow = 'hidden'`; `stopScroll()`) when open and restore on close.
   - **Verify:** Toggle menu 5x rapidly on `/` and `/about`; zero text clipping, zero background bleed-through.

10. **Centralize Scroll-to-Top Button Visibility:**
    - Hide the floating circular `^` scroll-to-top button (`opacity: 0; pointer-events: none;`) whenever `isMenuOpen === true` OR `isStickyCtaVisible === true`.
    - **Verify:** Open mobile menu; `^` button is hidden.

### Run-End Verification Block (Run 1 — Executed by `AGENT_AUDITOR_1` in Fresh Session)
Test at these viewports: Phone `375x812`, `390x844`, `430x932`; Tablet `768x1024` and `820x1180`; Laptop `1440x900`.
For each viewport:
1. Run `tsc --noEmit` and `npm run audit:viewports -- --run=1` (auditing against `node server.mjs` on port `3003`) with zero errors. Verify `data-framer-root !== null` and zero 404s across all header/menu links and route stubs (`/book/rooms`, `/imprint`, `/terms`, `/privacy`, `/refunds`, `/service-delivery`).
2. Capture full-page screenshots at scroll positions 0%, 25%, 50%, 75%, 100% of every page touched (waiting `450ms` after each scroll jump).
3. Check: no horizontal scroll; all text readable (no cream-on-cream or dark-on-dark); header, menu and wordmark visible on every section; no overlapping fixed elements (`^` button, sticky CTA, menu); nothing clipped.
4. Check interactions: menu open/close, hover states (laptop only), touch targets at least 44px (phone/tablet).
5. Output a pass/fail table: `Check | Phone | Tablet | Laptop | Notes`.
*Rollback rule: if any check fails, fix before starting Run 2.*

---

## RUN 2: HOMEPAGE (`index.html`) — IN-PLACE PRELOADER, HERO, EDITORIAL, CARDS, REVIEWS & LOCATION MAP
**Assigned Agents:** `AGENT_BUILDER_2` (Session A) → `AGENT_AUDITOR_2` (Session B)  
**Prerequisite:** All Run 1 Pass/Fail checks are `PASS`  
**Objective:** In-place refinement of `index.html` via `tools/apply_run2_home.mjs` preserving Casa Momo's Framer SSR structure, `data-framer-root`, and classes: implement the 5-stage pill-arch preloader, hero contrast scrim, malformed `srcset` cleanup, hanging-indent word scrubs, arch SVG montage with peripheral image lanes, Philosophy cards, gated Reviews ticker, verified Trust bar, and Location Section map on `index.html`.

- **Files to Create / Modify:**
  - `index.html` (refined in-place via `tools/apply_run2_home.mjs`)
  - `tools/apply_run2_home.mjs`
- **Do Not Touch:**
  - `venues.html`, `venues/*.html`, `book/*.html`, `about.html`, `contact.html`, `imprint.html`, `terms.html`, `privacy.html`.

### Step-by-Step Instructions (`AGENT_BUILDER_2`)

1. **Build 5-Stage Preloader & Hero Pill-Arch Expansion in `index.html` via `tools/apply_run2_home.mjs`:**
   - Reference mechanics: `https://casamomo.at/` opening sequence.
   - **Stage 1 (`0ms–500ms`):** Render `THE` and `GRAND` dead-center on a single horizontal baseline (`display: flex; align-items: baseline; justify-content: center; gap: 0.35em;`).
   - **Stage 2 (`500ms–900ms`):** Translate `THE` up-left (`translate(-14px, -16px)`) and `GRAND` down-right (`translate(14px, 16px)`); fade in top-right `Menu` button (Phone/Tablet) or top nav (Laptop).
   - **Stage 3 (`900ms–1350ms`):** Reveal hero media inside a centered stadium pill mask (`130px x 280px` on Phone; `160px x 340px` on Tablet; `220px x 420px` on Laptop; `border-radius: 999px`) expanding (`cubic-bezier(0.22, 1, 0.36, 1)`) through a framed arch (`width: calc(100vw - 24px); height: calc(100dvh - 24px); margin: 12px auto; border-radius: 40px 40px 0 0`) while `THE` moves to `top: 20px; left: 20px` and `GRAND` moves to `bottom: 24px; right: 20px`.
   - **Stage 4 (`1350ms–1700ms`):** Expand smoothly to full-bleed `100vw x 100dvh; border-radius: 0px; margin: 0;`.
   - **Reload Safeguard:** If `window.scrollY > 0` on load, skip Stages 1–3 and immediately render Stage 4 with `THE GRAND` docked top-left.
   - **Verify:** Test fresh load at `scrollY = 0` and reload at `scrollY = 400`; hero never sticks at 85% width.

2. **Add Hero Video Poster, Clean Alt Text & Bottom Scrim in `index.html`:**
   - Set `<video poster="/images/hero_bg.webp" preload="metadata" playsInline muted loop autoPlay aria-label="Cinematic film of The Grand Lucknow luxury event estate: expansive manicured lawns, grand Awadhi architecture, and illuminated wedding pavilions" />`.
   - Add a bottom-up dark gradient scrim (`linear-gradient(to top, rgba(20,18,14,0.85) 0%, rgba(20,18,14,0.35) 45%, transparent 100%)`) behind `"Premier Luxury Event Estate in Lucknow"` and `Inquire Now ↗`.
   - **Verify:** Subtitle and button contrast ratio exceeds `7:1` across Phone, Tablet, and Laptop.

3. **Format Editorial Manifesto Blocks With Hanging Indents & Word Scrub:**
   - Format `"Between timeless elegance..."` and `"We believe every celebration..."` as left-aligned blocks with a first-line hanging indent:
     `text-align: left; text-indent: 2.2em; font-size: clamp(2rem, 8.2vw, 4.25rem); line-height: 1.08; letter-spacing: -0.02em;`
   - **Phone:** `padding: 72px 20px;`. **Tablet:** `padding: 96px 40px;`. **Laptop:** `padding: 128px 64px; max-width: 1100px; margin: 0 auto;`.
   - Scrub each word's `opacity` from `0.22` to `1.0` via Framer/GSAP scroll ticker.
   - **Verify:** Words scrub smoothly to `opacity: 1` as each manifesto passes center screen.

4. **Purge Malformed `&scale-down-to=` Image `srcset` Strings & Implement Rounded-Arch Feature Image Scrub:**
   - Programmatically remove any malformed `&scale-down-to=` query strings appended to local static image paths (e.g., `/images/hero_bg.webp&scale-down-to=320`), replacing them with clean `/images/...webp` paths.
   - Scrub `border-top-left-radius` and `border-top-right-radius` on Feature Image from `28px` to `0px` as the image reaches viewport center.
   - Render bottom-right dual frosted pills (`bottom: 12px; right: 12px; background: rgba(20,18,14,0.82); backdrop-filter: blur(6px); color: #F5EEDB; font-size: 12px; padding: 6px 12px; border-radius: 6px;`) using verified tags from `venueFacts.ts`.
   - **Verify:** Grep `index.html` for `scale-down-to`; zero matches remain, and feature image corners animate smoothly.

5. **Fix Venue Cards Single-Row Spec Pills & Eliminate Badge Clipping:**
   - Below each venue image, render a single flex row: Venue Title on left (`white-space: normal` on Phone `< 430px` so long titles wrap to 2 lines cleanly) and verified spec pills on right (`[ ⛶ {sqft} sqft ] [ 🧍 {minGuests}–{maxGuests} ]`, `flex-shrink: 0; white-space: nowrap;`).
   - **Phone:** 1-column stack (`padding: 0 20px`). **Tablet:** 2-column grid (`gap: 24px; padding: 0 32px`). **Laptop:** 2-column editorial layout (`padding: 0 64px`).
   - **Verify:** *The Royal Legacy Banquet* card at `375px` displays `10,000 sqft` in full without clipping.

6. **Build `"Celebrate Life. Royally."` Montage With Scroll-Drawn Arch SVG & Outer Lanes:**
   - Pin `"Celebrate Life. Royally."` at `position: sticky; top: 45vh; z-index: 20; text-align: center; pointer-events: none;` with a radial dark backdrop (`radial-gradient(circle, rgba(20,18,14,0.68) 0%, transparent 70%)`).
   - Behind the text (`z-index: 2`), scrub the 1px double-lined arch SVG (`strokeDashoffset: 1 -> 0`, `scale: 0.7 -> 1.65`).
   - Restrict floating thumbnails (`z-index: 8`) to 4 outer lanes (`left: 4%`, `left: 16%`, `right: 16%`, `right: 4%`; `max-width: 105px` Phone, `140px` Tablet, `180px` Laptop) outside the central `30%–70%` text zone.
   - **Verify:** No floating image overlaps `"Celebrate Life. Royally."` at any scroll position.

7. **Synchronize Surface Interpolation & Fix `"Our Philosophy"` Cards:**
   - Drive the `#14120E` -> `#6E6853` -> `#F5EEDB` background interpolation and `--fg` text color inversion from a single scroll progress value.
   - Render Card 1 (`1 — Design`, `data-surface="dark"`), Card 2 (`2 — Warmth`, `data-surface="terracotta-card"`), and Card 3 (`3 — Elegance`, `data-surface="sand-muted"`) at `opacity: 1`.
   - **Phone:** 1-column stack. **Tablet:** Centered vertical stack (`max-width: 680px`). **Laptop:** 3-column row.
   - **Verify:** Card 1, Card 2, and Card 3 text and 1px SVG icons render at `opacity: 1` with high contrast.

8. **Gate Reviews Ticker & Render Verified 3-Column Trust Metrics:**
   - Render Reviews Ticker **only** when `siteConfig.SHOW_REVIEWS === true` (defaults to `false` until client supplies real reviews). When enabled, all review text renders at `color: #14120E; opacity: 1`.
   - Render Trust Metrics using 100% verified estate metrics:
     - **`5 Venues`** (`Lawns & Indoor Banquet`) | **`64 Guest Rooms`** (`56 Double · 8 Family Suites`) | **`Up to 1,500`** (`Guest Capacity`)
   - **Phone:** 3-column grid (`padding: 40px 16px`). **Tablet & Laptop:** 3-column grid (`padding: 56px 40px`).
   - **Verify:** With `SHOW_REVIEWS = false`, no invented testimonials render and the verified 3-column Trust Bar displays cleanly.

9. **Fix Location Section Map POI Collision & Address Overflow:**
   - Suppress default Google Maps POI labels (`featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }]`) so adjacent landmarks never collide behind `The Grand Lucknow`.
   - Constrain `22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301` inside `max-width: 100%; width: 100%; padding-inline: 20px; box-sizing: border-box; overflow-wrap: break-word;` so map zoom/pan never overflows horizontally on `index.html` or venue subpages.
   - **Verify:** Pan/zoom map on `index.html` at `375px` and `820px`; zero horizontal scroll.

### Run-End Verification Block (Run 2 — Executed by `AGENT_AUDITOR_2` in Fresh Session)
Test at these viewports: Phone `375x812`, `390x844`, `430x932`; Tablet `768x1024` and `820x1180`; Laptop `1440x900`.
For each viewport:
1. Run `npm run audit:viewports -- --run=2` (auditing against `node server.mjs` on port `3003`) with zero errors. Verify `data-framer-root !== null`.
2. Capture full-page screenshots at scroll positions 0%, 25%, 50%, 75%, 100% of `index.html` (waiting `450ms` after each scroll jump).
3. Check: no horizontal scroll; all text readable (no cream-on-cream or dark-on-dark); header, menu and wordmark visible on every section; no overlapping fixed elements; nothing clipped.
4. Check interactions: preloader stages, hover states (laptop only), touch targets at least 44px (phone/tablet).
5. Confirm Run 1 checks still pass (regression screenshots).
6. Output a pass/fail table: `Check | Phone | Tablet | Laptop | Notes`.
*Rollback rule: if any check fails, fix before starting Run 3.*

---

## RUN 3: VENUES INDEX (`venues.html`) & VENUE DETAIL PAGES (`venues/*.html`)
**Assigned Agents:** `AGENT_BUILDER_3` (Session A) → `AGENT_AUDITOR_3` (Session B)  
**Prerequisite:** All Run 2 Pass/Fail checks are `PASS`  
**Objective:** In-place refinement of `venues.html` and the 5 verified venue subpages (`venues/open-earth-lawn.html`, `venues/grassland-gala.html`, `venues/garden-galaxy.html`, `venues/the-grand-courtyard.html`, `venues/the-royal-legacy-banquet.html`) via `tools/apply_run3_venues.mjs` with a sticky center title, alternating zig-zag photo gallery, verified photo captions, gated features table, cross-sell section, and non-overlapping sticky availability bar.

- **Files to Create / Modify:**
  - `venues.html`
  - `venues/open-earth-lawn.html`
  - `venues/grassland-gala.html`
  - `venues/garden-galaxy.html`
  - `venues/the-grand-courtyard.html`
  - `venues/the-royal-legacy-banquet.html`
  - `tools/apply_run3_venues.mjs`
- **Do Not Touch:**
  - `index.html`, `book/*.html`, `about.html`, `contact.html`, legal pages.

### Step-by-Step Instructions (`AGENT_BUILDER_3`)

1. **Fix `venues.html` Index Eager Image Loading & Bottom Sections:**
   - In `tools/apply_run3_venues.mjs`, set `loading="eager"` on the first 2 venue cards with a `#1C1915` shimmer placeholder so no black boxes appear on load.
   - **Phone:** 1-column stack (`padding: 0 20px`). **Tablet:** 2-column grid (`gap: 24px; padding: 0 32px`). **Laptop:** 2-column editorial grid (`padding: 0 64px`).
   - Below the 5th venue card, append Reviews Ticker (gated by `SHOW_REVIEWS`), Trust Metrics, and Location Section before the footer.
   - **Verify:** Load `venues.html` across Phone, Tablet, and Laptop; zero black image blanks appear.

2. **Pin Center Venue Title & `[↓] [Scroll to Explore]` Over Dark Gallery:**
   - Keep `[ ↓ ] [ Scroll to Explore ]` and the Venue Title pinned dead-center (`position: sticky; top: 43vh; z-index: 10; text-align: center; pointer-events: none;`) inside the dark `[data-surface="dark"]` gallery wrapper until the last gallery photo passes.
   - **Verify:** Scroll `venues/open-earth-lawn.html`; title remains pinned in the viewport center throughout the gallery sequence.

3. **Build Alternating Left/Right Gallery With Distinct Photos & Verified Captions:**
   - Render only the distinct images present in each venue's verified facts (never repeat one photo 6 times; counter reads `n / N` where `N` is the real count of distinct photos).
   - **Phone:** `74%` width alternating left/right. **Tablet:** `64%` width alternating left/right. **Laptop:** `52%` width alternating left/right.
   - Below each photo, render a flex row (`font-size: 12px; color: #F5EEDB; padding-top: 8px;`) with `venue.gallery[i].label` on the left and `n / N` on the right.
   - **Verify:** Inspect all 5 venue subpages; zero duplicate images appear in any gallery.

4. **Build Gated Features Table:**
   - Render the 6 verified rows unconditionally: `1. Venue Area`, `2. Guest Capacity`, `3. Venue Type`, `4. Setting & Highlights`, `5. On-Site Accommodation (64 Guest Rooms: 56 Double, 8 Suites)`, `6. Event Services (Wedding, Destination Wedding, Decoration, Catering & Event Planning)`.
   - Render rows `7. Parking & Valet`, `8. Bridal & VIP Suites`, `9. Power & Acoustics`, `10. Wi-Fi & Concierge` **only** when `siteConfig.SHOW_UNCONFIRMED_FACTS === true`.
   - **Phone:** Single column (`padding: 0 20px`). **Tablet:** `padding: 0 40px`). **Laptop:** 2-column split alongside description.
   - **Verify:** Confirm only the 6 verified rows render when `SHOW_UNCONFIRMED_FACTS = false`.

5. **Fix `"Other Venues to Explore"` Heading & Cross-Sell Card Titles:**
   - Render **`Other Venues to Explore`** (`font-size: clamp(2rem, 8vw, 3.5rem); color: var(--fg);`) above `[All Venues ↗]`.
   - Ensure cross-sell cards inside `[data-surface="light"]` render titles in crisp `#14120E` (`color: var(--fg)` + `// FALLBACK color: #14120E`).
   - **Verify:** Cross-sell venue titles are 100% readable dark charcoal on light sand.

6. **Mount Sticky Availability Bar & Suppress `^` Button:**
   - Render fixed bottom bar (`bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 40;`) with **`Check Availability ↗`** (`/book/venue?venue={venue.slug}`) and **`Need rooms for your guests?`** (`/book/rooms?fromVenue={venue.slug}`).
   - Set `isStickyCtaVisible = true` so the floating `^` scroll-top button stays hidden on venue detail pages.
   - **Verify:** `Check Availability ↗` is never overlapped by the `^` button at any scroll position.

### Run-End Verification Block (Run 3 — Executed by `AGENT_AUDITOR_3` in Fresh Session)
Test at these viewports: Phone `375x812`, `390x844`, `430x932`; Tablet `768x1024` and `820x1180`; Laptop `1440x900`.
For each viewport:
1. Run `npm run audit:viewports -- --run=3` (auditing against `node server.mjs` on port `3003`) with zero errors. Verify `data-framer-root !== null`.
2. Capture full-page screenshots at scroll positions 0%, 25%, 50%, 75%, 100% of `venues.html` and all 5 venue detail pages (waiting `450ms` after each scroll jump).
3. Check: no horizontal scroll; all text readable; header, menu and wordmark visible on every section; no overlapping fixed elements; nothing clipped.
4. Check interactions: gallery scroll, sticky CTA links, touch targets >= 44px.
5. Confirm Runs 1–2 still pass (regression screenshots).
6. Output a pass/fail table: `Check | Phone | Tablet | Laptop | Notes`.
*Rollback rule: if any check fails, fix before starting Run 4.*

---

## RUN 4: `/book/venue` BOOKING FLOW (`book/venue.html`) + `paymentConfig` ADAPTER (CASAMOMO INLINE DRAWER MECHANICS)
**Assigned Agents:** `AGENT_BUILDER_4` (Session A) → `AGENT_AUDITOR_4` (Session B)  
**Prerequisite:** All Run 3 Pass/Fail checks are `PASS`  
**Objective:** In-place interactive 5-step Venue Configurator inside `book/venue.html` + `src/lib/priceEngine.ts` + `src/lib/paymentConfig.ts` + `tools/apply_run4_configurator.mjs` replicating `casamomo.at/book` 1:1—single-month mobile/tablet calendar using strict `YYYY-MM-DD` strings, `50–1,500` guest stepper drawer, inline card photo carousels, high-contrast availability/sample-tariff states, and an inline expandable booking drawer wired to `paymentConfig.ts`.  
*Note:* Keep venue configurator strictly inside `book/venue.html` using `pricingConfig` + vanilla JS/TS bundle compiled/injected without altering Framer shell outside the booking mount.

- **Files to Create / Modify:**
  - `book/venue.html`
  - `src/lib/paymentConfig.ts`
  - `src/lib/priceEngine.ts`
  - `tools/apply_run4_configurator.mjs`
- **Do Not Touch:**
  - `index.html`, `venues.html`, `venues/*.html`, `about.html`, `contact.html`, legal pages.

### Step-by-Step Instructions (`AGENT_BUILDER_4`)

1. **Create Payment Adapter With Automatic Concierge Fallback & Razorpay Script Loader (`src/lib/paymentConfig.ts`):**
   - Export `PAYMENT_CONFIG` with automatic runtime fallback: if `NEXT_PUBLIC_PAYMENT_MODE === 'RAZORPAY'` but `NEXT_PUBLIC_RAZORPAY_KEY_ID` is empty or missing, `getEffectivePaymentMode()` automatically returns `'CONCIERGE_HOLD'` and logs a non-fatal warning so checkout never crashes.
   - Export `loadRazorpayCheckoutScript(): Promise<boolean>` which dynamically injects `<script src="https://checkout.razorpay.com/v1/checkout.js" async />` on demand and resolves `true` when `window.Razorpay` is available (or `false` on network failure, triggering fallback to `CONCIERGE_HOLD`).
   - **Verify:** Test with `NEXT_PUBLIC_PAYMENT_MODE=RAZORPAY` and empty key; `getEffectivePaymentMode()` returns `'CONCIERGE_HOLD'`.

2. **In-Place Venue Configurator Mount & Dynamic Heading in `book/venue.html`:**
   - Reference mechanics: `https://casamomo.at/book` vs `https://casamomo.at/book?apartment=boutique-1`.
   - Via `tools/apply_run4_configurator.mjs`, inject the interactive venue configurator into the designated container of `book/venue.html`.
   - Read `venue` query param on load:
     - Without `?venue=`, render heading **`Book Your Venue`**.
     - With `?venue={slug}`, render heading **`Check Availability`**, pin that venue at the top, and render a divider + **`All venues are shown below`** above the remaining 4 venues.
   - Include a cross-link banner to `/book/rooms`: **`Need overnight rooms for wedding guests? Book from our 64 on-site rooms →`**.
   - **Verify:** Test `/book/venue` and `/book/venue?venue=open-earth-lawn` in browser.

3. **Single-Month Mobile/Tablet DatePicker With Timezone-Safe `YYYY-MM-DD` Strings:**
   - **Phone (`375px–809px`) & Tablet (`810px–1023px`) Behavior:** Render **1 single full-width month** (`← November 2026 →`)—fixing the clipped `December 20[white box]` bug.
   - **Laptop (`>= 1024px`) Behavior:** Render 2 months side-by-side (`min-width: 680px`).
   - Store and emit selected dates strictly as local `YYYY-MM-DD` strings (`"2026-11-14"`), never `.toISOString()`. Allow selecting the same start and end date (`2026-11-14` to `2026-11-14` = `1 day` event) or multi-day ranges (`dayCount = diffDays(startDate, endDate) + 1`).
   - Below the calendar grid, render status pills: **`Choose your event start date`** (terracotta `#C46335`) -> **`Now choose your end date`** + **`Single-day or multi-day event`** + **`64 guest rooms available`**.
   - **Verify:** Open calendar at `375px`, `768px`, `820px`, and `1440px`; zero clipping and selected dates serialize as `YYYY-MM-DD`.

4. **Interactive Guest Capacity (`50–1,500`) & Room Stepper Drawer:**
   - Tapping `GUESTS` toggles a bordered inline drawer (`#1C1915` bg, `1px solid rgba(245,238,219,0.22)`) with:
     - **Expected Guests:** `-` / `+` stepper (`44px x 44px`, range `50` to `1,500` in steps of `50`) + preset pills **`200`**, **`300`**, **`600`**, **`800`**, **`1,500`**.
     - **On-Site Guest Rooms Needed:** `-` / `+` stepper (`0` to `64`).
     - Full-width cream **`Search ↗`** button.
   - **Verify:** Steppers and preset pills update state cleanly on Phone, Tablet, and Laptop.

5. **Inline Card Photo Carousels (`[ ← ]` `[ → ]`) & High-Contrast Search States:**
   - Mount `[ ← ]` and `[ → ]` buttons (`44px x 44px` on Phone/Tablet) on each venue card photo to cycle through its distinct gallery photos inline.
   - On **`Search ↗`**, evaluate each venue against `requestedGuests` and active holds:
     - **Capacity Exceeded (`requestedGuests > venue.maxGuests`):** Coral-red `#E06D53` **`Not available`** / **`Accommodates up to {venue.maxGuests} guests`**.
     - **Date Held/Booked:** Coral-red `#E06D53` **`Not available`** / **`Booked on these dates`**.
     - **Available (`requestedGuests <= venue.maxGuests`):** Crisp `#F5EEDB` cream block showing:
       - `{dayCount} day(s) · Up to {requestedGuests} guests · {startDate} – {endDate}` (If `requestedGuests < venue.minGuests`, append muted note: `Recommended for {venue.minGuests}–{venue.maxGuests} guests`).
       - **`₹{formattedSampleTariff}`** + pill badge **`Sample tariff`**
       - `excl. 18% sample GST (subject to confirmation) · ₹25,000 sample token advance to request date hold (subject to cancellation policy)`
       - Primary CTA: **`Book now ↗`** + secondary link **`Compare with all venues on these dates`**.
   - **Verify:** Search for `800` guests; `300`-guest and `250`-guest venues show coral-red unavailable badges while `1,500`-guest and `800`-guest venues show crisp `#F5EEDB` sample tariffs.

6. **Build Inline Expandable Venue Booking Drawer:**
   - Replicate Casa Momo's native inline expandable panel geometry (`background: #1C1915; border: 1px solid rgba(245,238,219,0.22); border-radius: 8px; padding: 20px; margin-top: 16px;`) directly inside the selected venue card when **`Book now ↗`** is clicked (button transitions to `Opening booking... ↗` -> expands inline drawer):
     - Displays Venue Name, Event Dates (`{dayCount} day(s)`), Expected Guests, Optional Rooms requested, Sample Base Tariff (`₹{base}`), Estimated Sample GST (`18%`), and **Sample Token Advance (`₹25,000`)**.
     - Collects: **Full Name**, **Mobile (`+91`)**, **Email**, and **Event Type**.
   - In `CONCIERGE_HOLD` mode, submitting creates a hold record, expands the inline **Confirmed Date-Hold Receipt (`TGL-VENUE-2026-XXXX`)**, and renders **`Send Official Hold to Concierge (WhatsApp) ↗`** + **`Print / Save Hold Receipt`**. (Wired to server persistence and live Razorpay in Run 5 & 7).
   - **Verify:** Complete a venue hold inline on `/book/venue` and verify receipt and WhatsApp link generation.

### Run-End Verification Block (Run 4 — Executed by `AGENT_AUDITOR_4` in Fresh Session)
Test at these viewports: Phone `375x812`, `390x844`, `430x932`; Tablet `768x1024` and `820x1180`; Laptop `1440x900`.
For each viewport:
1. Run `tsc --noEmit` and `npm run audit:viewports -- --run=4` (auditing against `node server.mjs` on port `3003`) with zero errors. Verify `data-framer-root !== null`.
2. Capture full-page screenshots of `/book/venue` (initial, calendar open, guest drawer open, search results, inline booking drawer open, receipt).
3. Check: no horizontal scroll; all text readable; header, menu and wordmark visible; nothing clipped.
4. Check interactions: calendar, stepper, carousel arrows, inline drawer submission, touch targets >= 44px.
5. Confirm Runs 1–3 still pass (regression screenshots).
6. Output a pass/fail table: `Check | Phone | Tablet | Laptop | Notes`.
*Rollback rule: if any check fails, fix before starting Run 5.*

---

## RUN 5: `/book/rooms` — ON-SITE ROOM ACCOMMODATION BOOKING FLOW & VERCEL SERVERLESS FUNCTIONS
**Assigned Agents:** `AGENT_BUILDER_5` (Session A) → `AGENT_AUDITOR_5` (Session B)  
**Prerequisite:** All Run 4 Pass/Fail checks are `PASS`  
**Objective:** In-place Room Booking Engine in `book/rooms.html` + `src/lib/roomEngine.ts` + Vercel Serverless endpoints `api/bookings/availability.ts`, `api/bookings/hold.ts`, `api/razorpay/order.ts`, `api/razorpay/verify.ts`, `api/razorpay/webhook.ts` + `src/lib/bookingStore.ts` + `src/lib/priceCalculator.ts` + `tools/apply_run5_rooms.mjs`, cloning the exact `casamomo.at/book` template for the estate's 64 guest rooms (`56 Double Occupancy` + `8 Family Suites`), using gated occupancy labels, minimum room-to-guest ratio validation, slab-based GST (`5%` / `18%`), and an inline expandable booking drawer.

- **Files to Create / Modify:**
  - `book/rooms.html`
  - `src/lib/roomEngine.ts`
  - `src/lib/bookingStore.ts`
  - `src/lib/priceCalculator.ts`
  - `api/bookings/availability.ts`
  - `api/bookings/hold.ts`
  - `api/razorpay/order.ts`
  - `api/razorpay/verify.ts`
  - `api/razorpay/webhook.ts`
  - `tools/apply_run5_rooms.mjs`
- **Do Not Touch:**
  - `index.html`, `venues.html`, `venues/*.html`, `about.html`, `contact.html`, legal pages.

### Step-by-Step Instructions (`AGENT_BUILDER_5`)

1. **Build `book/rooms.html` Search Interface via `tools/apply_run5_rooms.mjs`:**
   - In-place Room Booking Engine in `book/rooms.html` using `roomsConfig.ts` + vanilla JS/TS bundle compiled/injected without altering Framer shell outside the booking mount.
   - Render heading **`Book Guest Rooms`** and subtitle **`64 On-Site Luxury Rooms & Suites · 56 Double Occupancy · 8 Family Suites`**. If `?fromVenue={slug}` is present, display a contextual pill: **`Booking rooms for your event at {venueName}`**.
   - Single-month calendar on Phone `375px–809px` and Tablet `810px–1023px`; 2 months on Laptop `>= 1024px`, emitting strict `YYYY-MM-DD` strings where `nights = Math.max(1, diffDays(checkInDate, checkOutDate))`.
   - Build interactive `GUESTS & ROOMS` stepper drawer:
     - **Total Guests:** `-` / `+` stepper (`1` to `144` max sample capacity across `56 * 2 + 8 * 4` rooms; `44px x 44px` buttons).
     - **Rooms Required:** `-` / `+` stepper (`1` to `64` rooms).
     - Full-width cream **`Search Rooms ↗`** button.
   - **Verify:** Open `/book/rooms` at `375px`, `820px`, and `1440px`; guest stepper caps at `144` and calendar renders 1 month on Phone/Tablet.

2. **Render Bookable Room Inventory With Gated Occupancy, Minimum Room Ratio & Slab GST:**
   - Read room tiers from `src/data/roomsConfig.ts`:
     1. **Double Occupancy Room:** `56 Units` | Sample Tariff: `₹6,500 / night` (`5% GST slab` via `getRoomGstRate(6500)`).
     2. **Luxury Family Suite:** `8 Units` | Sample Tariff: `₹14,000 / night` (`18% GST slab` via `getRoomGstRate(14000)`).
   - **Occupancy Label Gate & Minimum Rooms Calculation:**
     - While `room.occupancyConfirmed === false`, label the guest pill as **`Sample: up to {sampleMaxGuests} guests / unit`**.
     - Compute `minUnitsForGuests = Math.ceil(requestedGuests / room.sampleMaxGuests)` and set default `roomQty = Math.max(requestedRooms, minUnitsForGuests)` so a user searching for `10` guests automatically quotes at least `5` Double Rooms (`5 x 2 = 10`) or `3` Family Suites (`3 x 4 = 12`).
   - Include inline `[ ← ]` and `[ → ]` photo carousel arrows, room quantity stepper (`minUnitsForGuests` to available inventory), and high-contrast search results:
     - If required `roomQty` exceeds available inventory for the selected dates (`> 56` Double or `> 8` Family Suites): render coral-red `#E06D53` **`Not available — Requires {roomQty} units ({remaining} available on these dates)`**.
     - If available: render `#F5EEDB` breakdown:
       - Line 1 (`14px`, `#B5AEA0`): **`{nights} night(s) · {roomQty} unit(s) · ₹{nightlyRate}/night (Sample tariff)`**
       - Line 2 (`30px` serif display, `#F5EEDB`): **`Total: ₹{totalWithGst} incl. {gstPercent}% sample GST`** (`Subtotal ₹{subtotal} + ₹{gstAmount} GST`)
       - Primary CTA: **`Book now ↗`**
   - **Phone:** 1-column stack (`padding: 0 20px`). **Tablet & Laptop:** 2-column grid (`gap: 28px; padding: 0 40px`).
   - **Verify:** For 2 nights x 1 room (2 guests), Double Occupancy displays `₹13,000 + ₹650 (5% GST) = ₹13,650`, and Family Suite displays `₹28,000 + ₹5,040 (18% GST) = ₹33,040`.

3. **Build Inline Expandable Room Booking Drawer:**
   - Clicking **`Book now ↗`** expands the inline booking drawer directly inside the selected room card (replicating Casa Momo's bordered drawer geometry) showing full-payment calculation (`nightlyRate x nights x roomQty + slab GST`) with `"Sample tariff"` labels, collecting **Guest Name**, **Mobile (`+91`)**, **Email**, and **Associated Event Name (Optional)**.
   - Connects to the shared booking/payment service.
   - **Verify:** Complete a room hold inline on `/book/rooms` and verify receipt and WhatsApp payload.

4. **Implement Vercel Serverless Functions in `api/*.ts` & Dual-Driver Store (`src/lib/bookingStore.ts`):**
   - Implement standard Vercel serverless endpoints in `api/*.ts` (the canonical directory for static deployments with serverless functions):
     - `api/bookings/availability.ts`: Returns held/booked dates and decremented inventory counts.
     - `api/bookings/hold.ts`: Creates and validates holds with 32-byte secret `cancelToken`.
     - `api/razorpay/order.ts`: Server-side price calculation and atomic 15-minute lock.
     - `api/razorpay/verify.ts`: Strict HMAC-SHA256 signature verification via `crypto.timingSafeEqual`.
     - `api/razorpay/webhook.ts`: Idempotent webhook handler with `NEEDS_REFUND` conflict recovery.
   - Dual-driver store in `src/lib/bookingStore.ts` supporting `DATABASE_URL` (Upstash Redis / Postgres) with in-memory fallback for local development.
   - **Verify:** Run `tsc --noEmit`; serverless functions and store contracts compile with zero errors.

### Run-End Verification Block (Run 5 — Executed by `AGENT_AUDITOR_5` in Fresh Session)
Test at these viewports: Phone `375x812`, `390x844`, `430x932`; Tablet `768x1024` and `820x1180`; Laptop `1440x900`.
For each viewport:
1. Run `tsc --noEmit` and `npm run audit:viewports -- --run=5` (auditing against `node server.mjs` on port `3003`) with zero errors. Verify `data-framer-root !== null`.
2. Capture full-page screenshots of `/book/rooms` (initial, calendar, stepper, search results, inline drawer, receipt).
3. Check: no horizontal scroll; all text readable; slab GST math accurate (`5%` vs `18%`); nothing clipped.
4. Check interactions: room stepper, carousel arrows, inline drawer flow, touch targets >= 44px.
5. Confirm Runs 1–4 still pass (regression screenshots).
6. Output a pass/fail table: `Check | Phone | Tablet | Laptop | Notes`.
*Rollback rule: if any check fails, fix before starting Run 6.*

---

## RUN 6: EDITORIAL, CONTACT & FULL 5-PAGE RAZORPAY KYC LEGAL SUITE (STATIC HTML)
**Assigned Agents:** `AGENT_BUILDER_6` (Session A) → `AGENT_AUDITOR_6` (Session B)  
**Prerequisite:** All Run 5 Pass/Fail checks are `PASS`  
**Objective:** In-place editorial & legal pages (`about.html`, `contact.html`, `imprint.html`, `terms.html`, `privacy.html`, `refunds.html`, `service-delivery.html`) + unified terracotta footer across all `.html` files via `tools/apply_run6_editorial_legal.mjs` with continuous marquee and safe-area clearance, surface transition synchronization on `about.html`, `contact.html` polish, and all 5 Razorpay KYC legal pages reading strictly from `legalConfig.ts` and `siteConfig.ts`.

- **Files to Create / Modify:**
  - `about.html`
  - `contact.html`
  - `imprint.html`
  - `terms.html`
  - `privacy.html`
  - `refunds.html`
  - `service-delivery.html`
  - `tools/apply_run6_editorial_legal.mjs`
- **Do Not Touch:**
  - `book/venue.html`, `book/rooms.html`, `api/*`.

### Step-by-Step Instructions (`AGENT_BUILDER_6`)

1. **Rebuild Terracotta Footer With Continuous Marquee, Safe-Area Clearance & All 5 Legal Links Across All `.html` Files:**
   - Via `tools/apply_run6_editorial_legal.mjs`, patch the `<footer>` tag across all static `.html` files with `data-surface="terracotta"` (`#C46335` / `#C2653A` bg, `#F5EEDB` text).
   - Render column pills `[1] [Menu]` (`Venues`, `Stay`, `About`, `Contact`, `Book Now`), `[2] [Socials]`, `[3] [Contact]` (`0522-2970015`, `+91 91291 27091`, `Thegrandbanquet07@gmail.com`).
   - **Phone:** 1-column stack (`padding: 48px 20px`). **Tablet & Laptop:** 3-column grid (`padding: 64px 40px`).
   - Render continuous horizontal CSS marquee `THE GRAND    THE GRAND   ` (`font-size: clamp(5.5rem, 32vw, 15rem); line-height: 0.88;`).
   - Set `padding-bottom: calc(84px + env(safe-area-inset-bottom, 24px));` and include links in the bottom bar to all 5 KYC legal pages: **`Imprint`** (`/imprint`), **`Terms`** (`/terms`), **`Privacy`** (`/privacy`), **`Refunds & Cancellation`** (`/refunds`), **`Service Delivery`** (`/service-delivery`), plus `Built by Edifice`.
   - **Verify:** Scroll to `100%` bottom on Phone and Tablet across pages; all 5 legal links are visible above the browser bar with `>= 44px` tap targets.

2. **Fix `about.html` Surface & Text Color Synchronization:**
   - Wrap the upper intro in `data-surface="dark"` and the lower `"Welcome to The Grand"` (`64 guest rooms, 56 double occupancy and 8 family suites`) section in `data-surface="light"`, synchronizing background transitions with `--fg` text color inversion so paragraphs are never cream-on-cream.
   - **Verify:** Scroll `about.html` at 0%, 25%, 50%, 75%, 100%; all paragraphs and sticky header remain high-contrast.

3. **Polish `contact.html` With Hanging Indent, Underlined Action Links & Vector Smiley SVG:**
   - Format `"Feel free to send us an email or give us a call at +91 91291 27091. We'd be happy to help you personally"` with a first-line hanging indent (`text-indent: 2.2em`).
   - Underline and wire `<a href="mailto:Thegrandbanquet07@gmail.com">email</a>` and `<a href="tel:+919129127091">+91 91291 27091</a>` (`decoration-1 underline-offset-[6px]`).
   - Replace `:) ` with a 1px-stroke circular inline SVG smiley icon (`☺`) with clean right margin.
   - **Verify:** Click `email` and phone links on `contact.html`; inspect right margin at `375px`.

4. **Build Full 5-Page Razorpay KYC Legal Suite From `legalConfig.ts` (`imprint.html`, `terms.html`, `privacy.html`, `refunds.html`, `service-delivery.html`):**
   - Replicate the single-column editorial dark-mode template of `casamomo.at/terms` (`data-surface="dark"`, `max-width: 820px; margin: 0 auto;`).
   - When `LEGAL_CONFIG.LEGAL_REVIEW_PENDING === true`, display a prominent top notice banner: `Preview Legal Notice — Commercial terms, GSTIN, and policy schedules marked [CLIENT TO CONFIRM] are sample templates pending final sign-off by The Grand Lucknow management.`
   - **`imprint.html`:** Reads `LEGAL_CONFIG.legalEntityName`, `LEGAL_CONFIG.gstin`, `LEGAL_CONFIG.pan`, `siteConfig.address` (`22, Raibareli Rd, Bindaua, Lucknow, UP 226301`), phones (`0522-2970015`, `+91 91291 27091`), email (`Thegrandbanquet07@gmail.com`), and credits (`Edifice — elvar.in`).
   - **`terms.html`:** Scope of venue date-holds and room reservations, sample tariff & GST disclosures, event handover rules, vendor/decor policies, guest conduct, liability, and `LEGAL_CONFIG.jurisdictionCity` jurisdiction.
   - **`privacy.html`:** Explicit disclosure of personal data collected during inquiries/bookings (name, phone, email, event dates), browser `sessionStorage` cache, server-side booking hold records, analytics scripts dynamically listed from `siteConfig.analyticsProviders` (stating `"No third-party advertising trackers are loaded in this preview build"` when `analyticsProviders` is empty, or naming exact scripts if configured), WhatsApp concierge dispatch (`wa.me`), and payment processing via **Razorpay Software Private Limited** (`razorpay.com/privacy`).
   - **`refunds.html` (Dedicated Cancellation & Refund Policy — Reads strictly from `LEGAL_CONFIG.refundPolicy`):** Renders `venueAdvanceClause`, `roomCancellationClause`, `blackoutWindowClause`, and `refundProcessingTimeline` directly from `src/data/legalConfig.ts` without inventing unapproved numeric deadlines.
   - **`service-delivery.html` (Dedicated Service Fulfillment & Check-In Policy — Reads strictly from `LEGAL_CONFIG.serviceDeliveryPolicy`):** Renders `holdConfirmationSla`, `venueHandoverClause`, and `roomCheckInOutClause` directly from `src/data/legalConfig.ts` without inventing unapproved SLAs.
   - **Verify:** Visit all 5 legal routes in browser; verify all clauses read from `legalConfig.ts` and zero broken links exist.

### Run-End Verification Block (Run 6 — Executed by `AGENT_AUDITOR_6` in Fresh Session)
Test at these viewports: Phone `375x812`, `390x844`, `430x932`; Tablet `768x1024` and `820x1180`; Laptop `1440x900`.
For each viewport:
1. Run `npm run audit:viewports -- --run=6` (auditing against `node server.mjs` on port `3003`) with zero errors. Verify `data-framer-root !== null`.
2. Capture full-page screenshots at scroll positions 0%, 25%, 50%, 75%, 100% of `about.html`, `contact.html`, `imprint.html`, `terms.html`, `privacy.html`, `refunds.html`, and `service-delivery.html`.
3. Check: no horizontal scroll; all text readable; footer bottom links completely visible above browser bar; nothing clipped.
4. Check interactions: `mailto:` and `tel:` links, footer links, touch targets >= 44px.
5. Confirm Runs 1–5 still pass (regression screenshots).
6. Output a pass/fail table: `Check | Phone | Tablet | Laptop | Notes`.
*Rollback rule: if any check fails, fix before starting Run 7.*

---

## RUN 7: PRODUCTION RAZORPAY HARDENING, SEO, CRYPTO-AUTHENTICATED HOLDS & GO-LIVE SCRIPT
**Assigned Agents:** `AGENT_BUILDER_7` (Session A) → `AGENT_AUDITOR_7` (Session B)  
**Prerequisite:** All Run 6 Pass/Fail checks are `PASS`  
**Objective:** Final SEO (`sitemap.xml`, `robots.txt`), JSON-LD (`Hotel`, `EventVenue`, `FAQPage`) injected via `tools/apply_run7_seo.mjs`, wire `book/venue.html` and `book/rooms.html` to server-persisted availability/hold store (Upstash Redis / Postgres via `DATABASE_URL` for cross-instance persistence, with local dev in-memory fallback), enforce token-authenticated hold cancellation, prevent UPI modal-dismiss double-booking races, bind `/api/razorpay/verify` and `/api/razorpay/webhook` strictly to `razorpay_order_id` and `expectedAmountPaise`, handle late-webhook slot collisions via `NEEDS_REFUND`, and add `scripts/verify-go-live.mjs`.

- **Files to Create / Modify:**
  - `.env.example`
  - `sitemap.xml`
  - `robots.txt`
  - `scripts/verify-go-live.mjs`
  - `tools/apply_run7_seo.mjs`
  - `package.json` (add `"verify:golive": "node scripts/verify-go-live.mjs"`)
- **Do Not Touch:**
  - Existing core design tokens, venue facts.

### Step-by-Step Instructions (`AGENT_BUILDER_7`)

1. **Create `.env.example` Documenting All Required & Optional Variables:**
   - Include:
     - `NEXT_PUBLIC_PAYMENT_MODE=CONCIERGE_HOLD`
     - `NEXT_PUBLIC_RAZORPAY_KEY_ID=`
     - `RAZORPAY_KEY_SECRET=`
     - `RAZORPAY_WEBHOOK_SECRET=`
     - `DATABASE_URL=` (Free Upstash Redis REST/TCP URL or Postgres connection string—required for Run 7 cross-browser Vercel testing and live launch).
   - **Verify:** `.env.example` exists in project root with clear documentation.

2. **Build Timezone-Safe Server-Side Price Calculator & Date Validator (`src/lib/priceCalculator.ts`):**
   - **Never trust client-submitted `amount` values.** Accept `{ bookingType: 'VENUE' | 'ROOM', itemSlug, startDate, endDate, roomQty }`.
   - Validate that `startDate` and `endDate` match `/^d{4}-d{2}-d{2}$/`, are not in the past (`startDate >= todayIST`), and satisfy `startDate <= endDate` (for `VENUE`) or `startDate < endDate` (for `ROOM`). Throw a `400` validation error on malformed or inverted dates.
   - Parse dates using UTC-neutral `Date.UTC(y, m - 1, d)` arithmetic:
     - For `VENUE`: computes inclusive event days `dayCount = Math.max(1, diffDays(startDate, endDate) + 1)`, reads `venueDailySampleTariffINR[itemSlug]` and `venueTokenAdvanceINR` (`₹25,000` = `2500000` paise) from `src/data/pricingConfig.ts`, and returns `{ expectedAmountPaise: 2500000, baseTariffINR, gstINR }`.
     - For `ROOM`: computes overnight stays `nights = Math.max(1, diffDays(startDate, endDate))`, validates `Number.isInteger(roomQty) && roomQty >= 1 && roomQty <= room.count`, reads `sampleNightlyTariffINR` from `src/data/roomsConfig.ts`, applies `getRoomGstRate(nightlyTariffINR)` (`5%` or `18%`), and returns `{ expectedAmountPaise: Math.round(totalWithGstINR * 100), subtotalINR, gstINR }`.
   - **Verify:** Unit-test `calculateServerBookingAmount()` for a 1-day venue token (`2500000` paise), a 2-night Double Room (`1365000` paise), and an inverted date range (throws `400`).

3. **Build Server Booking Store With Cryptographic `cancelToken`, `razorpayOrderId` Index & `NEEDS_REFUND` State (`src/lib/bookingStore.ts` & `api/bookings/*`):**
   - Implement a dual-driver store in `src/lib/bookingStore.ts`:
     - **Driver A — Upstash Redis / Postgres (`DATABASE_URL`):** Used whenever `DATABASE_URL` is set (including on Vercel staging with a free Upstash Redis instance so multi-browser holds persist across serverless lambda invocations).
     - **Driver B — Local Dev In-Memory Store (`globalThis.__TGL_BOOKING_STORE__`):** Used only when `DATABASE_URL` is unset in local single-process execution.
   - **Booking Record Schema:**
     ```ts
     export type BookingStatus =
       | 'CONCIERGE_HELD'   // Unpaid WhatsApp concierge hold (TTL 24h)
       | 'PAYMENT_PENDING'  // Active Razorpay order lock (TTL 15m; NEVER released on modal dismiss)
       | 'CONFIRMED_PAID'   // Signature & amount verified; permanent lock
       | 'NEEDS_REFUND'     // Late payment captured after 15m TTL expired and slot was taken by another booking
       | 'EXPIRED'          // TTL elapsed without payment
       | 'CANCELLED'        // Explicitly cancelled via valid cancelToken (only allowed on CONCIERGE_HELD)
       | 'REFUNDED';        // Razorpay refund.processed webhook received; inventory released

     export interface BookingRecord {
       holdRef: string;                 // Public human-readable reference (e.g. TGL-VENUE-2026-8F3A)
       cancelTokenHash: string;         // SHA-256 hash of 32-byte random secret cancelToken
       razorpayOrderId?: string;        // Indexed primary lookup key for /verify and /webhook
       razorpayPaymentId?: string;
       bookingType: 'VENUE' | 'ROOM';
       itemSlug: string;
       startDate: string;               // YYYY-MM-DD
       endDate: string;                 // YYYY-MM-DD
       guests: number;
       roomQty: number;
       expectedAmountPaise: number;     // Server-calculated amount in paise
       paidAmountPaise?: number;
       status: BookingStatus;
       canonicalPhone: string;          // 10-digit normalized phone
       customer: { name: string; phone: string; email: string; eventType?: string };
       createdAt: number;
       expiresAt?: number;
     }
     ```
   - **Anti-Abuse Guardrails on `POST /api/bookings/hold`:**
     - Rate-limit by `req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')` to max **5 hold requests per IP per 15 minutes** (`HTTP 429`).
     - Normalize phone (`rawPhone.replace(/D/g, '').slice(-10)`) and cap active unpaid holds (`CONCIERGE_HELD` + `PAYMENT_PENDING`) to **max 2 per canonical phone** (`HTTP 400`).
     - Generate a 32-byte cryptographic secret `cancelToken = crypto.randomBytes(32).toString('hex')`, store only `cancelTokenHash = sha256(cancelToken)` on the record, and return `{ holdRef, cancelToken, expiresAt }` to the creator's browser.
   - **Authenticated `DELETE /api/bookings/hold` (Protected Against Unauthorized Release & UPI Race Conditions):**
     - Require `{ holdRef, cancelToken }` in the request body/headers. Verify `safeCompareHex(record.cancelTokenHash, sha256(cancelToken))`. Return `401 Unauthorized` if missing or invalid.
     - **CRITICAL:** Allow `DELETE` **only** when `record.status === 'CONCIERGE_HELD'`. **Reject `DELETE` (`409 Conflict`) when `record.status === 'PAYMENT_PENDING'` or `'CONFIRMED_PAID'`** so a user closing the Razorpay modal while approving a UPI collect request in GPay/PhonePe can never prematurely release a payment lock.
   - **Verify:** Attempt `DELETE /api/bookings/hold` with only a `holdRef` (no `cancelToken`) -> returns `401`. Attempt `DELETE` on a `PAYMENT_PENDING` or `CONFIRMED_PAID` record even with a valid `cancelToken` -> returns `409`.

4. **Wire Booking UI Components Without Modal-Dismiss Lock Release:**
   - Update both booking pages (`book/venue.html` and `book/rooms.html`) to query live availability from `GET /api/bookings/availability?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`.
   - When `getEffectivePaymentMode() === 'RAZORPAY'`:
     - Store `{ orderId, holdRef }` in `sessionStorage` so if the user clicks **`Book now ↗`** again for the exact same `{ bookingType, itemSlug, startDate, endDate, roomQty }` within the 15-minute window, the client passes `existingOrderId` to reuse their active `PAYMENT_PENDING` order instead of locking themselves out.
     - On Razorpay `modal: { ondismiss }`, **do NOT call `DELETE /api/bookings/hold`**. Instead, show an inline notice inside the drawer: `"Payment window closed. Your date slot remains reserved for 15 minutes—click 'Resume Payment' to retry, or wait if you completed payment via UPI app."`
   - **Verify:** Open Razorpay Checkout, close the modal (`ondismiss`), and immediately click `Resume Payment`; the same `razorpayOrderId` re-opens cleanly without a `409` self-lockout and without releasing the server lock to other users.

5. **Harden `POST /api/razorpay/order` With Atomic 15-Minute `PAYMENT_PENDING` Lock & Order Reuse (`api/razorpay/order.ts`):**
   - Accept `{ bookingType, itemSlug, startDate, endDate, guests, roomQty, customer, existingOrderId? }`.
   - Compute `expectedAmountPaise` on the server via `calculateServerBookingAmount()` (ignoring any client-supplied amount).
   - If `existingOrderId` is provided and matches an active, non-expired `PAYMENT_PENDING` record with the exact same `{ bookingType, itemSlug, startDate, endDate, roomQty, expectedAmountPaise, canonicalPhone }`, return that existing `{ orderId, amount: expectedAmountPaise, currency: 'INR', holdRef }`.
   - Otherwise, atomically acquire a **15-minute `PAYMENT_PENDING` lock** in `bookingStore` (`409 Conflict` if dates/inventory are unavailable).
   - If `RAZORPAY_KEY_ID` or `RAZORPAY_KEY_SECRET` is missing on the server, downgrade the record to `CONCIERGE_HELD` and return `{ fallbackMode: 'CONCIERGE_HOLD', holdRef, cancelToken }`.
   - Otherwise, create the Razorpay Order (`currency: 'INR'`, `amount: expectedAmountPaise`, `receipt: holdRef`), persist `razorpayOrderId = order.id` and `expectedAmountPaise` on the `BookingRecord` indexed by `razorpayOrderId`, and return `{ orderId: order.id, amount: expectedAmountPaise, currency: 'INR', holdRef }`.
   - **Verify:** Send a tampered `amount: 100` to `/api/razorpay/order`; confirm the server ignores it, stores `expectedAmountPaise` (`2500000` or full room GST total), and indexes the record by `razorpayOrderId`.

6. **Harden `POST /api/razorpay/verify` & `POST /api/razorpay/webhook` With Strict `razorpay_order_id` Lookup, Amount Verification & Late-Webhook `NEEDS_REFUND` Handling (`api/razorpay/verify.ts`, `api/razorpay/webhook.ts`):**
   - Define the byte-level hex signature verifier:
     ```ts
     const safeCompareHex = (expectedHex: string, receivedHex: string): boolean => {
       if (!expectedHex || !receivedHex || expectedHex.length !== receivedHex.length) return false;
       const a = Buffer.from(expectedHex, 'hex');
       const b = Buffer.from(receivedHex, 'hex');
       return a.length > 0 && a.length === b.length && crypto.timingSafeEqual(a, b);
     };
     ```
   - **In `POST /api/razorpay/verify`:**
     1. Accept `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` (**never** accept or use a client-supplied `holdRef` to look up the booking—preventing a user from paying a cheap room order and using that payment to confirm a ₹3,50,000 venue hold).
     2. Look up the `BookingRecord` strictly by `razorpayOrderId === razorpay_order_id`. If not found, return `404`.
     3. Verify HMAC-SHA256 of `razorpay_order_id + "|" + razorpay_payment_id` using `safeCompareHex`. If invalid, return `400`.
     4. When live Razorpay credentials are active, fetch the payment/order from Razorpay (`razorpay.payments.fetch(razorpay_payment_id)`) and assert `payment.order_id === record.razorpayOrderId`, `payment.amount === record.expectedAmountPaise`, and `payment.currency === 'INR'`.
     5. Atomically check if the slot is still free (in case the 15-minute `PAYMENT_PENDING` lock expired before capture):
        - If free (or still held by this `razorpayOrderId`), transition `status = 'CONFIRMED_PAID'`.
        - If the 15-minute lock expired AND another booking took the slot in the meantime, transition `status = 'NEEDS_REFUND'` and return `409 Conflict` with `{ status: 'NEEDS_REFUND', holdRef: record.holdRef, message: 'Payment received after hold expiry; slot was taken. Automatic refund queued.' }`.
   - **In `POST /api/razorpay/webhook`:**
     1. Read the raw unparsed request body via `const rawBody = await req.text()` and verify `x-razorpay-signature` against `process.env.RAZORPAY_WEBHOOK_SECRET` using `safeCompareHex`. Return `400` on invalid signature.
     2. Extract `orderId = event.payload?.payment?.entity?.order_id || event.payload?.order?.entity?.id` and `capturedAmount = event.payload?.payment?.entity?.amount`.
     3. Look up the `BookingRecord` strictly by `razorpayOrderId === orderId`.
     4. **Unknown or Stale Order Rule:** If no record matches `orderId`, or if the event is an `order.paid` / `payment.failed` for an already finalized record, log a structured warning and **return `200 OK` without mutating state** (so Razorpay does not infinitely retry unknown/stale events).
     5. **On `payment.captured` / `order.paid`:**
        - If `record.status === 'CONFIRMED_PAID'` or `'NEEDS_REFUND'`, return `200 OK` (idempotent).
        - Verify `capturedAmount === record.expectedAmountPaise`. If mismatched, mark `status = 'NEEDS_REFUND'`, log critical alert, and return `200 OK`.
        - If `record.status === 'PAYMENT_PENDING'`, transition to `'CONFIRMED_PAID'`.
        - If `record.status === 'EXPIRED'` (late UPI/bank capture after 15-minute TTL), atomically check whether the venue/room dates are still available: if still free, reclaim the dates and transition to `'CONFIRMED_PAID'`; if another user booked those dates after expiry, transition to **`'NEEDS_REFUND'`** (never overwrite the newer customer's booking) and log a critical refund alert.
     6. **On `payment.failed`:** If `record.status === 'PAYMENT_PENDING'`, keep the lock until its 15-minute `expiresAt` (allowing the customer to retry inside the modal) and let TTL expiry clean it up.
     7. **On `refund.processed`:** Look up by `orderId` or `paymentId`, transition `status = 'REFUNDED'` idempotently, and release the held dates/inventory back into availability.
   - **Verify:**
     1. Attempt cross-order substitution in `/verify` (passing a valid room `razorpay_order_id` to confirm a venue) -> confirms only the room record tied to that `razorpay_order_id`.
     2. Simulate a late `payment.captured` webhook on an `EXPIRED` order whose dates were subsequently booked by Customer B -> Customer B's booking remains untouched and Customer A's record transitions to `NEEDS_REFUND`.
     3. Send a webhook with an unknown `order_id: "order_unknown123"` -> logs warning and returns `200 OK` with zero state changes.

7. **Final SEO & JSON-LD Injection (`tools/apply_run7_seo.mjs`):**
   - In `tools/apply_run7_seo.mjs`, inject comprehensive search-engine and entity-discoverability metadata across all static `.html` files:
     - Generate `sitemap.xml` in repo root enumerating all 16 canonical routes with verified priorities:
       - `/` (`1.0`), `/venues` (`0.9`), 5 venue subpages (`0.8`), `/book/venue` (`0.9`), `/book/rooms` (`0.9`), `/about` (`0.7`), `/contact` (`0.7`), and 5 legal routes (`0.5`).
     - Generate `robots.txt` pointing to `https://the-grand-lucknow.vercel.app/sitemap.xml`.
     - In `index.html`, inject rich `Hotel` and `EventVenue` Schema.org JSON-LD structured data with geo coordinates (`26.7570, 80.9575`), address, contact numbers, and amenity specifications.
     - In `book/venue.html` and `book/rooms.html`, inject `FAQPage` Schema.org JSON-LD covering booking holds, cancellation terms, and GST disclosures.
   - **Verify:** Validate rendered JSON-LD with `node --input-type=module -e 'import fs from "fs"; JSON.parse(fs.readFileSync("index.html","utf8").match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]); console.log("JSON-LD Valid")'`.

8. **Create Comprehensive Pre-Launch Go-Live Verification Script (`scripts/verify-go-live.mjs`):**
   - Write `scripts/verify-go-live.mjs` (`npm run verify:golive`) checking two distinct readiness levels:
     - **`PREVIEW_READY` Checks:**
       1. `tsc --noEmit` passes.
       2. All 16 routes (`/`, `/venues`, 5 venue subpages, `/book/venue`, `/book/rooms`, `/about`, `/contact`, `/imprint`, `/terms`, `/privacy`, `/refunds`, `/service-delivery`) return `HTTP 200` when queried against `node server.mjs` on port `3003`.
       3. Server-side price calculator math (`venue` token and `room` 5%/18% slab GST), `cancelToken` auth check, and `YYYY-MM-DD` date validation pass assertions.
       4. `data-framer-root !== null` confirmed on all 16 HTML pages.
     - **`LIVE_MERCHANT_READY` Checks (All must pass before switching to live Razorpay):**
       1. `PRICING_CONFIRMED === true` and `TAX_RATE_CONFIRMED === true` in `src/data/pricingConfig.ts`.
       2. `LEGAL_CONFIG.LEGAL_REVIEW_PENDING === false` in `src/data/legalConfig.ts`.
       3. Zero occurrences of `[CLIENT TO CONFIRM` remaining anywhere in `src/data/*` or rendered legal pages.
       4. `NEXT_PUBLIC_PAYMENT_MODE === 'RAZORPAY'`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` starts with `'rzp_live_'`, and both `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` are non-empty.
       5. `process.env.DATABASE_URL` is configured and reachable.
   - **Verify:** Run `npm run verify:golive`; confirms `PREVIEW_READY: PASS` and clearly lists every `LIVE_MERCHANT_READY` gate pending client sign-off.

### Final Handover & Master Audit Gate (`AGENT_BUILDER_7` → `AGENT_AUDITOR_7` in Fresh Session)
**Required Environment for Run 7 Audit on Vercel/Staging:** Configure a free Upstash Redis instance in `DATABASE_URL` so serverless functions share state across invocations.
Test at these viewports: Phone `375x812`, `390x844`, `430x932`; Tablet `768x1024` and `820x1180`; Laptop `1440x900`.
For each viewport:
1. Run `tsc --noEmit`, `npm run verify:golive`, and `npm run audit:viewports -- --run=7` (auditing against `node server.mjs` on port `3003`) with zero errors.
2. Verify cross-browser persistence against `DATABASE_URL` (creating a hold in Browser A immediately blocks/decrements availability in Browser B), verify `DELETE /api/bookings/hold` requires a valid `cancelToken` (`401` without it) and refuses to delete `PAYMENT_PENDING` or `CONFIRMED_PAID` records (`409`).
3. Verify `/api/razorpay/order` ignores client-supplied amounts, `/api/razorpay/verify` looks up strictly by `razorpay_order_id` and checks `expectedAmountPaise`, and `/api/razorpay/webhook` handles unknown orders (`200` no-op), late captures on taken slots (`NEEDS_REFUND`), and `refund.processed` idempotently.
4. Capture full-page screenshots at scroll positions 0%, 25%, 50%, 75%, 100% across all 16 routes.
5. Confirm all checks from Runs 1–7 pass with zero regressions.
6. Output the final Master Pass/Fail Table: `Check | Phone | Tablet | Laptop | Notes`.
*When all checks are PASS, the build is cleared for client showcase (`PREVIEW_READY`).*
