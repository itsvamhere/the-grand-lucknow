/**
 * Surface Theme Sampler and Logo/Menu Contrast Controller.
 * Samples document.elementFromPoint(window.innerWidth / 2, 36)?.closest('[data-surface]')
 * and updates logo/menu classes on <html> and <body>.
 */

export type SurfaceType = 'dark' | 'light' | 'sand-muted' | 'taupe' | 'terracotta' | 'terracotta-card';

let rafId: number | null = null;
let lastIsLight: boolean | null = null;

export function getSampledSurface(): SurfaceType | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  const x = window.innerWidth / 2;
  const y = 36;
  const el = document.elementFromPoint(x, y);
  const surfaceEl = el ? (el.closest('[data-surface]') as HTMLElement | null) : null;
  if (surfaceEl) {
    const attr = surfaceEl.getAttribute('data-surface');
    if (attr) return attr as SurfaceType;
  }
  return null;
}

export function updateLogoColorClass(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const sampledSurface = getSampledSurface();
  let isLight = false;
  let determined = false;

  if (sampledSurface) {
    if (sampledSurface === 'dark') {
      isLight = false;
      determined = true;
    } else {
      // 'light', 'sand-muted', 'taupe', 'terracotta', 'terracotta-card'
      isLight = true;
      determined = true;
    }
  }

  // Check navbar wrapper background if not determined
  if (!determined) {
    const navWrapper = document.querySelector('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Mobile Navbar"]');
    if (navWrapper) {
      const navBg = window.getComputedStyle(navWrapper).backgroundColor;
      const pNav = navBg ? navBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/) : null;
      if (pNav) {
        const navLum = 0.299 * (+pNav[1]) + 0.587 * (+pNav[2]) + 0.114 * (+pNav[3]);
        if (navLum > 140) {
          isLight = true;
          determined = true;
        } else if (navLum < 110) {
          isLight = false;
          determined = true;
        }
      }
    }
  }

  // Fallback point sampling near wordmark/menu
  if (!determined) {
    const isMobile = window.innerWidth <= 810;
    const x = isMobile ? 50 : 110;
    const y = isMobile ? 24 : 50;
    const els = document.elementsFromPoint(x, y) || [];
    for (let i = 0; i < els.length; i++) {
      const el = els[i] as HTMLElement;
      if (el.closest && el.closest('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Mobile Navbar"], [data-framer-name="Logo"]')) continue;
      if (el.matches && el.matches('[data-theme="light"], .light-section, [data-bg="light"]') || (el.closest && el.closest('[data-theme="light"], .light-section, [data-bg="light"]'))) {
        isLight = true;
        determined = true;
        break;
      }
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const p = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
        if (p) {
          if (p[4] !== undefined && parseFloat(p[4]) < 0.2) continue;
          const lum = 0.299 * (+p[1]) + 0.587 * (+p[2]) + 0.114 * (+p[3]);
          if (lum > 140) {
            isLight = true;
            determined = true;
            break;
          } else if (lum < 110) {
            isLight = false;
            determined = true;
            break;
          }
        }
      }
    }
  }

  // Fallback to body background ONLY if determined is still false
  if (!determined) {
    const bBg = window.getComputedStyle(document.body).backgroundColor;
    const hBg = window.getComputedStyle(document.documentElement).backgroundColor;
    const effBg = (bBg && bBg !== 'rgba(0, 0, 0, 0)' && bBg !== 'transparent') ? bBg : hBg;
    if (effBg) {
      const pb = effBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (pb) {
        const bLum = 0.299 * (+pb[1]) + 0.587 * (+pb[2]) + 0.114 * (+pb[3]);
        if (bLum > 140) isLight = true;
      }
    }
  }

  if (isLight !== lastIsLight) {
    lastIsLight = isLight;
    const root = document.documentElement;
    const logoEls = document.querySelectorAll('[data-framer-name="Logo"], #svg-1334768056_3843');

    if (isLight) {
      root.setAttribute('data-logo-theme', 'dark');
      document.body.classList.add('is-light-theme');
      root.classList.add('logo-dark-text');
      root.classList.remove('logo-light-text');
      root.style.setProperty('--grand-logo-color', '#14120E');
      logoEls.forEach((l) => {
        l.classList.add('logo-dark-text');
        l.classList.remove('logo-light-text');
        const p = l.querySelector('path');
        if (p) p.style.fill = '#14120E';
      });
    } else {
      root.removeAttribute('data-logo-theme');
      document.body.classList.remove('is-light-theme');
      root.classList.add('logo-light-text');
      root.classList.remove('logo-dark-text');
      root.style.setProperty('--grand-logo-color', '#F5EEDB');
      logoEls.forEach((l) => {
        l.classList.add('logo-light-text');
        l.classList.remove('logo-dark-text');
        const p = l.querySelector('path');
        if (p) p.style.fill = '#F5EEDB';
      });
    }
  }
}

export function initSurfaceThemeWatcher(): () => void {
  if (typeof window === 'undefined') return () => {};

  const onScrollOrResize = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      updateLogoColorClass();
    });
  };

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize, { passive: true });
  updateLogoColorClass();

  return () => {
    window.removeEventListener('scroll', onScrollOrResize);
    window.removeEventListener('resize', onScrollOrResize);
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

export default {
  getSampledSurface,
  updateLogoColorClass,
  initSurfaceThemeWatcher,
};
