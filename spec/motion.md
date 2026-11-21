# Motion & Interaction Specification (Canonical Reference 1:1 Parity)

All timings, curves, springs, and scroll-linked kinematics match `canonical-reference` (`2dff063`) verbatim via native Framer Motion + Lenis inside `scripts/*.mjs`. No external vanilla `motion_engine.js` or CSS `!important` overrides may compete with React/Framer transforms.

## 1. Global Page Transitions (`script_main.mjs`)
- **Curve & Duration:** `type: "tween"`, `duration: 1.5s`, `ease: [0.52, 0, 0, 1]`.
- **Mechanic:** 270-degree conic/linear mask-wipe (`delay: 0` enter / `delay: 0.5` exit fallback) preserving Lenis smooth scroll continuity across all 12 SPA routes.

## 2. Smooth Scroll (`ScrollRadius.*.mjs` / `Lenis`)
- **Library:** Native Framer-bundled `Lenis` (`html.lenis`, `html.lenis-smooth`).
- **Scope:** Active on all 12 routes (`/`, `/venues`, 5x `/venues/:slug`, `/about`, `/contact`, `/book`, `/book/venue`, `/imprint`, `/privacy`, `/terms`).

## 3. Hero Video Reveal (`Video Grow` / `Ar` in `IStDm3kWi...mjs`)
- **Desktop (`>=1200px`):** `startRadius: 2000 -> 0`, `startScale: 0 -> 1`, `startOpacity: 0 -> 1`, `fadeDuration: 1.8s`, `transition: { type: "tween", duration: 1.6, delay: 2.9, ease: [0.8, 0, 0, 1] }`.
- **Mobile (`<810px`):** `transition: { type: "tween", duration: 1.6, delay: 3.4, ease: [0.8, 0, 0, 1] }`, `loop: true`, `playEarly: 0.5`, portrait stream (`1080x1920`).

## 4. MorphCursor (`ScrollRadius.*.mjs`)
- **Position Spring (`L = 0..1` tracking sensitivity):** `stiffness: 220 + 1400 * L` (default ~`1200`), `damping: 26 + 22 * L` (default ~`41.4`), `mass: 0.45`.
- **Scale / Morph Spring:** `type: "spring"`, `stiffness: 300`, `damping: 30`, `mass: 0.9`.
- **Opacity Fade:** `duration: 0.35s`, `ease: [0.52, 0, 0, 1]`.
- **Labels:** Localized for The Grand (`"Venue Details"`, `"Show on Maps"`, `"Scroll"`, etc.), never hidden via CSS `display: none`.

## 5. ScrollRadius SVG Squircle Clip-Paths (`ScrollRadius.*.mjs`)
- **Mechanism:** Dynamically calculated Apple-style smooth superellipse `<clipPath>` (`n`-exponent squircle corners) applied on scroll rather than flat CSS `border-radius: 56px`.
- **Smoothing:** `0.8` lerp damping tracking section scroll progress.

## 6. ParallaxImage & Multi-Slide Card Carousels (`ParallaxImage.*.mjs` & `T5PVEAy5F.*.mjs`)
- **Vertical Parallax:** Image translation `+/- 15%` scrub synced to Lenis scroll position; zero improvised `scale(1.045)` hover zoom.
- **Venue Card Carousels:** Up to 6 slides (`image` + `gallery1..gallery5`) navigated via `<-` / `->` interactive arrows.

## 7. Kinetic Typography (`BigText`, `TunnelText`, `Rolling Labels`, `ColorChangeTrigger`)
- **Rolling Button / Nav Labels:** `duration: 0.7s`, `ease: [0.52, 0, 0, 1]` GPU `transform` Y-translation paired with GPU `transform` arrow swap.
- **Footer / Contact Word Rise (`At`):** `opacity: 0 -> 1`, `translateY(230px) rotate(8deg) -> none`, `transformOrigin: 0% 100%`, scroll-triggered so `#locations-1` address and `[3] [Contact]` badge reach `opacity: 1` reliably at scroll rest.
- **TunnelText (`IStDm3kWi...mjs`):** `blendMode: "normal"` over protective photo contrast (no `mix-blend-mode: difference` color artifacts on daylight photos).
- **ColorChangeTrigger:** Transitions surface/ground cleanly between Canonical Reference dark olive `#0E1201` and cream `#FFF0CA` (never stale `#F6EEDC` or `#121110`).
